# Design Specification — Nixly-inspired UI

## 0) Visual DNA (что делает дизайн "как у Nixly")
- Тёплый светлый фон (paper / кремовый), поверх него — белые карточки.
- Очень мягкие углы, минимальные тени (скорее "поднятие" + тонкая обводка).
- Много воздуха: большие внутренние отступы карточек и секций.
- Типографика простая и уверенная: крупный заголовок + спокойный сабтекст.
- UI ощущается как "премиальный трекер подписок": тихий, чистый, без неона и градиентов.
- Частый паттерн: крупные cards + список "rows" внутри (как в Nixly). (см. скриншоты) 

> Примечание: HEX ниже — ориентиры. Если нужно 1:1, берём пипеткой реальные цвета со скринов.

---

## 1) Color tokens
### Base (paper theme)
- bg:            #F7F2E8  (кремовый фон страницы)
- surface:       #FFFFFF  (карточки)
- surfaceMuted:  #FBF8F2  (внутренние "мягкие" блоки/подложки)
- text:          #161616  (основной текст почти чёрный)
- textMuted:     #6F6A60  (сабтекст)
- border:        #E9E1D3  (тонкая граница карточек/строк)
- divider:       #EFE8DD

### Accent (очень сдержанно)
- accent:        #1F1F1F  (активные иконки/пилюли/тёмные акценты)
- accentSoft:    #F0E9DE  (hover/selected background для светлых элементов)

### States
- success:       #1F8A4C  (редко, только смысл)
- warning:       #B7791F
- danger:        #C2413A
- focusRing:     rgba(31, 31, 31, 0.18)

Правило: никаких "кислотных" цветов. Логотипы сервисов/иконки могут быть цветными, но UI вокруг — нейтральный.

---

## 2) Typography
### Font
- Основной: Inter / system-ui / -apple-system / Segoe UI (любая чистая sans).
- Кернинг нормальный, без экспериментов.

### Scale (похоже на интерфейсы Nixly)
- H1: 32–36 / 40–44, weight 700
- H2: 20–24 / 28–32, weight 700
- Title: 16–18 / 24–28, weight 600
- Body: 14–16 / 20–24, weight 400–500
- Caption/Muted: 12–13 / 16–18, weight 400

Правила:
- На экране 1 главный заголовок + 1 строка объяснения (как "Quick check!" + subtitle). 
- Не плодить размеры: в одной секции максимум 2–3 размера.

---

## 3) Spacing & layout
### Spacing scale
Использовать только: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

### Container
- Max width: 1120–1200
- Page padding: 16 (mobile) / 24 (tablet) / 32 (desktop)

### Cards
- Padding: 20–24 (mobile), 24–32 (desktop)
- Gap между карточками: 16–24

---

## 4) Shape (радиусы)
- radiusCard: 20–24 (большие карточки, как на дашборде) 
- radiusRow:  16–20 (строки списков)
- radiusPill: 999 (табы/чипсы)
- radiusInput: 14–16

---

## 5) Elevation (тени очень мягкие)
Использовать 2 уровня:
- e0: none
- e1: 0 1px 2px rgba(0,0,0,0.04)
- e2: 0 6px 18px rgba(0,0,0,0.06)

Правило: карточка почти всегда имеет и **border**, и **очень лёгкую** тень. Никаких жирных drop-shadows.

---

## 6) Components

### 6.1 Card
- Background: surface
- Border: 1px solid border
- Radius: radiusCard
- Shadow: e1
- Header внутри: title слева, action/link справа ("View all →" как на карточке reminders). 

### 6.2 List Row (строка подписки/элемента)
(как в "Quick check" списке) 
- Высота: 56–64
- Radius: radiusRow
- Border: 1px solid border
- Layout: [logo 24] [name + price] [optional status]
- Hover: background surfaceMuted или лёгкий accentSoft
- Не использовать таблицы — только list/rows.

### 6.3 Tabs / segmented pills
(как верхние "Usage / Rating / Favorites") 
- Pill container: прозрачный фон
- Item:
  - radius: radiusPill
  - padding: 10–12 px vertical, 14–16 px horizontal
  - inactive: textMuted + тонкая обводка (или без обводки)
  - active: background accentSoft или accent (если хочется контраста) + текст text

### 6.4 Buttons
- Primary: тёмная (почти чёрная) кнопка, radius 14–16, height ~44
- Secondary: outline (border border, bg surface)
- Hover/Pressed: только слегка менять фон/тень, без "светомузыки".

### 6.5 Badges / status
- Минимальные "chips": маленькие, спокойные, без ярких заливок.
- Важное (trial/alert) выделять иконкой + muted background.

### 6.6 Illustrations
В больших cards допускается монохромная/сероватая иллюстрация справа (как на greeting card). 
- Цвет: близко к textMuted, низкая контрастность.

---

## 7) Interaction & motion
- Transition: 120–180ms ease-out
- Hover на card: тень e1 -> e2 + border чуть темнее
- Pressed: лёгкое "опускание" (уменьшить тень), без scale (или максимум 0.98)
- Focus: видимый ring (focusRing) + не убирать outline

---

## 8) Do / Don't
DO:
- Держать интерфейс "тихим": нейтральные поверхности + смысловые акценты.
- Делать крупные, читабельные карточки и простые списки.
- Много воздуха и стабильная сетка.

DON'T:
- Градиенты, glassmorphism, неон, жирные тени.
- 10 разных радиусов/шрифтов.
- Сильная анимация и "скачущие" компоненты.

---

## 9) AI constraints (чтобы не ломалось)
- Редизайн делаем слоями: сначала tokens, потом компоненты, потом 1 страница.
- За один шаг: максимум 1–2 файла.
- Нельзя менять роутинг/структуру без запроса.
- Всегда сверяться с этим документом.
