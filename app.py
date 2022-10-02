from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/SPM'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

db = SQLAlchemy(app)

# role_skills = db.Table('role_skills',
#     db.Column('role_id', db.Integer, db.ForeignKey('role.id'), primary_key=True),
#     db.Column('skill_id', db.Integer, db.ForeignKey('skill.id'), primary_key=True)
# )

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
    courseDesc = db.Column(db.String(255), nullable=False)
    courseType = db.Column(db.String(10), nullable=False)
    courseCategory = db.Column(db.String(50), nullable=False)
    isDeleted = db.Column(db.Boolean)
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
            "courseType": self.courseType,
            "isDeleted": self.isDeleted
            }

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

#CREATE SKILL
@app.route("/skill/create", methods=['POST'])
def createSkill():
    data = request.get_json()
    skill = Skill(**data)
    try:
        db.session.add(skill)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "skillId": skill.skillId
                },
                "message": "An error occurred creating the skill."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": skill.json()
        }
    ), 201

#UPDATE SKILL
@app.route("/skill/update/<int:skillId>", methods=['PUT'])
def updateSkill(skillId):
    skill = Skill.query.filter_by(skillId=skillId).first()
    if skill:
        data = request.get_json()
        skill.skillName = data['skillName']
        skill.skillDesc = data['skillDesc']
        skill.isDeleted = data['isDeleted']
        try:
            db.session.commit()
        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "skillId": skill.skillId
                    },
                    "message": "An error occurred updating the skill."
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

#SOFT DELETE SKILL
@app.route("/skill/delete/<int:skillId>", methods=['PUT'])
def deleteSkill(skillId):
    skill = Skill.query.filter_by(skillId=skillId).first()
    if skill:
        skill.isDeleted = True
        try:
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

# Can update but did not show return success json message
@app.route("/learningJourneyDetails/update/<int:skillId>/<int:courseId>/<int:learningJourneyId>", methods=['PUT'])
def updateLearningJourneyDetails(skillId,courseId,learningJourneyId):
    ljDetail = LearningJourneyDetails.query.filter_by(skillId=skillId,courseId=courseId,learningJourneyId=learningJourneyId).first()
    if ljDetail:
        data = request.get_json()
        ljDetail.skillId = data['skillId']
        ljDetail.courseId = data['courseId']
        db.session.commit()

        return jsonify(
            {
                "code": 200,
                "data": "Update successfully"
            }
        )

        # try:

        # except:
        #     return jsonify(
        #         {
        #             "code": 500,
        #             "data": {
        #                 "learningJourneyId": ljDetail.learningJourneyId
        #             },
        #             "message": "An error occurred updating the learning journey."
        #         }
        #     ), 500


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