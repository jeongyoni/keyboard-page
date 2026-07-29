import React from 'react';
import { navigate } from '../router';

function Introduction() {
  return (
    <section id="introduction">
      <h2>손끝으로 듣는 타건음</h2>
      <p>
        같은 배열이라도 어떤 축과 디자인을 쓰느냐에 따라 소리와 손끝 느낌이 완전히 달라집니다.
      </p>
      <p>
        영상으로는 전달되지 않는 그 차이를, 직접 키보드를 두드리며 확인해보세요.
      </p>
      <div className="hero-actions">
        <button type="button" className="hero-cta" onClick={() => navigate('experience')}>
          키감 체험하러 가기 →
        </button>
      </div>
    </section>
  );
}

export default Introduction;
