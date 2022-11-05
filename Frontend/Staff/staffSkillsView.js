var role = localStorage.getItem("role")
function getAllSkills() {
    var skillsTable = document.getElementById("skillsTable")

    if(role != 1 && document.getElementById("hrView")){
        var hrView = document.getElementById("hrView")
        hrView.remove()
    }

    axios.get("http://127.0.0.1:5006/skill")
        .then(function (response) {
            var skills = response.data.data.skills;
            // console.log(skills)
            if(skills.length == 0){
                skillsTable.innerHTML = "<p>No skills found.</p>";
                return
            }
            skillsTable.innerHTML = "";
            for(let skill in skills){
                // console.log(skills[skill])
                if (skills[skill].isDeleted == false) {
                    skillsTable.innerHTML += `
                    <div name = "skills" id = "${skills[skill].skillId}">
                        <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                            <div class="col-sm-3 col-3" name = "skillId">
                                <b>${skills[skill].skillId}</b>
                            </div>
                            <div class="col-sm-6 col-6" name = "skillName">
                                <b>${skills[skill].skillName}</b>
                            </div>
                            <div class="col-sm col">
                                <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${skills[skill].skillId}" aria-expanded="false" aria-controls="collapseExample${skills[skill].skillId}" >View details</button>
                            </div>
                            <div class="collapse pt-2" id="collapseExample${skills[skill].skillId}">
                                <div class="card card-body text-start">
                                    <p><b>Description</b></p>
                                    <p>${skills[skill].skillDesc}</p>
                                    <p><b>Courses</b></p>
                                    <br><br>
                                    <div id="skillCourses${skills[skill].skillId}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    getCoursesForSkill(skills[skill].skillId)
                }
            }
        })   
        .catch(function (error) {
            console.log(error);
        }
    );
}

function getCoursesForSkill(skillId){
    axios.get("http://127.0.0.1:5006/skill/" + skillId)
        .then(function (response) {
            // console.log(response.data.data.courses)
            var courses = response.data.data.courses
            
            if(courses.length == 0){
                return 
            }

            var skillCourses = document.getElementById("skillCourses" + skillId)
            skillCourses.innerHTML = `
            <table class="table align-items-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    </tr>
                </thead>
                <tbody id="courseDetails${skillId}"> 
                </tbody>
            </table>
            `
            var courseDetails = document.getElementById("courseDetails" + skillId)
            for(let course in courses){
                courseDetails.innerHTML += `
                    <tr>
                        <td>${courses[course].courseId}</td>
                        <td>${courses[course].courseName}</td>
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

function searchSkills() {
    // print what key is pressed
    var input, filter, SkillsList,  skillName, i, txtValue, numValue;
    input = document.getElementById("searchInput");
    SkillsList = document.getElementsByName("skills");
    // check if input is string
    if (isNaN(input.value)){
        console.log(input.value)
        filter = input.value.toUpperCase();
        filter = filter.replace(/ /g, '');
        skillNameList = document.getElementsByName("skillName");
        for (i = 0; i < skillNameList.length; i++) {
            skillName = skillNameList[i];
            txtValue = skillName.textContent || skillName.innerText;
            txtValue = txtValue.replace(/ /g, '');
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            SkillsList[i].style.display = "";
            } else {
            SkillsList[i].style.display = "none";
            }
        }
    }
    else if (!isNaN(input.value) && input.value != ""){
        console.log(input.value)
        skillIdList = document.getElementsByName("skillId");
        for (i = 0; i < skillIdList.length; i++) {
            jobId = skillIdList[i];
            numValue = jobId.textContent || jobId.innerText;
            if (numValue.indexOf(input.value) > -1) {
            SkillsList[i].style.display = "";
            } 
            else {
            SkillsList[i].style.display = "none";
            }
        }
    }
    else{
        for (i = 0; i < SkillsList.length; i++) {
            SkillsList[i].style.display = "";
        }
    }
}

// =================== AXIOS TEMPLATE ====================
// axios.get("http://127.0.0.1:5006/skill/id/" + searchInput)
// .then(function (response) {
// })
// .catch(function (error) {
//     console.log(error);
//     getAllSkills()
// }
// );