function t() {
  var e;
  (e = game.modules.get("masks-newgeneration-sheets")) != null && e.active && (typeof Babele < "u" ? Babele.get().register({
    module: "ru-ru",
    lang: "ru",
    dir: "compendium/masks"
  }) : new Dialog({
    title: "Перевод библиотек",
    content: "<p>Для перевода библиотек системы МАСКИ требуется установить и активировать модули <b>Babele и libWrapper</b><p>",
    buttons: {
      done: {
        label: "Хорошо"
      }
    }
  }).render(!0));
}
export {
  t as init
};
