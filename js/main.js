/* =========================================================
   E-SHOP ADEM — main.js
   Vanilla JS : thème, menu, panier, filtres, formulaires,
   page produit dynamique, animations
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const fmt = n => new Intl.NumberFormat("fr-FR").format(n) + " DT";

  /* ---------- Icons ---------- */
  const IC = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.6"/><circle cx="19" cy="21" r="1.6"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    info:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
    up:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    star:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
    eye:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.9 17.9A10.8 10.8 0 0 1 12 19C5 19 1 12 1 12a19.8 19.8 0 0 1 5.1-5.9M9.9 4.2A10.9 10.9 0 0 1 12 4c7 0 11 7 11 7a19.9 19.9 0 0 1-2.2 3.2M9.9 9.9a3 3 0 0 0 4.2 4.2M1 1l22 22"/></svg>'
  };

  /* =========================================================
     1. CATALOGUE (utilisé par la page produit dynamique)
     ========================================================= */
  const CATALOG = {
    samsung: {
      name: "Samsung Galaxy S24 Ultra", cat: "Smartphones", price: 5999, old: 6499,
      img: "images/samsung.jpg", rating: 4.9, reviews: 128, badge: "-8%",
      desc: "Le Galaxy S24 Ultra repousse les limites du mobile : écran titane, puissance IA et système photo professionnel dans un boîtier élégant.",
      specs: ["Écran 6.8\" QHD+ Dynamic AMOLED 2X – 120 Hz – HDR10+",
              "Processeur Snapdragon 8 Gen 3 (4 nm) – 12 Go RAM – 256 Go",
              "Quad caméra 200 + 50 + 12 + 10 MP – zoom 100x – vidéo 8K",
              "Batterie 5000 mAh – charge rapide – IP68 – Android 14"]
    },
    iphone15: {
      name: "iPhone 15 Pro Max", cat: "Smartphones", price: 4899, old: 5199,
      img: "images/apple.png", rating: 4.8, reviews: 96, badge: "-6%",
      desc: "Le iPhone 15 Pro Max en titane, avec la puce A17 Pro pour des performances de jeu et une caméra téléobjectif 5x.",
      specs: ["Écran Super Retina XDR 6,7\" – ProMotion 120 Hz",
              "Puce A17 Pro – 256 Go – USB-C (USB 3)",
              "Caméra 48 MP + téléobjectif 5x – Action Button",
              "Batterie jusqu'à 29 h de lecture vidéo"]
    },
    redmi: {
      name: "Redmi Note 13 Pro", cat: "Smartphones", price: 1299, old: 1499,
      img: "images/redmi.jpg", rating: 4.6, reviews: 214, badge: "-13%",
      desc: "Le rapport qualité/prix inégalé : capteur 200 MP, écran AMOLED 120 Hz et charge rapide 67 W.",
      specs: ["Écran AMOLED 6,67\" 120 Hz – Gorilla Glass",
              "Caméra 200 MP avec stabilisation optique",
              "Charge turbo 67 W – batterie 5100 mAh",
              "8 Go RAM + 256 Go – NFC – 5G"]
    },
    pcgamer: {
      name: "PC Gamer Ryzen + RTX", cat: "PC & Mac", price: 2499, old: 2699,
      img: "images/pc_gamer.jpeg", rating: 4.9, reviews: 74, badge: "-7%",
      desc: "Config gaming prête à jouer : Ryzen 5, GeForce RTX, SSD NVMe et RGB. Livré assemblé et testé.",
      specs: ["Ryzen 5 5600 – 6 cœurs / 12 threads",
              "GeForce RTX 4060 8 Go – 16 Go RAM DDR4",
              "SSD NVMe 1 To – Windows 11 installé",
              "Boîtier RGB – Wi-Fi – garantie 2 ans"]
    },
    pcbureau: {
      name: "PC Bureau Performance", cat: "PC & Mac", price: 899, old: null,
      img: "images/pc_bureau.jpeg", rating: 4.5, reviews: 52, badge: null,
      desc: "Le compagnon idéal pour le télétravail et les études : rapide, silencieux et complet (écran, clavier, souris).",
      specs: ["Intel Core i5 – 16 Go RAM – SSD 512 Go",
              "Windows 11 – écran 22\"",
              "Clavier + souris inclus",
              "Idéal bureau / télétravail"]
    },
    mac: {
      name: "MacBook Air M2", cat: "PC & Mac", price: 3299, old: 3499,
      img: "images/mac.jpeg", rating: 4.9, reviews: 88, badge: "-6%",
      desc: "Finesse, autonomie et silence : le MacBook Air M2 suit partout sans jamais faiblir.",
      specs: ["Puce Apple M2 – 8 Go RAM – 256 Go SSD",
              "Écran Liquid Retina 13,6\" – 500 nits",
              "Jusqu'à 18 h d'autonomie – 1,24 kg",
              "MagSafe 3 – 2 ports Thunderbolt"]
    },
    ps5: {
      name: "PlayStation 5 Slim", cat: "Consoles", price: 2199, old: 2399,
      img: "images/play.jpeg", rating: 4.9, reviews: 167, badge: "-8%",
      desc: "La PS5 Slim : la même puissance, un format plus compact. Ray tracing, SSD ultra-rapide et manette DualSense.",
      specs: ["SSD 1 To – 4K 120 Hz – Ray tracing",
              "Manette DualSense (retour haptique)",
              "Compatible PS VR2 – backward PS4",
              "Garantie 1 an – livraison gratuite"]
    },
    xbox: {
      name: "Xbox Series S", cat: "Consoles", price: 1899, old: 1999,
      img: "images/xbox.jpg", rating: 4.7, reviews: 93, badge: "-5%",
      desc: "La console Xbox la plus compacte : 1440p, SSD 1 To et Xbox Game Pass pour des centaines de jeux.",
      specs: ["SSD 1 To – 1440p jusqu'à 120 fps",
              "Manette Xbox sans fil incluse",
              "Game Pass : 100+ jeux en illimité",
              "Compactable – silencieuse"]
    },
    tv: {
      name: "TV Samsung 50\" 4K", cat: "TV", price: 1799, old: 1999,
      img: "images/tv.jpg", rating: 4.6, reviews: 61, badge: "-10%",
      desc: "Cristal UHD 50 pouces : couleurs riches, HDR et Tizen pour tous vos streaming préférés.",
      specs: ["Écran 50\" UHD 4K – HDR10+",
              "Smart TV Tizen – Netflix, YouTube...",
              "3 HDMI – 2 USB – Wi-Fi intégré",
              "Pieds mural compatibles VESA"]
    },
    montre: {
      name: "Montre Connectée", cat: "Accessoires", price: 499, old: 599,
      img: "images/watch.jpeg", rating: 4.5, reviews: 134, badge: "-17%",
      desc: "Suivez votre activité, vos appels et vos notifications avec un écran AMOLED toujours lisible.",
      specs: ["Écran AMOLED 1,43\" – Always On",
              "GPS intégré – 120 modes sport",
              "SpO2, fréquence cardiaque, sommeil",
              "Autonomie jusqu'à 10 jours – étanche 5 ATM"]
    },
    trotinette: {
      name: "Trotinette Électrique", cat: "Accessoires", price: 1499, old: 1699,
      img: "images/trotinette.jpg", rating: 4.4, reviews: 47, badge: "-12%",
      desc: "Jusqu'à 30 km d'autonomie, pliable en 3 secondes et écran d'affichage intelligent.",
      specs: ["Autonomie 30 km – vitesse 25 km/h",
              "Moteur 350 W – roues 8,5\"",
              "Frein disque + ABS – pliable",
              "Charge en 4 h – poids 12 kg"]
    },
    accessoires: {
      name: "Pack Accessoires Apple", cat: "Accessoires", price: 349, old: 399,
      img: "images/apple.png", rating: 4.3, reviews: 39, badge: "-13%",
      desc: "Coque, câble rapide et écouteurs : tout ce qu'il faut pour compléter votre iPhone.",
      specs: ["Coque MagSafe officielle",
              "Câble USB-C tressé 1 m",
              "Écouteurs filaires Lightning",
              "Compatible iPhone 12 → 15"]
    }
  };

  /* =========================================================
     2. THÈME (dark / light)
     ========================================================= */
  const root = document.documentElement;
  const savedTheme = store.get("eshop_theme", "dark");
  root.dataset.theme = savedTheme;

  function paintThemeBtn() {
    const b = $("#themeToggle");
    if (b) b.innerHTML = root.dataset.theme === "dark" ? IC.sun : IC.moon;
  }
  paintThemeBtn();

  document.addEventListener("click", e => {
    const t = e.target.closest("#themeToggle");
    if (!t) return;
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    store.set("eshop_theme", root.dataset.theme);
    paintThemeBtn();
    toast(root.dataset.theme === "dark" ? "Mode sombre activé" : "Mode clair activé", "ok");
  });

  /* =========================================================
     3. NAVIGATION (burger + ombre au scroll)
     ========================================================= */
  const nav = $(".navbar"), navLinks = $(".nav-links"), burger = $("#burger");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
      burger.innerHTML = open ? IC.close : burger.dataset.icon;
    });
    navLinks.addEventListener("click", e => { if (e.target.tagName === "A") navLinks.classList.remove("open"); });
  }
  const onScroll = () => { if (nav) nav.classList.toggle("scrolled", window.scrollY > 12); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* =========================================================
     4. TOASTS
     ========================================================= */
  let toastWrap = $(".toast-wrap");
  if (!toastWrap) { toastWrap = document.createElement("div"); toastWrap.className = "toast-wrap"; document.body.appendChild(toastWrap); }
  function toast(msg, type = "ok") {
    const el = document.createElement("div");
    el.className = "toast " + type;
    const icon = type === "ok" ? IC.check : type === "err" ? IC.alert : IC.info;
    el.innerHTML = icon + "<span>" + msg + "</span>";
    toastWrap.appendChild(el);
    setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 320); }, 2800);
  }
  window.eshopToast = toast;

  /* =========================================================
     5. PANIER (localStorage) — tiroir injecté par JS
     ========================================================= */
  const CART_KEY = "eshop_cart";
  let cart = store.get(CART_KEY, []);

  const drawerHTML = `
    <div class="overlay" id="cartOverlay"></div>
    <aside class="cart-drawer" id="cartDrawer" aria-label="Panier">
      <div class="cart-head">
        <h3>Mon panier</h3>
        <button class="icon-btn" id="cartClose" aria-label="Fermer">${IC.close}</button>
      </div>
      <div class="cart-items" id="cartItems"></div>
      <div class="cart-foot">
        <div class="cart-row"><span>Sous-total</span><span id="cartSub">0 DT</span></div>
        <div class="cart-row"><span>Livraison</span><span style="color:var(--ok)">Offerte</span></div>
        <div class="cart-row total"><span>Total</span><span id="cartTotal">0 DT</span></div>
        <button class="btn btn-primary btn-block" id="cartCheckout">Commander</button>
        <button class="btn btn-ghost btn-block btn-sm" id="cartClear" style="margin-top:10px">Vider le panier</button>
      </div>
    </aside>`;
  document.body.insertAdjacentHTML("beforeend", drawerHTML);

  const drawer = $("#cartDrawer"), overlay = $("#cartOverlay"), itemsBox = $("#cartItems");

  function saveCart() { store.set(CART_KEY, cart); renderCart(); }
  function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
  function cartTotal() { return cart.reduce((s, i) => s + i.qty * i.price, 0); }

  function renderCart() {
    const badge = $("#cartBadge");
    if (badge) { badge.textContent = cartCount(); badge.classList.toggle("show", cartCount() > 0); }
    $$("#cartOpen .cart-badge").forEach(b => { b.textContent = cartCount(); b.classList.toggle("show", cartCount() > 0); });

    if (!cart.length) {
      itemsBox.innerHTML = `<div class="cart-empty">
        <div class="ic">${IC.cart}</div>
        <strong>Votre panier est vide</strong>
        <p style="font-size:.87rem;margin-top:6px">Ajoutez vos coups de cœur depuis la boutique.</p>
        <a href="produits.html" class="btn btn-soft btn-sm" style="margin-top:18px">Voir les produits</a>
      </div>`;
    } else {
      itemsBox.innerHTML = cart.map(i => `
        <div class="cart-item">
          <img src="${i.img}" alt="${i.name}">
          <div>
            <div class="ci-name">${i.name}</div>
            <div class="ci-price">${fmt(i.price)}</div>
            <div class="qty">
              <button data-dec="${i.id}" aria-label="Retirer un">−</button>
              <span>${i.qty}</span>
              <button data-inc="${i.id}" aria-label="Ajouter un">+</button>
            </div>
          </div>
          <button class="ci-remove" data-del="${i.id}" aria-label="Supprimer">${IC.trash}</button>
        </div>`).join("");
    }
    $("#cartSub").textContent = fmt(cartTotal());
    $("#cartTotal").textContent = fmt(cartTotal());
  }

  function addToCart(p, qty = 1) {
    const found = cart.find(i => i.id === p.id);
    if (found) found.qty += qty; else cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty });
    saveCart();
    toast(`${p.name} ajouté au panier`, "ok");
    const badge = $("#cartBadge");
    if (badge) { badge.style.transform = "scale(1.35)"; setTimeout(() => badge.style.transform = "", 220); }
  }

  function openCart() { drawer.classList.add("open"); overlay.classList.add("show"); document.body.style.overflow = "hidden"; }
  function closeCart() { drawer.classList.remove("open"); overlay.classList.remove("show"); document.body.style.overflow = ""; }

  document.addEventListener("click", e => {
    const opener = e.target.closest("#cartOpen");
    if (opener) { openCart(); return; }
    if (e.target.closest("#cartClose") || e.target === overlay) { closeCart(); return; }

    const add = e.target.closest("[data-add-cart]");
    if (add) {
      e.preventDefault();
      const src = add.dataset;
      addToCart({ id: src.addCart, name: src.name, price: +src.price, img: src.img });
      openCart();
      return;
    }
    const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]"), del = e.target.closest("[data-del]");
    if (inc) { const it = cart.find(i => i.id === inc.dataset.inc); if (it) it.qty++; saveCart(); }
    if (dec) { const it = cart.find(i => i.id === dec.dataset.dec); if (it) { it.qty--; if (it.qty < 1) cart = cart.filter(x => x.id !== it.id); } saveCart(); }
    if (del) { cart = cart.filter(i => i.id !== del.dataset.del); saveCart(); toast("Article retiré du panier", "warn"); }

    if (e.target.closest("#cartClear")) { if (cart.length) { cart = []; saveCart(); toast("Panier vidé", "warn"); } }
    if (e.target.closest("#cartCheckout")) {
      if (!cart.length) return toast("Votre panier est vide", "err");
      toast("Commande simulée — merci ! (démo)", "ok");
      cart = []; saveCart(); setTimeout(closeCart, 500);
    }
    const wish = e.target.closest(".pc-wish");
    if (wish) { wish.classList.toggle("on"); toast(wish.classList.contains("on") ? "Ajouté aux favoris" : "Retiré des favoris", "ok"); }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });

  renderCart();

  /* =========================================================
     6. BOUTON "RETOUR EN HAUT"
     ========================================================= */
  const toTop = document.createElement("button");
  toTop.className = "to-top"; toTop.setAttribute("aria-label", "Haut de page"); toTop.innerHTML = IC.up;
  document.body.appendChild(toTop);
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 450), { passive: true });

  /* =========================================================
     7. ANIMATIONS AU SCROLL + COMPTEURS
     ========================================================= */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-visible");
          if (en.target.matches("[data-count]")) runCounter(en.target);
          io.unobserve(en.target);
        });
      }, { threshold: .16 })
    : null;

  function runCounter(el) {
    const target = parseFloat(el.dataset.count), dec = (el.dataset.dec || 0) - 0;
    const suffix = el.dataset.suffix || "", dur = 1600, t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  function observeAll() {
    $$(".reveal, [data-count]").forEach(el => {
      if (io) io.observe(el);
      else { el.classList.add("is-visible"); if (el.matches("[data-count]")) runCounter(el); }
    });
  }
  observeAll();

  /* =========================================================
     8. FILTRES / RECHERCHE / TRI (page produits)
     ========================================================= */
  const grid = $("#productsGrid");
  if (grid) {
    const cards = $$(".product-card", grid);
    let state = { cat: "all", q: "", promo: false, sort: "default" };

    const apply = () => {
      let visible = 0;
      cards.forEach(c => {
        const okCat  = state.cat === "all" || c.dataset.cat === state.cat;
        const okQ    = !state.q || (c.dataset.name + " " + c.dataset.cat).toLowerCase().includes(state.q);
        const okPromo = !state.promo || c.dataset.promo === "1";
        const show = okCat && okQ && okPromo;
        c.classList.toggle("hide", !show);
        if (show) visible++;
      });

      if (state.sort !== "default") {
        const sorted = cards.slice().sort((a, b) => {
          const pa = +a.dataset.price, pb = +b.dataset.price;
          return state.sort === "asc" ? pa - pb : state.sort === "desc" ? pb - pa
               : a.dataset.name.localeCompare(b.dataset.name, "fr");
        });
        sorted.forEach(c => grid.appendChild(c));
      }

      const cnt = $("#resultCount");
      if (cnt) cnt.textContent = visible + " produit" + (visible > 1 ? "s" : "");
      const none = $("#noResults");
      if (none) none.classList.toggle("show", visible === 0);
    };

    document.addEventListener("input", e => {
      if (e.target.id === "searchInput") { state.q = e.target.value.trim().toLowerCase(); apply(); }
    });
    document.addEventListener("change", e => {
      if (e.target.id === "sortSelect") { state.sort = e.target.value; apply(); }
      if (e.target.id === "promoOnly")  { state.promo = e.target.checked; apply(); }
    });
    document.addEventListener("click", e => {
      const chip = e.target.closest("[data-filter]");
      if (chip) {
        state.cat = chip.dataset.filter;
        $$("[data-filter]").forEach(b => b.classList.toggle("on", b === chip));
        $$(".side-list button[data-filter]").forEach(b => b.classList.toggle("on", b.dataset.filter === state.cat));
        apply();
      }
    });
    /* filtre initial via l'URL : produits.html?cat=smartphones */
    const initCat = new URLSearchParams(location.search).get("cat");
    if (initCat) {
      const esc = (window.CSS && typeof CSS.escape === "function") ? CSS.escape : (s => String(s).replace(/["\\]/g, "\\$&"));
      const btn = document.querySelector('[data-filter="' + esc(initCat) + '"]');
      if (btn) { btn.click(); } else { apply(); }
    } else apply();
  }

  /* =========================================================
     9. COMPTE À REBOURS (offres)
     ========================================================= */
  const cd = $("#countdown");
  if (cd) {
    const end = new Date(); end.setMonth(end.getMonth() + 1, 1); end.setHours(0, 0, 0, 0);
    const boxes = { d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMin"), s: $("#cdSec") };
    const tick = () => {
      let ms = end - new Date(); if (ms < 0) ms = 0;
      const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24,
            m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      if (boxes.d) boxes.d.textContent = String(d).padStart(2, "0");
      if (boxes.h) boxes.h.textContent = String(h).padStart(2, "0");
      if (boxes.m) boxes.m.textContent = String(m).padStart(2, "0");
      if (boxes.s) boxes.s.textContent = String(s).padStart(2, "0");
    };
    tick(); setInterval(tick, 1000);
  }

  /* =========================================================
     10. FORMULAIRES + VALIDATION
     ========================================================= */
  const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  function setErr(input, msg) {
    const field = input.closest(".field");
    if (!field) return false;
    field.classList.toggle("invalid", !!msg);
    field.classList.toggle("valid", !msg && !!input.value.trim());
    const box = field.querySelector(".err-msg");
    if (box) box.textContent = msg || "";
    return !msg;
  }
  function showFormError(form, msg) {
    let box = form.querySelector(".form-global");
    if (!box) { box = document.createElement("p"); box.className = "form-global err-msg"; box.style.display = "block"; form.prepend(box); }
    box.textContent = msg;
    if (msg) setTimeout(() => { box.textContent = ""; }, 5000);
  }

  document.addEventListener("submit", e => {
    const form = e.target;
    if (form.matches("[data-form]")) e.preventDefault();

    /* --- Newsletter (toutes les pages) --- */
    if (form.id === "newsletterForm") {
      const input = form.querySelector("input");
      if (!EMAIL.test(input.value.trim())) return toast("Adresse e-mail invalide", "err");
      toast("Merci ! Vous êtes inscrit à la newsletter 🎉", "ok");
      input.value = "";
      return;
    }

    /* --- Inscription --- */
    if (form.dataset.form === "register") {
      const nom = $("#nom", form), prenom = $("#prenom", form), email = $("#email", form),
            pass = $("#password", form), confirm = $("#confirm-password", form);
      let ok = true;
      ok = setErr(nom, nom.value.trim().length < 2 ? "Le nom doit contenir au moins 2 caractères." : "") && ok;
      ok = setErr(prenom, prenom.value.trim().length < 2 ? "Le prénom doit contenir au moins 2 caractères." : "") && ok;
      ok = setErr(email, !EMAIL.test(email.value.trim()) ? "Adresse e-mail invalide." : "") && ok;
      ok = setErr(pass, pass.value.length < 6 ? "Le mot de passe doit contenir au moins 6 caractères." : "") && ok;
      ok = setErr(confirm, !confirm.value ? "Confirmez votre mot de passe."
                   : confirm.value !== pass.value ? "Les mots de passe ne correspondent pas." : "") && ok;
      if (!ok) return showFormError(form, "Veuillez corriger les champs en rouge.");
      const cgu = $("#cgu", form);
      if (cgu && !cgu.checked) return showFormError(form, "Vous devez accepter les conditions d’utilisation.");
      toast("Inscription réussie ! Bienvenue 🎉", "ok");
      setTimeout(() => window.location.href = "index.html", 900);
    }

    /* --- Connexion --- */
    if (form.dataset.form === "login") {
      const email = $("#email", form), pass = $("#password", form);
      let ok = true;
      ok = setErr(email, !EMAIL.test(email.value.trim()) ? "Adresse e-mail invalide." : "") && ok;
      ok = setErr(pass, pass.value.length < 6 ? "Mot de passe : 6 caractères minimum." : "") && ok;
      if (!ok) return showFormError(form, "Veuillez corriger les champs en rouge.");
      store.set("eshop_user", email.value.trim());
      toast("Connexion réussie — bon retour !", "ok");
      setTimeout(() => window.location.href = "index.html", 900);
    }

    /* --- Mot de passe oublié --- */
    if (form.dataset.form === "forgot") {
      const email = $("#email", form);
      if (!setErr(email, !EMAIL.test(email.value.trim()) ? "Adresse e-mail invalide." : ""))
        return showFormError(form, "Veuillez corriger le champ en rouge.");
      toast("Lien de réinitialisation envoyé (démo)", "ok");
      setTimeout(() => window.location.href = "compte.html", 1200);
    }

    /* --- Contact --- */
    if (form.dataset.form === "contact") {
      const nom = $("#nom", form), email = $("#email", form), msg = $("#message", form);
      let ok = true;
      ok = setErr(nom, nom.value.trim().length < 2 ? "Indiquez votre nom." : "") && ok;
      ok = setErr(email, !EMAIL.test(email.value.trim()) ? "Adresse e-mail invalide." : "") && ok;
      ok = setErr(msg, msg.value.trim().length < 10 ? "Votre message doit contenir au moins 10 caractères." : "") && ok;
      if (!ok) return showFormError(form, "Veuillez corriger les champs en rouge.");
      toast("Message envoyé, réponse sous 24 h !", "ok");
      form.reset();
      $$(".field", form).forEach(f => f.classList.remove("valid", "invalid"));
    }
  });

  /* --- Mot de passe : afficher / masquer --- */
  document.addEventListener("click", e => {
    const t = e.target.closest(".pw-toggle");
    if (!t) return;
    const input = t.parentElement.querySelector("input");
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    t.innerHTML = show ? IC.eyeOff : IC.eye;
  });

  /* =========================================================
     11. AVIS / COMMENTAIRES
     ========================================================= */
  const REV_KEY = "eshop_reviews";
  let ratingValue = 5;

  document.addEventListener("click", e => {
    const star = e.target.closest(".rate-pick button");
    if (star) {
      ratingValue = +star.dataset.rate;
      $$(".rate-pick button", star.parentElement).forEach(b => b.classList.toggle("on", +b.dataset.rate <= ratingValue));
      return;
    }
    const sub = e.target.closest("[data-comment-btn]");
    if (sub) {
      const box = sub.closest("[data-comment-box]") || sub.closest("form") || document;
      const area = box.querySelector("textarea");
      const nameInput = box.querySelector("input[type=text]");
      if (!area || area.value.trim().length < 3) return toast("Écrivez un commentaire d'au moins 3 caractères", "err");
      const review = {
        name: (nameInput && nameInput.value.trim()) || "Client vérifié",
        text: area.value.trim(),
        rate: ratingValue,
        date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })
      };
      const key = box.dataset.commentBox || "global";
      const all = store.get(REV_KEY, {});
      (all[key] = all[key] || []).unshift(review);
      store.set(REV_KEY, all);
      area.value = "";
      if (nameInput) nameInput.value = "";
      toast("Merci pour votre avis !", "ok");
      renderReviews();
    }
  });

  function renderReviews() {
    const list = $("#reviewList");
    if (!list) return;
    const key = list.dataset.reviewKey || "global";
    const all = store.get(REV_KEY, {})[key] || [];
    const seed = list.dataset.seed ? JSON.parse(list.dataset.seed) : [];
    const merged = all.concat(seed);
    list.innerHTML = merged.length ? merged.map(r => `
      <article class="review">
        <div class="av">${r.name.trim().charAt(0).toUpperCase()}</div>
        <div>
          <h4>${escapeHtml(r.name)} <time>${r.date}</time></h4>
          <div class="stars">${IC.star.repeat(r.rate)}${IC.star.repeat(0)}</div>
          <p>${escapeHtml(r.text)}</p>
        </div>
      </article>`).join("")
      : `<p class="muted">Aucun commentaire pour l'instant. Soyez le premier !</p>`;
  }
  function escapeHtml(s) { return s.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])); }

  /* =========================================================
     12. PAGE PRODUIT DYNAMIQUE (produit.html?p=slug)
     ========================================================= */
  const pRoot = $("#productRoot");
  if (pRoot) {
    const slug = new URLSearchParams(location.search).get("p") || "samsung";
    const p = CATALOG[slug];

    if (!p) {
      pRoot.innerHTML = `<div class="no-results show" style="margin-top:40px">
        <div class="ic">${IC.alert}</div>
        <h3>Produit introuvable</h3>
        <p>Ce produit n'existe pas ou n'est plus disponible.</p>
        <a href="produits.html" class="btn btn-primary btn-sm" style="margin-top:18px">Retour aux produits</a>
      </div>`;
    } else {
      const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
      const related = Object.entries(CATALOG).filter(([k]) => k !== slug).slice(0, 3);

      pRoot.innerHTML = `
      <div class="container">
        <nav class="breadcrumb" aria-label="Fil d'ariane">
          <a href="index.html">Accueil</a><span>/</span>
          <a href="produits.html">Produits</a><span>/</span>
          <a href="produits.html">${p.cat}</a><span>/</span>
          <strong style="font-weight:500">${p.name}</strong>
        </nav>

        <div class="pdp">
          <div class="pdp-gallery reveal">
            <div class="pdp-main-img">
              ${p.badge ? `<span class="pc-badge">${p.badge}</span>` : ""}
              <img id="mainImg" src="${p.img}" alt="${attr(p.name)}">
            </div>
            <div class="pdp-thumbs" id="thumbs">
              <button class="on" data-src="${p.img}"><img src="${p.img}" alt=""></button>
              <button data-src="${related[0][1].img}"><img src="${related[0][1].img}" alt=""></button>
              <button data-src="${related[1][1].img}"><img src="${related[1][1].img}" alt=""></button>
              <button data-src="${related[2][1].img}"><img src="${related[2][1].img}" alt=""></button>
            </div>
          </div>

          <div class="pdp-info reveal" data-delay="1">
            <span class="pc-cat">${p.cat}</span>
            <h1>${p.name}</h1>
            <div class="pdp-rating">
              <span class="stars">${IC.star.repeat(Math.round(p.rating))}</span>
              <b style="color:var(--text)">${p.rating.toFixed(1)}/5</b>
              <span>(${p.reviews} avis)</span>
            </div>
            <div class="pdp-price">
              <span class="now">${fmt(p.price)}</span>
              ${p.old ? `<span class="old">${fmt(p.old)}</span><span class="save">Économisez ${fmt(p.old - p.price)}</span>` : ""}
            </div>
            <p class="pdp-desc">${p.desc}</p>
            <ul class="spec-list">${p.specs.map(s => `<li>${IC.check}<span>${s}</span></li>`).join("")}</ul>

            <div class="pdp-buy">
              <div class="qty">
                <button id="qMinus" aria-label="Diminuer">−</button>
                <span id="qVal">1</span>
                <button id="qPlus" aria-label="Augmenter">+</button>
              </div>
              <button class="btn btn-primary" id="pdpAdd">
                ${IC.cart} Ajouter au panier
              </button>
              <button class="btn btn-ghost" id="pdpBuy">Acheter maintenant</button>
            </div>

            <div class="pdp-perks">
              <div class="perk">${IC.cart}<span>Livraison gratuite en 24-48 h</span></div>
              <div class="perk">${IC.check}<span>Garantie 2 ans</span></div>
              <div class="perk">${IC.info}<span>Retour sous 7 jours</span></div>
            </div>
          </div>
        </div>

        <section class="section" style="padding-bottom:0">
          <div class="tabs" id="pdpTabs">
            <button class="tab on" data-tab="desc">Description</button>
            <button class="tab" data-tab="spec">Caractéristiques</button>
            <button class="tab" data-tab="avis">Avis (${p.reviews})</button>
          </div>
          <div class="tab-panel on" data-panel="desc">
            <p class="muted" style="max-width:820px">${p.desc}
            Chaque appareil est testé et garanti 2 ans par E-Shop Adem. Paiement en 3× sans frais possible
            et livraison offerte partout en Tunisie.</p>
          </div>
          <div class="tab-panel" data-panel="spec">
            <ul class="spec-list" style="max-width:820px">${p.specs.map(s => `<li>${IC.check}<span>${s}</span></li>`).join("")}</ul>
          </div>
          <div class="tab-panel" data-panel="avis">
            <div id="reviewList" data-review-key="${slug}"
                 data-seed='${JSON.stringify([
                   { name: "Sarra B.", text: "Produit conforme, livré en 24 h. Très satisfaite !", rate: 5, date: "12 sept." },
                   { name: "Mehdi K.", text: "Excellent rapport qualité/prix, je recommande.", rate: 4, date: "28 août" }
                 ])}'></div>

            <div class="review-form" data-comment-box="${slug}">
              <h3>Laisser un avis</h3>
              <div class="field">
                <label>Votre note</label>
                <div class="rate-pick">
                  ${[1, 2, 3, 4, 5].map(n => `<button type="button" data-rate="${n}" class="${n <= 5 ? "on" : ""}">${IC.star}</button>`).join("")}
                </div>
              </div>
              <div class="field">
                <label for="rvName">Votre nom</label>
                <input class="control" id="rvName" type="text" placeholder="Ex : Adem Dridi">
              </div>
              <div class="field">
                <label for="rvText">Votre commentaire</label>
                <textarea class="control" id="rvText" placeholder="Partagez votre expérience..."></textarea>
              </div>
              <button class="btn btn-primary" data-comment-btn>Publier mon avis</button>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <span class="eyebrow">Vous aimerez aussi</span>
            <h2 class="section-title">Produits similaires</h2>
          </div>
          <div class="products-grid">
            ${related.map(([k, r]) => productCardHTML(k, r)).join("")}
          </div>
        </section>
      </div>`;

      /* mini-galerie */
      $("#thumbs").addEventListener("click", ev => {
        const b = ev.target.closest("button"); if (!b) return;
        $$("#thumbs button").forEach(x => x.classList.toggle("on", x === b));
        $("#mainImg").src = b.dataset.src;
      });

      /* quantité */
      let q = 1;
      const qVal = $("#qVal");
      $("#qPlus").addEventListener("click", () => { q++; qVal.textContent = q; });
      $("#qMinus").addEventListener("click", () => { if (q > 1) { q--; qVal.textContent = q; } });
      $("#pdpAdd").addEventListener("click", function () { addToCart({ id: slug, name: p.name, price: p.price, img: p.img }, q); openCart(); });
      $("#pdpBuy").addEventListener("click", () => { addToCart({ id: slug, name: p.name, price: p.price, img: p.img }, q); openCart(); toast("Redirection vers le paiement (démo)", "warn"); });

      /* onglets */
      $("#pdpTabs").addEventListener("click", ev => {
        const t = ev.target.closest(".tab"); if (!t) return;
        $$("#pdpTabs .tab").forEach(x => x.classList.toggle("on", x === t));
        $$(".tab-panel").forEach(pn => pn.classList.toggle("on", pn.dataset.panel === t.dataset.tab));
      });

      observeAll();
      renderReviews();
    }
  }

  function attr(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

  function productCardHTML(key, r) {
    const nm = attr(r.name);
    return `
    <article class="product-card"
      data-name="${nm}" data-cat="${attr(r.cat)}" data-price="${r.price}" data-promo="${r.old ? 1 : 0}">
      <div class="pc-media">
        ${r.badge ? `<span class="pc-badge">${attr(r.badge)}</span>` : ""}
        <button class="pc-wish" type="button" aria-label="Favoris">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
        <a class="pc-link" href="produit.html?p=${encodeURIComponent(key)}" aria-label="${nm}"></a>
        <img src="${attr(r.img)}" alt="${nm}">
      </div>
      <div class="pc-body">
        <span class="pc-cat">${r.cat}</span>
        <h3 class="pc-title">${r.name}</h3>
        <div class="pc-rating"><span class="stars">${IC.star.repeat(Math.round(r.rating))}</span>${r.rating.toFixed(1)} (${r.reviews})</div>
        <div class="pc-price"><span class="now">${fmt(r.price)}</span>${r.old ? `<span class="old">${fmt(r.old)}</span>` : ""}</div>
        <div class="pc-actions">
          <button class="btn btn-primary" data-add-cart="${encodeURIComponent(key)}" data-name="${nm}" data-price="${r.price}" data-img="${attr(r.img)}">Ajouter</button>
          <a class="btn btn-ghost" href="produit.html?p=${encodeURIComponent(key)}">Détails</a>
        </div>
      </div>
    </article>`;
  }

  /* =========================================================
     13. ANNÉE COURANTE + DIVERS
     ========================================================= */
  $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const u = store.get("eshop_user", null);
  if (u) $$("[data-user-email]").forEach(el => el.textContent = u);
})();
