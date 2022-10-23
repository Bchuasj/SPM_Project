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

function createSkill() {
    var skillName = document.getElementById("skillName").value;
    var skillDesc = document.getElementById("skillDesc").value;
    var courses = document.getElementById("courses").value;
    selectedCourses = courses.split(",")
    if (skillName == "" && skillDesc == "" && courses == ""){
        alert("Please fill up the fields")
        return
    }
    else if (skillName == ""){
        alert("Please enter the skill Name")
        return 
    }
    else if (skillDesc == ""){
        alert("Please enter the skill Description")
        return
    }
    else if (courses == ""){
        alert("Please select at least one course")
        return
    }
    // Get request to check if skill name already exists
    axios.get(`http://127.0.0.1:5006/skill/name/${skillName}`)
        .then(function (response) {
            if (response.data.data.skillName){
                alert("Please enter a unique skill name")
                return
            }
        }).catch(function (){
            // Post request to create skill if skill name does not exist
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
                    document.getElementById("statusMsg").className = "text-success"
                    document.getElementById("statusMsg").innerHTML = "<b>Skill has been created successfully!</b>"
                }
            ).catch(function (error) {
                console.log(error);
                document.getElementById("statusMsg").className = "text-danger"
                document.getElementById("statusMsg").innerHTML = "<b>Unable to create skill!</b>"
            })
        })
}

function getSkill(){
    // need to pass the skillId to me 
    var skillId = location.search.substring(1);
    // console.log(queryString)
    getAllCourses();
    axios.get(`http://127.0.0.1:5006/skill/${skillId}`)
        .then(function (response) {
            var skill = response.data.data.skill;
            var courses = response.data.data.courses;
            console.log(courses)
            document.getElementById("skillName").value = skill.skillName;
            document.getElementById("skillDesc").value = skill.skillDesc;
            // based on the input values, tick the checkbox
            for (course in courses){
                console.log(course)
                document.getElementById("courses").value += courses[course].courseId+","
            }
            document.getElementById("courses").value = document.getElementById("courses").value.slice(0, -1);
            var checkboxes = document.querySelectorAll('input[type=checkbox]');
            for (var i = 0; i < checkboxes.length; i++) {
                if (courses.includes(checkboxes[i].id)) {
                    checkboxes[i].checked = true;
                }
            }
        })
}

function updateSkill(){
    var skillId = location.search.substring(1);
    var skillName = document.getElementById("skillName").value;
    var skillDesc = document.getElementById("skillDesc").value;
    var courses = document.getElementById("courses").value;
    var selectedCourses = courses.split(",")
    if (skillName == "" && skillDesc == "" && courses == ""){
        alert("Please fill up the fields")
        return
    }
    else if (skillName == ""){
        alert("Please enter the skill Name")
        return 
    }
    else if (skillDesc == ""){
        alert("Please enter the skill Description")
        return
    }
    else if (courses == ""){
        alert("Please select at least one course")
        return
    }
    // Put request
    isDeleted = 0
    axios.put(`http://127.0.0.1:5006/skill/update/${skillId}`,
        {   skill: {
                    skillName: skillName, 
                    skillDesc: skillDesc,
                    isDeleted: isDeleted
                }, 
        courses: selectedCourses
    })
        .then(function (response) {
            console.log(response);
            document.getElementById("statusMsg").className = "text-success"
            document.getElementById("statusMsg").innerHTML = "<b>Skill has been updated successfully!</b>"
        }
    ).catch(function (error) {
        console.log(error);
        document.getElementById("statusMsg").className = "text-danger"
        document.getElementById("statusMsg").innerHTML = "<b>Unable to update skill!</b>"
    })
}