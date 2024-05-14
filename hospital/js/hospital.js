document.addEventListener("DOMContentLoaded", function() {
    const wardSelect = document.getElementById("wardSelect");
    const bedSelect = document.getElementById("bedSelect");
    const bedAssignmentForm = document.getElementById("bedAssignmentForm");
    const patientSelect = document.getElementById("patientSelect");
    const assignedBedsList = document.getElementById("assignedBedsList");

    const patients = JSON.parse(localStorage.getItem("patients")) || [];

    const assignedBedsData = JSON.parse(localStorage.getItem("assignedBeds")) || [];

    function loadAssignedBeds() {
        assignedBedsList.innerHTML = "";

        assignedBedsData.forEach(bedInfo => {
            const listItem = document.createElement('li');
            listItem.textContent = bedInfo;
            assignedBedsList.appendChild(listItem);
        });
    }

    loadAssignedBeds();

    wardSelect.addEventListener("change", function() {
        const selectedOption = wardSelect.options[wardSelect.selectedIndex];
        const selectedWard = selectedOption.textContent;
        let maxBeds;

        bedSelect.innerHTML = '';

        switch (selectedWard) {
            case "Палата 101":
            case "Палата 102":
                maxBeds = 5;
                break;
            case "Палата 103":
            case "Палата 115":
                maxBeds = 6;
                break;
            case "Палата 104":
            case "Палата 105":
            case "Палата 106":
            case "Палата 107":
            case "Палата 111":
            case "Палата 112":
            case "Палата 113":
            case "Палата 114":
                maxBeds = 4;
                break;
            case "Палата 108":
            case "Палата 109":
            case "Палата 110":
                maxBeds = 3;
                break;
            case "Палата 116":
            case "Палата 117":
            case "Палата 118":
                maxBeds = 2;
                break;
            default:
                bedSelect.disabled = true;
                return;
        }

        addBedsOptions(generateBedLetters(maxBeds), bedSelect, maxBeds);
    });

    function addBedsOptions(beds, select, maxBeds) {
        beds.forEach(bed => {
            const option = document.createElement('option');
            option.value = bed;
            option.textContent = `Койка ${bed.toUpperCase()}`;
            select.appendChild(option);
        });

        while (select.options.length > maxBeds) {
            select.remove(select.options.length - 1);
        }

        bedSelect.disabled = false;
    }

    function generateBedLetters(num) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const bedLetters = [];
        for (let i = 0; i < num; i++) {
            bedLetters.push(letters[i]);
        }
        return bedLetters;
    }

    function updatePatientList() {
        patientSelect.innerHTML = "";

        patients.forEach(function(patient) {
            const option = document.createElement("option");

            const patientName = `${patient.surname} ${patient.name}`;

            option.value = patient.id;
            option.textContent = patientName;

            patientSelect.appendChild(option);
        });
    }

    bedAssignmentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const patientId = patientSelect.value;
        const patient = patients.find(patient => patient.id === patientId);
        const selectedOption = wardSelect.options[wardSelect.selectedIndex];
        const selectedWard = selectedOption.textContent;
        const selectedBed = bedSelect.value;
        const patientName = `${patient.surname} ${patient.name}`;
    
        const listItem = document.createElement('li');
        listItem.textContent = `${patientName}, ${selectedWard}, Койка ${selectedBed}`;

        assignedBedsList.appendChild(listItem);

        const bedInfo = `${patientName}, ${selectedWard}, Койка ${selectedBed}`;
        assignedBedsData.push(bedInfo);
        localStorage.setItem("assignedBeds", JSON.stringify(assignedBedsData));

        updatePatientList();
    });

    updatePatientList();
});
