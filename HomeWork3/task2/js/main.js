const body = document.querySelector('body');
const modal = document.querySelector('#data-src-image-container');

body.addEventListener('click', event => {
  let target = event.target;

  let img = target.closest('img[data-src]');
  modal.classList.toggle('showModal');
  if (!img) {
    modal.classList.remove('showModal');
  } else {
    modal.firstChild.src = img.getAttribute('data-src');
  }
});
