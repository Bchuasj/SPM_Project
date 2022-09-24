CREATE DATABASE SPM;

USE SPM;

CREATE TABLE Role (
Role_ID int,
Role_Name varchar(20) NOT NULL,
Is_Deleted boolean,
PRIMARY KEY (Role_ID)
);

CREATE TABLE Skill (
Skill_ID int,
Skill_Name varchar(50) NOT NULL,
Skill_Desc varchar(50),
Role int,
Is_Deleted boolean,
PRIMARY KEY (Skill_ID),
FOREIGN KEY (Role) REFERENCES Role(Role_ID)
);

CREATE TABLE Staff (
Staff_ID int,
Staff_FName varchar(50) NOT NULL,
Staff_LName varchar(50) NOT NULL,
Dept varchar(50) NOT NULL,
Role int,
PRIMARY KEY (Staff_ID),
FOREIGN KEY (Role) REFERENCES Role(Role_ID)
);

CREATE TABLE Course (
Course_ID varchar(20),
Course_Name varchar(50) NOT NULL,
Course_Desc varchar(255),
Course_Status varchar(15),
Course_Type varchar(10),
Course_Category varchar(50),
Skill int,
Is_Deleted boolean,
PRIMARY KEY (Course_ID),
FOREIGN KEY (Skill) REFERENCES Skill(Skill_ID)
);

CREATE TABLE Registration (
Reg_ID int,
Course_ID varchar(20),
Staff_ID int,
Reg_Status varchar(20) NOT NULL,
Completion_Status varchar(20) NOT NULL,
PRIMARY KEY (Reg_ID),
FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID),
FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID)
);