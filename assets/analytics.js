/* Cloudflare Web Analytics loader.
 *
 * Cookieless and privacy-preserving: no cookies, no localStorage, no
 * cross-site identifiers, so the site needs no consent banner.
 *
 * The site token below is public by design: Cloudflare embeds it in the
 * page for every visitor to see. It is not a secret. Replace it from
 * the Cloudflare dashboard under Observability > Web Analytics.
 * If TOKEN is ever blanked, this file no-ops and loads no beacon.
 */
(function () {
  var TOKEN = "61a0492a992a4889aef044f3e41d5ff2";

  if (!TOKEN) return;
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return;

  var s = document.createElement("script");
  s.type = "module";
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: TOKEN }));
  document.head.appendChild(s);
})();
