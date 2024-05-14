function savePatientData(patientData) {
    var patients = JSON.parse(localStorage.getItem('patients')) || [];

    patients.push(patientData);

    localStorage.setItem('patients', JSON.stringify(patients));
}

function generatePatientId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function handleAddPatient(event) {
    event.preventDefault(); 

    var patientName = document.getElementById("firstName").value;
    var patientSurname = document.getElementById("lastName").value;
    var patientPatronymic = document.getElementById("patronymic").value;
    var passportNumber = document.getElementById("passportNumber").value;
    var passportSeries = document.getElementById("passportSeries").value;
    var birthdate = document.getElementById("birthdate").value;
    var gender = document.getElementById("gender").value;
    var address = document.getElementById("address").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;
    var medicalCardNumber = document.getElementById("medicalCardNumber").value;
    var medicalCardIssueDate = document.getElementById("medicalCardIssueDate").value;
    var lastVisitDate = document.getElementById("lastVisitDate").value;
    var nextVisitDate = document.getElementById("nextVisitDate").value;
    var insurancePolicyNumber = document.getElementById("insurancePolicyNumber").value;
    var insurancePolicyExpirationDate = document.getElementById("insurancePolicyExpirationDate").value;
    var diagnosis = document.getElementById("diagnosis").value;
    var medicalHistory = document.getElementById("medicalHistory").value;

    var patientData = {
        id: generatePatientId(), 
        name: patientName,
        surname: patientSurname,
        patronymic: patientPatronymic,
        passportNumber: passportNumber,
        passportSeries: passportSeries,
        birthdate: birthdate,
        gender: gender,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        medicalCardNumber: medicalCardNumber,
        medicalCardIssueDate: medicalCardIssueDate,
        lastVisitDate: lastVisitDate,
        nextVisitDate: nextVisitDate,
        insurancePolicyNumber: insurancePolicyNumber,
        insurancePolicyExpirationDate: insurancePolicyExpirationDate,
        diagnosis: diagnosis,
        medicalHistory: medicalHistory
    };

    savePatientData(patientData);

    document.getElementById("addPatientForm").reset();

    window.location.href = "main.html";
}

document.getElementById("addPatientForm").addEventListener("submit", handleAddPatient);
