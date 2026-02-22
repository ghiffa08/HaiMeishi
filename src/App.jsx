import React, { useState, useRef, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { Globe, Share2, Instagram } from 'lucide-react';

import './card.css';
import PROFILE from './profile.json';

// =====================
// SPRING PHYSICS HOOK
// =====================
function useCardSpring(cardInnerRef, cardSceneRef) {
  const st = useRef({
    rotX: 0,
    rotY: 0,
    targetX: 0,
    targetY: 0,
    isDragging: false,
    didDrag: false,
    startX: 0,
    startY: 0,
    startRotX: 0,
    startRotY: 0,
    flipped: false,
    raf: null,
  });

  useEffect(() => {
    const s = st.current;

    const tick = () => {
      if (!s.isDragging) {
        const tY = s.flipped ? 180 : 0;
        s.rotX += (0 - s.rotX) * 0.1;
        s.rotY += (tY - s.rotY) * 0.1;
      }

      if (cardInnerRef.current) {
        cardInnerRef.current.style.transform =
          `rotateX(${s.rotX.toFixed(2)}deg) rotateY(${s.rotY.toFixed(2)}deg)`;

        // Specular shimmer
        const shine = s.isDragging || Math.abs(s.rotX) > 1 || Math.abs(s.rotY % 180) > 2 ? 1 : 0;
        const mx = 50 + (s.rotY % 180) * 0.4;
        const my = 50 - s.rotX * 1.2;
        cardInnerRef.current.querySelectorAll('.face').forEach(f => {
          f.style.setProperty('--mx', `${mx}%`);
          f.style.setProperty('--my', `${my}%`);
          f.style.setProperty('--shine', shine);
        });
      }

      s.raf = requestAnimationFrame(tick);
    };

    s.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(s.raf);
  }, [cardInnerRef]);

  return st;
}

// =====================
// CARD FRONT FACE
// =====================
const CardFront = () => (
  <div className="face">
    <div className="front-layout">
      <div className="front-top">
        <div className="jp-label">
          <span>名刺 · MEISHI</span>
          <span>표 · BUSINESS CARD</span>
        </div>
        <div className="corner-brand">
          <div className="corner-brand-name">{PROFILE.brand}</div>
          <div className="corner-brand-kanji">{PROFILE.brandKanji}</div>
        </div>
      </div>

      <div className="front-body">
        <div className="accent-bar" />
        <div className="info">
          <div className="name-row">
            <span className="name-ko">{PROFILE.nameKo}</span>
            <span className="name-en">{PROFILE.nameEn}</span>
          </div>
          <div className="role-text">{PROFILE.role}</div>
          <div className="contacts">
            <div className="ci"><span className="ci-key">TEL</span>{PROFILE.tel}</div>
            <div className="ci"><span className="ci-key">MAIL</span>{PROFILE.mail}</div>
            <div className="ci"><span className="ci-key">ADR</span>{PROFILE.adr}</div>
          </div>
        </div>
      </div>

      <div className="front-footer">
        <span className="tagline">創造 · 革新 · 誠実 — Creativity · Innovation · Integrity</span>
        <span className="est-mark">Est. {PROFILE.est}</span>
      </div>
    </div>
  </div>
);

// =====================
// CARD BACK FACE
// =====================
const CardBack = () => (
  <div className="face face-back">
    <div className="back-layout">
      <div className="corner tl" />
      <div className="corner tr" />
      <div className="corner bl" />
      <div className="corner br" />

      <div className="back-center">
        <div className="back-kanji">{PROFILE.brandKanji} &nbsp; 開 発 ラ ボ</div>
        <div className="back-brand">{PROFILE.brand}</div>
        <div className="back-rule" />
        <div className="back-since">Since &nbsp;{PROFILE.est}&nbsp; · &nbsp;{PROFILE.city}</div>
      </div>

      <div className="hanko"><span>印</span></div>
    </div>
  </div>
);

// =====================
// CARD EDGES (thickness)
// =====================
const CardEdges = () => (
  <>
    <div className="card-edge edge-right" />
    <div className="card-edge edge-left" />
    <div className="card-edge edge-top" />
    <div className="card-edge edge-bottom" />
  </>
);

// =====================
// MAIN APP
// =====================
export default function App() {
  const [flipped, setFlipped] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const cardSceneRef = useRef();
  const cardInnerRef = useRef();
  const springRef = useCardSpring(cardInnerRef, cardSceneRef);

  // Sync flip state to spring
  useEffect(() => {
    springRef.current.flipped = flipped;
  }, [flipped, springRef]);

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setShowUI(true), 300);
    return () => clearTimeout(t);
  }, []);

  // ---- Pointer (mouse + touch) ----
  const onPointerDown = useCallback((e) => {
    const s = springRef.current;
    s.isDragging = true;
    s.didDrag = false;
    s.startX = e.clientX;
    s.startY = e.clientY;
    s.startRotX = s.rotX;
    s.startRotY = s.rotY;
    e.currentTarget.setPointerCapture(e.pointerId);
    cardSceneRef.current?.classList.add('is-grabbing');
  }, [springRef]);

  const onPointerMove = useCallback((e) => {
    const s = springRef.current;
    if (!s.isDragging) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) s.didDrag = true;
    s.rotY = s.startRotY + dx * 0.28;
    s.rotX = s.startRotX - dy * 0.13;
  }, [springRef]);

  const onPointerUp = useCallback(() => {
    const s = springRef.current;
    s.isDragging = false;
    cardSceneRef.current?.classList.remove('is-grabbing');

    if (!s.didDrag) {
      setFlipped(f => { const next = !f; s.flipped = next; return next; });
    } else {
      const normY = ((s.rotY % 360) + 360) % 360;
      const toBack = normY > 90 && normY < 270;
      s.flipped = toBack;
      s.rotX = 0;
      setFlipped(toBack);
    }
  }, [springRef]);

  // ---- Hover tilt (mouse only) ----
  const onMouseMove = useCallback((e) => {
    const s = springRef.current;
    if (s.isDragging) return;
    const rect = cardSceneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rx = (e.clientX - rect.left) / rect.width - 0.5;
    const ry = (e.clientY - rect.top) / rect.height - 0.5;
    s.rotY = (s.flipped ? 180 : 0) + rx * 18;
    s.rotX = -ry * 12;
  }, [springRef]);

  const onMouseLeave = useCallback(() => {
    const s = springRef.current;
    if (!s.isDragging) { s.rotX = 0; s.rotY = s.flipped ? 180 : 0; }
  }, [springRef]);
  // ---- Share ----
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = useCallback(async () => {
    if (!cardInnerRef.current) return;
    setIsSharing(true); // Loading state

    try {
      const isFlipped = springRef.current.flipped;
      const faceSelector = isFlipped ? '.face-back' : '.face:not(.face-back)';
      const faceNode = cardInnerRef.current.querySelector(faceSelector);

      if (!faceNode) throw new Error('Face node not found');

      const canvas = await html2canvas(faceNode, {
        backgroundColor: null,
        scale: 2, // High res sharing
        useCORS: true,
        onclone: (clonedDoc) => {
          if (isFlipped) {
            // Remove the 180deg rotation from the cloned back face so it renders correctly (not mirrored)
            // Sometimes html2canvas applies it from styles, we can enforce it:
            const clonedFaces = clonedDoc.querySelectorAll('.face-back');
            clonedFaces.forEach(f => {
              f.style.setProperty('transform', 'none', 'important');
            });
          }
        }
      });

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Canvas to Blob failed');
        const file = new File([blob], 'digital-business-card.png', { type: 'image/png' });
        const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: PROFILE.brand,
            text: `Connect with me! `,
            url: shareUrl,
          });
        } else if (navigator.share) {
          // Fallback 1: Share link natively
          await navigator.share({ title: PROFILE.brand, url: shareUrl });
        } else {
          // Fallback 2: Copy link
          await navigator.clipboard.writeText(window.location.href);
          alert('Link disalin ke clipboard!');
        }
        setIsSharing(false);
      }, 'image/png');

    } catch (e) {
      console.error('Share failed', e);
      // Fallback if canvas fails
      if (navigator.share) {
        try { await navigator.share({ title: PROFILE.brand, url: window.location.href }); } catch (_) { }
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link disalin ke clipboard!');
      }
      setIsSharing(false);
    }
  }, []);

  const handleFlip = useCallback(() => {
    setFlipped(f => { const next = !f; springRef.current.flipped = next; return next; });
  }, [springRef]);

  return (
    <div className="app" style={{ opacity: showUI ? 1 : 0, transition: 'opacity 0.6s ease' }}>

      {/* Top bar */}
      <div className="topbar">
        <div className="brand-badge">
          <h1>HaiMeishi</h1>
          <p>Digital Business Card</p>
        </div>
        <button className="share-btn" onClick={handleShare} aria-label="Bagikan" disabled={isSharing}>
          {isSharing ? <span style={{ fontSize: 13, fontWeight: 'bold' }}>...</span> : <Share2 size={18} />}
        </button>
      </div>

      {/* 3D Card */}
      <div className="stage">
        <div
          className="card-scene"
          ref={cardSceneRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <div className="card-inner" ref={cardInnerRef}>
            <CardFront />
            <CardBack />
            <CardEdges />
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="bottom-nav">
        <div className="action-row">
          <button className="btn btn-flip" onClick={handleFlip}>↩ Balik Kartu</button>
          <a className="btn btn-save" href="/#/about">
            <Globe size={15} /> Lihat Profil
          </a>
        </div>
        <p className="hint">Seret · Putar · Ketuk untuk membalik</p>
      </div>



    </div>
  );
}
