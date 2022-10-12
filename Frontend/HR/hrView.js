function getAllJobs() {
    var table = document.getElementById("jobsTable");
    axios.get("http://127.0.0.1:5006/job")
        .then(function (response) {
            var jobs = response.data.data.jobs;
            var counter = 0
            for(let job in jobs){
                table.innerHTML += `
                <div name = "jobs" id = "${jobs[job].jobId}">
                  <div class='row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center' data-bs-toggle='collapse' data-bs-target='#collapseExample${counter}' aria-expanded='false' aria-controls='collapseExample${counter}' onclick = "getJobSkill(${jobs[job].jobId})">
                    <div class='col-2' name = 'jobId'>
                      <b>${jobs[job].jobId}</b>
                    </div>
                    <div class='col' name = 'jobName'>
                      <b>${jobs[job].jobName}</b>
                    </div>
                    <div class='col-3'>
                      <button type='button' class='btn btn-sm px-3 text-white' style='background-color: #106eea'>Add</button>
                    </div>
                    <div class="collapse pt-2" id="collapseExample${counter}">
                        <div class="card card-body text-start">
                        <p ><b>Skills</b></p>
                        <span id = "jobSkill${jobs[job].jobId}"></span>
                        </div>
                    </div>
                  </div>
                </div>`
                counter++
            }
        })
}

// implement get job skills
function getJobSkill(jobId){
  jobSkill = document.getElementById("jobSkill"+jobId);
  axios.get("http://127.0.0.1:5006/job/"+jobId+"/skills")
  .then(function (response) {
    jobSkill.innerHTML = ""
    var skills = response.data.data.skills;
    if (skills){
      for(let skill in skills){
        jobSkill.innerHTML += `<span class="badge bg-primary" style = "margin-right:5px">${skills[skill].skillName}</span>`
    }}
  })
  .catch(function (error) {
    console.log(error)
    jobSkill.innerHTML = `<span class="badge bg-danger">No skills</span>`
  })
}


function getJob() {
  // print what key is pressed
  var input, filter, jobsList,  jobName, i, txtValue, numValue;
  input = document.getElementById("jobInput");
  jobsList = document.getElementsByName("jobs");
  // check if input is string
  if (isNaN(input.value)){
    filter = input.value.toUpperCase();
    jobNameList = document.getElementsByName("jobName");
    for (i = 0; i < jobNameList.length; i++) {
      jobName = jobNameList[i];
      txtValue = jobName.textContent || jobName.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        jobsList[i].style.display = "";
      } else {
        jobsList[i].style.display = "none";
      }
    }
  }
  else if (!isNaN(input.value) && input.value != ""){
    jobIdList = document.getElementsByName("jobId");
    for (i = 0; i < jobIdList.length; i++) {
      jobId = jobIdList[i];
      numValue = jobId.textContent || jobId.innerText;
      if (numValue.indexOf(input.value) > -1) {
        jobsList[i].style.display = "";
      } 
      else {
        jobsList[i].style.display = "none";
      }
    }
  }
}

