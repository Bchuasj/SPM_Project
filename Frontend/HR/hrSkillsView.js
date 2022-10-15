function getAllSkills() {
    var skillsTable = document.getElementById("skillsTable")
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
                    <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                        <div class="col-2">
                            <b>${skills[skill].skillId}</b>
                        </div>
                        <div class="col-5">
                            <b>${skills[skill].skillName}</b>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${skills[skill].skillId}" aria-expanded="false" aria-controls="collapseExample${skills[skill].skillId}" >View details</button>
                        </div>
                        <div class="col">
                            <a class="btn btn-dark btn-sm px-3" href="hrUpdateSkill.html?${skills[skill].skillId}" role="button">Edit Details</a>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger btn-sm px-3" onclick="deleteSkill(${skills[skill].skillId})" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
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
    var searchInput = document.getElementById("searchInput").value
    var skillsTable = document.getElementById("skillsTable")

    if(searchInput == ''){
        getAllSkills()
        return
    }

    if (isNaN(parseInt(searchInput))){
        searchSkillName(searchInput, skillsTable)
    } else {
        searchSkillId(searchInput, skillsTable)
    }
}

function searchSkillName(searchInput, skillsTable){
    // var searchInput = document.getElementById("searchInput").value
    // var skillsTable = document.getElementById("skillsTable")

    console.log(searchInput)
    axios.get("http://127.0.0.1:5006/skill/name/" + searchInput)
        .then(function (response) {
            console.log(response);
            var skill = response.data.data;
            // console.log(response.data.code)
            if (response.data.code == 200 && skill.isDeleted == false){
                console.log("here")
                skillsTable.innerHTML =   `
                <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                    <div class="col-2">
                        <b>${skill.skillId}</b>
                    </div>
                    <div class="col-5">
                        <b>${skill.skillName}</b>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${skill.skillId}" aria-expanded="false" aria-controls="collapseExample${skill.skillId}">View details</button>
                    </div>
                    <div class="col">
                        <a class="btn btn-dark btn-sm px-3" href="#" role="button">Edit Details</a>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger btn-sm px-3" onclick="deleteSkill(${skill.skillId})" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                    </div>
                    <div class="collapse pt-2" id="collapseExample${skill.skillId}">
                        <div class="card card-body text-start">
                            <p><b>Description</b></p>
                            <p>${skill.skillDesc}</p>
                            <p><b>Courses</b></p>
                            <br><br>
                            <div id="skillCourses${skill.skillId}"></div>
                        </div>
                    </div>
                </div>
                `
                getCoursesForSkill(skill.skillId)

            } else {
                skillsTable.innerHTML = "<p>No skills found.</p>";
                // console.log("search id")
            }
    })
        .catch(function (error) {
            console.log(error);
        }
    );
}

function searchSkillId(searchInput, skillsTable){
    // var searchInput = document.getElementById("searchInput").value
    // var skillsTable = document.getElementById("skillsTable")

    axios.get("http://127.0.0.1:5006/skill/id/" + searchInput)
        .then(function (response) {
            console.log(response);
            var resp = response.data.data;
            // console.log(skill.isDeleted)
            // console.log(response.data.code)
            if (response.data.code == 200 && resp.skills.isDeleted == false){
                console.log("skill found")
                var skill = resp.skills
                skillsTable.innerHTML =   `
                <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                    <div class="col-2">
                        <b>${skill.skillId}</b>
                    </div>
                    <div class="col-5">
                        <b>${skill.skillName}</b>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${skill.skillId}" aria-expanded="false" aria-controls="collapseExample${skill.skillId}">View details</button>
                    </div>
                    <div class="col">
                        <a class="btn btn-dark btn-sm px-3" href="#" role="button">Edit Details</a>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger btn-sm px-3" onclick="deleteSkill(${skill.skillId})" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                    </div>
                    <div class="collapse pt-2" id="collapseExample${skill.skillId}">
                        <div class="card card-body text-start">
                            <p><b>Description</b></p>
                            <p>${skill.skillDesc}</p>
                            <p><b>Courses</b></p>
                            <br><br>
                            <div id="skillCourses${skill.skillId}"></div>
                        </div>
                    </div>
                </div>
                `
                getCoursesForSkill(skill.skillId)

            } else {
                // console.log("no skills found")
                skillsTable.innerHTML = "<p>No skills found.</p>";

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