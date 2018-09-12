var EuDilemma = (function() {
    // config
    var cookieKey = "EuDilemma";
    var baseUri = "https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma/dist/";
    var htmlTemplateFilename = "EuDilemma.html";
    var websiteDisabledNotification = "Sorry, we cannot serve users from the EU due to the relevent laws and regulations.";
    var BlockedCountryList = [
        'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE',
        'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV',
        'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
        'SI', 'ES', 'SE', 'GB', 'GF', 'GP', 'MQ', 'ME',
        'YT', 'RE', 'MF', 'GI', 'AX', 'PM', 'GL', 'BL',
        'SX', 'AW', 'CW', 'WF', 'PF', 'NC', 'TF', 'AI',
        'BM', 'IO', 'VG', 'KY', 'FK', 'MS', 'PN', 'SH',
        'GS', 'TC', 'AD', 'LI', 'MC', 'SM', 'VA', 'JE',
        'GG', 'GI', 'CH',
    ];
    var geoIpApiEndpoint = "https://api.ip.sb/geoip";
    var geoIpApiResultKey = "country_code";
    var callback_red = null;
    var callback_blue = null;

    // functions
    var setBaseUri = function(uri) {
        baseUri = uri;
    }

    var getCookie = function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    var getPreviousCookie = function() {
        return getCookie(cookieKey);
    };

    var setCookie = function(value) {
        document.cookie = cookieKey + "=" + value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/"; 
    };

    var ajax = function(url, success_callback, failure_callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    if (success_callback instanceof Function) success_callback(this.responseText);
                } else {
                    if (failure_callback instanceof Function) failure_callback();
                }
            }
        };
        request.send();
        request = null;
    };

    var fetchJson = function(url, success_callback, failure_callback) {
        return ajax(url, function(data){success_callback(JSON.parse(data));}, failure_callback);
    };

    var asyncIfEu = function(then_func, else_func, failure_func) {
        fetchJson(geoIpApiEndpoint, function(data){
            if (BlockedCountryList.indexOf(data[geoIpApiResultKey]) > -1) {
                if (then_func instanceof Function) then_func();
            } else {
                if (else_func instanceof Function) else_func();
            }
        }, function(){if (failure_func instanceof Function) failure_func();});
    };

    var showDialog = function(force) {
        if (!force && (getPreviousCookie() == "blue" || getPreviousCookie() == "red")) return;
        ajax(baseUri + htmlTemplateFilename, function(data){
            body.insertAdjacentHTML("afterbegin", data);
        });
    };

    var showDialogIfCountryCodeIs = function(country, force) {
        if (BlockedCountryList.indexOf(country) > -1) {
            showDialog(force);
        }
    };

    var showDialogIfEu = function() {
        if (getPreviousCookie() != "blue") asyncIfEu(showDialog);
    };

    var hideDialog = function() {
        [].slice.call(document.getElementsByClassName("EuDilemma")).forEach(element => {
            element.style.display = 'none';
        });
    };

    var hidePageContent = function() {
        // replace page content
        body.innerHTML=websiteDisabledNotification;
        // terminate all JavaScript
        throw new Error("The story ends, you wake up in your bed and believe whatever you want to believe.");
    };

    var dialogActionBlue = function() {
        // The story ends, you wake up in your bed and believe whatever you want to believe.
        setCookie("blue");
        if (callback_blue instanceof Function) callback_blue();
        hidePageContent();
    };

    var dialogActionRed = function() {
        // You stay in Wonderland, and I show you how deep the rabbit hole goes.
        setCookie("red");
        if (callback_red instanceof Function) callback_red();
        hideDialog();
    };

    var setCallback = function(r, b) {
        callback_blue = b;
        callback_red = r;
    };

    // main logic
    var body = document.getElementsByTagName('body')[0];
    if (getPreviousCookie() == "blue") {
        hidePageContent();
    } else if (getPreviousCookie() == "red") {
        hideDialog();
    }

    // exposed interfaces
    return {
        setBaseUri: setBaseUri,
        asyncIfEu: asyncIfEu,
        showDialog: showDialog,
        showDialogIfEu: showDialogIfEu,
        showDialogIfCountryCodeIs: showDialogIfCountryCodeIs,
        dialogActionBlue: dialogActionBlue,
        dialogActionRed: dialogActionRed,
        setCallback: setCallback,
    };
})();