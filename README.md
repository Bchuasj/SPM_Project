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

### *Disclaimer: The BizLand folder in Frontend is only used as a bootstrap reference template for our frontend websites.

## First Release – Core Functionality
1. Users should be able to select a role they want and see a list of skills required
2. Users should be able to see the courses they can take to acquire those skills, and add/remove them to/from their learning journey
3. CRUD for roles
4. CRUD for skills
5. Assigning skills to roles; assigning skills to courses 

## Access to Database
1. Launch Wampserver64 

2. Go to phpMyAdmin and login. The login details are as follows:
  * For Windows users:
    - Username: root
    - Password: -
   
  * For Mac users:
    - Username: root
    - Password: root

3. Click on "Import" and import the SPM DDL Script.sql into phpmyAdmin to create all the tables that need to be populated.

4. Following that, click on "Import" to import CSV files one by one into phpmyadmin to populate the tables in SPM DDL Script.sql. 

5. The SQL files are to be individually imported in this order:
    1. role.csv in role table
    2. workRole.csv in workrole table
    3. skill.csv in skill table
    4. workRoleSkills.csv in workroleskills table
    5. staff.csv in staff table
    6. courses.csv in course table
    7. skillCourses.csv in skillcourses table
    8. learningjourney.csv in learningjourney table
    9. learningjourneydetails.csv in learningjourneydetails table
    10. staffSkills.csv in staffskills table
    11. registration.csv in registration table

6. Start a new terminal on Visual Studio Ccode and change the directory to the backend folder.

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

Upon logging in, both HR and Staff will be on the Learning journeys page (as shown below).

#### HR View on Login:
![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/HR%20View%20on%20login.jpg)

#### Staff View on Login:
![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20View%20on%20login.jpg)

## 1. Select a role they want and see a list of skills required

#### For Staff:
1. Click on the Work Roles tab in the navbar.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20work%20roles%20.png)

2. If you would like to look for a particular work role, you can search for the role by Name or Work Role ID in the search bar and you should see that only 1 work role is shown. In our case, we searched for "Technical Lead" / Work Role ID 800 (as shown below).  

#### By Name: 
![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20technical%20lead%20workrole.png)

#### By Work Role ID:
![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20search%20workrole%20by%20id.png)

3. To view a list of skills associated with the work role, click on the "View details" button.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20skills%20for%20technical%20lead%20workrole.png)

## 2a. Users should be able to see the courses they can take to acquire those skills / Read & View skills

#### For Staff:
1. Click on the Skills tab in the navbar.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20skills.jpg)

2. Click on the "View Details" button on each skill to see the courses that need to be taken to acquire that skill. In our case, we chose to see the courses needed for the "Basic Management" skill.  

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20courses%20for%20skill.jpg)

## 2b. and add/remove them on their learning journey. 

1. To add courses to a Learning Journey, click on the Learning journeys tab in the navbar.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20LJ.jpg)

2. Click on the "Edit Details" button of a Learning Journey you would like to add courses to. In our case, we chose to add courses to the "Customer Service Representative" Learning Journey.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20edit%20LJ.jpg)

3. Click on the "+ Add Course" button.

4. Click on the checkbox next to course you would like to add and click on the "Save Changes" button. In our case, we chose a course with Course ID "SAL003" .

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20add%20course%20to%20LJ.jpg)

5. There will be a message in green indicating that "Course(s) added successfully!" (as shown below) and the newly added course will be added under the "Customer Service Representative" Learning Journey. In our case, the course added has Course ID "SAL003".

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20successfully%20add%20course%20to%20LJ.jpg)

4. To remove courses from a Learning Journey, click on the "Delete" button next to the course you would like to delete. In our case, we chose to delete the SAL003 course.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20delete%20course%20view%20from%20LJ.jpg)

5. Click on the "Delete" button in the popup to confirm deletion.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20delete%20course%20from%20LJ.jpg)

6. There will be a message in green indicating that "Deleted successfully!" (as shown below) and the course deleted will no longer be under a Learning Journey. In our case, we chose to delete the SAL003 course.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20successfully%20delete%20course%20from%20LJ.jpg)

## 3a. Read / View roles

#### For Staff:

1. Click on the Work Roles tab in the navbar to view all work roles available.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/staff%20view%20work%20roles%20.png)

## 3b. Create new roles / Assigning skills to roles

#### For HR:

1. Logout and login again with Staff ID 130001.

2. Click on the Work Roles tab in the navbar and you will see the Work Roles page (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20workroles%20page.png)

3. Click on the "+ Create New Work Role" button and you will see the Create New Work Role page (as shown below). 

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20create%20new%20workrole.png)

4. Once the Work Role Name field is filled (as shown below), click on the "Add/Remove Skills" button to add skills to your new work role.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20cr8%20workrole%20name%20filled.png)

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20adding%20skill%20to%20ceo%20workrole.jpg)

5. Select the skill you would like to add to the new work role (as shown below) and click on the "Save changes" button.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20added%20id%20200%20to%20workrole.jpg)

6. Once all the fields have been filled (as shown below), click on the "Create" button to create a new work role.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20cr8%20workrole%20all%20filled.png)

7. A green message indicating that "Work Role has been created successfully!" will show up (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20cr8%20workrole%20successful.png)

8. Click on Work Roles tab to view the newly created Work Role. In our case, the new CEO work role is shown in work roles table.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20workrole%20CEO%20shown.png)

## 3c. Update roles

#### For HR:

1. Click on the the "Edit Details" button of the work role you would like to update. In our case, we chose the CEO work role.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20update%20ceo%20workrole.png)

2. To update the Work Role Name, change the role name as you want. In our case, we changed CEO to Boss.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20update%20ceo%20to%20boss.png)

3. Click on the "Update" button and a green message will indicate that "Work role has been updated successfully!" (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20update%20ceo%20to%20boss%20successfully.png)

4. Click on the Work Roles tab and you will see that the Name has been changed in the work roles table (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20updated%20boss%20workrole.png)

You would also be able to update (add / remove) skills required by the work role if necessary. 

## 3d. Delete roles

#### For HR:

1. From the work roles table, click on the "Delete" button for the work role you would like to delete. In our case, we chose to delete the Boss work role. 

2. Upon clicking the "Delete" button, a popup will show asking to confirm the deletion (as shown below). Click on "Delete".

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/HR%20confirm%20deletion%20of%20workrole.png)

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20boss%20workrole%20deleted.png)

## 4a. Create skills / Assigning skills to courses 

#### For HR:

1. Click on the Skills tab in the navbar to view the list of available skills.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20skills%20view.png)

2. To create a skill, click on "+ Create New Skill" button and you will be redirected to the Create New Skill page (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20cr8%20skill.png)

3. Insert the Skill Name, Skill Description and relevant courses (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20cr8%20people%20management%20skill.png)

4. Click on "Create" and a green message indicating "Skill has been created successfully!" will be displayed (as shown below).  

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20cr8%20people%20skill%20successfully.png)

5. Click on the Skills tab in the navbar and the newly created skill will be shown in the skills table. In our case, the new skill is "People Management" (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20cr8ed%20skill%20shown.png)

## 4b. Update of skills

#### For HR:

1. Click on the "Edit Details" button of a skill you would like to update. In our case, we chose to update the "Basic Management" skill.

2. Click on the "Add / Remove Courses" button and if you would like to remove a course, you can uncheck the checkbox beside the particular course. In our case, we chose to uncheck the "Stakeholder Management" course from the "Basic Management" skill.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20update%20skill.jpg)

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20remove%20course%20from%20skill.jpg)

3. Click on the "Update" button to update the skill.

4. A green message indicating that "Skill has been updated successfully!" will be displayed (as shown below).

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20update%20skill%20successfully.jpg)

## 4c. Delete of skills

#### For HR:

1. Click on the "Delete" button of the skill you wish to delete. In our case, we chose to delete the "People Management" skill.

2. Click "Delete" when a popup appears to confirm deletion of the skill.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/HR%20confirm%20deletion%20of%20skill.png)

3. The skill that was deleted will no longer be seen in the Skills table. In our case, the "People Management" skill is no longer seen.

![alt text](https://github.com/Bchuasj/SPM_Project/blob/main/Screenshots/hr%20after%20deletion%20of%20skill.png)

## 👨‍🏫 Acknowledgement
Professor: Dr Rajesh Krishna BALAN  
Instructor: Chow Kong Ming  
Teaching Assistant: Jing Wei  