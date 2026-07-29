import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { PRACTICE_PIECES, getPiece } from '../../data/practiceTexts';
import styles from './TypingPractice.module.css';

/**
 * 필사(타자연습). 좋은 글을 한 줄씩 따라 친다.
 * 글자별로 맞음/틀림이 색으로 표시되고, 작품을 끝내면 타수(타/분)와 정확도가 나온다.
 *
 * 소리·키캡 눌림은 상위(ExperiencePage)의 전역 keydown 리스너가 담당하므로
 * 여기서는 텍스트 비교/통계만 다룬다.
 */
function TypingPractice({ inputRef }) {
  const [pieceId, setPieceId] = useState(PRACTICE_PIECES[0].id);
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);

  const startRef = useRef(null); // 작품 시작 시각
  const strokesRef = useRef(0); // 누적 타수(물리 타건)
  const correctRef = useRef(0); // 누적 정타 글자 수
  const targetRef = useRef(0); // 누적 목표 글자 수

  const piece = getPiece(pieceId);
  const line = piece.lines[lineIndex] || '';

  const liveCpm =
    startRef.current && strokesRef.current
      ? Math.round(strokesRef.current / ((performance.now() - startRef.current) / 60000))
      : 0;
  const liveMatches = correctRef.current + countMatches(typed, line);
  const liveTarget = targetRef.current + typed.length;
  const liveAccuracy = liveTarget ? Math.round((liveMatches / liveTarget) * 100) : 100;

  const selectPiece = (id) => {
    setPieceId(id);
    setLineIndex(0);
    setTyped('');
    setDone(false);
    setResult(null);
    startRef.current = null;
    strokesRef.current = 0;
    correctRef.current = 0;
    targetRef.current = 0;
  };

  const restart = () => selectPiece(pieceId);

  const finishLine = (value) => {
    correctRef.current += countMatches(value, line);
    targetRef.current += line.length;

    if (lineIndex + 1 >= piece.lines.length) {
      const elapsedMs = startRef.current ? performance.now() - startRef.current : 0;
      const minutes = elapsedMs / 60000 || 1 / 60000;
      setResult({
        cpm: Math.round(strokesRef.current / minutes),
        accuracy: Math.round((correctRef.current / (targetRef.current || 1)) * 100),
        time: (elapsedMs / 1000).toFixed(1),
      });
      setDone(true);
      setTyped('');
      return;
    }
    setLineIndex((i) => i + 1);
    setTyped('');
  };

  const handleChange = (e) => {
    if (done) return;
    const value = e.target.value;
    if (startRef.current === null && value.length > 0) startRef.current = performance.now();
    if (value.length >= line.length) {
      finishLine(value);
      return;
    }
    setTyped(value);
  };

  // 실제 타수: 문자 키 1타, 한글 조합 중 keydown(Process)도 1타. 수정/기능키는 제외.
  const handleKeyDown = (e) => {
    if (e.key === 'Process' || e.key.length === 1) strokesRef.current += 1;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.picker} role="radiogroup" aria-label="필사 작품 선택">
        {PRACTICE_PIECES.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={p.id === pieceId}
            className={`${styles.pieceChip} ${p.id === pieceId ? styles.pieceActive : ''}`}
            onClick={() => selectPiece(p.id)}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className={styles.paper}>
        <div className={styles.head}>
          <span className={styles.title}>{piece.title}</span>
          {piece.author ? <span className={styles.author}>{piece.author}</span> : null}
        </div>

        <div className={styles.poem}>
          {piece.lines.map((ln, i) => {
            if (i < lineIndex || (done && true)) {
              return (
                <div key={i} className={styles.lineDone}>
                  {ln}
                </div>
              );
            }
            if (i === lineIndex) {
              return (
                <div key={i} className={styles.lineActive}>
                  {ln.split('').map((ch, j) => {
                    let cls = styles.pending;
                    if (j < typed.length) cls = typed[j] === ch ? styles.correct : styles.wrong;
                    else if (j === typed.length) cls = styles.cursor;
                    return (
                      <span key={j} className={cls}>
                        {ch}
                      </span>
                    );
                  })}
                </div>
              );
            }
            return (
              <div key={i} className={styles.linePending}>
                {ln}
              </div>
            );
          })}
        </div>
      </div>

      {done ? (
        <div className={styles.resultCard}>
          <span className={styles.resultTitle}>완성! 🎉</span>
          <div className={styles.resultStats}>
            <span>
              <strong>{result.cpm}</strong> 타/분
            </span>
            <span>
              정확도 <strong>{result.accuracy}%</strong>
            </span>
            <span>{result.time}초</span>
          </div>
          <button type="button" className={styles.again} onClick={restart}>
            다시 필사하기 ↺
          </button>
        </div>
      ) : (
        <>
          <input
            ref={inputRef}
            className={styles.input}
            value={typed}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="위 문장을 그대로 따라 쳐보세요"
            aria-label="필사 입력"
            spellCheck={false}
            autoComplete="off"
          />
          <div className={styles.statbar}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{liveCpm}</span>
              <span className={styles.statLabel}>타/분</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{liveAccuracy}%</span>
              <span className={styles.statLabel}>정확도</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>
                {lineIndex + 1}/{piece.lines.length}
              </span>
              <span className={styles.statLabel}>행</span>
            </div>
            <button type="button" className={styles.skip} onClick={restart}>
              처음부터 ↺
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/** 앞에서부터 target 과 같은 자리의 글자 수 */
function countMatches(typed, target) {
  let n = 0;
  for (let i = 0; i < typed.length && i < target.length; i += 1) {
    if (typed[i] === target[i]) n += 1;
  }
  return n;
}

TypingPractice.propTypes = {
  inputRef: PropTypes.shape({ current: PropTypes.any }),
};

export default TypingPractice;
