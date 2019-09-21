const pageLinks = document.querySelectorAll("a.page");
const bookList = document.querySelectorAll("tr.book-item");
const booksPerPage = 5;

/* 
Makes the first page link active on page load
*/
pageLinks[0].className = 'active';

/*
Displays only five books at a time, based on the page selected. Adds the active class to only the active page link
*/
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

/*
Adds event listeners to pagination links, and calls the showPage function when each link is clicked
*/
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

/*
Calls the showPage function so the initial page load will display page 1 of the book list
*/
showPage(bookList, 1);