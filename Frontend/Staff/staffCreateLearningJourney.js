function getAllWorkRoles() {

    var workRolesList = document.getElementById("viewWorkRoles") 

    axios.get("http://127.0.0.1:5006/workRole")
        .then(function (response) {
            var workRoles = response.data.data.workRoles;
            // <button type = "button" class="btn text-white col-sm col"  onclick="selectRole()">Add Work Role</button>
            // console.log("Work Roles,", workRoles)
            workRolesList.innerHTML = "<tr><th>Work Role ID</th><th>Work Role Name</th>"
            for(let role in workRoles){
                var roleId = workRoles[role].workRoleId
                var roleName = workRoles[role].workRoleName
                workRolesList.innerHTML += `<tr><td>${roleId}</td><td> <button type = "button" class="btn text-white col-sm col bg-primary" data-bs-dismiss="modal" onclick="selectWorkRole(${roleId},'${roleName}')">${roleName}</button></td><td>`
                }

        })
        .catch(function (error) {
            console.log(error);
            workRolesList.innerHTML = "No courses are available"
        })
}

function selectWorkRole(workRoleId,workRoleName){

    document.getElementById("workRole").value = workRoleName;
    var staffId = localStorage.getItem("staffId")

    // localStorage.setItem("workRoleId", workRoleId)

    var table = document.getElementById("ljList");
    axios.get("http://127.0.0.1:5006/workRole/"+ workRoleId +"/skills")
        .then(function (response) {
            var skillList = response.data.data.skills;
            localStorage.setItem("totalSkills",skillList.length)
            console.log("This is to store the number of skills needed for the LJ so we can check whether the number of courses for a skill matches the number of skills")
            // console.log("skillList", skillList.length)
            console.log("totalSkills", localStorage.getItem("totalSkills"))

            table.innerHTML =
            `<div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center justify-content-between">
              
              <div class="col-auto align-self-center mx-2 p-4">
              <b>${workRoleName}</b>
              </div>
              
    
              <!--view details of Learning Journey 1 -->
              <div class="collapse show" ">
                <div class="card card-body text-start" style="background-color: rgb(211, 224, 239)">
                    <b class="mb-2">Skills required</b>
    
                    <div class="container bg-white p-4">
                      <table class="table align-items-center">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Courses Added</th>
                            <th id="editStatusMsg"></th>
                          </tr>
                        </thead>
                        <tbody id="table${workRoleId}"> 
                        </tbody>
                      </table>
                    
        
                    </div>
                  
            </div>
            </div>

            <div class="col-auto align-self-center mx-2 p-4">
            <div id="statusMsg"></div>
            </div>

            <div class="col-auto d-flex justify-content-end"> 
                <!--onclick need change to createLearningJourney instead of createSkill-->
                <button class="btn text-white col-sm col m-3" style="background-color:#ef7f3e;" onclick = "createLj(${staffId},${workRoleId})">Create</button>
             </div>
            `

            for(let skill in skillList){

                detailTable = document.getElementById("table" + workRoleId)

                skillId = skillList[skill].skillId

                skillName = skillList[skill].skillName

                detailTable.innerHTML +=
                `<tr>
                <th scope="row">${skillId}</th>
                <td>${skillName}</td>
                <td id='addCourse${skillId}'>
                    <a class="btn btn-secondary mb-1" href="#" role="button">NIL</a><br>
                    <button id="add${skillId}" type="button" class="btn btn-outline-primary mt-5" data-bs-toggle="modal" data-bs-target="#modalAdd${skillId}" onclick="getSkillsCourses(${skillId})">+ Add Course</button>
                </td>
                <!-- <td id='deleteCourse${skillId}'>
                    <p></p>
                </td> -->
                </tr>
                `

                // Add Course Modal Box
                detailTable.innerHTML += `<div class="modal fade" id="modalAdd${skillId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                   <div class="modal-content">
                    
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Add Courses</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div id='modalBody${skillId}' class="modal-body">
                     <div class="row rounded border border-1 py-2 mb-2 d-flex align-items-center bg-dark text-light">
                        <div class="col-4">
                            <b>Course ID</b>
                        </div>
                        <div class="col-4">
                            <b>Course Name</b>
                        </div>
                        <div class="col-4">
                            <b>Add to Learning Journey</b>
                        </div>
                    </div> 
                    </div> 

                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="selectCourses(${skillId})">Save changes</button> 
                    </div>

                  </div>
                </div>
              </div>`
      

            }


            

})


}

function getSkillsCourses(skillId){

    var childCount = document.getElementById("modalBody"+skillId).childElementCount



    if(childCount == 1){
        axios.get("http://127.0.0.1:5006/skill/" + skillId)
        .then(function (response) {
            var  skillsCoursesList = response.data.data.courses;

            for(sc in skillsCoursesList){
                document.getElementById("modalBody"+skillId).innerHTML += `
                <div class="row rounded border border-1 py-2 mb-2 d-flex align-items-center bg-light">
                <div class="col-4">
                    <b>${skillsCoursesList[sc].courseId}</b>
                </div>
                <div class="col-5">
                <b>${skillsCoursesList[sc].courseName}</b>
                </div>
                <div class="col-3">
                    <b><input type="checkbox" name="addCoursesCb${skillId}" id="cb${skillId}${skillsCoursesList[sc].courseId}" value="${skillsCoursesList[sc].courseId},${skillsCoursesList[sc].courseName}"></b>
                </div>
                </div>`
            }

        })
        .catch(function (error) {
            console.log(error);
            
        })

    }

   


}

function selectCourses(skillId){

    selectedCoursesList = []

    var checkboxes = document.querySelectorAll("input[type=checkbox][name=addCoursesCb"+skillId+"]");
    
    for (cb in checkboxes){
        if(checkboxes[cb].checked){
            selectedCoursesList.push(checkboxes[cb].value)
        }
        
    }

    console.log("selected courses", selectedCoursesList)

    if(localStorage.getItem("skills")){
        var temp = localStorage.getItem("skills")
        if(temp != skillId){
            localStorage.setItem("skills", temp += "," + skillId )
        }
    }else{
        localStorage.setItem("skills",skillId)
    }

    


    
    document.getElementById('addCourse'+skillId).innerHTML = ``


    function addCourse(selectedCoursesList){

        counter = 0
        for(course in selectedCoursesList){


     

            document.getElementById('addCourse'+skillId).innerHTML += `
            <div class="row" id=courseRow${skillId}${counter}>
            <div class="col-8">
            <a class="btn btn-primary mb-1" href="#" role="button">${selectedCoursesList[course].split(',')[0] + " " + selectedCoursesList[course].split(',')[1]}</a>
            </div>
            <div class="col">
            <button type="button" class="btn btn-danger mb-1" onclick="removeCourse(${skillId},${counter},'${selectedCoursesList[course].split(',')[0]}')">Remove</button><br>
            </div>
            </div>
            `
            counter += 1

            
        }
    
    }

    addCourse(selectedCoursesList)

    
    document.getElementById('addCourse'+skillId).innerHTML += `<button id="add${skillId}" type="button" class="btn btn-outline-primary mt-5" data-bs-toggle="modal" data-bs-target="#modalAdd${skillId}" onclick="getSkillsCourses(${skillId})">+ Add Course</button>`



}

function createLj(staffId,workRoleId){

    console.log("from createLJ workroleid", workRoleId)

    document.getElementById("statusMsg").innerHTML = ""
    var workRoleName = document.getElementById("workRole").value

    // workRoleId = localStorage.getItem("workRoleId")


    axios.get("http://127.0.0.1:5006/allLearningJourney/"+ staffId)
    .then(function (response) {
        var lj = response.data.data.learningJourney;
        console.log("All LJ", lj)

        for(i in lj){
            if(lj[i].workRoleId == workRoleId){
                console.log("role does exist in LJ already")
                // roleExist = true
                document.getElementById("statusMsg").className = "text-danger"
                document.getElementById("statusMsg").innerHTML = "<b>An existing Learning Journey with '"+ workRoleName + "' has already been created </b>"
                
                var staffId = localStorage.getItem('staffId');
                var role = localStorage.getItem('role');
                localStorage.clear();
                localStorage.setItem('staffId',staffId);
                localStorage.setItem('role',role);
                break
            }
        }


    })
    .catch(function (error) {
        console.log(error);
    })

 
    if(!localStorage.getItem("skills")){
        document.getElementById("statusMsg").className = "text-danger"
        document.getElementById("statusMsg").innerHTML = "<b>Please select at least a course for all the skills stated </b>"
    }else{
        skillsList = localStorage.getItem("skills").split(",")
        console.log("Skills taken", localStorage.getItem("skills"))
        console.log("Skills List", skillsList)


        skills = []

        for(i in skillsList){
            if(!skills.includes(skillsList[i])){
                skills.push(skillsList[i])
            }

        }

        console.log("Skills List (Duplicates Removed)", skills)
        console.log("Total Skills", localStorage.getItem("totalSkills"))




            skillsDict = {"skills":[]}

            for(i in skills){
                tempDict = {"skillId" : skills[i],"courses" : []}

                var checkboxes = document.querySelectorAll("input[type=checkbox][name=addCoursesCb"+skills[i]+"]");
            
                for (cb in checkboxes){
                    if(checkboxes[cb].checked){
                        // selectedCoursesList.push(checkboxes[cb].value)
                        tempDict["courses"].push(checkboxes[cb].value.split(",")[0])
                    }
                    
                }
                skillsDict["skills"].push(tempDict)
            }

            console.log("Skills Dict", skillsDict)

            console.log("SkillsDict skills length", skillsDict.skills.length)

            if(skillsDict.skills.length !=localStorage.getItem("totalSkills") ){

                document.getElementById("statusMsg").className = "text-danger"
                document.getElementById("statusMsg").innerHTML = "<b>Please select at least a course for all the skills stated</b>"
       
        
            } else{
                axios.post("http://127.0.0.1:5006/learningJourney/create",
                {   
                    learningJourney: {
                        "staffId": staffId,
                        "workRoleId": workRoleId
                    },
                    skills: skillsDict["skills"]
                })
                    .then(function (response) {
                        console.log("Create LJ response",response);
                        document.getElementById("statusMsg").className = "text-success"
                        document.getElementById("statusMsg").innerHTML = "<b>Learning Journey has been created successfully!</b>"
                    }
                ).catch(function (error) {
                    console.log(error);
                    document.getElementById("statusMsg").className = "text-danger"
                    document.getElementById("statusMsg").innerHTML = "<b>Sorry! There is an error creating the Learning Journey</b>"
                })
    
    
                var staffId = localStorage.getItem('staffId');
                var role = localStorage.getItem('role');
                localStorage.clear();
                localStorage.setItem('staffId',staffId);
                localStorage.setItem('role',role);
            

            }

        
        }

    
    // }    

}


function getWorkRole() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("workRoleInput");
    filter = input.value.toUpperCase();
    filter = filter.replace(/ /g, '');
    table = document.getElementById("viewWorkRoles");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[0];
        if (td || td1) {
            txtValue = td.textContent || td.innerText;
            txtValue = txtValue.replace(/ /g, '')
            txt2 = td1.textContent || td1.innerText;
            txt2 = txt2.replace(/ /g, '')
            if (txtValue.toUpperCase().indexOf(filter) > -1 || txt2.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        }   
    }
}

function removeCourse(skillId,counter,courseId){

    // var checkboxes = document.querySelectorAll("input[type=checkbox][name=addCoursesCb"+skillId+"]");

    // for(cb in checkboxes){
    //     // console.log("checl", checkboxes[cb])
    //     // if (checkboxes[cb].value == courseId){
    //     if(checkboxes[cb].checked){
    //         console.log("yahoo")
    //         checkboxes[cb].checked == false
    //     }
    // }

    document.getElementById("cb" + skillId + courseId).checked = false

    console.log("childCount",document.getElementById('addCourse'+skillId).childElementCount)

    if(document.getElementById('addCourse'+skillId).childElementCount == 2){
        document.getElementById('addCourse'+skillId).innerHTML = 
        `<a class="btn btn-secondary mb-1" href="#" role="button">NIL</a><br>
        <button id="add${skillId}" type="button" class="btn btn-outline-primary mt-5" data-bs-toggle="modal" data-bs-target="#modalAdd${skillId}" onclick="getSkillsCourses(${skillId})">+ Add Course</button>`
        
    } else {
        document.getElementById("courseRow"+skillId+counter).remove()

    }

    console.log("skill status after removing", localStorage.getItem("skills"))
}