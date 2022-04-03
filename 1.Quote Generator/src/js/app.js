//get quotes form the api
let quotesByApi = [];
const getButton = document.querySelector(".get-quote");
const postTwitter = document.querySelector(".post-twitter");
const author = document.querySelector(".author");
const quote = document.querySelector(".quote");
const loader = document.getElementById("loader");
const quotesWrapper = document.getElementById("quotes-wrapper");

// fetch request
async function getQuotes() {
    showLoadingAnimation();
    const url = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(url);
        quotesByApi = await response.json();
        newRandomQuotes();
    }
    catch (error) {
        getQuotes();
        console.log("ooops no quotes found", error);
    }
}

function showLoadingAnimation() {
    loader.classList.remove("hidden");
    quotesWrapper.classList.add("hidden");
}

function removeLoadingAnimation() {
    loader.classList.add("hidden");
    quotesWrapper.classList.remove("hidden");
}

function newRandomQuotes() {
    showLoadingAnimation();
    const randomQuote = quotesByApi[Math.floor(Math.random() * quotesByApi.length)];
    if (!randomQuote.author)
        author.innerText = "Unknown"
    else
        author.innerText = randomQuote.author;

    if (randomQuote.text.length > 100)
        quote.classList.add("text-2xl");
    else
        quote.classList.remove("text-2xl");
    quote.innerText = randomQuote.text;
    removeLoadingAnimation();
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} -${author.textContent}`;
    window.open(twitterUrl, '_black');
}

postTwitter.addEventListener("click", tweetQuote);
getButton.addEventListener("click", newRandomQuotes);

getQuotes();