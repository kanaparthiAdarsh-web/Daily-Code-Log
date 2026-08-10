import React from 'react';
import {
  AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate,
} from 'remotion';

const S = (f, fps, d = 0, c = {}) =>
  spring({ frame: f - d, fps, config: { damping: 200, stiffness: 120, mass: 0.6, ...c } });
const X = (f, inR, outR) =>
  interpolate(f, inR, outR, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const C = { bg: '#f5f6f8', ink: '#0b0c0e', sub: '#6b7280', line: '#e6e8eb', accent: '#155eef', card: '#fff' };
const FONT = '"Inter","Helvetica Neue",Arial,sans-serif';
const shadow = (y = 20, a = 0.06) => `0 ${y}px ${y * 2}px rgba(0,0,0,${a})`;
const GPU = { willChange: 'transform, opacity', backfaceVisibility: 'hidden' };

const Card = ({ w, h, r = 24, style, children }) => (
  <div style={{
    width: w, height: h, borderRadius: r, background: C.card,
    border: `1px solid ${C.line}`, boxShadow: shadow(24, 0.07),
    display: 'flex', flexDirection: 'column', ...style,
  }}>{children}</div>
);

const Headline = ({ text, from, size = 64, color = C.ink, align = 'center' }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: '0 18px', maxWidth: 900 }}>
      {text.split(' ').map((w, i) => {
        const p = S(frame, fps, from + i * 2.5, { damping: 26, stiffness: 180, mass: 0.9 });
        return (
          <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <span style={{
              display: 'inline-block', fontFamily: FONT, fontWeight: 700, fontSize: size,
              letterSpacing: -1.2, color, lineHeight: 1.1, ...GPU,
              transform: `translateY(${X(p, [0, 1], [size, 0])}px)`, opacity: p,
            }}>{w}</span>
          </span>
        );
      })}
    </div>
  );
};

const Pill = ({ text, from, x, y, dark }) => {
  const { fps } = useVideoConfig();
  const f = useCurrentFrame();
  const p = S(f, fps, from, { damping: 14, stiffness: 140 });
  const float = Math.sin((f - from) / 14) * 4;
  return (
    <div style={{
      position: 'absolute', left: x, top: y + float, ...GPU,
      padding: '10px 20px', borderRadius: 999, fontFamily: FONT, fontWeight: 600, fontSize: 20,
      background: dark ? C.ink : C.card, color: dark ? '#fff' : C.ink,
      border: dark ? 'none' : `1px solid ${C.line}`, boxShadow: shadow(12, 0.08),
      transform: `translate(-50%,-50%) scale(${X(p, [0, 1], [0.5, 1])})`, opacity: p, whiteSpace: 'nowrap',
    }}>{text}</div>
  );
};

const Metric = ({ to, from, suffix = '%', size = 40 }) => {
  const { fps } = useVideoConfig();
  const f = useCurrentFrame();
  const p = S(f, fps, from, { damping: 40, stiffness: 60 });
  const v = X(p, [0, 1], [0, to]);
  return <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, color: C.accent }}>
    {(to >= 0 ? '+' : '') + v.toFixed(2)}{suffix}
  </span>;
};

const Pop = ({ src, at, volume = 0.6 }) =>
  src ? (
    <Sequence from={at} durationInFrames={20} layout="none">
      <Audio src={staticFile(src)} volume={volume} />
    </Sequence>
  ) : null;

const Hook = ({ badgeText, headline }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const bgP = S(f, fps, 0, { damping: 30 });
  return (
    <AbsoluteFill style={{ background: C.bg, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: X(f, [0, 20], [0, 1]), transform: `translateY(${X(bgP, [0, 1], [12, 0])}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        <Pill text={badgeText} from={6} x={0} y={0} dark />
        <div style={{ marginTop: 40 }}>
          <Headline text={headline} from={26} size={72} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Catalog = ({ eyebrow, productTitle, productPrice, tagText, deltaText }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const p = S(f, fps, 0, { damping: 18, stiffness: 90, mass: 1 });
  const rotY = X(p, [0, 1], [-38, 0]);
  const rotX = X(p, [0, 1], [14, 0]);
  const rise = X(p, [0, 1], [80, 0]);
  return (
    <AbsoluteFill style={{ background: C.bg, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: 90, opacity: X(f, [0, 20], [0, 1]) }}>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 34, color: C.sub, letterSpacing: -0.5 }}>{eyebrow}</span>
      </div>
      <div style={{ perspective: 1400 }}>
        <Card w={420} h={520} r={28} style={{
          ...GPU,
          transform: `translateY(${rise}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
          alignItems: 'center', padding: 28, opacity: p,
        }}>
          <div style={{ width: '100%', height: 320, borderRadius: 18, background: 'linear-gradient(135deg,#dfe6f2,#f3f5f9)' }} />
          <div style={{ width: '100%', marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 22, color: C.ink }}>{productTitle}</span>
            <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 22, color: C.accent }}>{productPrice}</span>
          </div>
        </Card>
      </div>
      <Pill text={tagText} from={110} x={1500} y={340} />
      <Pill text={deltaText} from={130} x={430} y={870} dark />
    </AbsoluteFill>
  );
};

const AutomationCore = ({ headline, formats, panelLabel }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const cursorP = S(f, fps, 60, { damping: 26, stiffness: 70 });
  const cx = X(cursorP, [0, 1], [1180, 1420]);
  const cy = X(cursorP, [0, 1], [420, 560]);
  const toggleOn = S(f, fps, 100, { damping: 16 });
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', opacity: X(f, [0, 20], [0, 1]) }}>
        <Headline text={headline} from={0} size={56} />
      </div>
      <div style={{ position: 'absolute', left: 260, top: 380, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {formats.map((n, i) => {
          const np = S(f, fps, 30 + i * 8, { damping: 15 });
          return (
            <Card key={n} w={220} h={72} r={16} style={{
              ...GPU,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
              transform: `translateX(${X(np, [0, 1], [-60, 0])}px)`, opacity: np,
            }}><span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 22, color: C.ink }}>{n}</span></Card>
          );
        })}
      </div>
      <Card w={480} h={300} r={24} style={{ position: 'absolute', right: 240, top: 400, padding: 32, opacity: X(f, [40, 70], [0, 1]) }}>
        <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 20, color: C.sub }}>{panelLabel}</span>
        <div style={{
          marginTop: 24, width: 68, height: 36, borderRadius: 999,
          background: X(toggleOn, [0, 1], [0, 1]) > 0.5 ? C.accent : C.line, position: 'relative', transition: 'none',
        }}>
          <div style={{
            position: 'absolute', top: 3, left: X(toggleOn, [0, 1], [3, 35]),
            width: 30, height: 30, borderRadius: '50%', background: '#fff', boxShadow: shadow(6, 0.15),
          }} />
        </div>
      </Card>
      <div style={{
        position: 'absolute', left: cx, top: cy, width: 18, height: 18, opacity: X(f, [60, 80], [0, 1]), ...GPU,
        borderRadius: '50% 50% 50% 0', background: C.ink, transform: 'rotate(-45deg)',
      }} />
    </AbsoluteFill>
  );
};

const ScaleMetrics = ({ headline, metrics, skuPrefix }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const rows = Array.from({ length: 8 }, (_, i) => `${skuPrefix}-${(10234 + i * 7).toString().padStart(5, '0')} · Warehouse ${['A', 'B', 'C'][i % 3]}`);
  const scrollP = S(f, fps, 40, { damping: 60, stiffness: 20, mass: 2 });
  const scrollY = X(scrollP, [0, 1], [0, -180]);
  return (
    <AbsoluteFill style={{ background: C.bg, alignItems: 'center' }}>
      <div style={{ marginTop: 90, opacity: X(f, [0, 20], [0, 1]) }}>
        <Headline text={headline} from={0} size={56} />
      </div>
      <div style={{ display: 'flex', gap: 60, marginTop: 60, opacity: X(f, [20, 45], [0, 1]) }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 48 }}>{m.flag}</span>
            <Metric to={m.value} from={30 + i * 10} />
          </div>
        ))}
      </div>
      <Card w={720} h={280} r={20} style={{ marginTop: 50, overflow: 'hidden', opacity: X(f, [50, 75], [0, 1]) }}>
        <div style={{ transform: `translateY(${scrollY}px)`, ...GPU }}>
          {rows.map((r, i) => (
            <div key={i} style={{
              padding: '18px 28px', borderBottom: `1px solid ${C.line}`,
              display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontSize: 18, color: C.ink,
            }}>
              <span>{r}</span><span style={{ color: C.sub }}>{(1.2 + i * 0.3).toFixed(1)}M items</span>
            </div>
          ))}
        </div>
      </Card>
    </AbsoluteFill>
  );
};

const Outro = ({ headline, brandName, brandGlyph }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const cardP = S(f, fps, 40, { damping: 16, stiffness: 130 });
  const checkP = S(f, fps, 90, { damping: 10, stiffness: 200 });
  const fadeOut = X(f, [200, 240], [1, 0]);

  return (
    <AbsoluteFill style={{ background: C.bg, alignItems: 'center', justifyContent: 'center', opacity: fadeOut }}>
      <div style={{ position: 'absolute', top: 140, opacity: X(f, [0, 20], [0, 1]) }}>
        <Headline text={headline} from={0} size={52} />
      </div>
      <Card w={460} h={320} r={28} style={{
        alignItems: 'center', justifyContent: 'center', gap: 20, ...GPU,
        transform: `scale(${X(cardP, [0, 1], [0.7, 1])}) translateY(${X(cardP, [0, 1], [40, 0])}px)`,
        opacity: cardP,
      }}>
        <div style={{
          width: 84, height: 84, borderRadius: 20, background: C.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><span style={{ fontSize: 40, color: '#fff' }}>{brandGlyph}</span></div>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 30, color: C.ink }}>{brandName}</span>
        <div style={{
          width: 48, height: 48, borderRadius: '50%', background: C.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${X(checkP, [0, 1], [0, 1])})`, opacity: checkP,
        }}><span style={{ color: '#fff', fontSize: 26, fontWeight: 700 }}>✓</span></div>
      </Card>
    </AbsoluteFill>
  );
};

const DEFAULT_METRICS = [
  { flag: '🇺🇸', value: 6.19 },
  { flag: '🇲🇽', value: 4.82 },
];

const DEFAULTS = {
  badgeText: '✦  Find me AI',
  hookHeadline: 'The future of commerce is here',
  catalogEyebrow: 'Miraki Catalog',
  productTitle: 'Alpine Ski Jacket',
  productPrice: '$349.99',
  productTag: 'Trendy sunglasses',
  productDelta: '+2.6%',
  automationHeadline: 'AI automates manual tasks',
  formats: ['CSV', 'JSON', 'XML', 'API'],
  panelLabel: 'Auto-sync inventory',
  scaleHeadline: 'Scale with confidence',
  metrics: DEFAULT_METRICS,
  skuPrefix: 'SKU',
  outroHeadline: 'One connection, many channels',
  brandName: 'Miraki Connect',
  brandGlyph: '⚡',
  audio: undefined,
};

const CUT_FRAMES = { hook: 0, catalog: 150, automation: 360, scale: 660, outro: 960 };
const CUT_DURS = { hook: 150, catalog: 210, automation: 300, scale: 300, outro: 240 };

export const MirakiLaunch = (props) => {
  const p = { ...DEFAULTS, ...props };
  const pop = p.audio?.transitionPop;

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Sequence from={CUT_FRAMES.hook} durationInFrames={CUT_DURS.hook} name="Hook">
        <Hook badgeText={p.badgeText} headline={p.hookHeadline} />
      </Sequence>
      <Sequence from={CUT_FRAMES.catalog} durationInFrames={CUT_DURS.catalog} name="Catalog">
        <Catalog
          eyebrow={p.catalogEyebrow}
          productTitle={p.productTitle}
          productPrice={p.productPrice}
          tagText={p.productTag}
          deltaText={p.productDelta}
        />
      </Sequence>
      <Sequence from={CUT_FRAMES.automation} durationInFrames={CUT_DURS.automation} name="AutomationCore">
        <AutomationCore headline={p.automationHeadline} formats={p.formats} panelLabel={p.panelLabel} />
      </Sequence>
      <Sequence from={CUT_FRAMES.scale} durationInFrames={CUT_DURS.scale} name="ScaleMetrics">
        <ScaleMetrics headline={p.scaleHeadline} metrics={p.metrics} skuPrefix={p.skuPrefix} />
      </Sequence>
      <Sequence from={CUT_FRAMES.outro} durationInFrames={CUT_DURS.outro} name="Outro">
        <Outro headline={p.outroHeadline} brandName={p.brandName} brandGlyph={p.brandGlyph} />
      </Sequence>

      {p.audio?.bed && <Audio src={staticFile(p.audio.bed.src)} volume={p.audio.bed.volume ?? 0.35} />}

      <Pop src={pop?.src} at={CUT_FRAMES.catalog} volume={pop?.volume} />
      <Pop src={pop?.src} at={CUT_FRAMES.automation} volume={pop?.volume} />
      <Pop src={pop?.src} at={CUT_FRAMES.scale} volume={pop?.volume} />
    </AbsoluteFill>
  );
};

export default MirakiLaunch;