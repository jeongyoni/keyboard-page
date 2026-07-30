import React, { useMemo, useState } from 'react';
import Keyboard from '../components/Keyboard/Keyboard';
import SiteFooter from '../sections/SiteFooter';
import { KEYBOARD_DESIGNS } from '../data/keyboardDesigns';
import { KEYCAP_CATALOG, CATALOG_SERIES, getSeries } from '../data/keycapCatalog';
import { navigate } from '../router';

const noop = () => {};

/**
 * 키캡 디자인 갤러리 (#/designs).
 * - 위: 체험 가능한 디자인(색상 조합) — 미니 키보드 프리뷰, 클릭 시 체험 페이지로.
 * - 아래: 전체 라인업 — 그루브스톤 실제 제품 사진 카탈로그(노벨티/아트 포함).
 */
function DesignGalleryPage() {
  const [series, setSeries] = useState('all');
  const [query, setQuery] = useState('');

  // 각 상품에 시리즈를 붙이고, 시리즈별 개수를 센다
  const catalog = useMemo(
    () => KEYCAP_CATALOG.map((item) => ({ ...item, series: getSeries(item.name) })),
    []
  );
  const counts = useMemo(() => {
    const c = { all: catalog.length };
    for (const item of catalog) c[item.series] = (c[item.series] || 0) + 1;
    return c;
  }, [catalog]);
  const q = query.trim().toLowerCase();
  const filtered = catalog.filter(
    (i) =>
      (series === 'all' || i.series === series) &&
      (!q || i.name.toLowerCase().includes(q))
  );

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

        <input
          className="catalog-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="디자인 이름으로 검색 (예: 칸딘스키, 크레용, 고양이)"
          aria-label="디자인 검색"
        />

        <div className="catalog-filter" role="tablist" aria-label="시리즈 필터">
          {CATALOG_SERIES.filter((s) => s.id === 'all' || counts[s.id]).map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={series === s.id}
              className={`catalog-chip ${series === s.id ? 'is-active' : ''}`}
              onClick={() => setSeries(s.id)}
            >
              {s.label} <span className="catalog-chip-count">{counts[s.id] || 0}</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="gallery-lead">검색 결과가 없습니다.</p>
        ) : null}

        <div className="catalog-grid">
          {filtered.map((item) => (
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
