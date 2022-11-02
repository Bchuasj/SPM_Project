function getAllLearningJourneys(staffId) {
    var table = document.getElementById("ljList");
    axios.get("http://127.0.0.1:5006/allLearningJourney/" + staffId)
        .then(function (response) {
            // var ljList = response.data.data.learningJourney;
            console.log('Get all Learning Journey response',response)

            if(response.data.code == 404){
                table.innerHTML = ""
                document.getElementById("displayMsg").className = "alert alert-warning m-5"

            }else{
                var ljList = response.data.data.learningJourney;
                table.innerHTML = ""

                for(let lj in ljList){


                    table.innerHTML += `
                    <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center justify-content-between">
                    <div class="col-auto align-self-center mx-2 p-4">
                      <b>${ljList[lj].workRoleName}</b>
                    </div>
          
                    <div class="col"></div>
    
                    <div class="col-auto d-flex justify-content-end">
                        <button id="detailBtn${ljList[lj].learningJourneyId}" type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${ljList[lj].learningJourneyId}" aria-expanded="false" aria-controls="viewDetails1"  onclick="changeBtnName(this.id)">View Details</button>
                        <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #282c30" data-bs-toggle="collapse" data-bs-target="#editDetails1" aria-expanded="false" aria-controls="editDetails1" onclick="goUpdatePage(${ljList[lj].learningJourneyId},${staffId})">Edit Details</button>
                        <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #ed4242" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="deleteLj(${ljList[lj].learningJourneyId})">Delete</button>
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


                            detailTable.innerHTML += `
                            <tr>
                            <th scope="row">${skillId}</th>
                            <td>${skillName}</td>
                            <td id="skillStatus${skillId}${ljList[lj].learningJourneyId}">
                                <button type="button" class="btn btn-warning">Incomplete</button>
                            </td>
                            <td id='course${skillId}${ljList[lj].learningJourneyId}'>
                            </td>
                            <td id='courseStatus${skillId}${ljList[lj].learningJourneyId}'>
                                <!--<button type="button" class="btn btn-warning mb-1">Incomplete</button><br>
                                <button type="button" class="btn btn-success">Complete</button>-->
                            </td>
                            </tr>
                            `

                            courses = skillDetails[detail].skills.courses
                            for(course in courses){
                                
                               console.log("course " + (parseInt(course)+1), courses[course])
                                //stop here
                                document.getElementById("course"+skillId+ljList[lj].learningJourneyId).innerHTML += `
                                <a class="btn btn-primary mb-1" href="#" role="button">${courses[course]["courseId"] + " " + courses[course]["courseName"]}</a><br>
                                `

                                for(i in ljDetails.data.data.courseStatus){
                                    if(ljDetails.data.data.courseStatus[i].courseId == courses[course]["courseId"]){
                            
                                        if(ljDetails.data.data.courseStatus[i].status == "Completed"){
                                            document.getElementById("courseStatus"+skillId+ljList[lj].learningJourneyId).innerHTML += `
                                            <button type="button" class="btn btn-success mb-1">Completed</button><br>`
                                            completeCount = 1 // to prevent skill status to be updated
                                            // The moment there is a course completed for a skill, straightaway update skill status
                                            document.getElementById("skillStatus"+skillId+ljList[lj].learningJourneyId).innerHTML =`<button type="button" class="btn btn-success">Completed</button>`
                                        }
                                        else{
                                            document.getElementById("courseStatus"+skillId+ljList[lj].learningJourneyId).innerHTML += `
                                            <button type="button" class="btn btn-warning mb-1">Incomplete</button><br>`


                                        }
                                        
                                    }

                                }

                            }
                        }
                    })
                        .catch(function (error) {
                            console.log(error);
                        }
                    );

                
            }

            }
        })


}

function changeBtnName(id){
    
    if (document.getElementById(id).innerText == 'View Details'){
        document.getElementById(id).innerText = 'Hide Details'
    }else {
        document.getElementById(id).innerText = 'View Details'
    }
    
}

function deleteLj(ljId){
    var deletePopUp = document.getElementById("deletePopUp")
    var confirmDelete = document.getElementById("confirmDelete")
    deletePopUp.innerHTML = `
    Delete Learning Journey: ${ljId}
    `
    confirmDelete.onclick = confirmDeletion.bind(this, ljId);
    
}

function confirmDeletion(ljId){
    console.log("delete button pressed")
    axios.delete("http://127.0.0.1:5006/learningJourney/delete/" + ljId)
    .then(function (response) {
        if (response.status > 200 || response.status <300){
            // window.location.href = './staffViewLearningJourneys.html'
            getAllLearningJourneys('130001')
        } 
    })
        .catch(function (error) {
            console.log(error);
        }
    );


}


function goUpdatePage(ljId,staffId){
    localStorage.setItem('ljId', ljId);
    localStorage.setItem('staffId', staffId);
    window.location.href = './staffUpdateLearningJourney.html'
}

