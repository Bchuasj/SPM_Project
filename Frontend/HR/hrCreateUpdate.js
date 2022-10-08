function getAllCourses() {
    var coursesList = document.getElementById("inputGroupSelect04") 
    axios.get("http://127.0.0.1:5006/courses")
        .then(function (response) {
            var courses = response.data.data.courses;
            for(let course in courses){
                coursesList.innerHTML += `<option value="${courses[course].courseId}">${courses[course].courseName}</option>`
                }
            }
        
    )
}

function createSkill() {
    var skillName = document.getElementById("skillName").value;
    var skillDesc = document.getElementById("skillDesc").value;
    var courses = document.getElementById("inputGroupSelect04");
    var selectedCourses = [];
    
    for (var i = 0; i < courses.options.length; i++) {
        if (courses.options[i].selected) {
            selectedCourses.push(courses.options[i].value);
        }
    }
    console.log(skillName)
    console.log(skillDesc)
    console.log(courses)
    console.log(selectedCourses)
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

function getSkill(){
    
}