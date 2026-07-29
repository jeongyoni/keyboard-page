import React from 'react';

function SiteFooter() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Groovestone 키보드</p>
      <p className="designer-info">
        디자인 &amp; 개발: <strong>Yun Jeong Yeon</strong>
      </p>
    </footer>
  );
}

export default SiteFooter;
