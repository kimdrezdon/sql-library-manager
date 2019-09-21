const bookList = document.querySelectorAll("tr.book-item");
const booksPerPage = 10;
const searchComponent = document.querySelector('.book-search');
const input = searchComponent.querySelector('input');
const button = searchComponent.querySelector('button');
const pageDiv = document.querySelector(".wrapper");

/*
Creates div to store No Results message, defaults it to hidden
*/
const noResultsDiv = document.createElement("div");
pageDiv.appendChild(noResultsDiv);
noResultsDiv.innerHTML =
  '<p style = "font-style: italic">No results' +
  " were found. Please try another search.</p>";
noResultsDiv.style.display = "none";

/*
Displays only 10 books at a time, based on the page selected. Adds the active class to only the active page link
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
Creates the correct number of page links based on the total number of books in the database or search. Adds event listeners 
to the pagination links. Calls the showPage function when each link is clicked.
*/
const appendPageLinks = list => {
    const totalPages = Math.ceil(list.length / booksPerPage);
    
    const linkDiv = document.createElement("div");
    linkDiv.className = "pagination";
    pageDiv.appendChild(linkDiv);

    const ul = document.createElement("ul");
    linkDiv.appendChild(ul);

    for (let i = 0; i < totalPages; i++) {
        const li = document.createElement("li");
        ul.appendChild(li);
        const a = document.createElement("a");
        const pageNum = i + 1;
        a.textContent = pageNum;
        a.href = "#";
        li.appendChild(a);
    }

    const pageLinks = linkDiv.querySelectorAll("a");
    pageLinks[0].className = 'active';

    for (let i = 0; i < pageLinks.length; i++) {
        pageLinks[i].addEventListener("click", e => {
            for (let i = 0; i < pageLinks.length; i++) {
                pageLinks[i].className = "";
            }
            const activePage = e.target;
            activePage.className = "active";
            const activePageNum = i + 1;
            showPage(list, activePageNum);
        });
    }
}

/*
Calls the showPage and appendPageLinks functions so the initial page load will display page 1 of the book list
*/
showPage(bookList, 1);

appendPageLinks(bookList);

/*
Searches/filters book list by finding partial matches to user's input and displays the correct 
number of page links based on the results
*/
const filter = () => {
    const userInput = input.value.toUpperCase();
    const filteredList = [];
    const linkDiv = document.querySelector(".pagination");
    let results = false;

    for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].textContent.toUpperCase().includes(userInput)) {
            bookList[i].style.display = "";
            filteredList.push(bookList[i]);
            results = true;
        } else {
            bookList[i].style.display = "none";
        }
    }
    if (results === true) {
        noResultsDiv.style.display = "none";
    } else {
        noResultsDiv.style.display = "";
    }

    pageDiv.removeChild(linkDiv);
    showPage(filteredList, 1);
    appendPageLinks(filteredList);
};
  
/*
Adds event listeners to search component so users can either click or press Enter/Return to submit their search
*/
button.addEventListener("click", () => filter());

input.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        filter();
    }
});