const users = [
  { username: "Yasmeen", phone: "054898443", photo: "image/photo1.jpg", email: "yasmeen@pet.ac.il", address: "Arraba" },
  { username: "Shroq", phone: "05334534", photo: "image/photo2.jpg", email: "shroq@gmail.com", address: "Nazreth" },
  { username: "Yara", phone: "05468767", photo: "image/photo3.jpg", email: "yara@gmail.com", address: "Haifa" },
  { username: "Maria", phone: "05307887", photo: "image/photo4.jpg", email: "maria@gmail.com", address: "Tel-Aviv" },
  { username: "Rema", phone: "05462987", photo: "image/photo5.jpg", email: "rema@hotmail.com", address: "London" },
  { username: "Noor", phone: "05475298", photo: "image/photo6.jpg", email: "noor@hotmail.com", address: "Muinch " },
  { username: "Angila", phone: "05462987", photo: "image/photo7.jpg", email: "angila@pet.ac.il", address: "Dubai " },
  { username: "Lour", phone: "05462987", photo: "image/photo8.jpg", email: "lour@gmail.co.il", address: "Ibiza" },
  { username: "Miranda", phone: "05462987", photo: "image/photo9.jpg", email: "miranda@gmail.com", address: "Moscowo" },


//this Array users how it work? he work we  put the info here in js and in method showconctatinfo we put documet.getelmentbyid 
//the id have a name in html in (dive,input,button...)
]

const list = document.querySelector(".list");
const searchInput = document.getElementById('searchInput');
const searchActivePage = document.getElementById('searchActivePage');
//method loadconcats this means all the info we put js he will loading in the html page 
function loadContacts(filteredUsers = users) {
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
        <button onclick="showContactInfo(${index})"><img src="image/Info.png" alt="Info"></button>
        <button onclick="editContact(${index})"><img src="image/edit.png" alt="Edit"></button>
        <button onclick="deleteContact(${index})"><img src="image/delete.png" alt="Delete"></button>
      </div>
    `;
    list.appendChild(item);
  });
  updatePeopleCount(); 
}
//method to show contacts info 
function showContactInfo(index) {
  const user = users[index];
  document.getElementById('infoName').textContent = `Name: ${user.username}`;
  document.getElementById('infoPhone').textContent = `Phone: ${user.phone}`;
  document.getElementById('infoAddress').textContent = `Address: ${user.address || 'N/A'}`;
  document.getElementById('infoEmail').textContent = `Email: ${user.email || 'N/A'}`;
  document.getElementById('infoModal').style.display = 'flex';
}
//method to close pop 
function closeInfoPopup() {
  document.getElementById('infoModal').style.display = 'none';
}
//method to open pop 
function openPopup() {
  document.getElementById('popupTitle').innerText = 'Add Contact';
  document.getElementById('contactIndex').value = '';
  document.getElementById('inputUserName').value = '';
  document.getElementById('inputUserPhone').value = '';
  document.getElementById('inputUserAddress').value = '';
  document.getElementById('inputUserEmail').value = '';
  document.getElementById('inputUserPhoto').value = '';
  document.getElementById('myModal').style.display = 'flex';
  //in the pop we get the id from html and in js we  put the info 
}


function closeModal(event) {
  if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
    document.getElementById('myModal').style.display = 'none';
  }
}
//method to saave contact 
function saveContact() {
  const index = document.getElementById('contactIndex').value;
  const name = document.getElementById('inputUserName').value;
  const phone = document.getElementById('inputUserPhone').value;
  const address = document.getElementById('inputUserAddress').value;
  const email = document.getElementById('inputUserEmail').value;
  const photoInput = document.getElementById('inputUserPhoto');
  let photo = '';

  // Validate that the phone number contains only digits
  const phonePattern = /^[0-9]+$/;
  if (!phonePattern.test(phone)) {
    alert("Phone number can only contain digits.");
    return;
  }

  // Check for duplicate contacts but ignore the one being edited
  const duplicateUser = users.find((user, i) => (i != index) && (user.username === name || user.phone === phone));

  if (duplicateUser) {
    alert("A contact with the same name or phone number already exists.");
    return;
  }

  // Handling the photo input
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photo = e.target.result;
      if (index === '') {
        users.push({ username: name, phone: phone, address: address, email: email, photo: photo });
      } else {
        users[index] = { ...users[index], username: name, phone: phone, address: address, email: email, photo: photo };
      }
      closeModal({ target: document.getElementById('myModal') });
      loadContacts();
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    if (index === '') {
      users.push({ username: name, phone: phone, address: address, email: email, photo: 'images/default.jpg' });
    } else {
      users[index] = { ...users[index], username: name, phone: phone, address: address, email: email };
    }
    closeModal({ target: document.getElementById('myModal') });
    loadContacts();
  }
}


//method to edit the contcat 
function editContact(index) {
  document.getElementById('popupTitle').innerText = 'Edit Contact';
  document.getElementById('contactIndex').value = index;
  document.getElementById('inputUserName').value = users[index].username;
  document.getElementById('inputUserPhone').value = users[index].phone;
  document.getElementById('inputUserAddress').value = users[index].address || '';
  document.getElementById('inputUserEmail').value = users[index].email || '';
  document.getElementById('inputUserPhoto').value = '';
  document.getElementById('myModal').style.display = 'flex';
}
//method to delete the contcas with messsage 
function deleteContact(index) {
  const contactName = users[index].username; 
  const confirmDelete = window.confirm(`Are you sure you want to delete ${contactName}?`);
  if (confirmDelete) {
    users.splice(index, 1);
    updatePeopleCount();
    loadContacts();
  }
}
//method to delete all contcas 
function deleteAllContacts() {
  const confirmDeleteAll = window.confirm("Are you sure you want to delete all contacts?");
  if (confirmDeleteAll) {
    users.length = 0;
    updatePeopleCount();
    loadContacts();
  }
}

function filterContacts() {
  const query = searchInput.value.toLowerCase();
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(query) || user.phone.includes(query)
  );

  if (query.length > 0) {
    searchActivePage.style.display = 'block';
    loadContacts(filteredUsers);
  } else {
    searchActivePage.style.display = 'none';
    loadContacts(users);
  }
}
//update the peoplecount when the user add or remove 
function updatePeopleCount() {
  const count = users.length;
  document.getElementById('peopleCount').textContent = `${count} People`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadContacts();
});
//we update the search after we filterd(add or remove concats the search update. )
searchInput.addEventListener('input', filterContacts);
