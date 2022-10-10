function getAllCourses() {
    var coursesList = document.getElementById("viewCourses") 
    var selected = document.getElementById("courses").value
    if (selected.length > 0){
        var selectedCourses = selected.split(",")
    }
    axios.get("http://127.0.0.1:5006/courses")
        .then(function (response) {
            var courses = response.data.data.courses;
            coursesList.innerHTML = "<tr><th>Course ID</th><th>Course Name</th><th>Add</th></tr>"
            for(let course in courses){
                coursesList.innerHTML += `<tr><td>${courses[course].courseId}</td><td> ${courses[course].courseName}</td><td><input type = "checkbox" id ="${courses[course].courseId}" value = "${courses[course].courseId}"></td></tr>`
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
            coursesList.innerHTML = "No courses are available"
        })
}

function populateInput(){
    // loop through table and check if checkbox is checked and add to input textfield
    var courses = document.getElementById("viewCourses");
    var selectedCourses = [];
    for (var i = 0; i < courses.rows.length; i++) {
        var row = courses.rows[i];
        var checkbox = row.cells[2].childNodes[0];
        if (checkbox.checked) {
            selectedCourses.push(checkbox.id);
        }
    }
    console.log(selectedCourses)
    document.getElementById("courses").value = selectedCourses;
}

function getCourse() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("courseInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("viewCourses");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

function createSkill() {
    var skillName = document.getElementById("skillName").value;
    var skillDesc = document.getElementById("skillDesc").value;
    var courses = document.getElementById("courses").value;
    selectedCourses = courses.split(",")
    console.log(selectedCourses)
    
    if (skillName == "" || skillDesc == ""){
        alert("Please enter all the details")
        return 
    }

    // Post request
    isDeleted = 0
    axios.post("http://127.0.0.1:5006/skill/create",
        {   skill: {
                    skillName: skillName, 
                    skillDesc: skillDesc,
                    isDeleted: isDeleted
                }, 
        courses: selectedCourses
    })
        .then(function (response) {
            console.log(response);
        }
    )
}

// function getSkill(skillId){
//     // need to pass the skillId to me 
//     getAllCourses();
//     axios.get(`http://127.0.0.1:5006/skill/${skillId}`)
//         .then(function (response) {
//             var skill = response.data.data.skill;
//             var courses = response.data.data.courses;
//             document.getElementById("skillName").value = skill.skillName;
//             document.getElementById("skillDesc").value = skill.skillDesc;
//                 select = document.getElementById("inputGroupSelect04")
//                 for (var i = 0, l = select.options.length, o; i < l; i++ ){
//                     o = select.options[i];
//                     for (var j = 0, m = courses.length, p; j < m; j++ ){
//                         p = courses[j];
//                         if (o.value == p){
//                             o.selected = true;
//                 }
// }

function updateSkill(){
    var skillName = document.getElementById("skillName").value;
    var skillDesc = document.getElementById("skillDesc").value;
    var courses = document.getElementById("inputGroupSelect04");
    var selectedCourses = [];
    if (skillName == "" || skillDesc == ""){
        alert("Please enter all the details")
        return 
    }
    for (var i = 0; i < courses.options.length; i++) {
        if (courses.options[i].selected) {
            selectedCourses.push(courses.options[i].value);
        }
    }
    // Put request
    isDeleted = 0
    axios.post(`http://127.0.0.1:5006/skill/update/${skillId}`,
        {   skill: {
                    skillName: skillName, 
                    skillDesc: skillDesc,
                    isDeleted: isDeleted
                }, 
        courses: selectedCourses
    })
        .then(function (response) {
            console.log(response);
        }
    )
}