let totalCages = JSON.parse(localStorage.getItem('totalCages')) || 6;
let addedCageCount = JSON.parse(localStorage.getItem('addedCageCount')) || 0;
let nextCageId = JSON.parse(localStorage.getItem('nextCageId')) || 7;
let cages = JSON.parse(localStorage.getItem('cages')) || {}; // Track cages with their unique IDs

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
    const newCageId = nextCageId;
    totalCages++;
    addedCageCount++;
    nextCageId++;
    
    // Add to the cages object for tracking
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
        localStorage.removeItem(`rabbitData${cageNumber}`);

        const buttonToDelete = document.querySelector(`button[data-id="${cageNumber}"]`);
        if (buttonToDelete) {
            buttonToDelete.remove();
        }

        // Remove the cage from tracking and localStorage
        if (cages[cageNumber]) {
            delete cages[cageNumber];
            if (parseInt(cageNumber) > 6) {
                totalCages--;
                addedCageCount--;
            }
        }

        localStorage.setItem('totalCages', JSON.stringify(totalCages));
        localStorage.setItem('addedCageCount', JSON.stringify(addedCageCount));
        localStorage.setItem('cages', JSON.stringify(cages));

        alert(`CAGE ${cageNumber} deleted.`);
        goHome();
    }
}

function updateCageList() {
    const cageButtons = document.getElementById('cageButtons');
    cageButtons.innerHTML = '';

    for (let i in cages) {
        const cageButton = document.createElement('button');
        cageButton.textContent = `CAGE ${i}`;
        cageButton.setAttribute('data-id', i);
        cageButton.onclick = function() { showCageDetails(i); };
        cageButtons.appendChild(cageButton);
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
