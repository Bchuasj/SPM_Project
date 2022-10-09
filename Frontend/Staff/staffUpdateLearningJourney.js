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
                  <b>${ljList[lj].roleName}</b>
                  </div>
                  
                  <div class="col-auto d-flex justify-content-end">
                    <button id="detailBtn${ljId}" type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#editDetails${ljList[lj].learningJourneyId}" aria-expanded="true" aria-controls="viewDetails1" onclick="changeBtnName(this.id)">Hide Details</button>
                    
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #282c30" data-bs-toggle="collapse" data-bs-target="#editDetails1" aria-expanded="false" aria-controls="editDetails1">Confirm Changes</button>
                    
                    <button type="button" class="btn btn-sm px-3 text-white m-2" style="background-color: #ed4242" data-bs-toggle="collapse" data-bs-target="#deleteLearningJourney1" aria-expanded="false" aria-controls="deleteLearningJourney1">Delete</button>
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

                                
                               console.log("course " + (parseInt(course)+1), courses[course])

                                // document.getElementById(skillId).innerHTML += `
                                // <a class="btn btn-primary mb-1" href="#" role="button">${courses[course]["courseId"] + " " + courses[course]["courseName"]}</a><br>
                                // `

                                document.getElementById('addCourse'+skillId).innerHTML += `
                                <a class="btn btn-primary mb-1" href="#" role="button">${courses[course]["courseId"] + " " + courses[course]["courseName"]}</a><br>
                                `

                                document.getElementById('deleteCourse'+skillId).innerHTML += `
                                <button id="delete${skillId}" type="button" class="btn btn-danger mb-1" onclick="removeCoursesLj(${ljId},${skillId},'${courses[course]["courseId"]}',${courses.length})">Delete</button><br>
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
                            <button id="add${skillId}" type="button" class="btn btn-outline-primary mt-5">+ Add Course</button>
                            `

                        }
                    })
                        .catch(function (error) {
                            console.log(error);
                        }
                    );


                }         

            }

            if (localStorage.getItem('editStatus')){
                document.getElementById("editStatusMsg").innerHTML = "<span class='text-success'>Deleted successfully!</span>"
            }

            localStorage.removeItem('editStatus');
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


function removeCoursesLj(ljId,skillId,course,length){

    var jsonBody = {'data':{'courses':[course]}}

    if(length <= 1){
        document.getElementById("editStatusMsg").innerHTML = "<span class='text-warning'>A skill must have at least 1 course!</span>"
    }
    else{
        axios.delete("http://127.0.0.1:5006/learningJourney/removeCourse/" + ljId + "/" + skillId, jsonBody)
        .then(function (response) {
    
            localStorage.setItem('editStatus', true);
            console.log(response.data)
            window.location.href = './staffUpdateLearningJourney.html'
            
        })
        .catch(function (error) {
            console.log("Error Message: " , error.response.data.message);
            localStorage.setItem('editStatus', false);
            console.log(response.data)
        }
        );

    }



}