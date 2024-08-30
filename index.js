// ==UserScript==
// @name         Sort by amount saved (Uniqlo)
// @namespace    http://tampermonkey.net/
// @version      2024-01-30
// @description  try to take over the world!
// @author       You
// @match        https://calendar.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uniqlo.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function calculateResult(x) {
        return (5 / 4) * (x + 2);
    }

    function convertMinutesToHoursAndMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    function doSomething() {
        const events = document.querySelectorAll('.GTG3wb.ChfiMc.rFUW1c.EiZ8Dd.afiDFd');
        const colorHeightMap = {};

        events.forEach(event => {
            const backgroundColor = event.style.backgroundColor;
            const height = event.offsetHeight;

            // If the color is already in the map, add the height to the existing value
            if (colorHeightMap[backgroundColor]) {
                colorHeightMap[backgroundColor] += calculateResult(height);
            } else {
                // If the color is not in the map, add it with the initial height
                colorHeightMap[backgroundColor] = calculateResult(height);
            }
        });

        // Convert and print the hashmap
        for (const [color, minutes] of Object.entries(colorHeightMap)) {
            console.log(`${color}: ${convertMinutesToHoursAndMinutes(minutes)}`);
        }
    }

    // Delay the execution by 10 seconds (10000 milliseconds)
    setTimeout(function() {
        doSomething();
    }, 10000);

})();
