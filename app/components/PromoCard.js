'use client'

import Link from 'next/link'

export default function PromoCard() {
  return (
    <div
      className="video-card rounded-lg overflow-hidden shadow-lg flex flex-col"
      style={{
        background: 'linear-gradient(145deg, #0f0c29, #1a1040, #24243e)',
        border: '1.5px solid rgba(168, 85, 247, 0.5)',
        boxShadow: '0 0 24px rgba(168, 85, 247, 0.15), inset 0 0 40px rgba(0,0,0,0.3)',
        position: 'relative',
      }}
    >
      {/* Top badge */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 900,
          padding: '3px 10px',
          borderRadius: '999px',
          letterSpacing: '0.05em',
          zIndex: 2,
        }}
      >
        🔥 LIMITED OFFER
      </div>

      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(236,72,153,0.15))',
          padding: '18px 16px 12px',
          borderBottom: '1px solid rgba(168,85,247,0.2)',
        }}
      >
        <div style={{ fontSize: '11px', color: '#a78bfa', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4px' }}>
          💻 OWN YOUR ADULT WEBSITE
        </div>
        <div style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', lineHeight: 1.3 }}>
          Start Your Own Porn Website<br />
          <span style={{ color: '#f59e0b' }}>in Just $75!</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
          <span style={{ fontSize: '22px', fontWeight: 900, color: '#f59e0b' }}>$75</span>
          <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>$149</span>
          <span style={{ fontSize: '11px', background: '#16a34a', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
            SAVE $74
          </span>
        </div>
      </div>
      {/* Earnings hook — compact English */}
      <div
        style={{
          padding: '8px 16px',
          background: 'linear-gradient(135deg, rgba(22,163,74,0.15), rgba(16,185,129,0.08))',
          borderBottom: '1px solid rgba(16,185,129,0.2)',
        }}
      >
        {/* Headline row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '14px' }}>💰</span>
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#34d399' }}>
              Earn <span style={{ color: '#4ade80' }}>$100–$300</span>/day from Ads!
            </span>
          </div>
        </div>

        {/* Mini stat row */}
        <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
          {[
            { label: '1K/day', earn: '~$5' },
            { label: '10K/day', earn: '~$50' },
            { label: '30K/day', earn: '~$150+' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(74,222,128,0.2)',
                borderRadius: '5px',
                padding: '3px 2px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 900, color: '#4ade80' }}>{stat.earn}</div>
              <div style={{ fontSize: '8px', color: '#6b7280' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '10px 16px', flex: 1 }}>
        {[
          { icon: '⚡', text: 'Live in under 24 hours' },
          { icon: '🎬', text: '3,000+ pre-loaded HD videos' },
          { icon: '📈', text: '100% SEO optimized & mobile ready' },
          { icon: '🛠️', text: 'Advanced Admin Panel included' },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '3px 0',
              fontSize: '12px',
              color: '#d1d5db',
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}
          >
            <span style={{ fontSize: '13px', flexShrink: 0 }}>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>



      {/* CTA Button */}
      <div style={{ padding: '10px 16px 14px' }}>
        <Link
          href="/get-your-own-site"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            color: '#fff',
            fontWeight: 900,
            fontSize: '13px',
            padding: '10px 0',
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(124,58,237,0.4)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          👀 Check Website Demos
        </Link>
      </div>
    </div>
  )
}
