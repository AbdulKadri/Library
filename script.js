const _open = document.getElementById("add_book");
const _popup1 = document.getElementById("popup1");
const _popup2 = document.getElementById("popup2");
const _close = document.getElementById("close");
const mediaScroller = document.getElementsByClassName('media-scroller');
const card = document.querySelector('.card');
const submitButton = document.getElementById("submit-button");
const clearButton = document.getElementById("clear-button");
const totalBooks = document.getElementById('totalBooks');
const totalRead = document.getElementById('totalRead');
const totalNotRead = document.getElementById('totalNotRead');
let readCounter = 0
let notReadCounter = 0

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
        const favouritesButton = document.createElement('button');
        const curReadButton = document.createElement('button');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button')
        newCard.classList.add('card');
        favouritesButton.classList.add('fa-solid', 'fa-star')
        curReadButton.classList.add('fa-solid', 'fa-book-open')
        editButton.classList.add('fa-solid', 'fa-gear')
        deleteButton.classList.add('fa-solid', 'fa-trash')
        mediaScroller[2].appendChild(newCard);
        for (let key in myLibrary) {
            const para = document.createElement('p');
            if (key == "read") {
                if (myLibrary[key] == true) {
                    readCounter += 1
                    para.textContent = 'Read'
                    newCard.appendChild(para)
                } else {
                    notReadCounter += 1
                    para.textContent = 'Not Read'
                    newCard.appendChild(para)
                }
            } else {
                para.textContent = (`${key}: ${myLibrary[key]}`)
                newCard.appendChild(para)
            }
        }
        newCard.appendChild(deleteButton);
        newCard.appendChild(favouritesButton);
        newCard.appendChild(curReadButton);
        newCard.appendChild(editButton);
    })
    myLibrary = [];
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", "295", true);
addBookToLibrary("Bruh", "when", "50", false);
addBookToLibrary("okay", "who", "100", false);
addBookToLibrary("Make Money", "when", "10", false);
addBookToLibrary("Scram", "Me", "0", false);
addBookToLibrary("Lose Money", "You", "5", true);

function submitNewBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('checkbox').checked;

    if (title === '' || author === '' || pages === '') {
        return;
    } else {
        document.getElementById('_form').reset();
        closeForm();
    }

    addBookToLibrary(title, author, pages, read);
    updateTotalBooks();
    updateTotalRead();
}

function clearForm() {
    document.getElementById('_form').reset();
}

const star = document.getElementsByClassName('fa-star');
for (let i = 0; i < star.length; i++) {
    star[i].addEventListener("click", (e) => {
        if (star[i].classList.contains('fa-yellow')) {
            star[i].classList.remove('fa-yellow')
            console.log(i)
            mediaScroller[1].removeChild(e.target.parentNode)
            mediaScroller[2].appendChild(e.target.parentNode)
        } else {
            star[i].classList.add('fa-yellow');
            console.log(i)
            mediaScroller[2].removeChild(e.target.parentNode)
            mediaScroller[1].appendChild(e.target.parentNode)
        }
    })
}

const book = document.getElementsByClassName('fa-book-open');
for (let i = 0; i < book.length; i++) {
    book[i].addEventListener("click", (e) => {
        if (book[i].classList.contains('fa-blue')) {
            book[i].classList.remove('fa-blue')
            mediaScroller[0].removeChild(e.target.parentNode)
            mediaScroller[2].appendChild(e.target.parentNode)
        } else {
            book[i].classList.add('fa-blue');
            mediaScroller[2].removeChild(e.target.parentNode)
            mediaScroller[0].appendChild(e.target.parentNode)
        }
    })
}

const edit = document.getElementsByClassName('fa-gear');
for (let i = 0; i < edit.length; i++) {
    edit[i].addEventListener('click', () => {
        _popup1.classList.add('show');
        _popup2.classList.add('show');
    })
}

const deleteBook = document.getElementsByClassName('fa-trash');
for (let i = 0; i < deleteBook.length; i++) {
    deleteBook[i].addEventListener("click", (e) => {
        e.target.parentNode.remove(e.target.parentNode);
        updateTotalBooks();
        if (e.target.previousElementSibling.innerText == 'Read') {
            readCounter -= 1
        } else {
            notReadCounter -= 1
        }
        updateTotalRead()
    })
}

function updateTotalBooks() {
    let countTotalBooks = document.getElementsByClassName('card').length;
    totalBooks.innerText = (`Total Books: ${countTotalBooks}`);
}

function updateTotalRead() {
    totalRead.innerText = (`Total Read: ${readCounter}`)
    totalNotRead.innerText = (`Total Not Read: ${notReadCounter}`)
}

updateTotalBooks()
updateTotalRead()