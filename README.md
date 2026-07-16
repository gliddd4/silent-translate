# Silent Translate — Tampermonkey Userscript

Automatically translates any webpage to English no clicking buttons no redirects no overlay blocking content and no translating pages that are already in English. Uses google translate.

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) (or Violentmonkey)
2. Open `translate.user.js` and click "Raw" to install

## How it works

- Detects the page language via `<html lang="...">`
- Sets a `googtrans` cookie to tell Google Translate to translate to English
- Loads the Google Translate widget with `autoDisplay: false`
- CSS hides the toolbar (`body > .skiptranslate { display: none !important }`)
- Clears stale cookies on English pages

## Credits

Original script by [Procyon-b](https://greasyfork.org/scripts/470861) (v0.5.1), improved with opencode (Big Pickle).