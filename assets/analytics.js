/* Cloudflare Web Analytics loader.
 *
 * Cookieless and privacy-preserving: no cookies, no localStorage, no
 * cross-site identifiers, so the site needs no consent banner.
 *
 * To switch it on, paste the Site Token from the Cloudflare dashboard
 * (Analytics & Logs > Web Analytics > your site > Manage site) below.
 * While TOKEN is empty this file does nothing and loads no beacon.
 */
(function () {
  var TOKEN = "";

  if (!TOKEN) return;
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return;

  var s = document.createElement("script");
  s.defer = true;
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: TOKEN }));
  document.head.appendChild(s);
})();
