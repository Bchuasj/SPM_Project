function getAllStaff() {
    var staffTable = document.getElementById("staffTable")
    var invis = document.getElementById("invis")
    invis.innerHTML = ""
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
            staffTable.innerHTML = "There are no staffs available.";

        }
    );
}

function getSkillsForStaff(staffId){
    axios.get("http://127.0.0.1:5006/staff/"+ staffId + "/skills")
        .then(function (response) {

            var skills = response.data.data.skills
            console.log(skills)
            var staffSkills = document.getElementById("staffSkills" + staffId)
            if(skills.length == 0){
                return 
            }

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
                        <td class='skillId' name='skillId'>${skills[skill].skillId}</td>
                        <td class='skillName' name='skillName'>${skills[skill].skillName}</td>
                    </tr>
                `
            }
            
        })
        .catch(function (error) {
            var staffSkills = document.getElementById("staffSkills" + staffId)
            staffSkills.innerHTML = "No skills found.";
            console.log(error);
            // getAllSkills()
        }
    );
}

function changeSearch(){
    var inputStaff = document.getElementById("searchInputStaff")
    var inputSkill = document.getElementById("searchInputSkill")
    var buttonStaff = document.getElementById("searchStaffButton")
    var buttonSkill = document.getElementById("searchSkillsButton")

    if (inputSkill.style.display == "none"){
        inputSkill.style.display = ""
        buttonSkill.style.display = ""
        inputStaff.style.display = "none"
        buttonStaff.style.display = "none"

        inputSkill.value = ""
        inputStaff.value = ""

    } else {
        inputSkill.style.display = "none"
        buttonSkill.style.display = "none"
        inputStaff.style.display = ""
        buttonStaff.style.display = ""
        
        inputSkill.value = ""
        inputStaff.value = ""
    }
}

function searchByStaff() {
    
    // noskills.style.display = "none";
    var hiddenStaffs = 0
    var invis = document.getElementById("invis")
    invis.innerHTML = ""


    // print what key is pressed
    var input, filter, staffList,  staffName, i, txtValue, numValue;
    input = document.getElementById("searchInputStaff");
    staffList = document.getElementsByName("staff");
    // console.log("here", input)
    // check if input is string
    if (isNaN(input.value)){
        // console.log(input.value)
        // console.log(staffList)
        filter = input.value.toUpperCase();
        filter = filter.replace(/ /g, '');

        var staffNameList = document.getElementsByName("staffName");
        for (i = 0; i < staffNameList.length; i++) {

            staffName = staffNameList[i];
            txtValue = staffName.textContent || staffName.innerText;
            txtValue = txtValue.replace(/ /g, '');

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            staffList[i].style.display = "";
            } else {
            staffList[i].style.display = "none";
            hiddenStaffs += 1
            }
        }
    }
    else if (!isNaN(input.value) && input.value != ""){
        // console.log("here2",input.value)
        staffIdList = document.getElementsByName("staffId");
        for (i = 0; i < staffIdList.length; i++) {
            staffId = staffIdList[i];
            numValue = staffId.textContent || staffId.innerText;
            if (numValue.indexOf(input.value) > -1) {
            staffList[i].style.display = "";
            } 
            else {
           staffList[i].style.display = "none";
           hiddenStaffs += 1
            }
        }
    }
    else{
        for (i = 0; i < staffList.length; i++) {
            staffList[i].style.display = "";
        }
    }

    console.log("hiddenStaffs", hiddenStaffs)
    console.log("staff list length", staffList.length)

    if(hiddenStaffs == staffList.length){
        invis.innerHTML = "There is no staff with that skill available"

    }

}

function searchBySkill() {

    var hiddenStaffs = 0
    var invis = document.getElementById("invis")
    invis.innerHTML = ""

    // noskills.style.display = "none";

    // print what key is pressed
    var input, filter, staffList,  skillList, staffIdList, i, txtValue, numValue;
    input = document.getElementById("searchInputSkill");
    staffList = document.getElementsByName("staff");
    // console.log("here", input)
    // check if input is string
    if (isNaN(input.value)){
        // console.log(input.value)
        // console.log(staffList)
        filter = input.value.toUpperCase();
        filter = filter.replace(/ /g, '');
        
        for (i = 0; i < staffList.length; i++){
            var skillEleId = "staffSkills" + staffList[i].id
            var skillEle = document.getElementById(skillEleId)
            // console.log(skillEle)
            skillList = skillEle.querySelectorAll('.skillName')
            // console.log(skillList)
            var shown = 0 
            // console.log(staffList[i])
            
            // default show all unless no skills 
            if (skillList.length == 0){
                staffList[i].style.display = "none";
                hiddenStaffs += 1
            } else {
                staffList[i].style.display = "";
            }

            for (j = 0; j < skillList.length; j++){
                // console.log(skillList[j].innerText)
                txtValue = skillList[j].innerText 
                txtValue = txtValue.replace(/ /g, '');

                // Only check if it has not already been shown 
                if (shown == 0){
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        // console.log("shown", txtValue)
                        staffList[i].style.display = "";
                        shown = 1
                    } else {
                    staffList[i].style.display = "none";
                    hiddenStaffs += 1

                    }
                }
            
            // reset shown for each staff 
            }
            shown = 0

            if(hiddenStaffs == staffList.length){
                invis.innerHTML = "There is no staff with that skill available"
        
            }

        }
    }
    else if (!isNaN(input.value) && input.value != ""){
        // console.log("here2",input.value)
        // staffIdList = document.getElementsByName("staffId");
        filter = input.value.toUpperCase();

        for (i = 0; i < staffList.length; i++) {
            var skillEleId = "staffSkills" + staffList[i].id
            var skillEle = document.getElementById(skillEleId)
            // console.log(skillEle)
            skillList = skillEle.querySelectorAll('.skillId')
            // console.log(skillList)
            var shown = 0 
            // console.log(staffList[i])
            
            // default show all unless no skills 
            if (skillList.length == 0){
                staffList[i].style.display = "none";
                hiddenStaffs += 1
            } else {
                staffList[i].style.display = "";
            }

            for (j = 0; j < skillList.length; j++){
                // console.log(skillList[j].innerText)
                txtValue = skillList[j].innerText 

                // Only check if it has not already been shown 
                if (shown == 0){
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        // console.log("shown", txtValue)
                        staffList[i].style.display = "";
                        shown = 1
                    } else {
                    staffList[i].style.display = "none";
                    hiddenStaffs += 1
                    }
                }
            
            // reset shown for each staff 
            }
            shown = 0

            if(hiddenStaffs == staffList.length){
                invis.innerHTML = "There is no staff with that skill available"
        
            }

        }
    }
    else{
        for (i = 0; i < staffList.length; i++) {
            staffList[i].style.display = "";

        }
    }
}
