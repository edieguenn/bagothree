function updateCageList() {
    const cageButtons = document.getElementById('cageButtons');
    cageButtons.innerHTML = '';
    for (let i = 1; i <= totalCages; i++) {
        const cageButton = document.createElement('button');
        cageButton.textContent = `CAGE ${i}`;
        cageButton.setAttribute('data-id', i);  // Add data-id to the default cages
        cageButton.onclick = function() { showCageDetails(i); };
        cageButtons.appendChild(cageButton);
    }
}
function deleteCage() {
    const cageNumber = document.getElementById('rabbitForm').dataset.cageNumber;
    if (confirm(`Are you sure you want to delete CAGE ${cageNumber}?`)) {
        localStorage.removeItem(`rabbitData${cageNumber}`);
        const buttonToDelete = document.querySelector(`button[data-id="${cageNumber}"]`);
        if (buttonToDelete) {
            buttonToDelete.remove();
        }
        alert(`CAGE ${cageNumber} deleted.`);
        goHome();
    }
}
