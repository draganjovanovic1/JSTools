/// <reference path="dataValidator.js" />
var JMBG = (function () {
    "use strict";
    var _jmbg, _region, _validan, _dan, _mesec, _godina, _rbr, _kontrolni;
    function JMBG(jmbg) {
        if (dataValidator.prototype.validanJMBG(jmbg)) {
            _jmbg = jmbg;
            _validan = true;
            new Parse();
        }
    }
    JMBG.prototype.pol = function () {
        if (_validan)
            return _rbr > 500 ? "Z" : "M";
        return null;
    };
    JMBG.prototype.region = function () {
        for (var i = 0; i < 100; i++)
            if (regioni[i][0] === _region)
                return regioni[i][1];
    };
    JMBG.prototype.redniBrojRodjenja = function () {
        if (_validan) return _rbr > 499 ? _rbr - 499 : _rbr + 1;
        else return _rbr;
    };
    JMBG.prototype.validan = function () {
        return _validan;
    };
    JMBG.prototype.datumRodjenja = function () {
        return new Date(_godina, _mesec, _dan);
    };
    JMBG.prototype.toString = function () {
        return _jmbg;
    };
    function Parse() {
        _dan = parseInt(_jmbg.substring(0, 2), 10);
        _mesec = parseInt(_jmbg.substring(2, 4), 10) - 1;
        _godina = parseInt(_jmbg.substring(4, 7), 10);
        _region = _jmbg.substring(7, 9);
        _rbr = parseInt(_jmbg.substring(9, 12), 10);
        _kontrolni = parseInt(_jmbg.substring(12, 13), 10);

        var tekuca_god = new Date().getFullYear() % 1000;
        var tekuci_mil = new Date().getFullYear() - tekuca_god;

        if (_godina > tekuca_god) _godina += tekuci_mil - 1000;
        else _godina += tekuci_mil;
    }
    var regioni = [
            //stranci bez državljanstva bivše SFRJ ili njenih naslednica.
            //(stranci koji su postali državljani SFRJ dobijali su regularan JMBG, a ne ovaj)
            ["00", "stranci"],
            ["01", "stranci u BiH"],
            ["02", "stranci u Crnoj Gori"],
            ["03", "stranci u Hrvatskoj"],
            ["04", "stranci u Makedoniji"],
            ["05", "stranci u Sloveniji"],
            ["06", "stranci u Srbiji (bez pokrajina)"],
            ["07", "stranci"],
            ["08", "stranci u Vojvodini"],
            ["09", "stranci na Kosovu"],

            //Bosna i Hercegovina
            ["10", "Banja Luka"],
            ["11", "Bihać"],
            ["12", "Doboj"],
            ["13", "Goražde"],
            ["14", "Livno"],
            ["15", "Mostar"],
            ["16", "Prijedor"],
            ["17", "Sarajevo"],
            ["18", "Tuzla"],
            ["19", "Zenica"],

            //Crna Gora
            ["20", "Crna Gora"],
            ["21", "Podgorica"],
            ["22", "Crna Gora"],
            ["23", "Crna Gora"],
            ["24", "Crna Gora"],
            ["25", "Crna Gora"],
            ["26", "Nikšić"],
            ["27", "Crna Gora"],
            ["28", "Crna Gora"],
            ["29", "Pljevlja"],

            //Hrvatska
            ["30", "Slavonija"], //Osijek, Slavonija region
            ["31", "Podravina"], //Bjelovar, Virovitica, Koprivnica, Pakrac, Podravina region
            ["32", "Međimurje"], //Varaždin, Međimurje region
            ["33", "Zagreb"],
            ["34", "Karlovac"],
            ["35", "Lika"], //Gospić, Lika region
            ["36", "Istra"], //Rijeka, Pula, Istra i Primorje region
            ["37", "Banovina"], //Sisak, Banovina region
            ["38", "Dalmacija"], //Split, Zadar, Dubrovnik, Dalmacija region
            ["39", "Hrvatska"], //mešano

            //Makedonija
            ["40", "Crna Gora"],
            ["41", "Bitola"],
            ["42", "Kumanovo"],
            ["43", "Ohrid"],
            ["44", "Prilep"],
            ["45", "Skopje"],
            ["46", "Strumica"],
            ["47", "Tetovo"],
            ["48", "Veles"],
            ["49", "Štip"],

            //Slovenija (samo 50 je korišćeno)
            ["50", "Slovenija"],
            ["51", "Slovenija"],
            ["52", "Slovenija"],
            ["53", "Slovenija"],
            ["54", "Slovenija"],
            ["55", "Slovenija"],
            ["56", "Slovenija"],
            ["57", "Slovenija"],
            ["58", "Slovenija"],
            ["59", "Slovenija"],

            //60-69 nije korišćeno 
            //(60 i 66 se koriste u Srbiji za strance na privremenom boravku, ovaj JMBG nije po modulu)
            ["60", "stranci na privremenom boravku u R. Srbiji"],
            ["61", "nepoznato"],
            ["62", "nepoznato"],
            ["63", "nepoznato"],
            ["64", "nepoznato"],
            ["65", "nepoznato"],
            ["66", "stranci na privremenom boravku u R. Srbiji"],
            ["67", "nepoznato"],
            ["68", "nepoznato"],
            ["69", "nepoznato"],

            //Centralna Srbija
            ["70", "Centralna Srbija"],
            ["71", "Beograd"], //(Grad Beograd: Stari Grad, Savski Venac, Voždovac, Vračar, Palilula, Zvezdara, Rakovica, Čukarica, Novi Beograd, Zemun, Mladenovac, Barajevo, Grocka, Obrenovac, Sopot, Lazarevac)
            ["72", "Šumadija i Pomoravlje"], //(Šumadijski okrug: Aranđelovac, Batočina, Knić, Kragujevac, Rača, Lapovo, Topola), (Pomoravski okrug: Despotovac, Paraćin, Rekovac, Jagodina, Svilajnac, Ćuprija)
            ["73", "Niš"], //(Nišavski okrug: Aleksinac, Svrljig, Niš, Gadžin Han, Doljevac, Merošina, Ražanj), (Pirotski okrug: Babušnica, Bela Palanka, Dimitrovgrad, Pirot), (Toplički okrug: Blace, Žitorađa, Prokuplje, Kuršumlija)
            ["74", "Južna Morava"], //(Jablanički okrug: Leskovac, Vlasotince, Medveđa, Lebane, Bojnik, Crna Trava), (Pčinjski okrug: Vranje, Bujanovac, Surdulica, Bosilegrad, Preševo, Trgovište, Vladičin Han)
            ["75", "Zaječar"], //region (Zaječarski okrug: Zaječar, Boljevac, Knjaževac, Sokobanja), (Borski okrug: Bor, Majdanpek, Kladovo, Negotin)
            ["76", "Podunavlje"], //(Podunavski okrug: Smederevska Palanka, Velika Plana, Smederevo), (Braničevski okrug: Veliko Gradište, Kučevo, Petrovac na Mlavi, Požarevac, Žagubica, Golubac, Žabari, Malo Crniće)
            ["77", "Podrinje i Kolubara"], //(Mačvanski okrug: Loznica, Krupanj, Ljubovija, Šabac, Bogatić, Koceljeva, Vladimirci, Mali Zvornik), (Kolubarski okrug: Valjevo, Lajkovac, Ljig, Ub, Osečina, Mionoca)
            ["78", "Kraljevo"], //(Raški okrug: Kraljevo, Vrnjačka Banja, Novi Pazar, Raška, Tutin), (Moravički okrug: Gornji Milanovac, Čačak, Ivanjica, Lučani), (Rasinski okrug: Aleksandrovac, Brus, Kruševac, Trstenik, Varvarin, Ćićevac)
            ["79", "Užice region"], //(Zlatiborski okrug: Arilje, Bajina Bašta, Kosjerić, Nova Varoš, Požega, Priboj, Prijepolje, Sjenica, Užice, Čajetina)

            //Autonomna Pokrajina Vojvodina
            ["80", "Novi Sad"], //(Južnobački okrug: Bač, Bačka Palanka, Bački Petrovac, Vrbas, Žabalj, Novi Sad, Srbobran, Sremski Karlovci, Temerin, Titel, Bečej, Beočin)
            ["81", "Sombor"], //(Zapadnobački okrug: Apatin, Kula, Odžaci, Sombor)
            ["82", "Subotica"], //(Severnobački okrug: Bačka Topola, Subotica, Mali Iđoš)
            ["83", "Vojvodina"],
            ["84", "Vojvodina"],
            ["85", "Zrenjanin"], //(Srednjebanatski okrug: Zrenjanin, Nova Crnja, Novi Bečej, Sečanj, Žitište)
            ["86", "Pančevo"], //(Južnobanatski okrug: Alibunar, Bela Crkva, Vršac, Kovačica, Kovin, Pančevo, Opovo, Plandište)
            ["87", "Kikinda"], //(Severnobanatski okrug: Ada, Kikinda, Kanjiža, Novi Kneževac, Senta, Čoka)
            ["88", "Ruma"], //(Sremski okrug: Inđija, Pećinci, Ruma, Sremska Mitrovica, Stara Pazova, Šid, Irig)
            ["89", "Sremska Mitrovica"], //(Sremski okrug: Inđija, Pećinci, Ruma, Sremska Mitrovica, Stara Pazova, Šid, Irig)

            //Autonomna Pokrajina Kosovo i Metohija
            ["90", "Kosovo i Metohija"],
            ["91", "Priština"], //(Kosovski okrug: Priština, Obilić, Podujevo, Štrpce, Lipljan, Glogovac, Kačanik, Kosovo Polje, Uroševac, Štimlje)
            ["92", "Kosovska Mitrovica"], //(Kosovsko Mitrovački okrug: Kosovska Mitrovica, Zvečan, Leposavić, Zubin Potok, Vučitrn, Srbica)
            ["93", "Peć"], //(Pećki okrug: Peć, Istok, Klina)
            ["94", "Đakovica"], //(Pećki okrug: Dečani, Đakovica)
            ["95", "Prizren"], //(Prizrenski okrug: Gora-Dragaš, Orahovac, Prizren, Suva Reka)
            ["96", "Kosovsko Pomoravski okrug"], //(Gnjilane, Kosovska Kamenica, Vitina, Novo Brdo)
            ["97", "Kosovo i Metohija"],
            ["98", "Kosovo i Metohija"],
            ["99", "Kosovo i Metohija"]
    ];
    return JMBG;
})();