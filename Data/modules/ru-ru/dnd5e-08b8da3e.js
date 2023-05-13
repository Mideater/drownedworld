function c() {
  var o;
  if (game.settings.register("ru-ru", "altTranslationSelected", {
    type: Boolean,
    default: !1,
    scope: "world",
    restricted: !0,
    onChange: (r) => {
      window.location.reload();
    }
  }), game.settings.register("ru-ru", "compendiumTranslation", {
    name: "Перевод библиотек",
    hint: "(Требуется модуль Babele) Некоторые библиотеки системы D&D5e будут переведены.",
    type: Boolean,
    default: !0,
    scope: "world",
    config: !0,
    restricted: !0,
    onChange: (r) => {
      window.location.reload();
    }
  }), game.settings.get("ru-ru", "altTranslationSelected") || new Dialog({
    title: "Выбор перевода",
    content: "<p>Выберите предпочитаемый перевод системы D&D5. Вы можете изменить это позже в настройках модуля</p>",
    buttons: {
      hw: {
        label: "Hobby World",
        callback: () => {
          game.settings.set("ru-ru", "altTranslation", !1), game.settings.set("ru-ru", "altTranslationSelected", !0);
        }
      },
      ph: {
        label: "Phantom Studio",
        callback: () => {
          game.settings.set("ru-ru", "altTranslation", !0), game.settings.set("ru-ru", "altTranslationSelected", !0);
        }
      }
    }
  }).render(!0), typeof Babele < "u" ? Babele.get().register({
    module: "ru-ru",
    lang: "ru",
    dir: game.settings.get("ru-ru", "altTranslation") ? "compendium/dnd5e-alt" : "compendium/dnd5e"
  }) : game.settings.get("ru-ru", "compendiumTranslation") && new Dialog({
    title: "Перевод библиотек",
    content: "<p>Для перевода библиотек системы D&D5 требуется активировать модуль <b>Babele</b>. Вы можете отключить перевод библиотек в настройках модуля</p>",
    buttons: {
      done: {
        label: "Хорошо"
      },
      never: {
        label: "Больше не показывать",
        callback: () => {
          game.settings.set("ru-ru", "compendiumTranslation", !1);
        }
      }
    }
  }).render(!0), (o = game.modules.get("house-divided")) != null && o.active) {
    const r = document.createElement("link");
    r.rel = "stylesheet", r.href = "/modules/ru-ru/styles/house-divided.css", document.head.appendChild(r);
    class d extends JournalSheet {
      constructor(t, s) {
        super(t, s), this.options.classes.push(
          "house-divided",
          t.getFlag("house-divided", "realm")
        ), this.sidebarSections = t.getFlag("house-divided", "sidebar-sections") ?? !1;
      }
      async _renderInner(...t) {
        const s = await super._renderInner(...t);
        return this.sidebarSections && this._insertSidebarSections(s), s;
      }
      _insertSidebarSections(t) {
        const s = t[0].querySelector(".pages-list .directory-list");
        if (!s.children.length)
          return;
        const n = { overview: !1, quests: !1, events: !1 }, i = document.createElement("li");
        i.classList.add("directory-section", "level1");
        for (const a of Array.from(s.children)) {
          if (!n.overview) {
            const e = i.cloneNode();
            e.innerHTML = "<h2 class='section-header'>Обзор</h2>", a.before(e), n.overview = !0;
            continue;
          }
          const l = a.querySelector(".page-title").innerText;
          if (!n.events && l.startsWith("Событие:")) {
            const e = i.cloneNode();
            e.innerHTML = "<h2 class='section-header'>События</h2>", a.before(e), n.events = !0;
            continue;
          }
          if (!n.quests && l.startsWith("Задание:")) {
            const e = i.cloneNode();
            e.innerHTML = "<h2 class='section-header'>Задания</h2>", a.before(e), n.quests = !0;
          }
        }
      }
    }
    DocumentSheetConfig.registerSheet(
      JournalEntry,
      "house-divided",
      d,
      {
        types: ["base"],
        label: "Разделённый дом",
        makeDefault: !1
      }
    );
  }
}
export {
  c as init
};
