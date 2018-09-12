# EuDilemma

A dilemma for European Union users.

## Compatibility

Compatible with all modern browsers. Should work on older ones too.

## Usage

Include this in your `<head>`:

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma/dist/EuDilemma.css">
<script src="https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma/dist/EuDilemma.js"></script>
```

Then you can use the APIs.

### APIs

```javascript
// get what your user have choosen
// there are only one callback function possible per choice
EuDilemma.setCallback(
    ()=>{console.log("User agreed");}, 
    ()=>{console.log("User disagreed");}
);

// If the user is in EU, show the dialog automatically
// Note: country detection requires ip.sb GeoLocation API.
EuDilemma.showDialogIfEu();

// Just show dialog
// by default the dialog won't show up if the user has already made their choice.
// if force == true, then the dialog will always appear.
EuDilemma.showDialog(force);

// If the user have the following country code (ISO 2-char)
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

### Customize the appearance

You can always write your own CSS. 

### Pin to a specific version

JsDelivr supports pining the file to a specific release tag.

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma@v0.0.1-alpha/dist/EuDilemma.css">
<script src="https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma@v0.0.1-alpha/dist/EuDilemma.js"></script>
<script>
    EuDilemma.setBaseUri("https://cdn.jsdelivr.net/gh/Jamesits/EuDilemma@v0.0.1-alpha/dist/");
</script>
```
