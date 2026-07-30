/**
 * 추천 키보드 목록.
 * switchId  : 체험 시 재생할 축 (사운드가 있는 milky 로 통일 — 데모)
 * designId  : 체험 페이지에서 보여줄 색상 조합 (keyboardDesigns.js)
 * layoutKey : 배열 (keyLayouts.js)
 * 카드를 누르면 위 구성 그대로 키감 체험 페이지가 열린다.
 */
export const PRODUCTS = [
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
    name: 'GV10 수제윤활 라이트G',
    switchId: 'milky-v2-45g',
    designId: 'gs85-light',
    layoutKey: 'full-104',
    image: './images/gv10-lightg.jpg',
    description: '오프화이트 + 그레이 모디 + 세이지 그린 포인트. 저소음 갈축.',
    link: 'https://rooky.co.kr/shop/product_detail.html?pd_no=19137',
  },
  {
    id: 'gs104-apple-latte',
    name: 'GV10 수제윤활 애플라떼',
    switchId: 'milky-v2-45g',
    designId: 'apple-latte',
    layoutKey: 'full-104',
    image: './images/gv10-latte.jpg',
    description: 'PBT 염료승화 아이보리 크림 단색. 넘패드까지 갖춘 풀배열.',
    link: 'https://rooky.co.kr/shop/product_detail.html?pd_no=19031',
  },
  {
    id: 'gv10-lightp',
    name: 'GV10M-8K 수제윤활 라이트P',
    switchId: 'milky-v2-45g',
    designId: 'lightp',
    layoutKey: 'full-104',
    image: './images/keycaps/52.jpg',
    description: '크림 알파 + 웜그레이 모디 + 더스티 로즈 포인트. 차분한 라이트 핑크.',
    link: 'https://www.groovestone.co.kr/products/52',
  },
  {
    id: 'gv10-darkcity',
    name: 'GV10M-8K 수제윤활 다크시티',
    switchId: 'milky-v2-45g',
    designId: 'darkcity',
    layoutKey: 'full-104',
    image: './images/gv10-darkcity.jpg',
    description: '올블랙 단색에 은은한 그레이 각인. 미니멀 다크. 저소음 밀키축.',
    link: 'https://rooky.co.kr/shop/product_detail.html?pd_no=19485',
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
