/// <reference path="../external_js/qunit.js" />
/// <reference path="../JSHelpers/dataValidator.js" />

test("dataValidator.validanBroj", function () {
    var valid_broj = "123456.33";
    var invalid_broj = "12345ss6.33";

    strictEqual(dataValidator.prototype.validanBroj(valid_broj), true, "Ispravan broj");
    strictEqual(dataValidator.prototype.validanBroj(invalid_broj), false, "Neispravan broj");
});
test("dataValidator.validanDatum", function () {
    var valid_datum = new Date(2012, 12, 25);
    var invalid_datum = "2012.12.25";

    strictEqual(dataValidator.prototype.validanDatum(valid_datum), true, "Date objekat");
    strictEqual(dataValidator.prototype.validanDatum(invalid_datum), false, "String objekat");
});
test("dataValidator.validanPIB", function () {
    var valid_pib = "100000049";
    var invalid_pib = "100000045";

    strictEqual(dataValidator.prototype.validanPIB(valid_pib), true, "Ispravan PIB");
    strictEqual(dataValidator.prototype.validanPIB(invalid_pib), false, "Neispravan PIB");
});
test("dataValidator.validanMB", function () {
    var valid_mb = "60221502";
    var invalid_mb = "60221505";

    strictEqual(dataValidator.prototype.validanMB(valid_mb), true, "Ispravan MB");
    strictEqual(dataValidator.prototype.validanMB(invalid_mb), false, "Neispravan MB");
});
test("dataValidator.validanJMBG", function () {
    var valid_jmbg = "2507984770027";
    var invalid_jmbg = "2507984770026";

    strictEqual(dataValidator.prototype.validanJMBG(valid_jmbg), true, "Ispravan JMBG");
    strictEqual(dataValidator.prototype.validanJMBG(invalid_jmbg), false, "Neispravan JMBG");
});
test("dataValidator.validanEmail", function () {
    var valid_email = "test@testcorp.com";
    var invalid_email = "test@com";

    strictEqual(dataValidator.prototype.validanEmail(valid_email), true, "Ispravan email");
    strictEqual(dataValidator.prototype.validanEmail(invalid_email), false, "Neispravan email");
});
test("dataValidator.validanMod97", function () {
    var broj = "1150000000000101";
    var valid_kontrolni = "52";
    var invalid_kontrolni = "46";

    strictEqual(dataValidator.prototype.validanMod97(broj, valid_kontrolni), true, "Ispravan kontrolni broj");
    strictEqual(dataValidator.prototype.validanMod97(broj, invalid_kontrolni), false, "Neispravan kontrolni broj");
});
test("dataValidator.kontrolniBrojMod97", function () {
    var broj = "1150000000000001";
    var valid_kontrolni = "61";
    var invalid_kontrolni = "66";

    strictEqual(dataValidator.prototype.kontrolniBrojMod97(broj), valid_kontrolni, "Ispravan kontrolni broj");
    notEqual(dataValidator.prototype.kontrolniBrojMod97(broj), invalid_kontrolni, "Neispravan kontrolni broj");
    strictEqual(dataValidator.prototype.kontrolniBrojMod97(broj).length, 2, "Dužina kontrolnog broja = 2");
});
test("dataValidator.kontrolniBrojMod22", function () {
    var broj = "178664539";
    var valid_kontrolni = "5";
    var invalid_kontrolni = "3";

    strictEqual(dataValidator.prototype.kontrolniBrojMod22(broj), valid_kontrolni, "Ispravan kontrolni broj");
    notEqual(dataValidator.prototype.kontrolniBrojMod22(broj), invalid_kontrolni, "Neispravan kontrolni broj");
    strictEqual(dataValidator.prototype.kontrolniBrojMod22(broj).length, 1, "Dužina kontrolnog broja = 1");
});