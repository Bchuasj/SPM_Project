function login(){
    var staffId = document.getElementById("loginID").value
    // alert("Logged in!", staffId)

    axios.get("http://127.0.0.1:5006/staff")
    .then(function (response) {
        var staff = response.data.data.staff;
        var loginStatus = false
        console.log(staff)
        for(i in staff){
            console.log("staffId",staff[i].staffId)
            console.log("role",staff[i].role)

            if(staffId == staff[i].staffId){
                localStorage.setItem("staffId", staffId)
                localStorage.setItem("role",staff[i].role)
                console.log("match found!")
                loginStatus = true
            } 

        }

        if(loginStatus){
            window.location.href = '../Staff/staffViewLearningJourneys.html'
        } else {
            console.log("staff id not found in database")
            var statusMsg = document.getElementById("displayMsg")
            statusMsg.className = "text-danger"
        }

        }).catch(function (error) {
            console.log(error);
        }
    );




}

function logout(){
    localStorage.clear()
    window.location.href = '../Login/login.html'
}