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
    ("Дунайські порти, Одеса → Туреччина, Греція, Кіпр, Єгипет, порти ЄС", "Каботажне судно через Босфор · навалом, біг‑беги"),
    ("Україна → порти Румунії → Азія і Близький Схід", "Фури до порту, далі контейнеровоз · 20' і 40' · до Китаю орієнтовно 60–75 днів"),
    ("Західна Україна → Гданськ → Азія", "Залізницею до Гданська, далі контейнеровоз · 20' і 40'"),
    ("Україна → Туреччина, Близький Схід, ЄС", "Фурами · біг‑беги · ЄС — за запитом"),
]
ROUTES_EN = [
    ("Danube ports, Odesa → Türkiye, Greece, Cyprus, Egypt, EU ports", "Coaster via the Bosphorus · bulk, big bags"),
    ("Ukraine → Romanian ports → Asia and Middle East", "Trucks to the port, then container ship · 20' and 40' · to China approx. 60–75 days"),
    ("Western Ukraine → Gdańsk → Asia", "Rail to Gdańsk, then container ship · 20' and 40'"),
    ("Ukraine → Türkiye, Middle East, EU", "Trucks · big bags · EU on request"),
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
            {"eyebrow": "Маршрути", "h2": "Закрився один маршрут — знаходимо інший.", "bg": "dark", "blocks": [("routes", ROUTES_UK)]},
            {"eyebrow": "Що ми беремо на себе", "h2": "Один ланцюг від складу до порту", "blocks": [
                ("terms", [("Підбір маршруту", "Під товар, тару й строк."), ("Букінг і графік", "Лінія, судно, подача транспорту."),
                           ("Документи", "CMR, коносамент, СМГС/CIM, фітосанітарний сертифікат, фумігація."),
                           ("Контроль завантаження", "Сюрвеєр, пломби, акт."), ("Трекінг", "Від складу до порту розвантаження."),
                           ("Простій і демередж", "Строки й безкоштовні дні — у договорі.")]),
                ("p", "Ви говорите з нами, а не з п’ятьма підрядниками.")]},
            {"eyebrow": "Ризики", "h2": "Ризики і як ми їх закриваємо", "blocks": [
                ("table", ["Ризик", "Що робимо"], [
                    ("Удари по портах і суднах Чорного моря й Дунаю", "Пропонуємо інший шлях: залізниця через Гданськ і фури через порти Румунії не залежать від українських портів. Хто сплачує воєнну надбавку лінії, узгоджуємо в договорі."),
                    ("Закриття чи обмеження порту", "Сусідній порт (Румунія, Гданськ) — за згодою сторін; запас за строками — у договорі."),
                    ("Черги на кордоні й залізничних переходах", "Стежимо за чергою щодня, бронюємо найближче вікно; заявку на вагони подаємо заздалегідь."),
                    ("Простій і демередж", "Строки завантаження й безкоштовні дні фіксуємо в договорі; скан коносамента — зазвичай за 1 робочий день."),
                    ("Затримка документів, відмова митниці", "Перевіряємо комплект до відправлення; запасний брокер; рішення шукаємо в день відмови."),
                    ("Якість і вага", "Сюрвеєр при завантаженні, пломби, акт при видачі зі складу.")]),
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
        "desc": "ТОВ «АВЕНОР ТРЕЙД» — український експортер агропродукції з Одеси. Шрот, олії, зернові й бобові до Туреччини, MENA, ЄС та Азії. Реквізити компанії.",
        "img": 5, "h1": "ТОВ «АВЕНОР ТРЕЙД», Одеса",
        "lead": "Український експортер агропродукції. Наша команда в Одесі веде вашу поставку від виробника до вашого порту.",
        "sections": [
            {"eyebrow": "Хто ми", "h2": "З України — до вашого порту", "blocks": [
                ("p", "Експортуємо шрот і макуху, рослинні олії, олійні культури, зернові, бобові та цукор до Туреччини, країн MENA, ЄС та Азії. Купуємо у виробників і на переробних заводах України та регіону."),
                ("work", [("Прямі закупівлі", "Купуємо напряму в господарств і на олієекстракційних заводах."),
                          ("Контроль при завантаженні", "Вага, пломби, документи; незалежний сюрвеєр за договором."),
                          ("Один контакт", "Від запиту до доставки ви працюєте з одним контактом у нашій команді.")])]},
            {"eyebrow": "Маршрути", "h2": "Закрився один маршрут — знаходимо інший.", "bg": "dark", "blocks": [
                ("routes", ROUTES_UK), ("links", [("routes", "Детальніше про маршрути")])]},
            {"eyebrow": "Реквізити", "h2": "Для перевірки контрагента", "blocks": [
                ("dl", [("Назва", "ТОВ «АВЕНОР ТРЕЙД»"), ("Код ЄДРПОУ", "46637137"), ("Адреса", ADDR_UK),
                        ("E-mail", '<a href="mailto:info@avenor.com.ua">info@avenor.com.ua</a>'),
                        ("Телефон / WhatsApp", '<a href="tel:+380739556243">+380 73 955 62 43</a>')]),
                ("note", "Реквізити змінюються лише листом із підписом директора, і ми завжди підтверджуємо це дзвінком. Отримали повідомлення про «нові реквізити»? Не платіть — зателефонуйте нам.")]},
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
            {"eyebrow": "Routes", "h2": "When one route closes, we find another.", "bg": "dark", "blocks": [("routes", ROUTES_EN)]},
            {"eyebrow": "What we take on", "h2": "One chain from warehouse to port", "blocks": [
                ("terms", [("Route selection", "Matched to product, packing and deadline."), ("Booking and schedule", "Line, vessel, transport supply."),
                           ("Documents", "CMR, B/L, SMGS/CIM, phytosanitary certificate, fumigation."),
                           ("Loading control", "Survey, seals, report."), ("Tracking", "From warehouse to discharge port."),
                           ("Demurrage and delays", "Terms and free days are set in the contract.")]),
                ("p", "You talk to us, not to five contractors.")]},
            {"eyebrow": "Risks", "h2": "Risks and how we cover them", "blocks": [
                ("table", ["Risk", "What we do"], [
                    ("Strikes on Black Sea and Danube ports and vessels", "We offer another route: rail via Gdańsk and trucks via Romanian ports do not depend on Ukrainian ports. Who pays a line's war-risk surcharge is agreed in the contract."),
                    ("Port closure or restriction", "A neighbouring port (Romania, Gdańsk) by agreement; time buffer set in the contract."),
                    ("Queues at the border and rail crossings", "We watch the queue daily and book the nearest slot; wagon requests are filed in advance."),
                    ("Demurrage and delays", "Loading terms and free days are fixed in the contract; B/L scan usually within 1 business day."),
                    ("Document delay, customs refusal", "We check the set before dispatch; backup broker; we look for a solution on the day of refusal."),
                    ("Quality and weight", "Survey at loading, seals, report at release from the warehouse.")]),
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
        "desc": "AVENOR TRADE LLC is a Ukrainian agri commodity exporter based in Odesa. Meals, oils, grains and pulses to Türkiye, MENA, the EU and Asia. Company details.",
        "img": 5, "h1": "AVENOR TRADE LLC, Odesa",
        "lead": "A Ukrainian agri commodity exporter. Our team in Odesa manages your shipment from the producer to your port.",
        "sections": [
            {"eyebrow": "Who we are", "h2": "From Ukraine to your port", "blocks": [
                ("p", "We export oilseed meals and cakes, vegetable oils, oilseeds, grains, pulses and sugar to Türkiye, MENA, the EU and Asia. We buy from producers and processing plants in Ukraine and the region."),
                ("work", [("Direct sourcing", "We buy directly from farms and crushing plants."),
                          ("Checks at loading", "Weight, seals, documents; an independent surveyor as agreed in the contract."),
                          ("One contact", "From request to delivery you work with one contact in our team.")])]},
            {"eyebrow": "Routes", "h2": "When one route closes, we find another.", "bg": "dark", "blocks": [
                ("routes", ROUTES_EN), ("links", [("routes", "More about routes")])]},
            {"eyebrow": "Company details", "h2": "For counterparty checks", "blocks": [
                ("dl", [("Name", "AVENOR TRADE LLC (ТОВ «АВЕНОР ТРЕЙД»)"), ("EDRPOU code", "46637137"), ("Address", ADDR_EN),
                        ("Email", '<a href="mailto:info@avenor.com.ua">info@avenor.com.ua</a>'),
                        ("Phone / WhatsApp", '<a href="tel:+380739556243">+380 73 955 62 43</a>')]),
                ("note", "Our bank details change only by a letter signed by the director, and we always confirm it by phone. Received a message about “new bank details”? Do not pay — call us.")]},
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

PAGES = {"uk": UK, "en": EN}
