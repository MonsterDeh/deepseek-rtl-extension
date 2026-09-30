# DeepSeek RTL Extension

<div dir="rtl">

افزونه‌ای سبک برای مرورگر کروم که جهت متن پیام‌های دستیار در **DeepSeek Chat** را به راست‌به‌چپ (RTL) تغییر می‌دهد.

## ✨ ویژگی‌ها

- اعمال خودکار `dir="rtl"` روی پیام‌های دستیار
- فعال/غیرفعال کردن آنی از طریق پاپ‌آپ، بدون نیاز به رفرش صفحه
- ذخیره وضعیت در `chrome.storage` و بازیابی خودکار
- پشتیبانی از پیام‌های جدید از طریق `MutationObserver`

## 📦 نصب

1. این ریپو را کلون یا دانلود کن:
</div>

   ```bash
   git clone https://github.com/USERNAME/deepseek-rtl-extension.git
   ```
<div dir="rtl">
2. در کروم به `chrome://extensions` برو.
3. **Developer mode** را روشن کن.
4. روی **Load unpacked** بزن و پوشه افزونه را انتخاب کن.

## 🚀 استفاده

1. وارد [https://chat.deepseek.com](https://chat.deepseek.com) شو.
2. روی آیکون افزونه در نوار ابزار کلیک کن.
3. دکمه **Enable** را بزن تا پیام‌ها RTL شوند.
4. برای برگشت به حالت عادی، **Disable** را بزن.

## 📁 ساختار پروژه

</div>
<div dir="ltr">

```txt
deepseek-rtl-extension/
├── manifest.json     # تنظیمات افزونه
├── content.js        # منطق اعمال RTL روی پیام‌ها
├── popup.html        # رابط کاربری پاپ‌آپ
├── popup.js          # منطق دکمه Enable/Disable
├── icon16.png
├── icon48.png
└── icon128.png
```
</div>

## 🛠 نحوه کار

<div dir="rtl">

- فایل <code dir="ltr">content.js</code> تمام <code dir="ltr">div</code>هایی با کلاس <code dir="ltr">.ds-markdown.ds-assistant-message-main-content</code> را پیدا کرده و <code dir="ltr">dir="rtl"</code> را روی آن‌ها ست می‌کند.
- یک <code dir="ltr">MutationObserver</code> پیام‌های جدید را رصد می‌کند تا RTL به‌صورت خودکار اعمال شود.
- وضعیت فعال/غیرفعال در <code dir="ltr">chrome.storage.local</code> ذخیره می‌شود.

</div>
