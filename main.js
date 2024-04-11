// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const errorModalMessage = document.getElementById("modal-message");

  // Add the .hidden class to the error modal to hide it initially
  errorModal.classList.add("hidden");

  // Function to handle clicking on the heart icon
  function handleHeartClick(event) {
    const heart = event.target;

    // Check if the clicked element is the heart icon
    if (heart.classList.contains("like-glyph")) {
      mimicServerCall()
        .then(() => {
          // Toggle heart state and add/remove activated-heart class
          if (heart.innerText === EMPTY_HEART) {
            heart.innerText = FULL_HEART;
            heart.classList.add("activated-heart");
          } else {
            heart.innerText = EMPTY_HEART;
            heart.classList.remove("activated-heart");
          }
        })
        .catch((error) => {
          // Show error modal on failure
          errorModalMessage.innerText = error;
          errorModal.classList.remove("hidden");
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    }
  }

  // Add click event listener to handle clicks on hearts
  document.addEventListener("click", handleHeartClick);
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
