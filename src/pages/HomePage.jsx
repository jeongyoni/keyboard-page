import React from 'react';
import PropTypes from 'prop-types';
import SiteHeader from '../sections/SiteHeader';
import Introduction from '../sections/Introduction';
import ProductList from '../sections/ProductList';
import SiteFooter from '../sections/SiteFooter';
import { navigate } from '../router';

/** 메인 페이지 — 브랜드 소개 + 제품 목록. 키감 체험은 별도 페이지로 분리했다. */
function HomePage() {
  // 제품 카드에서 해당 구성(축·디자인·배열) 그대로 체험 페이지로 이동
  const goExperience = (product) =>
    navigate('experience', {
      switch: product.switchId,
      design: product.designId,
      layout: product.layoutKey,
    });

  return (
    <>
      <SiteHeader />
      <Introduction />
      <ProductList onExperience={goExperience} />
      <SiteFooter />
    </>
  );
}

HomePage.propTypes = {};

export default HomePage;
