function getAllStaff() {
    var staffTable = document.getElementById("staffTable")
    axios.get("http://127.0.0.1:5006/staff")
        .then(function (response) {
            var staff = response.data.data.staff;
            // console.log(staff)
            // console.log(staff[0])
            if(staff.length == 0){
                staffTable.innerHTML = "<p>No staff found.</p>";
                return
            }
            staffTable.innerHTML = "";
            for(let person in staff){
                // console.log(skills[skill])
                staffTable.innerHTML += `
                <div name = "staff" id = "${staff[person].staffId}">
                    <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                        <div class="col" name = "staffId">
                            <b>${staff[person].staffId}</b>
                        </div>
                        <div class="col" name = "staffName">
                            <b>${staff[person].staffFName + ' ' + staff[person].staffLName}</b>
                        </div>
                        <div class="col" name = "staffDept">
                        <b>${staff[person].dept}</b>
                        </div>
                        
                        <div class="col">
                        <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${staff[person].staffId}" aria-expanded="false" aria-controls="collapseExample${staff[person].staffId}" >View Skills</button>
                        </div>

                        <div class="collapse pt-2" id="collapseExample${staff[person].staffId}">
                        <div class="card card-body text-start">
                                <p><b>Skills</b></p>
                                <br><br>
                                <div id="staffSkills${staff[person].staffId}"></div>
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

function getSkillsForStaff(staffId){
    axios.get("http://127.0.0.1:5006/staff/"+ staffId + "/skills")
        .then(function (response) {

            var skills = response.data.data.skills
            
            if(skills.length == 0){
                return 
            }

            var staffSkills = document.getElementById("staffSkills" + staffId)
            staffSkills.innerHTML = `
            <table class="table align-items-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    </tr>
                </thead>
                <tbody id="skillDetails${staffId}"> 
                </tbody>
            </table>
            `
            var skillDetails = document.getElementById("skillDetails" + staffId)
            for(let skill in skills){
                skillDetails.innerHTML += `
                    <tr>
                        <td name='skillId'>${skills[skill].skillId}</td>
                        <td name='skillName'>${skills[skill].skillName}</td>
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

function searchStaff() {
    // print what key is pressed
    var input, filter, staffList,  staffName, skillName, skillId, i, txtValue, numValue;
    input = document.getElementById("searchInput");
    staffList = document.getElementsByName("staff");
    // console.log(staffList)
    // check if input is string
    if (isNaN(input.value)){
        // console.log(input.value)
        filter = input.value.toUpperCase();
        var staffNameList = document.getElementsByName("staffName");
        for (i = 0; i < staffNameList.length; i++) {

            staffName = staffNameList[i];
            txtValue = staffName.textContent || staffName.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            staffList[i].style.display = "";
            } else {
            staffList[i].style.display = "none";
            }
            
            // if (staffList[i].style.display = "none"){
            //     // console.log(staffList[i])
            //     var skillNameList = staffList[i].querySelector("[name='skillName']")
            //     console.log(skillNameList)
                // for (i = 0; i < skillNameList.length; i++) {
                //     skillName = skillNameList[i];
                //     txtValue = skillName.textContent || skillName.innerText;
                //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
                //     staffList[i].style.display = "";
                //     } else {
                //     staffList[i].style.display = "none";
                //     }
                // }
            // }
        }
       
    }
    else if (!isNaN(input.value) && input.value != ""){
        console.log(input.value)
        staffIdList = document.getElementsByName("staffId");
        for (i = 0; i < staffIdList.length; i++) {
            staffId = staffIdList[i];
            numValue = staffId.textContent || staffId.innerText;
            if (numValue.indexOf(input.value) > -1) {
           staffList[i].style.display = "";
            } 
            else {
           staffList[i].style.display = "none";
            }
        }
    }
    else{
        for (i = 0; i < staffList.length; i++) {
            staffList[i].style.display = "";
        }
    }
}
