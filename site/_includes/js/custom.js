// Переключатель цветовой схемы. Подключается в конец assets/js/just-the-docs.js.
// Выбор запоминается в localStorage и восстанавливается при следующем визите.
//
// Каждая схема из списка должна иметь файл assets/css/just-the-docs-<имя>.scss,
// иначе jtd.setTheme подставит несуществующую таблицу стилей.
(function () {
  var SCHEMES = ["forensics", "dossier", "asphalt", "nordic", "lamplight"];
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

  jtd.onReady(function () {
    var select = document.getElementById("scheme-select");
    var saved = read();
    var current = SCHEMES.indexOf(saved) === -1 ? DEFAULT_SCHEME : saved;

    if (current !== DEFAULT_SCHEME) {
      jtd.setTheme(current);
    }
    if (select) {
      select.value = current;
      select.addEventListener("change", function () {
        if (SCHEMES.indexOf(select.value) === -1) return;
        jtd.setTheme(select.value);
        save(select.value);
      });
    }
  });
})();
