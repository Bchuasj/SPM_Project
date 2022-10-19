function getAllWorkRoles() {
    var workRolesTable = document.getElementById("workRolesTable")
    axios.get("http://127.0.0.1:5006/workRole")
        .then(function (response) {
            var roles = response.data.data.workRoles;
            // console.log(skills)
            if(roles.length == 0){
                workRolesTable.innerHTML = "<p>No roles found.</p>";
                return
            }
            workRolesTable.innerHTML = "";
            for(let role in roles){
                // console.log(skills[skill])
                if (roles[role].isDeleted == false) {
                    workRolesTable.innerHTML += `
                    <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                        <div class="col-2">
                            <b>${roles[role].workRoleId}</b>
                        </div>
                        <div class="col-5">
                            <b>${roles[role].workRoleName}</b>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${roles[role].workRoleId}" aria-expanded="false" aria-controls="collapseExample${roles[role].workRoleId}" >View details</button>
                        </div>
                        <div class="col">
                            <a class="btn btn-dark btn-sm px-3" href="hrUpdateWorkRole.html?${roles[role].workRoleId}" role="button">Edit Details</a>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger btn-sm px-3" onclick="deleteRole(${roles[role].workRoleId})" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                        </div>
                        <div class="collapse pt-2" id="collapseExample${roles[role].workRoleId}">
                           <div class="card card-body text-start">
                                <p><b>Skills</b></p>
                                <br><br>
                                <div id="workRoleSkills${roles[role].workRoleId}"></div>
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
    axios.get("http://127.0.0.1:5006/workRole/"+ roleId)
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
            console.log(response);
            var workRole = response.data.data;
            // console.log(response.data.code)
            if (response.data.code == 200 && workRole.isDeleted == false){
                console.log("here")
                workRolesTable.innerHTML =   `
                <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                    <div class="col-2">
                        <b>${workRole.workRoleId}</b>
                    </div>
                    <div class="col-5">
                        <b>${workRole.workRoleName}</b>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${workRole.workRoleId}" aria-expanded="false" aria-controls="collapseExample${workRole.workRoleId}">View details</button>
                    </div>
                    <div class="col">
                        <a class="btn btn-dark btn-sm px-3" role="button" href="hrUpdateWorkRole.html?${workRole.workRoleId}">Edit Details</a>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger btn-sm px-3" onclick="deleteWorkRole(${workRole.workRoleId})" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                    </div>
                    <div class="collapse pt-2" id="collapseExample${workRole.workRoleId}">
                        <div class="card card-body text-start">
                            <p><b>Skills</b></p>
                            <br><br>
                            <div id="workRoleSkills${workRole.workRoleId}"></div>
                        </div>
                    </div>
                </div>
                `

                getSkillsForWorkRoles(workRole.workRoleId)

            } else {
                workRolesTable.innerHTML = "<p>No work role found.</p>";
                // console.log("search id")
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

    axios.get("http://127.0.0.1:5006/workRole/id/" + searchInput)
        .then(function (response) {
            console.log(response);
            var workRole = response.data.data;
            // console.log(skill.isDeleted)
            // console.log(response.data.code)
            if (response.data.code == 200 && workRole.isDeleted == false){
                console.log("work Role found")
                workRolesTable.innerHTML =   `
                <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                    <div class="col-2">
                        <b>${workRole.workRoleId}</b>
                    </div>
                    <div class="col-5">
                        <b>${workRole.workRoleName}</b>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${workRole.workRoleId}" aria-expanded="false" aria-controls="collapseExample${workRole.workRoleId}">View details</button>
                    </div>
                    <div class="col">
                        <a class="btn btn-dark btn-sm px-3" role="button" href="hrUpdateWorkRole.html?${workRole.workRoleId}">Edit Details</a>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger btn-sm px-3" onclick="deleteWorkRole(${workRole.workRoleId})" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                    </div>
                    <div class="collapse pt-2" id="collapseExample${workRole.workRoleId}">
                        <div class="card card-body text-start">
                            <p><b>Skills</b></p>
                            <br><br>
                            <div id="workRoleSkills${workRole.workRoleId}"></div>
                        </div>
                    </div>
                </div>
                `

                getSkillsForWorkRoles(workRole.workRoleId)

            } else {
                // console.log("no skills found")
                workRolesTable.innerHTML = "<p>No work roles found.</p>";
            }
    })
        .catch(function (error) {
            console.log(error);
        }
    );
}

function deleteSkill(skillId){
    var deletePopUp = document.getElementById("deletePopUp")
    var confirmDelete = document.getElementById("confirmDelete")
    deletePopUp.innerHTML = `
    Delete skill: ${skillId}
    `
    confirmDelete.onclick = confirmDeletion.bind(this, skillId);
    
}

function confirmDeletion(skillId){
    console.log("delete button pressed")
    axios.put("http://127.0.0.1:5006/skill/delete/" + skillId)
        .then(function (response) {
            console.log(response)
            getAllSkills()
        })
        .catch(function (error) {
            console.log(error);
        }
        );
}
// =================== AXIOS TEMPLATE ====================
// axios.get("http://127.0.0.1:5006/skill/id/" + searchInput)
// .then(function (response) {
// })
// .catch(function (error) {
//     console.log(error);

// }
// );