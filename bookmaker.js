document.getElementById('apply-account-settings').addEventListener('change', function() {
    let addAccountBtn = document.getElementById('add-account-btn');
    let accountsContainer = document.getElementById('accounts-container');
    
    if (this.checked) {
        addAccountBtn.style.display = 'inline-block';
        accountsContainer.style.display = 'block';
    } else {
        addAccountBtn.style.display = 'none';
        accountsContainer.style.display = 'none';
        accountsContainer.innerHTML = ''; // Remove todas as contas ao desmarcar
    }
});

document.getElementById('add-account-btn').style.display = 'none';
document.getElementById('accounts-container').style.display = 'none';

document.getElementById('add-account-btn').addEventListener('click', function() {
    let container = document.getElementById('accounts-container');
    let newAccount = document.createElement('div');
    newAccount.classList.add('account-entry');
    newAccount.innerHTML = `
        <label>Owner:</label>
        <select class="owner-select">
            <option>Select an owner</option>
        </select>
        <label>Account Status:</label>
        <select class="account-status">
            <option>Active</option>
            <option>Inactive</option>
        </select>
        <label>Username/Email:</label>
        <input type="text" class="account-email" placeholder="Enter username or email">
        <label>Password:</label>
        <input type="password" class="account-password" placeholder="Enter password">
        <button type="button" class="remove-account-btn">Remove</button>
    `;
    container.appendChild(newAccount);
});

document.getElementById('accounts-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-account-btn')) {
        event.target.parentElement.remove();
    }
});
