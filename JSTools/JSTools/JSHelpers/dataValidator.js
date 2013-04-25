var dataValidator = (function () {
    "use strict";
    function dataValidator() { }
    dataValidator.prototype.validanBroj = function (vrednost) {
        vrednost = vrednost.replace(',', '.');
        return !isNaN(parseFloat(vrednost)) && isFinite(vrednost);
    };
    dataValidator.prototype.validanDatum = function (vrednost) {
        if (Object.prototype.toString.call(vrednost) === "[object Date]") {
            if (isNaN(vrednost.getTime())) return false;
            else return true;
        }
        else return false;
    };
    dataValidator.prototype.validanPIB = function (pib) {
        var rez = false;
        if (pib.length === 9 && dataValidator.prototype.validanBroj(pib)) {
            var suma = 10;
            for (var i = 0; i < 8; i++) {
                suma = (suma + parseInt(pib.substring(i, i + 1), 10)) % 10;
                if (suma === 0) suma = 10;
                suma = suma * 2 % 11;
            }
            suma = (11 - suma) % 10;
            if (parseInt(pib.substring(8, 9), 10) === suma) rez = true;
            else rez = false;
        }
        else rez = false;
        return rez;
    };
    dataValidator.prototype.validanMB = function (mb) {
        var rez = false;
        if (mb.length === 8 && dataValidator.prototype.validanBroj(mb)) {
            var suma = 0;
            for (var i = 0; i < 7; i++) {
                if (i === 0 || i === 6) suma += parseInt(mb.substring(i, i + 1), 10) * 2;
                if (i === 1) suma += parseInt(mb.substring(i, i + 1), 10) * 7;
                if (i === 2) suma += parseInt(mb.substring(i, i + 1), 10) * 6;
                if (i === 3) suma += parseInt(mb.substring(i, i + 1), 10) * 5;
                if (i === 4) suma += parseInt(mb.substring(i, i + 1), 10) * 4;
                if (i === 5) suma += parseInt(mb.substring(i, i + 1), 10) * 3;
            }
            var ost = suma % 11;
            var raz = 11 - ost;
            if (raz > 9) raz = 0;
            if (parseInt(mb.substring(7, 8), 10) === raz) rez = true;
            else rez = false;
        }
        else rez = false;
        return rez;
    };
    dataValidator.prototype.validanJMBG = function (jmbg) {
        var rez = false;
        if (jmbg !== undefined && jmbg !== null &&
            jmbg.length === 13 && dataValidator.prototype.validanBroj(jmbg)) {
            var dan = jmbg.substring(0, 2);
            var mesec = jmbg.substring(2, 4);
            var godina = "2" + jmbg.substring(4, 7);
            if (!dataValidator.prototype.validanDatum(new Date(godina, mesec, dan))) rez = false;
            else {
                if (jmbg.substring(7, 9) === "66" || jmbg.substring(7, 9) === "60") rez = true;
                else {
                    var suma = 0;

                    for (var i = 0; i < 12; i++) {
                        if (i === 0 || i === 6) suma += parseInt(jmbg.substring(i, i + 1), 10) * 7;
                        if (i === 1 || i === 7) suma += parseInt(jmbg.substring(i, i + 1), 10) * 6;
                        if (i === 2 || i === 8) suma += parseInt(jmbg.substring(i, i + 1), 10) * 5;
                        if (i === 3 || i === 9) suma += parseInt(jmbg.substring(i, i + 1), 10) * 4;
                        if (i === 4 || i === 10) suma += parseInt(jmbg.substring(i, i + 1), 10) * 3;
                        if (i === 5 || i === 11) suma += parseInt(jmbg.substring(i, i + 1), 10) * 2;
                    }
                    var ost = suma % 11;
                    var raz = 11 - ost;
                    if (ost === 1) rez = false;
                    else {
                        if (ost === 0 && parseInt(jmbg.substring(12, 13), 10) === 0) rez = true;
                        else {
                            if (ost < 11 && ost > 1 && parseInt(jmbg.substring(12, 13), 10) === raz) rez = true;
                            else rez = false;
                        }
                    }
                }
            }
        }
        else rez = false;
        return rez;
    };
    dataValidator.prototype.validanEmail = function (email) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    };
    dataValidator.prototype.validanMod97 = function (broj) {
        if (broj.length > 2)
            return dataValidator.prototype.kontrolniBrojMod97(broj.substring(2)) === broj.substring(0, 2);
        return false;
    };
    dataValidator.prototype.kontrolniBrojMod97 = function (broj) {
        if (broj === undefined || broj === null || broj === "") return null;
        var zakontrolu = "";
        for (var i = 0; i < broj.length; i++) {
            var vrednost = slovoUBroj(broj.substring(i, i + 1));
            if (vrednost === null) return null;
            else zakontrolu += vrednost.toString();
        }
        if (dataValidator.prototype.validanBroj(zakontrolu)) {
            var rez = mod97(zakontrolu);
            return rez.length === 1 ? rez = "0" + rez.toString() : rez.toString();
        }
        else return null;
    };
    dataValidator.prototype.kontrolniBrojMod22 = function (broj) {
        if (broj === undefined || broj === null || broj === "") return null;
        if (dataValidator.prototype.validanBroj(broj)) {
            var rez = mod22(broj);
            return rez.toString();
        }
        else return null;
    };
    dataValidator.prototype.mod97ValidniZnakovi = function myfunction() {
        var rez = [];
        for (var i = 0; i < _slova_za_kontrolni_broj.length; i++)
            rez.push(_slova_za_kontrolni_broj[i][0]);
        return rez;
    };
    function slovoUBroj(slovo) {
        for (var i = 0; i < _slova_za_kontrolni_broj.length; i++)
            if (_slova_za_kontrolni_broj[i][0] === slovo) {
                return _slova_za_kontrolni_broj[i][1];
                break;
            }
        if (slovo === "-") return "";
        else return null;
    }
    function mod97(br) {
        var c, kb = 0;
        var os = 100;
        for (var x = br.length - 1; x >= 0; x--) {
            c = parseInt(br.charAt(x), 10);
            kb = (kb + (os * c)) % 97;
            os = (os * 10) % 97;
        }
        kb = 98 - kb;
        return kb;
    }
    function mod22(br) {
        var c, x, y, kb = 0;
        for (y = 7, x = 0; x < br.length; x++) {
            c = parseInt(br.charAt(x), 10);
            kb = kb + (c * y);
            y--;
            if (y === 1) y = 7;
        }
        kb = 11 - (kb % 11);
        if (kb > 9) kb = kb - 10;
        return kb;
    }
    var _slova_za_kontrolni_broj = [
            ['0', 0], ['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9],
            ['A', 10], ['B', 11], ['C', 12], ['D', 13], ['E', 14], ['F', 15], ['G', 16], ['H', 17], ['I', 18], ['J', 19],
            ['K', 20], ['L', 21], ['M', 22], ['N', 23], ['O', 24], ['P', 25], ['Q', 26], ['R', 27], ['S', 28], ['T', 29],
            ['U', 30], ['V', 31], ['W', 32], ['X', 33], ['Y', 34], ['Z', 35]
    ];
    return dataValidator;
})();