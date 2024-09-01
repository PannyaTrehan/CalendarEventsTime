// ==UserScript==
// @name         Google Calendar Time Spent
// @namespace    http://tampermonkey.net/
// @version      2024-01-30
// @description  try to take over the world!
// @author       PannyaTrehan
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

            if (colorHeightMap[backgroundColor]) {
                colorHeightMap[backgroundColor] += calculateResult(height);
            } else {
                colorHeightMap[backgroundColor] = calculateResult(height);
            }
        });

        let newDiv = document.createElement('div');
        newDiv.id = 'div1-5';

        newDiv.style.marginLeft = '28px';

        let heading = document.createElement('h3');
        heading.textContent = 'Time Spent';

        heading.style.fontFamily = '"Google Sans",Roboto,Arial,sans-serif';
        heading.style.fontSize = '14px';
        heading.style.fontWeight = '500';
        heading.style.letterSpacing = '.25px';
        heading.style.textTransform = 'none';
        heading.style.color = 'rgb(60,64,67)';

        newDiv.appendChild(heading);

        for (const [color, minutes] of Object.entries(colorHeightMap)) {
            const timeString = convertMinutesToHoursAndMinutes(minutes);

            let p = document.createElement('p');

            p.style.color = 'rgb(60,64,67)';
            p.style.fontSize = '14px';
            p.style.fontWeight = '400';
            p.style.lineHeight = '16px';

            let colorShape = document.createElement('span');
            colorShape.style.display = 'inline-block';
            colorShape.style.width = '12px';
            colorShape.style.height = '12px';
            colorShape.style.backgroundColor = color;
            colorShape.style.marginRight = '8px';
            colorShape.style.borderRadius = '50%';

            p.appendChild(colorShape);
            p.appendChild(document.createTextNode(`${timeString}`));

            newDiv.appendChild(p);

            console.log(`${color}: ${convertMinutesToHoursAndMinutes(minutes)}`);
        }

        const target = document.querySelector('.qXIcZc.ZtL5hd');

        if (target) {
            target.insertAdjacentElement('afterend', newDiv);
        }
    }

    // Set up a MutationObserver to watch for changes in the document
    const observer = new MutationObserver((mutations) => {
        const target = document.querySelector('.GTG3wb.ChfiMc.rFUW1c.EiZ8Dd.afiDFd');
        if (target) {
            doSomething();
            observer.disconnect(); // Stop observing after the function has run
        }
    });

    // Start observing the document
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();