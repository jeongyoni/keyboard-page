import React from 'react';
import PropTypes from 'prop-types';
import SiteHeader from '../sections/SiteHeader';
import Introduction from '../sections/Introduction';
import ProductList from '../sections/ProductList';
import SiteFooter from '../sections/SiteFooter';
import { navigate } from '../router';

/** 메인 페이지 — 브랜드 소개 + 제품 목록. 키감 체험은 별도 페이지로 분리했다. */
function HomePage() {
  // 제품 카드에서 해당 축으로 키감 체험 페이지로 이동
  const goExperience = (switchId) => navigate('experience', { switch: switchId });

  return (
    <>
      <SiteHeader />
      <Introduction />
      <ProductList onTrySwitch={goExperience} />
      <SiteFooter />
    </>
  );
}

HomePage.propTypes = {};

export default HomePage;
