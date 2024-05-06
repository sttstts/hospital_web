// Определение пустого массива новых пациентов
var newPatients = [];

// Функция для загрузки списка пациентов из локального хранилища браузера
function loadPatientsFromLocalStorage() {
    var storedPatients = JSON.parse(localStorage.getItem("patients"));
    return storedPatients ? storedPatients : [];
}

// Функция для сохранения списка пациентов в локальное хранилище браузера
function savePatientsToLocalStorage(patients) {
    localStorage.setItem("patients", JSON.stringify(patients));
}

// Функция для загрузки списка пациентов
function loadPatients() {
    var patientsList = document.getElementById("patientsList");

    // Очищаем список перед добавлением новых элементов
    patientsList.innerHTML = "";

    // Получаем список пациентов из локального хранилища
    var patientsData = loadPatientsFromLocalStorage();

    // Создаем элементы списка для каждого пациента
    patientsData.forEach(function(patient) {
        var li = document.createElement("li");
        li.textContent = patient.name;
        li.setAttribute("data-name", patient.name);
        li.setAttribute("data-gender", patient.gender);
        li.setAttribute("data-id", patient.id); // Добавляем атрибут с идентификатором пациента
        patientsList.appendChild(li);
    });

    // Добавляем обработчик события клика к каждому элементу списка
    addClickEventToPatients();
}

// Функция для применения выбранного фильтра
function applyFilter() {
    var filter = document.getElementById("filterSelect").value;
    if (filter === "all") {
        // Показать всех пациентов
        showAllPatients();
    } else {
        // Фильтровать и/или сортировать пациентов
        if (filter === "asc" || filter === "desc") {
            sortPatients(filter);
        } else {
            filterPatients(filter);
        }
    }
}

// Функция для фильтрации списка пациентов по полу
function filterPatients(gender) {
    var patients = document.getElementById("patientsList").getElementsByTagName("li");
    
    for (var i = 0; i < patients.length; i++) {
        var patientGender = patients[i].getAttribute("data-gender");
        
        if (gender === "all") {
            patients[i].style.display = "block"; // Показать всех пациентов
        } else if (patientGender === gender) {
            patients[i].style.display = "block"; // Показать пациентов с выбранным полом
        } else {
            patients[i].style.display = "none"; // Скрыть остальных пациентов
        }
    }
}

// Функция для отображения всех пациентов
function showAllPatients() {
    var patients = document.getElementById("patientsList").getElementsByTagName("li");
    
    for (var i = 0; i < patients.length; i++) {
        patients[i].style.display = "block"; // Показать всех пациентов
    }
}

// Функция для сортировки списка пациентов по алфавиту
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
        list.appendChild(sortedItems[i]); // Перераспределить элементы в соответствии с порядком сортировки
    }
}

// Функция для поиска пациентов по имени
function searchPatients() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    var patients = document.getElementById("patientsList").getElementsByTagName("li");
    
    for (var i = 0; i < patients.length; i++) {
        var name = patients[i].getAttribute("data-name").toLowerCase();
        
        if (name.indexOf(input) > -1) {
            patients[i].style.display = "block"; // Показать пациентов, чьи имена содержат введенное значение
        } else {
            patients[i].style.display = "none"; // Скрыть остальных пациентов
        }
    }
}

// Функция для перенаправления на страницу с информацией о пациенте
function redirectToPatientInfo(patientId) {
    // Перенаправляем пользователя на страницу с информацией о пациенте с передачей параметра в URL
    window.location.href = "viewPatient.html?id=" + patientId;
}

// Функция для добавления обработчика события клика к каждому элементу списка
function addClickEventToPatients() {
    var patients = document.getElementById("patientsList").getElementsByTagName("li");
    
    for (var i = 0; i < patients.length; i++) {
        patients[i].addEventListener("click", function() {
            var patientId = this.getAttribute("data-id");
            redirectToPatientInfo(patientId);
        });
    }
}

// Получение текущего списка пациентов из локального хранилища
var currentPatients = loadPatientsFromLocalStorage();

// Объединение новых пациентов с текущим списком пациентов
var updatedPatients = currentPatients.concat(newPatients);

// Сохранение обновленного списка пациентов в локальное хранилище
savePatientsToLocalStorage(updatedPatients);

// Перезагрузка списка пациентов для отображения всех пациентов, включая новых
loadPatients();
