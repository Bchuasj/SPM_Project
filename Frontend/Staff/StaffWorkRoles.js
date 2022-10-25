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
                <div name = "workRoles" id = "${workRoles[workRole].workRoleId}">
                    <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                        <div class="col-sm-3 col-3" name = "workRoleId">
                            <b>${workRoles[workRole].workRoleId}</b>
                        </div>
                        <div class="col-sm-6 col-6" name = "workRoleName">
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
    // print what key is pressed
    var input, filter, workRolesList,  workRoleName, i, txtValue, numValue;
    input = document.getElementById("searchInput");
    workRolesList = document.getElementsByName("workRoles");
    // check if input is string
    if (isNaN(input.value)){
        console.log(input.value)
        filter = input.value.toUpperCase();
        jobNameList = document.getElementsByName("workRoleName");
        for (i = 0; i < jobNameList.length; i++) {
            workRoleName = jobNameList[i];
            txtValue = workRoleName.textContent || workRoleName.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            workRolesList[i].style.display = "";
            } else {
            workRolesList[i].style.display = "none";
            }
        }
    }
    else if (!isNaN(input.value) && input.value != ""){
        console.log(input.value)
        workRoleIdList = document.getElementsByName("workRoleId");
        for (i = 0; i < workRoleIdList.length; i++) {
            jobId = workRoleIdList[i];
            numValue = jobId.textContent || jobId.innerText;
            if (numValue.indexOf(input.value) > -1) {
            workRolesList[i].style.display = "";
            } 
            else {
            workRolesList[i].style.display = "none";
            }
        }
    }
    else{
        for (i = 0; i < workRolesList.length; i++) {
            workRolesList[i].style.display = "";
        }
    }
}