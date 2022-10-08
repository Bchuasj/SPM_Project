function getAllLearningJourneys(staffId) {

    var table = document.getElementById("ljList");
    axios.get("http://127.0.0.1:5006/allLearningJourney/" + staffId)
        .then(function (response) {
            var ljList = response.data.data.learningJourney;
            console.log(ljList)
            // var roleList = response.data.data.role;
            // var counter = 0
            for(let lj in ljList){
                // var roleName;
                // // Get role name of the Learning Journey
                // for (role in roleList){
                //     if (roleList[role].roleId == ljList[lj].roleId){
                //         roleName = roleList[role].roleName
                //     }
                // 


                table.innerHTML += `
                <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center justify-content-between">
                <div class="col-auto align-self-center mx-2 p-4">
                  <b>${ljList[lj].roleName}</b>
                </div>
      
                <div class="col"></div>

                <div class="col-auto d-flex justify-content-end">
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${ljList[lj].learningJourneyId}" aria-expanded="false" aria-controls="viewDetails1">View Details</button>
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #282c30" data-bs-toggle="collapse" data-bs-target="#editDetails1" aria-expanded="false" aria-controls="editDetails1" onclick="removeCoursesLj(500,207)">Edit Details</button>
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #ed4242" data-bs-toggle="collapse" data-bs-target="#deleteLearningJourney1" aria-expanded="false" aria-controls="deleteLearningJourney1" onclick="deleteLj(${ljList[lj].learningJourneyId})">Delete</button>
                </div>


                <div class="collapse pt-2" id="collapseExample${ljList[lj].learningJourneyId}">
                <div class="card card-body text-start" style="background-color: rgb(211, 224, 239)">
                    <b class="mb-2">Skills required</b>
    
                    <div class="container bg-white p-4">
                      <table class="table align-items-center">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Skill Status</th>
                            <th scope="col">Courses</th>
                            <th scope="col">Course Status</th>
                          </tr>
                        </thead>
                        <tbody id="${ljList[lj].learningJourneyId}"> 
                        </tbody>
                      </table>
                    </div>
      
                </div>
                </div>
                `

                axios.get("http://127.0.0.1:5006/learningJourney/" + ljList[lj].learningJourneyId + "/" + staffId)
                    .then(function (ljDetails) {
                       
                        skillDetails = ljDetails.data.data.learningJourney[1]
                        console.log("skill details", skillDetails);
                        // console.log("test", ljList[lj].learningJourneyId)

                        
                        detailTable = document.getElementById(ljList[lj].learningJourneyId)
                        // detailTable = document.getElementById("500")
                        console.log('DOM detail table', detailTable)

                        for(detail in skillDetails){
                            // console.log("courses that fulfill this skill",skillDetails[detail])


                            skillId = skillDetails[detail].skills.skillId
                            console.log("skillId", skillId)

                            skillName = skillDetails[detail].skills.skillName
                            console.log("skillName", skillName)


                            // detailTable.innerHTML += `
                            // <div class="row rounded border border-1 p-3 mb-2 d-flex align-items-center bg-light mb-3">
                            // <div class="col-1">
                            //         <b>${skillId}</b>
                            //     </div>
                            //     <div class="col-3">
                            //         <b>${skillName}</b>
                            //     </div>
                            //     <div class="col-3">
                            //         <b class="p-2" style="background-color: #F95A00; color:#FFF; border-radius: 25px;" id="status${skillId}"></b>
                            //     </div>
                            //     <div id='${skillId}' class="col-5">
                            //     </div>
                            // </div>
                            // `
                            detailTable.innerHTML += `
                            <tr>
                            <th scope="row">${skillId}</th>
                            <td>${skillName}</td>
                            <td id="skillStatus${skillId}">
                            </td>
                            <td id='${skillId}'>
                            </td>
                            <td id='courseStatus${skillId}'>
                                <!--<button type="button" class="btn btn-warning mb-1">Incomplete</button><br>
                                <button type="button" class="btn btn-success">Complete</button>-->
                            </td>
                            </tr>
                            `

                            courses = skillDetails[detail].skills.courses
                            for(course in courses){
                                
                               console.log("course " + (parseInt(course)+1), courses[course])
                            //    document.getElementById(skillId).innerHTML += `
                            //         <div>
                            //             <b class="p-2" style="background-color: #6F6F6F; color:#FFF; border-radius: 25px;">${courses[course]["courseId"] + " " + courses[course]["courseName"]}</b>
                            //         </div>
                            //        `
                                document.getElementById(skillId).innerHTML += `
                                <a class="btn btn-primary mb-1" href="#" role="button">${courses[course]["courseId"] + " " + courses[course]["courseName"]}</a><br>
                                `
                                completeCount = 0
                                for(i in ljDetails.data.data.courseStatus){
                                    if(ljDetails.data.data.courseStatus[i].courseId == courses[course]["courseId"]){
                            
                                        if(ljDetails.data.data.courseStatus[i].status == "Completed"){
                                            // document.getElementById("skillStatus"+skillId).innerHTML = "Completed"
                                            // document.getElementById("skillStatus"+skillId).style.backgroundColor = "#30B900"
                                            // document.getElementById("skillStatus"+skillId).className = "btn btn-success"
                                            document.getElementById("courseStatus"+skillId).innerHTML = `
                                            <button type="button" class="btn btn-success mb-1">Completed</button><br>`
                                            completeCount += 1
                                        }
                                        else{
                                            // document.getElementById("skillStatus"+skillId).innerHTML = "Incomplete"
                                            // document.getElementById("status"+skillId).style.backgroundColor = "#F95A00"
                                            // document.getElementById("skillStatus"+skillId).className = "btn btn-warning"
                                            document.getElementById("courseStatus"+skillId).innerHTML = `
                                            <button type="button" class="btn btn-warning mb-1">Incomplete</button><br>`


                                        }
                                        
                                    }
                                }

                                if (completeCount > 0){
                                    document.getElementById("skillStatus"+skillId).innerHTML =`<button type="button" class="btn btn-success">Completed</button>`
                                } else {
                                    document.getElementById("skillStatus"+skillId).innerHTML =`<button type="button" class="btn btn-warning">Incomplete</button>`
                                }
                                
                            }
                        }
                    })
                        .catch(function (error) {
                            console.log(error);
                        }
                    );


            }
        })


}

function deleteLj(ljId){
    // window.alert(ljId)
    // console.log("you've clicked the delete button")

    axios.delete("http://127.0.0.1:5006/learningJourney/delete/" + ljId)
    .then(function (response) {
        if (response.status > 200 || response.status <300){
            window.location.href = './staffViewLearningJourneys.html'
        } 
    })
        .catch(function (error) {
            console.log(error);
        }
    );

}

function addCoursesLj(ljId,skillId){

    var jsonBody = {'courses':['MGT001']}

    axios.put("http://127.0.0.1:5006/learningJourney/addCourse/" + ljId + "/" + skillId, jsonBody)
    .then(function (response) {
        console.log(response.data.data)
    })
        .catch(function (error) {
            console.log("Error Message: ",error.response.data.message);
        }
    );

}

function removeCoursesLj(ljId,skillId){

    var jsonBody = {'courses':['MGT002']}

    axios.delete("http://127.0.0.1:5006/learningJourney/removeCourse/" + ljId + "/" + skillId, jsonBody)
    .then(function (response) {
        console.log(response.data)
        
    })
    .catch(function (error) {
        console.log("Error Message: " , error.response.data.message);
    }
    );

}