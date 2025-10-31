function getUsers() {
  fetch('/client/users')
    .then(res => res.json())
    .then(data => {
      const usersDiv = document.getElementById('users');
      usersDiv.innerHTML = '';
      data.forEach(user => {
        usersDiv.innerHTML += `
          <p>ID: ${user.id}, Name: ${user.name}, Email: ${user.email}</p>
          <button onclick="deleteUser(${user.id})">Delete</button>
        `;
      });
    });
}

function addUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  fetch('/client/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  })
    .then(() => {
      alert('User added!');
      getUsers();
    });
}

function deleteUser(id) {
  fetch(`/client/users/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      alert('User deleted!');
      getUsers();
    });
}
