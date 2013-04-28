/// <reference path="../references/js/qunit.js" />
/// <reference path="../JSHelpers/dataValidator.js" />

var valid_jmbg = "2507984770027";
var invalid_jmbg = "2304997710422";
var vjmbg = new JMBG(valid_jmbg);
var ijmbg = new JMBG(invalid_jmbg);

test("JMBG.validan", function () {
    strictEqual(vjmbg.validan(), true, "Ispravan JMBG");
    strictEqual(ijmbg.validan(), false, "Neispravan JMBG");
});
test("JMBG.datumRodjenja", function () {
    strictEqual(vjmbg.datumRodjenja().getDate(), new Date(1984, 6, 25).getDate(), "Ispravan JMBG");
    strictEqual(ijmbg.datumRodjenja(), null, "Neispravan JMBG");
});
test("JMBG.redniBrojRodjenja", function () {
    strictEqual(vjmbg.redniBrojRodjenja(), 3, "Ispravan JMBG");
    strictEqual(ijmbg.redniBrojRodjenja(), null, "Neispravan JMBG");
});
test("JMBG.region", function () {
    strictEqual(vjmbg.region(), "Podrinje i Kolubara", "Ispravan JMBG");
    strictEqual(ijmbg.region(), null, "Neispravan JMBG");
});
test("JMBG.pol", function () {
    strictEqual(vjmbg.pol(), "M", "Ispravan JMBG");
    strictEqual(ijmbg.pol(), null, "Neispravan JMBG");
});
test("JMBG.toString", function () {
    strictEqual(vjmbg.toString(), valid_jmbg, "Ispravan JMBG");
    strictEqual(ijmbg.toString(), null, "Neispravan JMBG");
});