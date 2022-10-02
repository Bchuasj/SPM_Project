DROP DATABASE IF EXISTS SPM;
CREATE DATABASE IF NOT EXISTS SPM;
	
USE SPM;


CREATE TABLE Role ( 
	roleID int,
	roleName varchar(20) NOT NULL,
	isDeleted int,
	PRIMARY KEY (roleID)
);

CREATE TABLE Skill (
	skillID int,
	skillName varchar(50) NOT NULL,
	skillDesc varchar(50) NOT NULL,
	isDeleted int,
	PRIMARY KEY (skillID)
);

CREATE TABLE RoleSkills (
	roleID int,
	skillID int,
	CONSTRAINT rsKey PRIMARY KEY (roleID,skillID),
	FOREIGN KEY (roleID) REFERENCES Role(roleID),
	FOREIGN KEY (skillID) REFERENCES Skill(skillID)
);

CREATE TABLE Staff (
	staffID int,
	staffFName varchar(50) NOT NULL,
	staffLName varchar(50) NOT NULL,
	dept varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	userType varchar(20),
	PRIMARY KEY (staffID)
);

CREATE TABLE Course (
	courseID varchar(20), 
	courseName varchar(50) NOT NULL,
	courseDesc varchar(255),
	courseType varchar(10),
	courseCategory varchar(50),
	isDeleted int, 
	PRIMARY KEY (courseID)
);

CREATE TABLE SkillCourses (
	skillID int,
	courseID varchar(20),
	CONSTRAINT scKey PRIMARY KEY (skillID,courseID),
	FOREIGN KEY (skillID) REFERENCES Skill(skillID),
	FOREIGN KEY (courseID) REFERENCES Course(courseID)
);



CREATE TABLE LearningJourney (
	learningJourneyID int,
	staffID int,
	roleID int,
	PRIMARY KEY (learningJourneyID),
	FOREIGN KEY (staffID) REFERENCES Staff(staffID),
	FOREIGN KEY (roleID) REFERENCES Role(roleID)
);

CREATE TABLE LearningJourneyDetails (
	skillID int,
	courseID varchar(20),
	learningJourneyID int,
	CONSTRAINT rsKey PRIMARY KEY (skillID, courseID, learningJourneyID),
	FOREIGN KEY (skillID) REFERENCES Skill(skillID),
	FOREIGN KEY (courseID) REFERENCES Course(courseID),
	FOREIGN KEY (learningJourneyID) REFERENCES LearningJourney(learningJourneyID)
);

CREATE TABLE Registration ( 
	regID int,
	courseID varchar(20),
	staffID int,
	regStatus varchar(20) NOT NULL,
	completionStatus varchar(20) NOT NULL,
	PRIMARY KEY (regID),
	FOREIGN KEY (courseID) REFERENCES Course(courseID),
	FOREIGN KEY (staffID) REFERENCES Staff(staffID)
);


