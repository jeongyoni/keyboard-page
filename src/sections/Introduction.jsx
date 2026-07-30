import React from 'react';
import { navigate } from '../router';

/** 8비트 픽셀 히어로. 그루브스톤 키보드 타건음 체험 소개. */
function Introduction() {
  return (
    <section id="introduction" className="pix-hero">
      <div className="pix-hero-copy">
        <div className="pix-badges">
          <span className="pix-badge pix-badge--green">★ NEW</span>
          <span className="pix-badge">▤ 72 DESIGNS</span>
        </div>

        <h1 className="pix-title">
          내 키보드로 듣는
          <br />
          <span className="hl">타건음</span> 한 판.
        </h1>

        <p className="pix-lead">
          그루브스톤 기계식 키보드를 웹에서 직접 두드려보세요. 축과 디자인을 골라 손끝으로
          소리를 확인하는, 딱 한 세이브 파일짜리 체험.
        </p>

        <div className="pix-cta">
          <button type="button" className="pix-btn pix-btn--green" onClick={() => navigate('experience')}>
            ▶ 체험 시작
          </button>
          <button type="button" className="pix-btn pix-btn--ghost" onClick={() => navigate('designs')}>
            ▧ 디자인 구경
          </button>
        </div>

        <div className="pix-stats">
          <div className="pix-stat">
            <span className="pix-stat-num">72</span>
            <span className="pix-stat-label">키캡 디자인</span>
          </div>
          <div className="pix-stat">
            <span className="pix-stat-num">2</span>
            <span className="pix-stat-label">배열 (104·84)</span>
          </div>
          <div className="pix-stat">
            <span className="pix-stat-num">WIN·MAC</span>
            <span className="pix-stat-label">각인 전환</span>
          </div>
        </div>
      </div>

      {/* HUD 카드 (QUEST.LOG 느낌) */}
      <div className="pix-hud">
        <div className="pix-hud-bar">
          <span className="pix-hud-dots">
            <i /> <i /> <i />
          </span>
          <span className="pix-hud-title">TACTILE.LOG // GS104</span>
          <span className="pix-hud-caret">▾</span>
        </div>
        <div className="pix-hud-body">
          <div className="pix-hud-row">
            <span>SWITCH · 밀키 V2</span>
            <span className="hl">45g</span>
          </div>
          <SegBar label="타건감" value={12} max={16} tone="green" />
          <SegBar label="소리 깊이" value={10} max={16} tone="amber" />
          <SegBar label="정숙성" value={7} max={16} tone="red" />
          <div className="pix-hud-cells">
            <div className="pix-cell">
              <b>72</b>
              <span>디자인</span>
            </div>
            <div className="pix-cell">
              <b>2</b>
              <span>배열</span>
            </div>
            <div className="pix-cell">
              <b>∞</b>
              <span>연타</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 세그먼트형 게이지 바 */
function SegBar({ label, value, max, tone }) {
  return (
    <div className="pix-seg">
      <div className="pix-seg-head">
        <span>{label}</span>
        <span>
          {value} / {max}
        </span>
      </div>
      <div className="pix-seg-track">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={`pix-seg-cell ${i < value ? `on ${tone}` : ''}`} />
        ))}
      </div>
    </div>
  );
}

export default Introduction;
