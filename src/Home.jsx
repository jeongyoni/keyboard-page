import React, { useState } from 'react';
import './styles.css';

function Home() {
  const [search, setSearch] = useState('');
  const items = [
    {
      name: '수제윤할 퍼플크레용 v2 (밀키축)',
      img: 'https://github.com/jeongyoni/keyboard-page/raw/main/v2밀키크레용.png',
      desc: '부드러운 윤활 처리, 완벽한 타건감',
      link: 'https://www.rooky.co.kr/shop/product_detail.html?pd_no=18701',
    },
    {
      name: '표준윤활 GS85 라이트 (하늬축)',
      img: 'https://raw.githubusercontent.com/jeongyoni/keyboard-page/main/hanilight.jpg',
      desc: '고효율 배터리로 무선모드에서도 실외에서도 걱정없이',
      link: 'https://www.rooky.co.kr/shop/product_detail.html?pd_no=18487',
    },
  ];

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header>
        <h1>Groovestone 키보드 설명</h1>
        <nav>
          <ul>
            <li><a href="#introduction">키보드 소개</a></li>
            <li><a href="#keyboard-list">제품 목록</a></li>
            <li><a href="/keyboard-experience.html">키감 체험하기</a></li>
            <li><a href="https://www.groovestone.co.kr/" target="_blank" rel="noreferrer">공식 스토어</a></li>
          </ul>
        </nav>
      </header>

      <section id="search">
        <input
          type="text"
          placeholder="키보드 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section id="introduction">
        <h2>키보드 소개</h2>
        <p>키보드는 컴퓨터와 상호 작용하기 위한 주요 입력 장치 중 하나입니다...</p>
        <p>타자기의 발명에서 시작된 다양한 키보드가 존재합니다.</p>
      </section>

      <section id="keyboard-list">
        <h2>추천 키보드</h2>
        {filtered.map((kb, idx) => (
          <div className="keyboard-item" key={idx}>
            <img src={kb.img} alt={kb.name} />
            <h3>{kb.name}</h3>
            <p>{kb.desc}</p>
            <a href={kb.link} target="_blank" rel="noreferrer">
              <button>제품 보기</button>
            </a>
          </div>
        ))}
      </section>

      <section id="tactile-experience">
        <h2>키감 체험하기</h2>
        <p>Groovestone 키보드의 타건감을 직접 체험해보세요!</p>
        <button onClick={() => (window.location.href = '/keyboard-experience.html')}>체험하기</button>
      </section>

      <footer>
        <p>&copy; 2025 Groovestone 키보드</p>
        <p className="designer-info">
          디자인 & 개발: <strong>Yun Jeong Yeon</strong>
        </p>
      </footer>
    </div>
  );
}

export default Home;
