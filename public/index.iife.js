var CredAnalytics = (function (o) {
  "use strict";
  var C = Object.defineProperty,
    K = Object.defineProperties;
  var E = Object.getOwnPropertyDescriptors;
  var U = Object.getOwnPropertySymbols;
  var H = Object.prototype.hasOwnProperty,
    P = Object.prototype.propertyIsEnumerable;
  var I = (o, n, i) =>
      n in o
        ? C(o, n, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (o[n] = i),
    r = (o, n) => {
      for (var i in n || (n = {})) H.call(n, i) && I(o, i, n[i]);
      if (U) for (var i of U(n)) P.call(n, i) && I(o, i, n[i]);
      return o;
    },
    S = (o, n) => K(o, E(n));
  var b = (o, n, i) => (I(o, typeof n != "symbol" ? n + "" : n, i), i);
  var a = (o, n, i) =>
    new Promise((y, h) => {
      var m = (c) => {
          try {
            Z(i.next(c));
          } catch (u) {
            h(u);
          }
        },
        p = (c) => {
          try {
            Z(i.throw(c));
          } catch (u) {
            h(u);
          }
        },
        Z = (c) => (c.done ? y(c.value) : Promise.resolve(c.value).then(m, p));
      Z((i = i.apply(o, n)).next());
    });
  const n = { batchLimit: 20, timeoutInMS: 2e4, maxEventsLimit: 100 },
    i = (t = {}) => (
      t.maxEventsLimit &&
        typeof t.maxEventsLimit != "number" &&
        (t.batchLimit = n.maxEventsLimit),
      t.batchLimit &&
        typeof t.batchLimit != "number" &&
        (t.batchLimit = n.batchLimit),
      t.timeoutInMS &&
        typeof t.timeoutInMS != "number" &&
        t.timeoutInMS / 1e3 <= 0 &&
        (t.timeoutInMS = n.timeoutInMS),
      r(r({}, n), t)
    ),
    y = () =>
      document.cookie
        .split(";")
        .map((t) => t.split("="))
        .reduce(
          (t, e) => (
            (t[decodeURIComponent(e[0].trim())] = decodeURIComponent(
              e[1].trim()
            )),
            t
          ),
          {}
        ),
    h = () => {
      let t = null,
        e = null;
      const s = y(),
        l = new URLSearchParams(window.location.search);
      return (
        l.has("cc") ? (t = l.get("cc")) : s._cc && (t = s._cc),
        s._cp && (e = s._cp),
        r(r({}, t ? { cc: t } : {}), e ? { cp: e } : {})
      );
    },
    m = (t, e) =>
      a(this, null, function* () {
        try {
          const s = `https://rweb-stg.dreamplug.in/tirion/v1/merchants/${t}/authenticate`;
          return !!(yield fetch(s, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(h()),
          })).ok;
        } catch (s) {
          return e <= 0 ? !1 : m(t, e - 1);
        }
      }),
    p = (t) =>
      a(this, null, function* () {
        try {
          const e = yield fetch(
            "https://rweb-stg.dreamplug.in/numenor/v1/events/",
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(t),
            }
          );
          if (e.ok) {
            const s = yield e.json();
            return console.info("Events captured successfully:", s), !0;
          } else throw new Error("Network call failed");
        } catch (e) {
          throw new Error(e.message);
        }
      }),
    Z = (t, e, s, l) =>
      S(r({ pixel_id: t }, h()), {
        event_name: e,
        event_time: Date.now(),
        event_source_url: window.location.href,
        user_agent: navigator.userAgent,
        action_source: "website",
        user_data: l,
        custom_data: s,
      });
  class c {
    constructor(e) {
      b(this, "options");
      b(this, "queue");
      b(this, "timerId");
      b(this, "postingIndex");
      (this.options = e), (this.queue = []), (this.postingIndex = 0);
    }
    postMessage(e) {
      this.addEventsToQueue(e), this == null || this.schedulePostEvents();
    }
    addEventsToQueue(e) {
      this.queue.push(e),
        console.info("Event stored in queue:", e),
        this.queue.length > this.options.maxEventsLimit && this.flushQueue(),
        this.queue.length > this.postingIndex + this.options.batchLimit &&
          (console.info("Posting events due to batching"),
          this.postEventsToService());
    }
    getEventsToBePublished(e = !1) {
      const s = e ? void 0 : this.postingIndex + this.options.batchLimit,
        l = this.queue.slice(this.postingIndex, s);
      return console.info("Events to be published:", l), l;
    }
    schedulePostEvents() {
      if (this.timerId || this.postingIndex + 1 >= this.queue.length) return;
      console.info("Scheduling events", this.queue);
      const e = this;
      this.timerId = setTimeout(() => {
        console.info("Posting events due to scheduling"),
          e.postEventsToService();
      }, this.options.timeoutInMS);
    }
    clearTimer() {
      console.log("Scheduling cleared"),
        clearTimeout(this.timerId),
        (this.timerId = void 0);
    }
    postEventsToService() {
      try {
        this.clearTimer();
        const e = this.getEventsToBePublished();
        e.length && p(e),
          this.incrementPostingIndex(),
          this.schedulePostEvents();
      } catch (e) {
        console.error(e);
      }
    }
    flushQueue() {
      const e = this.queue.slice(this.postingIndex);
      (this.queue.length = 0),
        (this.postingIndex = 0),
        this.queue.push(...e),
        console.info("Event queue flushed:", this.queue, this.postingIndex);
    }
    incrementPostingIndex() {
      let e = this.postingIndex + this.options.batchLimit;
      e >= this.queue.length && (e = this.queue.length),
        (this.postingIndex = e),
        console.info("Incremented posting index:", this.postingIndex);
    }
  }
  class u {
    constructor(e) {
      b(this, "queue");
      console.info("Initialized local worker"), (this.queue = new c(e));
      const s = this;
      window.addEventListener("unload", () => {
        const l = s.queue.getEventsToBePublished(!0);
        console.log("Sending data on unload:", l), p(l);
      });
    }
    postMessage(e) {
      this.queue.postMessage(e);
    }
  }
  let G = null,
    d = null,
    v,
    W = !1,
    g = "",
    V = !1;
  const x = (() => {
      const t = [];
      return { set: (...e) => t.push(...e), get: () => t };
    })(),
    k = () =>
      a(this, null, function* () {
        if (window.Worker) {
          const t = (yield Promise.resolve().then(() => J)).default;
          (d = new t()),
            (d.onerror = () => {
              (G = new u(v)), (d = null);
            }),
            d.postMessage({ eventName: "initialization", eventData: v });
        } else G = new u(v);
      }),
    f = (s, ...l) =>
      a(this, [s, ...l], function* (t, e = {}) {
        (v = i(e)), (g = t), (W = yield m(t, 3)), W && (yield k());
      }),
    z = (l, ...Y) =>
      a(this, [l, ...Y], function* (t, e = {}, s = {}) {
        if (V) return;
        const R = Z(g, t, e, s);
        if (W)
          try {
            G == null || G.postMessage(R),
              d == null || d.postMessage({ eventData: R });
          } catch (X) {
            console.error(X);
          }
        else
          x.set(R),
            m(g, 3).then((X) =>
              a(this, null, function* () {
                if (((W = X), W)) {
                  const T = x.get();
                  yield p(T), yield k();
                } else V = !0;
              })
            );
      }),
    L =
      "dmFyIGE9T2JqZWN0LmRlZmluZVByb3BlcnR5O3ZhciBnPShpLHMsdCk9PnMgaW4gaT9hKGkscyx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6dH0pOmlbc109dDt2YXIgbD0oaSxzLHQpPT4oZyhpLHR5cGVvZiBzIT0ic3ltYm9sIj9zKyIiOnMsdCksdCk7dmFyIGQ9KGkscyx0KT0+bmV3IFByb21pc2UoKGgsbik9Pnt2YXIgZT1vPT57dHJ5e3UodC5uZXh0KG8pKX1jYXRjaChyKXtuKHIpfX0sYz1vPT57dHJ5e3UodC50aHJvdyhvKSl9Y2F0Y2gocil7bihyKX19LHU9bz0+by5kb25lP2goby52YWx1ZSk6UHJvbWlzZS5yZXNvbHZlKG8udmFsdWUpLnRoZW4oZSxjKTt1KCh0PXQuYXBwbHkoaSxzKSkubmV4dCgpKX0pOyhmdW5jdGlvbigpeyJ1c2Ugc3RyaWN0Ijtjb25zdCBpPW49PmQodGhpcyxudWxsLGZ1bmN0aW9uKigpe3RyeXtjb25zdCBlPXlpZWxkIGZldGNoKCJodHRwczovL3J3ZWItc3RnLmRyZWFtcGx1Zy5pbi9udW1lbm9yL3YxL2V2ZW50cy8iLHttZXRob2Q6IlBPU1QiLGNyZWRlbnRpYWxzOiJpbmNsdWRlIixoZWFkZXJzOnsiQ29udGVudC1UeXBlIjoiYXBwbGljYXRpb24vanNvbiJ9LGJvZHk6SlNPTi5zdHJpbmdpZnkobil9KTtpZihlLm9rKXtjb25zdCBjPXlpZWxkIGUuanNvbigpO3JldHVybiBjb25zb2xlLmluZm8oIkV2ZW50cyBjYXB0dXJlZCBzdWNjZXNzZnVsbHk6IixjKSwhMH1lbHNlIHRocm93IG5ldyBFcnJvcigiTmV0d29yayBjYWxsIGZhaWxlZCIpfWNhdGNoKGUpe3Rocm93IG5ldyBFcnJvcihlLm1lc3NhZ2UpfX0pO2NsYXNzIHN7Y29uc3RydWN0b3IoZSl7bCh0aGlzLCJvcHRpb25zIik7bCh0aGlzLCJxdWV1ZSIpO2wodGhpcywidGltZXJJZCIpO2wodGhpcywicG9zdGluZ0luZGV4Iik7dGhpcy5vcHRpb25zPWUsdGhpcy5xdWV1ZT1bXSx0aGlzLnBvc3RpbmdJbmRleD0wfXBvc3RNZXNzYWdlKGUpe3RoaXMuYWRkRXZlbnRzVG9RdWV1ZShlKSx0aGlzPT1udWxsfHx0aGlzLnNjaGVkdWxlUG9zdEV2ZW50cygpfWFkZEV2ZW50c1RvUXVldWUoZSl7dGhpcy5xdWV1ZS5wdXNoKGUpLGNvbnNvbGUuaW5mbygiRXZlbnQgc3RvcmVkIGluIHF1ZXVlOiIsZSksdGhpcy5xdWV1ZS5sZW5ndGg+dGhpcy5vcHRpb25zLm1heEV2ZW50c0xpbWl0JiZ0aGlzLmZsdXNoUXVldWUoKSx0aGlzLnF1ZXVlLmxlbmd0aD50aGlzLnBvc3RpbmdJbmRleCt0aGlzLm9wdGlvbnMuYmF0Y2hMaW1pdCYmKGNvbnNvbGUuaW5mbygiUG9zdGluZyBldmVudHMgZHVlIHRvIGJhdGNoaW5nIiksdGhpcy5wb3N0RXZlbnRzVG9TZXJ2aWNlKCkpfWdldEV2ZW50c1RvQmVQdWJsaXNoZWQoZT0hMSl7Y29uc3QgYz1lP3ZvaWQgMDp0aGlzLnBvc3RpbmdJbmRleCt0aGlzLm9wdGlvbnMuYmF0Y2hMaW1pdCx1PXRoaXMucXVldWUuc2xpY2UodGhpcy5wb3N0aW5nSW5kZXgsYyk7cmV0dXJuIGNvbnNvbGUuaW5mbygiRXZlbnRzIHRvIGJlIHB1Ymxpc2hlZDoiLHUpLHV9c2NoZWR1bGVQb3N0RXZlbnRzKCl7aWYodGhpcy50aW1lcklkfHx0aGlzLnBvc3RpbmdJbmRleCsxPj10aGlzLnF1ZXVlLmxlbmd0aClyZXR1cm47Y29uc29sZS5pbmZvKCJTY2hlZHVsaW5nIGV2ZW50cyIsdGhpcy5xdWV1ZSk7Y29uc3QgZT10aGlzO3RoaXMudGltZXJJZD1zZXRUaW1lb3V0KCgpPT57Y29uc29sZS5pbmZvKCJQb3N0aW5nIGV2ZW50cyBkdWUgdG8gc2NoZWR1bGluZyIpLGUucG9zdEV2ZW50c1RvU2VydmljZSgpfSx0aGlzLm9wdGlvbnMudGltZW91dEluTVMpfWNsZWFyVGltZXIoKXtjb25zb2xlLmxvZygiU2NoZWR1bGluZyBjbGVhcmVkIiksY2xlYXJUaW1lb3V0KHRoaXMudGltZXJJZCksdGhpcy50aW1lcklkPXZvaWQgMH1wb3N0RXZlbnRzVG9TZXJ2aWNlKCl7dHJ5e3RoaXMuY2xlYXJUaW1lcigpO2NvbnN0IGU9dGhpcy5nZXRFdmVudHNUb0JlUHVibGlzaGVkKCk7ZS5sZW5ndGgmJmkoZSksdGhpcy5pbmNyZW1lbnRQb3N0aW5nSW5kZXgoKSx0aGlzLnNjaGVkdWxlUG9zdEV2ZW50cygpfWNhdGNoKGUpe2NvbnNvbGUuZXJyb3IoZSl9fWZsdXNoUXVldWUoKXtjb25zdCBlPXRoaXMucXVldWUuc2xpY2UodGhpcy5wb3N0aW5nSW5kZXgpO3RoaXMucXVldWUubGVuZ3RoPTAsdGhpcy5wb3N0aW5nSW5kZXg9MCx0aGlzLnF1ZXVlLnB1c2goLi4uZSksY29uc29sZS5pbmZvKCJFdmVudCBxdWV1ZSBmbHVzaGVkOiIsdGhpcy5xdWV1ZSx0aGlzLnBvc3RpbmdJbmRleCl9aW5jcmVtZW50UG9zdGluZ0luZGV4KCl7bGV0IGU9dGhpcy5wb3N0aW5nSW5kZXgrdGhpcy5vcHRpb25zLmJhdGNoTGltaXQ7ZT49dGhpcy5xdWV1ZS5sZW5ndGgmJihlPXRoaXMucXVldWUubGVuZ3RoKSx0aGlzLnBvc3RpbmdJbmRleD1lLGNvbnNvbGUuaW5mbygiSW5jcmVtZW50ZWQgcG9zdGluZyBpbmRleDoiLHRoaXMucG9zdGluZ0luZGV4KX19Y29uc3QgdD17SU5JVElBTElaQVRJT046ImluaXRpYWxpemF0aW9uIn07bGV0IGg9bnVsbDtvbm1lc3NhZ2U9KHtkYXRhOntldmVudE5hbWU6bixldmVudERhdGE6ZX19KT0+e249PT10LklOSVRJQUxJWkFUSU9OPyhjb25zb2xlLmluZm8oIkluaXRpYWxpemVkIHdlYiB3b3JrZXIiKSxoPW5ldyBzKGUpKTpoPT1udWxsfHxoLnBvc3RNZXNzYWdlKGUpfX0pKCk7Cg==",
    w =
      typeof window != "undefined" &&
      window.Blob &&
      new Blob([atob(L)], { type: "text/javascript;charset=utf-8" });
  function N(t) {
    let e;
    try {
      if (((e = w && (window.URL || window.webkitURL).createObjectURL(w)), !e))
        throw "";
      const s = new Worker(e, { name: t == null ? void 0 : t.name });
      return (
        s.addEventListener("error", () => {
          (window.URL || window.webkitURL).revokeObjectURL(e);
        }),
        s
      );
    } catch (s) {
      return new Worker("data:application/javascript;base64," + L, {
        name: t == null ? void 0 : t.name,
      });
    } finally {
      e && (window.URL || window.webkitURL).revokeObjectURL(e);
    }
  }
  const J = Object.freeze(
    Object.defineProperty({ __proto__: null, default: N }, Symbol.toStringTag, {
      value: "Module",
    })
  );
  return (
    (o.initializeSdk = f),
    (o.trackEvent = z),
    Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }),
    o
  );
})({});
