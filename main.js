console.log('JS ishlayapti');
const dropBtn = document.querySelector('.nav-link-drop-btn');
const dropMenu = document.querySelector('.dropdown-menu');

dropBtn.addEventListener('click', () => {
  dropMenu.classList.toggle('active');
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    dropMenu.classList.remove('active');
  }
});
const btnOutline = document.querySelector('.btn-outline');
