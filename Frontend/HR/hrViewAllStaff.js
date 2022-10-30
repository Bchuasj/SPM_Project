function getAllStaff() {
    console.log("here")
    var staffTable = document.getElementById("staffTable")
    axios.get("http://127.0.0.1:5006/staff")
        .then(function (response) {
            var staff = response.data.data.staff;
            console.log(staff)
            if(staff.length == 0){
                staffTable.innerHTML = "<p>No roles found.</p>";
                return
            }
            staffTable.innerHTML = "";
            for(let person in staff){
                // console.log(skills[skill])
                staffTable.innerHTML += `
                <div name = "staff" id = "${staff[person].staffId}">
                    <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                        <div class="col-2" name = "workRoleId">
                            <b>${staff[person].staffId}</b>
                        </div>
                        <div class="col-2" name = "workRoleName">
                            <b>${staff[person].staffName}</b>
                        </div>

                        <div class="collapse pt-2" id="collapseExample${staff[person].staffId}">
                        <div class="card card-body text-start">
                                <p><b>Skills</b></p>
                                <br><br>
                                <div id="workRoleSkills${staff[person].staffId}"></div>
                            </div>
                        </div>
                    </div>
                </div>
                `
                getSkillsForStaff(staff[person].staffId)
            }
        }).catch(function (error) {
            console.log(error);
        }
    );
}

// need to change to getAllCompletedSkillsForStaff()
function getSkillsForStaff(staffId){
    // axios.get("http://127.0.0.1:5006/workRole/"+ roleId + "/skills")
    //     .then(function (response) {
            
    //         var skills = response.data.data.skills
            
    //         if(skills.length == 0){
    //             return 
    //         }

    //         var roleSkills = document.getElementById("workRoleSkills" + roleId)
    //         roleSkills.innerHTML = `
    //         <table class="table align-items-center">
    //             <thead>
    //                 <tr>
    //                 <th>ID</th>
    //                 <th>Name</th>
    //                 </tr>
    //             </thead>
    //             <tbody id="skillDetails${roleId}"> 
    //             </tbody>
    //         </table>
    //         `
    //         var skillDetails = document.getElementById("skillDetails" + roleId)
    //         for(let skill in skills){
    //             skillDetails.innerHTML += `
    //                 <tr>
    //                     <td>${skills[skill].skillId}</td>
    //                     <td>${skills[skill].skillName}</td>
    //                 </tr>
    //             `
    //         }
            
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //         // getAllSkills()
    //     }
    // );
}

// need to change to searchStaff()
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
