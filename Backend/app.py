import json
from unittest import result
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/SPM'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

db = SQLAlchemy(app)

# Association table to role and skills with many to many relationship
roleSkills = db.Table('roleSkills',
    db.Column('roleId', db.Integer, db.ForeignKey('role.roleId'), primary_key=True),
    db.Column('skillId', db.Integer, db.ForeignKey('skill.skillId'), primary_key=True)
)

class Role(db.Model):
    __tablename__ = 'role'
    roleId = db.Column(db.Integer, primary_key=True, nullable=False)
    roleName = db.Column(db.String(20), nullable=False)
    isDeleted = db.Column(db.Boolean)
    def __init__(self, roleId, roleName, isDeleted):
        self.roleId = roleId
        self.roleName = roleName
        self.isDeleted = isDeleted
    
    def json(self):
        return {
            "roleId": self.roleId,
            "roleName": self.roleName,
            "isDeleted": self.isDeleted
        }

class Skill(db.Model):
    __tablename__ = 'skill'
    skillId = db.Column(db.Integer, primary_key=True, nullable=False)
    skillName = db.Column(db.String(50), nullable=False)
    skillDesc = db.Column(db.String(50), nullable=False)
    isDeleted = db.Column(db.Boolean)
    def __init__(self, skillId, skillName, skillDesc, isDeleted):
        self.skillId = skillId
        self.skillName = skillName
        self.skillDesc = skillDesc
        self.isDeleted = isDeleted

    def json(self):
        return {
            "skillId": self.skillId,
            "skillName": self.skillName,
            "skillDesc": self.skillDesc,
            "isDeleted": self.isDeleted
            }

class Course(db.Model):
    __tablename__ = 'course'
    courseId = db.Column(db.String(20), primary_key=True, nullable=False)
    courseName = db.Column(db.String(50), nullable=False)
    courseDesc = db.Column(db.String(255))
    courseStatus = db.Column(db.String(15))
    courseType = db.Column(db.String(10))
    courseCategory = db.Column(db.String(50))
    def __init__(self, courseId, courseName, courseDesc, courseType, courseCategory, isDeleted):
        self.courseId = courseId
        self.courseName = courseName
        self.courseDesc = courseDesc
        self.courseType = courseType
        self.courseCategory = courseCategory
        self.isDeleted = isDeleted

    def json(self):
        return {
            "courseId": self.courseId,
            "courseName": self.courseName,
            "courseDesc": self.courseDesc,
            "courseStatus": self.courseStatus,
            "courseType": self.courseType
            }

# Association table to course and skills with many to many relationship
skillCourses = db.Table('skillCourses',
    db.Column('courseId', db.String(20), db.ForeignKey('course.courseId'), primary_key=True),
    db.Column('skillId', db.Integer, db.ForeignKey('skill.skillId'), primary_key=True)
)

# Association table to course and skills with many to many relationship
learningJourneyDetails = db.Table('learningJourneyDetails',
    db.Column('skillId', db.Integer, db.ForeignKey('skill.skillId'), primary_key=True),
    db.Column('courseId', db.String(20), db.ForeignKey('course.courseId'), primary_key=True),
    db.Column('learningJourneyId', db.Integer, db.ForeignKey('learningJourney.learningJourneyId'),primary_key=True)
)


class LearningJourney(db.Model):
    __tablename__ = 'learningjourney'
    learningJourneyId = db.Column(db.Integer, primary_key=True, nullable=False)
    staffId = db.Column(db.Integer, nullable=False)
    roleId = db.Column(db.Integer, nullable=False)

    def __init__(self, learningJourneyId, staffId, roleId):
        self.learningJourneyId = learningJourneyId
        self.staffId = staffId
        self.roleId = roleId

    def json(self):
        return {
            "learningJourneyId": self.learningJourneyId,
            "staffId": self.staffId,
            "roleId": self.roleId
        }

class Registration(db.Model):
    __tablename__ = 'registration'
    regId = db.Column(db.Integer, primary_key=True, nullable=False)
    courseId = db.Column(db.String(20), nullable=False)
    staffId = db.Column(db.Integer, nullable=False)
    regStatus = db.Column(db.String(20))
    completionStatus = db.Column(db.String(20))

    def __init__(self, regId, courseId, staffId, regStatus, completionStatus):
        self.regId = regId
        self.courseId = courseId
        self.staffId = staffId
        self.regStatus = regStatus
        self.completionStatus = completionStatus

    def json(self):
        return {
            "regId": self.regId,
            "courseId": self.courseId,
            "staffId": self.staffId,
            "regStatus": self.regStatus,
            "completionStatus": self.completionStatus 
        }

#GET ALL ROLES
@app.route("/role")
def getAllRoles():
    rolesList = Role.query.all()
    if len(rolesList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "roles": [role.json() for role in rolesList]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No role found."
        }
    )

#GET ROLE BY role name
@app.route("/role/<string:roleName>")
def getRole(roleName):
    role = Role.query.filter_by(roleName=roleName).first()
    if role:
        return jsonify(
            {
                "code": 200,
                "data": role.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Role not found."
        }
    )

#GET ROLE WITH SKILLS AFFLIATED TO IT
@app.route("/role/<int:roleId>/skills")
def getSkills(roleId):
    skillsList = Skill.query.join(roleSkills, (roleSkills.c.skillId == Skill.skillId)).filter(roleSkills.c.roleId == roleId).all()
    if len(skillsList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "skills": [skill.json() for skill in skillsList]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No skills found."
        }
    )

#GET ALL SKILLS
@app.route("/skill")
def getAllSkills():
    skillsList = Skill.query.all()
    if len(skillsList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "skills": [skill.json() for skill in skillsList]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No skill found."
        }
    )

#GET SKILL BY ID
@app.route("/skill/<int:skillId>")
def getSkill(skillId):
    skill = Skill.query.filter_by(skillId=skillId).first()
    if skill:
        return jsonify(
            {
                "code": 200,
                "data": skill.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Skill not found."
        }
    )

# GET SKILL AND COURSES RELATED TO IT
@app.route("/skill/<int:skillId>/courses")
def getCourses(skillId):
    coursesList = Course.query.join(skillCourses, (skillCourses.c.courseId == Course.courseId)).filter(skillCourses.c.skillId == skillId).all()
    if len(coursesList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "courses": [course.json() for course in coursesList]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No courses found."
        }
    )


#CREATE SKILL AND ADD COURSES RELATED TO IT INTO skillCourses TABLE
@app.route("/skill/create", methods=['POST'])
def createSkill():
    data = request.get_json()
    try:
        skill = Skill(**data['skill'])
        # add the new skill with courses related to it to skillCourses table
        db.session.add(skill)
        db.session.commit()
        if data['courses']:
            for course in data['courses']:
                insert = skillCourses.insert().values(skillId=skill.skillId, courseId=course)
                db.session.execute(insert)

        #commit the new skill and courses related to it to skillCourses table
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "skillId": skill.skillId,
                    "courses": [course for course in data['courses']]
                },
                "message": "An error occurred creating the skill."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": {"skill" :skill.json(),
                    "courses": [course for course in data['courses']]
            }
        }
    ), 201

#UPDATE SKILL along with skillCourses TABLE
@app.route("/skill/update/<int:skillId>", methods=['PUT'])
def updateSkillCourses(skillId):
    skill = Skill.query.filter_by(skillId=skillId).first()
    if skill:
        try:
            data = request.get_json()
            skill.skillName = data['skill']['skillName']
            skill.skillDesc = data['skill']['skillDesc']
            skill.isDeleted = data['skill']['isDeleted']
            db.session.commit()
            # delete all courses related to the skill in skillCourses table
            delete = skillCourses.delete().where(skillCourses.c.skillId == skillId)
            db.session.execute(delete)
            db.session.commit()
            # add the new courses related to the skill
            if data['courses']:
                for course in data['courses']:
                    insert = skillCourses.insert().values(skillId=skill.skillId, courseId=course)
                    db.session.execute(insert)
                    db.session.commit()
            return jsonify(
                {
                    "code": 200,
                    "data": {
                        "skill": skill.json(),
                        "courses": [course for course in data['courses']]
                    },
                }
            )
        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "skill": skill.json(),
                        "courses": [course for course in data['courses']]
                    },
                    "message": "An error occurred updating the skill."
                }
            ), 500

    return jsonify(
        {
            "code": 404,
            "message": "Skill not found."
        }
    )

#SOFT DELETE SKILL
@app.route("/skill/delete/<int:skillId>", methods=['PUT'])
def deleteSkill(skillId):
    skill = Skill.query.filter_by(skillId=skillId).first()
    if skill:
        skill.isDeleted = True
        try:
            skillCourses.query.filter_by(skillId=skillId).delete()
            db.session.commit()
        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "skillId": skill.skillId
                    },
                    "message": "An error occurred deleting the skill."
                }
            ), 500

        return jsonify(
            {
                "code": 200,
                "data": skill.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Skill not found."
        }
    )

# GET All Learning Journeys of a specific staff (Show Role Name)
@app.route("/allLearningJourney/<int:staffId>")
def getAllLearningJourney(staffId):

    ljList = LearningJourney.query.filter_by(staffId=staffId).all()
    roleList = Role.query.join(LearningJourney, (LearningJourney.roleId == Role.roleId )).filter_by(staffId=staffId).all()

    print(type(ljList))
    print(ljList[0])
    
    # Append role Name into the list of Learning Journey so that easier retrieval
    resultList = []

    for i in range(len(ljList)):
        res = {}
        res = ljList[i].json()
        res['roleName'] = roleList[i].roleName
        resultList.append(res)
    
    print(resultList)



    if ljList:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "learningJourney": resultList
                
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No Learning Journey found."
        }
    )


# Get a specific Learning Journey of a specific staff
@app.route("/learningJourney/<int:learningJourneyId>/<int:staffId>")
def getLearningJourney(learningJourneyId,staffId):
    ljList = LearningJourney.query.filter_by(learningJourneyId = learningJourneyId).all()
    courseList = Course.query.join(learningJourneyDetails, (learningJourneyDetails.c.courseId == Course.courseId )).filter_by(learningJourneyId=learningJourneyId).all()
    skillList = Skill.query.join(learningJourneyDetails, (learningJourneyDetails.c.skillId == Skill.skillId )).filter_by(learningJourneyId=learningJourneyId).all()

    courseStatus = []
    # CALL REGISTRATION TABLE TO CHECK COMPLETION STATUS
    regList = Registration.query.filter_by(staffId=staffId).all()
    print(regList)


    # Get all the status of the courses in the learning journey
    for course in courseList:
        for regCourse in regList:
            # For courses that are completed, update the courseStatus that is completed
            if course.courseId == regCourse.courseId and regCourse.completionStatus == "Completed":
                courseStatus.append({"courseId": course.courseId, "status": "Completed"})
        # If by the end of the loop, no match has been found, then the course has yet to be registed/complete
        courseStatus.append({"courseId": course.courseId, "status": "Incomplete"})
    

    print(courseStatus)


    # Append role Name, Course Name, course Status into the list of a specific Learning Journey so that easier retrieval
    resultList = []

    for i in range(len(ljList)):
        res = ljList[i].json()
        
        tempSkillList = []
        for skill in skillList:
            tempSkill = {}
            print("skill Id log:",skill.json()['skillId'])
            tempSkill['skills'] = {'skillId':skill.json()['skillId'],"courses":[]}


            skillCourses = getSkillCourses(skill.json()['skillId'])
            for course in courseList:
                for skillCourse in skillCourses:
                    if course.json()['courseId'] == skillCourse.json()['courseId']:
             
                        tempSkill["skills"]["courses"].append(course.json()['courseId'])
            tempSkillList.append(tempSkill)
        
        resultList.append(res)
        resultList.append(tempSkillList)
            
    print(resultList)

  
    if courseList:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "learningJourney": resultList,
                    "courseStatus": courseStatus

                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No Learning Journey found."
        }
    )

# Helper function for get Learning Journey Details, this function will retrieve the courses related to a skill
def getSkillCourses(skillId):

    courseList = Course.query.join(learningJourneyDetails, (learningJourneyDetails.c.courseId == Course.courseId )).filter_by(skillId = skillId).all()
    return courseList

#Create Learning Journey (together with the skills and courses planned)
@app.route("/learningJourney/create", methods=['POST'])
def createLearningJourney():
    data = request.get_json()
    """
        Sample JSON Body: // Frontend has to pass this inputs to the backend
        {  
            "learningJourney": {
                "learningJourneyId": 511, (format on id depends on your mockup data)
                "staffId": 140008,
                "roleId": 1
            },
            "skills":[{
                "skillId": 207,
                "courses": ["MGT002"]
            },
            {   
                "skillId":208,
                "courses": ["MGT002"]
            }]
        }

    """
    try:
        lj = LearningJourney(**data['learningJourney'])
        # add the new skill with courses related to it to skillCourses table
        db.session.add(lj)
        db.session.commit()
        if data['skills']:
            for skill in data['skills']:
                for course in skill["courses"]:
                    print(data['learningJourney']['learningJourneyId'])
                    print(skill['skillId'])
                    print(course)
                    insert = learningJourneyDetails.insert().values(learningJourneyId=data['learningJourney']['learningJourneyId'],skillId=skill['skillId'], courseId=course)
                    db.session.execute(insert)
        # if data['courses']:
        #     for course in data['courses']:
        #         insert = skillCourses.insert().values(skillId=skill.skillId, courseId=course)
        #         db.session.execute(insert)

        #commit the new skill and courses related to it to skillCourses table
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "learningJourneyId": data['learningJourney']['learningJourneyId'],
                    "skills": [skill for skill in data["skills"]]
             
                },
                "message": "An error occurred creating the skill."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": { 
                "learningJourneyId": data['learningJourney']['learningJourneyId'],
                "skills": [skill for skill in data["skills"]]
            }
        }
    ), 201

#UPDATE Learning Journey (adding of courses to a skill)
@app.route("/learningJourney/addCourse/<int:learningJourneyId>/<int:skillId>", methods=['PUT'])
def addCourseLJ(learningJourneyId,skillId):

    """
        Sample JSON Body: // Frontend has to pass this inputs to the backend
        {  
            {   
                "courses": ["MGT002"]
            }]
        }

    """

    lj = LearningJourney.query.filter_by(learningJourneyId=learningJourneyId).first()
    courseList = Course.query.join(learningJourneyDetails, (learningJourneyDetails.c.courseId == Course.courseId)).filter_by(learningJourneyId=learningJourneyId).all()

    if lj:
        try:
            data = request.get_json()

            if courseList:
                for course in data['courses']:
                        insert = learningJourneyDetails.insert().values(skillId=skillId, courseId=course, learningJourneyId=learningJourneyId)
                        db.session.execute(insert)
                        db.session.commit()
            return jsonify(
                {
                    "code": 200,
                    "data": {
                        "skill": skillId,
                        "courses": [course for course in data['courses']]
                    },
                    "message": "Course(s) Added!"
                }
            )
        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "skill": skillId,
                        "courses": [course for course in data['courses']]
                    },
                    "message": "This course already exist in the learning journey."
                }
            ), 500

    return jsonify(
        {
            "code": 404,
            "message": "Learning Journey not found not found."
        }
    )

#UPDATE Learning Journey (removing of courses to a skill)
@app.route("/learningJourney/removeCourse/<int:learningJourneyId>/<int:skillId>", methods=['DELETE'])
def removeCourseLJ(learningJourneyId,skillId):

    """
        Sample JSON Body: // Frontend has to pass this inputs to the backend
        {  
            {   
                "courses": ["MGT002"]
            }]
        }
    """

    lj = LearningJourney.query.filter_by(learningJourneyId=learningJourneyId).first()
    courseList = Course.query.join(learningJourneyDetails, (learningJourneyDetails.c.courseId == Course.courseId)).filter_by(learningJourneyId=learningJourneyId).all()

    if lj:
        try:
            data = request.get_json()

            if courseList:
                for courseDelete in data['courses']:

                        delete = learningJourneyDetails.delete().where(learningJourneyDetails.c.skillId==skillId, learningJourneyDetails.c.courseId ==courseDelete, learningJourneyDetails.c.learningJourneyId==learningJourneyId)
                        db.session.execute(delete)
                        db.session.commit()
            return jsonify(
                {
                    "code": 200,
                    "data": {
                        "skill": skillId,
                        "courses": [course for course in data['courses']]
                    },
                    "message": "Course(s) Deleted!"
                }
            )
        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "skill": skillId,
                        "courses": [course for course in data['courses']]
                    },
                    "message": "There is an error deleting this course in the learning journey."
                }
            ), 500

    return jsonify(
        {
            "code": 404,
            "message": "Learning Journey not found not found."
        }
    )


# Deleting a Learning Journey
# deletes a learning journey details first then proceed to delete the Learning Journey
@app.route("/learningJourney/delete/<int:learningJourneyId>", methods=['DELETE'])
def deleteLearningJourney(learningJourneyId):
    lj = LearningJourney.query.filter_by(learningJourneyId=learningJourneyId).first()

    if lj:
        try:
            delete = learningJourneyDetails.delete().where(learningJourneyDetails.c.learningJourneyId == learningJourneyId)
            db.session.execute(delete)


            db.session.delete(lj)
            db.session.commit()

        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "learningJourneyId": lj.learningJourneyId
                    },
                    "message": "An error occurred deleting the learning journey."
                }
            ), 500

        return jsonify(
            {
                "code": 200,
                "data": "Deletion Success!"
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Learning Journey not found."
        }
    )

# # Deleting a Learning Journey
# # deletes a learning journey details first then proceed to delete the Learning Journey
# @app.route("/learningJourney/delete/<int:learningJourneyId>", methods=['DELETE'])
# def deleteLearningJourney(learningJourneyId):
#     ljDetail = LearningJourneyDetails.query.filter_by(learningJourneyId=learningJourneyId).all()
#     lj = LearningJourney.query.filter_by(learningJourneyId=learningJourneyId).first()
#     if lj:
#         if len(ljDetail):
#             try:
#                 for detail in ljDetail:
#                     db.session.delete(detail)
#                     db.session.commit()

#             except:
#                 return jsonify(
#                     {
#                         "code": 500,
#                         "data": {
#                             "learningJourneyId": [detail.json() for detail in ljDetail]
#                         },
#                         "message": "An error occurred deleting the Learning Journey details."
#                     }
#                 ), 500
            
#         try:
#             db.session.delete(lj)
#             db.session.commit()

#         except:
#             return jsonify(
#                 {
#                     "code": 500,
#                     "data": {
#                         "learningJourneyId": lj.learningJourneyId
#                     },
#                     "message": "An error occurred deleting the learning journey."
#                 }
#             ), 500

#         return jsonify(
#             {
#                 "code": 200,
#                 "data": "Deletion Success!"
#             }
#         )
#     return jsonify(
#         {
#             "code": 404,
#             "message": "Learning Journey not found."
#         }
#     )


# # Add in the skill and the course for the role one by one (Due to the table storing it row by row) 
# @app.route("/learningJourneyDetails/create", methods=['POST'])
# def createLearningJourneyDetail():
#     data = request.get_json()
#     learningJourneyDetails = LearningJourneyDetails(**data)
    
#     try:
#         db.session.add(learningJourneyDetails)
#         db.session.commit()

        
#     except:
#         return jsonify(
#             {
#                 "code": 500,
#                 "data": {
#                     "skillId": learningJourneyDetails.skillId,
#                     "courseId": learningJourneyDetails.courseId,
#                     "learningJourneyId": learningJourneyDetails.learningJourneyId
#                 },
#                 "message": "An error occurred creating the learningJourney."
#             }
#         ), 500

#     return jsonify(
#         {
#             "code": 201,
#             "data": learningJourneyDetails.json()
#         }
#     ), 201

# # Update a skill and course planned for a learning journey
# @app.route("/learningJourneyDetails/update/<int:skillId>/<int:courseId>/<int:learningJourneyId>", methods=['PUT'])
# def updateLearningJourneyDetails(skillId,courseId,learningJourneyId):
#     ljDetail = LearningJourneyDetails.query.filter_by(skillId=skillId,courseId=courseId,learningJourneyId=learningJourneyId).first()
#     if ljDetail:
#         data = request.get_json()

#         try:
#             ljDetail.skillId = data['skillId']
#             ljDetail.courseId = data['courseId']
#             db.session.commit()

#         except:
#             return jsonify(
#                 {
#                     "code": 500,
#                     "data": {
#                         "message": "You already have Skill ID:" + str(data['skillId']) + " and CourseID: " + str(data['courseId']) + " stored in this learning journey."
#                     }
                    
#                 }
#             ), 500
#         return jsonify(
#             {
#                 "code": 200,
#                 "data": "Update successfully"
#             }
#         )



#     return jsonify(
#         {
#             "code": 404,
#             "message": "Learning Journey Detail not found."
#         }
#     )

# # Delete a course and the skill attached to it
# @app.route("/learningJourneyDetails/delete/<int:skillId>/<int:courseId>/<int:learningJourneyId>", methods=['DELETE'])
# def deleteLearningJourneyDetails(skillId,courseId,learningJourneyId):
#     ljDetail = LearningJourneyDetails.query.filter_by(skillId=skillId,courseId=courseId,learningJourneyId=learningJourneyId).first()
#     if ljDetail:
#         try:
#             db.session.delete(ljDetail)
#             db.session.commit()
#         except:
#             return jsonify(
#                 {
#                     "code": 500,
#                     "data": {
#                         "learningJourneyId": ljDetail.learningJourneyId
#                     },
#                     "message": "An error occurred deleting the skill."
#                 }
#             ), 500

#         return jsonify(
#             {
#                 "code": 200,
#                 "data": "Deletion Success!"
#             }
#         )
#     return jsonify(
#         {
#             "code": 404,
#             "message": "Learning Journey Detail not found."
#         }
#     )
if __name__ == '__main__':
    app.run(port=5006, debug=True)