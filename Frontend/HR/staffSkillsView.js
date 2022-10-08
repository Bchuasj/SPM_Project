function getAllSkills() {
    var skillsTable = document.getElementById("skillsTable")
    axios.get("http://127.0.0.1:5006/skill")
        .then(function (response) {
            var skills = response.data.data.skills;
            for(let skill in skills){
                skillsTable.innerHTML += `
                <div class="row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center">
                    <div class="col-sm-3 col-3">
                        <b>${skills[skill].skillId}</b>
                    </div>
                    <div class="col-sm-6 col-6">
                        <b>${skills[skill].skillName}</b>
                    </div>
                    <div class="col-sm col">
                        <button type="button" class="btn btn-sm px-3 text-white" style="background-color: #106eea" data-bs-toggle="collapse" data-bs-target="#collapseExample${skills[skill].skillId}" aria-expanded="false" aria-controls="collapseExample${skills[skill].skillId}">View details</button>
                    </div>
                    <div class="collapse pt-2" id="collapseExample${skills[skill].skillId}">
                        <div class="card card-body text-start">
                            <p><b>Description</b></p>
                            ${skills[skill].skillDesc}
                        </div>
                    </div>
                </div>
                `
                }
            }
        
    )
}

