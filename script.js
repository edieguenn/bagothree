let totalCages = JSON.parse(localStorage.getItem('totalCages')) || 6;
let addedCageCount = JSON.parse(localStorage.getItem('addedCageCount')) || 0;

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
    totalCages++;
    addedCageCount++;
    
    const newCageId = totalCages;

    const cageButton = document.createElement('button');
    cageButton.textContent = `CAGE ${newCageId}`;
    cageButton.setAttribute('data-id', newCageId);
    cageButton.onclick = function() { showCageDetails(newCageId); };

    document.getElementById('cageButtons').appendChild(cageButton);

    // Persist cage count and added cage count
    localStorage.setItem('totalCages', JSON.stringify(totalCages));
    localStorage.setItem('addedCageCount', JSON.stringify(addedCageCount));
}

function deleteCage
