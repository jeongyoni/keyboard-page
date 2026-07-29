import { isKoreanJamo, shouldIgnoreKeydown, createPlayGate, diffComposition, countJamo, createImeRouter } from '../ime.js';
let pass=0, fail=0;
const t=(name,got,want)=>{ const ok=JSON.stringify(got)===JSON.stringify(want); ok?pass++:fail++; if(!ok)console.log(`  FAIL ${name}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); };

t('자모 ㅁ', isKoreanJamo('ㅁ'), true);
t('자모 ㅏ', isKoreanJamo('ㅏ'), true);
t('완성형 마는 자모아님', isKoreanJamo('마'), false);
t('영문 a', isKoreanJamo('a'), false);
t('Process', isKoreanJamo('Process'), false);

// 맥 한글 IME: 조합중 + 자모 -> 재생해야 함 (이게 안 되던 버그)
t('맥 조합중 자모', shouldIgnoreKeydown({isComposing:true, key:'ㅁ', repeat:false}), false);
// 조합중인데 key가 Process -> keydown은 무시, compositionupdate가 처리
t('조합중 Process', shouldIgnoreKeydown({isComposing:true, key:'Process', repeat:false}), true);
t('조합중 백스페이스 통과', shouldIgnoreKeydown({isComposing:true, key:'Backspace', repeat:false}), false);
t('조합중 스페이스 통과', shouldIgnoreKeydown({isComposing:true, key:' ', repeat:false}), false);
t('조합중 엔터 통과', shouldIgnoreKeydown({isComposing:true, key:'Enter', repeat:false}), false);
t('자모수 마', countJamo('마'), 2);
t('자모수 만', countJamo('만'), 3);
t('자모수 많(겹받침)', countJamo('많'), 4);
t('자모수 왜(겹모음)', countJamo('왜'), 3);
// 영문 정상 입력
t('영문 입력', shouldIgnoreKeydown({isComposing:false, key:'a', repeat:false}), false);
// 길게 누르기
t('repeat 차단', shouldIgnoreKeydown({isComposing:false, key:'a', repeat:true}), true);

t('조합 증가 ㅁ->마', diffComposition('ㅁ','마'), '마');
t('조합 증가 마->만', diffComposition('마','만'), '만');
t('빈->ㅁ', diffComposition('','ㅁ'), 'ㅁ');
t('변화없음', diffComposition('마','마'), '');
t('백스페이스 만->마', diffComposition('만','마'), '');
t('백스페이스 마->ㅁ', diffComposition('마','ㅁ'), '');
t('조합 ㅁ->마->만->많', diffComposition('만','많'), '많');
t('연속입력 안->않', diffComposition('안','않'), '않');

const gate = createPlayGate(40);
t('첫 호출 통과', gate(), true);
t('즉시 재호출 차단', gate(), false);
await new Promise(r=>setTimeout(r,55));
t('55ms 후 통과', gate(), true);


// --- IME 라우터: 같은 입력이 두 경로로 새어 두 번 울리는 것을 막는가 ---
{
  // 맥: keydown 이 자모를 준다 -> keydown 만 사용
  const r = createImeRouter();
  t('맥 첫 자모 keydown 수락', r.acceptKeydown({isComposing:true, key:'ㅁ', repeat:false}), true);
  t('맥 compositionupdate 차단', r.acceptComposition(), false);
  t('맥 이후 keydown 계속 수락', r.acceptKeydown({isComposing:true, key:'ㅏ', repeat:false}), true);
  t('맥 모드 고정', r.mode, 'keydown');
}
{
  // Process 만 주는 환경 -> compositionupdate 만 사용
  const r = createImeRouter();
  t('Process keydown 거부', r.acceptKeydown({isComposing:true, key:'Process', repeat:false}), false);
  t('composition 수락', r.acceptComposition(), true);
  t('이후 composition 계속 수락', r.acceptComposition(), true);
  t('모드 고정', r.mode, 'composition');
}
{
  // 영어는 조합이 없으므로 항상 통과
  const r = createImeRouter();
  t('영어 keydown 수락', r.acceptKeydown({isComposing:false, key:'a', repeat:false}), true);
  t('영어는 모드 미결정', r.mode, null);
}

console.log(`\n통과 ${pass} / 실패 ${fail}`);
process.exit(fail?1:0);
