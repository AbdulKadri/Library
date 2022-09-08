const _open = document.getElementById("add_book");
const _popup1 = document.getElementById("popup1");
const _popup2 = document.getElementById("popup2");
const _close = document.getElementById("close");

// Opening and closing popup form of new book
_open.addEventListener('click', () => {
    _popup1.classList.add('show');
    _popup2.classList.add('show');
})

_close.addEventListener('click', () => {
    _popup1.classList.remove('show');
    _popup2.classList.remove('show');
})

let myLibrary = [
    {
    title: 'Malcolm X',
    author: 'Alex Haley',
    amount_of_pages: '205',
    read_book: true
    }
];

function Book(title, author, amount_of_pages, read_book) {
    this.title = title
    this.author = author
    this.amount_of_pages = amount_of_pages
    this.read_book = read_book
}

function addBookToLibrary() {
    let title = $titleInput.value
    let author = $authorInput.value
    let amount_of_pages = $amount_of_pagesInput.value
    let read_book = $read_bookInput.value
    let newBook = new Book(title, author, amount_of_pages, read_book);
    myLibrary.push(newBook);
}



