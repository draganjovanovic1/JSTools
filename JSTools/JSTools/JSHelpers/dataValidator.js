var dataValidator = (function () {
    "use strict";
    function dataValidator() { }
    dataValidator.prototype.validanBroj = function (vrednost) {
        if (typeof vrednost !== "undefined" && vrednost !== null) {
            vrednost = vrednost.replace(',', '.');
            return !isNaN(parseFloat(vrednost)) && isFinite(vrednost);
        }
        return false;
    };
    dataValidator.prototype.validanDatum = function (vrednost) {
        if (Object.prototype.toString.call(vrednost) === "[object Date]")
            return !isNaN(vrednost.getTime());
        return false;
    };
    dataValidator.prototype.validanPIB = function (pib) {
        if (pib.length === 9 && dataValidator.prototype.validanBroj(pib)) {
            var suma = 10;
            for (var i = 0; i < 8; i++) {
                suma = (suma + parseInt(pib.charAt(i), 10)) % 10;
                suma = (suma === 0 ? 10 : suma) * 2 % 11;
            }
            suma = (11 - suma) % 10;
            return parseInt(pib.charAt(8), 10) === suma;
        }
        return false;
    };
    dataValidator.prototype.validanMB = function (mb) {
        return mb.length === 8 &&
            dataValidator.prototype.validanBroj(mb) &&
            parseInt(mb.charAt(7), 10) === mod11(mb.substring(0, 7), function (kb) { return kb > 9 ? 0 : kb; });
    };
    dataValidator.prototype.validanJMBG = function (jmbg) {
        if (typeof jmbg !== "undefined" && jmbg !== null &&
            jmbg.length === 13 && dataValidator.prototype.validanBroj(jmbg)) {
            var dan = parseInt(jmbg.substring(0, 2), 10);
            var mesec = parseInt(jmbg.substring(2, 4), 10) - 1;
            var godina = parseInt("2" + jmbg.substring(4, 7),10);
            if (dataValidator.prototype.validanDatum(new Date(godina, mesec, dan))) {
                return /^60|66$/.test(jmbg.substring(7, 9)) ||
                    parseInt(jmbg.charAt(12), 10) === mod11(jmbg.substring(0, 12), function (kb) { return kb === 11 ? 0 : ((kb === 10) ? "X" : kb); });
            }
        }
        return false;
    };
    dataValidator.prototype.validanEmail = function (email) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    };
    dataValidator.prototype.validanMod97 = function (broj, validation_error_callback) {
        if (typeof validation_error_callback !== "undefined") {
            var validation_errors = [];
            if (broj.length <= 2)
                validation_errors.push("Nevalidna dužina broja");
            for (var i = 0; i < broj.length; i++) {
                var validno = false;
                var slovo = broj.charAt(i);
                if (slovoUBroj(slovo) !== null) validno = true;
                else validation_errors.push("Nevalidan znak: (\'" + slovo + "\') na poziciji " + (i + 1).toString());
            }
            if (validation_errors.length !== 0) validation_error_callback(validation_errors);
        }
        return dataValidator.prototype.kontrolniBrojMod97(broj.substring(2)) === broj.substring(0, 2);
    };
    dataValidator.prototype.kontrolniBrojMod97 = function (broj) {
        if (typeof broj === "undefined" || broj === null || broj === "") return null;
        var zakontrolu = "";
        for (var i = 0; i < broj.length; i++) {
            var vrednost = slovoUBroj(broj.charAt(i));
            if (vrednost === null) return null;
            else zakontrolu += vrednost.toString();
        }
        if (dataValidator.prototype.validanBroj(zakontrolu)) {
            var rez = mod97(zakontrolu).toString();
            return rez.length === 1 ? rez = "0" + rez : rez;
        }
        else return null;
    };
    dataValidator.prototype.kontrolniBrojMod22 = function (broj) {
        return (dataValidator.prototype.validanBroj(broj)) ? mod22(broj).toString() : null;
    };
    dataValidator.prototype.kontrolniBrojMod11 = function (broj, dodatni_uslov) {
        return (dataValidator.prototype.validanBroj(broj)) ? mod11(broj, dodatni_uslov).toString() : null;
    };
    dataValidator.prototype.kontrolniBrojMod11Sub = function (broj, dodatni_uslov) {
        return (dataValidator.prototype.validanBroj(broj)) ? mod11sub(broj, dodatni_uslov).toString() : null;
    };
    function slovoUBroj(slovo) {
        return slovo === "-" ? "" : 
            ((dataValidator.prototype.validanBroj(slovo)) ? slovo : (_slova_za_kontrolni_broj[slovo] || null));
    }
    function mod97(br) {
        var kb = 0, os = 100;
        for (var x = br.length - 1; x >= 0; x--) {
            kb = (kb + (os * parseInt(br.charAt(x), 10))) % 97;
            os = (os * 10) % 97;
        }
        kb = 98 - kb;
        return kb;
    }
    function mod22(br) {
        var kb = mod11sub(br);
        return kb > 9 ? kb -= 10 : kb;
    }
    function mod11(br, dodatni_uslov) {
        var kb = 0;
        for (var i = br.length - 1, mnozilac = 2; i >= 0; i--) {
            kb += parseInt(br.charAt(i), 10) * mnozilac;
            mnozilac = mnozilac === 7 ? 2 : mnozilac + 1;
        }
        kb = 11 - (kb % 11);
        return (typeof dodatni_uslov === "undefined") ? kb : dodatni_uslov(kb);
    }
    function mod11sub(br, dodatni_uslov) {
        var kb = 0;
        for (var i = 0, mnozilac = 7; i < br.length; i++) {
            kb += parseInt(br.charAt(i), 10) * mnozilac;
            mnozilac = mnozilac === 2 ? 7 : mnozilac - 1;
        }
        kb = 11 - (kb % 11);
        return (typeof dodatni_uslov === "undefined") ? kb : dodatni_uslov(kb);
    }
    var _slova_za_kontrolni_broj = {
        "A": 10, "B": 11, "C": 12, "D": 13, "E": 14, "F": 15, "G": 16, "H": 17, "I": 18, "J": 19,
        "K": 20, "L": 21, "M": 22, "N": 23, "O": 24, "P": 25, "Q": 26, "R": 27, "S": 28, "T": 29,
        "U": 30, "V": 31, "W": 32, "X": 33, "Y": 34, "Z": 35
    };
    return dataValidator;
})();
var JMBG = function (jmbg) {
    "use strict";
    var _jmbg, _region, _dan, _mesec, _godina, _rbr, _kontrolni;
    var _validan = dataValidator.prototype.validanJMBG(jmbg);
    if (_validan) {
        _jmbg = jmbg;
        Parse();
    }
    this.pol = function () {
        if (_validan) return _rbr > 500 ? "Z" : "M";
        return null;
    };
    this.region = function () {
        return regioni[_region] || null;
    };
    this.redniBrojRodjenja = function () {
        if (_validan) return _rbr > 499 ? _rbr - 499 : _rbr + 1;
        else return null;
    };
    this.validan = function () {
        return _validan;
    };
    this.datumRodjenja = function () {
        return _validan ? new Date(_godina, _mesec, _dan) : null;
    };
    this.toString = function () {
        return _validan ? _jmbg : null;
    };
    function Parse() {
        _dan = parseInt(_jmbg.substring(0, 2), 10);
        _mesec = parseInt(_jmbg.substring(2, 4), 10) - 1;
        _godina = parseInt(_jmbg.substring(4, 7), 10);
        _region = _jmbg.substring(7, 9);
        _rbr = parseInt(_jmbg.substring(9, 12), 10);
        _kontrolni = parseInt(_jmbg.charAt(12), 10);

        var tekuca_god = new Date().getFullYear() % 1000;
        var tekuci_mil = new Date().getFullYear() - tekuca_god;

        if (_godina > tekuca_god) _godina += tekuci_mil - 1000;
        else _godina += tekuci_mil;
    }
    var regioni = {
        //stranci bez državljanstva bivše SFRJ ili njenih naslednica.
        //(stranci koji su postali državljani SFRJ dobijali su regularan JMBG, a ne ovaj)
        "00": "stranci",
        "01": "stranci u BiH",
        "02": "stranci u Crnoj Gori",
        "03": "stranci u Hrvatskoj",
        "04": "stranci u Makedoniji",
        "05": "stranci u Sloveniji",
        "06": "stranci u Srbiji (bez pokrajina)",
        "07": "stranci",
        "08": "stranci u Vojvodini",
        "09": "stranci na Kosovu",

        //Bosna i Hercegovina
        "10": "Banja Luka",
        "11": "Bihać",
        "12": "Doboj",
        "13": "Goražde",
        "14": "Livno",
        "15": "Mostar",
        "16": "Prijedor",
        "17": "Sarajevo",
        "18": "Tuzla",
        "19": "Zenica",

        //Crna Gora
        "20": "Crna Gora",
        "21": "Podgorica",
        "22": "Crna Gora",
        "23": "Crna Gora",
        "24": "Crna Gora",
        "25": "Crna Gora",
        "26": "Nikšić",
        "27": "Crna Gora",
        "28": "Crna Gora",
        "29": "Pljevlja",

        //Hrvatska
        "30": "Slavonija", //Osijek, Slavonija region
        "31": "Podravina", //Bjelovar, Virovitica, Koprivnica, Pakrac, Podravina region
        "32": "Međimurje", //Varaždin, Međimurje region
        "33": "Zagreb",
        "34": "Karlovac",
        "35": "Lika", //Gospić, Lika region
        "36": "Istra", //Rijeka, Pula, Istra i Primorje region
        "37": "Banovina", //Sisak, Banovina region
        "38": "Dalmacija", //Split, Zadar, Dubrovnik, Dalmacija region
        "39": "Hrvatska", //mešano

        //Makedonija
        "40": "Crna Gora",
        "41": "Bitola",
        "42": "Kumanovo",
        "43": "Ohrid",
        "44": "Prilep",
        "45": "Skopje",
        "46": "Strumica",
        "47": "Tetovo",
        "48": "Veles",
        "49": "Štip",

        //Slovenija (samo 50 je korišćeno)
        "50": "Slovenija",
        "51": "Slovenija",
        "52": "Slovenija",
        "53": "Slovenija",
        "54": "Slovenija",
        "55": "Slovenija",
        "56": "Slovenija",
        "57": "Slovenija",
        "58": "Slovenija",
        "59": "Slovenija",

        //60-69 nije korišćeno 
        //(60 i 66 se koriste u Srbiji za strance na privremenom boravku, ovaj JMBG nije po modulu)
        "60": "stranci na privremenom boravku u R. Srbiji",
        "61": "nepoznato",
        "62": "nepoznato",
        "63": "nepoznato",
        "64": "nepoznato",
        "65": "nepoznato",
        "66": "stranci na privremenom boravku u R. Srbiji",
        "67": "nepoznato",
        "68": "nepoznato",
        "69": "nepoznato",

        //Centralna Srbija
        "70": "Centralna Srbija",
        "71": "Beograd", //(Grad Beograd: Stari Grad, Savski Venac, Voždovac, Vračar, Palilula, Zvezdara, Rakovica, Čukarica, Novi Beograd, Zemun, Mladenovac, Barajevo, Grocka, Obrenovac, Sopot, Lazarevac)
        "72": "Šumadija i Pomoravlje", //(Šumadijski okrug: Aranđelovac, Batočina, Knić, Kragujevac, Rača, Lapovo, Topola), (Pomoravski okrug: Despotovac, Paraćin, Rekovac, Jagodina, Svilajnac, Ćuprija)
        "73": "Niš", //(Nišavski okrug: Aleksinac, Svrljig, Niš, Gadžin Han, Doljevac, Merošina, Ražanj), (Pirotski okrug: Babušnica, Bela Palanka, Dimitrovgrad, Pirot), (Toplički okrug: Blace, Žitorađa, Prokuplje, Kuršumlija)
        "74": "Južna Morava", //(Jablanički okrug: Leskovac, Vlasotince, Medveđa, Lebane, Bojnik, Crna Trava), (Pčinjski okrug: Vranje, Bujanovac, Surdulica, Bosilegrad, Preševo, Trgovište, Vladičin Han)
        "75": "Zaječar", //region (Zaječarski okrug: Zaječar, Boljevac, Knjaževac, Sokobanja), (Borski okrug: Bor, Majdanpek, Kladovo, Negotin)
        "76": "Podunavlje", //(Podunavski okrug: Smederevska Palanka, Velika Plana, Smederevo), (Braničevski okrug: Veliko Gradište, Kučevo, Petrovac na Mlavi, Požarevac, Žagubica, Golubac, Žabari, Malo Crniće)
        "77": "Podrinje i Kolubara", //(Mačvanski okrug: Loznica, Krupanj, Ljubovija, Šabac, Bogatić, Koceljeva, Vladimirci, Mali Zvornik), (Kolubarski okrug: Valjevo, Lajkovac, Ljig, Ub, Osečina, Mionoca)
        "78": "Kraljevo", //(Raški okrug: Kraljevo, Vrnjačka Banja, Novi Pazar, Raška, Tutin), (Moravički okrug: Gornji Milanovac, Čačak, Ivanjica, Lučani), (Rasinski okrug: Aleksandrovac, Brus, Kruševac, Trstenik, Varvarin, Ćićevac)
        "79": "Užice region", //(Zlatiborski okrug: Arilje, Bajina Bašta, Kosjerić, Nova Varoš, Požega, Priboj, Prijepolje, Sjenica, Užice, Čajetina)

        //Autonomna Pokrajina Vojvodina
        "80": "Novi Sad", //(Južnobački okrug: Bač, Bačka Palanka, Bački Petrovac, Vrbas, Žabalj, Novi Sad, Srbobran, Sremski Karlovci, Temerin, Titel, Bečej, Beočin)
        "81": "Sombor", //(Zapadnobački okrug: Apatin, Kula, Odžaci, Sombor)
        "82": "Subotica", //(Severnobački okrug: Bačka Topola, Subotica, Mali Iđoš)
        "83": "Vojvodina",
        "84": "Vojvodina",
        "85": "Zrenjanin", //(Srednjebanatski okrug: Zrenjanin, Nova Crnja, Novi Bečej, Sečanj, Žitište)
        "86": "Pančevo", //(Južnobanatski okrug: Alibunar, Bela Crkva, Vršac, Kovačica, Kovin, Pančevo, Opovo, Plandište)
        "87": "Kikinda", //(Severnobanatski okrug: Ada, Kikinda, Kanjiža, Novi Kneževac, Senta, Čoka)
        "88": "Ruma", //(Sremski okrug: Inđija, Pećinci, Ruma, Sremska Mitrovica, Stara Pazova, Šid, Irig)
        "89": "Sremska Mitrovica", //(Sremski okrug: Inđija, Pećinci, Ruma, Sremska Mitrovica, Stara Pazova, Šid, Irig)

        //Autonomna Pokrajina Kosovo i Metohija
        "90": "Kosovo i Metohija",
        "91": "Priština", //(Kosovski okrug: Priština, Obilić, Podujevo, Štrpce, Lipljan, Glogovac, Kačanik, Kosovo Polje, Uroševac, Štimlje)
        "92": "Kosovska Mitrovica", //(Kosovsko Mitrovački okrug: Kosovska Mitrovica, Zvečan, Leposavić, Zubin Potok, Vučitrn, Srbica)
        "93": "Peć", //(Pećki okrug: Peć, Istok, Klina)
        "94": "Đakovica", //(Pećki okrug: Dečani, Đakovica)
        "95": "Prizren", //(Prizrenski okrug: Gora-Dragaš, Orahovac, Prizren, Suva Reka)
        "96": "Kosovsko Pomoravski okrug", //(Gnjilane, Kosovska Kamenica, Vitina, Novo Brdo)
        "97": "Kosovo i Metohija",
        "98": "Kosovo i Metohija",
        "99": "Kosovo i Metohija"
    };
};
