import { auth, provider, db } from './firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Common elements
const messageEl = document.getElementById('message');

// Signup
window.signup = async () => {
  const email = document.getElementById('email').value;
  const pw = document.getElementById('password').value;
  try {
    await createUserWithEmailAndPassword(auth, email, pw);
    location = 'home.html';
  } catch(e) {
    alert(e.message);
  }
};

// Login
window.login = async () => {
  const email = document.getElementById('email').value;
  const pw = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, pw);
    location = 'home.html';
  } catch(e) {
    alert(e.message);
  }
};

// Reset
window.resetPassword = async () => {
  const email = document.getElementById('email').value;
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset email sent');
  } catch(e) {
    alert(e.message);
  }
};

// Google Sign-In
window.googleSignIn = async () => {
  try {
    await signInWithPopup(auth, provider);
    location = 'home.html';
  } catch(e) {
    alert(e.message);
  }
};

// Add book
const addForm = document.getElementById('book-form');
if (addForm) {
  addForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      title: addForm.title.value,
      author: addForm.author.value,
      genre: addForm.genre.value,
      condition: addForm.condition.value,
      description: addForm.description.value,
      location: addForm.location.value,
      ownerId: auth.currentUser.uid,
      createdAt: serverTimestamp()
    };
    await addDoc(collection(db, 'books'), data);
    alert('Book added');
    addForm.reset();
    location = 'home.html';
  });
}

// Load books
const bookList = document.getElementById('book-list');
if (bookList) {
  onAuthStateChanged(auth, async user => {
    if (!user) return location = 'index.html';
    const snap = await getDocs(collection(db, 'books'));
    snap.forEach(doc => {
      const b = doc.data();
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${b.title}</h3>
        <p>${b.author}</p>
        <p>${b.genre} • ${b.condition}</p>
        <button onclick="location='book-detail.html?id=${doc.id}'">View</button>
      `;
      bookList.appendChild(card);
    });
  });
}
