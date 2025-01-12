const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Încarcă utilizatorii din fișierul JSON
const usersFile = path.join(__dirname, 'users.json');
const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

// Gestionarea paginii de login
app.get('/mainpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'mainpage.html'));
});

// Procesarea login-ului
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verifică dacă utilizatorul există
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Redirecționează către mainpage dacă login-ul este corect
    res.redirect('/mainpage');
  } else {
    // Afișează un mesaj de eroare dacă login-ul este incorect
    res.send('<h1>Invalid credentials. Please try again.</h1>');
  }
});

// Pornirea serverului
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
