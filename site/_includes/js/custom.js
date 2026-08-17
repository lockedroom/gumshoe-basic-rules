// Переключатель цветовой схемы. Подключается в конец assets/js/just-the-docs.js.
// Выбор запоминается в localStorage и восстанавливается при следующем визите.
(function () {
  var SCHEMES = ["paper", "noir", "midnight"];
  var STORAGE_KEY = "gumshoe-color-scheme";
  var DEFAULT_SCHEME = "{{ site.color_scheme }}";

  function read() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function save(name) {
    try {
      window.localStorage.setItem(STORAGE_KEY, name);
    } catch (e) {
      /* приватный режим — просто не запоминаем */
    }
  }

  function markActive(name) {
    var box = document.getElementById("scheme-switcher");
    if (!box) return;
    var buttons = box.querySelectorAll("button[data-scheme]");
    for (var i = 0; i < buttons.length; i++) {
      var isActive = buttons[i].getAttribute("data-scheme") === name;
      buttons[i].classList.toggle("active", isActive);
      buttons[i].setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  function apply(name) {
    if (SCHEMES.indexOf(name) === -1) return;
    jtd.setTheme(name);
    save(name);
    markActive(name);
  }

  jtd.onReady(function () {
    var box = document.getElementById("scheme-switcher");
    if (box) {
      box.addEventListener("click", function (event) {
        var button = event.target;
        while (button && button !== box && !button.getAttribute("data-scheme")) {
          button = button.parentNode;
        }
        if (button && button !== box) {
          apply(button.getAttribute("data-scheme"));
        }
      });
    }

    var saved = read();
    if (saved && saved !== DEFAULT_SCHEME) {
      apply(saved);
    } else {
      markActive(saved || DEFAULT_SCHEME);
    }
  });
})();
