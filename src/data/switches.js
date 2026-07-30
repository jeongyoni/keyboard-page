/**
 * 축(스위치) 레지스트리.
 *
 * 새 축을 추가하려면:
 *   1. public/sounds/<dir>/ 에 사운드 세트를 넣는다 (파일명은 soundMap.js 의 SOUND_FILES 와 동일하게)
 *   2. 아래 배열에 항목을 추가하고 available: true 로 둔다
 *
 * 사운드가 아직 없는 축은 available: false 로 두면 UI에서 "준비중"으로 표시된다.
 *
 * stats: 체험 화면의 '스탯 포스트잇'에 쓰는 값 (0~16).
 *   tactile 타건감(걸림/키감) · sound 소리 깊이(통울림) · quiet 정숙성(조용함)
 */
export const SWITCHES = [
  {
    id: 'milky-v2-45g',
    label: '밀키축 V2',
    weight: '45g',
    type: 'linear',
    dir: 'milky-v2-45g',
    description: '부드럽고 걸림 없는 리니어. 조용한 편이라 사무실에서도 무난.',
    available: true,
    stats: { tactile: 6, sound: 9, quiet: 13 },
  },
  {
    id: 'coral',
    label: '코랄축',
    weight: null,
    type: 'linear',
    dir: 'coral',
    description: '',
    available: false,
    stats: { tactile: 8, sound: 11, quiet: 11 },
  },
  {
    id: 'hani',
    label: '하니축',
    weight: null,
    type: 'tactile',
    dir: 'hani',
    description: '',
    available: false,
    stats: { tactile: 13, sound: 11, quiet: 8 },
  },
  {
    id: 'jaejal',
    label: '재잘축',
    weight: null,
    type: 'clicky',
    dir: 'jaejal',
    description: '',
    available: false,
    stats: { tactile: 15, sound: 14, quiet: 3 },
  },
];

export const DEFAULT_SWITCH_ID = 'milky-v2-45g';

export const AVAILABLE_SWITCHES = SWITCHES.filter((s) => s.available);

export function getSwitch(id) {
  return SWITCHES.find((s) => s.id === id) || SWITCHES[0];
}

/** UI 표시용 라벨: "밀키축 V2 (45g)" */
export function formatSwitchLabel(sw) {
  return sw.weight ? `${sw.label} (${sw.weight})` : sw.label;
}
