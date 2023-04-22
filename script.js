let myLibrary = [];
let tableBody = document.getElementById("table-body");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return this.title +  "by " + this.author + ", " + this.pages + " pages, " + (this.read? "already read." : "not read yet.");
    }
}

function addBookToLibrary(){
    let name = prompt("Put the name of the book");
    let author = prompt("Put the author of the book");
    let pages = parseInt(prompt("Put the pages of the book"));
    let read = prompt("Did you read this book? Put 'Y' for yes, 'N' for no.") == "Y"? true : false;

    myLibrary.push(new Book(name, author, pages, read));
}

function displayBooks(){
    myLibrary.forEach(book => {
        let newRow = createRow(tableBody);
        for (const key in book) {
            if (typeof book[key] !== 'function') {
                let newCell = createCell(newRow);
                insertTextOnCell(newCell, book[key]);
            }
        }
    });
}

function createRow(table){
    return table.insertRow(-1);
}

function createCell(row){
    return row.insertCell(-1);
}

function insertTextOnCell(cell, text){
    let textNode = document.createTextNode(text);
    cell.appendChild(textNode);
}


myLibrary.push(new Book("HOla", "prueba", 35, true));
myLibrary.push(new Book("aloh", "prueba", 38, false));
myLibrary.push(new Book("libro3", "fgfdgfd", 45, true));

displayBooks();