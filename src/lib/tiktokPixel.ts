export const initTikTokPixel = () => {
  if (globalThis.window === undefined) return;

  if (globalThis.window.ttq) return; // evitar doble carga

  // Inicialización del TikTok Pixel
  ((w: Window & typeof globalThis, _d: Document, t: string) => {
    w.TiktokAnalyticsObject = t;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ttq: any = ((w as unknown as Record<string, any>)[t] = (w as unknown as Record<string, any>)[t] || []);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ttq.setAndDefer = function (target: any, method: string) {
      target[method] = function () {
        // eslint-disable-next-line prefer-rest-params
        target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (const method of ttq.methods) {
      ttq.setAndDefer(ttq, method);
    }
    ttq.instance = function (pixelId: string) {
      const instance = ttq._i[pixelId] || [];
      for (const method of ttq.methods) {
        ttq.setAndDefer(instance, method);
      }
      return instance;
    };
    ttq.load = function (pixelId: string, options?: Record<string, unknown>) {
      const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i = ttq._i || {};
      ttq._i[pixelId] = [];
      ttq._i[pixelId]._u = r;
      ttq._t = ttq._t || {};
      ttq._t[pixelId] = Date.now();
      ttq._o = ttq._o || {};
      ttq._o[pixelId] = options || {};
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = `${r}?sdkid=${pixelId}&lib=${t}`;
      const f = document.getElementsByTagName("script")[0];
      f.parentNode?.insertBefore(s, f);
    };

    ttq.load("D3T5M7JC77UELR3N94P0"); // 👈 tu Pixel ID
    ttq.page();
  })(globalThis as Window & typeof globalThis, document, "ttq");
};
