import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { PRODUCTS } from '../data/products';
import { getDesign } from '../data/keyboardDesigns';
import { getLayout } from '../data/keyLayouts';

/** 제품 목록. 각 카드에서 해당 구성(축·배열·디자인) 그대로 체험을 시작할 수 있다. */
function ProductList({ onExperience }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <>
      <section id="search">
        <input
          type="text"
          placeholder="키보드 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="제품 검색"
        />
      </section>

      <section id="keyboard-list">
        <h2>추천 키보드</h2>
        {filtered.length === 0 ? <p>검색 결과가 없습니다.</p> : null}

        {filtered.map((product) => {
          const design = getDesign(product.designId);
          const layout = getLayout(product.layoutKey);
          return (
            <div className="keyboard-item" key={product.id}>
              <img src={product.image} alt={product.name} loading="lazy" />
              <h3>{product.name}</h3>
              <p className="switch-tag">
                {design.name} · {layout.name.split(' · ')[0]}
              </p>
              <p>{product.description}</p>
              <div className="card-actions">
                <button type="button" onClick={() => onExperience(product)}>
                  이 키보드 체험
                </button>
                <a href={product.link} target="_blank" rel="noreferrer">
                  <button type="button">제품 보기</button>
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

ProductList.propTypes = {
  onExperience: PropTypes.func.isRequired,
};

export default ProductList;
