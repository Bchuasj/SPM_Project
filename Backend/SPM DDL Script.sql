DROP DATABASE IF EXISTS SPM;
CREATE DATABASE IF NOT EXISTS SPM;
	
USE SPM;


CREATE TABLE Role ( 
	roleId int,
	roleName varchar(20) NOT NULL,
	PRIMARY KEY (roleId)
);

CREATE TABLE workRole ( 
	workRoleId int,
	workRoleName varchar(100) NOT NULL,
	isDeleted int,
	PRIMARY KEY (workRoleId)
);

CREATE TABLE Skill (
	skillId int,
	skillName varchar(50) NOT NULL,
	skillDesc varchar(255) NOT NULL,
	isDeleted int,
	PRIMARY KEY (skillId)
);

CREATE TABLE workRoleSkills (
	workRoleId int,
	skillId int,
	CONSTRAINT rsKey PRIMARY KEY (workRoleId,skillId),
	FOREIGN KEY (workRoleId) REFERENCES workRole(workRoleId),
	FOREIGN KEY (skillId) REFERENCES Skill(skillId)
);

CREATE TABLE Staff (
	staffId int,
	staffFName varchar(50) NOT NULL,
	staffLName varchar(50) NOT NULL,
	dept varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	role int,
	PRIMARY KEY (staffid),
	FOREIGN KEY (role) REFERENCES Role(roleId)
);

CREATE TABLE Course (
	courseId varchar(20),
	courseName varchar(50) NOT NULL,
	courseDesc varchar(255),
	courseStatus varchar(15),
	courseType varchar(10),
	courseCategory varchar(50),
	PRIMARY KEY (courseId)
);

CREATE TABLE SkillCourses (
	skillId int,
	courseId varchar(20),
	CONSTRAINT scKey PRIMARY KEY (skillId,courseId),
	FOREIGN KEY (skillId) REFERENCES Skill(skillId),
	FOREIGN KEY (courseId) REFERENCES Course(courseId)
);



CREATE TABLE LearningJourney (
	learningJourneyId int,
	staffId int,
	workRoleId int,
	PRIMARY KEY (learningJourneyId),
	FOREIGN KEY (staffId) REFERENCES Staff(staffId),
	FOREIGN KEY (workRoleId) REFERENCES workRole(workRoleId)
);

CREATE TABLE LearningJourneyDetails (
	skillId int,
	courseId varchar(20),
	learningJourneyId int,
	CONSTRAINT rsKey PRIMARY KEY (skillId, courseId, learningJourneyId),
	FOREIGN KEY (skillId) REFERENCES Skill(skillId),
	FOREIGN KEY (courseId) REFERENCES Course(courseId),
	FOREIGN KEY (learningJourneyId) REFERENCES LearningJourney(learningJourneyId)
);

CREATE TABLE StaffSkills (
	staffId int,
	skillId int,
	CONSTRAINT rsKey PRIMARY KEY (staffId, skillId),
	FOREIGN KEY (staffId) REFERENCES Staff(staffId),
	FOREIGN KEY (skillId) REFERENCES Skill(skillId)
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


