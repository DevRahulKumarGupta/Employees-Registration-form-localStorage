// Recoard Class: Represents a Recoard
class Recoard {
   constructor(name, Address, isbn, Rdate) {
     this.name = name;
     this.Address = Address;
     this.isbn = isbn;
     this.Rdate=Rdate;
   }
 }
 
 // UI Class: Handle UI Tasks
 class UI {
   static displayBooks() {
     const books = Store.getBooks();
 
     books.forEach((Rec) => UI.addBookToList(Rec));
   }
 
   static addBookToList(Rec) {
     const list = document.querySelector('#Rec-list');
 
     const row = document.createElement('tr');
 
     row.innerHTML = `
       <td>${Rec.name}</td>
       <td>${Rec.Address}</td>
       <td>${Rec.isbn}</td>
       <td>${Rec.Rdate}</td>
       <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
     `;
 
     list.appendChild(row);
   }
 
   static deleteRec(el) {
     if(el.classList.contains('delete')) {
       el.parentElement.parentElement.remove();
     }
   }
 
   static showAlert(message, className) {
     const div = document.createElement('div');
     div.className = `alert alert-${className}`;
     div.appendChild(document.createTextNode(message));
     const container = document.querySelector('.container');
     const form = document.querySelector('#Rec-form');
     container.insertBefore(div, form);
 
     // Vanish in 3 seconds
     setTimeout(() => document.querySelector('.alert').remove(), 3000);
   }
 
   static clearFields() {
     document.querySelector('#name').value = '';
     document.querySelector('#Address').value = '';
     document.querySelector('#isbn').value = '';
     document.querySelector('#Rdate').value = '';
   }
 }
 
 // Store Class: Handles Storage
 class Store {
   static getBooks() {
     let books;
     if(localStorage.getItem('books') === null) {
       books = [];
     } else {
       books = JSON.parse(localStorage.getItem('books'));
     }
 
     return books;
   }
 
   static addBook(Rec) {
     const books = Store.getBooks();
     books.push(Rec);
     localStorage.setItem('books', JSON.stringify(books));
   }
 
   static removeBook(isbn) {
     const books = Store.getBooks();
 
     books.forEach((Rec, index) => {
       if(Rec.isbn === isbn) {
         books.splice(index, 1);
       }
     });
 
     localStorage.setItem('books', JSON.stringify(books));
   }
 }
 
 // Event: Display Books
 document.addEventListener('DOMContentLoaded', UI.displayBooks);
 
 // Event: Add a Recoard
 document.querySelector('#Rec-form').addEventListener('submit', (e) => {
   // Prevent actual submit
   e.preventDefault();
 
   // Get form values
   const name = document.querySelector('#name').value;
   const Address = document.querySelector('#Address').value;
   const isbn = document.querySelector('#isbn').value;
   const Rdate = document.querySelector('#Rdate').value;
 
   // Validate
   if(name === '' || Address === '' || isbn === ''|| Rdate === '') {
     UI.showAlert('Please fill in all fields', 'danger');
   } else {
     // Instatiate Rec
     const Rec = new Recoard(name, Address, isbn, Rdate);
 
     // Add Recoard to UI
     UI.addBookToList(Rec);
 
     // Add Rec to store
     Store.addBook(Rec);
 
     // Show success message
     UI.showAlert('Recoard Added', 'success');
 
     // Clear fields
     UI.clearFields();
   }
 });
 
 // Event: Remove a Recoard
 document.querySelector('#Rec-list').addEventListener('click', (e) => {
   // Remove Rec from UI
   UI.deleteRec(e.target);
 
   // Remove Rec from store
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
 
   // Show success message
   UI.showAlert('Recoard Removed', 'success');
 });

 
//time section





