## SPM_Project

## Course and Team Information
### IS212 Software Project Management AY2022-2023, Term 1 Group 10 Team 1
[GitHub Link](https://github.com/Bchuasj/SPM_Project)

## 👨👩🥇 Authors
Brian Chua Siong Jie  - brian.chua.2020@scis.smu.edu.sg  
Luqman Juzaili Bin Muhammad NAJIB - luqmanmn.2020@scis.smu.edu.sg   
Trina Tan Rui - trina.tan.2020@scis.smu.edu.sg  
Nur Sabrina HALLMI @ Nur Sabrina Angeles HALLMI - sabrinah.2020@scis.smu.edu.sg  
Seah Pei Ming - pmseah.2020@scis.smu.edu.sg

Include a README file with clear instructions on how
to run your software release

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

5. The SQL files are to be imported in this order:
    1. Role.csv
    2. workRole.csv
    3. Skill.csv
    4. workRoleSkills.csv
    5. Staff.csv
    6. Course.csv
    7. SkillCourses.csv
    8. LearningJourney.csv
    9. LearningJourneyDetails.csv
    10. StaffSkills.csv
    11. Registration.csv

6. Start a new terminal on VSCcode and change the directory to backend folder.

7. Run app.py in the terminal with the following command:
    ``` python
        python app.py
    ```

## Access to Frontend UI
We run our frontend web pages on Wampserver64. Kindly place the entire "SPM_Project" Folder onto _C://wamp64/www/_  

Ensure Wampserver64 is running and begin the process by logging in at login.html:

* Login page: http://localhost/Frontend/Login/login.html

The page should look like this: 
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



## 👨‍🏫 Acknowledgement
Professor: Dr Rajesh Krishna BALAN 
Instructor: Chow Kong Ming
Teaching Assistant: Jing Wei
