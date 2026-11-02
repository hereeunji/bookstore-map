// 서점 정보는 임시 데이터입니다. 메인은 기존 사진, 팝업은 제공된 가로·세로 사진을 사용합니다.
const bookstores = [
  { name: '부비프', region: '서울 성북구', position: '30% center', photos: ['assets/popup-landscape.png', 'assets/popup-portrait.png'], instagramUrl: null, mapUrl: null },
  { name: '커넥티드 북스토어', region: '부산 동래구', position: 'center', photos: ['assets/popup-landscape.png', 'assets/popup-portrait.png'], instagramUrl: null, mapUrl: null },
  { name: '별책부록', region: '서울 용산구', position: '75% center', detailName: '별책부록 — 책과 이야기가 머무르는 작은 서점', photos: ['assets/popup-landscape.png', 'assets/popup-portrait.png'], instagramUrl: null, mapUrl: null },
  { name: '소테레오북스', region: '부산 동래구', position: '20% center', photos: ['assets/popup-landscape.png', 'assets/popup-portrait.png'], instagramUrl: null, mapUrl: null },
];

const grid = document.querySelector('.bookstore-grid');

for (const store of bookstores) {
  const card = document.createElement('article');
  card.className = 'bookstore';

  const photo = document.createElement('img');
  photo.className = 'bookstore-photo';
  photo.src = 'assets/bookstore.png';
  // 서로 다른 서점의 실제 사진으로 오인하지 않도록 장식 이미지로 처리합니다.
  photo.alt = '';
  photo.decoding = 'async';
  photo.style.objectPosition = store.position;
  photo.addEventListener('error', () => { photo.hidden = true; });

  const label = document.createElement('div');
  label.className = 'bookstore-label';
  const name = document.createElement('h2');
  name.className = 'bookstore-name';
  name.textContent = store.name;
  const region = document.createElement('p');
  region.className = 'bookstore-region';
  region.textContent = store.region;

  label.append(name, region);
  card.append(photo, label);
  const trigger = document.createElement('button');
  trigger.className = 'bookstore-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-label', `${store.name}, ${store.region} 상세 보기`);
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.addEventListener('click', () => openStore(store, trigger));
  card.append(trigger);
  grid.append(card);
}

const dialog = document.querySelector('.store-dialog');
const detailPhoto = document.querySelector('.detail-photo');
const dots = document.querySelector('.gallery-dots');
let currentStore;
let currentIndex = 0;
let opener;
let savedScroll = 0;
let previousBodyStyle;
let swipeStart;
let imageVersion = 0;

function resizeGallery() {
  if (!dialog.open) return;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  const headerHeight = dialog.querySelector('.detail-header').getBoundingClientRect().height;
  const footerHeight = dialog.querySelector('.detail-links').getBoundingClientRect().height;
  dialog.style.setProperty('--photo-max-height', `${Math.max(0, viewportHeight - 40 - headerHeight - footerHeight)}px`);
}

function setExternalLink(selector, url) {
  const link = dialog.querySelector(selector);
  let valid = false;
  try { valid = ['https:', 'http:'].includes(new URL(url).protocol); } catch { /* No placeholder navigation. */ }
  if (valid) {
    link.href = url;
    link.removeAttribute('aria-disabled');
    link.removeAttribute('tabindex');
    link.setAttribute('aria-label', `${link.firstChild.textContent} (새 탭)`);
  } else {
    link.removeAttribute('href');
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('tabindex', '-1');
    link.setAttribute('aria-label', `${link.firstChild.textContent} (링크 준비 중)`);
  }
}

function showPhoto(index) {
  currentIndex = (index + currentStore.photos.length) % currentStore.photos.length;
  const version = ++imageVersion;
  detailPhoto.alt = `${currentStore.name} 사진 ${currentIndex + 1}`;
  detailPhoto.src = currentStore.photos[currentIndex];
  detailPhoto.onload = () => { if (version === imageVersion) resizeGallery(); };
  for (const [i, dot] of [...dots.children].entries()) {
    dot.setAttribute('aria-pressed', String(i === currentIndex));
  }
  dialog.querySelector('.gallery-status').textContent = `${currentIndex + 1} / ${currentStore.photos.length} 사진`;
  resizeGallery();
}

function openStore(store, trigger) {
  currentStore = store;
  opener = trigger;
  savedScroll = window.scrollY;
  previousBodyStyle = document.body.getAttribute('style');
  Object.assign(document.body.style, { position: 'fixed', top: `-${savedScroll}px`, width: '100%', overflow: 'hidden' });
  dialog.querySelector('#detail-name').textContent = store.detailName || store.name;
  dialog.querySelector('#detail-region').textContent = store.region;
  setExternalLink('.instagram-link', store.instagramUrl);
  setExternalLink('.map-link', store.mapUrl);
  dots.replaceChildren();
  const multiple = store.photos.length > 1;
  dialog.querySelectorAll('.gallery-arrow').forEach(button => { button.hidden = !multiple; });
  dots.hidden = !multiple;
  store.photos.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'gallery-dot';
    dot.setAttribute('aria-label', `${index + 1}번 사진 보기`);
    dot.addEventListener('click', () => showPhoto(index));
    dots.append(dot);
  });
  dialog.showModal();
  showPhoto(0);
  dialog.querySelector('.detail-close').focus({ preventScroll: true });
}

dialog.querySelector('.detail-close').addEventListener('click', () => dialog.close());
let backdropPressed = false;
dialog.addEventListener('pointerdown', event => {
  const rect = dialog.getBoundingClientRect();
  backdropPressed = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
});
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (backdropPressed && outside) dialog.close();
  backdropPressed = false;
});
dialog.addEventListener('close', () => {
  if (previousBodyStyle === null) document.body.removeAttribute('style');
  else document.body.setAttribute('style', previousBodyStyle);
  window.scrollTo(0, savedScroll);
  opener?.focus({ preventScroll: true });
  swipeStart = null;
});
dialog.querySelector('.previous').addEventListener('click', () => showPhoto(currentIndex - 1));
dialog.querySelector('.next').addEventListener('click', () => showPhoto(currentIndex + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
const gallery = dialog.querySelector('.detail-gallery');
gallery.addEventListener('touchstart', event => {
  swipeStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
}, { passive: true });
gallery.addEventListener('touchend', event => {
  if (!swipeStart || !event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - swipeStart.x;
  const dy = event.changedTouches[0].clientY - swipeStart.y;
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) showPhoto(currentIndex + (dx < 0 ? 1 : -1));
  swipeStart = null;
}, { passive: true });
gallery.addEventListener('touchcancel', () => { swipeStart = null; });
window.addEventListener('resize', resizeGallery);
window.visualViewport?.addEventListener('resize', resizeGallery);
new ResizeObserver(resizeGallery).observe(dialog.querySelector('.detail-header'));
