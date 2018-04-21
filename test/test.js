'use strict';

import {colorTheory as ct} from '../color-theory.js';
var expect = require('chai').expect;

describe('Color Converters', function() {
    describe('Convert to Hex', function() {

        it('should convert from RGB to Hex', function() {
            let result1 = ct.rgbToHex('255, 99, 71');
            let result2 = ct.rgbToHex('000, 000, 0');
            let result3 = ct.rgbToHex('255, 255, 255');
            let result4 = ct.rgbToHex('010, 010, 010');

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
            expect(result1).to.equal('0,0,0');
            expect(result2).to.equal('255,255,255');
            expect(result3).to.equal('174,117,64');
            expect(result4).to.equal('51,188,4');
        });


        it('should convert color keywords to rgb', function(){
            let result1 = ct.nameToRgb('indigo');
            let result2 = ct.nameToRgb('lavender');
            let result3 = ct.nameToRgb('lavenderblush');
            let result4 = ct.nameToRgb('mediumturquoise');
            let result5 = ct.nameToRgb('wawawawa');


            expect(result1).to.be.a('string');
            expect(result1).to.equal('75,0,130');
            expect(result2).to.equal('230,230,250');
            expect(result3).to.equal('255,240,245');
            expect(result4).to.equal('72,209,204');
            expect(result5).to.equal(undefined);
        });
    });
});

describe('Mix and Matching' , function() {
    it('should add two colors', function () {
        let result1 = ct.mix('#010101', '#020202');
        let result2 = ct.mix('#EEEEEE', '#FFFFFF');

        expect(result1).to.be.a('string');
        expect(result1).to.equal('#030303');
        expect(result2).to.equal('#FFFFFF');

    });

    it('should add two colors and return hex format if the first color is in hex format', function () {
        let result1 = ct.mix('#010101', '100,100,100');

        expect(result1).to.be.a('string');
        expect(result1).to.equal('#656565');
    });

    it('should add two colors and return rgb format if the first color is in rgb format', function () {
        let result1 = ct.mix('100,100,100', '#010101');
        let result2 = ct.mix('200, 50, 155', '100,100,100');

        expect(result1).to.be.a('string');
        expect(result1).to.equal('101,101,101');
        expect(result2).to.equal('255,150,255');
    });

    it('should return the complimentary color', function() {
        let result1 = ct.compliment('113,52,78');
        let result2 = ct.compliment('#DDDDDD');

        expect(result1).to.be.a('string');
        expect(result1).to.equal('142,203,177');
        expect(result2).to.equal('#222222');
    });
});

describe('Helper Methods' , function() {
    it('should separate the rgb channels into an array', function() {
        let result1 = ct.splitChannels('#010101');
        let result2 = ct.splitChannels('002,34,234');
        let result3 = ct.splitChannels('020,44,104');
        let result4 = ct.splitChannels('#FFCCA3');

        expect(result1).to.be.an('Array');
        expect(result1).to.deep.equal(['01','01','01']);
        expect(result2).to.deep.equal(['002','34','234']);
        expect(result3).to.deep.equal(['020','44','104']);
        expect(result4).to.deep.equal(['FF','CC','A3']);
    });

});

describe('Lighten Methods' , function() {
    it('should lighten the color based on percentage provided', function() {
        let result1 = ct.lighten('113, 52, 78', 40);
        let result2 = ct.lighten('13, 2, 8', 95);
        let result3 = ct.lighten('#FFFFFF', 95);

        expect(result1).to.be.a('string');
        expect(result1).to.equal('170,109,135');
        expect(result2).to.equal('243,232,238');
        expect(result3).to.equal('#FFFFFF');
    });

    it('should lighten the color by 50% if no percentage was provided', function() {
        let result1 = ct.lighten('113, 52, 78');

        expect(result1).to.be.a('string');
        expect(result1).to.equal('184,123,149');

    });

     it('should return an array of tints for specified color', function() {
        let result1 = ct.tints('113, 52, 78');

        expect(result1).to.be.an('Array');
        expect(result1).to.deep.equal(['113,52,78', '127,66,92', '141,80,106', '156,95,121','170,109,135','184,123,149','198,137,163','212,151,177','227,166,192','241,180,206','255,194,220']);

    });

});

describe('Darken Methods' , function() {
    it('should darken the color based on percentage provided', function() {
        let result1 = ct.darken('113, 52, 78', 40);
        let result2 = ct.darken('0, 1, 0', 20);
        let result3 = ct.darken('#FFCCA3', 30);

        expect(result1).to.be.a('string');
        expect(result1).to.equal('92,31,57');
        expect(result2).to.equal('0,1,0');
        expect(result3).to.equal('#CE9B72');
    });

    it('should darken the color by 50% if no percentage was provided', function() {
        let result1 = ct.darken('113, 52, 78');

        expect(result1).to.be.a('string');
        expect(result1).to.equal('87,26,52');
    });

    it('should return an array of shades for specified color', function() {
        let result1 = ct.shades('113, 52, 78');

        expect(result1).to.be.an('Array');
        expect(result1).to.deep.equal(['113,52,78', '108,47,73', '103,42,68', '97,36,62','92,31,57','87,26,52','82,21,47','77,16,42','71,10,36','66,5,31','61,0,26']);

    });

});

describe('Mute or Desaturate Methods' , function() {});



