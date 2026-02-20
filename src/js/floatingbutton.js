/* Floating schedule button for global pages */
(function () {
    var BUTTON_ID = "floatingDemoButton";
    var MODAL_ID = "floatingDemoModal";
    var MODAL_MOUNT_ID = "floatingDemoCalendlyMount";
    var CALENDLY_SCRIPT_ID = "calendly-widget-script";
    var CALENDLY_CSS_ID = "calendly-widget-css";
    var CALENDLY_BASE_URL = window.SF_CALENDLY_URL || "https://calendly.com/secondfoundationai/30min";
    var CALENDLY_THEME = {
        background_color: window.SF_CALENDLY_BG || "10182a",
        text_color: window.SF_CALENDLY_TEXT || "f5f9ff",
        primary_color: window.SF_CALENDLY_PRIMARY || "3b82f6",
        hide_event_type_details: window.SF_CALENDLY_HIDE_DETAILS || "1",
        hide_gdpr_banner: window.SF_CALENDLY_HIDE_GDPR || "1"
    };
    var calendlyScriptPromise = null;
    var isCalendlyMounted = false;

    function buildCalendlyUrl() {
        var url;
        try {
            url = new URL(CALENDLY_BASE_URL);
        } catch (error) {
            return CALENDLY_BASE_URL;
        }

        Object.keys(CALENDLY_THEME).forEach(function (key) {
            var value = CALENDLY_THEME[key];
            if (value !== undefined && value !== null && value !== "") {
                url.searchParams.set(key, String(value));
            }
        });

        return url.toString();
    }

    function loadCalendlyCss() {
        if (document.getElementById(CALENDLY_CSS_ID)) {
            return;
        }

        var link = document.createElement("link");
        link.id = CALENDLY_CSS_ID;
        link.rel = "stylesheet";
        link.href = "https://assets.calendly.com/assets/external/widget.css";
        document.head.appendChild(link);
    }

    function loadCalendlyScript() {
        if (window.Calendly) {
            return Promise.resolve();
        }

        if (calendlyScriptPromise) {
            return calendlyScriptPromise;
        }

        calendlyScriptPromise = new Promise(function (resolve, reject) {
            var existing = document.getElementById(CALENDLY_SCRIPT_ID);
            if (existing) {
                existing.addEventListener("load", resolve, { once: true });
                existing.addEventListener("error", reject, { once: true });
                return;
            }

            var script = document.createElement("script");
            script.id = CALENDLY_SCRIPT_ID;
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });

        return calendlyScriptPromise;
    }

    function setScrollLocked(locked) {
        document.body.style.overflow = locked ? "hidden" : "";
        document.documentElement.style.overflow = locked ? "hidden" : "";
    }

    function closeModal() {
        var modal = document.getElementById(MODAL_ID);
        if (!modal) {
            setScrollLocked(false);
            return;
        }

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        setScrollLocked(false);
    }

    function mountCalendlyInline() {
        var mount = document.getElementById(MODAL_MOUNT_ID);
        var calendlyUrl = buildCalendlyUrl();
        if (!mount) {
            return;
        }

        if (isCalendlyMounted) {
            return;
        }

        if (!window.Calendly || typeof window.Calendly.initInlineWidget !== "function") {
            window.open(calendlyUrl, "_blank", "noopener,noreferrer");
            closeModal();
            return;
        }

        mount.innerHTML = "";
        window.Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: mount,
            resize: true
        });
        isCalendlyMounted = true;
    }

    function openModal() {
        var modal = document.getElementById(MODAL_ID);
        if (!modal) {
            return;
        }

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        setScrollLocked(true);

        loadCalendlyScript().then(mountCalendlyInline).catch(function () {
            window.open(buildCalendlyUrl(), "_blank", "noopener,noreferrer");
            closeModal();
        });
    }

    function buildModal() {
        if (document.getElementById(MODAL_ID)) {
            return;
        }

        var overlay = document.createElement("div");
        overlay.id = MODAL_ID;
        overlay.className = "floating-demo-modal";
        overlay.setAttribute("aria-hidden", "true");

        var dialog = document.createElement("div");
        dialog.className = "floating-demo-dialog";
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("aria-label", "Schedule a Demo");

        var topbar = document.createElement("div");
        topbar.className = "floating-demo-topbar";

        var title = document.createElement("h2");
        title.className = "floating-demo-title";
        title.textContent = "Schedule a Demo";

        var closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "floating-demo-close";
        closeButton.setAttribute("aria-label", "Close scheduler");
        closeButton.textContent = "×";
        closeButton.addEventListener("click", closeModal);

        var mount = document.createElement("div");
        mount.id = MODAL_MOUNT_ID;
        mount.className = "floating-demo-calendly";

        topbar.appendChild(title);
        topbar.appendChild(closeButton);
        dialog.appendChild(topbar);
        dialog.appendChild(mount);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) {
                closeModal();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeModal();
            }
        });
    }

    function buildButton() {
        if (document.getElementById(BUTTON_ID)) {
            return;
        }

        var button = document.createElement("button");
        button.id = BUTTON_ID;
        button.type = "button";
        button.className = "floating-demo-btn";
        button.setAttribute("aria-label", "Schedule a Demo");
        button.textContent = "Schedule a Demo";
        button.addEventListener("click", function (event) {
            event.preventDefault();
            openModal();
        });

        document.body.appendChild(button);
    }

    function initFloatingButton() {
        if (!document.body) {
            return;
        }

        setScrollLocked(false);
        loadCalendlyCss();
        buildModal();
        buildButton();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initFloatingButton);
    } else {
        initFloatingButton();
    }
})();
