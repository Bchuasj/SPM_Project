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
                <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                <div class="col-3">
                  <b>${ljList[lj].roleName}</b>
                </div>
      
                <div class="col"></div>

                <div class="col-5">
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${ljList[lj].learningJourneyId}" aria-expanded="false" aria-controls="collapseExample" ">View Details</button>
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #282c30"  >Edit Details</button>
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #ed4242" onclick="deleteLj(${ljList[lj].learningJourneyId})">Delete</button>
                </div>

                <div class="collapse pt-2" id="collapseExample${ljList[lj].learningJourneyId}">
                <div id="${ljList[lj].learningJourneyId}" class="card card-body text-start mb-3" style="background-color: rgb(211, 224, 239);" >
                    <b class="p-2">Skills Required</b>
                    <div class="row rounded border border-1 py-2 mb-2 d-flex align-items-center bg-light">
                        <div class="col-1">
                            <b>ID</b>
                        </div>
                        <div class="col-3">
                            <b>Name</b>
                        </div>
                        <div class="col-3">
                            <b>Status</b>
                        </div>
                        <div class="col-5">
                            <b>Courses</b>
                        </div>
                    </div>
                

                </div>
                `

                axios.get("http://127.0.0.1:5006/learningJourney/" + ljList[lj].learningJourneyId + "/" + staffId)
                    .then(function (ljDetails) {
                       
                        skillDetails = ljDetails.data.data.learningJourney[1]
                        console.log("skill details", skillDetails);

                        
                        detailTable = document.getElementById(ljList[lj].learningJourneyId)
                        console.log('DOM detail table', detailTable)

                        for(detail in skillDetails){
                            // console.log("courses that fulfill this skill",skillDetails[detail])


                            skillId = skillDetails[detail].skills.skillId
                            console.log("skillId", skillId)

                            skillName = skillDetails[detail].skills.skillName
                            console.log("skillName", skillName)


                            detailTable.innerHTML += `
                            <div class="row rounded border border-1 p-3 mb-2 d-flex align-items-center bg-light mb-3">
                            <div class="col-1">
                                    <b>${skillId}</b>
                                </div>
                                <div class="col-3">
                                    <b>${skillName}</b>
                                </div>
                                <div class="col-3">
                                    <b class="p-2" style="background-color: #F95A00; color:#FFF; border-radius: 25px;" id="status${skillId}"></b>
                                </div>
                                <div id='${skillId}' class="col-5">
                                </div>
                            </div>
                            `

                            courses = skillDetails[detail].skills.courses
                            for(course in courses){
                                
                               console.log("course " + (parseInt(course)+1), courses[course])
                               document.getElementById(skillId).innerHTML += `
                                    <div>
                                        <b class="p-2" style="background-color: #6F6F6F; color:#FFF; border-radius: 25px;">${courses[course]["courseId"] + " " + courses[course]["courseName"]}</b>
                                    </div>
                                   `
                                
                                for(i in ljDetails.data.data.courseStatus){
                                    if(ljDetails.data.data.courseStatus[i].courseId == courses[course]["courseId"]){
                            
                                        if(ljDetails.data.data.courseStatus[i].status == "Completed"){
                                            document.getElementById("status"+skillId).innerHTML = "Completed"
                                            document.getElementById("status"+skillId).style.backgroundColor = "#30B900"
                                        }
                                        else{
                                            document.getElementById("status"+skillId).innerHTML = "Incomplete"
                                            document.getElementById("status"+skillId).style.backgroundColor = "#F95A00"
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