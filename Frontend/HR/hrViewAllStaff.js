////////////////////////////////////////
/// copied from hrViewWorkRoles.js  ///
//////////////////////////////////////

function getAllRoles() {
    var workRolesTable = document.getElementById("workRolesTable")
    axios.get("http://127.0.0.1:5006/workRole")
        .then(function (response) {
            var roles = response.data.data.workRoles;
            console.log(roles)
            if(roles.length == 0){
                workRolesTable.innerHTML = "<p>No roles found.</p>";
                return
            }
            workRolesTable.innerHTML = "";
            for(let role in roles){
                // console.log(skills[skill])
                if (roles[role].isDeleted == false) {
                    workRolesTable.innerHTML += `
                    <div name = "workRoles" id = "${roles[role].workRoleId}">
                        <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                            <div class="col-2" name = "workRoleId">
                                <b>${roles[role].workRoleId}</b>
                            </div>
                            <div class="col-2" name = "workRoleName">
                                <b>${roles[role].workRoleName}</b>
                            </div>

                            <div class="collapse pt-2" id="collapseExample${roles[role].workRoleId}">
                            <div class="card card-body text-start">
                                    <p><b>Skills</b></p>
                                    <br><br>
                                    <div id="workRoleSkills${roles[role].workRoleId}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    getSkillsForWorkRoles(roles[role].workRoleId)
                }
            }
        })   
        .catch(function (error) {
            console.log(error);
        }
    );
}

function getSkillsForWorkRoles(roleId){
    axios.get("http://127.0.0.1:5006/workRole/"+ roleId + "/skills")
        .then(function (response) {
            
            var skills = response.data.data.skills
            
            if(skills.length == 0){
                return 
            }

            var roleSkills = document.getElementById("workRoleSkills" + roleId)
            roleSkills.innerHTML = `
            <table class="table align-items-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    </tr>
                </thead>
                <tbody id="skillDetails${roleId}"> 
                </tbody>
            </table>
            `
            var skillDetails = document.getElementById("skillDetails" + roleId)
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
            console.log(error);
            // getAllSkills()
        }
    );
}

function searchWorkRoles() {
    // print what key is pressed
    var input, filter, workRolesList,  workRoleName, i, txtValue, numValue;
    input = document.getElementById("searchInput");
    workRolesList = document.getElementsByName("workRoles");
    console.log(workRolesList)
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
