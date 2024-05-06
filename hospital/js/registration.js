// Функция для сохранения данных пользователя в localStorage
function saveUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Функция для обработки отправки формы регистрации
function handleRegistration(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения полей формы
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Проверяем, совпадают ли пароль и его подтверждение
    if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }

    // Формируем объект с данными пользователя
    var userData = {
        fullName: fullName,
        email: email,
        password: password
    };

    // Сохраняем данные пользователя в localStorage
    saveUserData(userData);

    // Очищаем форму после регистрации
    document.getElementById("registrationForm").reset();

    // Переходим на главную страницу
    window.location.href = "main.html";
}

// Слушаем событие отправки формы
document.getElementById("registrationForm").addEventListener("submit", handleRegistration);

// Функция для проверки введенных данных при входе
function handleLogin(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем введенные пользователем данные
    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("loginPassword").value;

    // Получаем данные пользователя из localStorage
    var userData = JSON.parse(localStorage.getItem('userData'));

    // Проверяем, совпадают ли введенные данные с данными пользователя
    if (userData && loginEmail === userData.email && loginPassword === userData.password) {
        // Переходим на главную страницу
        window.location.href = "main.html";
    } else {
        alert("Неверный адрес электронной почты или пароль!");
    }
}

// Слушаем событие отправки формы входа
document.getElementById("loginForm").addEventListener("submit", handleLogin);
