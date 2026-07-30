import React from 'react';
import { navigate } from '../router';

/** 8비트 픽셀 헤더 — 픽셀 로고 + 내비 + 청키 버튼. */
function SiteHeader() {
  return (
    <header className="pix-header">
      <a className="pix-logo" href="#/">
        <svg className="pix-logo-ico" width="22" height="22" viewBox="0 0 3 3" aria-hidden="true">
          <rect x="0" y="0" width="1" height="1" fill="#6aa63a" />
          <rect x="1" y="0" width="1" height="1" fill="#e0a63c" />
          <rect x="2" y="0" width="1" height="1" fill="#c74b3f" />
          <rect x="0" y="1" width="1" height="1" fill="#e0a63c" />
          <rect x="1" y="1" width="1" height="1" fill="#4f93c9" />
          <rect x="2" y="1" width="1" height="1" fill="#6aa63a" />
          <rect x="0" y="2" width="1" height="1" fill="#c74b3f" />
          <rect x="1" y="2" width="1" height="1" fill="#6aa63a" />
          <rect x="2" y="2" width="1" height="1" fill="#e0a63c" />
        </svg>
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
