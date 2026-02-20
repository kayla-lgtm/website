(function () {
    var stage = document.getElementById("aboutStage");
    var cards = document.querySelectorAll(".about-card");
    var overlay = document.getElementById("aboutOverlay");
    var overlayImage = document.getElementById("aboutOverlayImage");
    var overlayName = document.getElementById("aboutOverlayName");
    var overlayRole = document.getElementById("aboutOverlayRole");
    var overlayCompany = document.getElementById("aboutOverlayCompany");
    var overlayBio = document.getElementById("aboutOverlayBio");
    var closeButton = document.getElementById("aboutOverlayClose");

    if (!stage || !overlay || !overlayImage || !overlayName || !overlayRole || !overlayCompany || !overlayBio || !closeButton || cards.length === 0) {
        return;
    }

    var lastTrigger = null;

    function openOverlay(card) {
        lastTrigger = card;
        overlayImage.src = card.dataset.image || "";
        overlayImage.alt = card.dataset.alt || card.dataset.name || "";
        overlayName.textContent = card.dataset.name || "";
        overlayRole.textContent = card.dataset.role || "";
        overlayCompany.textContent = card.dataset.company || "";
        overlayBio.textContent = card.dataset.bio || "";
        stage.classList.add("is-open");
        closeButton.focus();
    }

    function closeOverlay() {
        stage.classList.remove("is-open");
        if (lastTrigger) {
            lastTrigger.focus();
        }
    }

    for (var i = 0; i < cards.length; i += 1) {
        (function (card) {
            card.addEventListener("click", function () {
                openOverlay(card);
            });

            card.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openOverlay(card);
                }
            });
        })(cards[i]);
    }

    closeButton.addEventListener("click", closeOverlay);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && stage.classList.contains("is-open")) {
            closeOverlay();
        }
    });
})();
