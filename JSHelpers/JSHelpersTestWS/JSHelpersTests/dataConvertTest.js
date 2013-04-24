/// <reference path="../external_js/qunit.js" />
/// <reference path="../JSHelpers/dataConvert.js" />

var cir = "Поново непрекидно дежурство по сменама. Био сам у кабини до 12.00 часова. По доласку у логор око 12.30 часова покушао сам да заспим. Само што сам утонуо у први сан, пробудио ме је...";
var lat = "Ponovo neprekidno dežurstvo po smenama. Bio sam u kabini do 12.00 časova. Po dolasku u logor oko 12.30 časova pokušao sam da zaspim. Samo što sam utonuo u prvi san, probudio me je...";

test("dataConvert.lat2Cir", function () {
    strictEqual(dataConvert.prototype.lat2Cir(lat), cir, "Konverzija latinice u ćirilicu");
});
test("dataConvert.cir2Lat", function () {
    strictEqual(dataConvert.prototype.cir2Lat(cir), lat, "Konverzija ćirilice u latinicu");
});