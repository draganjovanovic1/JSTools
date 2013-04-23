/// <reference path="../JSHelpers/dataConvert.js" />
/// <reference path="../JSHelpers/dataValidator.js" />
/// <reference path="../JSHelpers/JMBG.js" />
/// <reference path="../external_js/qunit.js" />

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

    strictEqual(dataValidator.prototype.validanPIB(valid_pib), true, "Validan PIB");
    strictEqual(dataValidator.prototype.validanPIB(invalid_pib), false, "Nevalidan PIB");
});
test("dataValidator.validanMB", function () {
    var valid_mb = "60221502";
    var invalid_mb = "60221505";

    strictEqual(dataValidator.prototype.validanMB(valid_mb), true, "OK!");
    strictEqual(dataValidator.prototype.validanMB(invalid_mb), false, "OK!");
});
test("dataValidator.validanJMBG", function () {
    var valid_jmbg = "2507984770027";
    var invalid_jmbg = "2507984770026";

    strictEqual(dataValidator.prototype.validanJMBG(valid_jmbg), true, "Validan JMBG");
    strictEqual(dataValidator.prototype.validanJMBG(invalid_jmbg), false, "Nevalidan JMBG");
});
test("dataValidator.validanEmail", function () {
    var valid_email = "test@testcorp.com";
    var invalid_email = "test@com";

    strictEqual(dataValidator.prototype.validanEmail(valid_email), true, "Validan email");
    strictEqual(dataValidator.prototype.validanEmail(invalid_email), false, "Nevalidan email");
});
test("dataValidator.validanMod97", function () {
    var broj = "1150000000000101";
    var valid_kontrolni = "52";
    var invalid_kontrolni = "46";

    strictEqual(dataValidator.prototype.validanMod97(broj, valid_kontrolni), true, "Validan kontrolni broj");
    strictEqual(dataValidator.prototype.validanMod97(broj, invalid_kontrolni), false, "Nevalidan kontrolni broj");
});
test("dataValidator.kontrolniBrojMod97", function () {
    var proveramod97 = "1150000000000001";
    var proveramod97kontrolni = "61";

    ok(dataValidator.prototype.kontrolniBrojMod97("2507984770027"), "OK!")
});
test("dataValidator.kontrolniBrojMod22", function () {
    ok(dataValidator.prototype.kontrolniBrojMod22("2507984770027"), "OK!")
});