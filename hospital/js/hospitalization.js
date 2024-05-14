document.addEventListener("DOMContentLoaded", function() {
    const patientSelect = document.getElementById("patientSelect");
    const passportNumberInput = document.getElementById("passportNumber");
    const hospitalizationForm = document.getElementById("hospitalizationForm");

    const patients = JSON.parse(localStorage.getItem("patients")) || [];

    const defaultOption = document.createElement("option");
    defaultOption.text = "Выберите пациента";
    defaultOption.value = "";
    patientSelect.add(defaultOption);
    patientSelect.selectedIndex = 0; 

    patients.forEach(function(patient) {
        const option = document.createElement("option");
        option.text = `${patient.surname} ${patient.name} ${patient.patronymic}`;
        option.value = patient.id; 
        patientSelect.add(option);
    });

    patientSelect.addEventListener("change", function() {
        const selectedPatientId = patientSelect.value;
        const selectedPatient = patients.find(patient => patient.id === selectedPatientId);
        passportNumberInput.value = selectedPatient ? selectedPatient.passportnumber || '' : '';
    });

    hospitalizationForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(hospitalizationForm);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        let hospitalizationData = JSON.parse(localStorage.getItem("hospitalizationFormData"));

        if (!Array.isArray(hospitalizationData)) {
            hospitalizationData = [];
        }

        hospitalizationData.push(formDataObject);

        localStorage.setItem("hospitalizationFormData", JSON.stringify(hospitalizationData));

        hospitalizationForm.reset();
    });
});

const viewHospitalizationsButton = document.getElementById("viewHospitalizationsButton");

viewHospitalizationsButton.addEventListener("click", function() {
    window.location.href = "hospitalizationHistory.html";
});
