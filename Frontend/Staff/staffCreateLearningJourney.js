

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

    localStorage.setItem("workRoleId", workRoleId)

    var table = document.getElementById("ljList");
    axios.get("http://127.0.0.1:5006/workRole/"+ workRoleId +"/skills")
        .then(function (response) {
            var skillList = response.data.data.skills;
            console.log("skillList", skillList.length)
            localStorage.setItem("totalSkills",skillList.length)

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
                <button class="btn text-white col-sm col m-3" style="background-color:#ef7f3e;" onclick = "createLj(130001)">Create</button>
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

                // if (ljList[lj].learningJourneyId == ljId){
                

                // axios.get("http://127.0.0.1:5006/learningJourney/" + ljList[lj].learningJourneyId + "/" + staffId)
                //     .then(function (ljDetails) {
                       
                //         skillDetails = ljDetails.data.data.learningJourney[1]
                        
                //         detailTable = document.getElementById(ljList[lj].learningJourneyId)
                //         existingCourses = []
                //         for(detail in skillDetails){


                //             skillId = skillDetails[detail].skills.skillId

                //             skillName = skillDetails[detail].skills.skillName

                //             detailTable.innerHTML +=
                //             `<tr>
                //             <th scope="row">${skillId}</th>
                //             <td>${skillName}</td>
                //             <td id='addCourse${skillId}'>
                //                <!-- <a class="btn btn-primary mb-1" href="#" role="button">C120 Computation</a><br>
                //                 <a class="btn btn-primary" href="#" role="button">C121 CRMA</a><br>
                //                 <button type="button" class="btn btn-outline-primary mt-5">+ Add Course</button>-->
                //             </td>
                //             <td id='deleteCourse${skillId}'>
                //                 <!--<button type="button" class="btn btn-danger mb-1">Delete</button><br>
                //                 <button type="button" class="btn btn-danger">Delete</button>
                //                 <p></p>-->
                //             </td>
                //             </tr>
                //             `


                //             courses = skillDetails[detail].skills.courses
                //             console.log('courses length', courses.length)
                //             for(course in courses){

                //                existingCourses.push(courses[course]['courseId'])


                //                 document.getElementById('addCourse'+skillId).innerHTML += `
                //                 <a class="btn btn-primary mb-1" href="#" role="button">${courses[course]["courseId"] + " " + courses[course]["courseName"]}</a><br>
                //                 `

                //                 document.getElementById('deleteCourse'+skillId).innerHTML += `
                //                 <button id="delete${skillId}${courses[course]['courseId']}" type="button" class="btn btn-danger mb-1" onclick="removeCoursesLj(${ljId},${skillId},'${courses[course]["courseId"]}',${courses.length})" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button><br>
                //                 `
                                
                //             }



                //             document.getElementById('addCourse'+skillId).innerHTML += `
                //             <button id="add${skillId}" type="button" class="btn btn-outline-primary mt-5" data-bs-toggle="modal" data-bs-target="#modalAdd${skillId}" onclick="getSkillsCourses(${skillId},existingCourses)">+ Add Course</button>
                //             `

                //             detailTable.innerHTML += `<div class="modal fade" id="modalAdd${skillId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                //             <div class="modal-dialog modal-lg">
                //                <div class="modal-content">
                                
                //                 <div class="modal-header">
                //                   <h5 class="modal-title" id="exampleModalLabel">Add Courses</h5>
                //                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                //                 </div>

                //                 <div id='modalBody${skillId}' class="modal-body">
                //                 <div class="row rounded border border-1 py-2 mb-2 d-flex align-items-center bg-dark text-light">
                //                     <div class="col-4">
                //                         <b>Course ID</b>
                //                     </div>
                //                     <div class="col-4">
                //                         <b>Course Name</b>
                //                     </div>
                //                     <div class="col-4">
                //                         <b>Add to Learning Journey</b>
                //                     </div>
                //                 </div>
                //                 </div>

                //                 <div class="modal-footer">
                //                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                //                   <button type="button" class="btn btn-primary" onclick="addCoursesLj(${ljId},${skillId})">Save changes</button>
                //                 </div>

                //               </div>
                //             </div>
                //           </div>`

                //         }
                //     })
                //         .catch(function (error) {
                //             console.log(error);
                //         }
                //     );


                // }         

            }

            // if (localStorage.getItem('deleteStatus')){
            //     document.getElementById("editStatusMsg").innerHTML = "<span class='text-success'>Deleted successfully!</span>"
            // } else if(localStorage.getItem('addStatus')){
            //     document.getElementById("editStatusMsg").innerHTML = "<span class='text-success'>Course(s) added successfully!</span>"
            // } else if (localStorage.getItem("neutralStatus")){
            //     document.getElementById("editStatusMsg").innerHTML = "<span class='text-secondary'>No Course(s) selected</span>"
            // }

            

})


}

function getSkillsCourses(skillId){

    var childCount = document.getElementById("modalBody"+skillId).childElementCount



    if(childCount == 1){
        axios.get("http://127.0.0.1:5006/skill/" + skillId)
        .then(function (response) {
            var  skillsCoursesList = response.data.data.courses;
            // console.log("courses", courses)
            // <button type = "button" class="btn text-white col-sm col"  onclick="selectRole()">Add Work Role</button>
            // console.log("Work Roles,", workRoles)
            // coursesList.innerHTML = "<tr><th>Course ID</th><th>Course Name</th>"
            // for(let course in courses){
            //     var courseId = courses[course].courseId
            //     var courseName = courses[course].courseName
            //     coursesList.innerHTML += `<tr><td>${courseId}</td><td> <button type = "button" class="btn text-white col-sm col bg-primary" data-bs-dismiss="modal" onclick="selectRole(${courseId},'${courseName}')">${courseName}</button></td><td>`
            //     }

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

   
    
    // if(childCount == 1){ // To prevent calling of function when data is already loaded into the modal
    //     axios.get("http://127.0.0.1:5006/skill/" + skillId)
    //     .then(function (response) {
    //         console.log(response.data.data)
    
    //         skillsCoursesList = response.data.data.courses
    //         console.log("skillCoursesList", skillsCoursesList)

    //         console.l
    //         if(skillsCoursesList.length == existingCourses.length){
    //             document.getElementById("modalBody"+skillId).innerHTML = `<div class="alert alert-warning text-center" role="alert">
    //             All of the available courses for this skill is already been selected.
    //           </div>`

    //         }else {
    //             for(sc in skillsCoursesList){
    //                 if(!existingCourses.includes(skillsCoursesList[sc].courseId)){
    //                     document.getElementById("modalBody"+skillId).innerHTML += `
    //                     <div class="row rounded border border-1 py-2 mb-2 d-flex align-items-center bg-light">
    //                     <div class="col-4">
    //                         <b>${skillsCoursesList[sc].courseId}</b>
    //                     </div>
    //                     <div class="col-5">
    //                     <b>${skillsCoursesList[sc].courseName}</b>
    //                     </div>
    //                     <div class="col-3">
    //                         <b><input type="checkbox" name="addCoursesCb" id="cb${skillId}${skillsCoursesList[sc].courseId}" value="${skillsCoursesList[sc].courseId}"></b>
    //                     </div>
    //                     </div>`
    
    //                 }
    //             }
    //         }



            
    
    
        // })
        //     .catch(function (error) {
        //         console.log("Error Message: ",error.response.data.message);
        //     }
        // );
    

    // }


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


        for(course in selectedCoursesList){



            document.getElementById('addCourse'+skillId).innerHTML += `
            <a class="btn btn-primary mb-1" href="#" role="button">${selectedCoursesList[course].split(',')[0] + " " + selectedCoursesList[course].split(',')[1]}</a>
            <br>
            `
    
            // document.getElementById('deleteCourse'+skillId).innerHTML += `
            // <button id="delete${skillId}${selectedCoursesList[course]}" type="button" class="btn btn-danger mb-1" onclick="" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button><br>
            // `
           
    
    
            // console.log("courses that fulfill this skill",skillDetails[detail])
    
    
            // courseId = selectedCoursesList[course]
            // // console.log("skillId", skillId)
    
            // skillName = skillDetails[detail].skills.skillName
            // // console.log("skillName", skillName)
    
            // detailTable.innerHTML +=
            // `<tr>
            // <th scope="row">${skillId}</th>
            // <td>${skillName}</td>
            // <td id='addCourse${skillId}'>
            //    <!-- <a class="btn btn-primary mb-1" href="#" role="button">C120 Computation</a><br>
            //     <a class="btn btn-primary" href="#" role="button">C121 CRMA</a><br>
            //     <button type="button" class="btn btn-outline-primary mt-5">+ Add Course</button>-->
            // </td>
            // <td id='deleteCourse${skillId}'>
            //     <!--<button type="button" class="btn btn-danger mb-1">Delete</button><br>
            //     <button type="button" class="btn btn-danger">Delete</button>
            //     <p></p>-->
            // </td>
            // </tr>
            
        }
    
    }

    addCourse(selectedCoursesList)

    
    document.getElementById('addCourse'+skillId).innerHTML += `<button id="add${skillId}" type="button" class="btn btn-outline-primary mt-5" data-bs-toggle="modal" data-bs-target="#modalAdd${skillId}" onclick="getSkillsCourses(${skillId})">+ Add Course</button>`



}

function createLj(staffId){
    document.getElementById("statusMsg").innerHTML = ""
    var workRoleName = document.getElementById("workRole").value

    console.log("Skills taken", localStorage.getItem("skills"))
    workRoleId = localStorage.getItem("workRoleId")


    axios.get("http://127.0.0.1:5006/allLearningJourney/"+ staffId)
    .then(function (response) {
        var lj = response.data.data.learningJourney;
        console.log("All LJ", lj)

        for(i in lj){
            if(lj[i].workRoleId == workRoleId){
                console.log("workRoleId", workRoleId)
                console.log("lj.workRoleId", lj[i].workRoleId)
                localStorage.setItem("roleExist",false)
            }
        }


    })
    .catch(function (error) {
        console.log(error);
    })

    roleExist = true
    if(localStorage.getItem("roleExist")){
        roleExist = false
    }

    console.log("roleExist", roleExist)
  

    if(!roleExist){
        document.getElementById("statusMsg").className = "text-danger"
        document.getElementById("statusMsg").innerHTML = "<b>An existing Learning Journey with '"+ workRoleName + "' has already been created </b>"
        localStorage.clear()
    }
    else if(!localStorage.getItem("skills")){
        document.getElementById("statusMsg").className = "text-danger"
        document.getElementById("statusMsg").innerHTML = "<b>Please select at least a course for all the skills stated</b>"
    }else{
        skills = localStorage.getItem("skills").split(",")
        console.log("Skills Arr Length", skills)
        console.log("Total Skills", )



        if(skills.length != localStorage.getItem("totalSkills")){
            document.getElementById("statusMsg").className = "text-danger"
            document.getElementById("statusMsg").innerHTML = "<b>Please select at least a course for all the skills stated</b>"
        }else {
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


            localStorage.clear();


        }

        

    }

    

}