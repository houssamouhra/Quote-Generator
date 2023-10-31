const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loading
const complete = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //   Check Quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
const getQuotes = async function () {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    console.log(apiQuotes);
    newQuote();
  } catch (err) {
    // Catch Error Here
    console.error(err);
  }
};

// Tweet Quote
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// execution
getQuotes();
