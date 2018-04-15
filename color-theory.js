'use strict';

import {default as colorKeywords} from './util/color-keywords.js';

class ColorTheory {
    constructor() {
    }

    // Converting
    hexToRgb(hexColor) {
        let red = hexColor.slice(1,3);
        let green = hexColor.slice(3,5);
        let blue = hexColor.slice(5,7);

        return `rgb(${parseInt(red, 16)},${parseInt(green, 16)},${parseInt(blue, 16)})`;
    }

    rgbToHex(rgbColor) {
        let color = rgbColor.match(/^rgb(a)?\((\d+),\s*(\d+),\s*(\d+)/);
        let red = hex_it(color[2]);
        let green = hex_it(color[3]);
        let blue = hex_it(color[4]);
        let hex_color = red + green + blue;

        function hex_it(h) {
            let num = h.length > 2 && h[0] === '0' ? parseInt(h.slice(1,3), 10).toString(16).toUpperCase() :
            parseInt(h, 10).toString(16).toUpperCase();

            if (num.length < 2) {
                num = "0" + num;
            }
            else if (num.length > 2) {
                num = num.slice(1,3);
            }

            return num;
        }

        return `#${hex_color}`;
    }

    rgbaToHex(rgbaColor) {
        // TODO: should I pay attention to the opacity (a)?
        return this.rgbToHex(rgbaColor);
    }

    nameToHex(name) {
        if (colorKeywords[name]) {
            return (colorKeywords[name][0]).toUpperCase();
        }
        else {
            return undefined;
        }
    }

    nameToRgb(name) {
        if (colorKeywords[name]) {
            return colorKeywords[name][1];
        }
        else {
            return undefined;
        }
    }

    // Ranges of Color
    shades(color) {
    }

    tints(color) {
    }

    tones(color) {
    }

    lighten(color, percentage) {

    }

    darken(color, percentage) {
    }

    mute(color, percentage) {

    }

    // Mix and Matching
    mix(color1, color2) {

    }

    difference(color1, color2) {

    }

    compliment(color) {
    }


}

const colorTheory = new ColorTheory();

export { colorTheory } ;
