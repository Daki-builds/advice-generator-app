const API_URL = "https://api.adviceslip.com/advice";

const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const adviceButton = document.getElementById("advice-btn");

// RENDER: show data (no fetching here)
function render(slip) {
  adviceId.textContent = slip.id;
  adviceText.textContent = `“${slip.advice}”`;
  adviceText.classList.remove("error");
}

// RENDER: show error
function renderError(message) {
  adviceText.textContent = message;
  adviceText.classList.add("error");
}

// FETCH + STATES
async function getAdvice() {
  adviceButton.disabled = true; // loading

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { slip } = await res.json();
    render(slip); // success
  } catch (err) {
    console.error("Error loading advice:", err);
    renderError("Couldn't load advice. Check your connection and try again."); // error
  } finally {
    adviceButton.disabled = false; // never stays stuck
  }
}

// START
adviceButton.addEventListener("click", getAdvice);
getAdvice(); // fill the card on load
