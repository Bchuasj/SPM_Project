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
    if (skillName == "" || skillDesc == ""){
        alert("Please enter all the details")
        return 
    }
    for (var i = 0; i < courses.options.length; i++) {
        if (courses.options[i].selected) {
            selectedCourses.push(courses.options[i].value);
        }
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