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

const _popup3 = document.getElementById("popup3");
const _popup4 = document.getElementById("popup4");
const editSubmitButton = document.getElementById("edit-submit-button");
const editCancelButton = document.getElementById("edit-cancel-button");
const _editClose = document.getElementById("editClose");

submitButton.addEventListener("click", submitNewBook);
clearButton.addEventListener("click", clearForm);

const setTheme = theme => document.documentElement.className = theme;

// Opening and closing popup form of new book
_open.addEventListener('click', () => {
    _popup1.classList.add('show');
    _popup2.classList.add('show');
})

_close.addEventListener('click', () => {
    closeForm();
})
_editClose.addEventListener('click', () => {
    closeForm();
})
editCancelButton.addEventListener('click', () => {
    closeForm();
})

function closeForm() {
    _popup1.classList.remove('show');
    _popup2.classList.remove('show');
    _popup3.classList.remove('show');
    _popup4.classList.remove('show');
}

let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.Title = title;
        this.Author = author;
        this.Pages = pages;
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
                para.classList.add('readOrNot')
                if (myLibrary[key] == true) {
                    para.textContent = 'Read'
                    newCard.appendChild(para)
                    updateTotalRead()
                } else {
                    para.textContent = 'Not Read'
                    newCard.appendChild(para)
                    updateTotalRead()
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
        updateTotalBooks();
    })
    myLibrary = [];
}

addBookToLibrary("Green Mile", "Stephen King", "544", true);
addBookToLibrary("The Autobiography of Malcolm X", "Alex Haley", "496", true);
addBookToLibrary("To Kill A Mockingbird", "Harper Lee", "281", false);

function submitNewBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('checkbox').checked;

    if (title === '' || author === '' || pages === '') {
        return alert('Please fill out all fields');
    } else {
        addBookToLibrary(title, author, pages, read);
        document.getElementById('_form').reset();
        closeForm();
    }
}

function clearForm() {
    document.getElementById('_form').reset();
}

addGlobalEventListener("click", ".fa-star", e => {
    if (e.target.classList.contains('fa-yellow')) {
        e.target.classList.remove('fa-yellow')
        mediaScroller[1].removeChild(e.target.parentNode)
        mediaScroller[2].appendChild(e.target.parentNode)
    } else {
        if (e.target.nextElementSibling.classList.contains('fa-blue')) {
            alert('Whoops cannot have Favourites and Currently Reading both active at this time')
        } else {
            e.target.classList.add('fa-yellow');
            mediaScroller[2].removeChild(e.target.parentNode)
            mediaScroller[1].appendChild(e.target.parentNode)
        }
    }
})

addGlobalEventListener("click", ".fa-book-open", e => {
    if (e.target.classList.contains('fa-blue')) {
        e.target.classList.remove('fa-blue')
        mediaScroller[0].removeChild(e.target.parentNode)
        mediaScroller[2].appendChild(e.target.parentNode)
    } else {
        if (e.target.previousElementSibling.classList.contains('fa-yellow')) {
            alert('Whoops cannot have Favourites and Currently Reading both active at this time')
        } else {
            e.target.classList.add('fa-blue');
            mediaScroller[2].removeChild(e.target.parentNode)
            mediaScroller[0].appendChild(e.target.parentNode)
        }
    }
})

addGlobalEventListener("click", ".fa-gear", e => {
    _popup3.classList.add('show');
    _popup4.classList.add('show');
    let practice = e.target.parentNode.children[0].innerText.split(':')[1]
    title = document.getElementById('editTitle')
    title.value = (`${practice}`)
    author = document.getElementById('editAuthor')
    author.value = (`${e.target.parentNode.children[1].innerText.split(':')[1]}`)
    pages = document.getElementById('editPages')
    pages.value = (parseInt(`${e.target.parentNode.children[2].innerText.match(/(\d+)/)}`))
    read = document.getElementById('editCheckbox')
    if (e.target.parentNode.children[3].innerText == "Read") {
        read.checked = true
    } else {
        read.checked = false
    }
    editSubmitButton.addEventListener("click", () => {
        if (title.value === '' || author.value === '' || pages.value === '') {
            return alert('Please fill out all fields');
        } else {
            e.target.parentNode.children[0].innerText = (`Title: ${title.value}`)
            e.target.parentNode.children[1].innerText = (`Author: ${author.value}`)
            e.target.parentNode.children[2].innerText = (`Pages: ${pages.value}`)
            if (read.checked === true) {
                e.target.parentNode.children[3].innerText = "Read"
            } else {
                e.target.parentNode.children[3].innerText = "Not Read"
            }
            updateTotalRead();
            closeForm();
        }
    },
        { once: true }
    );
})

addGlobalEventListener("click", ".fa-trash", e => {
    e.target.parentNode.remove(e.target.parentNode);
    updateTotalBooks();
    updateTotalRead();
})

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}

function updateTotalBooks() {
    let countTotalBooks = document.getElementsByClassName('card').length;
    totalBooks.innerText = (`Total Books: ${countTotalBooks}`);
}

function updateTotalRead() {
    readCounter = 0
    notReadCounter = 0
    let readOrNot = document.getElementsByClassName('readOrNot')
    for (let i = 0; i < readOrNot.length; i++) {
        if (readOrNot[i].innerText == "Read") {
            readCounter += 1
        } else {
            notReadCounter += 1
        }
        totalRead.innerText = (`Total Read: ${readCounter}`)
        totalNotRead.innerText = (`Total Not Read: ${notReadCounter}`)
    }
}