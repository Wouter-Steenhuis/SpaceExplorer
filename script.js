document.addEventListener('DOMContentLoaded', function() {
  const planets = document.querySelectorAll('.planet');
  const scrollContainer = document.getElementById('scroll-container');

  // Klikbare planeten
  planets.forEach(planet => {
    planet.addEventListener('click', () => {
      const planetName = planet.getAttribute('id');
      window.location.href = `planet.html?planet=${planetName}`;
    });
  });

  planets.forEach(planet => {
    planet.addEventListener('click', () => {
      const rect = planet.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const offset = rect.left - containerRect.left + rect.width / 2 - containerRect.width / 2;
      scrollContainer.scrollBy({ left: offset, behavior: 'smooth' });
    });
  });

  // Quizknop
  const startQuizButton = document.getElementById('startQuiz');
  startQuizButton.addEventListener('click', function() {
    window.location.href = 'quiz.html';
  });

});
