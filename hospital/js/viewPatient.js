// Функция для загрузки списка пациентов из локального хранилища браузера
function loadPatientsFromLocalStorage() {
    var storedPatients = JSON.parse(localStorage.getItem("patients"));
    return storedPatients ? storedPatients : [];
}
function loadPatientInfo(patientId) {
    var patientsData = loadPatientsFromLocalStorage();
    console.log("All patients:", patientsData); // Проверяем список всех пациентов
    var patient = patientsData.find(function(item) {
        return item.id === patientId; // Сравниваем id пациента с переданным идентификатором
    });
    console.log("Loaded patient:", patient); // Проверяем загруженного пациента
    if (patient) {
        // Заполнение полей информации о пациенте на странице
        document.getElementById("patientName").textContent = patient.name;
        document.getElementById("patientAge").textContent = patient.birthdate; // изменено с calculateAge(patient.birthdate);
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
        console.log("Patient not found!"); // Если пациент не найден, выводим сообщение об ошибке
    }
}

// Функция для извлечения параметра из URL
function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Загрузка информации о пациенте по переданному идентификатору из параметров URL
var patientId = getParameterByName("id");
if (patientId) {
    loadPatientInfo(patientId);
}
// Функция для создания QR-кода с данными о пациенте
function generateQRCode(patientData) {
    var qrCodeContainer = document.getElementById('qrcode');

    // Создаем новый QRCode объект с контейнером и данными о пациенте
    var qrCode = new QRCode(qrCodeContainer, {
        text: JSON.stringify(patientData), // Преобразуем объект с данными в строку JSON
        width: 300,
        height: 300,
    });
}

window.onload = function() {
    // Извлекаем данные о пациенте со страницы
    var patientData = {
        name: document.getElementById("patientName").textContent,
    };

    // Преобразуем объект с данными в строку JSON и передаем в функцию для создания QR-кода
    generateQRCode(JSON.stringify(patientData));
};




