const u = (t, s) => {
  const e = t[s];
  return e ? typeof e == "function" ? e() : Promise.resolve(e) : new Promise((i, o) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(o.bind(null, new Error("Unknown variable dynamic import: " + s)));
  });
}, a = () => {
  game.settings.register("ru-ru", "altTranslation", {
    name: "Использовать альтернативный перевод",
    hint: "(Требуется модуль libWrapper) Использовать альтернативный перевод D&D5e от Phantom Studio. Иначе будет использоваться официальный перевод издательства Hobby World.",
    type: Boolean,
    default: !1,
    scope: "world",
    config: !0,
    restricted: !0,
    onChange: (s) => {
      window.location.reload();
    }
  }), game.settings.get("ru-ru", "altTranslation") && (typeof libWrapper == "function" ? libWrapper.register(
    "ru-ru",
    "Localization.prototype._getTranslations",
    t,
    "WRAPPER"
  ) : new Dialog({
    title: "Альтернативный перевод",
    content: "<p>Для использования альтернативного перевода требуется активировать модуль <b>libWrapper</b></p>",
    buttons: {
      done: {
        label: "Хорошо"
      }
    }
  }).render(!0));
  async function t(s, e) {
    const i = await s(e), n = [
      "modules/ru-ru/i18n/systems/dnd5e-alt.json",
      "modules/ru-ru/i18n/modules/always-hp-alt.json",
      "modules/ru-ru/i18n/modules/arbron-hp-bar-alt.json",
      "modules/ru-ru/i18n/modules/combat-utility-belt-alt.json",
      "modules/ru-ru/i18n/modules/dae-alt.json",
      "modules/ru-ru/i18n/modules/damage-log-alt.json",
      "modules/ru-ru/i18n/modules/health-monitor-alt.json",
      "modules/ru-ru/i18n/modules/midi-qol-alt.json",
      "modules/ru-ru/i18n/modules/tidy5e-sheet-alt.json",
      "modules/ru-ru/i18n/modules/token-action-hud-alt.json",
      "modules/ru-ru/i18n/modules/ready-set-roll-5e-alt.json"
    ].map((r) => this._loadTranslationFile(r));
    await Promise.all(n);
    for (let r of n) {
      let l = await r;
      foundry.utils.mergeObject(i, l, { inplace: !0 });
    }
    return i;
  }
}, d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Dnd5eAltInit: a
}, Symbol.toStringTag, { value: "Module" }));
Hooks.once("init", async () => {
  var o, n;
  const t = game.system.id.toLowerCase(), s = document.createElement("link");
  s.rel = "stylesheet", s.href = `/modules/ru-ru/styles/${t}.css`, document.head.appendChild(s), CONFIG.Token.adjectivesPrefix = "TOKEN.RussianAdjectivesM";
  const e = {
    Beaufort: { editor: !0, fonts: [] },
    Exocet: { editor: !0, fonts: [] },
    "Fira Sans Extra Condensed": { editor: !0, fonts: [] },
    GWENT: { editor: !0, fonts: [] },
    Manuskript: { editor: !0, fonts: [] },
    "Marck Script": { editor: !0, fonts: [] },
    Montserrat: { editor: !0, fonts: [] },
    "Noto Sans Mono": { editor: !0, fonts: [] },
    "Noto Sans": { editor: !0, fonts: [] },
    "Noto Serif": { editor: !0, fonts: [] },
    "OCR-A": { editor: !0, fonts: [] }
  };
  CONFIG.fontDefinitions = foundry.utils.mergeObject(
    CONFIG.fontDefinitions,
    e
  ), CONFIG.defaultFontFamily = "Noto Sans", game.settings.register("ru-ru", "sceneLabelFont", {
    name: "Шрифт подписей на сцене",
    hint: "Шрифт, используемый для имён токенов и названий заметок на сцене.",
    type: Number,
    default: Object.keys(CONFIG.fontDefinitions).indexOf(
      CONFIG.defaultFontFamily
    ),
    choices: Object.keys(CONFIG.fontDefinitions),
    scope: "world",
    config: !0,
    restricted: !0,
    onChange: (r) => {
      window.location.reload();
    }
  }), CONFIG.canvasTextStyle.fontFamily = Object.keys(CONFIG.fontDefinitions)[game.settings.get("ru-ru", "sceneLabelFont")], [
    "alienrpg",
    "coc7",
    "deltagreen",
    "dnd5e",
    "dungeonworld",
    "forbidden-lands",
    "investigator",
    "mouseguard",
    "pbta",
    "pf1",
    "sfrpgbb",
    "wfrp4e",
    "yzecoriolis"
  ].includes(t) && (t === "dnd5e" && a(), (o = await u(/* @__PURE__ */ Object.assign({ "./systems/alienrpg.js": () => import("./alienrpg-7e879f13.js"), "./systems/coc7.js": () => import("./coc7-22a64fba.js"), "./systems/deltagreen.js": () => import("./deltagreen-a548c658.js"), "./systems/dnd5e-alt.js": () => Promise.resolve().then(() => d), "./systems/dnd5e.js": () => import("./dnd5e-08b8da3e.js"), "./systems/dungeonworld.js": () => import("./dungeonworld-a0aa5aeb.js"), "./systems/forbidden-lands.js": () => import("./forbidden-lands-532660cd.js"), "./systems/investigator.js": () => import("./investigator-cd62a15c.js"), "./systems/mouseguard.js": () => import("./mouseguard-ce83b4a8.js"), "./systems/pbta.js": () => import("./pbta-bd613cef.js"), "./systems/pf1.js": () => import("./pf1-aca80c0f.js"), "./systems/sfrpgbb.js": () => import("./sfrpgbb-bcb77e6a.js"), "./systems/wfrp4e.js": () => import("./wfrp4e-87703963.js"), "./systems/yzecoriolis.js": () => import("./yzecoriolis-2ffe2baa.js") }), `./systems/${t}.js`)) == null || o.init()), (n = game.modules.get("quick-insert")) != null && n.active && Hooks.on("ready", async function() {
    await game.settings.set("quick-insert", "embeddedIndexing", !0);
  });
});
Hooks.on("getSceneControlButtons", m);
function m(t) {
  game.version.startsWith("11") && game.user.isGM && t.find((e) => e.name === "token").tools.push({
    name: "adjectives-mode",
    title: "Переключение рода прилагательных",
    icon: "fas fa-female",
    active: CONFIG.Token.adjectivesPrefix === "TOKEN.RussianAdjectivesF",
    toggle: !0,
    onClick: (e) => {
      e ? (ui.notifications.notify(
        "Для случайных прилагательных используется женский род"
      ), CONFIG.Token.adjectivesPrefix = "TOKEN.RussianAdjectivesF") : (ui.notifications.notify(
        "Для случайных прилагательных используется мужской род"
      ), CONFIG.Token.adjectivesPrefix = "TOKEN.RussianAdjectivesM");
    }
  });
}
window.global = window;
