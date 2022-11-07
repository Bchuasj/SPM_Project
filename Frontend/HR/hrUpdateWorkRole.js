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

function getAllSkills() {
    var skillsList = document.getElementById("viewSkills") 
    var selected = document.getElementById("skills").value
    if (selected.length > 0){
        var selectedCourses = selected.split(",")
    }
    axios.get("http://127.0.0.1:5006/skill")
        .then(function (response) {
            console.log("response", response)
            var skills = response.data.data.skills;
            skillsList.innerHTML = "<tr><th>Skill ID</th><th>Skill Name</th><th>Add</th></tr>"
            for(let skill in skills){
                if(skills[skill].isDeleted == false){
                    skillsList.innerHTML += `<tr><td>${skills[skill].skillId}</td><td> ${skills[skill].skillName}</td><td><input type = "checkbox" id ="${skills[skill].skillId}" value = "${skills[skill].skillId}"></td></tr>`
                }
                
                }
            // check which checkboxes are checked
            var checkboxes = document.querySelectorAll('input[type=checkbox]');
            if (selected.length > 0){
                for (var i = 0; i < checkboxes.length; i++) {
                    if (selectedCourses.includes(checkboxes[i].id)) {
                        checkboxes[i].checked = true;
                    }
                }
            }
        })
        .catch(function (error) {
            console.log(error);
            skills.innerHTML = "No skills are available"
        })
}

function populateInput(){
    // loop through table and check if checkbox is checked and add to input textfield
    var skills = document.getElementById("viewSkills");
    var selectedSkills = [];
    for (var i = 0; i < skills.rows.length; i++) {
        var row = skills.rows[i];
        var checkbox = row.cells[2].childNodes[0];
        if (checkbox.checked) {
            selectedSkills.push(checkbox.id);
        }
    }
    document.getElementById("skills").value = selectedSkills;
}

function getSkill() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("skillInput");
    filter = input.value.toUpperCase();
    filter = filter.replace(/ /g, '');
    table = document.getElementById("viewSkills");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      td1 = tr[i].getElementsByTagName("td")[0];
      if (td || td1) {
        txtValue = td.textContent || td.innerText;
        txtValue = txtValue.replace(/ /g, '');
        txt2 = td1.textContent || td1.innerText;
        txt2 = txt2.replace(/ /g, '');
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txt2.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }   
    }
  }



function getWorkRole(){
    // need to pass the workRoleId to me 
    var workRoleId = location.search.substring(1);
    // console.log(queryString)
    getAllWorkRoles();
    axios.get(`http://127.0.0.1:5006/workRole/${workRoleId}/skills`)
        .then(function (response) {
            console.log(response)
            var workRole = response.data.data.workRole;
            var skills = response.data.data.skills;
            console.log(skills)
            document.getElementById("workRoleName").value = workRole.workRoleName;
            document.getElementById("orgWorkRoleName").value = workRole.workRoleName;
            // based on the input values, tick the checkbox
            for (skill in skills){
                console.log(skill)
                document.getElementById("skills").value += skills[skill].skillId+","
            }
            document.getElementById("skills").value = document.getElementById("skills").value.slice(0, -1);
            var checkboxes = document.querySelectorAll('input[type=checkbox]');
            for (var i = 0; i < checkboxes.length; i++) {
                if (skills.includes(checkboxes[i].id)) {
                    checkboxes[i].checked = true;
                }
            }
        })
}

function updateWorkRole(){
    var workRoleId = location.search.substring(1);
    console.log("id",workRoleId)
    var workRoleName = document.getElementById("workRoleName").value;
    var orgWorkRoleName = document.getElementById("orgWorkRoleName").value
    var skills = document.getElementById("skills").value;
    var workRoleNameMsg = document.getElementById("roleNameMsg")
    var skillIdMsg = document.getElementById("skillIdMsg")
    var selectedSkills = skills.split(",")

    
    workRoleNameMsg.innerHTML = ""
    skillIdMsg.innerText = ""
    document.getElementById("statusMsg").innerHTML = ""

    if (workRoleName == ""){
        // <div id="roleNameMsg" class="text-danger mx-3">Please fill in a work role name</div>
        // workRoleName = "Please enter a work role name"
        // document.getElementById("roleName").className = "form-control text-danger fw-bold"
        // document.getElementById("roleName").value = "Please enter a work role name"
        workRoleNameMsg.innerHTML = "Please fill in a work role name"
        workRoleNameMsg.className = "text-danger mx-3"
        return
    } else if (selectedSkills[0] < 1){
        skillIdMsg.innerText = "Please fill in at least 1 skill"
        skillIdMsg.className = "text-danger mx-1"
        // alert("Please enter at least 1 skill!")
        return 
    } else {
        
        // Get request to check if work role name already exists
        axios.get(`http://127.0.0.1:5006/workRole/name/${workRoleName}`)
        .then(function (response) {
            console.log(response)
            if (response.data.data.workRoleName){
                if (workRoleName != orgWorkRoleName){
                    document.getElementById("roleNameMsg").className = "text-danger"
                    document.getElementById("roleNameMsg").innerHTML = "<b>Please enter a unique name!</b>"
                    return
                }
                else {
                    // Put request
                    isDeleted = 0
                    axios.put("http://127.0.0.1:5006/workRole/update/" + workRoleId,
                        {           
                            workRoleName: workRoleName,
                            isDeleted: isDeleted,
                            skills: selectedSkills
                        
                    })
                        .then(function (response) {
                            console.log(response);
                            document.getElementById("statusMsg").className = "text-success"
                            document.getElementById("statusMsg").innerHTML = "<b>Work role has been updated successfully!</b>"
                        }
                    ).catch(function (error) {
                        console.log(error);
                        document.getElementById("statusMsg").className = "text-danger"
                        document.getElementById("statusMsg").innerHTML = "<b>Unable to update work role!</b>"
                    })
                }
            }
        }).catch(function (){

            // Put request
            isDeleted = 0
            axios.put("http://127.0.0.1:5006/workRole/update/" + workRoleId,
                {           
                    workRoleName: workRoleName,
                    isDeleted: isDeleted,
                    skills: selectedSkills
                
            })
                .then(function (response) {
                    console.log(response);
                    document.getElementById("statusMsg").className = "text-success"
                    document.getElementById("statusMsg").innerHTML = "<b>Work role has been updated successfully!</b>"
                }
            ).catch(function (error) {
                console.log(error);
                document.getElementById("statusMsg").className = "text-danger"
                document.getElementById("statusMsg").innerHTML = "<b>Unable to update work role!</b>"
            })
        })
    }

}