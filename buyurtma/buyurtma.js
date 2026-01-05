const fullBtn = document.querySelector("#full");
const notFullBtn = document.querySelector("#not-full");

const fullForm = document.querySelector(".full-form");
const notFullForm = document.querySelector(".not-full-form");

fullBtn.addEventListener("click", () => {
  fullBtn.style.backgroundColor = "#21264D";
  notFullBtn.style.backgroundColor = "rgba(255,255,255,0.2)";

  fullForm.style.left = "50%";
  notFullForm.style.left = "-50%";

  fullForm.style.opacity = "1";
  fullForm.style.pointerEvents = "0";
});

notFullBtn.addEventListener("click", () => {
  notFullBtn.style.backgroundColor = "#21264D";
  fullBtn.style.backgroundColor = "rgba(255,255,255,0.2)";
  
  fullForm.style.left = "150%";
  notFullForm.style.left = "50%";

  notFullForm.style.opacity = "0";
  notFullForm.style.pointerEvents = "1";

});






const cardType = document.getElementById("cardType");
const cardCVC = document.getElementById("cardCVC");
const agreeRules = document.getElementById("agreeRules");
const payBtn = document.getElementById("payBtn");

cardType.addEventListener("change", () => {
  if (cardType.value === "visa") {
    cardCVC.style.display = "block";
  } else {
    cardCVC.style.display = "none";
  }
});

payBtn.addEventListener("click", () => {

  if (!agreeRules.checked) {
    alert("Qoidalarga rozilik bermagansiz ❌");
    return;
  }

  if (!cardType.value) {
    alert("Karta turini tanlang");
    return;
  }

  alert("✅ Demo: To‘lov muvaffaqiyatli!");
});

const dropdowns = document.querySelectorAll('.dropdown');

function handleChange(value) {
  if (['Uzcard', 'Humo', 'Visa'].includes(value)) {
    changeLanguage(value);
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
