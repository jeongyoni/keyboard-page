/**
 * 추천 키보드 목록.
 * switchId  : 체험 시 재생할 축 (사운드가 있는 milky 로 통일 — 데모)
 * designId  : 체험 페이지에서 보여줄 색상 조합 (keyboardDesigns.js)
 * layoutKey : 배열 (keyLayouts.js)
 * 카드를 누르면 위 구성 그대로 키감 체험 페이지가 열린다.
 */
export const PRODUCTS = [
  {
    id: 'gv10-purple-crayon',
    name: 'GV10 수제윤활 퍼플크레용 V2',
    switchId: 'milky-v2-45g',
    designId: 'purple-crayon',
    layoutKey: 'compact-84',
    image: './images/milky-crayon-v2.png',
    description: '라벤더 하우징에 파스텔 크레용 각인. 부드러운 수제윤활 타건감.',
    link: 'https://www.rooky.co.kr/shop/product_detail.html?pd_no=18701',
  },
  {
    id: 'gv8-purpler',
    name: 'GV8M-8K 수제윤활 퍼플러',
    switchId: 'milky-v2-45g',
    designId: 'purpler',
    layoutKey: 'compact-84',
    image: './images/gv8-purpler.jpg',
    description: '라벤더 하우징에 화이트 알파·핑크 포인트. 밀키V2축 38g.',
    link: 'https://rooky.co.kr/shop/product_detail.html?pd_no=19740',
  },
  {
    id: 'gs85-light',
    name: 'GS85 표준윤활 라이트',
    switchId: 'milky-v2-45g',
    designId: 'gs85-light',
    layoutKey: 'compact-84',
    image: './images/hanilight.jpg',
    description: '크림 알파에 세이지 그린 포인트. 무선 지원 84키 컴팩트.',
    link: 'https://www.rooky.co.kr/shop/product_detail.html?pd_no=18487',
  },
  {
    id: 'gs104-apple-latte',
    name: 'GS104-R 애플라떼',
    switchId: 'milky-v2-45g',
    designId: 'apple-latte',
    layoutKey: 'full-104',
    image: './images/kbd-apple-latte.png',
    description: 'PBT 염료승화 아이보리 크림. 넘패드까지 갖춘 풀배열.',
    link: 'https://www.rooky.co.kr/',
  },
  {
    id: 'gv10-smoky',
    name: 'GV10 스모키',
    switchId: 'milky-v2-45g',
    designId: 'smoky',
    layoutKey: 'compact-84',
    image: './images/kbd-smoky.png',
    description: '반투명 차콜 그레이 단색. 어디에도 어울리는 다크 톤.',
    link: 'https://www.rooky.co.kr/',
  },
  {
    id: 'gs104-milky',
    name: 'GS104-R 밀키 화이트',
    switchId: 'milky-v2-45g',
    designId: 'milky',
    layoutKey: 'full-104',
    image: './images/kbd-milky.png',
    description: '올 화이트 키캡에 실버 하우징. 깔끔한 풀배열 기본기.',
    link: 'https://www.rooky.co.kr/',
  },
];
