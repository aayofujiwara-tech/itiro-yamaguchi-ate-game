export type Rank = {
  minPercent: number;
  maxPercent: number;
  depth: string;
  depthRange: string;
  creature: string;
  title: string;
  description: string;
  emoji: string;
};

export const RANKS: Rank[] = [
  {
    minPercent: 0, maxPercent: 19,
    depth: "表層", depthRange: "0-200m",
    creature: "マイワシ", title: "マイワシ級",
    description: "まだ陽の当たる海面付近を泳いでいます",
    emoji: "🐟",
  },
  {
    minPercent: 20, maxPercent: 29,
    depth: "表層〜中層", depthRange: "100-300m",
    creature: "マサバ", title: "マサバ級",
    description: "少しずつ深い海への好奇心が芽生えています",
    emoji: "🐟",
  },
  {
    minPercent: 30, maxPercent: 39,
    depth: "中深層上部", depthRange: "200-500m",
    creature: "メカジキ", title: "メカジキ級",
    description: "光が薄れ始める海域まで到達しました",
    emoji: "🗡️",
  },
  {
    minPercent: 40, maxPercent: 49,
    depth: "中深層", depthRange: "500-700m",
    creature: "リュウグウノツカイ", title: "リュウグウノツカイ級",
    description: "深海の神秘に触れ始めています",
    emoji: "🐉",
  },
  {
    minPercent: 50, maxPercent: 59,
    depth: "中深層下部", depthRange: "700-1,000m",
    creature: "ホタルイカ", title: "ホタルイカ級",
    description: "トワイライトゾーンで自ら光を放っています",
    emoji: "🦑",
  },
  {
    minPercent: 60, maxPercent: 69,
    depth: "漸深層上部", depthRange: "1,000-2,000m",
    creature: "ダイオウイカ", title: "ダイオウイカ級",
    description: "暗黒の深海で巨大な存在感を示しています",
    emoji: "🦑",
  },
  {
    minPercent: 70, maxPercent: 79,
    depth: "漸深層", depthRange: "2,000-3,000m",
    creature: "ミツクリザメ", title: "ミツクリザメ級",
    description: "生きた化石と肩を並べる領域に突入しました",
    emoji: "🦈",
  },
  {
    minPercent: 80, maxPercent: 84,
    depth: "漸深層下部", depthRange: "3,000-4,000m",
    creature: "デメニギス", title: "デメニギス級",
    description: "透明な頭部で深海の真実を見通しています",
    emoji: "👁️",
  },
  {
    minPercent: 85, maxPercent: 94,
    depth: "深海層", depthRange: "4,000-6,000m",
    creature: "シーラカンス", title: "シーラカンス級",
    description: "数億年の歴史を持つ深海の王に匹敵します",
    emoji: "🐠",
  },
  {
    minPercent: 95, maxPercent: 100,
    depth: "超深海層", depthRange: "6,000m以深",
    creature: "シンカイクサウオ", title: "シンカイクサウオ級",
    description: "マリアナ海溝の最深部に到達。地球上で最も深い探査員です",
    emoji: "🏆",
  },
];

export function getRank(scorePercent: number): Rank {
  return RANKS.find(r => scorePercent >= r.minPercent && scorePercent <= r.maxPercent) || RANKS[0];
}
