var patients = JSON.parse(localStorage.getItem('patients'));

window.onload = function() {
    populatePatientSelect(patients);
};

function populatePatientSelect(patients) {
    console.log('Функция populatePatientSelect() вызвана.');
    console.log(patients); 
    var patientSelect = document.getElementById('patientSelect');
    patientSelect.innerHTML = '';

    var defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Выберите пациента';
    patientSelect.appendChild(defaultOption);

    if (patients && patients.length > 0) {
        patients.forEach(function(patient) {
            var option = document.createElement('option');
            option.value = patient.medicalCardNumber;
            option.textContent = patient.surname + ' ' + patient.name + ' ' + patient.patronymic;
            patientSelect.appendChild(option);
        });
    } else {
        console.error('Данные о пациентах не найдены или отсутствуют.');
    }
}
function saveProcedureData(procedureData) {
    var procedures = JSON.parse(localStorage.getItem('procedures')) || [];

    procedures.push(procedureData);

    localStorage.setItem('procedures', JSON.stringify(procedures));
}

function handleAddProcedure(event) {
    event.preventDefault(); 

    var patientName = document.getElementById("patientSelect").value;
    var procedureDate = document.getElementById("procedureDate").value;
    var doctorName = document.getElementById("doctorName").value;
    var procedureType = document.getElementById("procedureType").value;
    var procedureName = document.getElementById("procedureName").value;
    var procedureResults = document.getElementById("procedureResults").value;
    var procedureRecommendations = document.getElementById("procedureRecommendations").value;

    var procedureData = {
        patientName: patientName,
        procedureDate: procedureDate,
        doctorName: doctorName,
        procedureType: procedureType,
        procedureName: procedureName,
        procedureResults: procedureResults,
        procedureRecommendations: procedureRecommendations
    };

    saveProcedureData(procedureData);

    document.getElementById("addProcedureForm").reset();

    window.location.href = "main.html";
}

document.getElementById("addProcedureForm").addEventListener("submit", handleAddProcedure);
