function getAllJobs() {
    var table = document.getElementById("jobsTable");
    axios.get("http://127.0.0.1:5006/job")
        .then(function (response) {
            var jobs = response.data.data.jobs;
            var counter = 0
            for(let job in jobs){
                table.innerHTML += `
                <div name = "jobs" id = "${jobs[job].jobId}" class='row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center' data-bs-toggle='collapse' data-bs-target='#collapseExample${counter}' aria-expanded='false' aria-controls='collapseExample${counter}' onclick = "getJobSkill(${jobs[job].jobId})">
                <div class='col-2'>
                  <b>${jobs[job].jobId}</b>
                </div>
                <div class='col'>
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
                </div>`
                counter++
            }
        })
}

// implment get job skills
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


// function getJob() {
//   var input, filter, table, tr, td, i, txtValue;
//   input = document.getElementById("jobInput");
//   filter = input.value.toUpperCase();
//   table = document.getElementsByName("jobs");
//   console.log(table);
  // tr = table.getElementsByTagName("tr");
  // for (i = 0; i < tr.length; i++) {
  //   td = tr[i].getElementsByTagName("td")[1];
  //   if (td) {
  //     txtValue = td.textContent || td.innerText;
  //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //       tr[i].style.display = "";
  //     } else {
  //       tr[i].style.display = "none";
  //     }
  //   }       
  // }
// }


// function getJob() {
//     var jobName = document.getElementsByName("jobs")[0].value;
//     axios.get("http://127.0.0.1:5006/job/" + jobName)
//         .then(function (response) {
//             console.log(response);
//             isDeleted = response.data.data.isDeleted;
//             if (isDeleted == false) {
//                 var counter = 0
//                 jobId = response.data.data.jobId;
//                 jobName = response.data.data.jobName;
//                 var table = document.getElementById("jobsTable");
//                 table.innerHTML = "";
//                 table.innerHTML += `
//                 <div id = ${jobId} class='row rounded border border-1 bg-white py-2 mb-2 d-flex align-items-center' data-bs-toggle='collapse' data-bs-target='#collapseExample${counter}' aria-expanded='false' aria-controls='collapseExample${counter}' onclick = "getJobSkill(${jobId})">
//                 <div class='col-2'>
//                   <b>${jobId}</b>
//                 </div>
//                 <div class='col'>
//                   <b>${jobName}</b>
//                 </div>
//                 <div class='col-3'>
//                   <button type='button' class='btn btn-sm px-3 text-white' style='background-color: #106eea'>Add</button>
//                 </div>
//                 <div class="collapse pt-2" id="collapseExample${counter}">
//                     <div class="card card-body text-start">
//                     <p ><b>Skills</b></p>
//                     <span id = "jobSkill${jobId}"></span>
//                     </div>
//                 </div>`
//             }
//     })
//         .catch(function (error) {
//             console.log(error);
//         }
//     );
// }