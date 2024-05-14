function loadPatientsFromLocalStorage() {
    var storedPatients = JSON.parse(localStorage.getItem("patients"));
    return storedPatients ? storedPatients : [];
}
function loadPatientInfo(patientId) {
    var patientsData = loadPatientsFromLocalStorage();
    console.log("All patients:", patientsData); 
    var patient = patientsData.find(function(item) {
        return item.id === patientId; 
    });
    console.log("Loaded patient:", patient); 
    if (patient) {
        document.getElementById("patientName").textContent = patient.name;
        document.getElementById("patientAge").textContent = patient.birthdate; 
        document.getElementById("patientGender").textContent = patient.gender;
        document.getElementById("patientAddress").textContent = patient.address;
        document.getElementById("patientPhoneNumber").textContent = patient.phoneNumber;
        document.getElementById("patientEmail").textContent = patient.email;
        document.getElementById("patientMedicalCardNumber").textContent = patient.medicalCardNumber;
        document.getElementById("patientMedicalCardIssueDate").textContent = patient.medicalCardIssueDate;
        document.getElementById("patientLastVisitDate").textContent = patient.lastVisitDate;
        document.getElementById("patientNextVisitDate").textContent = patient.nextVisitDate;
        document.getElementById("patientInsurancePolicyNumber").textContent = patient.insurancePolicyNumber;
        document.getElementById("patientInsurancePolicyExpirationDate").textContent = patient.insurancePolicyExpirationDate;
        document.getElementById("patientDiagnosis").textContent = patient.diagnosis;
        document.getElementById("patientMedicalHistory").textContent = patient.medicalHistory;
    } else {
        console.log("Patient not found!"); 
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var patientId = getParameterByName("id");
if (patientId) {
    loadPatientInfo(patientId);
}
function generateQRCode(patientData) {
    var qrCodeContainer = document.getElementById('qrcode');

    var qrCode = new QRCode(qrCodeContainer, {
        text: JSON.stringify(patientData), 
        width: 300,
        height: 300,
    });
}

window.onload = function() {
    var patientData = {
        name: document.getElementById("patientName").textContent,
    };

    generateQRCode(JSON.stringify(patientData));
};




