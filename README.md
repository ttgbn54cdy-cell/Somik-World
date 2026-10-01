# Somik World Research 1.2 Emergence

This release is the open ancient-world treatment. The central hazard, movable blocks and persistent food are physical conditions only. The engine never emits a command to hide, build, cooperate or avoid danger. A cache or room may appear, or may never appear.

The observer records damage in the central strip, protection near unheld blocks, food drops and returns, and repeated visits near candidate caches. These labels do not feed back into energy, movement, mutation, reproduction, resource flow or RNG.

מחקר אבולוציוני דו־ממדי עם ממשק קלאסי, מנוע מחקר משותף לדפדפן ול־Node.js, ארכיון אירועים ו־v3 כמודל ביקורת נפרד.

## פתיחה בדפדפן

אפשר לפתוח את `index.html` דרך GitHub Pages או שרת מקומי. הקובץ `Somik_World_Research_1.2_Emergence.html` הוא גרסת Single HTML מלאה.

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
- `Somik_World_Research_1.2_Emergence.html` — גרסה יחידה להפצה.
- `research-engine.js` — המנוע המדעי.
- `app.js` — שכבת התצוגה, IndexedDB, ייצוא וכלי המעבדה.
- `headless-runner.js` — ריצות ארוכות ב־Node.
- `v3-baseline.html` — מודל ביקורת v3 נפרד.
- `LIVING_RESEARCH_WORLD_SPEC.md` — מפרט שכבת העולם החי והחזרת ה״איזומינקה״.
- `SCIENTIFIC_PROTOCOL.json` — פרוטוקול המכונה.
- `BUILD_MANIFEST.json` — זהות וחישובי SHA-256.
- `tests/engine.test.js` — בדיקות פיזיקה, שמירה, שחזור, סדר מערכים, RNG, זיכרון ו־Common Garden.

## עקרונות קבועים

אין rescue, אין התאמת אוכל לאוכלוסייה, אין fitness פנימי, אין חיישני `food`/`mate`/`hazard`, ואין פקודות מוכנות כמו `build` או `cooperate`. תוצאות חריגות, הכחדה ועצירה טכנית נשמרות.

Research 1.2 כוללת זיכרון רקורנטי פנימי, סכנה פיזית במרכז, בלוקים מגינים ומזון שניתן להשאיר ולמצוא מחדש. שינוי משקלי המוח מלמידה אישית אינו חלק מהגרסה הזאת; למידה פלסטית תתווסף רק כניסוי בגרסה נפרדת.

## Living Research World

הכיוון המרכזי משלב את המחקריות של Research עם ההיסטוריה והדינמיקה שהיו חזקות ב־v0.6 וב־v1.3. תבניות מעניינות מוצגות עם ראיות גולמיות; אין פקודות או תגמולים עבור בנייה, שיתוף פעולה או מנהיגות. בפאנל «העולם החי» ניתן לבחור Somik, לראות ציר־זמן של תנועה, מגעים, אחיזה, נשיאה ושחרור, ולקבל תוויות תיאוריות רק לאחר סף ראיות מינימלי. שכבת התצפית אינה נכנסת ל־state hash ואינה משנה את ה־RNG.

## ממשק בעברית

כותרות, גרפים, אירועים, פרטי מוח, פרוטוקול ותוצאות ניסויי Research מוצגים בעברית ובכיוון מימין לשמאל. שם המותג, מזהי הרצות וחתימות נשארים בפורמט המקורי. קובצי הייצוא שומרים על מבנה הנתונים המקורי לצורך שחזור. מודל הביקורת הישן v3 נשמר בנפרד.
