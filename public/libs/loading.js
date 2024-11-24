// 设置 html 的 data-theme 属性
const _themeKey = "CURRENT_THEME_KEY"
console.log(localStorage.getItem(_themeKey))
const _currentTheme = localStorage.getItem(_themeKey);
document.documentElement.setAttribute('data-theme', _currentTheme === 'system' || _currentTheme == null ? window.matchMedia('(prefers-color-scheme: dark)').matches : _currentTheme)

// 隐藏 loadBox
window.onload = () => {
  document.querySelector('.loadBox').style.display = 'none';
};

(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "okfyhob3bm");
