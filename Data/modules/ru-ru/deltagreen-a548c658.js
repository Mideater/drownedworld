function r() {
  async function o() {
    const s = document.getElementsByClassName("grid grid-3col");
    for (let n of s) {
      const i = n.childNodes;
      let t = [];
      for (let e of i)
        e.innerText && e.tagName == "DIV" && t.push(e);
      t.sort(function(e, l) {
        return e.innerText.localeCompare(l.innerText);
      });
      for (let e of t)
        n.appendChild(e);
    }
  }
  Hooks.on("renderActorSheet", async function() {
    o();
  });
}
export {
  r as init
};
