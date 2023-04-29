let myLibrary = [];
let displayedBooks = [];
let tableBody = document.getElementById("table-body");
let addBookBtn = document.getElementById("add-book");
let newBookForm = document.getElementById("add-book-form");
let closeBookFormBtn = document.getElementById("close-button");
let submitFormBtn = document.getElementById("submit-form");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return this.title +  "by " + this.author + ", " + this.pages + " pages, " + (this.read? "already read." : "not read yet.");
    }
    this.toggleRead = function(){
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks(){
    clearTable(tableBody);
    myLibrary.forEach((book, index) => {
        let newRow = createRow(tableBody);
        addDeleteBtnOnRow(newRow, index);
        for (const key in book) {
            if (typeof book[key] !== 'function') {
                let newCell = createCell(newRow);
                if (book[key] === book.read){
                    if (book[key] === true){
                        insertTextOnCell(newCell, 'Yes');
                    } else {
                        insertTextOnCell(newCell, 'No');
                    }
                    toggleRead(newCell, index);
                } else {
                    insertTextOnCell(newCell, book[key]);
                
                }
                newCell.setAttribute('colspan', '4');
            }
        }
    });
    handleEmptyTable(tableBody);
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

addBookBtn.addEventListener ('click', () => {
    newBookForm.classList.add("book-form-open");
});

closeBookFormBtn.addEventListener ('click', () => {
    newBookForm.classList.remove("book-form-open");
    
});

function toggleRead(cell, index){
    
    let book = myLibrary[index];
    addHoverListener(cell, book.read);
    cell.addEventListener('click', () => {
        book.toggleRead();
        displayBooks();
    })
    
}

function addHoverListener(cell, state){
    if (state == true){
        cell.classList.add("toggle-read-cell-true");
        cell.addEventListener('mouseover', () => {cell.innerHTML = '';})
        cell.addEventListener('mouseout', () => {cell.innerHTML = 'Yes'});
    } else {
        cell.classList.add("toggle-read-cell-false");
        cell.addEventListener('mouseover', () => {cell.innerHTML = '';})
        cell.addEventListener('mouseout', () => {cell.innerHTML = 'No'});
    }
}

function addDeleteBtnOnRow(row, index){
    let deleteCell = createCell(row);
    let deleteIcon = document.createElement('img');
    deleteIcon.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTksM1Y0SDRWNkg1VjE5QTIsMiAwIDAsMCA3LDIxSDE3QTIsMiAwIDAsMCAxOSwxOVY2SDIwVjRIMTVWM0g5TTcsNkgxN1YxOUg3VjZNOSw4VjE3SDExVjhIOU0xMyw4VjE3SDE1VjhIMTNaIiAvPjwvc3ZnPg==';
    deleteIcon.setAttribute('width', '25px')
    insertTextOnCell(deleteCell, '');
    deleteCell.appendChild(deleteIcon);
    deleteCell.classList.add('delete-cell');
    deleteCell.addEventListener('click', function() {deleteBook(index);});
}

submitFormBtn.addEventListener ('click', (event) => {
    event.preventDefault();
    let title = document.getElementById("btitle").value;
    let author = document.getElementById("bauthor").value;
    let pages = document.getElementById("bpages").value;
    let read = document.getElementById("bread").checked;
    if (title == '' || author == '' || pages == ''){
        alert("Please, fill all the inputs");
    } else{
        addBookToLibrary(title, author, pages, read);
        displayBooks();
        newBookForm.classList.remove("book-form-open");
        clearForm();
    }
});

function clearForm(){
    document.getElementById("btitle").value = '';
    document.getElementById("bauthor").value = '';
    document.getElementById("bpages").value = '';
    document.getElementById("bread").checked = false;
}

function deleteBook(bookIndex){
    myLibrary.splice(bookIndex, 1);
    displayBooks();
}

function clearTable(table) {
    while (table.rows.length > 0) {
      table.deleteRow(-1);
    }
  }

function handleEmptyTable(table){
    if (table.rows.length < 1){
        let cell = createCell(createRow(table));
        cell.setAttribute('colspan', '17')
        insertTextOnCell(cell, "Your library is empty, add a book!");
    }
}

displayBooks();
