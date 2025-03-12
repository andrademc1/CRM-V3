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
