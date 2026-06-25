import type { APIRoute } from 'astro';
import { Resvg } from '@resvg/resvg-js';

// ── Page data ──────────────────────────────────────────────────────────────
const pages: Record<string, { title: string; line2?: string; subtitle: string; badge: string }> = {
  home: {
    badge: 'FREE BROWSER GAME',
    title: 'Stickman Hook',
    subtitle: 'Swing through 100+ levels — no download, instant play',
  },
  unblocked: {
    badge: 'UNBLOCKED · SCHOOL-SAFE',
    title: 'Stickman Hook',
    line2: 'Unblocked',
    subtitle: 'Play free at school. Works on Chromebook. No restrictions.',
  },
  faq: {
    badge: 'HELP & ANSWERS',
    title: 'Stickman Hook FAQ',
    subtitle: 'Is it free? How many levels? Who made it? All answered.',
  },
  'how-to-play': {
    badge: 'GUIDE & TIPS',
    title: 'How to Play',
    line2: 'Stickman Hook',
    subtitle: 'Controls, timing tips, and pro strategies for every level.',
  },
  levels: {
    badge: 'COMPLETE GUIDE',
    title: 'Stickman Hook',
    line2: 'Levels & Walkthrough',
    subtitle: 'How many levels, the last level, world records and walkthroughs.',
  },
  skins: {
    badge: 'ALL CHARACTERS',
    title: 'Stickman Hook',
    line2: 'Skins & Characters',
    subtitle: 'How to unlock every skin — raincloud, corgi and more.',
  },
  'stickman-hook-2': {
    badge: 'SEQUEL & VERSIONS',
    title: 'Stickman Hook 2',
    subtitle: 'More levels, tougher swings, same addictive gameplay.',
  },
  download: {
    badge: 'iOS & ANDROID',
    title: 'Download',
    line2: 'Stickman Hook',
    subtitle: 'Official App Store and Google Play links. 1,000+ levels offline.',
  },
  games: {
    badge: 'SIMILAR GAMES',
    title: 'Stickman &',
    line2: 'Swing Games',
    subtitle: 'The best free grappling, physics, and stickman games online.',
  },
};

export function getStaticPaths() {
  return Object.keys(pages).map((page) => ({ params: { page } }));
}

// ── SVG builder ────────────────────────────────────────────────────────────
function buildSVG(d: { title: string; line2?: string; subtitle: string; badge: string }): string {
  const hasLine2 = Boolean(d.line2);
  // Vertical layout
  const badgeY   = 95;
  const titleY   = hasLine2 ? 260 : 310;
  const line2Y   = titleY + 88;
  const subtitleY = hasLine2 ? line2Y + 70 : titleY + 75;
  const titleSize = 82;

  // Escape XML
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Badge width heuristic (~10.5px per char at 14px font)
  const badgeChars = d.badge.length;
  const badgeW = Math.max(160, badgeChars * 10.5 + 48);
  const badgeCx = 72 + badgeW / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#0d0d1a"/>
      <stop offset="55%"  stop-color="#16213e"/>
      <stop offset="100%" stop-color="#0f3460"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="0" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <radialGradient id="glow" cx="900" cy="180" r="420" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#7c3aed" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="8" height="630" fill="url(#acc)"/>

  <!-- Badge pill -->
  <rect x="72" y="${badgeY - 27}" width="${badgeW}" height="38" rx="19"
        fill="rgba(124,58,237,0.22)" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="${badgeCx}" y="${badgeY}"
        font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700"
        fill="#a855f7" text-anchor="middle" letter-spacing="1">${esc(d.badge)}</text>

  <!-- Title line 1 -->
  <text x="72" y="${titleY}"
        font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="${titleSize}"
        font-weight="900" fill="#ffffff" letter-spacing="-2">${esc(d.title)}</text>

  <!-- Title line 2 (optional, accent colour) -->
  ${hasLine2 ? `<text x="72" y="${line2Y}"
        font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="${titleSize}"
        font-weight="900" fill="#a855f7" letter-spacing="-2">${esc(d.line2 ?? '')}</text>` : ''}

  <!-- Subtitle -->
  <text x="72" y="${subtitleY}"
        font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#94a3b8">${esc(d.subtitle)}</text>

  <!-- Divider -->
  <line x1="72" y1="565" x2="1128" y2="565" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>

  <!-- Footer -->
  <text x="72" y="600"
        font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700"
        fill="#e2e8f0">Stickman Hook</text>
  <text x="1128" y="600"
        font-family="Arial, Helvetica, sans-serif" font-size="17"
        fill="#4b5563" text-anchor="end">stickman-hook.co.uk</text>

  <!-- Decorative stickman (right side, subtle) -->
  <circle cx="1010" cy="180" r="34" fill="none" stroke="#7c3aed" stroke-width="3" opacity="0.25"/>
  <line x1="1010" y1="214" x2="1010" y2="300" stroke="#7c3aed" stroke-width="3" opacity="0.25"/>
  <line x1="1010" y1="255" x2="968"  y2="285" stroke="#7c3aed" stroke-width="3" opacity="0.25"/>
  <line x1="1010" y1="255" x2="1052" y2="285" stroke="#7c3aed" stroke-width="3" opacity="0.25"/>
  <line x1="1010" y1="300" x2="982"  y2="370" stroke="#7c3aed" stroke-width="3" opacity="0.25"/>
  <line x1="1010" y1="300" x2="1038" y2="370" stroke="#7c3aed" stroke-width="3" opacity="0.25"/>
  <!-- grappling hook rope -->
  <path d="M1010 180 Q1075 110 1140 135" stroke="#a855f7" stroke-width="2.5"
        fill="none" opacity="0.35" stroke-linecap="round"/>
  <circle cx="1140" cy="135" r="7" fill="#a855f7" opacity="0.35"/>
</svg>`;
}

// ── Route handler ──────────────────────────────────────────────────────────
export const GET: APIRoute = ({ params }) => {
  const data = pages[params.page ?? ''] ?? pages.home;
  const svg  = buildSVG(data);

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: { loadSystemFonts: true },
  });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
