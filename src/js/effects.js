/* ═══════════════════════════════════════════════════════════
   effects.js — Scroll reveals and ambient life
   ═══════════════════════════════════════════════════════════ */

(function () {
    "use strict";

    /* ── 1. SCROLL-TRIGGERED REVEALS ─────────────────────── */

    function initScrollReveals() {
        var revealElements = document.querySelectorAll(".reveal, .reveal-stagger");
        if (!revealElements.length) return;

        if (!("IntersectionObserver" in window)) {
            // Fallback: just show everything
            for (var i = 0; i < revealElements.length; i++) {
                revealElements[i].classList.add("is-visible");
            }
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add("is-visible");
                    observer.unobserve(entries[i].target);
                }
            }
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        });

        for (var i = 0; i < revealElements.length; i++) {
            observer.observe(revealElements[i]);
        }
    }

    /* ── 2. PARALLAX-LITE ON HERO ────────────────────────── */

    function initHeroParallax() {
        var hero = document.querySelector(".hero");
        var heroContainer = document.querySelector(".herocontainer");
        if (!hero || !heroContainer) return;

        // Respect reduced motion
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        function applyHeroParallax() {
            var rect = heroContainer.getBoundingClientRect();
            var scrollRange = Math.max(1, heroContainer.offsetHeight - window.innerHeight);
            var progress = Math.max(0, Math.min(1, (-rect.top) / scrollRange));
            var motionCutoff = 0.78;
            var motionProgress = Math.min(1, progress / motionCutoff);
            var skyShift = -50 * motionProgress;
            hero.style.setProperty("--hero-sky-shift", skyShift + "%");
            hero.style.setProperty("--hero-foreground-dark-opacity", String(motionProgress));
        }

        applyHeroParallax();

        var ticking = false;
        window.addEventListener("scroll", function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    applyHeroParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });

        window.addEventListener("resize", function () {
            applyHeroParallax();
        });
    }


    /* ── 3. SMOOTH COUNTER-ROTATE ON NEURANET LOGO ───────── */

    function initLogoTilt() {
        var logo = document.querySelector(".neuranetcontainerlogo");
        if (!logo) return;

        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        var container = logo.closest(".neuranetrightcontainer");
        if (!container) return;

        container.addEventListener("mousemove", function (e) {
            var rect = container.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;
            logo.style.transform = "perspective(600px) rotateY(" + (x * 8) + "deg) rotateX(" + (-y * 8) + "deg)";
        });

        container.addEventListener("mouseleave", function () {
            logo.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
            logo.style.transition = "transform 0.4s ease";
            setTimeout(function () {
                logo.style.transition = "";
            }, 400);
        });
    }


    /* ── INIT ────────────────────────────────────────────── */

    function init() {
        initScrollReveals();
        initHeroParallax();
        initLogoTilt();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
