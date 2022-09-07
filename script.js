const _open = document.getElementById("add_book");
const _popup1 = document.getElementById("popup1");
const _popup2 = document.getElementById("popup2");
const _close = document.getElementById("close");

_open.addEventListener('click', () => {
    _popup1.classList.add('show');
    _popup2.classList.add('show');
})

_close.addEventListener('click', () => {
    _popup1.classList.remove('show');
    _popup2.classList.remove('show');
})
