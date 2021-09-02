const wrongType = document.getElementById('error');
const booksDisplay = document.getElementById('book-display');

// onclick btn arrow function

const searchBook = () => {
    const searchBooks = document.getElementById('search-field');
    const displayBook = document.getElementById('book-container');
    const searchBooksText = searchBooks.value;


    if (searchBooksText === '') {
        wrongType.innerText = 'Please enter your book name!';
    }
    else {
        wrongType.innerText = '';
        const url = `https://openlibrary.org/search.json?q=${searchBooksText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data.docs))
    }

    booksDisplay.innerText = '';

    const divElement = document.getElementById('book-container');
    divElement.textContent = '';
    searchBooks.value = '';

};

//show search results

const displayBooks = books => {
    // console.log(books);
    const displayDiv = document.getElementById('book-container');

    if (books.length === 0) {
        error.innerText = 'No Result found';
    }

    else {
        const booksPages = books.slice(0, 30);


        booksDisplay.innerText = `Showing Top ${booksPages.length} Books`;

        booksPages.forEach(book => {

            const authorName = book?.author_name?.[0];
            const publisherName = book?.publisher?.[0];

            const cover_i = book.cover_i;

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            
            <div class="card h-100">
                    <img  class="mx-auto" style="width: 150px;" src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body ">
                    <h5 class="card-title"><span class="fw-bold bg-suscess">Name:</span> ${book.title}</h5>
                    <p class="card-title"><span class="fw-bold bg-suscess">Author:</span> ${authorName ? authorName : ''}</p>
                    <p class="card-title"><span class="fw-bold bg-suscess">Publisher:</span> ${publisherName ? publisherName : ''}</p>
                    <p class="card-title"><span class="fw-bold bg-suscess">First publish year:</span>${book.first_publish_year}</p>
                    
                </div>
            </div>
        `;

            displayDiv.appendChild(div);

        })

    }
}