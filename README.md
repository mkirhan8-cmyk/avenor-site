# avenor-site

Сайт avenor.com.ua (GitHub Pages, ветка main = прод).

- `index.html`, `en/index.html` — визитка, правятся руками.
- Внутренние страницы (продукция, шрот, маршруты, качество, как заказать, о компании, FAQ, контакты; UA и EN) собираются скриптом:
  `python3 _build/pages.py` — тексты в `_build/content.py`, стиль в `assets/one.css`.
- Изменения — только через ветку и pull request; слияние в main = публикация, после ✅ владельца.
