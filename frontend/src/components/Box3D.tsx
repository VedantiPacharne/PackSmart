import { useEffect, useMemo, useRef, useState } from 'react';

type Box3DProps = {
  length: number;
  width: number;
  height: number;
  material?: 'cardboard' | 'plywood' | 'wood';
};

const materialStyles = {
  cardboard: {
    face: 'linear-gradient(145deg, #d7b88f 0%, #b08966 100%)',
    inside: 'linear-gradient(145deg, #f0e1c0 0%, #d8b288 100%)',
    pattern: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 2px, transparent 2px, transparent 8px)',
  },
  plywood: {
    face: 'linear-gradient(145deg, #a5754d 0%, #7b5436 100%)',
    inside: 'linear-gradient(145deg, #d5b08a 0%, #b48a63 100%)',
    pattern: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 3px, transparent 3px, transparent 10px)',
  },
  wood: {
    face: 'linear-gradient(145deg, #8d683f 0%, #5f3f26 100%)',
    inside: 'linear-gradient(145deg, #c6a17c 0%, #9a6f4f 100%)',
    pattern: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.13) 0px, rgba(0,0,0,0.13) 2px, transparent 2px, transparent 6px)',
  },
};

export default function Box3D({ length, width, height, material = 'wood' }: Box3DProps) {
  const [view, setView] = useState<'closed' | 'open'>('closed');
  const [rotation, setRotation] = useState({ x: -29, y: 26 });
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const dragStart = useRef({ x: 0, y: 0, rotX: -29, rotY: 26 });
  const frameRef = useRef<number | null>(null);
  const zoomDir = useRef(1);

  const mat = materialStyles[material] ?? materialStyles.wood;
  const scale = 2.8;
  const wPx = Math.max(110, width * scale);
  const hPx = Math.max(95, height * scale);
  const dPx = Math.max(60, length * scale);

  const transform = useMemo(
    () => `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
    [rotation, zoom],
  );

  const lidAngle = view === 'closed' ? -90 : -45;
  const lidOpacity = view === 'open' ? 0.88 : 1;

  useEffect(() => {
    const animateZoom = () => {
      setZoom((cz) => {
        let nz = cz + zoomDir.current * 0.0007;
        if (nz >= 1.14) { nz = 1.14; zoomDir.current = -1; }
        if (nz <= 0.88) { nz = 0.88; zoomDir.current = 1; }
        return nz;
      });
      frameRef.current = requestAnimationFrame(animateZoom);
    };

    frameRef.current = requestAnimationFrame(animateZoom);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStart.current = { x: event.clientX, y: event.clientY, rotX: rotation.x, rotY: rotation.y };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = event.clientX - dragStart.current.x;
    const dy = event.clientY - dragStart.current.y;
    setRotation({ x: Math.min(80, Math.max(-80, dragStart.current.rotX + dy * 0.35)), y: (dragStart.current.rotY + dx * 0.45) % 360 });
  };

  const onPointerUp = () => setIsDragging(false);

  const faceCommon: React.CSSProperties = {
    position: 'absolute',
    background: mat.face,
    backgroundImage: mat.pattern,
    border: '3px solid rgba(31, 23, 14, 0.55)',
    boxShadow: '0 0 14px rgba(0,0,0,0.2), inset 0 0 12px rgba(0,0,0,0.15)',
    backfaceVisibility: 'visible',
  };

  const lidStyle: React.CSSProperties = {
    ...faceCommon,
    transformOrigin: 'center bottom',
    transform: `translateY(-${hPx / 2}px) rotateX(${lidAngle}deg) translateZ(${dPx / 2 - 2}px)`,
    width: `${wPx}px`,
    height: `${dPx}px`,
    opacity: lidOpacity,
    zIndex: 5,
  };

  const insideStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${wPx - 10}px`,
    height: `${dPx - 10}px`,
    background: mat.inside,
    border: '2px dashed rgba(10,10,10,0.2)',
    transform: `translateY(-${hPx / 2 - 5}px) rotateX(-90deg) translateZ(5px)`,
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.16)',
    opacity: 0.94,
  };

  return (
    <div className='w-full'>
      <div className='mb-4 flex items-center justify-center gap-3'>
        <button
          onClick={() => setView('closed')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${view === 'closed' ? 'bg-slate-800 text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-300'} transition`}
        >
          Closed Box
        </button>
        <button
          onClick={() => setView('open')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${view === 'open' ? 'bg-slate-800 text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-300'} transition`}
        >
          Open Top
        </button>
      </div>

      <div
        className='relative mx-auto rounded-2xl overflow-hidden'
        style={{
          width: Math.max(340, dPx + wPx + 90),
          height: Math.max(340, hPx + dPx + 90),
          perspective: 1200,
          background: 'linear-gradient(145deg, #eaefef 0%, #cfd9e3 100%)',
          border: '1px solid rgba(148,163,184,0.30)',
          boxShadow: '0 24px 50px rgba(0,0,0,0.24)',
        }}
      >
        <div
          className='absolute inset-0 flex items-center justify-center'
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            className='relative transform-style-preserve-3d'
            style={{
              width: `${wPx}px`,
              height: `${hPx}px`,
              transformStyle: 'preserve-3d',
              transform,
            }}
          >
            <div style={{ ...faceCommon, width: `${wPx}px`, height: `${hPx}px`, transform: `translateZ(${dPx / 2}px)` }} />
            <div style={{ ...faceCommon, width: `${wPx}px`, height: `${hPx}px`, transform: `translateZ(-${dPx / 2}px) rotateY(180deg)` }} />
            <div style={{ ...faceCommon, width: `${dPx}px`, height: `${hPx}px`, transform: `translateX(${wPx / 2}px) rotateY(90deg)` }} />
            <div style={{ ...faceCommon, width: `${dPx}px`, height: `${hPx}px`, transform: `translateX(-${wPx / 2}px) rotateY(-90deg)` }} />
            <div style={{ ...faceCommon, width: `${wPx}px`, height: `${dPx}px`, transformOrigin: 'center bottom', transform: `translateY(-${hPx / 2}px) rotateX(-90deg)` }} />
            <div style={{ ...faceCommon, width: `${wPx}px`, height: `${dPx}px`, transform: `translateY(${hPx / 2}px) rotateX(90deg)` }} />
            <div style={lidStyle} />
            {view === 'open' && <div style={insideStyle} />}
          </div>
        </div>
      </div>

      <p className='mt-2 text-center text-xs text-slate-600'>Drag to rotate. Open/close top; auto zoom in/out gentle.</p>
    </div>
  );
}
