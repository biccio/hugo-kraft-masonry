/**
 * Filtro categorie per la homepage.
 *
 * Ogni pulsante .filter-btn ha un attributo data-filter con lo slug
 * della categoria (oppure "all"). Ogni .post-card ha un attributo
 * data-categories con gli slug delle proprie categorie separati da spazio.
 *
 * Al click su un pulsante, vengono mostrate solo le card che contengono
 * lo slug selezionato (oppure tutte, se "all").
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var filterBar = document.querySelector("[data-category-filter]");
    if (!filterBar) {
      return;
    }

    var buttons = filterBar.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll("[data-categories]");

    function applyFilter(filter) {
      cards.forEach(function (card) {
        var categories = (card.getAttribute("data-categories") || "").split(/\s+/);
        var matches = filter === "all" || categories.indexOf(filter) !== -1;
        if (matches) {
          card.removeAttribute("hidden");
        } else {
          card.setAttribute("hidden", "");
        }
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter") || "all";

        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === button);
          b.setAttribute("aria-pressed", b === button ? "true" : "false");
        });

        applyFilter(filter);
      });
    });
  });
})();
