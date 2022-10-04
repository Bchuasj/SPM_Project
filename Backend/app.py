import json
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

class LearningJourneyDetails(db.Model):
    __tablename__ = 'learningjourneydetails'
    skillId = db.Column(db.Integer, primary_key=True, nullable=False)
    courseId = db.Column(db.Integer, primary_key=True, nullable=False)
    learningJourneyId = db.Column(db.Integer, primary_key=True, nullable=False)

    def __init__(self, skillId, courseId, learningJourneyId):
        self.skillId = skillId
        self.courseId = courseId
        self.learningJourneyId = learningJourneyId

    def json(self):
        return {
            "skillId": self.skillId,
            "courseId": self.courseId,
            "learningJourneyId": self.learningJourneyId 
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

#GET ROLE BY ID
@app.route("/role/<int:roleId>")
def getRole(roleId):
    role = Role.query.filter_by(roleId=roleId).first()
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

# GET All Learning Journeys (without details, when click it will call out the get learning journey by ID)
# Also get all Learning Journeys is only for the specific user, hence filter by StaffID 
# This is to prevent users to view other users' LJ
@app.route("/allLearningJourney/<int:staffId>")
def getAllLearningJourney(staffId):
    ljList = LearningJourney.query.filter_by(staffId=staffId).all()

    if ljList:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "learningJourney": [lj.json() for lj in ljList]
                
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
@app.route("/learningJourney/<int:learningJourneyId>")
def getLearningJourney(learningJourneyId):
    lj = LearningJourney.query.filter_by(learningJourneyId=learningJourneyId).first()
    detailsList = LearningJourneyDetails.query.filter_by(learningJourneyId=learningJourneyId).all()
    print("DetailsList Type", type(detailsList))

    if lj:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "learningJourney": lj.json(),
                    "learningJourneyDetails":  [details.json() for details in detailsList]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No Learning Journey found."
        }
    )

# Create a Learning Journey (Without details)
@app.route("/learningJourney/create", methods=['POST'])
def createLearningJourney():
    data = request.get_json()
    learningJourney = LearningJourney(**data)
    
    try:
        db.session.add(learningJourney)
        db.session.commit()

        
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "learningJourneyId": learningJourney.learningJourneyId
                },
                "message": "An error occurred creating the learningJourney."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": learningJourney.json()
        }
    ), 201

# Deleting a Learning Journey
# deletes a learning journey details first then proceed to delete the Learning Journey
@app.route("/learningJourney/delete/<int:learningJourneyId>", methods=['DELETE'])
def deleteLearningJourney(learningJourneyId):
    ljDetail = LearningJourneyDetails.query.filter_by(learningJourneyId=learningJourneyId).all()
    lj = LearningJourney.query.filter_by(learningJourneyId=learningJourneyId).first()
    if lj:
        if len(ljDetail):
            try:
                for detail in ljDetail:
                    db.session.delete(detail)
                    db.session.commit()

            except:
                return jsonify(
                    {
                        "code": 500,
                        "data": {
                            "learningJourneyId": [detail.json() for detail in ljDetail]
                        },
                        "message": "An error occurred deleting the Learning Journey details."
                    }
                ), 500
            
        try:
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


# Add in the skill and the course for the role one by one (Due to the table storing it row by row) 
@app.route("/learningJourneyDetails/create", methods=['POST'])
def createLearningJourneyDetail():
    data = request.get_json()
    learningJourneyDetails = LearningJourneyDetails(**data)
    
    try:
        db.session.add(learningJourneyDetails)
        db.session.commit()

        
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "skillId": learningJourneyDetails.skillId,
                    "courseId": learningJourneyDetails.courseId,
                    "learningJourneyId": learningJourneyDetails.learningJourneyId
                },
                "message": "An error occurred creating the learningJourney."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": learningJourneyDetails.json()
        }
    ), 201

# Update a skill and course planned for a learning journey
@app.route("/learningJourneyDetails/update/<int:skillId>/<int:courseId>/<int:learningJourneyId>", methods=['PUT'])
def updateLearningJourneyDetails(skillId,courseId,learningJourneyId):
    ljDetail = LearningJourneyDetails.query.filter_by(skillId=skillId,courseId=courseId,learningJourneyId=learningJourneyId).first()
    if ljDetail:
        data = request.get_json()

        try:
            ljDetail.skillId = data['skillId']
            ljDetail.courseId = data['courseId']
            db.session.commit()

        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "message": "You already have Skill ID:" + str(data['skillId']) + " and CourseID: " + str(data['courseId']) + " stored in this learning journey."
                    }
                    
                }
            ), 500
        return jsonify(
            {
                "code": 200,
                "data": "Update successfully"
            }
        )



    return jsonify(
        {
            "code": 404,
            "message": "Learning Journey Detail not found."
        }
    )

# Delete a course and the skill attached to it
@app.route("/learningJourneyDetails/delete/<int:skillId>/<int:courseId>/<int:learningJourneyId>", methods=['DELETE'])
def deleteLearningJourneyDetails(skillId,courseId,learningJourneyId):
    ljDetail = LearningJourneyDetails.query.filter_by(skillId=skillId,courseId=courseId,learningJourneyId=learningJourneyId).first()
    if ljDetail:
        try:
            db.session.delete(ljDetail)
            db.session.commit()
        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "learningJourneyId": ljDetail.learningJourneyId
                    },
                    "message": "An error occurred deleting the skill."
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
            "message": "Learning Journey Detail not found."
        }
    )
if __name__ == '__main__':
    app.run(port=5006, debug=True)