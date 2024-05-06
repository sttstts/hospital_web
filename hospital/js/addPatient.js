// Функция для сохранения данных пациента в localStorage
function savePatientData(patientData) {
    // Получаем текущий список пациентов из localStorage или создаем новый список, если его нет
    var patients = JSON.parse(localStorage.getItem('patients')) || [];

    // Добавляем нового пациента в список
    patients.push(patientData);

    // Сохраняем обновленный список пациентов в localStorage
    localStorage.setItem('patients', JSON.stringify(patients));
}

// Функция для генерации уникального идентификатора
function generatePatientId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Функция для обработки отправки формы добавления пациента
function handleAddPatient(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения полей формы
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

    // Формируем объект с данными пациента
    var patientData = {
        id: generatePatientId(), // Генерируем уникальный идентификатор пациента
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

    // Сохраняем данные пациента в localStorage
    savePatientData(patientData);

    // Очищаем форму после добавления пациента
    document.getElementById("addPatientForm").reset();

    // Перенаправляем пользователя на главную страницу
    window.location.href = "main.html";
}


// Слушаем событие отправки формы добавления пациента
document.getElementById("addPatientForm").addEventListener("submit", handleAddPatient);
