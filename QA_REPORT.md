# Somik World Research 1.1 Classic — QA

נבדק בתאריך 1 באוקטובר 2026.

## בדיקות מנוע

`node tests/engine.test.js` עבר: **14/14**.

הבדיקות כוללות: תחרות תפיסה שאינה תלויה בסדר המערך; שחרור אובייקט/משאב/גופה לאחר מות המחזיק; מגעים סינכרוניים; Seed זהה עם סדרי מערכים שונים; המשך מדויק אחרי save/load; שמירת RNG; דחיית schema/protocol/engine לא תואמים; דחיית NaN וקישורי החזקה שבורים; memory-off; checksum; הכחדה ללא rescue; Common Garden ללא יחס מומצא; ו־self-test שמדווח כשל אמיתי.

## בדיקות בנייה

- `node --check research-engine.js` עבר.
- `node --check app.js` עבר.
- `node build.js` עבר ויצר Single HTML, manifest ו־protocol hash.
- מנוע הדפדפן וה־headless משתמשים באותו `research-engine.js`.

## מגבלה ידועה

בדיקת דפדפן אוטומטית מלאה דורשת Chromium זמין בסביבת ההרצה. בדיקות המנוע והבנייה אינן מחליפות בדיקה ידנית ב־GitHub Pages לאחר העלאה.
