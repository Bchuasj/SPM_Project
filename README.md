## SPM_Project

## Course and Team Information
### IS212 Software Project Management AY2022-2023, Term 1 Group 10 Team 1
#### GitHub Link: https://github.com/Bchuasj/SPM_Project

## 👨👩🥇 Authors
Brian Chua Siong Jie  - brian.chua.2020@scis.smu.edu.sg  
Luqman Juzaili Bin Muhammad NAJIB - luqmanmn.2020@scis.smu.edu.sg   
Trina Tan Rui - trina.tan.2020@scis.smu.edu.sg  
Nur Sabrina HALLMI @ Nur Sabrina Angeles HALLMI - sabrinah.2020@scis.smu.edu.sg  
Seah Pei Ming - pmseah.2020@scis.smu.edu.sg

Include a README file with clear instructions on how
to run your software release

## First Release – Core Functionality
1. Users should be able to select a role they want and see a list of skills required
2. Users should be able to see the courses they can take to acquire those skills, and add/remove them on their learning journey
3. CRUD for roles
4. CRUD for skills
5. Assigning skills to roles; assigning skills to courses 

## Access to Database
1. Launch Wampserver64 

2. Go to phpMyAdmin and login. The login details are:
  * For Windows users:
    - Username: root
    - Password: -
   
  * For Mac users:
    - Username: root
    - Password: root

3. Click on "Import" and import the SPM DDL Script.sql into phpmyAdmin to create all the tables that need to be populated.

4. Following that, click on "Import" to import CSV files one by one into phpmyadmin to populate the tables in SPM DDL Script.sql. 

5. The SQL files are to be individually imported in this order:
    1. Role.csv in role table
    2. workRole.csv in workrole table
    3. Skill.csv in skill table
    4. workRoleSkills.csv in workroleskills table
    5. Staff.csv in staff table
    6. courses.csv in course table
    7. SkillCourses.csv in skillcourses table
    8. LearningJourney.csv in learningjourney table
    9. LearningJourneyDetails.csv in learningjourneydetails table
    10. StaffSkills.csv in staffskills table
    11. Registration.csv in registration table

6. Start a new terminal on VSCcode and change the directory to backend folder.

7. Run app.py in the terminal with the following command:
    ``` python
        python app.py
    ```

## Access to Frontend UI
We run our frontend web pages on Wampserver64. Kindly place the entire "SPM_Project" Folder onto _C://wamp64/www/_  

Ensure Wampserver64 is running and begin the process by logging in at login.html:

* Login page: http://localhost/SPM_Project/Frontend/Login/login.html

#### The page should look like this: 
![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/login%20ss.png)

#### Login Details:

  * For Staff:
    - Staff ID: 140003

  * For HR:
    - Staff ID: 130001

Upon logging in, both HR and Staff will be at the View Learning Journey Respectively (as shown below).

#### HR View on Login:
![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/HR%20View%20on%20login.jpg)

#### Staff View on Login:
![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20View%20on%20login.jpg)

## 1. Select a role they want and see a list of skills required

#### For Staff:
1. Click on Work Roles tab (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20WorkRoles.jpg)

2. If you would like to look for "Technical Lead" Workrole, type in "Tech" in the search bar and you should see that only "Technical Lead" is shown in Workrole table (as shown below).  

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20technical%20lead%20workrole.png)

3. To view the list of skills associated with the Workrole chosen, click on "View details" button (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20skills%20for%20technical%20lead%20workrole.png)

## 2a. Users should be able to see the courses they can take to acquire those skills, 

#### For Staff:
1. Click on Skills tab (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20skills.jpg)

2. Click on "View Details" of "Basic Management" Skill (as shown below).  

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20courses%20for%20skill.jpg)

## 2b. and add/remove them on their learning journey. 

1. To add courses to Learning Journey, click on Learning journeys tab.

2. 


4. To remove courses from Learning Journey, 

## 3. CRUD for roles

#### For Staff:

## 4. CRUD for skills

#### For HR:

## 5. Assigning skills to roles; assigning skills to courses 

#### For HR:

## 👨‍🏫 Acknowledgement
Professor: Dr Rajesh Krishna BALAN 
Instructor: Chow Kong Ming
Teaching Assistant: Jing Wei
