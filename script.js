let totalCages = JSON.parse(localStorage.getItem('totalCages')) || 6;
let addedCageCount = JSON.parse(localStorage.getItem('addedCageCount')) || 0;
let nextCageId = JSON.parse(localStorage.getItem('nextCageId')) || 7;
let cages = JSON.parse(localStorage.getItem('cages')) || {}; // Store dynamically added cages

function goHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('cageDetails').style.display = 'none';
    document.getElementById('pregnancyOption').style.display = 'none';
    document.getElementById('pregnancyDetails').style.display = 'none';
    document.getElementById('headerTitle').innerHTML = '<strong>RABBIT CAGE</strong>';
    updateCageList();
}

function showCageDetails(cageNumber) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('cageDetails').style.display = 'block';
    loadData(cageNumber);
    document.getElementById('rabbitForm').dataset.cageNumber = cageNumber;
    document.getElementById('headerTitle').innerHTML = `<strong>CAGE ${cageNumber}</strong>`;
}

function addNewCage() {
    const newCageId = nextCageId;  // Generate a unique ID for the new cage
    totalCages++;
    addedCageCount++;
    nextCageId++;
    
    // Store the new cage in the `cages` object
    cages[newCageId] = true;

    const cageButton = document.createElement('button');
    cageButton.textContent = `CAGE ${newCageId}`;
    cageButton.setAttribute('data-id', newCageId);
    cageButton.onclick = function() { showCageDetails(newCageId); };

    document.getElementById('cageButtons').appendChild(cageButton);

    // Persist data
    localStorage.setItem('totalCages', JSON.stringify(totalCages));
    localStorage.setItem('addedCageCount', JSON.stringify(addedCageCount));
    localStorage.setItem('nextCageId', JSON.stringify(nextCageId));
    localStorage.setItem('cages', JSON.stringify(cages));
}

function deleteCage() {
    const cageNumber = document.getElementById('rabbitForm').dataset.cageNumber;
    if (confirm(`Are you sure you want to delete CAGE ${cageNumber}?`)) {
        // Remove the cage data and the button
        localStorage.removeItem(`rabbitData${cageNumber}`);

        const buttonToDelete = document.querySelector(`button[data-id="${cageNumber}"]`);
        if (buttonToDelete) {
            buttonToDelete.remove();
        }

        // Check if the cage is dynamically added and remove it from the cages object
        if (cages[cageNumber]) {
            delete cages[cageNumber];
            if (parseInt(cageNumber) > 6) {
                totalCages--;
                addedCageCount--;
            }
        }

        // Update localStorage with the removed cage
        localStorage.setItem('totalCages', JSON.stringify(totalCages));
        localStorage.setItem('addedCageCount', JSON.stringify(addedCageCount));
        localStorage.setItem('cages', JSON.stringify(cages));

        alert(`CAGE ${cageNumber} deleted.`);
        goHome();
    }
}

function updateCageList() {
    const cageButtons = document.getElementById('cageButtons');
    cageButtons.innerHTML = ''; // Clear the current list

    // First, load the static cages (1-6)
    for (let i = 1; i <= 6; i++) {
        const cageButton = document.createElement('button');
        cageButton.textContent = `CAGE ${i}`;
        cageButton.setAttribute('data-id', i);
        cageButton.onclick = function() { showCageDetails(i); };
        cageButtons.appendChild(cageButton);
    }

    // Now, load the dynamically added cages
    for (let id in cages) {
        if (cages[id]) {
            const cageButton = document.createElement('button');
            cageButton.textContent = `CAGE ${id}`;
            cageButton.setAttribute('data-id', id);
            cageButton.onclick = function() { showCageDetails(id); };
            cageButtons.appendChild(cageButton);
        }
    }
}

window.onload = function () {
    let cageNumber = new URLSearchParams(window.location.search).get('cage');
    if (cageNumber) {
        showCageDetails(cageNumber);
    } else {
        goHome();
    }
}
