'use strict';

import {colorTheory as ct} from '../color-theory.js';
var expect = require('chai').expect;

describe('Color Converters', function() {
    describe('Convert to Hex', function() {

        it('should convert from RGB to Hex', function() {
            let result1 = ct.rgbToHex('rgb(255, 99, 71)');
            let result2 = ct.rgbToHex('rgb(000, 000, 0)');
            let result3 = ct.rgbToHex('rgb(255, 255, 255)');
            let result4 = ct.rgbToHex('rgb(010, 010, 010)');

            expect(result1).to.be.a('string');
            expect(result1).to.equal('#FF6347');
            expect(result2).to.equal('#000000');
            expect(result3).to.equal('#FFFFFF');
            expect(result4).to.equal('#0A0A0A');
        });

        it('should convert rgba to hex', function() {
        });

        it('should convert color keywords to hex', function() {
            let result1 = ct.nameToHex('deeppink');
            let result2 = ct.nameToHex('darkslateblue');
            let result3 = ct.nameToHex('dodgerblue');
            let result4 = ct.nameToHex('lemonchiffon');
            let result5 = ct.nameToHex('wawawawa');


            expect(result1).to.be.a('string');
            expect(result1).to.equal('#FF1493');
            expect(result2).to.equal('#483D8B');
            expect(result3).to.equal('#1E90FF');
            expect(result4).to.equal('#FFFACD');
            expect(result5).to.equal(undefined);
        });
    });

    describe('Convert to RGB', function() {
        it('should convert from hex to RGB', function() {
            let result1 = ct.hexToRgb('#000000');
            let result2 = ct.hexToRgb('#FFFFFF');
            let result3 = ct.hexToRgb('#ae7540');
            let result4 = ct.hexToRgb('#33bc04');

            expect(result1).to.be.a('string');
            expect(result1).to.equal('rgb(0,0,0)');
            expect(result2).to.equal('rgb(255,255,255)');
            expect(result3).to.equal('rgb(174,117,64)');
            expect(result4).to.equal('rgb(51,188,4)');
        });


        it('should convert color keywords to rgb', function(){
            let result1 = ct.nameToRgb('indigo');
            let result2 = ct.nameToRgb('lavender');
            let result3 = ct.nameToRgb('lavenderblush');
            let result4 = ct.nameToRgb('mediumturquoise');
            let result5 = ct.nameToRgb('wawawawa');


            expect(result1).to.be.a('string');
            expect(result1).to.equal('rgb(75,0,130)');
            expect(result2).to.equal('rgb(230,230,250)');
            expect(result3).to.equal('rgb(255,240,245)');
            expect(result4).to.equal('rgb(72,209,204)');
            expect(result5).to.equal(undefined);
        });
    });

    describe('Convert K' , function() {});

});

