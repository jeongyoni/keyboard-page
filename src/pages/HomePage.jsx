import React from 'react';
import PropTypes from 'prop-types';
import SiteHeader from '../sections/SiteHeader';
import Introduction from '../sections/Introduction';
import ProductList from '../sections/ProductList';
import SiteFooter from '../sections/SiteFooter';
import { navigate } from '../router';

/** 메인 페이지 — 8비트 픽셀아트 테마. 브랜드 소개 + 제품 목록. */
function HomePage() {
  const goExperience = (product) =>
    navigate('experience', {
      switch: product.switchId,
      design: product.designId,
      layout: product.layoutKey,
    });

  return (
    <div className="pixel">
      <SiteHeader />
      <Introduction />

      {/* "PRESS START" 패널 — 히어로 바로 아래 상단 배치 */}
      <section className="pix-cta-panel">
        <div className="pix-cta-copy">
          <h2>
            <span className="hl">START</span>를 눌러
            <br />
            타건을 시작하세요.
          </h2>
          <p>축 · 배열 · 디자인을 고르고 바로 두드려보세요. 로그인도, 설치도 필요 없어요.</p>
        </div>
        <div className="pix-cta-actions">
          <button type="button" className="pix-btn pix-btn--green" onClick={() => navigate('experience')}>
            ▶ 체험 시작
          </button>
          <button type="button" className="pix-btn pix-btn--amber" onClick={() => navigate('designs')}>
            ▧ 디자인 구경
          </button>
        </div>
      </section>

      <ProductList onExperience={goExperience} />
      <SiteFooter />
    </div>
  );
}

HomePage.propTypes = {};

export default HomePage;
