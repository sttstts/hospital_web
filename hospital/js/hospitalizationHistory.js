document.addEventListener("DOMContentLoaded", function() {
    const hospitalizationList = document.getElementById("hospitalizationList");

    const hospitalizationData = JSON.parse(localStorage.getItem("hospitalizationFormData")) || [];

    const patients = JSON.parse(localStorage.getItem("patients")) || [];

    hospitalizationList.innerHTML = '';

    hospitalizationData.forEach(function(hospitalization) {
        const patient = patients.find(patient => patient.id === hospitalization.patientSelect);

        const listItem = document.createElement("li");

        let patientName = patient ? `${patient.surname} ${patient.name}` : 'Unknown Patient';
        const text = `Пациент: ${patientName}, Дата госпитализации: ${hospitalization.hospitalizationDate}, Код госпитализации: ${hospitalization.hospitalizationCode}`;

        listItem.textContent = text;

        hospitalizationList.appendChild(listItem);
    });
});
