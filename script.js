const grid = document.querySelector('.bookstore-grid');
const searchEntries = [];

for (const store of bookstores) {
  const card = document.createElement('article');
  card.className = 'bookstore';
  card.dataset.storeId = store.id;

  const photo = document.createElement('img');
  photo.className = 'bookstore-photo';
  photo.addEventListener('error', () => { photo.hidden = true; });
  if (store.cover) photo.src = store.cover;
  else photo.hidden = true;
  // 서로 다른 서점의 실제 사진으로 오인하지 않도록 장식 이미지로 처리합니다.
  photo.alt = '';
  photo.decoding = 'async';
  photo.loading = 'lazy';
  photo.style.objectPosition = store.position;

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
  searchEntries.push({ card, name: store.name.toLocaleLowerCase(), region: store.region.toLocaleLowerCase() });
}

const searchInput = document.querySelector('#store-search');
const searchEmpty = document.querySelector('.search-empty');

function filterBookstores() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  let matches = 0;
  for (const entry of searchEntries) {
    const visible = entry.name.includes(query) || entry.region.includes(query);
    entry.card.hidden = !visible;
    if (visible) matches++;
  }
  searchEmpty.hidden = matches > 0;
  searchEmpty.textContent = matches ? '' : '검색 결과가 없습니다';
}

searchInput.addEventListener('input', filterBookstores);
searchInput.addEventListener('search', filterBookstores);
document.querySelector('.store-search').addEventListener('submit', event => {
  event.preventDefault();
  filterBookstores();
});

const dialog = document.querySelector('.store-dialog');
const detailPhoto = document.querySelector('.detail-photo');
const dots = document.querySelector('.gallery-dots');
const photoPlaceholder = document.querySelector('.photo-placeholder');
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
  if (!currentStore.photos.length) {
    detailPhoto.hidden = true;
    detailPhoto.removeAttribute('src');
    photoPlaceholder.hidden = false;
    dialog.querySelector('.gallery-status').textContent = '등록된 사진이 없습니다';
    resizeGallery();
    return;
  }
  currentIndex = (index + currentStore.photos.length) % currentStore.photos.length;
  const version = ++imageVersion;
  detailPhoto.alt = `${currentStore.name} 사진 ${currentIndex + 1}`;
  detailPhoto.hidden = false;
  photoPlaceholder.hidden = true;
  detailPhoto.onload = () => {
    if (version !== imageVersion) return;
    detailPhoto.hidden = false;
    photoPlaceholder.hidden = true;
    resizeGallery();
  };
  detailPhoto.onerror = () => {
    if (version !== imageVersion) return;
    detailPhoto.hidden = true;
    photoPlaceholder.hidden = false;
    resizeGallery();
  };
  detailPhoto.src = currentStore.photos[currentIndex];
  for (const [i, dot] of [...dots.children].entries()) {
    dot.setAttribute('aria-pressed', String(i === currentIndex));
  }
  dialog.querySelector('.gallery-status').textContent = `${currentIndex + 1} / ${currentStore.photos.length} 사진`;
  resizeGallery();
}

function openStore(store, trigger) {
  currentStore = { ...store, photos: Array.isArray(store.photos) ? store.photos.filter(path => typeof path === 'string' && path.trim()).slice(0, 4) : [] };
  opener = trigger;
  savedScroll = window.scrollY;
  previousBodyStyle = document.body.getAttribute('style');
  Object.assign(document.body.style, { position: 'fixed', top: `-${savedScroll}px`, width: '100%', overflow: 'hidden' });
  dialog.querySelector('#detail-name').textContent = store.detailName || store.name;
  dialog.querySelector('#detail-region').textContent = store.region;
  dialog.querySelector('.instagram-link').firstChild.textContent = store.instagramUrl || !store.websiteUrl ? '인스타그램' : '웹사이트';
  setExternalLink('.instagram-link', store.instagramUrl || store.websiteUrl);
  setExternalLink('.map-link', store.naverMapUrl);
  dots.replaceChildren();
  const multiple = currentStore.photos.length > 1;
  dialog.querySelectorAll('.gallery-arrow').forEach(button => { button.hidden = !multiple; });
  dots.hidden = !multiple;
  currentStore.photos.forEach((_, index) => {
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
