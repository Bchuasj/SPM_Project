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
1. Click on Work Roles tab.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20work%20roles%20.png)

2. If you would like to look for a particular Workrole, you can type in the search bar and search by name or work role ID and you should see that only 1 Workrole is shown in the work roles table. In our case, we searched for "Technical Lead" / Work Role ID 800 (as shown below).  

#### By Name: 
![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20technical%20lead%20workrole.png)

#### By Work Role ID:
![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20search%20workrole%20by%20id.png)

3. To view the list of skills associated with the Workrole chosen, click on "View details" button.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20skills%20for%20technical%20lead%20workrole.png)

## 2a. Users should be able to see the courses they can take to acquire those skills

#### For Staff:
1. Click on Skills tab.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20skills.jpg)

2. Click on "View Details" of "Basic Management" Skill.  

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20courses%20for%20skill.jpg)

## 2b. and add/remove them on their learning journey. 

1. To add courses to Learning Journey, click on Learning journeys tab.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20LJ.jpg)

2. Click on "Edit Details" button of "Customer Service Representative" Learning Journey.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20edit%20LJ.jpg)

3. Click on "+ Add Course" button.

4. Click on the checkbox next to course with Course ID "SAL003" and click on "Save Changes" button.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20add%20course%20to%20LJ.jpg)

5. There will be a message in green indicating that "Course(s) added successfully!" and SAL003 course will be one of the courses added under "Customer Service Representative" Learning Journey (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20successfully%20add%20course%20to%20LJ.jpg)

4. To remove courses from Learning Journey, click on the "Delete" button next to SAL003 course.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20delete%20course%20view%20from%20LJ.jpg)

5. Click on "Delete" in the popup to Confirm deletion.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20delete%20course%20from%20LJ.jpg)

6. There will be a message in green indicating that "Deleted successfully!" and SAL003 course will no longer be under "Customer Service Representative" Learning Journey (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20successfully%20delete%20course%20from%20LJ.jpg)

## 3a. Read/View roles

#### For Staff:

1. Click on Work Roles tab to view all work roles available.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20work%20roles%20.png)

## 3b. Create new roles

#### For HR:

1. Logout and login again with Staff ID 130001 

2. Click on Work Roles and you will see the Work Roles page (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20workroles%20page.png)

3. Click on "+ Create New Work Role" button and you will see the Create New Work Role page (as shown below). 

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20create%20new%20workrole.png)

4. Once filled in the Work Role Name (as shown below), click on "Add/Remove Skills" button to add skills to your new Work Role.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20cr8%20workrole%20name%20filled.png)

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20adding%20skill%20to%20ceo%20workrole.jpg)

5. Select the skill you would like to add to the new Work role (as shown below) and click "Save changes".

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20added%20id%20200%20to%20workrole.jpg)

6. Once all the fields have been filled (as shown below), click "Create" button to create new work role.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20cr8%20workrole%20all%20filled.png)

7. A green message indicating that "Work Role has been created successfully!" would show up (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20cr8%20workrole%20successful.png)

8. Click on Work Roles tab to view the newly created Work Role. In our case, CEO work role is shown in work roles table.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20workrole%20CEO%20shown.png)

## 3c. Update roles

#### For HR:

1. Click "Edit Details" button of Work role you would like to update. In our case, we chose CEO Work role.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20update%20ceo%20workrole.png)

2. To update work role name, change the role name as you want. In our case, we changed CEO to Boss.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20update%20ceo%20to%20boss.png)

3. Click "Update" button and a green message will indicate that "Work role has been updated successfully!" (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20update%20ceo%20to%20boss%20successfully.png)

4. Click on Work Roles tab and you will see that the Name has been changed in Work roles table (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20updated%20boss%20workrole.png)

You would also be able to update (add / remove) skills required by the work role if necessary. 

## 3d. Delete roles

#### For HR:

1. At the Work Roles table, click on the "Delete" button for the Work Role you would like to delete. In our case, we chose to delete the Boss Work role. 

2. Upon clicking the "Delete" button, a popup will show asking for if you want to confirm deletion (as shown below). Click on "Delete".

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20confirm%20deletion%20of%20workrole.png)

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20boss%20workrole%20deleted.png)

## 4. CRUD for skills

#### For HR:

## 5. Assigning skills to roles; assigning skills to courses 

#### For HR:

## 👨‍🏫 Acknowledgement
Professor: Dr Rajesh Krishna BALAN 
Instructor: Chow Kong Ming
Teaching Assistant: Jing Wei
