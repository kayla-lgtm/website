(function () {
    const AGENT_ID = 'e9303ec1-8398-43fd-8018-aefb8d9e106f';
    const WIDGET_SRC = 'https://assistloop.ai/assistloop-widget.js';
    const SCRIPT_FLAG = 'assistloop-widget-script';
    const NATIVE_CLASS = 'aibot-native-launcher';

    function launcherScore(node) {
        if (!node || !node.getBoundingClientRect) {
            return -1;
        }

        const style = window.getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity || '1') > 0;
        const isFixed = style.position === 'fixed';
        const nearRight = rect.right >= window.innerWidth - 120;
        const nearBottom = rect.bottom >= window.innerHeight - 140;
        const bubbleSize = size >= 34 && size <= 130;

        if (!isVisible || !isFixed || !nearRight || !nearBottom || !bubbleSize) {
            return -1;
        }

        const rightGap = Math.abs(window.innerWidth - rect.right);
        const bottomGap = Math.abs(window.innerHeight - rect.bottom);
        return 1000 - (rightGap + bottomGap);
    }

    function findNativeLauncher() {
        const selectors = [
            '[id*="assistloop"][role="button"]',
            '[class*="assistloop"][role="button"]',
            'button[id*="assistloop"]',
            'button[class*="assistloop"]',
            'div[id*="assistloop-launcher"]',
            'div[class*="assistloop-launcher"]',
            'iframe[src*="assistloop"]'
        ];

        let bestNode = null;
        let bestScore = -1;

        for (let i = 0; i < selectors.length; i += 1) {
            const nodes = document.querySelectorAll(selectors[i]);
            for (let j = 0; j < nodes.length; j += 1) {
                const node = nodes[j];
                const score = launcherScore(node);
                if (score > bestScore) {
                    bestScore = score;
                    bestNode = node;
                }
            }
        }

        return bestNode;
    }

    function applyNativeLauncherSkin() {
        const launcher = findNativeLauncher();
        if (!launcher) {
            return;
        }

        if (!launcher.classList.contains(NATIVE_CLASS)) {
            launcher.classList.add(NATIVE_CLASS);
            launcher.setAttribute('data-aibot-skinned', 'true');
            if (!launcher.getAttribute('aria-label')) {
                launcher.setAttribute('aria-label', 'Open AI assistant chat');
            }
        }

        launcher.style.setProperty('position', 'fixed', 'important');
        launcher.style.setProperty('right', 'max(var(--twentypixels), env(safe-area-inset-right))', 'important');
        launcher.style.setProperty('bottom', 'max(var(--twentypixels), env(safe-area-inset-bottom))', 'important');
        launcher.style.setProperty('z-index', '2147483000', 'important');
        launcher.style.setProperty('width', '58px', 'important');
        launcher.style.setProperty('height', '58px', 'important');
        launcher.style.setProperty('border-radius', '999px', 'important');
        launcher.style.setProperty('overflow', 'hidden', 'important');
        launcher.style.setProperty('border', '1px solid rgba(245, 249, 255, 0.30)', 'important');
        launcher.style.setProperty('box-shadow', '0 14px 30px rgba(7, 18, 39, 0.32)', 'important');
        launcher.style.setProperty('background', 'linear-gradient(150deg, rgba(16, 24, 42, 0.86) 0%, rgba(26, 33, 46, 0.90) 100%)', 'important');
        launcher.style.setProperty('backdrop-filter', 'blur(10px) saturate(140%)', 'important');
        launcher.style.setProperty('-webkit-backdrop-filter', 'blur(10px) saturate(140%)', 'important');
        launcher.style.setProperty('filter', 'hue-rotate(168deg) saturate(0.35) brightness(0.78)', 'important');

        if (window.innerWidth <= 768) {
            launcher.style.setProperty('right', 'max(var(--sixteenpixels), env(safe-area-inset-right))', 'important');
            launcher.style.setProperty('bottom', 'max(var(--sixteenpixels), env(safe-area-inset-bottom))', 'important');
            launcher.style.setProperty('width', '54px', 'important');
            launcher.style.setProperty('height', '54px', 'important');
        }
    }

    function startLauncherSkinObserver() {
        applyNativeLauncherSkin();

        const observer = new MutationObserver(function () {
            applyNativeLauncherSkin();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
        });

        window.addEventListener('resize', applyNativeLauncherSkin);
    }

    function initWidget() {
        if (!window.AssistLoopWidget || typeof window.AssistLoopWidget.init !== 'function') {
            return;
        }

        window.AssistLoopWidget.init({
            agentId: AGENT_ID
        });

        startLauncherSkinObserver();
    }

    function loadScript() {
        if (document.querySelector('script[data-assistloop="' + SCRIPT_FLAG + '"]')) {
            if (window.AssistLoopWidget) {
                initWidget();
            }
            return;
        }

        const script = document.createElement('script');
        script.src = WIDGET_SRC;
        script.async = true;
        script.dataset.assistloop = SCRIPT_FLAG;
        script.onload = function () {
            initWidget();
        };

        document.head.appendChild(script);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadScript);
        return;
    }

    loadScript();
})();
