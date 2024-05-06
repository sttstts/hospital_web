// Загрузка данных о пациентах из локального хранилища
var patients = JSON.parse(localStorage.getItem('patients'));

// Вызываем функцию populatePatientSelect() при загрузке страницы
window.onload = function() {
    populatePatientSelect(patients);
};

// Функция для заполнения списка пациентов в элементе <select>
function populatePatientSelect(patients) {
    console.log('Функция populatePatientSelect() вызвана.');
    console.log(patients); // добавляем эту строку для проверки данных о пациентах
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
// Функция для сохранения данных о процедуре в локальном хранилище
function saveProcedureData(procedureData) {
    // Получаем текущий список процедур из localStorage или создаем новый список, если его нет
    var procedures = JSON.parse(localStorage.getItem('procedures')) || [];

    // Добавляем новую процедуру в список
    procedures.push(procedureData);

    // Сохраняем обновленный список процедур в localStorage
    localStorage.setItem('procedures', JSON.stringify(procedures));
}

// Функция для обработки отправки формы добавления процедуры
function handleAddProcedure(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения полей формы
    var patientName = document.getElementById("patientSelect").value;
    var procedureDate = document.getElementById("procedureDate").value;
    var doctorName = document.getElementById("doctorName").value;
    var procedureType = document.getElementById("procedureType").value;
    var procedureName = document.getElementById("procedureName").value;
    var procedureResults = document.getElementById("procedureResults").value;
    var procedureRecommendations = document.getElementById("procedureRecommendations").value;

    // Формируем объект с данными о процедуре
    var procedureData = {
        patientName: patientName,
        procedureDate: procedureDate,
        doctorName: doctorName,
        procedureType: procedureType,
        procedureName: procedureName,
        procedureResults: procedureResults,
        procedureRecommendations: procedureRecommendations
    };

    // Сохраняем данные о процедуре в localStorage
    saveProcedureData(procedureData);

    // Очищаем форму после добавления процедуры
    document.getElementById("addProcedureForm").reset();

    window.location.href = "main.html";
}

// Слушаем событие отправки формы добавления процедуры
document.getElementById("addProcedureForm").addEventListener("submit", handleAddProcedure);
