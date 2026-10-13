const API_URL = "https://api.adviceslip.com/advice";

const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const adviceButton = document.getElementById("advice-btn");

//FETCH DATA
async function fetchAdvice() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch advice");
  }
  const data = await response.json();
  return data.slip;
}

//RENDER: SHOW DATA
function renderAdvice(advice) {
  adviceId.textContent = advice.id;
  adviceText.textContent = `“${advice.advice}”`;
  adviceText.classList.remove("error");
}

//RENDER: SHOW ERROR
function renderError(message) {
  adviceText.textContent = message;
  adviceText.classList.add("error");
}

// LOADING DATA
function setLoading(isLoading) {
  adviceButton.disabled = isLoading;
}

//CONTROLLER: connects fetch + render + states
async function getAdvice() {
  setLoading(true);
  try {
    const slip = await fetchAdvice();
    renderAdvice(slip);
  } catch (error) {
    console.error("Error loading advice:", error);
    renderError("Couldn't load advice. Check your connection and try again.");
  } finally {
    setLoading(false);
  }
}

//START
adviceButton.addEventListener("click", getAdvice);
getAdvice();
