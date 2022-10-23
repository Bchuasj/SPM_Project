function getAllLearningJourneys() {

    staffId = localStorage.getItem('staffId')
    ljId = localStorage.getItem('ljId')
    // localStorage.removeItem('staffId');

    // var ljId = '501'
    // var staffId = '130001'



    var table = document.getElementById("ljList");
    axios.get("http://127.0.0.1:5006/allLearningJourney/" + staffId)
        .then(function (response) {
            var ljList = response.data.data.learningJourney;
            console.log(ljList)

            for(let lj in ljList){

                if (ljList[lj].learningJourneyId == ljId){
                 table.innerHTML +=
                `<div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center justify-content-between">
                  
                  <div class="col-auto align-self-center mx-2 p-4">
                  <b>${ljList[lj].workRoleName}</b>
                  </div>
                  
                  <div class="col-auto d-flex justify-content-end">
                    <button id="detailBtn${ljId}" type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#editDetails${ljList[lj].learningJourneyId}" aria-expanded="true" aria-controls="viewDetails1" onclick="changeBtnName(this.id)">Hide Details</button>
                    
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #282c30" data-bs-toggle="collapse" data-bs-target="#editDetails1" aria-expanded="false" aria-controls="editDetails1" onclick="goViewLjPage()">Confirm Changes</button>
                    
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #ed4242" onclick="deleteLj(${ljId})" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                  </div>
        
                  <!--view details of Learning Journey 1 -->
                  <div class="collapse show" id="editDetails${ljList[lj].learningJourneyId}">
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
                            <tbody id="${ljList[lj].learningJourneyId}"> 
                            </tbody>
                          </table>
                        </div>
          
                </div>
                </div>
                `


                // table.innerHTML += `
                // <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center justify-content-between">
                // <div class="col-auto align-self-center mx-2 p-4">
                //   <b>${ljList[lj].roleName}</b>
                // </div>
      
                // <div class="col"></div>

                // <div class="col-auto d-flex justify-content-end">
                //     <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${ljList[lj].learningJourneyId}" aria-expanded="false" aria-controls="viewDetails1">View Details</button>
                //     <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #282c30" data-bs-toggle="collapse" data-bs-target="#editDetails1" aria-expanded="false" aria-controls="editDetails1" onclick="goUpdatePage(${staffId})">Edit Details</button>
                //     <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #ed4242" data-bs-toggle="collapse" data-bs-target="#deleteLearningJourney1" aria-expanded="false" aria-controls="deleteLearningJourney1" onclick="deleteLj(${ljList[lj].learningJourneyId})">Delete</button>
                // </div>


                // <div class="collapse pt-2" id="collapseExample${ljList[lj].learningJourneyId}">
                // <div class="card card-body text-start" style="background-color: rgb(211, 224, 239)">
                //     <b class="mb-2">Skills required</b>
    
                //     <div class="container bg-white p-4">
                //       <table class="table align-items-center">
                //         <thead>
                //           <tr>
                //             <th scope="col">ID</th>
                //             <th scope="col">Name</th>
                //             <th scope="col">Skill Status</th>
                //             <th scope="col">Courses</th>
                //             <th scope="col">Course Status</th>
                //           </tr>
                //         </thead>
                //         <tbody id="${ljList[lj].learningJourneyId}"> 
                //         </tbody>
                //       </table>
                //     </div>
      
                // </div>
                // </div>
                // `

                axios.get("http://127.0.0.1:5006/learningJourney/" + ljList[lj].learningJourneyId + "/" + staffId)
                    .then(function (ljDetails) {
                       
                        skillDetails = ljDetails.data.data.learningJourney[1]
                        // console.log("skill details", skillDetails);
                        // console.log("test", ljList[lj].learningJourneyId)

                        
                        detailTable = document.getElementById(ljList[lj].learningJourneyId)
                        // detailTable = document.getElementById("500")
                        // console.log('DOM detail table', detailTable)

                        existingCourses = []
                        for(detail in skillDetails){
                            // console.log("courses that fulfill this skill",skillDetails[detail])


                            skillId = skillDetails[detail].skills.skillId
                            // console.log("skillId", skillId)

                            skillName = skillDetails[detail].skills.skillName
                            // console.log("skillName", skillName)

                            detailTable.innerHTML +=
                            `<tr>
                            <th scope="row">${skillId}</th>
                            <td>${skillName}</td>
                            <td id='addCourse${skillId}'>
                               <!-- <a class="btn btn-primary mb-1" href="#" role="button">C120 Computation</a><br>
                                <a class="btn btn-primary" href="#" role="button">C121 CRMA</a><br>
                                <button type="button" class="btn btn-outline-primary mt-5">+ Add Course</button>-->
                            </td>
                            <td id='deleteCourse${skillId}'>
                                <!--<button type="button" class="btn btn-danger mb-1">Delete</button><br>
                                <button type="button" class="btn btn-danger">Delete</button>
                                <p></p>-->
                            </td>
                            </tr>
                            `

                            // detailTable.innerHTML += `
                            // <tr>
                            // <th scope="row">${skillId}</th>
                            // <td>${skillName}</td>
                            // <td id="skillStatus${skillId}">
                            // </td>
                            // <td id='${skillId}'>
                            // </td>
                            // <td id='courseStatus${skillId}'>
                            //     <!--<button type="button" class="btn btn-warning mb-1">Incomplete</button><br>
                            //     <button type="button" class="btn btn-success">Complete</button>-->
                            // </td>
                            // </tr>
                            // `


                            courses = skillDetails[detail].skills.courses
                            console.log('courses length', courses.length)
                            for(course in courses){

                               existingCourses.push(courses[course]['courseId'])

                                
                            //    console.log("course " + (parseInt(course)+1), courses[course])

                                // document.getElementById(skillId).innerHTML += `
                                // <a class="btn btn-primary mb-1" href="#" role="button">${courses[course]["courseId"] + " " + courses[course]["courseName"]}</a><br>
                                // `

                                document.getElementById('addCourse'+skillId).innerHTML += `
                                <a class="btn btn-primary mb-1" href="#" role="button">${courses[course]["courseId"] + " " + courses[course]["courseName"]}</a><br>
                                `

                                document.getElementById('deleteCourse'+skillId).innerHTML += `
                                <button id="delete${skillId}${courses[course]['courseId']}" type="button" class="btn btn-danger mb-1" onclick="removeCoursesLj(${ljId},${skillId},'${courses[course]["courseId"]}',${courses.length})" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button><br>
                                `

                                // completeCount = 0
                                // for(i in ljDetails.data.data.courseStatus){
                                //     if(ljDetails.data.data.courseStatus[i].courseId == courses[course]["courseId"]){
                            
                                //         if(ljDetails.data.data.courseStatus[i].status == "Completed"){
                                //             // document.getElementById("skillStatus"+skillId).innerHTML = "Completed"
                                //             // document.getElementById("skillStatus"+skillId).style.backgroundColor = "#30B900"
                                //             // document.getElementById("skillStatus"+skillId).className = "btn btn-success"
                                //             document.getElementById("courseStatus"+skillId).innerHTML = `
                                //             <button type="button" class="btn btn-success mb-1">Completed</button><br>`
                                //             completeCount += 1
                                //         }
                                //         else{
                                //             // document.getElementById("skillStatus"+skillId).innerHTML = "Incomplete"
                                //             // document.getElementById("status"+skillId).style.backgroundColor = "#F95A00"
                                //             // document.getElementById("skillStatus"+skillId).className = "btn btn-warning"
                                //             document.getElementById("courseStatus"+skillId).innerHTML = `
                                //             <button type="button" class="btn btn-warning mb-1">Incomplete</button><br>`


                                //         }
                                        
                                //     }
                                // }

                                // if (completeCount > 0){
                                //     document.getElementById("skillStatus"+skillId).innerHTML =`<button type="button" class="btn btn-success">Completed</button>`
                                // } else {
                                //     document.getElementById("skillStatus"+skillId).innerHTML =`<button type="button" class="btn btn-warning">Incomplete</button>`
                                // }
                                
                            }



                            document.getElementById('addCourse'+skillId).innerHTML += `
                            <button id="add${skillId}" type="button" class="btn btn-outline-primary mt-5" data-bs-toggle="modal" data-bs-target="#modalAdd${skillId}" onclick="getSkillsCourses(${skillId},existingCourses)">+ Add Course</button>
                            `

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
                                  <button type="button" class="btn btn-primary" onclick="addCoursesLj(${ljId},${skillId})">Save changes</button>
                                </div>

                              </div>
                            </div>
                          </div>`

                        }
                    })
                        .catch(function (error) {
                            console.log(error);
                        }
                    );


                }         

            }

            if (localStorage.getItem('deleteStatus')){
                document.getElementById("editStatusMsg").innerHTML = "<span class='text-success'>Deleted successfully!</span>"
            } else if(localStorage.getItem('addStatus')){
                document.getElementById("editStatusMsg").innerHTML = "<span class='text-success'>Course(s) added successfully!</span>"
            } else if (localStorage.getItem("neutralStatus")){
                document.getElementById("editStatusMsg").innerHTML = "<span class='text-secondary'>No Course(s) selected</span>"
            }

            localStorage.removeItem('addStatus');
            localStorage.removeItem('deleteStatus');
            localStorage.removeItem('neutralStatus')
            // localStorage.clear()

            

})


}

function changeBtnName(id){
    
    if (document.getElementById(id).innerText == 'View Details'){
        document.getElementById(id).innerText = 'Hide Details'
    }else {
        document.getElementById(id).innerText = 'View Details'
    }
    
}

function getSkillsCourses(skillId,existingCourses){
    console.log("existingCourses",existingCourses)

    var childCount = document.getElementById("modalBody"+skillId).childElementCount
    
    if(childCount == 1){ // To prevent calling of function when data is already loaded into the modal
        axios.get("http://127.0.0.1:5006/skill/" + skillId)
        .then(function (response) {
            console.log(response.data.data)
    
            skillsCoursesList = response.data.data.courses
            console.log("skillCoursesList", skillsCoursesList)


                for(sc in skillsCoursesList){
                    if(!existingCourses.includes(skillsCoursesList[sc].courseId)){
                        document.getElementById("modalBody"+skillId).innerHTML += `
                        <div class="row rounded border border-1 py-2 mb-2 d-flex align-items-center bg-light">
                        <div class="col-4">
                            <b>${skillsCoursesList[sc].courseId}</b>
                        </div>
                        <div class="col-5">
                        <b>${skillsCoursesList[sc].courseName}</b>
                        </div>
                        <div class="col-3">
                            <b><input type="checkbox" name="addCoursesCb" id="cb${skillId}${skillsCoursesList[sc].courseId}" value="${skillsCoursesList[sc].courseId}"></b>
                        </div>
                        </div>`

                    }
                    
         
                 }
    
            
    
    
        })
            .catch(function (error) {
                console.log("Error Message: ",error.response.data.message);
            }
        );
    

    }


}

function addCoursesLj(ljId,skillId){

    addCoursesList = []

    // var checkbox = document.querySelector("input[type=checkbox]");
    
    // console.log("checkboxes",checkbox.length)


    var checkboxes = document.querySelectorAll("input[type=checkbox][name=addCoursesCb]");
    console.log("checboxes", checkboxes)
    
    for (cb in checkboxes){
        if(checkboxes[cb].checked){
            addCoursesList.push(checkboxes[cb].value)
        }
        
    }

    console.log("addCourseList",addCoursesList)

    // checkbox.addEventListener('change', function() {
    // if (this.checked) {
    //     addCoursesList.push(this.value)
    // } 
    // });

    // var jsonBody = {"data":{'courses':[addCoursesList]}}
    
    var jsonBody = {'courses':addCoursesList}

    axios.put("http://127.0.0.1:5006/learningJourney/addCourse/" + ljId + "/" + skillId, json = jsonBody)
    .then(function (response) {
        console.log(response.data.data)
        if(addCoursesList.length > 0){
            localStorage.setItem('addStatus', true);            
        } else{
            localStorage.setItem('neutralStatus', true);     
        }
        window.location.href = './staffUpdateLearningJourney.html'



    })
        .catch(function (error) {
            console.log("Error Message: ",error);
        }
    );

   
}


function removeCoursesLj(ljId,skillId,course,length){

    // window.alert(ljId, skillId, course, length)
    var deletePopUp = document.getElementById("deletePopUp")
    var confirmDelete = document.getElementById("confirmDelete")
    deletePopUp.innerHTML = `
    <h5>Delete Course: ${course}</h5>
    `

    confirmDelete.onclick = confirmDeletion.bind(this, ljId,skillId,course,length);



}

function confirmDeletion(ljId,skillId,course,length){
    var jsonBody = {'data':{'courses':[course]}}

    // If there is only one course taken for that skill, do not allow user to delete it
    if(length <= 1){
        document.getElementById("editStatusMsg").innerHTML = "<span class='text-warning'>A minimum of 1 course must be <br> inside a Learning Journey's skill</span>"
    }
    else{
        axios.delete("http://127.0.0.1:5006/learningJourney/removeCourse/" + ljId + "/" + skillId, jsonBody)
        .then(function (response) {
    
            localStorage.setItem('deleteStatus', true);
            console.log(response.data)
            window.location.href = './staffUpdateLearningJourney.html'
            
        })
        .catch(function (error) {
            console.log("Error Message: " , error.response.data.message);
            localStorage.setItem('deleteStatus', false);
            console.log(response.data)
        }
        );

    }

}

// Deleting an LJ from the update skill page will redirect them to the get All Learning Journey page
function deleteLj(ljId){
    var deletePopUp = document.getElementById("deletePopUp")
    var confirmDelete = document.getElementById("confirmDelete")
    deletePopUp.innerHTML = `
    Delete Learning Journey: ${ljId}
    `
    confirmDelete.onclick = confirmDeletionLj.bind(this, ljId);
    
}

function confirmDeletionLj(ljId){
    console.log("delete button pressed")
    axios.delete("http://127.0.0.1:5006/learningJourney/delete/" + ljId)
    .then(function (response) {
        if (response.status > 200 || response.status <300){
            window.location.href = './staffViewLearningJourneys.html'
            // getAllLearningJourneys('130001')
        } 
    })
        .catch(function (error) {
            console.log(error);
        }
    );


}


function goViewLjPage(){
    window.location.href = './staffViewLearningJourneys.html'
}


