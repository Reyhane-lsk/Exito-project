document.addEventListener('DOMContentLoaded', () => {
    const mobileInputGroup = document.querySelector('.mobile-input-group');
    const verificationCodeGroup = document.querySelector('.verification-code-group');
    const sendCodeButton = document.querySelector('.send-code-button');
    const resendCodeLink = document.querySelector('.sml-msg');
    const countdownSpan = document.getElementById('countdown');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const verificationCodeInput = document.getElementById('verificationCode');

    let countdownTime = 59; // 59 ثانیه
    let countdownInterval;

    // در ابتدا فیلد کد تایید و لینک ارسال مجدد را مخفی می‌کنیم
    verificationCodeGroup.style.display = 'none';
    resendCodeLink.style.display = 'none';

    sendCodeButton.addEventListener('click', () => {
        const fullMobileNumber = '+98' + mobileNumberInput.value.replace(/\s/g, ''); // شماره موبایل را تمیز می‌کنیم
        if (fullMobileNumber.length < 11) { // اعتبارسنجی اولیه
            alert('لطفاً شماره موبایل را به درستی وارد کنید.');
            return;
        }

        // --- اینجا باید درخواست به Backend برای ارسال OTP را بفرستید ---
        console.log(`Sending OTP to: ${fullMobileNumber}`);
        // مثال:
        // fetch('/api/send-otp', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ mobile: fullMobileNumber })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
                alert('کد تایید ارسال شد!');
                mobileInputGroup.style.display = 'none'; // مخفی کردن فیلد شماره موبایل
                sendCodeButton.style.display = 'none'; // مخفی کردن دکمه ارسال
                verificationCodeGroup.style.display = 'flex'; // نمایش فیلد کد تایید (flex برای چیدمان)
                resendCodeLink.style.display = 'block'; // نمایش لینک ارسال مجدد

                startCountdown(); // شروع تایمر

                // اگر دکمه ارسال کد تایید قبلا دکمه "ادامه" بود، حالا کارایی آن باید تغییر کند
                // sendCodeButton.textContent = 'تایید کد'; // متن دکمه را تغییر دهید (اگر می‌خواهید از همان دکمه استفاده کنید)
                // sendCodeButton.removeEventListener('click', /* هندلر قبلی */);
                // sendCodeButton.addEventListener('click', handleVerifyCode);
        //     } else {
        //         alert('خطا در ارسال کد: ' + data.message);
        //     }
        // })
        // .catch(error => {
        //     console.error('Error sending OTP:', error);
        //     alert('خطا در ارتباط با سرور.');
        // });
    });


    // تابع برای شروع تایمر
    function startCountdown() {
        countdownTime = 59; // ریست تایمر
        countdownSpan.textContent = `۰۰:${countdownTime.toString().padStart(2, '0')}`;
        resendCodeLink.style.pointerEvents = 'none'; // غیرفعال کردن لینک ارسال مجدد
        resendCodeLink.style.color = '#ccc'; // تغییر رنگ برای غیرفعال بودن

        countdownInterval = setInterval(() => {
            countdownTime--;
            if (countdownTime >= 0) {
                countdownSpan.textContent = `۰۰:${countdownTime.toString().padStart(2, '0')}`;
            } else {
                clearInterval(countdownInterval);
                resendCodeLink.style.pointerEvents = 'auto'; // فعال کردن لینک ارسال مجدد
                resendCodeLink.style.color = '#888'; // بازگرداندن رنگ اصلی
                countdownSpan.textContent = ''; // حذف تایمر یا نمایش "مجدد"
                resendCodeLink.textContent = 'ارسال مجدد کد تایید';
            }
        }, 1000);
    }

    // هندلر برای دکمه "تایید کد" (اگر از دکمه جدا استفاده می‌کنید)
    // sendCodeButton.addEventListener('click', handleVerifyCode); // اگر از دکمه ارسال کد به عنوان تایید کد استفاده می‌کنید

    // اگر دکمه "ارسال کد تایید" را برای "تایید کد" استفاده می‌کنید:
    // باید منطقی اضافه کنید که بعد از ارسال OTP، هندلر دکمه تغییر کند.
    // یا یک دکمه جداگانه برای تایید کد داشته باشید که در ابتدا مخفی است.
    // در این مثال، دکمه "ارسال کد تایید" پس از ارسال OTP مخفی می‌شود و شما باید یک دکمه جدید برای "تایید کد" اضافه کنید.
});

// این قسمت برای زمانی است که یک دکمه جدا برای "تایید کد" اضافه می‌کنید
/*
function handleVerifyCode() {
    const verificationCode = document.getElementById('verificationCode').value;
    const mobileNumber = document.getElementById('mobileNumber').value; // نیاز به شماره موبایل دارید

    if (verificationCode.length !== 6) { // اعتبارسنجی اولیه
        alert('لطفاً کد تایید 6 رقمی را وارد کنید.');
        return;
    }

    // --- اینجا درخواست به Backend برای تایید کد را بفرستید ---
    console.log(`Verifying code ${verificationCode} for ${mobileNumber}`);
    // fetch('/api/verify-otp', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ mobile: mobileNumber, code: verificationCode })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         alert('شماره شما با موفقیت تایید شد!');
    //         // هدایت به صفحه اصلی یا داشبورد
    //         window.location.href = '/dashboard.html';
    //     } else {
    //         alert('کد اشتباه است یا منقضی شده: ' + data.message);
    //     }
    // })
    // .catch(error => {
    //     console.error('Error verifying OTP:', error);
    //     alert('خطا در ارتباط با سرور.');
    // });
}
*/