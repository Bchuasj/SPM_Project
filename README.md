## SPM_Project

## Course and Team Information
### IS212 Software Project Management AY2022-2023, Term 1 Group 10 Team 1
--------------------------------------------------------------------------
## 👨👩🥇 Authors
Brian Chua Siong Jie  - brian.chua.2020@scis.smu.edu.sg  
Luqman Juzaili Bin Muhammad NAJIB - luqmanmn.2020@scis.smu.edu.sg   
Trina Tan Rui - trina.tan.2020@scis.smu.edu.sg  
Nur Sabrina HALLMI @ Nur Sabrina Angeles HALLMI - sabrinah.2020@scis.smu.edu.sg  
Seah Pei Ming - pmseah.2020@scis.smu.edu.sg

[GitHub Repository Link](https://github.com/Bchuasj/SPM_Project)

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

8. Begin the process by logging in at login.html of the frontend folder using staff ID.
  * For Staff:
    - Staff ID: 140001

  * For HR:
    - Staff ID: 160008

## 👨‍🏫 Acknowledgement
Professor: Dr Rajesh Krishna BALAN 
Instructor: Chow Kong Ming
Teaching Assistant: Jing Wei
