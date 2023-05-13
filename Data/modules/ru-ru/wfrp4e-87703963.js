var h = Object.defineProperty;
var E = (d, m, u) => m in d ? h(d, m, { enumerable: !0, configurable: !0, writable: !0, value: u }) : d[m] = u;
var w = (d, m, u) => (E(d, typeof m != "symbol" ? m + "" : m, u), u);
function v() {
  if (typeof Babele > "u")
    new Dialog({
      title: "Перевод библиотек",
      content: "<p>Для перевода библиотек системы WFRP4 требуется установить и активировать модули <b>Babele и libWrapper</b><p>",
      buttons: {
        done: {
          label: "Хорошо"
        }
      }
    }).render(!0);
  else {
    let m = function(t, e) {
      if (t.special) {
        let a = e.find(
          (r) => r === t.baseName + t.special
        );
        if (a)
          return a;
      }
      return e.find((a) => a.match(new RegExp(t.baseName + "( ( ?))?")));
    }, u = function(t) {
      let e = t.trim(), a = "SPEC." + e, r = d[e] || game.i18n.localize(a);
      return r !== a ? r : e;
    }, y = function(t) {
      t = t.trim();
      let e = {
        baseName: t,
        special: "",
        tentacles: ""
      };
      if (t.includes("Tentacles")) {
        let a = /(?<tentacles>\d+)x Tentacles/i.exec(t);
        e.baseName = "# Tentacles", e.tentacles = a.groups.tentacles;
      }
      if (t.includes("(") && t.includes(")")) {
        let a = /(.*) *\((.*)\)/i.exec(t);
        e.baseName = a[1].trim(), e.special = " (" + u(a[2]) + ")";
      }
      return e;
    }, d = {
      Any: "Любое",
      //Difficulties
      "Very Easy": "Элементарная",
      Easy: "Лёгкая",
      Average: "Заурядная",
      Challenging: "Серьёзная",
      Difficultly: "Трудная",
      Hard: "Тяжёлая",
      "Very Hard": "Безумная",
      // Corruption
      Minor: "Лёгкий",
      Moderate: "Сильный",
      Major: "Серьезный"
    };
    Babele.get().register({
      module: "ru-ru",
      lang: "ru",
      dir: "compendium/wfrp4e"
    }), Babele.get().registerConverters({
      entry_effects: (t, e, a, r, o) => {
        if (t)
          return t.map((f) => (a.name === f.label && (f.label = o.name), f));
      },
      injury_effects: (t, e, a, r, o) => {
        if (t) {
          let f = a.name.replace(/ \(.*\)/, "");
          return t.map((l) => (f === l.label && (l.label = o.name), l));
        }
      },
      disease_effects: (t, e, a, r, o) => {
        if (t) {
          let f = o.symptoms.split(/,\s?/).reduce((l, b) => {
            for (const [s, n] of Object.entries(game.wfrp4e.config.symptoms))
              if (b.startsWith(n))
                return l[s] = b, l;
          }, {});
          return t.map((l) => {
            for (const b in game.wfrp4e.config.symptoms)
              if (l.label.toLowerCase().startsWith(b.split(/[A-Z]/)[0])) {
                l.label = f[b];
                break;
              }
            return l.label.startsWith("Незаживающая рана") && (l.flags.wfrp4e.script = l.flags.wfrp4e.script.replaceAll(
              "Endurance",
              game.i18n.localize("NAME.Endurance")
            )), l.label.startsWith("Судороги") && (l.flags.wfrp4e.script = l.flags.wfrp4e.script.replaceAll(
              "Moderate",
              "сильные"
            )), l.label.startsWith("Летальный исход") && (l.flags.wfrp4e.script = l.flags.wfrp4e.script.replaceAll("Moderate", "вероятный").replaceAll("Severe", "очень вероятный")), l;
          });
        }
      },
      condition_effects: (t) => {
        if (t)
          return t.map((e) => {
            let a = "WFRP4E.ConditionName." + e.label, r = game.i18n.localize(a);
            return r !== a && (e.label = r), e;
          });
      },
      npc_characteristics: (t) => {
        for (let e in t) {
          let a = t[e], r = a.abrev;
          r && !r.includes("CHARAbbrev.") && (a.label = "CHAR." + r, a.abrev = "CHARAbbrev." + r);
        }
        return t;
      },
      npc_traits: (t) => {
        if (!t)
          return;
        const e = p.traits(), a = p.skills(), r = p.talents(), o = p.careers(), f = p.trappings(), l = p.spells(), b = p.prayers();
        for (let s of t) {
          let n = y(s.name);
          if (s.type === "trait") {
            let i = e.find((c) => c === n.baseName) || e.find((c) => c.startsWith(n.baseName));
            if (!i)
              continue;
            s.name = i.name.replace(/ \(.*\)/, n.special), typeof s.type < "u" && (s.name = s.name.replace("#", n.tentacles)), s.system.description.value = i.description, isNaN(s.system.specification.value) && (s.system.specification.value = u(
              s.system.specification.value
            ));
          } else if (s.type === "skill") {
            let i = m(n, a);
            i && (s.name = i.name.replace(/ \( ?\)/, n.special), s.system.description.value = i.description);
          } else if (s.type === "prayer") {
            let i = b.find((c) => c === n.baseName);
            i && (s.name = i.name + n.special, s.system.description.value = i.description);
          } else if (s.type === "spell") {
            let i = l.find((c) => c === n.baseName);
            i && (s.name = i.name + n.special, s.system.description.value = i.description);
          } else if (s.type === "talent") {
            let i = r.find((c) => c === n.baseName);
            i && (s.name = i.name + n.special, s.system.description.value = i.description, s.system.tests = i.tests);
          } else if (s.type === "career") {
            let i = o.find((c) => c === s.name);
            i && (s.name = i.name);
          } else if (s.type === "trapping" || s.type === "weapon" || s.type === "armour" || s.type === "container" || s.type === "money") {
            let i = f.find(
              (c) => c === s.name
            );
            if (!i)
              continue;
            s.name = i.name, s.system.description = i.description;
          }
        }
        return t;
      },
      skills: (t) => {
        const e = p.skills();
        return t.map((a) => {
          let r = y(a), o = m(r, e);
          return o ? o.name.replace(/ \( ?\)/, r.special) : a;
        });
      },
      talents: (t) => {
        const e = p.talents();
        return t.map((a) => {
          let r = y(a), o = e.find((f) => f === r.baseName);
          return o ? o.name + r.special : a;
        });
      }
    }), Hooks.once("ready", () => {
      t();
      function t() {
        const e = {};
        e.weaponTypes = {
          melee: "Оружие ближнего боя",
          ranged: "Дистанционное оружие"
        }, e.magicLores = {
          petty: "Простейшие заклинания",
          beasts: "Школа Зверей",
          death: "Школа Смерти",
          fire: "Школа Огня",
          heavens: "Школа Небес",
          metal: "Школа Металла",
          life: "Школа Жизни",
          light: "Школа Света",
          shadow: "Школа Тени",
          hedgecraft: "Школа Знахарства",
          witchcraft: "Школа Ведьмовства",
          daemonology: "Школа Демонологии",
          necromancy: "Школа Некромантии",
          nurgle: "Школа Нургла",
          slaanesh: "Школа Слаанеша",
          tzeentch: "Школа Тзинча"
        }, e.magicWind = {
          petty: "Нет",
          beasts: "Гарр",
          death: "Шаиш",
          fire: "Акши",
          heavens: "Азир",
          metal: "Шамон",
          life: "Гайран",
          light: "Хиш",
          shadow: "Улгу",
          hedgecraft: "Нет",
          witchcraft: "Нет",
          daemonology: "Дхар",
          necromancy: "Дхар",
          nurgle: "Дхар",
          slaanesh: "Дхар",
          tzeentch: "Дхар"
        }, e.species = {
          human: "Человек",
          dwarf: "Гном",
          halfling: "Полурослик",
          helf: "Высший эльф",
          welf: "Лесной эльф"
        }, e.subspecies = {
          human: {
            reiklander: {
              name: "Рейкландец",
              skills: [
                "Обращение с животными",
                "Обаяние",
                "Хладнокровие",
                "Оценка",
                "Сплетничество",
                "Торговля",
                "Язык (бретонский)",
                "Язык (вестерландский)",
                "Лидерство",
                "Знание (Рейкланд)",
                "Рукопашный бой (основное)",
                "Стрельба (луки)"
              ],
              talents: ["Роковое Пророчество", "Смекалка, Учтивость", 3]
            }
          }
        }, e.speciesSkills = {
          human: [
            "Обращение с животными",
            "Обаяние",
            "Хладнокровие",
            "Оценка",
            "Сплетничество",
            "Торговля",
            "Язык (бретонский)",
            "Язык (вестерландский)",
            "Лидерство",
            "Знание (Рейкланд)",
            "Рукопашный бой (основное)",
            "Стрельба (луки)"
          ],
          dwarf: [
            "Кутёж",
            "Хладнокровие",
            "Стойкость",
            "Артистизм (сказительство)",
            "Оценка",
            "Запугивание",
            "Язык (кхазалид)",
            "Знание (гномы)",
            "Знание (геология)",
            "Знание (металлургия)",
            "Рукопашный бой (основное)",
            "Ремесло (любое)"
          ],
          halfling: [
            "Обаяние",
            "Кутёж",
            "Уклонение",
            "Азартные игры",
            "Торговля",
            "Интуиция",
            "Язык (мутландский)",
            "Знание (Рейкланд)",
            "Наблюдательность",
            "Ловкость рук",
            "Скрытность (любая)",
            "Ремесло (повар)"
          ],
          helf: [
            "Хладнокровие",
            "Артистизм (пение)",
            "Оценка",
            "Язык (эльтарин)",
            "Лидерство",
            "Рукопашный бой (основное)",
            "Ориентирование",
            "Наблюдательность",
            "Музицирование (любое)",
            "Стрельба (луки)",
            "Хождение под парусом",
            "Плавание"
          ],
          welf: [
            "Атлетика",
            "Лазание",
            "Стойкость",
            "Артистизм (пение)",
            "Запугивание",
            "Язык (эльтарин)",
            "Рукопашный бой (основное)",
            "Выживание",
            "Наблюдательность",
            "Стрельба (луки)",
            "Скрытность (дикая природа)",
            "Выслеживание"
          ]
        }, e.speciesTalents = {
          human: ["Роковое Пророчество", "Смекалка, Учтивость", 3],
          dwarf: [
            "Устойчивость к магии",
            "Сумеречное зрение",
            "Грамотность, Непреклонность",
            "Целеустремлённость, Твёрдость духа",
            "Бугай",
            0
          ],
          halfling: [
            "Обострённое восприятие (Вкус)",
            "Сумеречное зрение",
            "Устойчивость (Хаос)",
            "Небольшой",
            2
          ],
          helf: [
            "Обострённое восприятие (Зрение)",
            "Самообладание, Смекалка",
            "Сумеречное зрение",
            "Второе зрение, Шестое чувство",
            "Грамотность",
            0
          ],
          welf: [
            "Обострённое восприятие (Зрение)",
            "Здоровяк, Второе зрение",
            "Сумеречное зрение",
            "Грамотность, Закалка",
            "Скиталец",
            0
          ]
        }, e.weaponGroupDescriptions = {
          basic: "основное",
          cavalry: "WFRP4E.GroupDescription.Cavalry",
          fencing: "фехтовальное",
          brawling: "кулачное",
          flail: "WFRP4E.GroupDescription.Flail",
          parry: "WFRP4E.GroupDescription.Parry",
          polearm: "древковое",
          twohanded: "двуручное",
          blackpowder: "WFRP4E.GroupDescription.Blackpowder",
          bow: "лук",
          crossbow: "WFRP4E.GroupDescription.Crossbow",
          entangling: "ловчее",
          engineering: "WFRP4E.GroupDescription.Engineering",
          explosives: "WFRP4E.GroupDescription.Explosives",
          sling: "праща",
          throwing: "WFRP4E.GroupDescription.Throwing"
        }, e.symptoms = {
          blight: "Летальный исход",
          buboes: "Бубоны",
          convulsions: "Судороги",
          coughsAndSneezes: "Чихание и кашель",
          fever: "Жар",
          flux: "Понос",
          gangrene: "Гангрена",
          lingering: "Осложнения",
          malaise: "Слабость",
          nausea: "Тошнота",
          pox: "Сыпь",
          wounded: "Незаживающая рана",
          delirium: "Бред",
          swelling: "Вздутие"
        };
        for (let a in e)
          for (let r in e[a])
            typeof e[a][r] == "string" && (e[a][r] = game.i18n.localize(e[a][r]));
        mergeObject(game.wfrp4e.config, e), game.wfrp4e.config.symptomEffects.blight.label = "Летальный исход", game.wfrp4e.config.symptomEffects.buboes.label = "Бубоны", game.wfrp4e.config.symptomEffects.convulsions.label = "Судороги", game.wfrp4e.config.symptomEffects.coughsAndSneezes.label = "Чихание и кашель", game.wfrp4e.config.symptomEffects.fever.label = "Жар", game.wfrp4e.config.symptomEffects.flux.label = "Понос", game.wfrp4e.config.symptomEffects.gangrene.label = "Гангрена", game.wfrp4e.config.symptomEffects.lingering.label = "Осложнения", game.wfrp4e.config.symptomEffects.malaise.label = "Слабость", game.wfrp4e.config.symptomEffects.nausea.label = "Тошнота", game.wfrp4e.config.symptomEffects.pox.label = "Сыпь", game.wfrp4e.config.symptomEffects.wounded.label = "Незаживающая рана", game.wfrp4e.config.symptomEffects.delirium.label = "Бред", game.wfrp4e.config.symptomEffects.swelling.label = "Вздутие";
      }
    });
    const g = class {
      constructor(e) {
        w(this, "packs", []);
        this.packs = [], e && this.packs.push(e), g.itemCompendiums.map((a) => game.babele.packs.get(a)).forEach((a) => {
          a && this.packs.push(a);
        });
      }
      find(e) {
        for (let a of this.packs)
          for (let r of Object.keys(a.translations))
            if (e(r))
              return a.translations[r];
        return null;
      }
      static traits() {
        return new g(game.babele.packs.get("wfrp4e-core.traits"));
      }
      static skills() {
        return new g(
          game.babele.packs.get(this.coreModuleEnabled ? "wfrp4e-core.skills" : "wfrp4e.basic")
        );
      }
      static talents() {
        return new g(game.babele.packs.get("wfrp4e-core.talents"));
      }
      static careers() {
        return new g(game.babele.packs.get("wfrp4e-core.careers"));
      }
      static trappings() {
        return new g(
          game.babele.packs.get(this.coreModuleEnabled ? "wfrp4e-core.trappings" : "wfrp4e.basic")
        );
      }
      static spells() {
        return new g(game.babele.packs.get("wfrp4e-core.spells"));
      }
      static prayers() {
        return new g(game.babele.packs.get("wfrp4e-core.prayers"));
      }
    };
    let p = g;
    w(p, "coreModuleEnabled", !!game.modules.filter(
      (e) => e.id === "wfrp4e-core" && e.active
    ).length), // adventures and other expansions could provide new traits, spells prayers etc. let's discover them
    w(p, "itemCompendiums", [
      "wfrp4e-altdorf.altdorf-items",
      "wfrp4e-archives1.archives1-items",
      "wfrp4e-dotr.dotr-items",
      "wfrp4e-eis.eisitems",
      "wfrp4e-middenheim.middenheim-items",
      "wfrp4e-rnhd.rnhd-items",
      "wfrp4e-starter-set.starter-set-items",
      "wfrp4e-ua1.ua1-items",
      "wfrp4e-ua2.ua2-items"
    ]);
  }
}
export {
  v as init
};
