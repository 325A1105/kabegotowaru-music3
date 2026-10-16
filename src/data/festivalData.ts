export interface TimetableItem {
  id: string;
  day: 1 | 2;
  stage: 'main' | 'underground' | 'blackbox';
  stageName: string;
  startTime: string;
  endTime: string;
  artist: string;
  genre: string;
  title: string;
  description: string;
  featured?: boolean;
  image?: string;
  members?: string;
  setlist?: string[];
}

export interface StallItem {
  id: string;
  category: 'food' | 'activity' | 'tech' | 'art';
  categoryLabel: string;
  name: string;
  organization: string;
  location: string;
  zone: 'courtyard' | 'arena' | 'bldg1' | 'bldg2';
  priceRange: string;
  congestion: 'vacant' | 'normal' | 'crowded';
  congestionLabel: string;
  waitTimeMinutes: number;
  description: string;
  menuOrHighlights: string[];
  image?: string;
}

export interface MerchItem {
  id: string;
  name: string;
  englishName: string;
  price: number;
  status: 'available' | 'low_stock' | 'sold_out';
  statusLabel: string;
  description: string;
  sizes?: string[];
}

export const FESTIVAL_INFO = {
  title: "URAYAMA FESTIVAL 2026",
  japaneseTitle: "浦山学園祭 2026",
  theme: "破却 - HAKYAKU -",
  tagline: "沈黙を裂け。ここからだ。",
  dates: "2026.11.01 [SAT] - 11.02 [SUN]",
  dateRangeText: "2026年11月1日(土) 10:00 - 20:00 / 11月2日(日) 10:00 - 19:30",
  venue: "浦山学園 富山キャンパス特設会場",
  targetAudience: "一般来場者・高校生・在学生・地域住民（入場無料・要デジタル整理券）",
  officialTrack: {
    title: "破却 -HAKYAKU-",
    artist: "URAYAMA SOUND CYPHER ft. KANETO & MC SHADOW",
    bpm: 148,
    key: "F minor",
    description: "2026年度学園祭公式テーマソング。重低音トラップビートと切れ味鋭いフロウが融合した、限界突破のアンセム。"
  }
};

export const LYRICS_LINES = [
  { time: 0, text: "ここからだ。" },
  { time: 6, text: "一歩で突破 エンドレス" },
  { time: 10, text: "沈黙を裂いた 言葉を連打" },
  { time: 14, text: "曖昧な看板 剥がして判断" },
  { time: 18, text: "埋算段 全部が散漫" },
  { time: 21, text: "磨いた刃な 語尾まで鋭利" },
  { time: 24, text: "逃げ道塞いで 正面で対峙" },
  { time: 27, text: "小さな火種を 大火に変換" },
  { time: 30, text: "この一行で 空気を奪還" },
  { time: 33, text: "まだだ まだだ ここで止まるな" },
  { time: 36, text: "噛んだ言葉も 武器へと変える" },
  { time: 40, text: "越えよ 越えよ 正面から" },
  { time: 44, text: "韻を刻んで 壁ごと割る" },
  { time: 48, text: "速度を上げても 濁らぬ発音" },
  { time: 52, text: "孤独も焦燥も 燃料に改造" },
  { time: 56, text: "机上の理想を 現場で検証" },
  { time: 60, text: "1秒で更新 限界を破却" },
  { time: 64, text: "反論歓迎 その場で解体" },
  { time: 68, text: "細工じゃない 積み上げた正体" },
  { time: 72, text: "視線を逸らすな 答えは永劫" },
  { time: 76, text: "奪うんじゃない 実力で奪回" },
  { time: 80, text: "息を吸え… まだ終わらない" },
  { time: 85, text: "最後の一行まで 逝かない" }
];

export const TIMETABLE_DATA: TimetableItem[] = [
  // Day 1
  {
    id: 't-101',
    day: 1,
    stage: 'main',
    stageName: 'メインアリーナ (Main Stage)',
    startTime: '10:30',
    endTime: '11:30',
    artist: 'URAYAMA BIG BAND',
    genre: 'Brass & Funk Rock',
    title: 'OPENING OVERTURE: 轟音の号砲',
    description: '総勢40名による迫力のブラス＆ハードロックセッション。学園祭の開幕を告げる祝砲的ライブ。',
    members: '吹奏楽部 × 軽音楽部 コラボレーション',
    setlist: ['Tank! (Seatbelts Cover)', 'Reignite Fanfare', 'Seven Nation Army (Big Band Ver.)']
  },
  {
    id: 't-102',
    day: 1,
    stage: 'underground',
    stageName: '中庭特設 (Underground Stage)',
    startTime: '12:00',
    endTime: '13:00',
    artist: 'STREET CYPHER CREW',
    genre: 'Rap & Freestyle Battle',
    title: 'UNDERGROUND BATTLE ROYALE 2026',
    description: '学内外から集結した16名のMCによるガチンコ・フリースタイルラップトーナメント。審査は観客の歓声音量。',
    members: 'MC KANETO, DJ VORTEX, GUEST JUDGES',
    featured: true
  },
  {
    id: 't-103',
    day: 1,
    stage: 'main',
    stageName: 'メインアリーナ (Main Stage)',
    startTime: '13:30',
    endTime: '14:45',
    artist: 'NOCTURNE PROTOCOL',
    genre: 'Electro Rock / Loud',
    title: 'ELECTRIC SHOCK THERAPY',
    description: 'シンセサイザーとドロップチューニングギターの超重量級アンサンブル。アリーナを重低音で揺らす。',
    members: 'Gt/Vo. TAKUMI, Syn. RIKU, Ba. REN, Dr. SHUN',
    setlist: ['Phase Zero', 'Overload', 'Blackout Velocity', 'Ignition Drive']
  },
  {
    id: 't-104',
    day: 1,
    stage: 'blackbox',
    stageName: 'ブラックボックス (Hall C)',
    startTime: '14:00',
    endTime: '15:15',
    artist: 'DIGITAL MEDIA LAB × SOUND ART',
    genre: 'Interactive AV Live',
    title: 'SYNTHETIC CONSCIOUSNESS: 光と音の神経網',
    description: 'LEDキューブとリアルタイムオーディオリアクティブグラフィックによる没入型暗室パフォーマンス。',
    members: 'メディア情報学科 インタラクティブ研究室'
  },
  {
    id: 't-105',
    day: 1,
    stage: 'underground',
    stageName: '中庭特設 (Underground Stage)',
    startTime: '15:30',
    endTime: '16:45',
    artist: 'DANCE UNIT "KRONOS"',
    genre: 'Street Dance & KRUMP',
    title: 'LIMIT BREAK: 身体表現の極致',
    description: '全国大学ストリートダンス選手権ファイナリストによる、ダークかつアグレッシブなダンスショウケース。',
    members: 'KRONOS DANCE TEAM (22 members)'
  },
  {
    id: 't-106',
    day: 1,
    stage: 'main',
    stageName: 'メインアリーナ (Main Stage)',
    startTime: '18:00',
    endTime: '19:45',
    artist: 'URAYAMA ALL STARS ft. GUEST CYPHER',
    genre: 'Dark Trap & Live Orchestra',
    title: 'DAY 1 SPECIAL HEADLINER: 『破却』',
    description: '公式テーマソング『破却 -HAKYAKU-』のフルバンド生演奏＆レーザーライティングショウ。初日最高潮のステージ。',
    featured: true,
    setlist: ['Prelude in C Dark', 'ここからだ - Intro', '破却 -HAKYAKU- (Extended Fest Mix)', 'ENCORE: IGNITE']
  },

  // Day 2
  {
    id: 't-201',
    day: 2,
    stage: 'main',
    stageName: 'メインアリーナ (Main Stage)',
    startTime: '11:00',
    endTime: '12:15',
    artist: 'E-SPORTS ARENA: VALORANT SHOWDOWN',
    genre: 'E-Sports Tournament',
    title: 'CAMPUS CHAMPIONSHIP GRAND FINALS',
    description: '学内最強の5名 vs 招待プロチームのエキシビションマッチ。大型LEDビジョン＆実況解説つき。',
    members: '浦山ゲーミング部 × ゲスト実況'
  },
  {
    id: 't-202',
    day: 2,
    stage: 'underground',
    stageName: '中庭特設 (Underground Stage)',
    startTime: '12:45',
    endTime: '14:00',
    artist: 'BASSLINE COLLECTIVE',
    genre: 'UK Garage & Drum\'n\'Bass',
    title: 'MIDDAY RAVE SESSION',
    description: '中庭を一瞬でフェス会場へ変貌させるノンストップベースミュージックDJセッション。',
    members: 'DJ NOISEGATE, MC APEX'
  },
  {
    id: 't-203',
    day: 2,
    stage: 'blackbox',
    stageName: 'ブラックボックス (Hall C)',
    startTime: '14:30',
    endTime: '15:30',
    artist: 'ACOUSTIC SHADOWS',
    genre: 'Dark Folk / Ambient',
    title: 'ECHOES IN OBSIDIAN',
    description: '生楽器とディレイエフェクトによる静寂と激情のアコースティックライブ。キャンドルライトの中で上演。',
    members: 'Vo/Gt. KANON, Cello. SORA'
  },
  {
    id: 't-204',
    day: 2,
    stage: 'main',
    stageName: 'メインアリーナ (Main Stage)',
    startTime: '16:00',
    endTime: '17:15',
    artist: 'CAMPUS GRAND PRIX FINALISTS',
    genre: 'Contest Final',
    title: '学祭グランプリ2026 最終決戦ステージ',
    description: '事前投票と当日審査を勝ち抜いた3組による頂上決戦。観客リアルタイム投票で王者が決定する。',
    featured: true
  },
  {
    id: 't-205',
    day: 2,
    stage: 'main',
    stageName: 'メインアリーナ (Main Stage)',
    startTime: '18:00',
    endTime: '19:30',
    artist: 'GRAND FINALE: THE LAST SPARK',
    genre: 'Festival Finale & Pyrotechnics',
    title: 'グランドフィナーレ: 最後の1秒まで消えない',
    description: '全出演者によるアンセム演奏、レーザープロジェクションマッピング、そして閉幕花火の打ち上げ。',
    featured: true
  }
];

export const STALLS_DATA: StallItem[] = [
  {
    id: 's-01',
    category: 'food',
    categoryLabel: 'フード & ドリンク',
    name: '黒鉄スモーク プルコギタコス',
    organization: '国際交流サークル × 調理研究会',
    location: '1F 中庭フードトラック A-01',
    zone: 'courtyard',
    priceRange: '¥600〜¥800',
    congestion: 'crowded',
    congestionLabel: '大盛況',
    waitTimeMinutes: 20,
    description: '竹炭を練り込んだ特製ブラックトルティーヤに、自家製燻製プルコギとハラペーニョを豪快にトッピング。',
    menuOrHighlights: ['ブラックプルコギタコス (¥650)', 'ハラペーニョチーズポテト (¥450)', 'ライムモヒートソーダ (¥400)']
  },
  {
    id: 's-02',
    category: 'food',
    categoryLabel: 'フード & ドリンク',
    name: '漆黒スパイス 鬼辛からあげ',
    organization: '体育会サッカー部',
    location: '1F 中庭フードエリア B-04',
    zone: 'courtyard',
    priceRange: '¥500〜¥700',
    congestion: 'normal',
    congestionLabel: 'やや混雑',
    waitTimeMinutes: 10,
    description: '特製黒七味と粗挽きブラックペッパーを贅沢にまとった外サク中ジューシーな名物から揚げ。辛さ3段階。',
    menuOrHighlights: ['漆黒ブラックから揚げ 6個 (¥500)', 'マグマ激辛から揚げ (¥550)', '冷製烏龍茶セット (+¥150)']
  },
  {
    id: 's-03',
    category: 'tech',
    categoryLabel: '先端技術 & ロボティクス',
    name: 'サイバーロボティクス LAB 2026',
    organization: '工学部 ロボティクス研究会',
    location: '2号館 1F メカトロ実習棟',
    zone: 'bldg2',
    priceRange: '無料体験',
    congestion: 'normal',
    congestionLabel: 'やや混雑',
    waitTimeMinutes: 10,
    description: '競技ロボットの操縦体験や、AI視覚トラッキングアームによる似顔絵デモ、自律走行ローバー展示。',
    menuOrHighlights: ['ロボットアーム遠隔操作体験', 'AI似顔絵プロッター', '自作4足歩行ロボット展示']
  },
  {
    id: 's-04',
    category: 'activity',
    categoryLabel: '体験 & アトラクション',
    name: '廃墟研究室からの脱出: 封鎖病棟',
    organization: '演劇部 × 映像制作サークル',
    location: '1号館 3F 302教室',
    zone: 'bldg1',
    priceRange: '¥300 / 1回',
    congestion: 'crowded',
    congestionLabel: '大盛況 (整理券配布)',
    waitTimeMinutes: 30,
    description: '本格的な特殊メイクと暗視ゴーグル演出による極限の密室脱出ゲーム。制限時間15分、生還率18%。',
    menuOrHighlights: ['暗闇ミッション体験', '記念ポラロイド撮影', 'クリア特典ステッカー']
  },
  {
    id: 's-05',
    category: 'food',
    categoryLabel: 'フード & ドリンク',
    name: 'ミッドナイト 濃厚黒蜜抹茶ラテ & チュロス',
    organization: '茶道部 × カフェ同好会',
    location: '1号館 1F 学生ホール前テラス',
    zone: 'bldg1',
    priceRange: '¥400〜¥600',
    congestion: 'vacant',
    congestionLabel: '空きあり',
    waitTimeMinutes: 3,
    description: '京都産宇治抹茶を贅沢に点てた濃茶ラテと、ダークチョコレートディップつきの揚げたてロングチュロス。',
    menuOrHighlights: ['黒蜜濃抹茶ラテ (¥500)', 'ダークチョコチュロス (¥400)', 'ホットほうじ茶 (¥300)']
  },
  {
    id: 's-06',
    category: 'art',
    categoryLabel: 'アート & 展示',
    name: '暗室インスタレーション: 『残響と陰影』',
    organization: '美術学部 写真専攻 × 現代アートゼミ',
    location: '多目的棟 2F アートギャラリー',
    zone: 'arena',
    priceRange: '入場無料',
    congestion: 'vacant',
    congestionLabel: '空きあり',
    waitTimeMinutes: 0,
    description: 'モノクロ大判写真と環境音サンプリングが織りなす静謐な瞑想空間。限定ポストカードセットの販売あり。',
    menuOrHighlights: ['大型モノクロ銀塩プリント展示', '立体音響ヘッドホン体験', '限定アートブック (¥1,200)']
  }
];

export const MERCH_DATA: MerchItem[] = [
  {
    id: 'm-01',
    name: '『破却』ヘビーウェイト オーバーサイズ フーディ',
    englishName: 'HAKYAKU Heavyweight Oversized Hoodie [14.0oz]',
    price: 6800,
    status: 'low_stock',
    statusLabel: '残りわずか (各サイズ限定50着)',
    description: '漆黒の裏起毛ヘビーオンスコットン生地に、バックには大胆なクリムゾンタイポグラフィ、左袖にロゴ刺繍を配置。',
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 'm-02',
    name: '2026 OFFICIAL TOUR TEE [BLACK ACID WASH]',
    englishName: 'Official Lineup Tour Tee - Acid Wash Finish',
    price: 3800,
    status: 'available',
    statusLabel: '在庫あり',
    description: 'ヴィンテージライクなアシッドウォッシュ加工。バックプリントには全出演アーティストのタイムテーブルを刻印。',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'm-03',
    name: 'インタラクティブ LED リストバンド',
    englishName: 'Radio-Controlled RGB Festival Wristband',
    price: 1500,
    status: 'available',
    statusLabel: '在庫あり',
    description: 'アリーナライブの照明音響と無線連動して一斉に点滅・発色するオフィシャルリストバンド。記念品としても人気。'
  },
  {
    id: 'm-04',
    name: 'ホログラム アクリルVIPパス ＆ ネックストラップ',
    englishName: 'Holographic Acrylic Pass & Lanyard Set',
    price: 1800,
    status: 'low_stock',
    statusLabel: '残りわずか',
    description: '角度によって赤〜銀に反射する重厚感あるアクリルカード。金属カラビナとジャガード織りロゴストラップ付き。'
  }
];

export const GRAND_PRIX_CANDIDATES = [
  {
    id: 'gp-stage-1',
    category: 'stage',
    categoryLabel: 'ステージ部門',
    name: 'URAYAMA ALL STARS (公式テーマ『破却』)',
    type: 'バンド & ラップ',
    votes: 384,
    description: '圧倒的な熱量と重低音でアリーナを一体にした公式アンセムライブ。'
  },
  {
    id: 'gp-stage-2',
    category: 'stage',
    categoryLabel: 'ステージ部門',
    name: 'STREET CYPHER CREW (MC BATTLE)',
    type: 'ラップバトル',
    votes: 312,
    description: '即興の言葉とライミングで会場の空気を一変させたストリートサイファー。'
  },
  {
    id: 'gp-stage-3',
    category: 'stage',
    categoryLabel: 'ステージ部門',
    name: 'DANCE UNIT "KRONOS"',
    type: 'KRUMP & HIP-HOP',
    votes: 279,
    description: '超絶技巧と激しいシンクロ率で魅了した限界突破のダンスショウ。'
  },
  {
    id: 'gp-stall-1',
    category: 'stall',
    categoryLabel: '模擬店グルメ部門',
    name: '黒鉄スモーク プルコギタコス',
    type: '屋台グルメ',
    votes: 421,
    description: '竹炭ブラックトルティーヤと本格燻製肉の絶妙なハーモニー。行列必至。'
  },
  {
    id: 'gp-stall-2',
    category: 'stall',
    categoryLabel: '模擬店グルメ部門',
    name: '漆黒スパイス 鬼辛からあげ',
    type: '屋台グルメ',
    votes: 350,
    description: '黒七味のパンチとジューシー肉汁で中毒者続出の看板メニュー。'
  },
  {
    id: 'gp-stall-3',
    category: 'stall',
    categoryLabel: '模擬店グルメ部門',
    name: 'ミッドナイト 濃厚黒蜜抹茶ラテ',
    type: 'カフェ & スイーツ',
    votes: 298,
    description: '本格点て抹茶の苦味と黒蜜の甘さがフェスの疲れた体に沁みる一杯。'
  },
  {
    id: 'gp-exhibit-1',
    category: 'exhibit',
    categoryLabel: '展示・企画部門',
    name: '廃墟研究室からの脱出: 封鎖病棟',
    type: 'ホラーアトラクション',
    votes: 462,
    description: '教室とは思えない圧倒的な美術造形と緊迫の謎解きギミック。'
  },
  {
    id: 'gp-exhibit-2',
    category: 'exhibit',
    categoryLabel: '展示・企画部門',
    name: 'サイバーロボティクス LAB 2026',
    type: '先端技術展示',
    votes: 341,
    description: '触って動かせるAIプロッターとロボットアーム体験が大人気。'
  },
  {
    id: 'gp-exhibit-3',
    category: 'exhibit',
    categoryLabel: '展示・企画部門',
    name: '暗室インスタレーション: 『残響と陰影』',
    type: 'メディアアート',
    votes: 215,
    description: '静謐な暗闇と光の粒が日常を忘れさせる極上のアート空間。'
  }
];

export interface LotteryPrize {
  tier: string;
  tierName: string;
  name: string;
  quantity: string;
  description: string;
  highlight?: boolean;
}

export const SPECIAL_LIVE_EVENTS = [
  {
    id: 'live-headline-1',
    title: 'DAY 1 HEADLINER: 『破却 -HAKYAKU-』 SPECIAL LIVE',
    date: '2026.11.01 [SAT] 18:00 - 19:45',
    stage: 'メインアリーナ (Main Stage)',
    artist: 'URAYAMA ALL STARS ft. KANETO & GUEST CYPHER',
    genre: 'Dark Trap & Heavy Orchestra',
    description: '重低音808トラップと総勢40名ブラスセッションが融合する学園祭史上最大のステージ。楽曲『破却』の生演奏に加え、巨大LEDスモークとレーザーによる極限のライブパフォーマンス。',
    capacity: '定員 1,200名（当日整理券優先エリアあり）',
    status: '整理券配布中',
    image: '/src/assets/images/stage_live_performer_1792127062239.jpg'
  },
  {
    id: 'live-cypher-2',
    title: 'UNDERGROUND CYPHER TOURNAMENT 2026',
    date: '2026.11.01 [SAT] 12:00 - 13:00',
    stage: '中庭特設 (Underground Stage)',
    artist: 'STREET CYPHER CREW & 全国招待MC 16名',
    genre: 'Freestyle Rap Battle',
    description: '学内外から集いし16名のMCによるノールール・ガチンコ即興ラップバトル。勝敗を決めるのは会場を揺らすオーディエンスの歓声音量。',
    capacity: '屋外スタンディングフリー（入場自由）',
    status: '観覧無料',
    image: '/src/assets/images/hero_festival_stage_1792127062193.jpg'
  },
  {
    id: 'live-finale-3',
    title: 'GRAND FINALE LIVE: 『最後の1秒まで消えない』',
    date: '2026.11.02 [SUN] 18:00 - 19:30',
    stage: 'メインアリーナ ＆ キャンパス夜空',
    artist: 'ALL FESTIVAL PERFORMERS',
    genre: 'Festival Anthem & Laser Pyrotechnics',
    description: '2日間のフィナーレを飾る全員参加のアンセム演奏。アリーナから夜空へ放たれるレーザーマッピングと、閉幕を告げるクライマックス花火セッション。',
    capacity: '全エリア開放',
    status: 'クライマックス',
    image: '/src/assets/images/food_truck_night_stall_1792127063715.jpg'
  }
];

export const LOTTERY_DATA = {
  title: "漆黒の大抽選会 - SHADOW LOTTERY 2026 -",
  subtitle: "豪華賞品総額100万円超。来場者全員に当選のチャンス！",
  prizesImage: "/src/assets/images/lottery_prizes_showcase_1792127624991.jpg",
  schedules: [
    {
      round: "第1回 抽選会",
      time: "2026年11月1日(土) 17:00 〜",
      venue: "メインアリーナ特設ステージ",
      note: "1日目の当選番号を発表。ステージ前でリアルタイム抽選！"
    },
    {
      round: "第2回 グランドファイナル大抽選会",
      time: "2026年11月2日(日) 17:30 〜",
      venue: "メインアリーナ特設ステージ",
      note: "特賞・1等の最終当選者を会場生抽選にて決定！"
    }
  ],
  rules: [
    "当サイトで発行できる「デジタル整理券（QRパス）」記載の番号（例: URF-2026-8941）がそのまま抽選番号になります。",
    "模擬店や展示ブースでスタンプを集めると、追加の『ダブルチャンス抽選権』を獲得できます。",
    "当選番号はステージ上および当サイトの「当選番号速報ボード」にて即時掲載されます。",
    "賞品の引き換えは、総合案内本部（1号館エントランス）にて当日20:00まで受け付けます。"
  ],
  prizes: [
    {
      tier: "特賞",
      tierName: "GRAND PRIZE",
      name: "最新クリエイタータブレット ＆ プレミアムワイヤレスヘッドホンセット",
      quantity: "2名様",
      description: "ハイエンド創作環境を整えるマットブラックのフラッグシップタブレットと、最高峰ノイズキャンセリングヘッドホンをセットで進呈。",
      highlight: true
    },
    {
      tier: "1等",
      tierName: "1ST PRIZE",
      name: "カスタムメカニカルゲーミングキーボード [漆黒Red軸] ＆ ギフトカード ¥10,000",
      quantity: "5名様",
      description: "打鍵感とRGBライティングにこだわった高級メカニカルキーボードとAmazonギフト券。",
      highlight: true
    },
    {
      tier: "2等",
      tierName: "2ND PRIZE",
      name: "富山県名産 黒部和牛サーロインギフト or 全国有名テーマパーク ペアチケット",
      quantity: "10名様",
      description: "選べる豪華グルメまたはペアアトラクションチケット。"
    },
    {
      tier: "3等",
      tierName: "3RD PRIZE",
      name: "学園祭 模擬店＆公式グッズ共通利用券 ¥2,000分",
      quantity: "30名様",
      description: "会場内の全フードトラック・屋台・公式物販ブースで使えるフェスバウチャー。"
    },
    {
      tier: "破却賞",
      tierName: "SPECIAL PRIZE",
      name: "『破却』公式ホログラムカード ＆ 限定非売品ステッカーコンプリートBOX",
      quantity: "100名様",
      description: "ここでしか手に入らない公式アンセム記念プレミアムグッズ。"
    }
  ],
  winningNumbersSample: [
    { prize: "特賞", number: "URF-2026-1042", status: "引換待機中" },
    { prize: "1等", number: "URF-2026-3829", status: "当選発表済" },
    { prize: "1等", number: "URF-2026-7714", status: "当選発表済" },
    { prize: "2等", number: "URF-2026-5290", status: "引換済" },
    { prize: "2等", number: "URF-2026-6183", status: "当選発表済" },
    { prize: "3等", number: "下2桁 [48] [92]", status: "多数当選" }
  ]
};

export const FAQ_ITEMS = [
  {
    question: "入場料はかかりますか？ 事前登録は必要ですか？",
    answer: "入場は完全無料です。混雑緩和のため、当サイトで発行できる「デジタル入場整理券（QRパス）」をご提示いただくとスムーズにご入場いただけます（登録は30秒・即時発行）。"
  },
  {
    question: "大抽選会にはどうすれば参加できますか？",
    answer: "当サイトで発行した「デジタル入場整理券」の右上に記載されたシリアル番号（例: URF-2026-8941）があなたの抽選番号になります。整理券を発行するだけで誰でも自動エントリー完了です！さらに会場内の模擬店や展示を体験すると追加のダブルチャンス抽選券も獲得できます。"
  },
  {
    question: "模擬店やグッズの支払いにキャッシュレス決済は使えますか？",
    answer: "全店舗で各種クレジットカード、交通系IC（Suica/PASMO等）、PayPay、iD、QUICPay等のキャッシュレス決済に対応しています。一部現金対応レーンも設置しています。"
  },
  {
    question: "写真や動画の撮影、SNS投稿は可能ですか？",
    answer: "ステージ・模擬店エリアともに撮影およびSNS投稿を歓迎しています（ハッシュタグ #浦山学園祭2026 #破却）。ただし、他のお客様のプライバシーへの配慮をお願いいたします。なお、アリーナの一部招待ゲストライブのみ録音録画禁止エリアがございます。"
  },
  {
    question: "駐車場や駐輪場はありますか？",
    answer: "キャンパス北側駐車場（約200台）および臨時駐輪場をご利用いただけます。当日は周辺道路の混雑が予想されるため、公共交通機関（スクール直通無料シャトルバスが最寄り駅より10分間隔で運行）のご利用をお勧めいたします。"
  }
];

