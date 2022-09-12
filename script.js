const _open = document.getElementById("add_book");
const _popup1 = document.getElementById("popup1");
const _popup2 = document.getElementById("popup2");
const _close = document.getElementById("close");
const mediaScroller = document.getElementsByClassName('media-scroller');
const card = document.querySelector('.card');
const submitButton = document.getElementById("submit-button");
const clearButton = document.getElementById("clear-button");
// const checkbox = document.getElementById("checkbox")

submitButton.addEventListener("click", submitNewBook);
clearButton.addEventListener("click", clearForm);

// Opening and closing popup form of new book
_open.addEventListener('click', () => {
    _popup1.classList.add('show');
    _popup2.classList.add('show');
})

_close.addEventListener('click', () => {
    closeForm();
})

function closeForm() {
    _popup1.classList.remove('show');
    _popup2.classList.remove('show');
}

let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    myLibrary.forEach(myLibrary => {
        const newCard = document.createElement('div');
        const newButton = document.createElement('button');
        newCard.classList.add('card');
        newButton.classList.add('fas', 'fa-heart')
        mediaScroller[2].appendChild(newCard);
        for (let key in myLibrary) {
            const para = document.createElement('p');
            if (key == "read") {
                para.textContent = (`${myLibrary[key]}`)
                newCard.appendChild(para)
            } else {
                para.textContent = (`${key}: ${myLibrary[key]}`)
                newCard.appendChild(para)
            }
        }
        newCard.appendChild(newButton);
    })
    myLibrary = [];
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", "295", "Read");
addBookToLibrary("Make Money", "Me", "1", "Not Read");
addBookToLibrary("Make Money", "Me", "1", "Not Read");
addBookToLibrary("Make Money", "Me", "1", "Not Read");
addBookToLibrary("Make Money", "Me", "1", "Not Read");
addBookToLibrary("Lose Money", "You", "5", "Read");

function submitNewBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('checkbox').value;

    if (title === '' || author === '' || pages === '') {
        return;
    } else {
        document.getElementById('_form').reset();
        closeForm();
    }

    addBookToLibrary(title, author, pages, read);
}

function clearForm() {
    document.getElementById('_form').reset();
}