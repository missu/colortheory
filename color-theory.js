'use strict';

import {default as colorKeywords} from './util/color-keywords.js';

class ColorTheory {
    constructor() {
    }

    // Converting
    hexToRgb(hexColor) {
        if ((/\,/g).test(hexColor)) {
            return hexColor;
        }
        let color = this.splitChannels(hexColor);

        return `${parseInt(color[0], 16)},${parseInt(color[1], 16)},${parseInt(color[2], 16)}`;
    }

    rgbToHex(rgbColor) {
        if (rgbColor[0] === "#") {
            return rgbColor;
        }
        let color = this.splitChannels(rgbColor)
        let red = hex_it(color[0]);
        let green = hex_it(color[1]);
        let blue = hex_it(color[2]);
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
        let isRgb = null;

        if((/\,/g).test(color)) {
            isRgb = true;
        }
        else if (color[0] === '#') {
            isRgb = false;
            color = this.hexToRgb(color);
        }
        else { return null;}

        let shades = [];

        for (let i = 0, percentage = 0; i <= 10; i++, percentage+=10) {
            shades.push(this.darken(color, percentage));
        }
        if (isRgb) {
            return shades;
        }
        else {
            return shades.map((element)=>{
                return `#${parseInt(element, 10).toString(16).toUpperCase()}`;
            });
        }
    }

    tints(color) {
        let isRgb = null;

        if((/\,/g).test(color)) {
            isRgb = true;
        }
        else if (color[0] === '#') {
            isRgb = false;
            color = this.hexToRgb(color);
        }
        else { return null;}

        let tints = [];

        for (let i = 0, percentage = 0; i <= 10; i++, percentage+=10) {
            tints.push(this.lighten(color, percentage));
        }
        if (isRgb) {
            return tints;
        }
        else {
            return tints.map((element)=>{
                return `#${parseInt(element, 10).toString(16).toUpperCase()}`;
            });
        }
    }

    tones(color) {
        // adding gray
        // return an array
    }

    lighten(color, percentage) {
        let isRgb = null;

        if((/\,/g).test(color)) {
            isRgb = true;
        }
        else if (color[0] === '#') {
            isRgb = false;
            color = this.hexToRgb(color);
        }
        else { return null;}
        percentage = percentage !== undefined ? percentage : 50;
        let channels = this.splitChannels(color);
        let max = Math.max(...channels)
        let increment = Math.round((255-max)*(percentage/100));

        let lighterColor = channels.map((element) => {
            return element >= 255 ? element : parseInt(element, 10) + increment;
        });

        if (isRgb) {
            return `${lighterColor[0]},${lighterColor[1]},${lighterColor[2]}`;
        }
        else {
            lighterColor = lighterColor.map((element) => {
                return parseInt(element, 10).toString(16).toUpperCase();
            });
            return `#${lighterColor[0]}${lighterColor[1]}${lighterColor[2]}`;
        }

    }

    darken(color, percentage) {
        let isRgb = null;

        if((/\,/g).test(color)) {
            isRgb = true;
        }
        else if (color[0] === '#') {
            isRgb = false;
            color = this.hexToRgb(color);
        }
        else { return null;}
        percentage = percentage !== undefined ? percentage : 50;
        let channels = this.splitChannels(color);
        let min = Math.min(...channels)
        //let decriment = Math.round((255-min)*(percentage/100));
        let decriment = Math.round(min*(percentage/100));

        let darkerColor = channels.map((element) => {
            return element <= 0 ? 0 : parseInt(element, 10) - decriment;
        });

        if (isRgb) {
            return `${darkerColor[0]},${darkerColor[1]},${darkerColor[2]}`;
        }
        else {
            darkerColor = darkerColor.map((element) => {
                return parseInt(element, 10).toString(16).toUpperCase();
            });
            return `#${darkerColor[0]}${darkerColor[1]}${darkerColor[2]}`;
        }
    }

    mute(color, percentage) {
        // adding gray
        // test whether color is hex or rgb
        // convert to rgb for addition
        // split the channel and add separatly
        let delta = Math.round(128*percentage);

    }

    // Mix and Matching
    mix(color1, color2) {
        // test whether color is hex or rgb
        // convert to rgb for addition
        // split the channel and add separatly
        // if both colors are rbg, return rgb
        // other wise return as a hex

        let self = this;
        let returnFormatHex = (/\,/g).test(color1) ? false : true;
        let temp1 = processColorChannel(color1, this);
        let temp2 = processColorChannel(color2, this);
        let red = 0;
        let green = 0;
        let blue = 0;

        function checkRange(num) {
            return num > 255 ? 255 : num;
        }

        function checkHexLength(num) {
            return num.toString().length < 2 ? "0" + num : num;
        }

        function processColorChannel(color, self) {
            if ( (/\,/g).test(color) ) {
                let rgb = self.splitChannels(color);
                return rgb.map((element) => {return parseInt(element, 10);});
            }
            else if (color[0] === '#') {
                let hex = self.splitChannels(color);
                 return hex.map((element) => {return parseInt(element, 16);});
            }

            return null;
        }


        if (returnFormatHex) {
            red = temp1[0] + temp2[0];
            green = temp1[1] + temp2[1];
            blue = temp1[2] + temp2[2];

            red = checkHexLength(checkRange(red)).toString(16).toUpperCase();
            green = checkHexLength(checkRange(green)).toString(16).toUpperCase();
            blue = checkHexLength(checkRange(blue)).toString(16).toUpperCase();

            return `#${red}${green}${blue}`;
        }
        else {
            red = temp1[0] + temp2[0];
            green = temp1[1] + temp2[1];
            blue = temp1[2] + temp2[2];

            return `${checkRange(red)},${checkRange(green)},${checkRange(blue)}`;
        }
    }

    difference(color1, color2) {

    }

    compliment(color) {
        if ( (/\,/g).test(color) ) {
            let rgb = this.splitChannels(color);
            rgb = rgb.map((element) => {
                return Math.abs(parseInt(element, 10) - 255);
            });

            return `${rgb[0]},${rgb[1]},${rgb[2]}`;
        }
        else if (color[0] === '#') {
            let hex = this.splitChannels(color);
            hex = hex.map((element) => {
                return  (Math.abs(parseInt(element, 16) - 255)).toString(16);
            });

            return `#${hex[0]}${hex[1]}${hex[2]}`;
        }

        return null;
    }

    splitChannels(color) {
        if (color[0] === "#") {
            return [color.slice(1,3), color.slice(3,5), color.slice(5,7)];
        }
        else {
            let temp = color.match(/^(\d+),\s*(\d+),\s*(\d+)/);

            return [temp[1], temp[2], temp[3]];
        }
    }



}

const colorTheory = new ColorTheory();

export { colorTheory } ;
