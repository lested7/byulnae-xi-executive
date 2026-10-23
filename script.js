const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

const interestForm = document.querySelector('#interest-form');
const formStatus = document.querySelector('#form-status');

interestForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(interestForm);
  if (formData.get('company')) return;

  const name = String(formData.get('name') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const phoneDigits = phone.replace(/\D/g, '');
  if (name.length < 2 || phoneDigits.length < 10 || phoneDigits.length > 11) {
    formStatus.textContent = '이름과 휴대폰 번호를 다시 확인해 주세요.';
    return;
  }

  const { url, publishableKey } = window.SUPABASE_CONFIG || {};
  if (!url || !publishableKey) {
    formStatus.textContent = '온라인 접수를 준비 중입니다. 대표번호 1668-4116으로 문의해 주세요.';
    return;
  }

  const submitButton = interestForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formStatus.textContent = '등록 내용을 보내고 있습니다.';

  try {
    const endpoint = url.replace(/\/$/, '') + '/rest/v1/interest_leads';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: publishableKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({ name, phone, consent: formData.get('consent') === 'on', consented_at: new Date().toISOString() })
    });
    if (!response.ok) throw new Error('submission failed');
    interestForm.reset();
    formStatus.textContent = '관심고객 등록이 완료되었습니다. 감사합니다.';
  } catch {
    formStatus.textContent = '등록 중 문제가 생겼습니다. 잠시 후 다시 시도하거나 1668-4116으로 문의해 주세요.';
  } finally {
    submitButton.disabled = false;
  }
});
