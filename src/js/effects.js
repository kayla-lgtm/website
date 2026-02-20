/* ═══════════════════════════════════════════════════════════
   effects.js — Scroll reveals, floating orbs, ambient life
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


    /* ── 2. FLOATING AMBIENT ORBS ────────────────────────── */

    var orbConfigs = [
        // Hero orbs — dramatic
        {
            parentSelector: ".hero",
            orbs: [
                { className: "orb--purple", size: 340, top: "10%", left: "60%", delay: 0, duration: 20 },
                { className: "orb--indigo", size: 280, top: "55%", left: "75%", delay: 2, duration: 24 },
                { className: "orb--blue",   size: 200, top: "30%", left: "40%", delay: 4, duration: 18 },
            ]
        },
        // Neuranet section — subtle warmth
        {
            parentSelector: ".neuranet-section",
            orbs: [
                { className: "orb--purple", size: 320, top: "15%", left: "75%", delay: 1, duration: 22 },
                { className: "orb--indigo", size: 260, top: "55%", left: "5%", delay: 3, duration: 20 },
                { className: "orb--blue",   size: 200, top: "35%", left: "50%", delay: 5, duration: 25 },
            ]
        },
        // Offers section
        {
            parentSelector: ".offers-section",
            orbs: [
                { className: "orb--indigo", size: 300, top: "15%", left: "70%", delay: 0, duration: 22 },
                { className: "orb--rose",   size: 220, top: "65%", left: "15%", delay: 2.5, duration: 26 },
                { className: "orb--purple", size: 180, top: "40%", left: "50%", delay: 5, duration: 19 },
            ]
        },
        // Industries section
        {
            parentSelector: ".industries-section",
            orbs: [
                { className: "orb--blue",   size: 280, top: "10%", left: "20%", delay: 1, duration: 24 },
                { className: "orb--indigo", size: 240, top: "55%", left: "75%", delay: 3, duration: 20 },
            ]
        }
    ];

    function spawnOrbs() {
        for (var c = 0; c < orbConfigs.length; c++) {
            var config = orbConfigs[c];
            var parent = document.querySelector(config.parentSelector);
            if (!parent) continue;

            // Ensure parent is a positioning context
            var style = window.getComputedStyle(parent);
            if (style.position === "static") {
                parent.style.position = "relative";
            }

            // Create canvas container
            var canvas = document.createElement("div");
            canvas.className = "orb-canvas";
            canvas.setAttribute("aria-hidden", "true");

            for (var o = 0; o < config.orbs.length; o++) {
                var cfg = config.orbs[o];
                var orb = document.createElement("div");
                orb.className = "orb " + cfg.className;
                orb.style.width = cfg.size + "px";
                orb.style.height = cfg.size + "px";
                orb.style.top = cfg.top;
                orb.style.left = cfg.left;
                orb.style.animationDelay = cfg.delay + "s";
                orb.style.animationDuration = cfg.duration + "s, 1.5s";
                canvas.appendChild(orb);
            }

            // Insert orb canvas as the first child so it's behind content
            parent.insertBefore(canvas, parent.firstChild);
        }
    }


    /* ── 3. PARALLAX-LITE ON HERO ────────────────────────── */

    function initHeroParallax() {
        var hero = document.querySelector(".hero");
        if (!hero) return;

        // Respect reduced motion
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        var ticking = false;
        window.addEventListener("scroll", function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
                    var heroHeight = hero.offsetHeight;
                    if (scrollY < heroHeight) {
                        var parallaxOffset = scrollY * 0.3;
                        hero.style.backgroundPositionY = parallaxOffset + "px";
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }


    /* ── 4. SMOOTH COUNTER-ROTATE ON NEURANET LOGO ───────── */

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
        spawnOrbs();
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
