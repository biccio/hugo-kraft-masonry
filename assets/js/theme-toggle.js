/**
 * Switch tema chiaro/scuro.
 *
 * Lo stato iniziale è impostato da un piccolo script inline in <head>
 * (partials/theme-init.html), eseguito prima del render per evitare un
 * flash del tema sbagliato. Questo script gestisce solo il click sul
 * pulsante e salva la preferenza dell'utente.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) {
      return;
    }

    toggle.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";

      root.setAttribute("data-theme", next);

      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* localStorage non disponibile: la preferenza non viene salvata */
      }
    });
  });
})();
