// 배열 순서대로 표시됩니다. 사진은 images 폴더의 상대 경로를 사용하세요.
const bookstores = [
  {
    "id": "store-01",
    "name": "부비프",
    "region": "서울 성북구",
    "cover": "images/store-01/thumb.png",
    "photos": [
      "images/store-01/photo-01.png",
      "images/store-01/photo-02.png",
      "images/store-01/photo-03.png",
      "images/store-01/photo-04.png"
    ],
    "instagramUrl": "https://www.instagram.com/buvif.bookshop?obrf=amdxMGxjbXB3YXRs",
    "naverMapUrl": "https://naver.me/52Rw8TKE"
  },
  {
    "id": "store-02",
    "name": "책과생활",
    "region": "광주 동구",
    "cover": "images/store-02/thumb.jpg",
    "photos": [
      "images/store-02/photo-01.jpg",
      "images/store-02/photo-02.jpg",
      "images/store-02/photo-03.jpg",
      "images/store-02/photo-04.jpg"
    ],
    "instagramUrl": "https://www.instagram.com/chaekand/#",
    "naverMapUrl": "https://naver.me/FxFtypYM"
  },
  {
    "id": "store-03",
    "name": "스테레오북스",
    "region": "부산 동래구",
    "cover": "images/store-03/thumb.png",
    "photos": [
      "images/store-03/photo-01.png",
      "images/store-03/photo-02.png",
      "images/store-03/photo-03.png"
    ],
    "instagramUrl": "https://www.instagram.com/stereobooks/",
    "naverMapUrl": "https://naver.me/xiqu2IHB"
  },
  {
    "id": "store-04",
    "name": "여행마을",
    "region": "서울 마포구 망원동",
    "cover": "images/store-04/thumb.jpg",
    "photos": [
      "images/store-04/photo-01.png",
      "images/store-04/photo-02.png",
      "images/store-04/photo-03.png",
      "images/store-04/photo-04.png"
    ],
    "instagramUrl": "https://www.instagram.com/traveltown_book/",
    "naverMapUrl": "https://naver.me/FA2xYeIB"
  },
  {
    "id": "store-05",
    "name": "책인감",
    "region": "서울 노원구",
    "cover": "images/store-05/thumb.png",
    "photos": [
      "images/store-05/photo-01.png"
    ],
    "instagramUrl": "https://www.instagram.com/chaegingam/",
    "naverMapUrl": "https://naver.me/5jJ1RVCT"
  },
  {
    "id": "store-06",
    "name": "아인서점",
    "region": "서울 마포구 합정동",
    "cover": "images/store-06/thumb.png",
    "photos": [
      "images/store-06/photo-01.png",
      "images/store-06/photo-02.png"
    ],
    "instagramUrl": "https://www.instagram.com/ain.books/",
    "naverMapUrl": null
  },
  {
    "id": "store-07",
    "name": "라바북스",
    "region": "제주 서귀포시",
    "cover": "images/store-07/thumb.png",
    "photos": [
      "images/store-07/photo-01.png"
    ],
    "instagramUrl": "https://www.instagram.com/labas.book/",
    "naverMapUrl": "https://naver.me/GhbuMupr"
  },
  {
    "id": "store-08",
    "name": "별책부록",
    "region": "서울 용산구",
    "cover": "images/store-08/thumb.jpg",
    "photos": [
      "images/store-08/photo-01.png",
      "images/store-08/photo-02.png"
    ],
    "instagramUrl": "https://www.instagram.com/byeolcheck/",
    "naverMapUrl": "https://naver.me/5FmS94cC"
  },
  {
    "id": "store-09",
    "name": "커넥티드 북스토어",
    "region": "서울 종로구",
    "cover": "images/store-09/thumb.jpg",
    "photos": [
      "images/store-09/photo-01.png",
      "images/store-09/photo-02.jpg",
      "images/store-09/photo-03.jpg"
    ],
    "instagramUrl": "https://www.instagram.com/kenektidxbookstore/",
    "naverMapUrl": "https://naver.me/x5GXQEm5"
  },
  {
    "id": "store-10",
    "name": "달팽이책방",
    "region": "경북 포항시",
    "cover": "images/store-10/thumb.png",
    "photos": [
      "images/store-10/photo-01.png",
      "images/store-10/photo-02.png",
      "images/store-10/photo-03.png"
    ],
    "instagramUrl": "https://www.instagram.com/bookshopsnail/",
    "naverMapUrl": "https://naver.me/5N18BPNX"
  },
  {
    "id": "store-11",
    "name": "샵메이커즈",
    "region": "부산 금정구",
    "cover": "images/store-11/thumb.png",
    "photos": [
      "images/store-11/photo-01.png",
      "images/store-11/photo-02.png"
    ],
    "instagramUrl": null,
    "naverMapUrl": "https://naver.me/5HkaCoo2",
    "websiteUrl": "https://smartstore.naver.com/shop_makers"
  },
  {
    "id": "store-12",
    "name": "프루스트의 서재",
    "region": "서울 성동구",
    "cover": "images/store-12/thumb.png",
    "photos": [
      "images/store-12/photo-01.png",
      "images/store-12/photo-02.jpg",
      "images/store-12/photo-03.png",
      "images/store-12/photo-04.png"
    ],
    "instagramUrl": "https://www.instagram.com/library_of_proust/",
    "naverMapUrl": "https://naver.me/53lKMHbc"
  },
  {
    "id": "store-13",
    "name": "그건,그렇고",
    "region": "제주 서귀포시",
    "cover": "images/store-13/thumb.png",
    "photos": [
      "images/store-13/photo-01.png",
      "images/store-13/photo-02.png"
    ],
    "instagramUrl": "https://www.instagram.com/btwjeju/",
    "naverMapUrl": "https://naver.me/GzEDDGAY"
  },
  {
    "id": "store-14",
    "name": "그런 의미에서",
    "region": "경기도 수원시",
    "cover": "images/store-14/thumb.png",
    "photos": [
      "images/store-14/photo-01.png",
      "images/store-14/photo-02.png",
      "images/store-14/photo-03.png"
    ],
    "instagramUrl": "https://www.instagram.com/2nd_his_meaningshop/",
    "naverMapUrl": "https://naver.me/5xjpkfRk"
  },
  {
    "id": "store-15",
    "name": "gaga77page",
    "region": "서울 마포구 망원동",
    "cover": "images/store-15/thumb.jpg",
    "photos": [
      "images/store-15/photo-01.jpg",
      "images/store-15/photo-02.jpg",
      "images/store-15/photo-03.png"
    ],
    "instagramUrl": "https://www.instagram.com/gaga77page/",
    "naverMapUrl": "https://naver.me/FfeO0qX1"
  },
  {
    "id": "store-16",
    "name": "새벽감성1집",
    "region": "서울 양천구",
    "cover": "images/store-16/thumb.png",
    "photos": [
      "images/store-16/photo-01.png",
      "images/store-16/photo-02.png"
    ],
    "instagramUrl": "https://www.instagram.com/dawnsense_1.zip/",
    "naverMapUrl": "https://naver.me/GoD7CmIX"
  },
  {
    "id": "store-17",
    "name": "다시서점",
    "region": "서울 강서구",
    "cover": "images/store-17/thumb.png",
    "photos": [
      "images/store-17/photo-01.png"
    ],
    "instagramUrl": "https://www.instagram.com/dasibookshop/",
    "naverMapUrl": "https://naver.me/FY3zDnf8"
  },
  {
    "id": "store-18",
    "name": "온다책방",
    "region": "충북 충주시",
    "cover": "images/store-18/thumb.png",
    "photos": [
      "images/store-18/photo-01.png",
      "images/store-18/photo-02.png"
    ],
    "instagramUrl": "https://www.instagram.com/onda_books/",
    "naverMapUrl": "https://naver.me/FjCr7NHe"
  },
  {
    "id": "store-19",
    "name": "올오어낫싱",
    "region": "서울시 금천구",
    "cover": "images/store-19/thumb.png",
    "photos": [
      "images/store-19/photo-01.png"
    ],
    "instagramUrl": "https://www.instagram.com/allornothing_deardark/",
    "naverMapUrl": "https://naver.me/5pwZS5bC"
  }
];
