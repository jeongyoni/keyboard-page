import React from 'react';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import { useRoute } from './router';

/** 라우터 셸. 해시(#/, #/experience)에 따라 페이지를 고른다. */
function App() {
  const route = useRoute();

  if (route.name === 'experience') {
    const { switch: sw = '', design = '', layout = '', os = '' } = route.params;
    return (
      <ExperiencePage
        // key 로 페이지를 리셋해 진입 파라미터를 초기 상태로 반영
        key={`${sw}:${design}:${layout}:${os}`}
        initialSwitchId={sw}
        initialDesignId={design}
        initialLayoutKey={layout}
        initialOs={os}
      />
    );
  }

  return <HomePage />;
}

export default App;
