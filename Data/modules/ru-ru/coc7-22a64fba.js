function e() {
  typeof Babele < "u" ? Babele.get().register({
    module: "ru-ru",
    lang: "ru",
    dir: "compendium/coc7"
  }) : new Dialog({
    title: "Перевод библиотек",
    content: "<p>Для перевода библиотек Call of Cthulhu 7e требуется установить и активировать модули <b>Babele и libWrapper</b><p>",
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
