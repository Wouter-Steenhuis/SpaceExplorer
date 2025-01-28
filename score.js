document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');
    document.getElementById("score-container").textContent = "Jouw score is: " + score + "/4";
  });
  document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "index.html"; 
  });  