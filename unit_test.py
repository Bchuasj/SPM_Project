import unittest
import flask_testing
import json
from Backend.app import app, db, Role, WorkRole, Skill, Course, LearningJourney, Registration, workRoleSkills, skillCourses, learningJourneyDetails


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

if __name__ == '__main__':
    unittest.main()