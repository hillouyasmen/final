const users = [
  { username: "Yasmeen", phone: "054898443", photo: "image/photo1.jpg" },
  { username: "Shroq", phone: "05334534", photo: "image/photo2.jpg" },
  { username: "Yara", phone: "05468767", photo: "image/photo3.jpg" },
  { username: "Maria", phone: "05307887", photo: "image/photo4.jpg" },
  { username: "Rema", phone: "05462987", photo: "image/photo5.jpg" },
  { username: "Noor", phone: "05475298", photo: "image/photo6.jpg" },
  { username: "Angila", phone: "05462987", photo: "image/photo7.jpg" },
  { username: "Lour", phone: "05462987", photo: "image/photo8.jpg" },
  { username: "Miranda", phone: "05462987", photo: "image/photo9.jpg" },
  { username: "Ales", phone: "05462987", photo: "image/photo10.jpg" }





];

const list = document.querySelector(".list");
const searchInput = document.getElementById('searchInput');
const searchActivePage = document.getElementById('searchActivePage');

function loadContacts(filteredUsers = users) {
  // מיון אנשי קשר לפי שם
  filteredUsers.sort((a, b) => a.username.localeCompare(b.username));

  list.innerHTML = ''; 
  filteredUsers.forEach((user, index) => {
    const item = document.createElement('li');
    item.className = "contact-item";
    item.innerHTML = `
      <img src="${user.photo}" alt="${user.username}'s photo" class="contact-img">
      <div class="contact-info">
        <span class="contact-name">${user.username}</span>
        <p>${user.phone}</p>
      </div>
      <div class="actions">
        <button onclick="editContact(${index})"><img src="image/edit.png" alt="Edit"></button>
        <button onclick="deleteContact(${index})"><img src="image/delete.png" alt="Delete"></button>
      </div>
    `;
    list.appendChild(item);
  });
  updatePeopleCount();
}

function openPopup() {
  document.getElementById('popupTitle').innerText = 'Add Contact';
  document.getElementById('contactIndex').value = '';
  document.getElementById('inputUserName').value = '';
  document.getElementById('inputUserPhone').value = '';
  document.getElementById('inputUserPhoto').value = '';
  document.getElementById('myModal').style.display = 'flex';
}

function closeModal(event) {
  if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
    document.getElementById('myModal').style.display = 'none';
  }
}
//method to save conacts and check if the name the user add is in the list 
function saveContact() {
  const index = document.getElementById('contactIndex').value;
  const name = document.getElementById('inputUserName').value;
  const phone = document.getElementById('inputUserPhone').value;
  const photoInput = document.getElementById('inputUserPhoto');
  let photo = '';

  // בדיקה אם איש קשר עם אותו שם או מספר טלפון כבר קיים
  const duplicateUser = users.find(user => user.username === name || user.phone === phone);

  if (duplicateUser) {
    alert("Contact with the same name or phone number already exists.");
    return;
  }

  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photo = e.target.result;
      if (index === '') {
        users.push({ username: name, phone: phone, photo: photo });
      } else {
        users[index] = { ...users[index], username: name, phone: phone, photo: photo };
      }
      closeModal({ target: document.getElementById('myModal') });
      loadContacts();
    }
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    if (index === '') {
      users.push({ username: name, phone: phone, photo: 'images/default.jpg' });
    } else {
      users[index] = { ...users[index], username: name, phone: phone };
    }
    closeModal({ target: document.getElementById('myModal') });
    loadContacts();
  }
}
//method to edit concats 
function editContact(index) {
  document.getElementById('popupTitle').innerText = 'Edit Contact';
  document.getElementById('contactIndex').value = index;
  document.getElementById('inputUserName').value = users[index].username;
  document.getElementById('inputUserPhone').value = users[index].phone;
  document.getElementById('myModal').style.display = 'flex';
}

function deleteContact(index) {
  const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
  if (confirmDelete) {
    users.splice(index, 1);
    updatePeopleCount();
    loadContacts();
  }
}
//method to alert all contcas with maseege 
function deleteAllContacts() {
  const confirmDeleteAll = window.confirm("Are you sure you want to delete all contacts?");
  if (confirmDeleteAll) {
    users.length = 0;
    updatePeopleCount();
    loadContacts();
  }
}
//
function filterContacts() {
  const query = searchInput.value.toLowerCase();
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(query) || user.phone.includes(query)
  );

  // Show or hide the search results based on the query length
  if (query.length > 0) {
    searchActivePage.style.display = 'block';
    loadContacts(filteredUsers);
  } else {
    searchActivePage.style.display = 'none';
    loadContacts(users);
  }
}
function showContactInfo(index) {
  const user = users[index];
  document.getElementById('infoName').textContent = `Name: ${user.username}`;
  document.getElementById('infoPhone').textContent = `Phone: ${user.phone}`;
  document.getElementById('infoAddress').textContent = `Address: ${user.address || 'N/A'}`;
  document.getElementById('infoEmail').textContent = `Email: ${user.email || 'N/A'}`;
  document.getElementById('infoModal').style.display = 'flex';
}

function closeInfoPopup() {
  document.getElementById('infoModal').style.display = 'none';
}

function updatePeopleCount() {
  const count = users.length;
  document.getElementById('peopleCount').textContent = `${count} People`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadContacts();
});

searchInput.addEventListener('input', filterContacts);
