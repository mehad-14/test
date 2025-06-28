  function check(btn) {
    const parent = btn.closest('.question-box');
    const correct = parent.getAttribute('data-answer').toLowerCase();
    const resultBox = parent.querySelector('.result');

    if (btn.textContent.toLowerCase() === correct) {
      resultBox.innerHTML = '✅ <span class="correct">Correct!</span>';
      btn.style.backgroundColor = '#81c784';
      parent.querySelectorAll('.option').forEach(b => b.disabled = true);
    } else {
      resultBox.innerHTML = '❌ <span class="wrong">Try again!</span>';
      btn.style.backgroundColor = '#e57373';
    }
  }

  function speak(btn) {
    const parent = btn.closest('.question-box');
    const text = parent.getAttribute('data-question');

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support speech synthesis.");
    }
  }


      const draggables = document.querySelectorAll('.draggable');
    const dropzones = document.querySelectorAll('.dropzone');

    draggables.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.id);
      });
    });

    dropzones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        const matchId = zone.getAttribute('data-match');

        if (draggedId === matchId) {
          zone.querySelector('.label').textContent = draggedId;
          document.getElementById(draggedId).style.display = 'none';
          zone.style.backgroundColor = '#c8e6c9';
        } else {
          alert('❌ Try again!');
        }
      });
    });


    
    const questions = [
      {
        question: "Who Doctor?",
        images: [
          { src: "https://i.postimg.cc/Wp8Np8Kb/1.jpg", isCorrect: true }, // Doctor
          { src: "https://i.postimg.cc/R0tPGPf7/images-1.png", isCorrect: false } // Teacher
        ]
      },
      {
        question: "Who teaches students?",
        images: [
          { src: "https://i.postimg.cc/mgvjcQqt/personalized-male-teacher-caricature-1.jpg", isCorrect: true }, // Teacher
          { src: "https://i.postimg.cc/nzny6bnK/images-18.jpg", isCorrect: false } // Lawyer
        ]
      },
      {
        question: "Who is lawyer?",
        images: [
          { src: "https://i.postimg.cc/nzny6bnK/images-18.jpg", isCorrect: true }, // Lawyer
          { src: "https://i.postimg.cc/9fhK75w3/04c6a1aa98590dbc04688810d508764e-png-wh860.png", isCorrect: false } // Police
        ]
      },
      {
        question: "Who is policeman?",
        images: [
          { src: "https://i.postimg.cc/Pqy3vLkZ/2.jpg", isCorrect: true }, // Police
          { src: "https://i.postimg.cc/mgvjcQqt/personalized-male-teacher-caricature-1.jpg", isCorrect: false } // Firefighter
        ]
      },
      {
        question: "Who Fireman?",
        images: [
          { src: "https://i.postimg.cc/Y2v7k718/images-19.jpg", isCorrect: true }, // Firefighter
          { src: "https://i.postimg.cc/HW7LWTLN/IMG.jpg", isCorrect: false } // Female Engineer
        ]
      },
      {
        question: "Who is engineer?",
        images: [
          { src: "https://i.postimg.cc/yYTvbgkG/3.jpg", isCorrect: true }, // Female Engineer
          { src: "https://i.postimg.cc/fRHsjPLX/images-20.jpg", isCorrect: false } // Doctor
        ]
      }
    ];

    let currentQuestion = 0;

    function loadQuestion() {
      const q = questions[currentQuestion];
      document.getElementById("question").textContent = q.question;
      document.getElementById("img1").src = q.images[0].src;
      document.getElementById("img2").src = q.images[1].src;
      document.getElementById("result").textContent = "";
    }

    function checkAnswer(index) {
      const isCorrect = questions[currentQuestion].images[index].isCorrect;
      document.getElementById("result").textContent = isCorrect ? "✅ Good job!" : "❌ Try again!";
    }

    function nextQuestion() {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        document.getElementById("quiz-container").innerHTML = "<h2 style='font-size:28px;'>🎉 You finished the quiz!</h2>";
        document.getElementById("result").textContent = "";
      }
    }

    window.onload = loadQuestion;