import React from 'react';
import Keyboard from '../components/Keyboard/Keyboard';
import SiteFooter from '../sections/SiteFooter';
import { KEYBOARD_DESIGNS } from '../data/keyboardDesigns';
import { KEYCAP_CATALOG } from '../data/keycapCatalog';
import { navigate } from '../router';

const noop = () => {};

/**
 * 키캡 디자인 갤러리 (#/designs).
 * - 위: 체험 가능한 디자인(색상 조합) — 미니 키보드 프리뷰, 클릭 시 체험 페이지로.
 * - 아래: 전체 라인업 — 그루브스톤 실제 제품 사진 카탈로그(노벨티/아트 포함).
 */
function DesignGalleryPage() {
  return (
    <>
      <header className="exp-header">
        <button type="button" className="back-link" onClick={() => navigate('home')}>
          ← 홈으로
        </button>
        <span className="exp-title">키캡 디자인</span>
        <a className="store-link" href="https://www.groovestone.co.kr/" target="_blank" rel="noreferrer">
          공식 스토어
        </a>
      </header>

      <section className="gallery">
        <h2>체험 가능한 디자인</h2>
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
                <Keyboard designId={d.id} layoutKey="compact-84" os="win" pressedKey="" onKeyDown={noop} onKeyUp={noop} />
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

      <section className="gallery gallery--catalog">
        <h3 className="catalog-title">전체 라인업 · {KEYCAP_CATALOG.length}종</h3>
        <p className="gallery-lead">
          그루브스톤 실제 키캡·키보드 디자인 전부. 사진을 누르면 공식 스토어 상품으로 이동해요.
        </p>

        <div className="catalog-grid">
          {KEYCAP_CATALOG.map((item) => (
            <a
              key={item.id}
              className="catalog-card"
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              <div className="catalog-thumb">
                <img src={item.image} alt={item.name} loading="lazy" />
                {item.soldout ? <span className="catalog-soldout">품절</span> : null}
              </div>
              <span className="catalog-name">{item.name}</span>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

export default DesignGalleryPage;
