// ONLOAD CALLS
function getAllWorkRoles() {
  var workRolesTable = document.getElementById("workRolesTable");
  axios.get("http://127.0.0.1:5006/workRole")
      .then(function (response) {
        var workRoles = response.data.data.workRoles;
        console.log(workRoles)
        if(workRoles.length == 0){
            workRolesTable.innerHTML = "<p>No work roles found.</p>";
            return
        }
        workRolesTable.innerHTML = "";
        for(let workRole in workRoles){
            if (workRoles[workRole].isDeleted == false) {
                workRolesTable.innerHTML += `
                <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                    <div class="col-sm-3 col-3">
                        <b>${workRoles[workRole].workRoleId}</b>
                    </div>
                    <div class="col-sm-6 col-6">
                        <b>${workRoles[workRole].workRoleName}</b>
                    </div>
                    <div class="col-sm col">
                        <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${workRoles[workRole].workRoleId}" aria-expanded="false" aria-controls="collapseExample${workRoles[workRole].workRoleId}" >View details</button>
                    </div>
                    <div class="collapse pt-2" id="collapseExample${workRoles[workRole].workRoleId}">
                        <div class="card card-body text-start">
                            <p><b>Skills required</b></p>
                            <br><br>
                            <div id="workRoleSkills${workRoles[workRole].workRoleId}"></div>
                        </div>
                    </div>
                </div>
                `
                getSkillsForWorkRole(workRoles[workRole].workRoleId)
            }
        }
    }) 
    .catch(function (error) {
      console.log(error);
  }
);  
    
}

function getSkillsForWorkRole(workRoleId){
  axios.get("http://127.0.0.1:5006/workRole/" + workRoleId + "/skills")
  .then(function (response) {
    var skills = response.data.data.skills;
    
    if(skills.length == 0){
      return 
    }
    
    var workRoleSkill = document.getElementById("workRoleSkills" + workRoleId);
    workRoleSkill.innerHTML = ""
    
    workRoleSkill.innerHTML = `
    <table class="table align-items-center">
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            </tr>
        </thead>
        <tbody id="skillDetails${workRoleId}"> 
        </tbody>
    </table>
    `
  var skillDetails = document.getElementById("skillDetails" + workRoleId)
  for(let skill in skills){
      skillDetails.innerHTML += `
          <tr>
              <td>${skills[skill].skillId}</td>
              <td>${skills[skill].skillName}</td>
          </tr>
      `
  }
  
  })
  .catch(function (error) {
    console.log(error)
  })
}

// SEARCH
function searchWorkRoles() {
  var searchInput = document.getElementById("searchInput").value
  var workRolesTable = document.getElementById("workRolesTable")

  if(searchInput == ''){
      getAllWorkRoles()
      return
  }

  if (isNaN(parseInt(searchInput))){
      searchWorkRoleName(searchInput, workRolesTable)
  } else {
      searchWorkRoleId(searchInput, workRolesTable)
  }
  
}

function searchWorkRoleName(searchInput, workRolesTable){
  // var searchInput = document.getElementById("searchInput").value
  // var skillsTable = document.getElementById("skillsTable")

  console.log(searchInput)
  axios.get("http://127.0.0.1:5006/workRole/name/" + searchInput)
      .then(function (response) {
          // console.log(response);
          var workRole = response.data.data;
          // console.log(response.data.code)
          // console.log(skill)
          if (response.data.code == 200 && workRole.isDeleted == false){
              // console.log("here")
              workRolesTable.innerHTML =   `
              <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                  <div class="col-sm-3 col-3">
                      <b>${workRole.workRoleId}</b>
                  </div>
                  <div class="col-sm-6 col-6">
                      <b>${workRole.workRoleName}</b>
                  </div>
                  <div class="col-sm col">
                      <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${workRole.workRoleId}" aria-expanded="false" aria-controls="collapseExample${workRole.workRoleId}">View details</button>
                  </div>
                  <div class="collapse pt-2" id="collapseExample${workRole.workRoleId}">
                      <div class="card card-body text-start">
                          <p><b>Skills required</b></p>
                          <br><br>
                          <div id="workRoleSkills${workRole.workRoleId}"></div>
                      </div>
                  </div>
              </div>
              `
              getSkillsForWorkRole(workRole.workRoleId)

          } else {
              workRolesTable.innerHTML = "<p>No work roles found.</p>";
          }
  })
      .catch(function (error) {
          console.log(error);
      }
  );
}

function searchWorkRoleId(searchInput, workRolesTable){
  // var searchInput = document.getElementById("searchInput").value
  // var skillsTable = document.getElementById("skillsTable")
  console.log("search id")
  axios.get("http://127.0.0.1:5006/workRole/id/" + searchInput)
      .then(function (response) {
          // console.log(response);
          var workRole = response.data.data;
          // console.log(skill.isDeleted)
          // console.log(response.data.code)
          if (response.data.code == 200 && workRole.isDeleted == false){
              workRolesTable.innerHTML =   `
              <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                  <div class="col-sm-3 col-3">
                      <b>${workRole.workRoleId}</b>
                  </div>
                  <div class="col-sm-6 col-6">
                      <b>${workRole.workRoleName}</b>
                  </div>
                  <div class="col-sm col">
                      <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${workRole.workRoleId}" aria-expanded="false" aria-controls="collapseExample${workRole.workRoleId}">View details</button>
                  </div>
                  <div class="collapse pt-2" id="collapseExample${workRole.workRoleId}">
                      <div class="card card-body text-start">
                          <p><b>Courses</b></p>
                          <br><br>
                          <div id="workRoleSkills${workRole.workRoleId}"></div>
                      </div>
                  </div>
              </div>
              `
              getSkillsForWorkRole(workRole.workRoleId)

          } else {
              workRolesTable.innerHTML = "<p>No work roles found.</p>";

          }
  })
      .catch(function (error) {
          console.log(error);
      }
  );
}

// function getWorkRole() {
//   // print what key is pressed
//   var input, filter, jobsList,  jobName, i, txtValue, numValue;
//   input = document.getElementById("jobInput");
//   jobsList = document.getElementsByName("jobs");
//   // check if input is string
//   if (isNaN(input.value)){
//     filter = input.value.toUpperCase();
//     jobNameList = document.getElementsByName("jobName");
//     for (i = 0; i < jobNameList.length; i++) {
//       jobName = jobNameList[i];
//       txtValue = jobName.textContent || jobName.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         jobsList[i].style.display = "";
//       } else {
//         jobsList[i].style.display = "none";
//       }
//     }
//   }
//   else if (!isNaN(input.value) && input.value != ""){
//     jobIdList = document.getElementsByName("jobId");
//     for (i = 0; i < jobIdList.length; i++) {
//       jobId = jobIdList[i];
//       numValue = jobId.textContent || jobId.innerText;
//       if (numValue.indexOf(input.value) > -1) {
//         jobsList[i].style.display = "";
//       } 
//       else {
//         jobsList[i].style.display = "none";
//       }
//     }
//   }
// }

