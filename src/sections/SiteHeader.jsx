import React from 'react';
import { navigate } from '../router';

/** 8비트 픽셀 헤더 — 픽셀 로고 + 내비 + 청키 버튼. */
function SiteHeader() {
  return (
    <header className="pix-header">
      <a className="pix-logo" href="#/">
        <img className="pix-logo-img" src="./favicon.png" width="24" height="24" alt="" />
        GROOVESTONE
      </a>

      <nav className="pix-nav">
        <a href="#introduction">소개</a>
        <a href="#keyboard-list">제품</a>
        <a href="#/designs">디자인</a>
      </nav>

      <div className="pix-header-actions">
        <a
          className="pix-btn pix-btn--ghost pix-btn--sm"
          href="https://www.groovestone.co.kr/"
          target="_blank"
          rel="noreferrer"
        >
          ◈ 스토어
        </a>
        <button
          type="button"
          className="pix-btn pix-btn--green pix-btn--sm"
          onClick={() => navigate('experience')}
        >
          ▶ 체험하기
        </button>
      </div>
    </header>
  );
}

export default SiteHeader;
