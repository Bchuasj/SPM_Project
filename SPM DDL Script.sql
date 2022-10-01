CREATE DATABASE SPM;

USE SPM;

CREATE TABLE Role (
roleId int,
roleName varchar(20) NOT NULL,
isDeleted boolean,
PRIMARY KEY (roleId)
);

CREATE TABLE Skill (
skillId int,
skillName varchar(50) NOT NULL,
skillDesc varchar(50) NOT NULL,
role int,
isDeleted boolean,
PRIMARY KEY (skillId),
FOREIGN KEY (role) REFERENCES Role(roleId)
);

CREATE TABLE Staff (
staffId int,
staffFName varchar(50) NOT NULL,
staffLName varchar(50) NOT NULL,
dept varchar(50) NOT NULL,
role int,
userType varchar(20),
PRIMARY KEY (staffId),
FOREIGN KEY (role) REFERENCES Role(roleId)
);

CREATE TABLE Course (
courseId varchar(20),
courseName varchar(50) NOT NULL,
courseDesc varchar(255),
courseStatus varchar(15),
courseType varchar(10),
courseCategory varchar(50),
skill int,
isDeleted boolean,
PRIMARY KEY (courseId),
FOREIGN KEY (skill) REFERENCES Skill(skillId)
);

CREATE TABLE Registration (
regId int,
courseId varchar(20),
staffId int,
regStatus varchar(20) NOT NULL,
completionStatus varchar(20) NOT NULL,
PRIMARY KEY (regId),
FOREIGN KEY (courseId) REFERENCES Course(courseId),
FOREIGN KEY (staffId) REFERENCES Staff(staffId)
);

CREATE TABLE LearningJourney (
learningJourneyId int,
staff int,
role int,
skill int,
course varchar(20),
CONSTRAINT LjKey PRIMARY KEY (learningJourneyId,staff,role,skill,course),
FOREIGN KEY (staff) REFERENCES Staff(staffId),
FOREIGN KEY (role) REFERENCES Role(roleId),
FOREIGN KEY (skill) REFERENCES Skill(skillId),
FOREIGN KEY (course) REFERENCES Course(courseId)
);
