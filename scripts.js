document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("quote-overlay");
  const overlayImg = document.getElementById("overlay-img");
  const overlayText = document.getElementById("overlay-text");

  const quoteData = {
    dario: {
      img: "images/Dario Amodei.jpg",
      text: "Anthropic is committed to safety and progress in AI. - Dario Amodei, CEO of Anthropic"
    },
    elon: {
      img: "images/Elon Musk.jpg",
      text: "AI is one of the most powerful tools we've ever built. - Elon Musk, CEO of Tesla and SpaceX"
    },
    jensen: {
      img: "images/Jensen Huang.jpg",
      text: "NVIDIA is building the infrastructure for the AI revolution. - Jensen Huang, CEO of NVIDIA"
    },
    satya: {
      img: "images/Nadella 3.jpg",
      text: "We are empowering every person and organization on the planet. - Satya Nadella, CEO of Microsoft"
    }
  };

  const cards = document.querySelectorAll(".quotephoto-card");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      const name = card.getAttribute("data-name");
      const data = quoteData[name];
      if (!data) {
        return;
      }

      overlayImg.src = data.img;
      overlayImg.alt = name;
      overlayText.textContent = data.text;

      overlay.style.display = "flex";
    });
  });

  // 🔹 CLOSE OVERLAY when clicking on the white background
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      overlay.style.display = "none";
    }
  });
});
