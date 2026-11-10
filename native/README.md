# Shushy's Fit على الآيفون

هيدا المجلّد فيه مشروع آيفون جاهز (Capacitor). التطبيق نفسه هو نفس `index.html` تبع الموقع، محطوط جوّا تطبيق.

## كيف تنزّليه عالآيفون (بلا ما تدفعي)
1. نزّلي **Xcode** من الـ App Store عالماك (ببلاش، بس كبير شوي).
2. نزّلي المشروع: من GitHub ← **Code** ← **Download ZIP**، وفكّيه.
3. افتحي الملف: `native/ios/App/App.xcodeproj` (دبل كليك، بيفتح بـ Xcode).
   أوّل مرّة Xcode بينزّل Capacitor لحالو (Swift Package)، استنّي لحتى يخلص.
4. فوق بالشمال كبسي على **App** ← **Signing & Capabilities** ← **Team** ← **Add an Account** وفوتي بالـ Apple ID تبعك، واختاري **(Personal Team)**.
   إذا قلّك الـ Bundle Identifier مستعمل، غيّري `com.shushysfit.app` لشي خاص فيكِ، مثلاً `com.shayma.shushysfit`.
5. وصّلي الآيفون بالكابل، واختاريه فوق (جنب زر ▶).
6. كبسي **▶ (Run)**.
7. أوّل مرّة عالآيفون: **Settings ← General ← VPN & Device Management** ← اختاري حسابك ← **Trust**. وكمان فعّلي **Developer Mode** إذا طلب (Settings ← Privacy & Security ← Developer Mode).

بالحساب المجاني التطبيق بيشتغل ٧ أيام، وبعدين بتعيدي الخطوة ٦. مع حساب Apple Developer (٩٩$ بالسنة) بيضل سنة، وفيكِ تنزّليه عالـ App Store.

## لما يتغيّر التطبيق (للمطوّرين)
```
cd native && npm install && npm run sync
```
بينسخ `index.html` والفيديوهات لجوّا مشروع الآيفون.
