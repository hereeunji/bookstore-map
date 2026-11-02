// 서점 정보는 임시 데이터이며, 제공된 사진 한 장을 네 카드에 공통 사용합니다.
const bookstores = [
  { name: '부비프', region: '서울 성북구', position: '30% center' },
  { name: '커넥티드 북스토어', region: '부산 동래구', position: 'center' },
  { name: '별책부록', region: '서울 용산구', position: '75% center' },
  { name: '소테레오북스', region: '부산 동래구', position: '20% center' },
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
  grid.append(card);
}
