import React from 'react';
import Keyboard from '../components/Keyboard/Keyboard';
import SiteFooter from '../sections/SiteFooter';
import { KEYBOARD_DESIGNS } from '../data/keyboardDesigns';
import { navigate } from '../router';

const noop = () => {};

/**
 * 키캡 디자인 갤러리 (#/designs).
 * 등록된 색상 조합을 미니 키보드 프리뷰로 모아 보여주고,
 * 카드를 누르면 그 디자인으로 키감 체험 페이지가 열린다.
 */
function DesignGalleryPage() {
  return (
    <>
      <header className="exp-header">
        <button type="button" className="back-link" onClick={() => navigate('home')}>
          ← 홈으로
        </button>
        <span className="exp-title">키캡 디자인</span>
        <a
          className="store-link"
          href="https://www.groovestone.co.kr/"
          target="_blank"
          rel="noreferrer"
        >
          공식 스토어
        </a>
      </header>

      <section className="gallery">
        <h2>키캡 디자인</h2>
        <p className="gallery-lead">
          마음에 드는 디자인을 고르면 그대로 키보드를 두드려볼 수 있어요.
        </p>

        <div className="gallery-grid">
          {KEYBOARD_DESIGNS.map((d) => (
            <div
              key={d.id}
              className="design-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate('experience', { design: d.id })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') navigate('experience', { design: d.id });
              }}
            >
              <div className="design-card-preview">
                <Keyboard
                  designId={d.id}
                  layoutKey="compact-84"
                  os="win"
                  pressedKey=""
                  onKeyDown={noop}
                  onKeyUp={noop}
                />
              </div>
              <div className="design-card-info">
                <h3>{d.name}</h3>
                <p>{d.description}</p>
                <span className="design-card-cta">체험하기 →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

export default DesignGalleryPage;
