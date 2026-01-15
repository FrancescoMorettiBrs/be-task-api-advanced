# Task Manager API

API REST per la gestione di task sviluppata come progetto didattico
per consolidare le competenze su **Node.js**, **Express** e **MySQL**,
con particolare attenzione alla struttura del codice e alle best practice backend.

---

## 🚀 Funzionalità implementate

- 📡 API REST completa per la gestione delle task (CRUD)
- 🗄️ Persistenza dati tramite database MySQL
- ⚙️ Connection pool con `mysql2/promise`
- 🧱 Architettura modulare:
  - routes
  - controllers
  - db
- ❗ Gestione centralizzata degli errori
- 🚫 Middleware per endpoint non trovati (404)
- 🔐 Query parametrizzate (protezione SQL injection)

---

## 📌 Endpoint disponibili

### GET /tasks
Restituisce la lista completa delle task.

### GET /tasks/:id
Restituisce una singola task tramite `id`.

### POST /tasks
Crea una nuova task.

### PUT /tasks/:id
Modifica una task.

### DELETE /tasks/:id
Elimina una task.
