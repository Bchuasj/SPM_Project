function getAllRoles() {
    var table = document.getElementById("rolesTable");
    axios.get("http://127.0.0.1:5006/role")
        .then(function (response) {
            var roles = response.data.data.roles;
            var counter = 0
            for(let role in roles){
                table.innerHTML += `
                <div class='row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center' data-bs-toggle='collapse' data-bs-target='#collapseExample${counter}' aria-expanded='false' aria-controls='collapseExample${counter}'>
                <div class='col-2'>
                  <b>${roles[role].roleId}</b>
                </div>
                <div class='col'>
                  <b>${roles[role].roleName}</b>
                </div>
                <div class='col-3'>
                  <button type='button' class='btn btn-sm px-3 text-white' style='background-color: #106eea'>Add</button>
                </div>
                <div class="collapse pt-2" id="collapseExample${counter}">
                    <div class="card card-body text-start">
                    <p><b>Description</b></p>
                    Learn how to pacify businessmen.
                    </div>
                </div>`
                counter++
            }
        })
}

function getRoleName() {
    var roleName = document.getElementsByName("roles")[0].value;
    axios.get("http://127.0.0.1:5006/role/" + roleName)
        .then(function (response) {
            console.log(response);
            isDeleted = response.data.data.isDeleted;
            if (isDeleted == false) {
                var counter = 0
                roleId = response.data.data.roleId;
                roleName = response.data.data.roleName;
                var table = document.getElementById("rolesTable");
                table.innerHTML = "";
                table.innerHTML += `
                <div class='row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center' data-bs-toggle='collapse' data-bs-target='#collapseExample${counter}' aria-expanded='false' aria-controls='collapseExample${counter}'>
                <div class='col-2'>
                  <b>${roleId}</b>
                </div>
                <div class='col'>
                  <b>${roleName}</b>
                </div>
                <div class='col-3'>
                  <button type='button' class='btn btn-sm px-3 text-white' style='background-color: #106eea'>Add</button>
                </div>
                <div class="collapse pt-2" id="collapseExample${counter}">
                    <div class="card card-body text-start">
                    <p><b>Description</b></p>
                    Learn how to pacify businessmen.
                    </div>
                </div>`
            }
    })
        .catch(function (error) {
            console.log(error);
        }
    );
}