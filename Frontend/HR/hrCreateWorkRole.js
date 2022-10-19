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
    table = document.getElementById("viewSkills");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      td1 = tr[i].getElementsByTagName("td")[0];
      if (td || td1) {
        txtValue = td.textContent || td.innerText;
        txt2 = td1.textContent || td1.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txt2.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }   
    }
  }

function createRole() {
    var workRoleName = document.getElementById("roleName").value;
    var skills = document.getElementById("skills").value;
    selectedSkills = skills.split(",")
    console.log("Selected Skills",selectedSkills)
    
    if (workRoleName == "" || selectedSkills[0] < 1){
        alert("Please enter all the details")
        return 
    }

    // Post request
    isDeleted = 0
    axios.post("http://127.0.0.1:5006/workRole/create",
        {   
            workRoleName: workRoleName, 
            isDeleted: isDeleted,
            skills: selectedSkills
    })
        .then(function (response) {
            console.log("Create Role response",response);
            document.getElementById("statusMsg").className = "text-success"
            document.getElementById("statusMsg").innerHTML = "<b>Work Role has been created successfully!</b>"
        }
    ).catch(function (error) {
        console.log(error);
        document.getElementById("statusMsg").className = "text-danger"
        document.getElementById("statusMsg").innerHTML = "<b>Sorry! There is an error creating the Work Role</b>"
    })
}

// for update
// function getSkill(){
//     // need to pass the skillId to me 
//     var skillId = location.search.substring(1);
//     // console.log(queryString)
//     getAllCourses();
//     axios.get(`http://127.0.0.1:5006/skill/${skillId}`)
//         .then(function (response) {
//             var skill = response.data.data.skill;
//             var courses = response.data.data.courses;
//             console.log(courses)
//             document.getElementById("skillName").value = skill.skillName;
//             document.getElementById("skillDesc").value = skill.skillDesc;
//             // based on the input values, tick the checkbox
//             for (course in courses){
//                 console.log(course)
//                 document.getElementById("courses").value += courses[course].courseId+","
//             }
//             document.getElementById("courses").value = document.getElementById("courses").value.slice(0, -1);
//             var checkboxes = document.querySelectorAll('input[type=checkbox]');
//             for (var i = 0; i < checkboxes.length; i++) {
//                 if (courses.includes(checkboxes[i].id)) {
//                     checkboxes[i].checked = true;
//                 }
//             }
//         })
// }

// For update
// function updateSkill(){
//     var skillId = location.search.substring(1);
//     var skillName = document.getElementById("skillName").value;
//     var skillDesc = document.getElementById("skillDesc").value;
//     var courses = document.getElementById("courses").value;
//     var selectedCourses = courses.split(",")
//     if (skillName == "" || skillDesc == ""){
//         alert("Please enter all the details")
//         return 
//     }
//     // Put request
//     isDeleted = 0
//     axios.put(`http://127.0.0.1:5006/skill/update/${skillId}`,
//         {   skill: {
//                     skillName: skillName, 
//                     skillDesc: skillDesc,
//                     isDeleted: isDeleted
//                 }, 
//         courses: selectedCourses
//     })
//         .then(function (response) {
//             console.log(response);
//         }
//     )
// }