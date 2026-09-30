// وضعیت فعال/غیرفعال
let isEnabled = false;

// تابع اعمال dir="rtl" به تمام divهای موجود
function applyRTLToAll() {
  if (!isEnabled) return;
  const divs = document.querySelectorAll('.ds-markdown.ds-assistant-message-main-content');
  divs.forEach(div => {
    if (!div.hasAttribute('dir') || div.getAttribute('dir') !== 'rtl') {
      div.setAttribute('dir', 'rtl');
    }
  });
}

// مشاهده‌گر تغییرات DOM – با تنظیمات کامل‌تر
const observer = new MutationObserver((mutations) => {
  if (!isEnabled) return;
  // بررسی کنید که آیا گره جدیدی اضافه شده یا خیر
  for (const mutation of mutations) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // بررسی کنید که آیا هرکدام از گره‌های جدید شامل div مورد نظر هستند یا خیر
      const hasTarget = Array.from(mutation.addedNodes).some(node => {
        // اگر خود گره هدف است
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches && node.matches('.ds-markdown.ds-assistant-message-main-content')) {
            return true;
          }
          // یا اینکه فرزندی از آن دارد
          return node.querySelector && node.querySelector('.ds-markdown.ds-assistant-message-main-content');
        }
        return false;
      });
      if (hasTarget) {
        applyRTLToAll(); // اسکن کامل مجدد (سبک است)
        break;
      }
    }
  }
});

// شروع مشاهده‌گری روی کل document (نه فقط body) با گزینه‌های کامل
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: false, // نیازی به بررسی تغییرات ویژگی‌ها نیست
});

// خواندن وضعیت از storage و اعمال اولیه (با تأخیر برای اطمینان از رندر)
chrome.storage.local.get(['rtlEnabled'], (result) => {
  isEnabled = result.rtlEnabled || false;
  if (isEnabled) {
    // اجرا با تأخیر ۵۰۰ میلی‌ثانیه تا صفحه کامل بارگذاری شود
    setTimeout(() => {
      applyRTLToAll();
    }, 500);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'toggleRTL') {
    isEnabled = message.enabled;

    if (isEnabled) {
      applyRTLToAll();      // فوراً RTL کن
    } else {
      removeRTLFromAll();   // فوراً LTR کن، بدون رفرش
    }

    sendResponse({ success: true });
  }
  return true;
});

// همچنین وقتی صفحه کاملاً بارگذاری شد (در صورتی که observer دیر啟動 شود)
window.addEventListener('load', () => {
  if (isEnabled) {
    setTimeout(applyRTLToAll, 200);
  }
});


// تابع حذف RTL و برگرداندن به LTR
function removeRTLFromAll() {
  const divs = document.querySelectorAll('.ds-markdown.ds-assistant-message-main-content');
  divs.forEach(div => {
    // یا حذف کن
    // div.removeAttribute('dir');

    // یا صریحاً LTR کن
    div.setAttribute('dir', 'ltr');
  });
}