(function () {
    let accordion = document.getElementById("offersAccordion");
    let image = document.getElementById("offersImage");
    let imageFrame = document.querySelector(".offers-image-frame");
    let offersRight = document.querySelector(".offers-right");

    if (!accordion || !image || !imageFrame || !offersRight) {
        return;
    }

    let triggers = accordion.querySelectorAll(".offer-trigger");
    let items = accordion.querySelectorAll(".offer-item");
    let mobileBreakpoint = 900;

    function getActiveItem() {
        return accordion.querySelector(".offer-item.is-active");
    }

    function placeImageFrame() {
        let activeItem = getActiveItem();
        let isMobile = window.innerWidth <= mobileBreakpoint;

        if (isMobile && activeItem) {
            activeItem.appendChild(imageFrame);
            return;
        }

        offersRight.appendChild(imageFrame);
    }

    function activateItem(trigger) {
        let parentItem = trigger.closest(".offer-item");

        if (!parentItem) {
            return;
        }

        let isAlreadyActive = parentItem.classList.contains("is-active");

        for (let index = 0; index < items.length; index += 1) {
            items[index].classList.remove("is-active");
        }

        for (let index = 0; index < triggers.length; index += 1) {
            triggers[index].setAttribute("aria-expanded", "false");
        }

        if (isAlreadyActive) {
            return;
        }

        parentItem.classList.add("is-active");
        trigger.setAttribute("aria-expanded", "true");

        let nextImage = trigger.getAttribute("data-image");
        let nextAlt = trigger.getAttribute("data-alt");

        if (nextImage) {
            image.setAttribute("src", nextImage);
        }

        if (nextAlt) {
            image.setAttribute("alt", nextAlt);
        }

        placeImageFrame();
    }

    for (let index = 0; index < triggers.length; index += 1) {
        triggers[index].addEventListener("click", function () {
            activateItem(triggers[index]);
        });
    }

    if (triggers.length > 0) {
        activateItem(triggers[0]);
    }

    window.addEventListener("resize", placeImageFrame);
    placeImageFrame();
})();
