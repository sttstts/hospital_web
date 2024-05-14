var newPatients = [];

function loadPatientsFromLocalStorage() {
    var storedPatients = JSON.parse(localStorage.getItem("patients"));
    return storedPatients ? storedPatients : [];
}

function savePatientsToLocalStorage(patients) {
    localStorage.setItem("patients", JSON.stringify(patients));
}

function loadPatients() {
    var patientsList = document.getElementById("patientsList");

    patientsList.innerHTML = "";

    var patientsData = loadPatientsFromLocalStorage();

    patientsData.forEach(function(patient) {
        var li = document.createElement("li");
        li.textContent = patient.name;
        li.setAttribute("data-name", patient.name);
        li.setAttribute("data-gender", patient.gender);
        li.setAttribute("data-id", patient.id); 
        patientsList.appendChild(li);
    });

    addClickEventToPatients();
}

function applyFilter() {
    var filter = document.getElementById("filterSelect").value;
    if (filter === "all") {
        showAllPatients();
    } else {
        if (filter === "asc" || filter === "desc") {
            sortPatients(filter);
        } else {
            filterPatients(filter);
        }
    }
}

function filterPatients(gender) {
    var patients = document.getElementById("patientsList").getElementsByTagName("li");
    
    for (var i = 0; i < patients.length; i++) {
        var patientGender = patients[i].getAttribute("data-gender");
        
        if (gender === "all") {
            patients[i].style.display = "block"; 
        } else if (patientGender === gender) {
            patients[i].style.display = "block"; 
        } else {
            patients[i].style.display = "none"; 
        }
    }
}

function showAllPatients() {
    var patients = document.getElementById("patientsList").getElementsByTagName("li");
    
    for (var i = 0; i < patients.length; i++) {
        patients[i].style.display = "block"; 
    }
}

function sortPatients(order) {
    var list = document.getElementById("patientsList");
    var items = list.getElementsByTagName("li");
    var sortedItems = Array.from(items);

    sortedItems.sort(function(a, b) {
        var aName = a.getAttribute("data-name").toLowerCase();
        var bName = b.getAttribute("data-name").toLowerCase();
        return (order === 'asc') ? aName.localeCompare(bName) : bName.localeCompare(aName);
    });

    for (var i = 0; i < sortedItems.length; i++) {
        list.appendChild(sortedItems[i]); 
    }
}

function searchPatients() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    var patients = document.getElementById("patientsList").getElementsByTagName("li");
    
    for (var i = 0; i < patients.length; i++) {
        var name = patients[i].getAttribute("data-name").toLowerCase();
        
        if (name.indexOf(input) > -1) {
            patients[i].style.display = "block"; 
        } else {
            patients[i].style.display = "none"; 
        }
    }
}

function redirectToPatientInfo(patientId) {
    window.location.href = "viewPatient.html?id=" + patientId;
}

function addClickEventToPatients() {
    var patients = document.getElementById("patientsList").getElementsByTagName("li");
    
    for (var i = 0; i < patients.length; i++) {
        patients[i].addEventListener("click", function() {
            var patientId = this.getAttribute("data-id");
            redirectToPatientInfo(patientId);
        });
    }
}

var currentPatients = loadPatientsFromLocalStorage();

var updatedPatients = currentPatients.concat(newPatients);

savePatientsToLocalStorage(updatedPatients);

loadPatients();
