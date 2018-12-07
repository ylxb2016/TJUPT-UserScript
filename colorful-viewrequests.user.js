// ==UserScript==
// @name         Colorful viewrequests!
// @version      0.1
// @description  求种区上色
// @author       杯杯杯杯具@TJUPT
// @match        https://*tjupt.org/viewrequests.php*
// @updateURL    https://github.com/tongyifan/TJUPT-UserScript/raw/master/colorful-viewrequests.user.js
// ==/UserScript==

(function () {
    'use strict';
    var trs = $("table[class='torrents'] > tbody > tr");
    for (var i = 0; i < trs.length; i++) {
        if (trs.eq(i).children("td").size() < 5 || trs.eq(i).children("td").eq(6).text() === "应求") {
            continue;
        }
        if (trs.eq(i).children("td").eq(6).text() === '0') {
            trs.eq(i).css("background", "#ebf260");
        } else {
            trs.eq(i).css("background", "#87CEEB");
        }
    }
})();
