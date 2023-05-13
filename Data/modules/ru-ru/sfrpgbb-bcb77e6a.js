function e() {
  Hooks.on("renderItemSheet", (t) => {
    t.setPosition({ width: 685 });
  });
}
export {
  e as init
};
