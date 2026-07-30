import React from 'react';

function SiteHeader() {
  return (
    <header>
      <h1>Groovestone 키보드</h1>
      <nav>
        <ul>
          <li><a href="#introduction">키보드 소개</a></li>
          <li><a href="#keyboard-list">제품 목록</a></li>
          <li><a href="#/designs">키캡 디자인</a></li>
          <li><a href="#/experience">키감 체험하기</a></li>
          <li>
            <a href="https://www.groovestone.co.kr/" target="_blank" rel="noreferrer">
              공식 스토어
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default SiteHeader;
