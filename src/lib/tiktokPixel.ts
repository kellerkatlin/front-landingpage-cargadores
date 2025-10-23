export const initTikTokPixel = () => {
  if (typeof window === "undefined") return;

  if (window.ttq) return; // evitar doble carga

  !(function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    const ttq: any = (w[t] = w[t] || []);
    ttq.methods = [
      "page",
      "track",
      "identify",
      "instances",
      "debug",
      "on",
      "off",
      "once",
      "ready",
      "alias",
      "group",
      "enableCookie",
      "disableCookie",
      "holdConsent",
      "revokeConsent",
      "grantConsent",
    ];
    ttq.setAndDefer = function (t: any, e: any) {
      t[e] = function () {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (let i = 0; i < ttq.methods.length; i++)
      ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.instance = function (t: any) {
      const e = ttq._i[t] || [];
      for (let n = 0; n < ttq.methods.length; n++)
        ttq.setAndDefer(e, ttq.methods[n]);
      return e;
    };
    ttq.load = function (e: any, n: any) {
      const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
      const o = n && n.partner;
      ttq._i = ttq._i || {};
      ttq._i[e] = [];
      ttq._i[e]._u = r;
      ttq._t = ttq._t || {};
      ttq._t[e] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[e] = n || {};
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = `${r}?sdkid=${e}&lib=${t}`;
      const f = document.getElementsByTagName("script")[0];
      f.parentNode?.insertBefore(s, f);
    };

    ttq.load("D3T5M7JC77UELR3N94P0"); // 👈 tu Pixel ID
    ttq.page();
  })(window, document, "ttq");
};
