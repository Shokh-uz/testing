console.log('JS ishlayapti');

const dropdowns = document.querySelectorAll('.dropdown');

function handleChange(value) {
  if (['Uz', 'Ru', 'Eng'].includes(value)) {
    changeLanguage(value);
  }

  if (['Sum', 'USD', 'Rub'].includes(value)) {
    changeCurrency(value);
  }
}

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  select.addEventListener('click', e => {
    e.stopPropagation();

    // boshqa dropdownlarni yopish
    dropdowns.forEach(d => {
      if (d !== dropdown) {
        d.querySelector('.select').classList.remove('select-clicked');
        d.querySelector('.caret').classList.remove('caret-rotate');
        d.querySelector('.menu').classList.remove('menu-open');
      }
    });

    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;

      options.forEach(o => o.classList.remove('active'));
      option.classList.add('active');

      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');

      // 🔥 asosiy joy
      handleChange(option.innerText);
    });
  });
});

// tashqariga bosilganda hammasi yopilsin
document.addEventListener('click', () => {
  document.querySelectorAll('.select').forEach(select =>
    select.classList.remove('select-clicked')
  );
  document.querySelectorAll('.caret').forEach(caret =>
    caret.classList.remove('caret-rotate')
  );
  document.querySelectorAll('.menu').forEach(menu =>
    menu.classList.remove('menu-open')
  );
});

/* ===== TIL ===== */
function changeLanguage(lang) {
  if (lang === 'Eng') {
    document.querySelector('.nav-btn-Bosh-sahifa').innerText = 'Home';
    document.querySelector('.nav-btn-Aloqa').innerText = 'Contact';
    document.querySelector('.qidiruv').placeholder = 'Where to?';
    document.querySelector('.qidiruv-btn').innerText = 'Search';
  }

  if (lang === 'Ru') {
    document.querySelector('.nav-btn-Bosh-sahifa').innerText = 'Главная';
    document.querySelector('.nav-btn-Aloqa').innerText = 'Контакты';
    document.querySelector('.qidiruv').placeholder = 'Куда?';
    document.querySelector('.qidiruv-btn').innerText = 'Поиск';
  }

  if (lang === 'Uz') {
    document.querySelector('.nav-btn-Bosh-sahifa').innerText = 'Bosh sahifa';
    document.querySelector('.nav-btn-Aloqa').innerText = 'Aloqa';
    document.querySelector('.qidiruv').placeholder = 'Qayerga?';
    document.querySelector('.qidiruv-btn').innerText = 'Qidiruv';
  }
}

/* ===== CURRENCY ===== */
function formatNumber(num) {
  return new Intl.NumberFormat('uz-UZ').format(num);
}

function changeCurrency(currency) {
  const prices = document.querySelectorAll('.price');

  prices.forEach(price => {
    const usd = Number(price.dataset.usd || 1299);

    if (currency === 'USD') {
      price.innerText = `$${formatNumber(usd)}`;
    }

    if (currency === 'Sum') {
      price.innerText = `${formatNumber(usd * 12500)} so'm`;
    }

    if (currency === 'Rub') {
      price.innerText = `${formatNumber(usd * 90)} ₽`;
    }
  });
}
/* Cart */
const cartButtons = document.querySelectorAll('.add-to-cart');

cartButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = {
      id: btn.dataset.id,
      title: btn.dataset.title,
      price: Number(btn.dataset.price),
      qty: 1
    };

    addToCart(product);
  });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  alert('🛒 Cartga qo‘shildi');
}
