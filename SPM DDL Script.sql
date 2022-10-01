CREATE DATABASE SPM;

USE SPM;

CREATE TABLE Role (
RoleId int,
RoleName varchar(20) NOT NULL,
IsDeleted boolean,
PRIMARY KEY (RoleId)
);

CREATE TABLE Skill (
SkillId int,
SkillName varchar(50) NOT NULL,
SkillDesc varchar(50) NOT NULL,
Role int,
IsDeleted boolean,
PRIMARY KEY (SkillId),
FOREIGN KEY (Role) REFERENCES Role(RoleId)
);

CREATE TABLE Staff (
StaffId int,
StaffFName varchar(50) NOT NULL,
StaffLName varchar(50) NOT NULL,
Dept varchar(50) NOT NULL,
Role int,
UserType varchar(20),
PRIMARY KEY (StaffId),
FOREIGN KEY (Role) REFERENCES Role(RoleId)
);

CREATE TABLE Course (
CourseId varchar(20),
CourseName varchar(50) NOT NULL,
CourseDesc varchar(255),
CourseStatus varchar(15),
CourseType varchar(10),
CourseCategory varchar(50),
Skill int,
IsDeleted boolean,
PRIMARY KEY (CourseId),
FOREIGN KEY (Skill) REFERENCES Skill(SkillId)
);

CREATE TABLE Registration (
RegId int,
CourseId varchar(20),
StaffId int,
RegStatus varchar(20) NOT NULL,
CompletionStatus varchar(20) NOT NULL,
PRIMARY KEY (RegId),
FOREIGN KEY (CourseId) REFERENCES Course(CourseId),
FOREIGN KEY (StaffId) REFERENCES Staff(StaffId)
);

CREATE TABLE LearningJourney (
LearningJourneyId int,
Staff int,
Role int,
Skill int,
Course varchar(20),
CONSTRAINT LjKey PRIMARY KEY (LearningJourneyId,Staff,Role,Skill,Course),
FOREIGN KEY (Staff) REFERENCES Staff(StaffId),
FOREIGN KEY (Role) REFERENCES Role(RoleId),
FOREIGN KEY (Skill) REFERENCES Skill(SkillId),
FOREIGN KEY (Course) REFERENCES Course(CourseId)
);
