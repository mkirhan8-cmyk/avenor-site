"""Texts of the inner pages. Inline markup: **bold**, [[page-key|link text]]."""

MEAL_SPEC_UK = [("Протеїн", "мін. 35 %"), ("Вологість", "макс. 12 %"), ("Жир", "макс. 2 %"),
                ("Клітковина", "макс. 20,5 %"), ("Зола", "макс. 7 %"), ("Афлатоксин B1", "макс. 20 ppb")]
MEAL_SPEC_EN = [("Protein", "min. 35%"), ("Moisture", "max. 12%"), ("Fat", "max. 2%"),
                ("Fibre", "max. 20.5%"), ("Ash", "max. 7%"), ("Aflatoxin B1", "max. 20 ppb")]

DOCS_UK = ["Комерційний інвойс", "Пакувальний лист", "Коносамент (B/L) або CMR", "Сертифікат якості й ваги",
           "Фітосанітарний сертифікат", "Ветеринарний сертифікат", "Експортна декларація", "Сертифікат походження",
           "Сертифікат фумігації (контейнери)", "СМГС / CIM (залізниця)"]
DOCS_EN = ["Commercial invoice", "Packing list", "Bill of lading (B/L) or CMR", "Quality and weight certificate",
           "Phytosanitary certificate", "Veterinary certificate", "Export declaration", "Certificate of origin",
           "Fumigation certificate (containers)", "SMGS / CIM (rail)"]

FAQ_UK = {
    "order": [
        ("Як зробити запит?", "Заповніть форму «Запросити ціну» внизу сторінки або напишіть на info@avenor.com.ua чи у WhatsApp: товар, обсяг, порт і базис. Орієнтовну ціну надсилаємо зазвичай протягом одного робочого дня."),
        ("Із чого складається орієнтовна ціна?", "Із товару, обсягу, тари, порту призначення, базису й місяця відвантаження. Остаточні ціна, кількість, якість і базис визначаються лише підписаним договором і специфікацією."),
        ("Які базиси поставки можливі?", "FCA, CPT, FOB, CFR, DAP — під кожен договір. Хто що робить — на сторінці [[order|Як замовити]]."),
    ],
    "delivery": [
        ("Який шлях швидший до Китаю?", "Через порти Румунії: орієнтовно 60–75 днів від складу до порту в Китаї (за графіками ліній). Для інших шляхів строк — у пропозиції."),
        ("Чи можна з порту Одеси?", "Каботажем з дунайських портів і Одеси — возимо; контейнер з Одеси — за запитом. Основний контейнерний шлях зараз — через порти Румунії й Гданськ."),
        ("Чи возите в ЄС і Туреччину?", "Туреччина: фурами й судами. ЄС: морем до Греції й портів ЄС, фурами — за запитом."),
        ("Чи можна в біг‑бегах?", "Так, фурами в Туреччину; в ЄС — за запитом."),
    ],
    "quality": [
        ("Який протеїн у шроті?", "Типово від 35 %; мінімум зазначено в специфікації договору. Інший рівень — за запитом і залежно від заводу."),
        ("Чи є гранули?", "Так, за запитом."),
        ("Хто перевіряє якість і вагу?", "Незалежний сюрвеєр при завантаженні, за договором. Сертифікат якості й ваги — у пакеті документів."),
        ("Які документи ви надаєте?", "Сертифікати якості, ваги, походження й фітосанітарний, коносамент або CMR. Повний перелік — на сторінці [[quality|Якість]]."),
    ],
    "risk": [
        ("Що з воєнним ризиком?", "Якщо лінія вводить воєнну надбавку, хто її сплачує, узгоджуємо в договорі; ціну й строк підтверджуємо в пропозиції. Якщо основний шлях закрився — пропонуємо інший."),
        ("Хто відповідає за вантаж у дорозі?", "Ми ведемо вантаж і документи; ризик переходить за базисом Incoterms з договору."),
    ],
}
FAQ_EN = {
    "order": [
        ("How do I place a request?", "Fill in the “Request a quote” form below, or write to info@avenor.com.ua or on WhatsApp: product, volume, port and basis. We send an indicative price usually within one business day."),
        ("What does the indicative price depend on?", "Product, volume, packing, destination port, basis and shipment month. Final price, quantity, quality and basis are set only by a signed contract and specification."),
        ("Which delivery terms do you offer?", "FCA, CPT, FOB, CFR, DAP, as agreed in each contract. Who does what — see [[order|How to order]]."),
    ],
    "delivery": [
        ("Which route to China is the fastest?", "Via Romanian ports: approx. 60–75 days from warehouse to a port in China (per carrier schedules). For other routes the time is given in the offer."),
        ("Can you ship from the port of Odesa?", "We run coasters from the Danube ports and Odesa; a container from Odesa — on request. The main container route now is via Romanian ports and Gdańsk."),
        ("Do you ship to the EU and Türkiye?", "Türkiye: by truck and by vessel. EU: by sea to Greece and EU ports; by truck — on request."),
        ("Can you ship in big bags?", "Yes, by truck to Türkiye; to the EU on request."),
    ],
    "quality": [
        ("What protein level does your meal have?", "Typically from 35%; the minimum is stated in the contract specification. Other levels on request, depending on the plant."),
        ("Do you have pellets?", "Yes, on request."),
        ("Who checks quality and weight?", "An independent surveyor at loading, as agreed in the contract. The quality and weight certificate is in the document set."),
        ("What documents do you provide?", "Quality, weight, origin and phytosanitary certificates, B/L or CMR. Full list — see [[quality|Quality]]."),
    ],
    "risk": [
        ("What about war risk?", "If the line adds a war-risk surcharge, who pays it is agreed in the contract; we confirm price and timing in the offer. If the main route is closed, we offer another."),
        ("Who is responsible for the cargo in transit?", "We manage the cargo and documents; risk passes under the Incoterms rule in the contract."),
    ],
}

ROUTES_UK = [
    ("Дунайські порти, Одеса → Туреччина, Греція, Кіпр, Єгипет, порти ЄС", "Каботажне судно через Босфор · навалом, біг‑беги · за обстановкою на дату букінгу"),
    ("Україна → порти Румунії → Азія і Близький Схід", "Фури до порту, далі контейнеровоз · 20' і 40' · до Китаю орієнтовно 60–75 днів"),
    ("Західна Україна → Гданськ → Азія", "Залізницею до Гданська, далі контейнеровоз · 20' і 40'"),
    ("Україна → Туреччина, Близький Схід, ЄС", "Фурами · біг‑беги · ЄС — за запитом"),
]
ROUTES_EN = [
    ("Danube ports, Odesa → Türkiye, Greece, Cyprus, Egypt, EU ports", "Coaster via the Bosphorus · bulk, big bags · subject to the situation on the booking date"),
    ("Ukraine → Romanian ports → Asia and Middle East", "Trucks to the port, then container ship · 20' and 40' · to China approx. 60–75 days"),
    ("Western Ukraine → Gdańsk → Asia", "Rail to Gdańsk, then container ship · 20' and 40'"),
    ("Ukraine → Türkiye, Middle East, EU", "Trucks · big bags · EU on request"),
]

NEWS_UK = [
    ("19.07.2026", "Ракетний удар по балкеру GOLDEN LEO з кукурудзою після виходу з Одеси. У серпні в порти Великої Одеси заходили одиниці суден замість 169 за липень.", "Kyiv Post", "https://www.kyivpost.com/post/82580"),
    ("серпень 2026", "Три удари по Ізмаїлу, найбільшому дунайському порту. Дунай мілкий, баржі йдуть недовантажені. Молдова вдвічі знизила тариф на залізничний транзит до Констанци до 31.12.2026.", "Euromaidan Press (Bloomberg, Reuters)", "https://euromaidanpress.com/2026/09/03/eu-routes-ukraine-grain-exports/"),
    ("20.10.2026", "Страхування воєнних ризиків на рейс у порти Чорного моря — у 10–16 разів дорожче, ніж до блокади 2024 року.", "Ukrainian Shipping Magazine", "https://en.usm.media/insurance-for-a-voyage-to-black-sea-ports-has-risen-in-price-to-2-5-million/"),
    ("26.10.2026", "Страховики поширили зону підвищеного воєнного ризику на все Чорне море. Судна тримаються 12-мильної зони Румунії й Болгарії.", "Ukrainian Shipping Magazine", "https://en.usm.media/insurance-risk-for-shipping-has-expanded-to-the-entire-black-sea-area/"),
]
NEWS_EN = [
    ("19 Jul 2026", "A missile strike hit the bulk carrier GOLDEN LEO with corn after it left Odesa. In August only a handful of ships entered Greater Odesa ports, against 169 in July.", "Kyiv Post", "https://www.kyivpost.com/post/82580"),
    ("Aug 2026", "Three strikes on Izmail, the largest Danube port. Low Danube water means barges sail part-loaded. Moldova halved rail transit tariffs to Constanța until 31 Dec 2026.", "Euromaidan Press (Bloomberg, Reuters)", "https://euromaidanpress.com/2026/09/03/eu-routes-ukraine-grain-exports/"),
    ("20 Oct 2026", "War-risk insurance for a voyage to Black Sea ports costs 10–16 times more than before the 2024 blockade.", "Ukrainian Shipping Magazine", "https://en.usm.media/insurance-for-a-voyage-to-black-sea-ports-has-risen-in-price-to-2-5-million/"),
    ("26 Oct 2026", "Underwriters extended the elevated war-risk zone to the whole Black Sea. Ships keep to the 12-mile zone of Romania and Bulgaria.", "Ukrainian Shipping Magazine", "https://en.usm.media/insurance-risk-for-shipping-has-expanded-to-the-entire-black-sea-area/"),
]

LEGAL_UK = "Інформація на сайті не є публічною офертою. Ціна, кількість, якість, базис поставки та інші умови визначаються лише підписаним договором і специфікацією."
LEGAL_EN = "Information on this website is not an offer. Price, quantity, quality, delivery basis and other terms are set only by a signed contract and specification."

ADDR_UK = "65062, Україна, м. Одеса, бульвар Французький, 66/1, офіс 403В"
ADDR_EN = "Office 403V, 66/1 Frantsuzkyi Blvd, Odesa 65062, Ukraine"

UK = {
    "products": {
        "title": "Продукція — шрот, олії, зернові, бобові, цукор | AVENOR TRADE",
        "desc": "Що відвантажує AVENOR TRADE: шрот і макуха, рослинні олії, олійні культури, зернові, бобові та цукор з України. Тара й базиси поставки для кожної групи.",
        "img": 14, "h1": "Що ми відвантажуємо",
        "lead": "Шрот і макуха, олії, олійні культури, зернові, бобові та цукор. Не знайшли свій товар — напишіть.",
        "sections": [
            {"eyebrow": "Шість груп", "h2": "Товари, тара й базис", "blocks": [("groups", [
                (1, "Шрот, макуха, корми", ["Соняшниковий шрот, розсипний і гранульований — [[meal|детальніше]]", "Соєвий шрот", "Ріпаковий шрот і макуха", "DDGS", "Кукурудзяний глютеновий корм", "Гранульований буряковий жом", "Гранульовані висівки", "Меляса"],
                 "Навалом (судно, контейнер), біг‑беги, вагон · FCA, FOB, CFR, CPT, DAP"),
                (3, "Рослинні олії", ["Соняшникова: нерафінована, рафінована, високоолеїнова", "Соєва", "Ріпакова", "Соняшниковий лецитин"],
                 "Наливом (танкер), флексітанк, автоцистерна · FCA, FOB, CFR, DAP"),
                (14, "Олійні та нішеві культури", ["Соняшник, зокрема високоолеїновий", "Соя", "Ріпак", "Льон", "Гірчиця", "Коріандр"],
                 "Навалом (судно), біг‑беги, вагон, контейнер · FCA, FOB, CFR, CPT, DAP"),
                (9, "Зернові та продукти переробки", ["Пшениця продовольча і фуражна", "Кукурудза", "Ячмінь", "Овес", "Просо", "Сорго", "Солод", "Пшеничне борошно", "Кукурудзяна крупа"],
                 "Навалом (судно), контейнер, вагон, біг‑беги · FCA, FOB, CFR, CPT, DAP"),
                (10, "Бобові", ["Жовтий і зелений горох", "Нут", "Сочевиця", "Квасоля", "Кінські боби"],
                 "Контейнер, біг‑беги, навалом (судно) · FCA, FOB, CFR, CPT"),
                (12, "Цукор", ["Білий буряковий цукор"],
                 "Мішки 50 кг або біг‑беги, контейнер, фура · FCA, FOB, CFR, DAP"),
            ])]},
            {"eyebrow": "Для всіх груп", "h2": "Умови", "blocks": [
                ("terms", [("Базис", "**FCA · CPT · FOB · CFR · DAP** (Incoterms® 2020) — під кожен договір."),
                           ("Якість", "Показники, пакування й розмір партії — у договорі та специфікації. Як перевіряємо — [[quality|Якість]]."),
                           ("Маршрут", "Під товар, тару й порт. Усі шляхи — [[routes|Маршрути]].")]),
                ("note", LEGAL_UK)]},
        ],
    },
    "meal": {
        "title": "Соняшниковий шрот з України — експорт, специфікація | AVENOR TRADE",
        "desc": "Соняшниковий шрот з України для комбікормових заводів і трейдерів в Азії, ЄС, на Близькому Сході й у Туреччині. Протеїн від 35 %, навалом, у контейнерах і біг‑бегах.",
        "img": 2, "h1": "Соняшниковий шрот з України",
        "lead": "Наш основний товар. Для комбікормових заводів і трейдерів в Азії (зокрема в Китаї), ЄС, на Близькому Сході, у Північній Африці та Туреччині.",
        "tags": ["Навалом", "Контейнер 20' і 40'", "Біг‑беги"],
        "sections": [
            {"eyebrow": "Специфікація", "h2": "Типові показники", "blocks": [
                ("table", ["Показник", "Значення"], MEAL_SPEC_UK),
                ("note", "УКТ ЗЕД 2306 30. Негранульований; гранули — за запитом. Типові значення для українського походження. Якість, пакування й розмір партії — у договорі та специфікації.")]},
            {"eyebrow": "Китай", "h2": "Лише заводи з реєстрацією GACC", "blocks": [
                ("p", "Для поставок у Китай перевіряємо реєстрацію заводу в GACC до підписання договору.")]},
            {"eyebrow": "Як возимо", "h2": "Три основні шляхи для шроту", "bg": "dark", "blocks": [
                ("routes", [("Фури → порти Румунії → Азія, Близький Схід", "Контейнери 20' і 40'"),
                            ("Західна Україна → залізниця → Гданськ → Азія", "Контейнери 20' і 40'"),
                            ("Україна → Туреччина", "Біг‑беги в тентовій фурі, DAP")]),
                ("note", "Також каботажем з дунайських портів і Одеси. Усі шляхи — [[routes|Маршрути]].")]},
            {"eyebrow": "Документи", "h2": "Що буде в пакеті", "blocks": [
                ("p", "Незалежний сюрвеєр при завантаженні відбирає й пломбує проби, зразки зберігаються. Договори — на умовах GAFTA."),
                ("ticks", DOCS_UK)]},
            {"eyebrow": "Питання", "h2": "Часті питання про шрот", "blocks": [("faq", FAQ_UK["quality"][:3] + [FAQ_UK["delivery"][3]])]},
        ],
    },
    "routes": {
        "title": "Маршрути й логістика: Гданськ, Румунія, Дунай, Туреччина | AVENOR TRADE",
        "desc": "Чотири шляхи з України до вашого порту: залізниця через Гданськ, фури через порти Румунії, каботаж з Дунаю й Одеси, фури в Туреччину та ЄС. Ризики й як ми їх закриваємо.",
        "img": 6, "h1": "Чотири шляхи з України до вашого порту",
        "lead": "Залізниця через Гданськ, фури через порти Румунії, судна з дунайських портів і Одеси, фури в Туреччину. Ведемо вантаж від складу до порту розвантаження.",
        "sections": [
            {"eyebrow": "Маршрути", "h2": "Закрився один маршрут — знаходимо інший.", "bg": "dark", "blocks": [("rmap",), ("routes", ROUTES_UK)]},
            {"eyebrow": "Що ми беремо на себе", "h2": "Один ланцюг від складу до порту", "blocks": [
                ("terms", [("Підбір маршруту", "Під товар, тару й строк."), ("Букінг і графік", "Лінія, судно, подача транспорту."),
                           ("Документи", "CMR, коносамент, СМГС/CIM, фітосанітарний сертифікат, фумігація."),
                           ("Контроль завантаження", "Сюрвеєр, пломби, акт."), ("Трекінг", "Від складу до порту розвантаження."),
                           ("Простій і демередж", "Строки й безкоштовні дні — у договорі.")]),
                ("p", "Ви говорите з нами, а не з п’ятьма підрядниками.")]},
            {"eyebrow": "Обстановка", "h2": "Що відбувається на морі зараз", "lead": "Головне за останні місяці, що впливає на маршрут і ціну доставки.", "blocks": [
                ("news", NEWS_UK, "Стан на 28.10.2026 · перевірено: 3 джерела. Оновлюємо щомісяця.")]},
            {"eyebrow": "Ризики", "h2": "Ризики і як ми їх закриваємо", "blocks": [
                ("table", ["Ризик", "Що робимо"], [
                    ("Удари по портах Великої Одеси й суднах у коридорі", "Контейнери зараз ведемо через порти Румунії й Гданськ, вони не залежать від портів Одеси. Каботаж з Одеси — лише за погодженням і з підтвердженим страхуванням на дату букінгу."),
                    ("Атаки на дунайські порти й мілководдя Дунаю", "Плануємо партії з запасом за строком; запасний шлях — фури або залізниця до Констанци, зокрема транзитом через Молдову."),
                    ("Воєнна страхова надбавка на все Чорне море, включно з Румунією", "Хто платить war risk, фіксуємо в договорі. Ставку підтверджуємо в пропозиції на дату букінгу, а не з минулих угод."),
                    ("Черги до Констанци й на кордонах", "Бронюємо вікна заздалегідь, стежимо за чергою щодня; при затримці пропонуємо інший пункт перетину."),
                    ("Простій і демередж", "Строки завантаження й безкоштовні дні — у договорі; скан коносамента зазвичай за 1 робочий день."),
                    ("Затримка документів, відмова митниці", "Перевіряємо комплект до відправлення; запасний брокер; рішення шукаємо в день відмови."),
                    ("Якість і вага", "Незалежний сюрвеєр при завантаженні, пломби, акт при видачі зі складу.")]),
                ("note", "Доступність портів, кордонів і залізниці залежить від воєнних обставин і рішень держорганів; актуальний варіант підтверджуємо в пропозиції.")]},
            {"eyebrow": "Питання", "h2": "Часті питання про доставку", "blocks": [("faq", FAQ_UK["delivery"] + FAQ_UK["risk"]),
                                                                                  ("links", [("order", "Хто що оплачує за базисом"), ("faq", "Усі питання")])]},
        ],
    },
    "quality": {
        "title": "Якість і документи: сюрвеєр, GAFTA, сертифікати | AVENOR TRADE",
        "desc": "Як AVENOR TRADE перевіряє вагу, пломби й якість при завантаженні, які документи отримує покупець і на яких умовах укладаємо договори.",
        "img": 13, "h1": "Якість і документи",
        "lead": "Вагу, пломби й документи перевіряємо при завантаженні. Ви бачите те ж саме, що бачимо ми.",
        "sections": [
            {"eyebrow": "При завантаженні", "h2": "Що перевіряємо", "blocks": [
                ("terms", [("Вага", "Перевіряємо вагу партії."), ("Пломби", "Номери пломб фіксуємо в документах."),
                           ("Якість", "За договором незалежний сюрвеєр, схвалений GAFTA і FOSFA, перевіряє якість і вагу. Проби пломбуються й зберігаються."),
                           ("Документи", "Звіряємо документи з вантажем до відправлення.")], "t4")]},
            {"eyebrow": "Документи", "h2": "Пакет на відвантаження", "blocks": [
                ("p", "Точний перелік — у договорі. Для шроту й макухи зазвичай:"),
                ("ticks", DOCS_UK + ["Сертифікати non-GMO і радіаційного контролю — за запитом"]),
                ("note", "Для інших товарів комплект збираємо під країну призначення.")]},
            {"eyebrow": "Договір", "h2": "Умови GAFTA і специфікація", "blocks": [
                ("p", "Договір і специфікація визначають якість, пакування, розмір партії та базис поставки. Показники — для кожного товару окремо. Приклад — соняшниковий шрот, типовий для українського походження:"),
                ("table", ["Показник", "Значення"], MEAL_SPEC_UK),
                ("p", "Ми ведемо вантаж і документи. Де переходить ризик, визначає базис Incoterms у договорі — див. [[order|Як замовити]].")]},
        ],
    },
    "order": {
        "title": "Як замовити: 4 кроки і базиси Incoterms | AVENOR TRADE",
        "desc": "Як замовити агротовари в AVENOR TRADE: запит, орієнтовна пропозиція, договір, відвантаження. Хто що робить і де переходить ризик за FCA, CPT, FOB, CFR, DAP.",
        "img": 9, "h1": "Як замовити",
        "lead": "Напишіть: товар, обсяг, порт і базис. Орієнтовна ціна — зазвичай протягом одного робочого дня.",
        "sections": [
            {"eyebrow": "Процес", "h2": "4 кроки", "blocks": [("steps", [
                ("Запит", "Товар, обсяг, порт призначення, базис, бажаний строк."),
                ("Орієнтовна пропозиція", "Маршрут і орієнтовна ціна. Остаточні умови — лише в підписаному договорі."),
                ("Договір і специфікація", "Ціна, кількість, якість і базис поставки фіксуються в договорі та специфікації."),
                ("Відвантаження і документи", "Контроль ваги, пломб і документів при завантаженні. Один контакт до доставки.")])]},
            {"eyebrow": "Incoterms® 2020", "h2": "Базис: хто що робить", "blocks": [
                ("table", ["Базис", "Ми", "Ви", "Ризик переходить до вас"], [
                    ("FCA", "Передаємо товар вашому перевізнику в узгодженому місці, експортне оформлення", "Перевезення, страхування (за бажанням), імпортне оформлення", "Після передачі товару вашому перевізнику"),
                    ("CPT", "Експортне оформлення, перевезення до узгодженого місця", "Страхування (за бажанням), імпортне оформлення, розвантаження", "Після передачі першому перевізнику, ще в країні відвантаження"),
                    ("FOB", "Товар на борту вашого судна в порту відвантаження, експортне оформлення", "Судно, фрахт, страхування (за бажанням), імпортне оформлення", "Коли товар на борту в порту відвантаження"),
                    ("CFR", "Товар на борту, фрахт до вашого порту, експортне оформлення", "Страхування (за бажанням), розвантаження, імпортне оформлення", "Коли товар на борту в порту відвантаження, а не в порту призначення"),
                    ("DAP", "Експортне оформлення, доставка до узгодженого місця", "Розвантаження, імпортне оформлення", "У місці призначення, до розвантаження")]),
                ("note", "За цих базисів страхувати вантаж ніхто не зобов’язаний; кому і як страхувати, вказуємо в договорі. Таблиця довідкова. Incoterms® — зареєстрована торговельна марка ICC."),
                ("links", [("faq", "Часті питання"), ("contacts", "Контакти")])]},
        ],
    },
    "about": {
        "title": "Про компанію ТОВ «АВЕНОР ТРЕЙД», Одеса | AVENOR TRADE",
        "desc": "ТОВ «АВЕНОР ТРЕЙД» — український експортер агропродукції з Одеси. Шрот, олії, зернові й бобові до Туреччини, MENA, ЄС та Азії. Як ми працюємо, обсяги, реквізити.",
        "img": 5, "h1": "ТОВ «АВЕНОР ТРЕЙД», Одеса",
        "lead": "Український експортер агропродукції. Наша команда в Одесі веде вашу поставку від виробника до вашого порту.",
        "sections": [
            {"eyebrow": "Хто ми", "h2": "Експорт з України, коли звичні шляхи закриті", "blocks": [
                ("p", "AVENOR TRADE експортує шрот і макуху, рослинні олії, олійні культури, зернові, бобові та цукор. Покупці — комбікормові заводи, олійні й харчові компанії та трейдери в Туреччині, на Близькому Сході, в ЄС, Китаї та Південній Азії."),
                ("p", "Купуємо напряму в господарств і на переробних заводах України та регіону. Самі будуємо логістику: фури, вагони, контейнери, каботажні судна. Коли через війну закривається порт чи кордон, переводимо вантаж на інший шлях, а не зупиняємо поставку."),
                ("p", "Команда в Одесі має понад 10 років досвіду в агроекспорті. Ми працюємо українською, англійською й турецькою.")]},
            {"eyebrow": "Обсяги", "h2": "Що ми можемо відвантажити за місяць", "blocks": [
                ("terms", [("400+ контейнерів", "20' і 40', через порти Румунії й Гданськ."),
                           ("20 000+ тонн навалом", "Каботажними судами з дунайських портів."),
                           ("250+ фур у біг‑бегах", "До Туреччини, на Близький Схід і в ЄС."),
                           ("10+ років", "досвіду команди в агроекспорті.")], "t4"),
                ("note", "Це можливості на місяць, а не сталий щомісячний обсяг. Обсяг залежить від товару, маршруту й сезону; кожну поставку фіксує договір.")]},
            {"eyebrow": "Принципи", "h2": "Як ми працюємо", "blocks": [
                ("work", [("Прямі закупівлі", "Знаємо, звідки товар: господарство чи завод, партія, документи."),
                          ("Контроль при завантаженні", "Вага, пломби, документи; незалежний сюрвеєр, схвалений GAFTA і FOSFA, — за договором."),
                          ("Договір на умовах GAFTA", "Якість, базис і строки фіксуємо в договорі й специфікації до відвантаження."),
                          ("Перевірка контрагентів", "Перевіряємо кожну сторону угоди, зокрема за санкційними списками."),
                          ("Захищені платежі", "Реквізити змінюються лише листом із підписом директора й підтверджуються дзвінком."),
                          ("Один контакт", "Від запиту до доставки ви працюєте з однією людиною в нашій команді.")])]},
            {"eyebrow": "Маршрути", "h2": "Закрився один маршрут — знаходимо інший.", "bg": "dark", "blocks": [
                ("routes", ROUTES_UK), ("links", [("routes", "Маршрути й поточна обстановка")])]},
            {"eyebrow": "Реквізити", "h2": "Для перевірки контрагента", "blocks": [
                ("dl", [("Назва", "ТОВ «АВЕНОР ТРЕЙД»"), ("Код ЄДРПОУ", "46637137"), ("Адреса", ADDR_UK),
                        ("E-mail", '<a href="mailto:info@avenor.com.ua">info@avenor.com.ua</a>'),
                        ("Телефон / WhatsApp", '<a href="tel:+380739556243">+380 73 955 62 43</a>')]),
                ("note", "Отримали повідомлення про «нові реквізити» AVENOR TRADE? Не платіть — зателефонуйте нам.")]},
        ],
    },
    "faq": {
        "title": "Часті питання покупця — FAQ | AVENOR TRADE",
        "desc": "Відповіді AVENOR TRADE на часті питання: як зробити запит, базиси поставки, строки до Китаю, Туреччина й ЄС, протеїн у шроті, документи, воєнні ризики.",
        "img": 8, "h1": "Часті питання покупця",
        "lead": "Замовлення, умови, доставка, документи й ризики. Не знайшли своє — напишіть нам.",
        "faq_ld": FAQ_UK["order"] + FAQ_UK["delivery"] + FAQ_UK["quality"] + FAQ_UK["risk"],
        "sections": [
            {"eyebrow": "Замовлення", "h2": "Замовлення й ціна", "blocks": [("faq", FAQ_UK["order"])]},
            {"eyebrow": "Доставка", "h2": "Маршрути й строки", "blocks": [("faq", FAQ_UK["delivery"])]},
            {"eyebrow": "Якість", "h2": "Якість і документи", "blocks": [("faq", FAQ_UK["quality"])]},
            {"eyebrow": "Ризики", "h2": "Війна й ризики", "blocks": [("faq", FAQ_UK["risk"]),
                                                                    ("note", "Не знайшли відповідь? Напишіть на info@avenor.com.ua або у WhatsApp +380 73 955 62 43.")]},
        ],
    },
    "contacts": {
        "title": "Контакти — Одеса, e-mail, WhatsApp | AVENOR TRADE",
        "desc": "Контакти ТОВ «АВЕНОР ТРЕЙД»: info@avenor.com.ua, +380 73 955 62 43 (WhatsApp), Одеса, бульвар Французький, 66/1, офіс 403В.",
        "img": 7, "h1": "Контакти",
        "lead": "Напишіть: товар, обсяг, порт і базис. Орієнтовну ціну надішлемо зазвичай протягом одного робочого дня.",
        "sections": [
            {"eyebrow": "Зв’язок", "h2": "Як з нами зв’язатися", "blocks": [
                ("dl", [("E-mail", '<a href="mailto:info@avenor.com.ua">info@avenor.com.ua</a>'),
                        ("Телефон / WhatsApp", '<a href="tel:+380739556243">+380 73 955 62 43</a>'),
                        ("Офіс", ADDR_UK), ("Відповідь на запит", "протягом робочого дня"),
                        ("Мови", "українська, англійська, турецька")])]},
            {"eyebrow": "Для банку", "h2": "Перевірка контрагента", "blocks": [
                ("dl", [("Назва", "ТОВ «АВЕНОР ТРЕЙД»"), ("Код ЄДРПОУ", "46637137"), ("Адреса", ADDR_UK)]),
                ("p", "Потрібні документи компанії — напишіть на info@avenor.com.ua і вкажіть мету запиту."),
                ("note", LEGAL_UK)]},
        ],
    },
    "privacy": {
        "title": "Конфіденційність | AVENOR TRADE",
        "desc": "Які дані з форми запиту отримує ТОВ «АВЕНОР ТРЕЙД», навіщо, скільки зберігає і як їх видалити.",
        "img": 8, "h1": "Конфіденційність",
        "lead": "Коротко про те, що відбувається з даними із форми запиту.",
        "sections": [
            {"blocks": [("dl", [
                ("Хто", "ТОВ «АВЕНОР ТРЕЙД», ЄДРПОУ 46637137, Одеса. Контакт: info@avenor.com.ua"),
                ("Що отримуємо", "Лише те, що ви вказали: контакт, ім’я, компанію й деталі запиту. Cookies і аналітики на сайті немає."),
                ("Навіщо", "Відповісти на запит, підготувати пропозицію й договір. Дані не продаємо."),
                ("Де", "На нашому сервері в Україні й у пошті. Заявка проходить через сервіси доставки у США, Канаді та Індії."),
                ("Скільки", "Запит без договору — до 2 років, за договором — строки, яких вимагає закон."),
                ("Ваші права", "Напишіть на info@avenor.com.ua — покажемо, виправимо або видалимо ваші дані протягом 30 днів.")]),
                ("note", LEGAL_UK)]},
        ],
    },
}

EN = {
    "products": {
        "title": "Products — meals, oils, grains, pulses, sugar | AVENOR TRADE",
        "desc": "What AVENOR TRADE ships from Ukraine: oilseed meals and cakes, vegetable oils, oilseeds, grains, pulses and sugar. Packing and delivery terms for each group.",
        "img": 14, "h1": "What we ship",
        "lead": "Meals and cakes, oils, oilseeds, grains, pulses and sugar. Can't find your product? Write to us.",
        "sections": [
            {"eyebrow": "Six groups", "h2": "Products, packing and basis", "blocks": [("groups", [
                (1, "Meals, cakes & feed", ["Sunflower meal and pellets — [[meal|details]]", "Soybean meal", "Rapeseed meal and cake", "DDGS", "Corn gluten feed", "Beet pulp pellets", "Wheat bran pellets", "Molasses"],
                 "Bulk (vessel, container), big bags, rail wagon · FCA, FOB, CFR, CPT, DAP"),
                (3, "Vegetable oils", ["Sunflower: crude, refined, high-oleic", "Soybean", "Rapeseed", "Sunflower lecithin"],
                 "Bulk (tanker), flexitank, road tanker · FCA, FOB, CFR, DAP"),
                (14, "Oilseeds & specialty seeds", ["Sunflower seeds, incl. high-oleic", "Soybeans", "Rapeseed", "Flaxseed", "Mustard seed", "Coriander"],
                 "Bulk (vessel), big bags, rail wagon, container · FCA, FOB, CFR, CPT, DAP"),
                (9, "Grains & milling", ["Wheat, milling and feed", "Corn", "Barley", "Oats", "Millet", "Sorghum", "Malt", "Wheat flour", "Corn grits"],
                 "Bulk (vessel), container, rail wagon, big bags · FCA, FOB, CFR, CPT, DAP"),
                (10, "Pulses", ["Yellow and green peas", "Chickpeas", "Lentils", "Kidney beans", "Faba beans"],
                 "Container, big bags, bulk (vessel) · FCA, FOB, CFR, CPT"),
                (12, "Sugar", ["White beet sugar"], "50 kg bags or big bags, container, truck · FCA, FOB, CFR, DAP"),
            ])]},
            {"eyebrow": "All groups", "h2": "Terms", "blocks": [
                ("terms", [("Basis", "**FCA · CPT · FOB · CFR · DAP** (Incoterms® 2020), as agreed in each contract."),
                           ("Quality", "Parameters, packing and lot size are set in the contract and specification. How we check — [[quality|Quality]]."),
                           ("Route", "Matched to product, packing and port. All routes — [[routes|Routes]].")]),
                ("note", LEGAL_EN)]},
        ],
    },
    "meal": {
        "title": "Sunflower meal from Ukraine — export, specification | AVENOR TRADE",
        "desc": "Ukrainian sunflower meal for feed mills and traders in Asia, the EU, the Middle East and Türkiye. Protein from 35%, in bulk, containers and big bags.",
        "img": 2, "h1": "Sunflower meal from Ukraine",
        "lead": "Our core product. For feed mills and traders in Asia (including China), the EU, the Middle East, North Africa and Türkiye.",
        "tags": ["Bulk", "20' and 40' containers", "Big bags"],
        "sections": [
            {"eyebrow": "Specification", "h2": "Typical specification", "blocks": [
                ("table", ["Parameter", "Value"], MEAL_SPEC_EN),
                ("note", "HS code 2306 30. Non-pelletised; pellets on request. Typical values for Ukrainian origin. Quality, packing and lot size are set in the contract and specification.")]},
            {"eyebrow": "China", "h2": "Only GACC-registered plants", "blocks": [
                ("p", "For shipments to China we check the plant's GACC registration before the contract is signed.")]},
            {"eyebrow": "How we ship", "h2": "Three main routes for meal", "bg": "dark", "blocks": [
                ("routes", [("Trucks → Romanian ports → Asia, Middle East", "20' and 40' containers"),
                            ("Western Ukraine → rail → Gdańsk → Asia", "20' and 40' containers"),
                            ("Ukraine → Türkiye", "Big bags in a curtain-side truck, DAP")]),
                ("note", "Also by coaster from the Danube ports and Odesa. All routes — [[routes|Routes]].")]},
            {"eyebrow": "Documents", "h2": "What the document set includes", "blocks": [
                ("p", "An independent surveyor takes and seals samples at loading; samples are kept. Contracts on GAFTA terms."),
                ("ticks", DOCS_EN)]},
            {"eyebrow": "Questions", "h2": "Sunflower meal FAQ", "blocks": [("faq", FAQ_EN["quality"][:3] + [FAQ_EN["delivery"][3]])]},
        ],
    },
    "routes": {
        "title": "Routes and logistics: Gdańsk, Romania, Danube, Türkiye | AVENOR TRADE",
        "desc": "Four routes from Ukraine to your port: rail via Gdańsk, trucks via Romanian ports, coasters from the Danube and Odesa, trucks to Türkiye and the EU. Risks and how we cover them.",
        "img": 6, "h1": "Four routes to your port",
        "lead": "Rail via Gdańsk, trucks via Romanian ports, vessels from the Danube ports and Odesa, trucks to Türkiye. We handle the cargo from the warehouse to the discharge port.",
        "sections": [
            {"eyebrow": "Routes", "h2": "When one route closes, we find another.", "bg": "dark", "blocks": [("rmap",), ("routes", ROUTES_EN)]},
            {"eyebrow": "What we take on", "h2": "One chain from warehouse to port", "blocks": [
                ("terms", [("Route selection", "Matched to product, packing and deadline."), ("Booking and schedule", "Line, vessel, transport supply."),
                           ("Documents", "CMR, B/L, SMGS/CIM, phytosanitary certificate, fumigation."),
                           ("Loading control", "Survey, seals, report."), ("Tracking", "From warehouse to discharge port."),
                           ("Demurrage and delays", "Terms and free days are set in the contract.")]),
                ("p", "You talk to us, not to five contractors.")]},
            {"eyebrow": "Situation", "h2": "What is happening at sea now", "lead": "The main developments of recent months that affect the route and the delivery price.", "blocks": [
                ("news", NEWS_EN, "As of 28 Oct 2026 · checked: 3 sources. Updated monthly.")]},
            {"eyebrow": "Risks", "h2": "Risks and how we cover them", "blocks": [
                ("table", ["Risk", "What we do"], [
                    ("Strikes on Greater Odesa ports and ships in the corridor", "We now route containers via Romanian ports and Gdańsk, which do not depend on Odesa ports. Coasters from Odesa only by agreement and with insurance confirmed on the booking date."),
                    ("Attacks on Danube ports and low Danube water", "We plan lots with a time buffer; the fallback is truck or rail to Constanța, including transit via Moldova."),
                    ("War-risk surcharge across the whole Black Sea, Romania included", "Who pays war risk is fixed in the contract. We confirm the rate in the offer on the booking date, not from past deals."),
                    ("Queues to Constanța and at borders", "We book slots in advance and watch queues daily; if delayed, we offer another crossing."),
                    ("Demurrage and delays", "Loading terms and free days are in the contract; B/L scan usually within 1 business day."),
                    ("Document delay, customs refusal", "We check the set before dispatch; backup broker; we look for a solution on the day of refusal."),
                    ("Quality and weight", "Independent survey at loading, seals, report at release from the warehouse.")]),
                ("note", "Availability of ports, borders and rail depends on wartime conditions and decisions of public authorities; we confirm the current option in the offer.")]},
            {"eyebrow": "Questions", "h2": "Delivery FAQ", "blocks": [("faq", FAQ_EN["delivery"] + FAQ_EN["risk"]),
                                                                    ("links", [("order", "Who pays for what by basis"), ("faq", "All questions")])]},
        ],
    },
    "quality": {
        "title": "Quality and documents: surveyor, GAFTA, certificates | AVENOR TRADE",
        "desc": "How AVENOR TRADE checks weight, seals and quality at loading, which documents the buyer receives and the terms our contracts are based on.",
        "img": 13, "h1": "Quality and documents",
        "lead": "We check weight, seals and documents at loading. You see what we see.",
        "sections": [
            {"eyebrow": "At loading", "h2": "What we check", "blocks": [
                ("terms", [("Weight", "We check the weight of the lot."), ("Seals", "Seal numbers are recorded in the documents."),
                           ("Quality", "As agreed in the contract, an independent GAFTA- and FOSFA-approved surveyor checks quality and weight. Samples are sealed and kept."),
                           ("Documents", "We match documents to the cargo before dispatch.")], "t4")]},
            {"eyebrow": "Documents", "h2": "Shipping document set", "blocks": [
                ("p", "The exact list is in the contract. For meals and cakes it usually includes:"),
                ("ticks", DOCS_EN + ["Non-GMO and radiation certificates — on request"]),
                ("note", "For other products the set is tailored to the destination country.")]},
            {"eyebrow": "Contract", "h2": "GAFTA terms and specification", "blocks": [
                ("p", "The contract and specification set quality, packing, lot size and delivery basis, for each product separately. Example — sunflower meal, typical for Ukrainian origin:"),
                ("table", ["Parameter", "Value"], MEAL_SPEC_EN),
                ("p", "We manage the cargo and documents. Where the risk passes is set by the Incoterms rule in the contract — see [[order|How to order]].")]},
        ],
    },
    "order": {
        "title": "How to order: 4 steps and Incoterms | AVENOR TRADE",
        "desc": "How to order agri commodities from AVENOR TRADE: request, indicative offer, contract, shipment. Who does what and where risk passes under FCA, CPT, FOB, CFR, DAP.",
        "img": 9, "h1": "How to order",
        "lead": "Send us the product, volume, port and basis. Indicative price usually within one business day.",
        "sections": [
            {"eyebrow": "Process", "h2": "4 steps", "blocks": [("steps", [
                ("Request", "Product, volume, destination port, basis, preferred timing."),
                ("Indicative offer", "Route and indicative price. Final terms are set only in the signed contract."),
                ("Contract and specification", "Price, quantity, quality and delivery basis are fixed in the contract and specification."),
                ("Shipment and documents", "Weight, seals and documents are checked at loading. One point of contact until delivery.")])]},
            {"eyebrow": "Incoterms® 2020", "h2": "Basis: who does what", "blocks": [
                ("table", ["Basis", "We", "You", "Risk passes to you"], [
                    ("FCA", "Hand the goods to your carrier at the agreed place, export clearance", "Carriage, insurance (optional), import clearance", "When the goods are handed to your carrier"),
                    ("CPT", "Export clearance, carriage to the agreed place", "Insurance (optional), import clearance, unloading", "When handed to the first carrier, still in the country of shipment"),
                    ("FOB", "Goods on board your vessel at the port of loading, export clearance", "Vessel, freight, insurance (optional), import clearance", "When the goods are on board at the port of loading"),
                    ("CFR", "Goods on board, freight to your port, export clearance", "Insurance (optional), unloading, import clearance", "When on board at the port of loading, not at the port of destination"),
                    ("DAP", "Export clearance, delivery to the agreed place", "Unloading, import clearance", "At the place of destination, before unloading")]),
                ("note", "Under these terms neither party must insure the cargo; the contract states who insures and how. Reference only. Incoterms® is a registered trademark of the ICC."),
                ("links", [("faq", "FAQ"), ("contacts", "Contacts")])]},
        ],
    },
    "about": {
        "title": "About AVENOR TRADE LLC, Odesa, Ukraine | AVENOR TRADE",
        "desc": "AVENOR TRADE LLC is a Ukrainian agri commodity exporter based in Odesa. Meals, oils, grains and pulses to Türkiye, MENA, the EU and Asia. How we work, volumes, company details.",
        "img": 5, "h1": "AVENOR TRADE LLC, Odesa",
        "lead": "A Ukrainian agri commodity exporter. Our team in Odesa manages your shipment from the producer to your port.",
        "sections": [
            {"eyebrow": "Who we are", "h2": "Exporting from Ukraine when the usual routes are closed", "blocks": [
                ("p", "AVENOR TRADE exports oilseed meals and cakes, vegetable oils, oilseeds, grains, pulses and sugar. Our buyers are feed mills, oil and food companies and traders in Türkiye, the Middle East, the EU, China and South Asia."),
                ("p", "We buy directly from farms and processing plants in Ukraine and the region, and build the logistics ourselves: trucks, rail wagons, containers, coasters. When the war closes a port or a border, we move the cargo to another route instead of stopping the delivery."),
                ("p", "Our team in Odesa has over 10 years of experience in agri exports. We work in Ukrainian, English and Turkish.")]},
            {"eyebrow": "Volumes", "h2": "What we can ship in a month", "blocks": [
                ("terms", [("400+ containers", "20' and 40', via Romanian ports and Gdańsk."),
                           ("20,000+ tonnes in bulk", "By coaster from the Danube ports."),
                           ("250+ trucks in big bags", "To Türkiye, the Middle East and the EU."),
                           ("10+ years", "of team experience in agri exports.")], "t4"),
                ("note", "This is monthly capacity, not a fixed monthly volume. Volume depends on product, route and season; every shipment is fixed by a contract.")]},
            {"eyebrow": "Principles", "h2": "How we work", "blocks": [
                ("work", [("Direct sourcing", "We know where the goods come from: farm or plant, lot, documents."),
                          ("Checks at loading", "Weight, seals, documents; an independent GAFTA- and FOSFA-approved surveyor as agreed in the contract."),
                          ("GAFTA-based contracts", "Quality, basis and timing are fixed in the contract and specification before shipment."),
                          ("Counterparty checks", "We check every party to a deal, including against sanctions lists."),
                          ("Safe payments", "Bank details change only by a letter signed by the director and are confirmed by phone."),
                          ("One contact", "From request to delivery you work with one person in our team.")])]},
            {"eyebrow": "Routes", "h2": "When one route closes, we find another.", "bg": "dark", "blocks": [
                ("routes", ROUTES_EN), ("links", [("routes", "Routes and current situation")])]},
            {"eyebrow": "Company details", "h2": "For counterparty checks", "blocks": [
                ("dl", [("Name", "AVENOR TRADE LLC (ТОВ «АВЕНОР ТРЕЙД»)"), ("EDRPOU code", "46637137"), ("Address", ADDR_EN),
                        ("Email", '<a href="mailto:info@avenor.com.ua">info@avenor.com.ua</a>'),
                        ("Phone / WhatsApp", '<a href="tel:+380739556243">+380 73 955 62 43</a>')]),
                ("note", "Received a message about “new bank details” of AVENOR TRADE? Do not pay — call us.")]},
        ],
    },
    "faq": {
        "title": "Buyer FAQ | AVENOR TRADE",
        "desc": "AVENOR TRADE answers: how to request a quote, delivery terms, transit time to China, Türkiye and the EU, sunflower meal protein, documents, war risk.",
        "img": 8, "h1": "Buyer FAQ",
        "lead": "Ordering, terms, delivery, documents and risk. If your question is not here, write to us.",
        "faq_ld": FAQ_EN["order"] + FAQ_EN["delivery"] + FAQ_EN["quality"] + FAQ_EN["risk"],
        "sections": [
            {"eyebrow": "Ordering", "h2": "Ordering and price", "blocks": [("faq", FAQ_EN["order"])]},
            {"eyebrow": "Delivery", "h2": "Routes and transit time", "blocks": [("faq", FAQ_EN["delivery"])]},
            {"eyebrow": "Quality", "h2": "Quality and documents", "blocks": [("faq", FAQ_EN["quality"])]},
            {"eyebrow": "Risk", "h2": "War and risk", "blocks": [("faq", FAQ_EN["risk"]),
                                                               ("note", "Can't find the answer? Write to info@avenor.com.ua or WhatsApp +380 73 955 62 43.")]},
        ],
    },
    "contacts": {
        "title": "Contacts — Odesa, email, WhatsApp | AVENOR TRADE",
        "desc": "Contact AVENOR TRADE LLC: info@avenor.com.ua, +380 73 955 62 43 (WhatsApp), Office 403V, 66/1 Frantsuzkyi Blvd, Odesa, Ukraine.",
        "img": 7, "h1": "Contacts",
        "lead": "Tell us the product, volume, port and basis. We send an indicative price usually within one business day.",
        "sections": [
            {"eyebrow": "Get in touch", "h2": "How to reach us", "blocks": [
                ("dl", [("Email", '<a href="mailto:info@avenor.com.ua">info@avenor.com.ua</a>'),
                        ("Phone / WhatsApp", '<a href="tel:+380739556243">+380 73 955 62 43</a>'),
                        ("Office", ADDR_EN), ("Reply to a request", "within one business day"),
                        ("Languages", "Ukrainian, English, Turkish")])]},
            {"eyebrow": "For banks", "h2": "Counterparty checks", "blocks": [
                ("dl", [("Company", "AVENOR TRADE LLC"), ("EDRPOU code", "46637137"), ("Address", ADDR_EN)]),
                ("p", "To request company documents, write to info@avenor.com.ua and state the purpose."),
                ("note", LEGAL_EN)]},
        ],
    },
    "privacy": {
        "title": "Privacy | AVENOR TRADE",
        "desc": "What data AVENOR TRADE LLC receives from the request form, why, how long it is kept and how to delete it.",
        "img": 8, "h1": "Privacy",
        "lead": "In short: what happens to the data you send through the request form.",
        "sections": [
            {"blocks": [("dl", [
                ("Who", "AVENOR TRADE LLC, EDRPOU 46637137, Odesa, Ukraine. Contact: info@avenor.com.ua"),
                ("What we receive", "Only what you enter: contact, name, company and request details. No cookies or analytics on this site."),
                ("Why", "To answer your request and prepare an offer and a contract. We do not sell data."),
                ("Where", "On our server in Ukraine and in our mailbox. Requests pass through delivery services in the USA, Canada and India."),
                ("How long", "A request without a contract — up to 2 years; under a contract — as long as the law requires."),
                ("Your rights", "Write to info@avenor.com.ua — we will show, correct or delete your data within 30 days.")]),
                ("note", LEGAL_EN)]},
        ],
    },
}

MEAL_SPEC_TR = [("Protein", "min. %35"), ("Nem", "maks. %12"), ("Yağ", "maks. %2"),
                ("Lif", "maks. %20,5"), ("Kül", "maks. %7"), ("Aflatoksin B1", "maks. 20 ppb")]
DOCS_TR = ["Ticari fatura", "Çeki listesi", "Konşimento (B/L) veya CMR", "Kalite ve ağırlık sertifikası",
           "Bitki sağlık sertifikası", "Veteriner sertifikası", "İhracat beyannamesi", "Menşe şahadetnamesi",
           "Fümigasyon sertifikası (konteyner)", "SMGS / CIM (demiryolu)"]

FAQ_TR = {
    "order": [
        ("Talebi nasıl iletirim?", "Aşağıdaki “Fiyat isteyin” formunu doldurun ya da info@avenor.com.ua adresine veya WhatsApp’tan yazın: ürün, miktar, liman ve teslim şekli. Tahmini fiyatı genellikle bir iş günü içinde göndeririz."),
        ("Tahmini fiyat neye bağlı?", "Ürün, miktar, ambalaj, varış limanı, teslim şekli ve yükleme ayı. Nihai fiyat, miktar, kalite ve teslim şekli yalnızca imzalı sözleşme ve spesifikasyonla belirlenir."),
        ("Hangi teslim şekilleriyle çalışıyorsunuz?", "FCA, CPT, FOB, CFR, DAP — her sözleşmede ayrıca kararlaştırılır. Kim ne yapar — [[order|Nasıl sipariş verilir]]."),
    ],
    "delivery": [
        ("Çin’e en hızlı rota hangisi?", "Romanya limanları üzerinden: depodan Çin’deki limana yaklaşık 60–75 gün (hat programlarına göre). Diğer rotalarda süre teklifte belirtilir."),
        ("Odesa limanından yükleme yapıyor musunuz?", "Tuna limanlarından ve Odesa’dan koster çalıştırıyoruz; Odesa’dan konteyner — talep üzerine. Şu an ana konteyner rotası Romanya limanları ve Gdańsk üzerinden."),
        ("AB’ye ve Türkiye’ye sevkiyat yapıyor musunuz?", "Türkiye: tır ve gemiyle. AB: deniz yoluyla Yunanistan ve AB limanlarına; tırla — talep üzerine."),
        ("Big bag ile sevkiyat mümkün mü?", "Evet, Türkiye’ye tırla; AB’ye talep üzerine."),
    ],
    "quality": [
        ("Küspenizin protein oranı nedir?", "Genellikle %35’ten başlar; minimum değer sözleşme spesifikasyonunda yazılır. Diğer oranlar tesise bağlı olarak talep üzerine."),
        ("Pelet var mı?", "Evet, talep üzerine."),
        ("Kaliteyi ve ağırlığı kim kontrol eder?", "Sözleşmeye göre yüklemede bağımsız bir sörvey firması. Kalite ve ağırlık sertifikası evrak setindedir."),
        ("Hangi belgeleri veriyorsunuz?", "Kalite, ağırlık, menşe ve bitki sağlık sertifikaları, B/L veya CMR. Tam liste — [[quality|Kalite]]."),
    ],
    "risk": [
        ("Savaş riski ne olacak?", "Hat savaş riski ek ücreti uygularsa, bunu kimin ödeyeceği sözleşmede belirlenir; fiyatı ve süreyi teklifte teyit ederiz. Ana rota kapanırsa başka bir rota öneririz."),
        ("Yol boyunca yükten kim sorumlu?", "Yükü ve belgeleri biz yönetiriz; risk, sözleşmedeki Incoterms kuralına göre geçer."),
    ],
}

ROUTES_TR = [
    ("Tuna limanları, Odesa → Türkiye, Yunanistan, Kıbrıs, Mısır, AB limanları", "Boğaz üzerinden koster · dökme, big bag · rezervasyon tarihindeki duruma göre"),
    ("Ukrayna → Romanya limanları → Asya ve Orta Doğu", "Limana tırla, ardından konteyner gemisi · 20' ve 40' · Çin’e yaklaşık 60–75 gün"),
    ("Batı Ukrayna → Gdańsk → Asya", "Gdańsk’a demiryoluyla, ardından konteyner gemisi · 20' ve 40'"),
    ("Ukrayna → Türkiye, Orta Doğu, AB", "Tırla · big bag · AB talep üzerine"),
]

NEWS_TR = [
    ("19.07.2026", "Mısır yüklü GOLDEN LEO dökme yük gemisi Odesa’dan çıktıktan sonra füze saldırısına uğradı. Ağustosta Büyük Odesa limanlarına temmuzdaki 169 gemi yerine yalnızca birkaç gemi girdi.", "Kyiv Post", "https://www.kyivpost.com/post/82580"),
    ("Ağustos 2026", "Tuna’nın en büyük limanı İsmail’e üç saldırı. Tuna sığ, mavnalar eksik yüklü gidiyor. Moldova, Köstence’ye demiryolu transit tarifesini 31.12.2026’ya kadar yarıya indirdi.", "Euromaidan Press (Bloomberg, Reuters)", "https://euromaidanpress.com/2026/09/03/eu-routes-ukraine-grain-exports/"),
    ("20.10.2026", "Karadeniz limanlarına bir sefer için savaş riski sigortası, 2024 ablukası öncesine göre 10–16 kat daha pahalı.", "Ukrainian Shipping Magazine", "https://en.usm.media/insurance-for-a-voyage-to-black-sea-ports-has-risen-in-price-to-2-5-million/"),
    ("26.10.2026", "Sigortacılar yüksek savaş riski bölgesini tüm Karadeniz’e genişletti. Gemiler Romanya ve Bulgaristan’ın 12 millik bölgesinde seyrediyor.", "Ukrainian Shipping Magazine", "https://en.usm.media/insurance-risk-for-shipping-has-expanded-to-the-entire-black-sea-area/"),
]

LEGAL_TR = "Sitedeki bilgiler bir teklif niteliği taşımaz. Fiyat, miktar, kalite, teslim şekli ve diğer koşullar yalnızca imzalı sözleşme ve spesifikasyonla belirlenir."
ADDR_TR = "Ofis 403V, 66/1 Frantsuzkyi Bulvarı, Odesa 65062, Ukrayna"

TR = {
    "products": {
        "title": "Ürünler — küspe, yağ, tahıl, baklagil, şeker | AVENOR TRADE",
        "desc": "AVENOR TRADE’in Ukrayna’dan sevk ettiği ürünler: yağlı tohum küspeleri, bitkisel yağlar, yağlı tohumlar, tahıllar, baklagiller ve şeker. Her grup için ambalaj ve teslim şekli.",
        "img": 14, "h1": "Ne sevk ediyoruz",
        "lead": "Küspe ve kekler, yağlar, yağlı tohumlar, tahıllar, baklagiller ve şeker. Aradığınız ürünü bulamadınız mı? Bize yazın.",
        "sections": [
            {"eyebrow": "Altı grup", "h2": "Ürünler, ambalaj ve teslim şekli", "blocks": [("groups", [
                (1, "Küspe, kek ve yem", ["Ayçiçeği küspesi ve peleti — [[meal|ayrıntılar]]", "Soya küspesi", "Kanola küspesi ve keki", "DDGS", "Mısır gluten yemi", "Pancar posası peleti", "Buğday kepeği peleti", "Melas"],
                 "Dökme (gemi, konteyner), big bag, vagon · FCA, FOB, CFR, CPT, DAP"),
                (3, "Bitkisel yağlar", ["Ayçiçek: ham, rafine, yüksek oleik", "Soya", "Kanola", "Ayçiçek lesitini"],
                 "Dökme (tanker), flexitank, karayolu tankeri · FCA, FOB, CFR, DAP"),
                (14, "Yağlı ve özel tohumlar", ["Ayçiçeği tohumu, yüksek oleik dahil", "Soya fasulyesi", "Kanola", "Keten tohumu", "Hardal tohumu", "Kişniş"],
                 "Dökme (gemi), big bag, vagon, konteyner · FCA, FOB, CFR, CPT, DAP"),
                (9, "Tahıllar ve değirmen ürünleri", ["Buğday, ekmeklik ve yemlik", "Mısır", "Arpa", "Yulaf", "Darı", "Sorgum", "Malt", "Buğday unu", "Mısır irmiği"],
                 "Dökme (gemi), konteyner, vagon, big bag · FCA, FOB, CFR, CPT, DAP"),
                (10, "Baklagiller", ["Sarı ve yeşil bezelye", "Nohut", "Mercimek", "Barbunya / kuru fasulye", "Bakla"],
                 "Konteyner, big bag, dökme (gemi) · FCA, FOB, CFR, CPT"),
                (12, "Şeker", ["Beyaz pancar şekeri"], "50 kg çuval veya big bag, konteyner, tır · FCA, FOB, CFR, DAP"),
            ])]},
            {"eyebrow": "Tüm gruplar", "h2": "Koşullar", "blocks": [
                ("terms", [("Teslim şekli", "**FCA · CPT · FOB · CFR · DAP** (Incoterms® 2020), her sözleşmede ayrıca kararlaştırılır."),
                           ("Kalite", "Parametreler, ambalaj ve parti büyüklüğü sözleşme ve spesifikasyonda belirlenir. Nasıl kontrol ediyoruz — [[quality|Kalite]]."),
                           ("Rota", "Ürüne, ambalaja ve limana göre seçilir. Tüm rotalar — [[routes|Rotalar]].")]),
                ("note", LEGAL_TR)]},
        ],
    },
    "meal": {
        "title": "Ukrayna ayçiçeği küspesi — ihracat, spesifikasyon | AVENOR TRADE",
        "desc": "Asya, AB, Orta Doğu ve Türkiye’deki yem fabrikaları ve tüccarlar için Ukrayna ayçiçeği küspesi. Protein %35’ten başlar; dökme, konteyner ve big bag.",
        "img": 2, "h1": "Ukrayna ayçiçeği küspesi",
        "lead": "Ana ürünümüz. Asya (Çin dahil), AB, Orta Doğu, Kuzey Afrika ve Türkiye’deki yem fabrikaları ve tüccarlar için.",
        "tags": ["Dökme", "20' ve 40' konteyner", "Big bag"],
        "sections": [
            {"eyebrow": "Spesifikasyon", "h2": "Tipik spesifikasyon", "blocks": [
                ("table", ["Parametre", "Değer"], MEAL_SPEC_TR),
                ("note", "GTİP 2306 30. Peletsiz; pelet talep üzerine. Ukrayna menşei için tipik değerler. Kalite, ambalaj ve parti büyüklüğü sözleşme ve spesifikasyonda belirlenir.")]},
            {"eyebrow": "Çin", "h2": "Yalnızca GACC kayıtlı tesisler", "blocks": [
                ("p", "Çin’e sevkiyatlarda, sözleşme imzalanmadan önce tesisin GACC kaydını kontrol ederiz.")]},
            {"eyebrow": "Nasıl sevk ediyoruz", "h2": "Küspe için üç ana rota", "bg": "dark", "blocks": [
                ("routes", [("Tır → Romanya limanları → Asya, Orta Doğu", "20' ve 40' konteyner"),
                            ("Batı Ukrayna → demiryolu → Gdańsk → Asya", "20' ve 40' konteyner"),
                            ("Ukrayna → Türkiye", "Tenteli tırda big bag, DAP")]),
                ("note", "Ayrıca Tuna limanlarından ve Odesa’dan koster ile. Tüm rotalar — [[routes|Rotalar]].")]},
            {"eyebrow": "Belgeler", "h2": "Evrak setinde neler var", "blocks": [
                ("p", "Bağımsız sörveyör yüklemede numune alır ve mühürler; numuneler saklanır. Sözleşmeler GAFTA koşullarına dayanır."),
                ("ticks", DOCS_TR)]},
            {"eyebrow": "Sorular", "h2": "Ayçiçeği küspesi hakkında sorular", "blocks": [("faq", FAQ_TR["quality"][:3] + [FAQ_TR["delivery"][3]])]},
        ],
    },
    "routes": {
        "title": "Rotalar ve lojistik: Gdańsk, Romanya, Tuna, Türkiye | AVENOR TRADE",
        "desc": "Ukrayna’dan limanınıza dört rota: Gdańsk üzerinden demiryolu, Romanya limanları üzerinden tır, Tuna ve Odesa’dan koster, Türkiye ve AB’ye tır. Riskler ve nasıl yönetiyoruz.",
        "img": 6, "h1": "Limanınıza dört rota",
        "lead": "Gdańsk üzerinden demiryolu, Romanya limanları üzerinden tır, Tuna limanları ve Odesa’dan gemi, Türkiye’ye tır. Yükü depodan tahliye limanına kadar biz yönetiriz.",
        "sections": [
            {"eyebrow": "Rotalar", "h2": "Bir rota kapanırsa, başkasını buluruz.", "bg": "dark", "blocks": [("rmap",), ("routes", ROUTES_TR)]},
            {"eyebrow": "Neyi üstleniyoruz", "h2": "Depodan limana tek zincir", "blocks": [
                ("terms", [("Rota seçimi", "Ürüne, ambalaja ve süreye göre."), ("Rezervasyon ve program", "Hat, gemi, araç tedariki."),
                           ("Belgeler", "CMR, B/L, SMGS/CIM, bitki sağlık sertifikası, fümigasyon."),
                           ("Yükleme kontrolü", "Sörvey, mühürler, rapor."), ("Takip", "Depodan tahliye limanına kadar."),
                           ("Demuraj ve gecikmeler", "Koşullar ve serbest günler sözleşmede belirlenir.")]),
                ("p", "Beş ayrı yükleniciyle değil, yalnızca bizimle konuşursunuz.")]},
            {"eyebrow": "Durum", "h2": "Denizde şu an neler oluyor", "lead": "Son aylarda rotayı ve teslim fiyatını etkileyen başlıca gelişmeler.", "blocks": [
                ("news", NEWS_TR, "28.10.2026 itibarıyla · kontrol edildi: 3 kaynak. Her ay güncellenir.")]},
            {"eyebrow": "Riskler", "h2": "Riskler ve nasıl yönetiyoruz", "blocks": [
                ("table", ["Risk", "Ne yapıyoruz"], [
                    ("Büyük Odesa limanlarına ve koridordaki gemilere saldırılar", "Konteynerleri şu an Odesa limanlarına bağlı olmayan Romanya limanları ve Gdańsk üzerinden gönderiyoruz. Odesa’dan koster yalnızca mutabakatla ve rezervasyon tarihinde teyit edilmiş sigortayla."),
                    ("Tuna limanlarına saldırılar ve sığ Tuna", "Partileri zaman payıyla planlıyoruz; yedek seçenek Köstence’ye tır veya demiryolu, Moldova üzerinden transit dahil."),
                    ("Romanya dahil tüm Karadeniz’de savaş riski ek ücreti", "Savaş riskini kimin ödeyeceği sözleşmede yazılır. Oranı geçmiş işlerden değil, rezervasyon tarihinde teklifte teyit ederiz."),
                    ("Köstence’ye ve sınırlarda kuyruklar", "Slotları önceden ayırıyor, kuyrukları her gün izliyoruz; gecikmede başka bir geçiş noktası öneriyoruz."),
                    ("Demuraj ve gecikmeler", "Yükleme koşulları ve serbest günler sözleşmede; B/L taraması genellikle 1 iş günü içinde."),
                    ("Belge gecikmesi, gümrük reddi", "Seti sevkiyattan önce kontrol ediyoruz; yedek gümrük müşaviri; ret günü çözüm arıyoruz."),
                    ("Kalite ve ağırlık", "Yüklemede bağımsız sörvey, mühürler, depodan çıkışta rapor.")]),
                ("note", "Limanların, sınırların ve demiryolunun kullanılabilirliği savaş koşullarına ve resmi makamların kararlarına bağlıdır; güncel seçeneği teklifte teyit ederiz.")]},
            {"eyebrow": "Sorular", "h2": "Teslimat hakkında sorular", "blocks": [("faq", FAQ_TR["delivery"] + FAQ_TR["risk"]),
                                                                    ("links", [("order", "Teslim şekline göre kim neyi öder"), ("faq", "Tüm sorular")])]},
        ],
    },
    "quality": {
        "title": "Kalite ve belgeler: sörveyör, GAFTA, sertifikalar | AVENOR TRADE",
        "desc": "AVENOR TRADE yüklemede ağırlığı, mühürleri ve kaliteyi nasıl kontrol eder, alıcı hangi belgeleri alır ve sözleşmelerimiz hangi koşullara dayanır.",
        "img": 13, "h1": "Kalite ve belgeler",
        "lead": "Yüklemede ağırlığı, mühürleri ve belgeleri kontrol ederiz. Bizim gördüğümüzü siz de görürsünüz.",
        "sections": [
            {"eyebrow": "Yüklemede", "h2": "Neyi kontrol ediyoruz", "blocks": [
                ("terms", [("Ağırlık", "Partinin ağırlığını kontrol ederiz."), ("Mühürler", "Mühür numaraları belgelere işlenir."),
                           ("Kalite", "Sözleşmeye göre GAFTA ve FOSFA onaylı bağımsız bir sörveyör kaliteyi ve ağırlığı kontrol eder. Numuneler mühürlenir ve saklanır."),
                           ("Belgeler", "Sevkiyattan önce belgeleri yükle karşılaştırırız.")], "t4")]},
            {"eyebrow": "Belgeler", "h2": "Sevkiyat evrak seti", "blocks": [
                ("p", "Kesin liste sözleşmededir. Küspe ve kekler için genellikle şunları içerir:"),
                ("ticks", DOCS_TR + ["GDO’suzluk ve radyasyon sertifikaları — talep üzerine"]),
                ("note", "Diğer ürünler için set varış ülkesine göre hazırlanır.")]},
            {"eyebrow": "Sözleşme", "h2": "GAFTA koşulları ve spesifikasyon", "blocks": [
                ("p", "Sözleşme ve spesifikasyon kaliteyi, ambalajı, parti büyüklüğünü ve teslim şeklini her ürün için ayrı belirler. Örnek — Ukrayna menşei için tipik ayçiçeği küspesi:"),
                ("table", ["Parametre", "Değer"], MEAL_SPEC_TR),
                ("p", "Yükü ve belgeleri biz yönetiriz. Riskin nerede geçtiğini sözleşmedeki Incoterms kuralı belirler — bkz. [[order|Nasıl sipariş verilir]].")]},
        ],
    },
    "order": {
        "title": "Nasıl sipariş verilir: 4 adım ve Incoterms | AVENOR TRADE",
        "desc": "AVENOR TRADE’den tarım ürünü nasıl sipariş edilir: talep, tahmini teklif, sözleşme, sevkiyat. FCA, CPT, FOB, CFR, DAP’ta kim ne yapar ve risk nerede geçer.",
        "img": 9, "h1": "Nasıl sipariş verilir",
        "lead": "Bize ürünü, miktarı, limanı ve teslim şeklini gönderin. Tahmini fiyat genellikle bir iş günü içinde.",
        "sections": [
            {"eyebrow": "Süreç", "h2": "4 adım", "blocks": [("steps", [
                ("Talep", "Ürün, miktar, varış limanı, teslim şekli, tercih edilen süre."),
                ("Tahmini teklif", "Rota ve tahmini fiyat. Nihai koşullar yalnızca imzalı sözleşmede belirlenir."),
                ("Sözleşme ve spesifikasyon", "Fiyat, miktar, kalite ve teslim şekli sözleşme ve spesifikasyonda sabitlenir."),
                ("Sevkiyat ve belgeler", "Yüklemede ağırlık, mühürler ve belgeler kontrol edilir. Teslimata kadar tek muhatap.")])]},
            {"eyebrow": "Incoterms® 2020", "h2": "Teslim şekli: kim ne yapar", "blocks": [
                ("table", ["Teslim şekli", "Biz", "Siz", "Risk size geçer"], [
                    ("FCA", "Malı kararlaştırılan yerde taşıyıcınıza teslim, ihracat gümrüklemesi", "Taşıma, sigorta (isteğe bağlı), ithalat gümrüklemesi", "Mal taşıyıcınıza teslim edildiğinde"),
                    ("CPT", "İhracat gümrüklemesi, kararlaştırılan yere kadar taşıma", "Sigorta (isteğe bağlı), ithalat gümrüklemesi, boşaltma", "İlk taşıyıcıya teslimde, hâlâ yükleme ülkesindeyken"),
                    ("FOB", "Yükleme limanında mal geminizin güvertesinde, ihracat gümrüklemesi", "Gemi, navlun, sigorta (isteğe bağlı), ithalat gümrüklemesi", "Mal yükleme limanında gemiye yüklendiğinde"),
                    ("CFR", "Mal gemide, limanınıza kadar navlun, ihracat gümrüklemesi", "Sigorta (isteğe bağlı), boşaltma, ithalat gümrüklemesi", "Yükleme limanında gemiye yüklendiğinde, varış limanında değil"),
                    ("DAP", "İhracat gümrüklemesi, kararlaştırılan yere teslim", "Boşaltma, ithalat gümrüklemesi", "Varış yerinde, boşaltmadan önce")]),
                ("note", "Bu koşullarda tarafların hiçbiri yükü sigortalamak zorunda değildir; kimin ve nasıl sigortalayacağı sözleşmede yazılır. Yalnızca bilgi amaçlıdır. Incoterms® ICC’nin tescilli markasıdır."),
                ("links", [("faq", "SSS"), ("contacts", "İletişim")])]},
        ],
    },
    "about": {
        "title": "AVENOR TRADE LLC hakkında, Odesa, Ukrayna | AVENOR TRADE",
        "desc": "AVENOR TRADE LLC, Odesa merkezli Ukraynalı tarım ürünleri ihracatçısıdır. Türkiye, Orta Doğu ve Kuzey Afrika, AB ve Asya’ya küspe, yağ, tahıl ve baklagil. Çalışma şeklimiz, hacimler, şirket bilgileri.",
        "img": 5, "h1": "AVENOR TRADE LLC, Odesa",
        "lead": "Ukraynalı bir tarım ürünleri ihracatçısı. Odesa’daki ekibimiz sevkiyatınızı üreticiden limanınıza kadar yönetir.",
        "sections": [
            {"eyebrow": "Biz kimiz", "h2": "Alışılmış rotalar kapalıyken Ukrayna’dan ihracat", "blocks": [
                ("p", "AVENOR TRADE yağlı tohum küspeleri ve kekleri, bitkisel yağlar, yağlı tohumlar, tahıllar, baklagiller ve şeker ihraç eder. Alıcılarımız Türkiye, Orta Doğu, AB, Çin ve Güney Asya’daki yem fabrikaları, yağ ve gıda şirketleri ve tüccarlardır."),
                ("p", "Doğrudan Ukrayna ve bölgedeki çiftliklerden ve işleme tesislerinden alır, lojistiği kendimiz kurarız: tır, vagon, konteyner, koster. Savaş bir limanı veya sınırı kapattığında teslimatı durdurmak yerine yükü başka bir rotaya aktarırız."),
                ("p", "Odesa’daki ekibimizin tarım ihracatında 10 yılı aşkın deneyimi var. Ukraynaca, İngilizce ve Türkçe çalışıyoruz.")]},
            {"eyebrow": "Hacimler", "h2": "Bir ayda ne kadar sevk edebiliriz", "blocks": [
                ("terms", [("400+ konteyner", "20' ve 40', Romanya limanları ve Gdańsk üzerinden."),
                           ("20 000+ ton dökme", "Tuna limanlarından koster ile."),
                           ("250+ tır big bag", "Türkiye, Orta Doğu ve AB’ye."),
                           ("10+ yıl", "ekibin tarım ihracatı deneyimi.")], "t4"),
                ("note", "Bu aylık kapasitedir, sabit aylık hacim değildir. Hacim ürüne, rotaya ve sezona bağlıdır; her sevkiyat sözleşmeyle belirlenir.")]},
            {"eyebrow": "İlkeler", "h2": "Nasıl çalışıyoruz", "blocks": [
                ("work", [("Doğrudan tedarik", "Malın nereden geldiğini biliriz: çiftlik veya tesis, parti, belgeler."),
                          ("Yüklemede kontrol", "Ağırlık, mühürler, belgeler; sözleşmeye göre GAFTA ve FOSFA onaylı bağımsız sörveyör."),
                          ("GAFTA tabanlı sözleşmeler", "Kalite, teslim şekli ve süreler sevkiyattan önce sözleşme ve spesifikasyonda sabitlenir."),
                          ("Karşı taraf kontrolü", "Her işlemin her tarafını, yaptırım listeleri dahil kontrol ederiz."),
                          ("Güvenli ödemeler", "Banka bilgileri yalnızca müdür imzalı bir yazıyla değişir ve telefonla teyit edilir."),
                          ("Tek muhatap", "Talepten teslimata kadar ekibimizden tek bir kişiyle çalışırsınız.")])]},
            {"eyebrow": "Rotalar", "h2": "Bir rota kapanırsa, başkasını buluruz.", "bg": "dark", "blocks": [
                ("routes", ROUTES_TR), ("links", [("routes", "Rotalar ve güncel durum")])]},
            {"eyebrow": "Şirket bilgileri", "h2": "Karşı taraf kontrolü için", "blocks": [
                ("dl", [("Unvan", "AVENOR TRADE LLC (ТОВ «АВЕНОР ТРЕЙД»)"), ("EDRPOU kodu", "46637137"), ("Adres", ADDR_TR),
                        ("E-posta", '<a href="mailto:info@avenor.com.ua">info@avenor.com.ua</a>'),
                        ("Telefon / WhatsApp", '<a href="tel:+380739556243">+380 73 955 62 43</a>')]),
                ("note", "AVENOR TRADE’in “yeni banka bilgileri” hakkında bir mesaj mı aldınız? Ödeme yapmayın — bizi arayın.")]},
        ],
    },
    "faq": {
        "title": "Alıcılar için SSS | AVENOR TRADE",
        "desc": "AVENOR TRADE yanıtlıyor: fiyat talebi nasıl yapılır, teslim şekilleri, Çin, Türkiye ve AB’ye süre, ayçiçeği küspesinde protein, belgeler, savaş riski.",
        "img": 8, "h1": "Alıcılar için SSS",
        "lead": "Sipariş, koşullar, teslimat, belgeler ve risk. Sorunuz burada yoksa bize yazın.",
        "faq_ld": FAQ_TR["order"] + FAQ_TR["delivery"] + FAQ_TR["quality"] + FAQ_TR["risk"],
        "sections": [
            {"eyebrow": "Sipariş", "h2": "Sipariş ve fiyat", "blocks": [("faq", FAQ_TR["order"])]},
            {"eyebrow": "Teslimat", "h2": "Rotalar ve süreler", "blocks": [("faq", FAQ_TR["delivery"])]},
            {"eyebrow": "Kalite", "h2": "Kalite ve belgeler", "blocks": [("faq", FAQ_TR["quality"])]},
            {"eyebrow": "Risk", "h2": "Savaş ve riskler", "blocks": [("faq", FAQ_TR["risk"]),
                                                                  ("note", "Yanıtı bulamadınız mı? info@avenor.com.ua adresine veya WhatsApp +380 73 955 62 43’e yazın.")]},
        ],
    },
    "contacts": {
        "title": "İletişim — Odesa, e-posta, WhatsApp | AVENOR TRADE",
        "desc": "AVENOR TRADE LLC ile iletişim: info@avenor.com.ua, +380 73 955 62 43 (WhatsApp), Ofis 403V, 66/1 Frantsuzkyi Bulvarı, Odesa, Ukrayna.",
        "img": 7, "h1": "İletişim",
        "lead": "Bize ürünü, miktarı, limanı ve teslim şeklini yazın. Tahmini fiyatı genellikle bir iş günü içinde göndeririz.",
        "sections": [
            {"eyebrow": "Bize ulaşın", "h2": "Nasıl ulaşılır", "blocks": [
                ("dl", [("E-posta", '<a href="mailto:info@avenor.com.ua">info@avenor.com.ua</a>'),
                        ("Telefon / WhatsApp", '<a href="tel:+380739556243">+380 73 955 62 43</a>'),
                        ("Ofis", ADDR_TR), ("Talebe yanıt", "bir iş günü içinde"),
                        ("Diller", "Ukraynaca, İngilizce, Türkçe")])]},
            {"eyebrow": "Bankalar için", "h2": "Karşı taraf kontrolü", "blocks": [
                ("dl", [("Şirket", "AVENOR TRADE LLC"), ("EDRPOU kodu", "46637137"), ("Adres", ADDR_TR)]),
                ("p", "Şirket belgelerini talep etmek için info@avenor.com.ua adresine amacınızı belirterek yazın."),
                ("note", LEGAL_TR)]},
        ],
    },
    "privacy": {
        "title": "Gizlilik | AVENOR TRADE",
        "desc": "AVENOR TRADE LLC talep formundan hangi verileri alır, neden, ne kadar süre saklar ve nasıl silinir.",
        "img": 8, "h1": "Gizlilik",
        "lead": "Kısaca: talep formuyla gönderdiğiniz verilere ne olur.",
        "sections": [
            {"blocks": [("dl", [
                ("Kim", "AVENOR TRADE LLC, EDRPOU 46637137, Odesa, Ukrayna. İletişim: info@avenor.com.ua"),
                ("Ne alıyoruz", "Yalnızca girdiğiniz bilgiler: iletişim, ad, şirket ve talep ayrıntıları. Bu sitede çerez veya analitik yok."),
                ("Neden", "Talebinize yanıt vermek, teklif ve sözleşme hazırlamak için. Verileri satmayız."),
                ("Nerede", "Ukrayna’daki sunucumuzda ve e-posta kutumuzda. Talepler ABD, Kanada ve Hindistan’daki iletim hizmetlerinden geçer."),
                ("Ne kadar süre", "Sözleşmesiz talep — 2 yıla kadar; sözleşmeli — yasanın gerektirdiği süre boyunca."),
                ("Haklarınız", "info@avenor.com.ua adresine yazın — verilerinizi 30 gün içinde gösterir, düzeltir veya sileriz.")]),
                ("note", LEGAL_TR)]},
        ],
    },
}

PAGES = {"uk": UK, "en": EN, "tr": TR}
