import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw } from 'lucide-react';

const ThreeDCard = ({ profile }) => {
    if (!profile) return null;
    const [flipped, setFlipped] = useState(false);
    const cardSceneRef = useRef();
    const cardInnerRef = useRef();
    
    // Spring Physics Logic
    const st = useRef({
        rotX: 0, rotY: 0, targetX: 0, targetY: 0,
        isDragging: false, isHovering: false, didDrag: false,
        startX: 0, startY: 0, startRotX: 0, startRotY: 0,
        flipped: false, raf: null,
    });

    useEffect(() => {
        const s = st.current;
        const tick = () => {
            if (!s.isDragging && !s.isHovering) {
                s.targetX = 0;
                s.targetY = s.flipped ? 180 : 0;
            }
            
            // Smoother LERP values as requested
            const lerpSpeed = s.isDragging ? 0.35 : 0.12;
            s.rotX += (s.targetX - s.rotX) * lerpSpeed;
            s.rotY += (s.targetY - s.rotY) * lerpSpeed;

            if (cardInnerRef.current) {
                // Ensure transform origin is centered
                cardInnerRef.current.style.transformOrigin = 'center center';
                cardInnerRef.current.style.transform = `rotateX(${s.rotX.toFixed(2)}deg) rotateY(${s.rotY.toFixed(2)}deg)`;
                
                // Shine Effect Gradient mapping
                const shine = s.isDragging || s.isHovering || Math.abs(s.rotX) > 1 || Math.abs(s.rotY % 180) > 2 ? 1 : 0;
                const mx = 50 + ((s.rotY % 360) / 180 - 0.5) * 100;
                const my = 50 - (s.rotX / 45) * 50;
                
                cardInnerRef.current.querySelectorAll('.face-layer').forEach(f => {
                    f.style.setProperty('--mx', `${mx.toFixed(1)}%`);
                    f.style.setProperty('--my', `${my.toFixed(1)}%`);
                    f.style.setProperty('--shine', shine.toString());
                });
            }
            s.raf = requestAnimationFrame(tick);
        };
        s.raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(s.raf);
    }, []);

    useEffect(() => { st.current.flipped = flipped; }, [flipped]);

    const onPointerDown = useCallback((e) => {
        const s = st.current;
        s.isDragging = true; s.isHovering = false; s.didDrag = false;
        s.startX = e.clientX; s.startY = e.clientY;
        s.startRotX = s.rotX; s.startRotY = s.rotY;
        s.targetX = s.rotX; s.targetY = s.rotY;
        e.currentTarget.setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e) => {
        const s = st.current;
        if (!s.isDragging) return;
        const dx = e.clientX - s.startX; const dy = e.clientY - s.startY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) s.didDrag = true;
        
        // Phase 3: Interaction Logic (Safe rotation limits)
        s.targetY = s.startRotY + dx * 0.35;
        const targetX = s.startRotX - dy * 0.2;
        s.targetX = Math.max(-40, Math.min(40, targetX)); // Limit tilt
    }, []);

    const onPointerUp = useCallback(() => {
        const s = st.current;
        s.isDragging = false;
        if (!s.didDrag) {
            setFlipped(f => { const next = !f; s.flipped = next; return next; });
        } else {
            // Find nearest side
            const normY = ((s.targetY % 360) + 360) % 360;
            const toBack = normY > 90 && normY < 270;
            s.flipped = toBack; setFlipped(toBack);
        }
    }, []);

    const onMouseMove = useCallback((e) => {
        const s = st.current;
        if (s.isDragging) return;
        const rect = cardSceneRef.current?.getBoundingClientRect();
        if (!rect) return;
        s.isHovering = true;
        // Phase 3: Interaction Logic (Tilt limits)
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        s.targetY = (s.flipped ? 180 : 0) + mouseX * 25;
        s.targetX = -mouseY * 20;
    }, []);

    const onMouseLeave = useCallback(() => {
        if (!st.current.isDragging) st.current.isHovering = false;
    }, []);

    return (
        <div className="flex flex-col items-center">
            {/* 3D Card Stage */}
            <div className="w-full flex justify-center py-10 sm:py-16 shrink-0 relative z-10">
                <div 
                    className={`c-scene ${st.current.isDragging ? 'is-grabbing' : ''}`} ref={cardSceneRef}
                    onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
                    onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
                >
                    <div className="c-inner" ref={cardInnerRef}>
                        {/* Front Face (Light - Elegant Minimalist Design) */}
                        <div className="c-face c-face-front">
                            <div className="cb-layout">
                                <div className="cb-corner tl"/><div className="cb-corner tr"/><div className="cb-corner bl"/><div className="cb-corner br"/>
                                <div className="cb-kanji">{profile.brandKanji}</div>
                                <div className="cb-brand">{profile.brand}</div>
                                <div className="cb-kanji" style={{fontSize: 8, marginTop: 4}}>{profile.city} · {profile.est}</div>
                                <div className="cb-hanko">印</div>
                            </div>
                        </div>
                        {/* Back Face (Dark - Detailed Contact Info) */}
                        <div className="c-face c-face-back">
                            <div className="cf-layout">
                                <div className="cf-top">
                                    <div className="cf-jp">
                                        <span>名刺 · MEISHI</span>
                                        <span>CONNECTION CARD</span>
                                    </div>
                                    <div className="cf-brand">
                                        <h2>{profile.brand}</h2>
                                        <p>{profile.brandKanji}</p>
                                    </div>
                                </div>
                                <div className="cf-mid">
                                    <div className="cf-line" />
                                    <div className="cf-info">
                                        <div className="cf-name">{profile.nameEn || profile.name}</div>
                                        <div className="cf-en">{profile.nameKo || profile.nameJp || ''}</div>
                                        <div className="cf-role" style={{lineHeight: 1.4}}>{profile.role}</div>
                                        <div className="cf-contact">
                                            <div><span>TEL</span>{profile.tel}</div>
                                            <div><span>MAIL</span>{profile.mail}</div>
                                            <div><span>LOC</span>{profile.adr || profile.city}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cf-bot">
                                    <span className="cf-tagline">情熱 · 創造 · 解決</span>
                                    <span className="cf-est">Est. {profile.est}</span>
                                </div>
                            </div>
                        </div>
                        {/* 3D Edges */}
                        <div className="c-edge c-edge-top" />
                        <div className="c-edge c-edge-bottom" />
                        <div className="c-edge c-edge-left" />
                        <div className="c-edge c-edge-right" />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-3 mt-8 relative z-10">
                <div className="text-[8px] sm:text-[9px] tracking-[0.4em] text-ancient-tan uppercase font-mono">Drag · Tilt · Tap to Flip</div>
                <button 
                    className="flex items-center gap-2 px-6 py-3 rounded-none border border-sumi-ink/20 text-sumi-ink font-mono text-[9px] tracking-widest uppercase transition-all hover:bg-sumi-ink/5 min-h-[44px] bg-white/5 backdrop-blur-sm" 
                    onClick={() => setFlipped(!flipped)}
                >
                    <RefreshCw size={12} className="opacity-60" /> Flip Card
                </button>
            </div>
        </div>
    );
};

ThreeDCard.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ThreeDCard;
