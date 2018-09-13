# EuDilemma

A [dilemma](dist/EuDilemma.html) for European Union users.

[![](https://data.jsdelivr.com/v1/package/gh/Jamesits/EuDilemma/badge)](https://www.jsdelivr.com/package/gh/Jamesits/EuDilemma)

## Compatibility

Compatible with all modern browsers. Should work on older ones too.

## Quickstart

Include this just **after** your `<body>` tag:

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma/dist/EuDilemma.css">
<script src="https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma/dist/EuDilemma.js"></script>
<script>EuDilemma.showDialogIfEu();</script>
```

If you have a programmable backend or using services like GloudFlare IP Geolocation, you should get the 2-char country code yourself and call `EuDilemma.showDialogIfCountryCodeIs` or `EuDilemma.showDialog` when needed, rather using `EuDilemma.showDialogIfEu`. This saves one API call on the client side.

## Caveats

* It does not detect proxy or VPN.

## APIs

```javascript
// get what your user have choosen
// there are only one callback function possible per choice
EuDilemma.setCallback(
    ()=>{console.log("User agreed");}, 
    ()=>{console.log("User disagreed");}
);

// The onReady function you may need
// Note: don't show dialog if <body> tag is not loaded!
// If you load the JS before <body>, it's recommended to wait for document ready.
EuDilemma.onReady(function);

// If the user is in EU, show the dialog automatically
// Note: country detection requires ip.sb GeoLocation API.
EuDilemma.showDialogIfEu();

// Just show dialog
// by default the dialog won't show up if the user has already made their choice.
// if force == true, then the dialog will always appear.
EuDilemma.showDialog(force);

// If the user have the following country code (ISO 2-char, uppercase only)
// This is handy if you are using server-side GeoLocation detection
// or services like CloudFlare.
// force means the same as in showDialog.
EuDilemma.showDialogIfCountryCodeIs("UK", force);

// Detect if the user is in EU using ip.sb GeoLocation API.
EuDilemma.asyncIfEu(then_func, else_func, failure_func);

// Define a new resources base URI
// The script will load `EuDilemma.html` from that path.
// The URI must end with a `/`.
EuDilemma.setBaseUri("https://your.website.tld/assets/");
```

## Customize the appearance

You can always write your own CSS. You don't need to include the CSS we provided, but it is a good start point.

## Pin to a specific version

jsDelivr supports pining the file to a specific release tag.

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma@v0.0.6-alpha/dist/EuDilemma.css">
<script src="https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma@v0.0.6-alpha/dist/EuDilemma.js"></script>
<script>
    EuDilemma.setBaseUri("https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma@v0.0.6-alpha/dist/");
</script>
```
