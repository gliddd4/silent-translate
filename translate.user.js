// ==UserScript==
// @name         Translate webpage to English (silent)
// @namespace    https://github.com/gliddd4/silent-translate/edit/main/translate.user.js
// @version      2.5
// @description  Translates the whole page to English silently. No UI.
// @author       gliddd4
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    "use strict";

    if (window.top !== window.self) return;

    var TARGET_LANG = 'en';

    if (location.hostname.endsWith('.translate.goog') || location.hostname === 'translate.google.com') {
        return;
    }

    var HIDECSS = [
        'body > .skiptranslate { display: none !important; }',
        '.goog-te-banner-frame { display: none !important; }',
        '#goog-gt-tt { display: none !important; }',
        'body { top: 0px !important; margin-top: 0px !important; }'
    ].join('\n');

    function injectCSS() {
        if (document.getElementById('__gt_hide')) return;
        var s = document.createElement('style');
        s.id = '__gt_hide';
        s.textContent = HIDECSS;
        (document.head || document.documentElement || document.body || document).appendChild(s);
    }

    injectCSS();

    function checkAndTranslate() {
        var lang = (document.documentElement.lang || '').toLowerCase().substring(0, 2);
        if (lang && lang !== 'en') {
            startWidget();
        } else {
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
    }

    function startWidget() {
        document.cookie = 'googtrans=/auto/' + TARGET_LANG + '/; path=/';

        var d = document.createElement('div');
        d.id = 'google_translate_element';
        d.style.cssText = 'visibility:hidden;height:0;overflow:hidden';
        document.body.appendChild(d);

        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({
                pageLanguage: 'auto',
                autoDisplay: false,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        };

        var s = document.createElement('script');
        s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit&hl=en';
        document.head.appendChild(s);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndTranslate);
    } else {
        checkAndTranslate();
    }

})();
