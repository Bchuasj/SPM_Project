function getAllLearningJourneys(staffId) {

    var table = document.getElementById("ljList");
    axios.get("http://127.0.0.1:5006/allLearningJourney/" + staffId)
        .then(function (response) {
            var ljList = response.data.data.learningJourney;
            console.log(response)
            var roleList = response.data.data.role;
            // var counter = 0
            for(let lj in ljList){
                var roleName;
                // Get role name of the Learning Journey
                for (role in roleList){
                    if (roleList[role].roleId == ljList[lj].roleId){
                        roleName = roleList[role].roleName
                    }
                }

                table.innerHTML += `
                <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                <div class="col-3">
                  <b>${roleName}</b>
                </div>
      
                <div class="col"></div>

                <div class="col-5">
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${ljList[lj].learningJourneyId}" aria-expanded="false" aria-controls="collapseExample" ">View Details</button>
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #282c30"  >Edit Details</button>
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #ed4242"  >Delete</button>
                </div>

                <div class="collapse pt-2" id="collapseExample${ljList[lj].learningJourneyId}">
                <div class="card card-body text-start" style="background-color: rgb(211, 224, 239);" >
                    <b class="p-2">Skills Required</b>
                    <div class="row rounded border border-1 py-2 mb-2 d-flex align-items-center bg-light">
                        <div class="col">
                            <b>ID</b>
                        </div>
                        <div class="col">
                            <b>Name</b>
                        </div>
                        <div class="col">
                            <b>Status</b>
                        </div>
                        <div class="col">
                            <b>Courses</b>
                        </div>
                    </div>
                <!--<div class="row rounded border border-1 py-2 mb-2 d-flex align-items-center bg-light">
                   <div class="col">
                        <b>ID</b>
                    </div>
                    <div class="col">
                        <b>Name</b>
                    </div>
                    <div class="col">
                        <b>Status</b>
                    </div>
                    <div class="col">
                        <b>Courses</b>
                    </div>
                    </div>
                </div>-->


                   `


                axios.get("http://127.0.0.1:5006/learningJourney/" + ljList[lj].learningJourneyId + "/" + staffId)
                    .then(function (ljDetails) {
                        console.log("ljDetails", ljDetails);
            
            
                        // detailTableString = string.concat("ljTable",counter.toString())
                        // console.log("test",detailTableString)
                        
            
                        // var detailsTable = document.getElementById("detailTable500")
                        // console.log("detailsTable",detailsTable)
            
                        // for(skill in skillsList){
                            
                        //     detailsTable.innerHTML += `
                        //     <div class="col">
                        //         <b>${skillsList[skill].skillId}</b>
                        //     </div>
                        //     <div class="col">
                        //     <b>${skillsList[skill].skillName}</b>
                        //     </div>
                        //     <div class="col">
                        //         <b>Status</b>
                        //     </div>
                        //     <div class="col">
                        //         <b>Courses</b>
                        //     </div>
                        //     `
                        // }
                    })
                        .catch(function (error) {
                            console.log(error);
                        }
                    );

                // var skillsList; // List of all the skills needed for this role
                // var coursesList; // List of all the courses that user took to fulfill the skill for this role
                // var statusList; // List of whether staff has completed the course or not (based on registration table)
                // // // get details of Learning Journey
            
                // console.log("detailTable"+learningJourneyId)
                // var detailTable = document.getElementById("detailTable"+learningJourneyId)
                // console.log(detailTable)
            
                // var ljDetailsRows = {"skills":[]}; // aggregate all the information from the above list to display all the details in a row
                // axios.get("http://127.0.0.1:5006/learningJourney/" + ljList[lj].learningJourneyId + "/" + staffId)
                //     .then(function (ljDetails) {
                //         // console.log("ljDetails", ljDetails);
            
                //         skillsList = ljDetails.data.data.skills
                //         console.log("skillsList", skillsList);
            
                //         coursesList = ljDetails.data.data.courses
                //         console.log("coursesList", coursesList);
            
                //         statusList = ljDetails.data.data.courseStatus
                //         console.log("statusList", statusList)
            
                //         // detailTableString = string.concat("ljTable",counter.toString())
                //         // console.log("test",detailTableString)
                        
            
                //         var detailsTable = document.getElementById("ljTable500")
                //         console.log("detailsTable",detailsTable)
            
                //         for(skill in skillsList){
                            
                //             detailsTable.innerHTML += `
                //             <div class="col">
                //                 <b>${skillsList[skill].skillId}</b>
                //             </div>
                //             <div class="col">
                //             <b>${skillsList[skill].skillName}</b>
                //             </div>
                //             <div class="col">
                //                 <b>Status</b>
                //             </div>
                //             <div class="col">
                //                 <b>Courses</b>
                //             </div>
                //             `
                //         }
                //     })
                //         .catch(function (error) {
                //             console.log(error);
                //         }
                //     );

            
                // counter++
            }
        })


}

// function getLjDetails(learningJourneyId, staffId){

// }