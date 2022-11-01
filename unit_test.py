import unittest
import flask_testing
import json
from Backend.app import app, db, Role, WorkRole, Skill, Course, LearningJourney, Registration, Staff, workRoleSkills, skillCourses, learningJourneyDetails, staffSkills


class TestApp(flask_testing.TestCase):
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {}
    app.config['TESTING'] = True

    def create_app(self):
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

# test Role
class TestRole(unittest.TestCase):
    def test_json(self):
        role = Role(roleId=1,roleName='admin')
        self.assertEqual(role.json(), {
            'roleId': 1,
            'roleName': 'admin'}
        )

# test WorkRole
class TestWorkRole(unittest.TestCase):
    def test_json(self):
        workRole = WorkRole(workRoleId=800,workRoleName='Technical Lead', isDeleted=0)
        self.assertEqual(workRole.json(), {
            "workRoleId": 800,
            "workRoleName": 'Technical Lead',
            "isDeleted": 0}
        )

# test Skills
class TestSkills(unittest.TestCase):
    def test_json(self):
        skill = Skill(skillId=200,skillName='Basic Management',skillDesc='Basics fundamentals of people and project management', isDeleted=0)
        self.assertEqual(skill.json(), {
            "skillId": 200,
            "skillName": 'Basic Management',
            "skillDesc": 'Basics fundamentals of people and project management',
            "isDeleted": 0}
        )

# test Course
class TestCourse(unittest.TestCase):
    def test_json(self):
        course = Course(courseId="COR001",courseName='Systems Thinking and Design',courseDesc='This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
        courseStatus='Active', courseType='Internal',courseCategory='Core')
        self.assertEqual(course.json(), {
            "courseId": "COR001",
            "courseName": 'Systems Thinking and Design',
            "courseDesc": 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
            "courseStatus": 'Active',
            "courseType": 'Internal',
            "courseCategory": 'Core'}
        )


# test LearningJourney
class TestLearningJourney(unittest.TestCase):
    def test_json(self):
        learningJourney = LearningJourney(learningJourneyId=500,staffId=130001,workRoleId=803)
        self.assertEqual(learningJourney.json(), {
            "learningJourneyId": 500 ,
            "staffId": 130001,
            "workRoleId": 803}
        )

# test Registration
class TestRegistration(unittest.TestCase):
    def test_json(self):
        registration = Registration(regId=1,courseId="COR002",staffId=130001,regStatus="Registered",completionStatus="Completed")
        self.assertEqual(registration.json(), {
            "regId": 1,
            "courseId": "COR002",
            "staffId": 130001,
            "regStatus": "Registered",
            "completionStatus": "Completed"}
        )

class TestGetAllCourses(TestApp):
    def test_get_all_courses(self):
        c1 = Course(courseId="COR001",courseName='Systems Thinking and Design',courseDesc='This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
        courseStatus='Active', courseType='Internal',courseCategory='Core')
        c2 = Course(courseId="COR002",courseName='Systems Thinking and Design',courseDesc='This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
        courseStatus='Active', courseType='Internal',courseCategory='Core')
        db.session.add(c1)
        db.session.add(c2)
        db.session.commit()

        response = self.client.get("/courses")
        self.assertEqual(response.json, 
                {
            "code": 200,
            "data": {
                "courses": [
                    {
                        "courseId": "COR001",
                        "courseName": 'Systems Thinking and Design',
                        "courseDesc": 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
                        "courseStatus": 'Active',
                        "courseType": 'Internal',
                        "courseCategory": 'Core'
                    },
                    {
                        "courseId": "COR002",
                        "courseName": 'Systems Thinking and Design',
                        "courseDesc": 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
                        "courseStatus": 'Active',
                        "courseType": 'Internal',
                        "courseCategory": 'Core'
                    }
                ]
            }
        }
        )

    def test_get_all_courses_fail(self):
        response = self.client.get("/courses")
        self.assertEqual(response.json, 
                {
            "code": 404,
            "message": "Course not found."
        }
        )

class TestGetAllRoles(TestApp):
    def test_get_all_roles(self):
        r1 = Role(roleId=1,roleName='admin')
        r2 = Role(roleId=2,roleName='user')
        db.session.add(r1)
        db.session.add(r2)
        db.session.commit()

        response = self.client.get("/role")
        self.assertEqual(response.json, 
            {
                "code": 200,
                "data": {
                    "roles": [
                        {
                        "roleId": 1,
                        "roleName": 'admin'
                        },
                        {
                            "roleId": 2,
                            "roleName": 'user'
                        }]
                }
            }
        )
    
    def test_get_all_roles_fail(self):
        response = self.client.get("/role")
        self.assertEqual(response.json, 
            {
                "code": 404,
                "message": "Role not found."
            }
        )

class TestGetRoleByName(TestApp):
    def test_get_role_by_name(self):
        r1 = Role(roleId=1,roleName='admin')
        db.session.add(r1)
        db.session.commit()

        response = self.client.get("/role/admin")
        self.assertEqual(response.json, {
                "code": 200,
                "data": {
                    "roleId": 1,
                    "roleName": "admin"
                }
            
        })
    
    def test_get_role_by_name_fail(self):
        response = self.client.get("/role/admin")
        self.assertEqual(response.json, {
                "code": 404,
                "message": "Role not found."
            })

class TestGetAllWorkRoles(TestApp):
    def test_get_all_workroles(self):
        w1 = WorkRole(workRoleId=800,workRoleName='Technical Lead', isDeleted=0)
        w2 = WorkRole(workRoleId=801,workRoleName='Senior Developer', isDeleted=0)
        db.session.add(w1)
        db.session.add(w2)
        db.session.commit()

        response = self.client.get("/workRole")
        self.assertEqual(response.json, 
            {
                "code": 200,
                "data": {
                    "workRoles": [
                        {
                        "workRoleId": 800,
                        "workRoleName": 'Technical Lead',
                        "isDeleted": False
                        },
                        {
                        "workRoleId": 801,
                        "workRoleName": 'Senior Developer',
                        "isDeleted": False
                        }]
                }
            }
        )
    
    def test_get_all_workroles_fail(self):
        response = self.client.get("/workRole")
        self.assertEqual(response.json, 
            {
                "code": 404,
                "message": "WorkRole not found."
            }
        )

class TestGetWorkRoleByName(TestApp):
    def test_get_workrole_by_name(self):
        w1 = WorkRole(workRoleId=800,workRoleName='Technical Lead', isDeleted=0)
        db.session.add(w1)
        db.session.commit()

        response = self.client.get("/workRole/name/Technical Lead")
        self.assertEqual(response.json, {
                "code": 200,
                "data": {
                    "workRoleId": 800,
                    "workRoleName": "Technical Lead",
                    "isDeleted": False
                }
            
        })
    
    def test_get_workrole_by_name_fail(self):
        response = self.client.get("/workRole/name/Technical Lead")
        self.assertEqual(response.json, {
                "code": 404,
                "message": "WorkRole not found."
            })

class TestGetWorkRoleById(TestApp):
    def test_get_workrole_by_id(self):
        w1 = WorkRole(workRoleId=800,workRoleName='Technical Lead', isDeleted=0)
        db.session.add(w1)
        db.session.commit()

        response = self.client.get("/workRole/id/800")
        self.assertEqual(response.json, {
                "code": 200,
                "data": {
                    "workRoleId": 800,
                    "workRoleName": "Technical Lead",
                    "isDeleted": False
                }
            
        })
    
    def test_get_workrole_by_id_fail(self):
        response = self.client.get("/workRole/id/800")
        self.assertEqual(response.json, {
                "code": 404,
                "message": "WorkRole not found."
            })

class TestGetWorkRoleSkills(TestApp):
    def test_get_workrole_skills(self):
        w1 = WorkRole(workRoleId=800,workRoleName='Technical Lead', isDeleted=0)
        s1 = Skill(skillId=1,skillName='Python',skillDesc='Python',isDeleted=0)
        # construct workRoleSkills
        ws1 = workRoleSkills.insert().values(workRoleId=800,skillId=1)
        s2 = Skill(skillId=2,skillName='Java',skillDesc='Java',isDeleted=0)
        ws2 = workRoleSkills.insert().values(workRoleId=800,skillId=2)
        db.session.add(w1)
        db.session.add(s1)
        db.session.add(s2)
        db.session.execute(ws1)
        db.session.execute(ws2)
        db.session.commit()

        response = self.client.get("/workRole/800/skills")
        self.assertEqual(response.json, 
            {
                "code": 200,
                "data": {
                    "skills": [
                        {
                        "skillId": 1,
                        "skillName": 'Python',
                        "skillDesc": 'Python',
                        "isDeleted": False
                        },
                        {
                        "skillId": 2,
                        "skillName": 'Java',
                        "skillDesc": 'Java',
                        "isDeleted": False
                        }],
                    "workRole": {
                        "isDeleted": False,
                        "workRoleId": 800,
                        "workRoleName": "Technical Lead"
                    }
                }
            }
        )
    
    def test_get_workrole_skills_fail(self):
        response = self.client.get("/workRole/800/skills")
        self.assertEqual(response.json, 
            {
                "code": 404,
                "message": "Skill not found."
            }
        )

class TestCreateWorkRole(TestApp):
    def test_create_workrole(self):
        response = self.client.post("/workRole/create", data=json.dumps({
            "workRoleName": "Technical Lead",
            "isDeleted": False,
            "skills": ["207","208"]
        }),
        content_type='application/json')
        self.assertEqual(response.json, {
                "code": 201,
                "data": {
                    "skills": ["207","208"],
                    "workRole": {
                        "workRoleId": 1,
                        "workRoleName": "Technical Lead",
                        "isDeleted": False
                    }
                }
            
        })
    
    def test_create_workrole_fail(self):
        response = self.client.post("/workRole/create", data=json.dumps({
            "isDeleted": False,
            "skills": ["207","208"]
        }),
        content_type='application/json')
        self.assertEqual(response.json, {
                "code": 500,
                "message": "An error occurred creating the work role."
            })
    

class TestUpdateWorkRole(TestApp):
    def test_update_workrole(self):
        w1 = WorkRole(workRoleId=800,workRoleName='Technical Lead', isDeleted=0)
        db.session.add(w1)
        db.session.commit()

        response = self.client.put("/workRole/update/800", data=json.dumps({
            "workRoleName": "Senior Developer",
            "isDeleted": False,
            "skills": ["207","208"]
        }),
        content_type='application/json')
        self.assertEqual(response.json, {
                "code": 200,
                "data": {
                    "skills": ["207","208"],
                    "workRole": {
                        "workRoleId": 800,
                        "workRoleName": "Senior Developer",
                        "isDeleted": False
                    }
                }
            
        })
    
    def test_update_workrole_fail(self):
        response = self.client.put("/workRole/update/800", data=json.dumps({
            "workRoleName": "Senior Developer",
            "isDeleted": False,
            "skills": ["207","208"]
        }),
        content_type='application/json')
        self.assertEqual(response.json, {
                "code": 404,
                "message": "WorkRole not found."
            })

class TestSoftDeleteWorkRole(TestApp):
    def test_soft_delete_workrole(self):
        w1 = WorkRole(workRoleId=800,workRoleName='Technical Lead', isDeleted=0)
        db.session.add(w1)
        db.session.commit()

        response = self.client.put("/workRole/delete/800")
        self.assertEqual(response.json, {
                "code": 200,
                "data": {
                    "workRoleId": 800,
                    "workRoleName": "Technical Lead",
                    "isDeleted": True
                }
            
        })
    
    def test_soft_delete_workrole_fail(self):
        response = self.client.put("/workRole/delete/800")
        self.assertEqual(response.json, {
                "code": 404,
                "message": "WorkRole not found."
            })

class TestGetAllSkills(TestApp):
    def test_get_all_skills(self):
        s1 = Skill(skillId=1,skillName='Python',skillDesc='Python',isDeleted=0)
        s2 = Skill(skillId=2,skillName='Java',skillDesc='Java',isDeleted=0)
        db.session.add(s1)
        db.session.add(s2)
        db.session.commit()

        response = self.client.get("/skill")
        self.assertEqual(response.json, 
            {
                "code": 200,
                "data": {
                    "skills": [
                        {
                        "skillId": 1,
                        "skillName": 'Python',
                        "skillDesc": 'Python',
                        "isDeleted": False
                        },
                        {
                        "skillId": 2,
                        "skillName": 'Java',
                        "skillDesc": 'Java',
                        "isDeleted": False
                        }]
                }
            }
        )
    
    def test_get_all_skills_fail(self):
        response = self.client.get("/skill")
        self.assertEqual(response.json, 
            {
                "code": 404,
                "message": "Skill not found."
            }
        )

class TestGetSkillByName(TestApp):
    def test_get_skill_by_name(self):
        s1 = Skill(skillId=1,skillName='Python',skillDesc='Python',isDeleted=0)
        db.session.add(s1)
        db.session.commit()

        response = self.client.get("/skill/name/Python")
        self.assertEqual(response.json, {
                "code": 200,
                "data": {
                    "skillId": 1,
                    "skillName": "Python",
                    "skillDesc": "Python",
                    "isDeleted": False
                }
            
        })
    
    def test_get_skill_by_name_fail(self):
        response = self.client.get("/skill/name/Python")
        self.assertEqual(response.json, {
                "code": 404,
                "message": "Skill not found."
            })

class TestGetSkillById(TestApp):
    def test_get_skill_by_id(self):
        s1 = Skill(skillId=1,skillName='Python',skillDesc='Python',isDeleted=0)
        db.session.add(s1)
        db.session.commit()

        response = self.client.get("/skill/id/1")
        self.assertEqual(response.json, {
                "code": 200,
                "data": {
                    "skills": {
                    "skillId": 1,
                    "skillName": "Python",
                    "skillDesc": "Python",
                    "isDeleted": False
                    }
                }
            
        })
    
    def test_get_skill_by_id_fail(self):
        response = self.client.get("/skill/id/1")
        self.assertEqual(response.json, {
                "code": 404,
                "message": "Skill not found."
            })

class TestGetSkillAndCourses(TestApp):
    def test_get_skill_and_courses(self):
        s1 = Skill(skillId=1,skillName='Python',skillDesc='Python',isDeleted=0)
        c1 = Course(courseId="COR001",courseName='Systems Thinking and Design',courseDesc='This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
        courseStatus='Active', courseType='Internal',courseCategory='Core')
        sc1 = skillCourses.insert().values(skillId=1,courseId="COR001")
        db.session.add(s1)
        db.session.add(c1)
        db.session.execute(sc1)
        db.session.commit()

        response = self.client.get("/skill/1")
        self.assertEqual(response.json, 
            {
                "code": 200,
                "data": {
                    "courses": [
                        {
                        "courseId": "COR001",
                        "courseName": 'Systems Thinking and Design',
                        "courseDesc": 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
                        "courseStatus": "Active",
                        "courseType": "Internal",
                        "courseCategory": "Core"
                        }],
                    "skill": {
                        "isDeleted": False,
                        "skillId": 1,
                        "skillName": "Python",
                        "skillDesc": "Python"
                    }
                }
            }
        )
    
    def test_get_skill_and_courses_fail(self):
        response = self.client.get("/skill/1")
        self.assertEqual(response.json, 
            {
                "code": 404,
                "message": "Skill not found."
            }
        )

class TestCreateSkill(TestApp):
    def test_create_skill(self):
        response = self.client.post("/skill/create", data=json.dumps({
                    "skill": {
                        "skillName": 200,
                        "skillDesc": "hello",
                        "isDeleted": 0
                    },
                    "courses": ["COR001", "COR002"]
                }),
        content_type='application/json')
        self.assertEqual(response.json, {
                        "code": 201,
                        "data": {
                            "courses": [
                                "COR001",
                                "COR002"
                            ],
                            "skill": {
                                "isDeleted": False,
                                "skillDesc": "hello",
                                "skillId": 1,
                                "skillName": "200"
                            }
                        }
                    })

    def test_create_skill_fail(self):
        response = self.client.post("/skill/create", data=json.dumps({
                    "skill": {
                        "skillName": "asd",
                        "isDeleted": 0
                    },
                    "courses": ["COR001", "COR002"]
                }),
        content_type='application/json')
        self.assertEqual(response.json, {
                        "code": 500,
                        "message": "An error occurred creating the skill."
                    })

class TestUpdateSkill(TestApp):
    def test_update_skill(self):
        s1 = Skill(skillId=1,skillName='Python',skillDesc='Python',isDeleted=0)
        c1 = Course(courseId="COR001",courseName='Systems Thinking and Design',courseDesc='This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
        courseStatus='Active', courseType='Internal',courseCategory='Core')
        c2 = Course(courseId="COR002",courseName='Systems Thinking and Design',courseDesc='This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
        courseStatus='Active', courseType='Internal',courseCategory='Core')
        sc = skillCourses.insert().values(skillId=1,courseId="COR001")
        db.session.add(s1)
        db.session.add(c1)
        db.session.add(c2)
        db.session.execute(sc)
        db.session.commit()

        response = self.client.put("/skill/update/1", data=json.dumps({
                    "skill": {
                        "skillName": "Python",
                        "skillDesc": "hello",
                        "isDeleted": 0
                    },
                    "courses": ["COR001", "COR002"]
                }),
        content_type='application/json')
        self.assertEqual(response.json, {
                        "code": 200,
                        "data": {
                            "courses": [
                                "COR001",
                                "COR002"
                            ],
                            "skill": {
                                "isDeleted": False,
                                "skillDesc": "hello",
                                "skillId": 1,
                                "skillName": "Python"
                            }
                        }
                    })

    def test_update_skill_fail(self):
        s1 = Skill(skillId=1,skillName='Python',skillDesc='Python',isDeleted=0)
        db.session.add(s1)
        db.session.commit()
        response = self.client.put("/skill/update/1", data=json.dumps({
                    "skill": {
                        "skillName": "Python",
                        "skillDesc": "hello",
                        "isDeleted": 0
                    },
                    "courses": ["COR001", "COR002"]
                }),
        content_type='application/json')
        self.assertEqual(response.json, {
                        "code": 404,
                        "data": {
                            "courses": [
                                "COR001",
                                "COR002"
                            ],
                            "skillId": 1
                        },
                        "message": "Course does not exist."
                    })

    def test_update_skill_fail_2(self):
        response = self.client.put("/skill/update/1", data=json.dumps({
                    "skill": {
                        "skillName": "Python",
                        "skillDesc": "hello",
                        "isDeleted": 0
                    },
                    "courses": ["COR001", "COR002"]
                }),
        content_type='application/json')
        self.assertEqual(response.json, {
                        "code": 404,
                        "message": "Skill not found."
                    })

class TestSoftDeleteSkill(TestApp):
    def test_soft_delete_skill(self):
        s1 = Skill(skillId=1,skillName='Python',skillDesc='Python',isDeleted=0)
        db.session.add(s1)
        db.session.commit()

        response = self.client.put("/skill/delete/1")
        self.assertEqual(response.json, {
                        "code": 200,
                        "data": {
                            "isDeleted": True,
                            "skillDesc": "Python",
                            "skillId": 1,
                            "skillName": "Python"
                        }
                    })

    def test_soft_delete_skill_fail(self):
        response = self.client.put("/skill/delete/1")
        self.assertEqual(response.json, {
                        "code": 404,
                        "message": "Skill not found."
                    })

class TestGetAllLearningJourney(TestApp):
    def test_get_all_learning_journey(self):
        lj1 = LearningJourney(learningJourneyId=500,staffId=130001,workRoleId=803)
        # lj1Role = workRoles.insert().values(workRoleId=800,skillId=1)
        lj1Role = WorkRole(workRoleId=803,workRoleName="Product Manager",isDeleted=0)
        lj2 = LearningJourney(learningJourneyId=501,staffId=130001,workRoleId=804)
        lj2Role = WorkRole(workRoleId=804,workRoleName="Business Analyst",isDeleted=0)
        db.session.add(lj1)
        db.session.add(lj1Role)
        db.session.add(lj2)
        db.session.add(lj2Role)
        db.session.commit()

        response = self.client.get("/allLearningJourney/130001")
        self.assertEqual(response.json, 
                {
            "code": 200,
            "data": {
                "learningJourney": [
                    {
                        "learningJourneyId": 500, 
                        "staffId": 130001, 
                        "workRoleId": 803, 
                        "workRoleName": "Product Manager"
                    }, 
                    {
                        "learningJourneyId": 501, 
                        "staffId": 130001, 
                        "workRoleId": 804, 
                        "workRoleName": "Business Analyst"
                    }
                    ]
            }
        }
        )

    def test_get_all_learning_journey_fail(self):
        response = self.client.get("/allLearningJourney/130001")
        self.assertEqual(response.json, 
                {
            "code": 404,
            "message": "No Learning Journey found."
        }
        )

# Test get learning journey of staff
class TestGetLearningJourney(TestApp):

    def test_get_learning_journey(self):
        lj = LearningJourney(learningJourneyId=500,staffId=130001,workRoleId=803)
        c1 = Course(courseId="MGT002",courseName='Workplace Conflict Management for Professionals',courseDesc='This course will address the gaps to build consensus and utilise knowledge of conflict management techniques to diffuse tensions and achieve resolutions effectively in the best interests of the organisation.',
        courseStatus='Active', courseType='External',courseCategory='Management')
        s1 = Skill(skillId=207,skillName='Communication',skillDesc='Effective interaction between stakeholders',isDeleted=0)
        sc1 = skillCourses.insert().values(skillId=207,courseId="MGT002")
        c2 = Course(courseId="MGT004",courseName='Personal Effectiveness for Leaders',courseDesc='Learners will be able to acquire the skills and knowledge to undertake self-assessment in relation to one',
        courseStatus='Active', courseType='External',courseCategory='Management')
        s2 = Skill(skillId=208,skillName='Problem Solving',skillDesc='Achieving a goal by overcoming obstacles',isDeleted=0)
        sc2 = skillCourses.insert().values(skillId=208,courseId="MGT004")
        r1 = Registration(regId=1,courseId="MGT002",staffId=130001,regStatus="Registered",completionStatus="Incomplete")
        r2 = Registration(regId=245,courseId="MGT004",staffId=130001,regStatus="Registered",completionStatus="Incomplete")
        wr = WorkRole(workRoleId=803,workRoleName="Product Manager",isDeleted=0)
        wrs1 = workRoleSkills.insert().values(workRoleId=803,skillId=208)
        wrs2 = workRoleSkills.insert().values(workRoleId=803,skillId=207)
        ljd1 = learningJourneyDetails.insert().values(skillId=207,courseId="MGT002",learningJourneyId=500)
        ljd2 = learningJourneyDetails.insert().values(skillId=208,courseId="MGT004",learningJourneyId=500)

        db.session.add(lj)
        db.session.add(c1)
        db.session.add(c2)
        db.session.add(s1)
        db.session.add(s2)
        db.session.execute(sc1)
        db.session.execute(sc2)
        db.session.add(r1)
        db.session.add(r2)
        db.session.add(wr)
        db.session.execute(wrs1)
        db.session.execute(wrs2)
        db.session.execute(ljd1)
        db.session.execute(ljd2)
        db.session.commit()

        response = self.client.get("/learningJourney/500/130001")
        self.assertEqual(response.json, 
            {
                "code": 200, 
                "data": {
                    "courseStatus": [
                    {
                        "courseId": "MGT002", 
                        "status": "Incomplete"
                    }, 
                    {
                        "courseId": "MGT004", 
                        "status": "Incomplete"
                    }
                    ], 
                    "learningJourney": [
                    {
                        "learningJourneyId": 500, 
                        "staffId": 130001, 
                        "workRoleId": 803
                    }, 
                    [
                        {
                        "skills": {
                            "courses": [
                            {
                                "courseId": "MGT002", 
                                "courseName": "Workplace Conflict Management for Professionals"
                            }
                            ], 
                            "skillId": 207, 
                            "skillName": "Communication"
                        }
                        }, 
                        {
                        "skills": {
                            "courses": [
                            {
                                "courseId": "MGT004", 
                                "courseName": "Personal Effectiveness for Leaders"
                            }
                            ], 
                            "skillId": 208, 
                            "skillName": "Problem Solving"
                        }
                        }
                    ]
                    ]
                }
            }
        )



    def test_get_learning_journey_fail(self):
        response = self.client.get("/learningJourney/500/130001")
        self.assertEqual(response.json, 
                {
            "code": 404,
            "message": "No Learning Journey found."
        }
        )

# class TestCreateLearningJourney(TestApp):
#     def test_create_learning_journey(self):
#         response = self.client.post("/learningJourney/create", data=json.dumps({
#                     "learningJourney": {
#                         "learningJourneyId": 511,
#                         "staffId": 140008,
#                         "workRoleId": 810
#                     },
#                     "skills":[{
#                         "skillId": 207,
#                         "courses": ["MGT002"]
#                     },
#                     {   
#                         "skillId":208,
#                         "courses": ["MGT002"]
#                     }]
#                 }),
#         content_type='application/json')
#         self.assertEqual(response.json, {
#                     {
#                         "code": 201,
#                         "data": {
#                             "learningJourneyId": 511,
#                             "skills": [
#                                 {
#                                     "courses": [
#                                         "MGT002"
#                                     ],
#                                     "skillId": 207
#                                 },
#                                 {
#                                     "courses": [
#                                         "MGT002"
#                                     ],
#                                     "skillId": 208
#                                 }
#                             ]
#                         }
#                     }
#                     })

#     def test_create_learning_journey_fail(self):
#         response = self.client.post("/learningJourney/create", data=json.dumps({
#                     "learningJourney": {
#                         "learningJourneyId": 511,
#                         "staffId": 140008,
#                         "workRoleId": 999
#                     },
#                     "skills":[{
#                         "skillId": 207,
#                         "courses": ["MGT002"]
#                     },
#                     {   
#                         "skillId":208,
#                         "courses": ["MGT002"]
#                     }]
#                 }),
#         content_type='application/json')
#         self.assertEqual(response.json, {
#                         "code": 500,
#                         "message": "An error occurred creating the learning journey."
#                     })


class TestAddCourseToLearningJourney(TestApp):
    def test_add_course_to_learning_journey(self):
        lj = LearningJourney(learningJourneyId=500,staffId=130001,workRoleId=803)
        c1 = Course(courseId="MGT002",courseName='Workplace Conflict Management for Professionals',courseDesc='Learners will be able to acquire the skills and knowledge to manage conflict in the workplace',courseStatus='Active', courseType='External',courseCategory='Management')
        c2 = Course(courseId="MGT004",courseName='Personal Effectiveness for Leaders',courseDesc='Learners will be able to acquire the skills and knowledge to manage conflict in the workplace',courseStatus='Active', courseType='External',courseCategory='Management')
        c3 = Course(courseId="MGT003",courseName='Managing Workplace Stress',courseDesc='Learners will be able to acquire the skills and knowledge to manage conflict in the workplace',courseStatus='Active', courseType='External',courseCategory='Management')
        s1 = Skill(skillId=207,skillName='Communication',skillDesc='The ability to express ideas effectively',isDeleted=0)
        sc1 = skillCourses.insert().values(skillId=207,courseId="MGT002")
        s2 = Skill(skillId=208,skillName='Problem Solving',skillDesc='Achieving a goal by overcoming obstacles',isDeleted=0)
        sc2 = skillCourses.insert().values(skillId=208,courseId="MGT004")
        sc3 = skillCourses.insert().values(skillId=208,courseId="MGT003")
        r1 = Registration(regId=1,courseId="MGT002",staffId=130001,regStatus="Registered",completionStatus="Completed")
        r2 = Registration(regId=245,courseId="MGT004",staffId=130001,regStatus="Registered",completionStatus="Completed")
        r3 = Registration(regId=246,courseId="MGT003",staffId=130001,regStatus="Registered",completionStatus="Completed")
        wr = WorkRole(workRoleId=803,workRoleName="Product Manager",isDeleted=0)
        wrs1 = workRoleSkills.insert().values(workRoleId=803,skillId=208)
        wrs2 = workRoleSkills.insert().values(workRoleId=803,skillId=207)
        ljd1 = learningJourneyDetails.insert().values(skillId=207,courseId="MGT002",learningJourneyId=500)
        ljd2 = learningJourneyDetails.insert().values(skillId=208,courseId="MGT004",learningJourneyId=500)

        db.session.add(lj)
        db.session.add(c1)
        db.session.add(c2)
        db.session.add(c3)
        db.session.add(s1)
        db.session.add(s2)
        db.session.execute(sc1)
        db.session.execute(sc2)
        db.session.execute(sc3)
        db.session.add(r1)
        db.session.add(r2)
        db.session.add(r3)
        db.session.add(wr)
        db.session.execute(wrs1)
        db.session.execute(wrs2)
        db.session.execute(ljd1)
        db.session.execute(ljd2)
        db.session.commit()

        response = self.client.put("/learningJourney/addCourse/500/208", data=json.dumps({
            "courses": ["MGT003"]

        }),
        content_type='application/json')
        self.assertEqual(response.json, {
                    "code": 200,
                    "data": {
                        "skill": 208,
                        "courses": ["MGT003"]
                    },
                    "message": "Course(s) Added!"
                })

    def test_add_course_to_learning_journey_fail(self):
        lj = LearningJourney(learningJourneyId=500,staffId=130001,workRoleId=803)
        c1 = Course(courseId="MGT002",courseName='Workplace Conflict Management for Professionals',courseDesc='Learners will be able to acquire the skills and knowledge to manage conflict in the workplace',courseStatus='Active', courseType='External',courseCategory='Management')
        c2 = Course(courseId="MGT004",courseName='Personal Effectiveness for Leaders',courseDesc='Learners will be able to acquire the skills and knowledge to manage conflict in the workplace',courseStatus='Active', courseType='External',courseCategory='Management')
        c3 = Course(courseId="MGT003",courseName='Managing Workplace Stress',courseDesc='Learners will be able to acquire the skills and knowledge to manage conflict in the workplace',courseStatus='Active', courseType='External',courseCategory='Management')
        s1 = Skill(skillId=207,skillName='Communication',skillDesc='The ability to express ideas effectively',isDeleted=0)
        sc1 = skillCourses.insert().values(skillId=207,courseId="MGT002")
        s2 = Skill(skillId=208,skillName='Problem Solving',skillDesc='Achieving a goal by overcoming obstacles',isDeleted=0)
        sc2 = skillCourses.insert().values(skillId=208,courseId="MGT004")
        sc3 = skillCourses.insert().values(skillId=208,courseId="MGT003")
        r1 = Registration(regId=1,courseId="MGT002",staffId=130001,regStatus="Registered",completionStatus="Completed")
        r2 = Registration(regId=245,courseId="MGT004",staffId=130001,regStatus="Registered",completionStatus="Completed")
        r3 = Registration(regId=246,courseId="MGT003",staffId=130001,regStatus="Registered",completionStatus="Completed")
        wr = WorkRole(workRoleId=803,workRoleName="Product Manager",isDeleted=0)
        wrs1 = workRoleSkills.insert().values(workRoleId=803,skillId=208)
        wrs2 = workRoleSkills.insert().values(workRoleId=803,skillId=207)
        ljd1 = learningJourneyDetails.insert().values(skillId=207,courseId="MGT002",learningJourneyId=500)
        ljd2 = learningJourneyDetails.insert().values(skillId=208,courseId="MGT004",learningJourneyId=500)
        ljd3 = learningJourneyDetails.insert().values(skillId=208,courseId="MGT003",learningJourneyId=500)
        db.session.add(lj)
        db.session.add(c1)
        db.session.add(c2)
        db.session.add(c3)
        db.session.add(s1)
        db.session.add(s2)
        db.session.execute(sc1)
        db.session.execute(sc2)
        db.session.execute(sc3)
        db.session.add(r1)
        db.session.add(r2)
        db.session.add(r3)
        db.session.add(wr)
        db.session.execute(wrs1)
        db.session.execute(wrs2)
        db.session.execute(ljd1)
        db.session.execute(ljd2)
        db.session.execute(ljd3)
        db.session.commit()

        response = self.client.put("/learningJourney/addCourse/500/208", data=json.dumps({
            "courses": ["MGT003"]
        }),
        content_type='application/json')
        self.assertEqual(response.json,{
                    "code": 500,
                    "data": {
                        "skill": 208,
                        "courses": ["MGT003"]
                    },
                    "message": "This course already exist in the learning journey."
                })

    def test_add_course_to_learning_journey_fail2(self):
        response = self.client.put("/learningJourney/addCourse/501/208", data=json.dumps({
            "courses": ["MGT003"]

        }),
        content_type='application/json')
        self.assertEqual(response.json, {
            "code": 404,
            "message": "Learning Journey not found."
        })

class TestDeleteCourseFromLearningJourney(TestApp):
    def test_delete_course_from_learning_journey(self):
        lj = LearningJourney(learningJourneyId=500,staffId=130001,workRoleId=803)
        c1 = Course(courseId="MGT002",courseName='Workplace Conflict Management for Professionals',courseDesc='Learners will be able to acquire the skills and knowledge to manage conflict in the workplace',courseStatus='Active', courseType='External',courseCategory='Management')
        c2 = Course(courseId="MGT004",courseName='Personal Effectiveness for Leaders',courseDesc='Learners will be able to acquire the skills and knowledge to manage conflict in the workplace',courseStatus='Active', courseType='External',courseCategory='Management')
        c3 = Course(courseId="MGT003",courseName='Managing Workplace Stress',courseDesc='Learners will be able to acquire the skills and knowledge to manage conflict in the workplace',courseStatus='Active', courseType='External',courseCategory='Management')
        s1 = Skill(skillId=207,skillName='Communication',skillDesc='The ability to express ideas effectively',isDeleted=0)
        sc1 = skillCourses.insert().values(skillId=207,courseId="MGT002")
        s2 = Skill(skillId=208,skillName='Problem Solving',skillDesc='Achieving a goal by overcoming obstacles',isDeleted=0)
        sc2 = skillCourses.insert().values(skillId=208,courseId="MGT004")
        sc3 = skillCourses.insert().values(skillId=208,courseId="MGT003")
        r1 = Registration(regId=1,courseId="MGT002",staffId=130001,regStatus="Registered",completionStatus="Completed")
        r2 = Registration(regId=245,courseId="MGT004",staffId=130001,regStatus="Registered",completionStatus="Completed")
        r3 = Registration(regId=246,courseId="MGT003",staffId=130001,regStatus="Registered",completionStatus="Completed")
        wr = WorkRole(workRoleId=803,workRoleName="Product Manager",isDeleted=0)
        wrs1 = workRoleSkills.insert().values(workRoleId=803,skillId=208)
        wrs2 = workRoleSkills.insert().values(workRoleId=803,skillId=207)
        ljd1 = learningJourneyDetails.insert().values(skillId=207,courseId="MGT002",learningJourneyId=500)
        ljd2 = learningJourneyDetails.insert().values(skillId=208,courseId="MGT004",learningJourneyId=500)

        db.session.add(lj)
        db.session.add(c1)
        db.session.add(c2)
        db.session.add(c3)
        db.session.add(s1)
        db.session.add(s2)
        db.session.execute(sc1)
        db.session.execute(sc2)
        db.session.execute(sc3)
        db.session.add(r1)
        db.session.add(r2)
        db.session.add(r3)
        db.session.add(wr)
        db.session.execute(wrs1)
        db.session.execute(wrs2)
        db.session.execute(ljd1)
        db.session.execute(ljd2)
        db.session.commit()

        response = self.client.delete("/learningJourney/removeCourse/500/208", data=json.dumps({
            "courses": ["MGT004"]

        }),
        content_type='application/json')
        self.assertEqual(response.json, {
                    "code": 200,
                    "data": {
                        "skill": 208,
                        "courses": ["MGT004"]
                    },
                    "message": "Course(s) Deleted!"
                })

    def test_delete_course_from_learning_journey_fail2(self):
        response = self.client.put("/learningJourney/addCourse/501/208", data=json.dumps({
            "courses": ["MGT003"]

        }),
        content_type='application/json')
        self.assertEqual(response.json, {
            "code": 404,
            "message": "Learning Journey not found."
        })

class TestGetAllStaff(TestApp):
    def test_get_all_staff(self):
        s1 = Staff(staffId=130001,staffFName='John',staffLName='Doe',dept='IT',email='john@allinone.com.sg',role=2)
        db.session.add(s1)
        db.session.commit()

        response = self.client.get("/staff")
        self.assertEqual(response.json, 
            {
                "code": 200,
                "data": {
                    "staff": [
                        {
                        "staffId": 130001,
                        "staffFName": 'John',
                        "staffLName": 'Doe',
                        "dept": 'IT',
                        "email": 'john@allinone.com.sg',
                        "role": 2
                        }]
                }
            }
        )
    
    def test_get_all_staff_fail(self):
        response = self.client.get("/staff")
        self.assertEqual(response.json, 
            {
                "code": 404,
                "message": "Staff not found."
            }
        )

class TestGetStaffSkill(TestApp):
    def test_get_staff_skill(self):
        s1 = Staff(staffId=130001,staffFName='John',staffLName='Doe',dept='IT',email='john@allinone.com.sg',role=2)
        sk1 = Skill(skillId=207,skillName='Communication',skillDesc='The ability to express ideas effectively',isDeleted=0)
        ss1 = staffSkills.insert().values(staffId=130001,skillId=207)
        db.session.add(s1)
        db.session.add(sk1)
        db.session.execute(ss1)
        db.session.commit()

        response = self.client.get("/staff/130001/skills")
        self.assertEqual(response.json,
            {
                "code": 200,
                "data": {
                    "staff": {
                        "staffId": 130001,
                        "staffFName": 'John',
                        "staffLName": 'Doe',
                        "dept": 'IT',
                        "email": 'john@allinone.com.sg',
                        "role": 2,
                    },
                    "skills": [
                        {
                        "skillId": 207,
                        "skillName": 'Communication',
                        "skillDesc": 'The ability to express ideas effectively',
                        "isDeleted": False
                        }]
                }
            }
        )

    def test_get_staff_skill_fail1(self):
        s1 = Staff(staffId=130001,staffFName='John',staffLName='Doe',dept='IT',email='john@allinone.com.sg',role=2)
        db.session.add(s1)
        db.session.commit()
        response = self.client.get("/staff/130001/skills")
        self.assertEqual(response.json,
            {
                "code": 404,
                "message": "Skill not found."
            }
        )
        
    def test_get_staff_skill_fail2(self):
        response = self.client.get("/staff/130001/skills")
        self.assertEqual(response.json,
            {
                "code": 404,
                "message": "Staff not found."
            }
        )



if __name__ == '__main__':
    unittest.main()