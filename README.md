# Somik World Research 1.1 Classic

מחקר אבולוציוני דו־ממדי עם ממשק קלאסי, מנוע מחקר משותף לדפדפן ול־Node.js, ארכיון אירועים ו־v3 כמודל ביקורת נפרד.

## פתיחה בדפדפן

אפשר לפתוח את `index.html` דרך GitHub Pages או שרת מקומי. הקובץ `Somik_World_Research_1.1_Classic.html` הוא גרסת Single HTML מלאה.

## הרצה מקומית

```bash
python3 -m http.server 8765
```

לאחר מכן לפתוח: `http://localhost:8765/index.html`

## הרצה ארוכה ללא דפדפן

```bash
node headless-runner.js --seed 1 --ticks 100000 --checkpoint 5000 --out run-1
```

ההרצה ניתנת להמשך מאותה תיקייה. קבצי `state.json`, `summary.json` ו־`events.jsonl` נשמרים בצורה שניתנת לשחזור. אפשר להפעיל בקרות:

```bash
node headless-runner.js --self-test
node headless-runner.js --seed 1 --ticks 100000 --memory-off --out run-memory-off
node headless-runner.js --seed 1 --ticks 100000 --mutation-off --out run-mutation-off
```

## מבנה

- `index.html` — ממשק הדפדפן.
- `Somik_World_Research_1.1_Classic.html` — גרסה יחידה להפצה.
- `research-engine.js` — המנוע המדעי.
- `app.js` — שכבת התצוגה, IndexedDB, ייצוא וכלי המעבדה.
- `headless-runner.js` — ריצות ארוכות ב־Node.
- `v3-baseline.html` — מודל ביקורת v3 נפרד.
- `SCIENTIFIC_PROTOCOL.json` — פרוטוקול המכונה.
- `BUILD_MANIFEST.json` — זהות וחישובי SHA-256.
- `tests/engine.test.js` — בדיקות פיזיקה, שמירה, שחזור, סדר מערכים, RNG, זיכרון ו־Common Garden.

## עקרונות קבועים

אין rescue, אין התאמת אוכל לאוכלוסייה, אין fitness פנימי, אין חיישני `food`/`mate`/`hazard`, ואין פקודות מוכנות כמו `build` או `cooperate`. תוצאות חריגות, הכחדה ועצירה טכנית נשמרות.

Research 1.1 כוללת זיכרון רקורנטי פנימי. שינוי משקלי המוח מלמידה אישית אינו חלק מהגרסה הזאת; למידה פלסטית תתווסף רק כניסוי בגרסה נפרדת.
