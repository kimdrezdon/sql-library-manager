const paginationDiv = document.querySelector('.pagination');
const pageLinks = document.querySelectorAll("a.page");
const bookList = document.querySelectorAll("tr.book-item");
const booksPerPage = 5;

pageLinks[0].className = 'active';

for (let i = 0; i < pageLinks.length; i++) {
    pageLinks[i].addEventListener("click", e => {
        for (let i = 0; i < pageLinks.length; i++) {
            pageLinks[i].className = "";
        }
        const activePage = e.target;
        activePage.className = "active";
        const activePageNum = i + 1;
        showPage(bookList, activePageNum);
    });
}

const showPage = (list, page) => {
    const firstIndex = page * booksPerPage - booksPerPage;
    const lastIndex = page * booksPerPage - 1;

    for (let i = 0; i < list.length; i++) {
        if (i >= firstIndex && i <= lastIndex) {
            list[i].style.display = "";
        } else {
            list[i].style.display = "none";
        }
    }
};

showPage(bookList, 1);