function e() {
  typeof Babele < "u" ? Babele.get().register({
    module: "ru-ru",
    lang: "ru",
    dir: "compendium/pf1e"
  }) : new Dialog({
    title: "Перевод библиотек",
    content: "<p>Для перевода библиотек системы Pathfinder требуется установить и активировать модули <b>Babele и libWrapper</b><p>",
    buttons: {
      done: {
        label: "Хорошо"
      }
    }
  }).render(!0);
}
export {
  e as init
};
