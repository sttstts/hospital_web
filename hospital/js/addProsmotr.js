function loadProceduresFromLocalStorage() {
    var storedProcedures = JSON.parse(localStorage.getItem("procedures"));
    return storedProcedures ? storedProcedures : [];
}

function displayProcedures() {
    var procedures = loadProceduresFromLocalStorage();
    var container = document.querySelector('.container');

    if (procedures.length === 0) {
        container.innerHTML = "<p>Список процедур пуст</p>";
        return;
    }

    var list = document.createElement('ul');
    procedures.forEach(function(procedure) {
        var listItem = document.createElement('li');
        listItem.textContent = `Дата: ${procedure.procedureDate}, Врач: ${procedure.doctorName}, Тип: ${procedure.procedureType}, Название: ${procedure.procedureName}`;
        list.appendChild(listItem);
    });

    container.appendChild(list);
}

window.onload = function() {
    displayProcedures();
};
