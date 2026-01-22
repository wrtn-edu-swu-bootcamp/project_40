import type { KanjiInfo } from '@/types/kanji';

// JLPT N5-N1 한자 사전 데이터
// 출처: KanjiDic2 (CC BY-SA 4.0)
// 부수 정보, 구성요소, 음독/훈독 포함

export const KANJI_DICTIONARY: KanjiInfo[] = [
  // ===== JLPT N5 (약 100자) =====
  // 숫자
  { id: '一', character: '一', radical: '一', radicalName: '한 일', strokeCount: 1, readings: { on: ['イチ', 'イツ'], kun: ['ひと.つ'] }, meanings: ['one'], components: ['一'], jlptLevel: 'N5', frequency: 2 },
  { id: '二', character: '二', radical: '二', radicalName: '두 이', strokeCount: 2, readings: { on: ['ニ'], kun: ['ふた.つ'] }, meanings: ['two'], components: ['二'], jlptLevel: 'N5', frequency: 9 },
  { id: '三', character: '三', radical: '一', radicalName: '한 일', strokeCount: 3, readings: { on: ['サン'], kun: ['み.つ'] }, meanings: ['three'], components: ['一'], jlptLevel: 'N5', frequency: 14 },
  { id: '四', character: '四', radical: '囗', radicalName: '에워쌀 위', strokeCount: 5, readings: { on: ['シ'], kun: ['よ.つ', 'よん'] }, meanings: ['four'], components: ['囗', '儿'], jlptLevel: 'N5', frequency: 47 },
  { id: '五', character: '五', radical: '二', radicalName: '두 이', strokeCount: 4, readings: { on: ['ゴ'], kun: ['いつ.つ'] }, meanings: ['five'], components: ['二'], jlptLevel: 'N5', frequency: 31 },
  { id: '六', character: '六', radical: '八', radicalName: '여덟 팔', strokeCount: 4, readings: { on: ['ロク'], kun: ['む.つ'] }, meanings: ['six'], components: ['八'], jlptLevel: 'N5', frequency: 93 },
  { id: '七', character: '七', radical: '一', radicalName: '한 일', strokeCount: 2, readings: { on: ['シチ'], kun: ['なな.つ'] }, meanings: ['seven'], components: ['一'], jlptLevel: 'N5', frequency: 115 },
  { id: '八', character: '八', radical: '八', radicalName: '여덟 팔', strokeCount: 2, readings: { on: ['ハチ'], kun: ['や.つ'] }, meanings: ['eight'], components: ['八'], jlptLevel: 'N5', frequency: 92 },
  { id: '九', character: '九', radical: '乙', radicalName: '새 을', strokeCount: 2, readings: { on: ['キュウ', 'ク'], kun: ['ここの.つ'] }, meanings: ['nine'], components: ['乙'], jlptLevel: 'N5', frequency: 55 },
  { id: '十', character: '十', radical: '十', radicalName: '열 십', strokeCount: 2, readings: { on: ['ジュウ'], kun: ['とお'] }, meanings: ['ten'], components: ['十'], jlptLevel: 'N5', frequency: 8 },
  { id: '百', character: '百', radical: '白', radicalName: '흰 백', strokeCount: 6, readings: { on: ['ヒャク'], kun: [] }, meanings: ['hundred'], components: ['一', '白'], jlptLevel: 'N5', frequency: 163 },
  { id: '千', character: '千', radical: '十', radicalName: '열 십', strokeCount: 3, readings: { on: ['セン'], kun: ['ち'] }, meanings: ['thousand'], components: ['千'], jlptLevel: 'N5', frequency: 195 },
  { id: '万', character: '万', radical: '一', radicalName: '한 일', strokeCount: 3, readings: { on: ['マン', 'バン'], kun: [] }, meanings: ['ten thousand'], components: ['万'], jlptLevel: 'N5', frequency: 375 },
  
  // 시간/날짜
  { id: '日', character: '日', radical: '日', radicalName: '날 일', strokeCount: 4, readings: { on: ['ニチ', 'ジツ'], kun: ['ひ', 'か'] }, meanings: ['day', 'sun'], components: ['日'], jlptLevel: 'N5', frequency: 1 },
  { id: '月', character: '月', radical: '月', radicalName: '달 월', strokeCount: 4, readings: { on: ['ゲツ', 'ガツ'], kun: ['つき'] }, meanings: ['month', 'moon'], components: ['月'], jlptLevel: 'N5', frequency: 23 },
  { id: '火', character: '火', radical: '火', radicalName: '불 화', strokeCount: 4, readings: { on: ['カ'], kun: ['ひ'] }, meanings: ['fire'], components: ['火'], jlptLevel: 'N5', frequency: 574 },
  { id: '水', character: '水', radical: '水', radicalName: '물 수', strokeCount: 4, readings: { on: ['スイ'], kun: ['みず'] }, meanings: ['water'], components: ['水'], jlptLevel: 'N5', frequency: 223 },
  { id: '木', character: '木', radical: '木', radicalName: '나무 목', strokeCount: 4, readings: { on: ['モク', 'ボク'], kun: ['き'] }, meanings: ['tree', 'wood'], components: ['木'], jlptLevel: 'N5', frequency: 317 },
  { id: '金', character: '金', radical: '金', radicalName: '쇠 금', strokeCount: 8, readings: { on: ['キン', 'コン'], kun: ['かね'] }, meanings: ['gold', 'money'], components: ['金'], jlptLevel: 'N5', frequency: 53 },
  { id: '土', character: '土', radical: '土', radicalName: '흙 토', strokeCount: 3, readings: { on: ['ド', 'ト'], kun: ['つち'] }, meanings: ['earth', 'soil'], components: ['土'], jlptLevel: 'N5', frequency: 307 },
  { id: '年', character: '年', radical: '干', radicalName: '방패 간', strokeCount: 6, readings: { on: ['ネン'], kun: ['とし'] }, meanings: ['year'], components: ['年'], jlptLevel: 'N5', frequency: 6 },
  { id: '時', character: '時', radical: '日', radicalName: '날 일', strokeCount: 10, readings: { on: ['ジ'], kun: ['とき'] }, meanings: ['time', 'hour'], components: ['日', '寺'], jlptLevel: 'N5', frequency: 16 },
  { id: '分', character: '分', radical: '刀', radicalName: '칼 도', strokeCount: 4, readings: { on: ['ブン', 'フン'], kun: ['わ.ける'] }, meanings: ['minute', 'part'], components: ['八', '刀'], jlptLevel: 'N5', frequency: 24 },
  { id: '半', character: '半', radical: '十', radicalName: '열 십', strokeCount: 5, readings: { on: ['ハン'], kun: ['なか.ば'] }, meanings: ['half'], components: ['半'], jlptLevel: 'N5', frequency: 224 },
  { id: '今', character: '今', radical: '人', radicalName: '사람 인', strokeCount: 4, readings: { on: ['コン', 'キン'], kun: ['いま'] }, meanings: ['now'], components: ['今'], jlptLevel: 'N5', frequency: 49 },
  { id: '週', character: '週', radical: '辶', radicalName: '쉬엄쉬엄 갈 착', strokeCount: 11, readings: { on: ['シュウ'], kun: [] }, meanings: ['week'], components: ['辶', '周'], jlptLevel: 'N5', frequency: 580 },
  
  // 사람/가족
  { id: '人', character: '人', radical: '人', radicalName: '사람 인', strokeCount: 2, readings: { on: ['ジン', 'ニン'], kun: ['ひと'] }, meanings: ['person'], components: ['人'], jlptLevel: 'N5', frequency: 5 },
  { id: '子', character: '子', radical: '子', radicalName: '아들 자', strokeCount: 3, readings: { on: ['シ', 'ス'], kun: ['こ'] }, meanings: ['child'], components: ['子'], jlptLevel: 'N5', frequency: 72 },
  { id: '女', character: '女', radical: '女', radicalName: '계집 녀', strokeCount: 3, readings: { on: ['ジョ', 'ニョ'], kun: ['おんな'] }, meanings: ['woman'], components: ['女'], jlptLevel: 'N5', frequency: 151 },
  { id: '男', character: '男', radical: '田', radicalName: '밭 전', strokeCount: 7, readings: { on: ['ダン', 'ナン'], kun: ['おとこ'] }, meanings: ['man'], components: ['田', '力'], jlptLevel: 'N5', frequency: 240 },
  { id: '父', character: '父', radical: '父', radicalName: '아비 부', strokeCount: 4, readings: { on: ['フ'], kun: ['ちち'] }, meanings: ['father'], components: ['父'], jlptLevel: 'N5', frequency: 649 },
  { id: '母', character: '母', radical: '母', radicalName: '어미 모', strokeCount: 5, readings: { on: ['ボ'], kun: ['はは'] }, meanings: ['mother'], components: ['母'], jlptLevel: 'N5', frequency: 570 },
  { id: '友', character: '友', radical: '又', radicalName: '또 우', strokeCount: 4, readings: { on: ['ユウ'], kun: ['とも'] }, meanings: ['friend'], components: ['友'], jlptLevel: 'N5', frequency: 622 },
  
  // 위치/방향
  { id: '上', character: '上', radical: '一', radicalName: '한 일', strokeCount: 3, readings: { on: ['ジョウ', 'ショウ'], kun: ['うえ', 'あ.げる'] }, meanings: ['up', 'above'], components: ['上'], jlptLevel: 'N5', frequency: 35 },
  { id: '下', character: '下', radical: '一', radicalName: '한 일', strokeCount: 3, readings: { on: ['カ', 'ゲ'], kun: ['した', 'さ.げる'] }, meanings: ['down', 'below'], components: ['下'], jlptLevel: 'N5', frequency: 97 },
  { id: '中', character: '中', radical: '丨', radicalName: '뚫을 곤', strokeCount: 4, readings: { on: ['チュウ'], kun: ['なか'] }, meanings: ['middle', 'inside'], components: ['中'], jlptLevel: 'N5', frequency: 11 },
  { id: '外', character: '外', radical: '夕', radicalName: '저녁 석', strokeCount: 5, readings: { on: ['ガイ', 'ゲ'], kun: ['そと', 'ほか'] }, meanings: ['outside'], components: ['夕', '卜'], jlptLevel: 'N5', frequency: 81 },
  { id: '左', character: '左', radical: '工', radicalName: '장인 공', strokeCount: 5, readings: { on: ['サ'], kun: ['ひだり'] }, meanings: ['left'], components: ['左'], jlptLevel: 'N5', frequency: 630 },
  { id: '右', character: '右', radical: '口', radicalName: '입 구', strokeCount: 5, readings: { on: ['ウ', 'ユウ'], kun: ['みぎ'] }, meanings: ['right'], components: ['右'], jlptLevel: 'N5', frequency: 602 },
  { id: '前', character: '前', radical: '刀', radicalName: '칼 도', strokeCount: 9, readings: { on: ['ゼン'], kun: ['まえ'] }, meanings: ['before', 'front'], components: ['前'], jlptLevel: 'N5', frequency: 27 },
  { id: '後', character: '後', radical: '彳', radicalName: '조금 걸을 척', strokeCount: 9, readings: { on: ['ゴ', 'コウ'], kun: ['のち', 'うし.ろ'] }, meanings: ['after', 'behind'], components: ['彳', '後'], jlptLevel: 'N5', frequency: 26 },
  { id: '北', character: '北', radical: '匕', radicalName: '비수 비', strokeCount: 5, readings: { on: ['ホク'], kun: ['きた'] }, meanings: ['north'], components: ['北'], jlptLevel: 'N5', frequency: 153 },
  { id: '南', character: '南', radical: '十', radicalName: '열 십', strokeCount: 9, readings: { on: ['ナン', 'ナ'], kun: ['みなみ'] }, meanings: ['south'], components: ['南'], jlptLevel: 'N5', frequency: 341 },
  { id: '東', character: '東', radical: '木', radicalName: '나무 목', strokeCount: 8, readings: { on: ['トウ'], kun: ['ひがし'] }, meanings: ['east'], components: ['東'], jlptLevel: 'N5', frequency: 37 },
  { id: '西', character: '西', radical: '西', radicalName: '서녘 서', strokeCount: 6, readings: { on: ['セイ', 'サイ'], kun: ['にし'] }, meanings: ['west'], components: ['西'], jlptLevel: 'N5', frequency: 259 },
  
  // 자연/장소
  { id: '山', character: '山', radical: '山', radicalName: '뫼 산', strokeCount: 3, readings: { on: ['サン'], kun: ['やま'] }, meanings: ['mountain'], components: ['山'], jlptLevel: 'N5', frequency: 131 },
  { id: '川', character: '川', radical: '川', radicalName: '내 천', strokeCount: 3, readings: { on: ['セン'], kun: ['かわ'] }, meanings: ['river'], components: ['川'], jlptLevel: 'N5', frequency: 181 },
  { id: '田', character: '田', radical: '田', radicalName: '밭 전', strokeCount: 5, readings: { on: ['デン'], kun: ['た'] }, meanings: ['rice field'], components: ['田'], jlptLevel: 'N5', frequency: 90 },
  { id: '天', character: '天', radical: '大', radicalName: '큰 대', strokeCount: 4, readings: { on: ['テン'], kun: ['あめ', 'あま'] }, meanings: ['heaven', 'sky'], components: ['天'], jlptLevel: 'N5', frequency: 512 },
  { id: '空', character: '空', radical: '穴', radicalName: '구멍 혈', strokeCount: 8, readings: { on: ['クウ'], kun: ['そら', 'あ.く'] }, meanings: ['sky', 'empty'], components: ['穴', '工'], jlptLevel: 'N5', frequency: 304 },
  { id: '雨', character: '雨', radical: '雨', radicalName: '비 우', strokeCount: 8, readings: { on: ['ウ'], kun: ['あめ'] }, meanings: ['rain'], components: ['雨'], jlptLevel: 'N5', frequency: 950 },
  { id: '花', character: '花', radical: '艹', radicalName: '풀 초', strokeCount: 7, readings: { on: ['カ'], kun: ['はな'] }, meanings: ['flower'], components: ['艹', '化'], jlptLevel: 'N5', frequency: 578 },
  
  // 학교/공부
  { id: '学', character: '学', radical: '子', radicalName: '아들 자', strokeCount: 8, readings: { on: ['ガク'], kun: ['まな.ぶ'] }, meanings: ['study', 'learn'], components: ['学'], jlptLevel: 'N5', frequency: 63 },
  { id: '校', character: '校', radical: '木', radicalName: '나무 목', strokeCount: 10, readings: { on: ['コウ'], kun: [] }, meanings: ['school'], components: ['木', '交'], jlptLevel: 'N5', frequency: 294 },
  { id: '先', character: '先', radical: '儿', radicalName: '어진사람 인', strokeCount: 6, readings: { on: ['セン'], kun: ['さき'] }, meanings: ['ahead', 'previous'], components: ['先'], jlptLevel: 'N5', frequency: 173 },
  { id: '生', character: '生', radical: '生', radicalName: '날 생', strokeCount: 5, readings: { on: ['セイ', 'ショウ'], kun: ['い.きる', 'う.まれる'] }, meanings: ['life', 'birth'], components: ['生'], jlptLevel: 'N5', frequency: 29 },
  { id: '本', character: '本', radical: '木', radicalName: '나무 목', strokeCount: 5, readings: { on: ['ホン'], kun: ['もと'] }, meanings: ['book', 'origin'], components: ['本'], jlptLevel: 'N5', frequency: 10 },
  { id: '文', character: '文', radical: '文', radicalName: '글월 문', strokeCount: 4, readings: { on: ['ブン', 'モン'], kun: ['ふみ'] }, meanings: ['writing', 'sentence'], components: ['文'], jlptLevel: 'N5', frequency: 190 },
  { id: '字', character: '字', radical: '子', radicalName: '아들 자', strokeCount: 6, readings: { on: ['ジ'], kun: ['あざ'] }, meanings: ['character', 'letter'], components: ['宀', '子'], jlptLevel: 'N5', frequency: 489 },
  
  // 동작
  { id: '行', character: '行', radical: '行', radicalName: '다닐 행', strokeCount: 6, readings: { on: ['コウ', 'ギョウ'], kun: ['い.く', 'おこな.う'] }, meanings: ['go', 'conduct'], components: ['行'], jlptLevel: 'N5', frequency: 20 },
  { id: '来', character: '来', radical: '木', radicalName: '나무 목', strokeCount: 7, readings: { on: ['ライ'], kun: ['く.る'] }, meanings: ['come'], components: ['来'], jlptLevel: 'N5', frequency: 102 },
  { id: '出', character: '出', radical: '凵', radicalName: '위 튼 입 구멍 감', strokeCount: 5, readings: { on: ['シュツ', 'スイ'], kun: ['で.る', 'だ.す'] }, meanings: ['exit', 'leave'], components: ['出'], jlptLevel: 'N5', frequency: 13 },
  { id: '入', character: '入', radical: '入', radicalName: '들 입', strokeCount: 2, readings: { on: ['ニュウ'], kun: ['い.る', 'はい.る'] }, meanings: ['enter'], components: ['入'], jlptLevel: 'N5', frequency: 56 },
  { id: '見', character: '見', radical: '見', radicalName: '볼 견', strokeCount: 7, readings: { on: ['ケン'], kun: ['み.る'] }, meanings: ['see', 'look'], components: ['見'], jlptLevel: 'N5', frequency: 22 },
  { id: '聞', character: '聞', radical: '耳', radicalName: '귀 이', strokeCount: 14, readings: { on: ['ブン', 'モン'], kun: ['き.く'] }, meanings: ['hear', 'ask'], components: ['門', '耳'], jlptLevel: 'N5', frequency: 319 },
  { id: '読', character: '読', radical: '言', radicalName: '말씀 언', strokeCount: 14, readings: { on: ['ドク', 'トク'], kun: ['よ.む'] }, meanings: ['read'], components: ['言', '売'], jlptLevel: 'N5', frequency: 618 },
  { id: '書', character: '書', radical: '曰', radicalName: '가로 왈', strokeCount: 10, readings: { on: ['ショ'], kun: ['か.く'] }, meanings: ['write'], components: ['書'], jlptLevel: 'N5', frequency: 169 },
  { id: '話', character: '話', radical: '言', radicalName: '말씀 언', strokeCount: 13, readings: { on: ['ワ'], kun: ['はな.す', 'はなし'] }, meanings: ['speak', 'talk'], components: ['言', '舌'], jlptLevel: 'N5', frequency: 134 },
  { id: '買', character: '買', radical: '貝', radicalName: '조개 패', strokeCount: 12, readings: { on: ['バイ'], kun: ['か.う'] }, meanings: ['buy'], components: ['罒', '貝'], jlptLevel: 'N5', frequency: 520 },
  { id: '食', character: '食', radical: '食', radicalName: '먹을 식', strokeCount: 9, readings: { on: ['ショク', 'ジキ'], kun: ['た.べる', 'く.う'] }, meanings: ['eat', 'food'], components: ['食'], jlptLevel: 'N5', frequency: 328 },
  { id: '飲', character: '飲', radical: '食', radicalName: '먹을 식', strokeCount: 12, readings: { on: ['イン'], kun: ['の.む'] }, meanings: ['drink'], components: ['食', '欠'], jlptLevel: 'N5', frequency: 969 },
  { id: '休', character: '休', radical: '人', radicalName: '사람 인', strokeCount: 6, readings: { on: ['キュウ'], kun: ['やす.む'] }, meanings: ['rest'], components: ['亻', '木'], jlptLevel: 'N5', frequency: 642 },
  { id: '立', character: '立', radical: '立', radicalName: '설 립', strokeCount: 5, readings: { on: ['リツ', 'リュウ'], kun: ['た.つ'] }, meanings: ['stand'], components: ['立'], jlptLevel: 'N5', frequency: 58 },
  
  // 형용사/기타
  { id: '大', character: '大', radical: '大', radicalName: '큰 대', strokeCount: 3, readings: { on: ['ダイ', 'タイ'], kun: ['おお.きい'] }, meanings: ['big', 'large'], components: ['大'], jlptLevel: 'N5', frequency: 7 },
  { id: '小', character: '小', radical: '小', radicalName: '작을 소', strokeCount: 3, readings: { on: ['ショウ'], kun: ['ちい.さい', 'こ'] }, meanings: ['small', 'little'], components: ['小'], jlptLevel: 'N5', frequency: 114 },
  { id: '高', character: '高', radical: '高', radicalName: '높을 고', strokeCount: 10, readings: { on: ['コウ'], kun: ['たか.い'] }, meanings: ['high', 'tall'], components: ['高'], jlptLevel: 'N5', frequency: 65 },
  { id: '安', character: '安', radical: '宀', radicalName: '집 면', strokeCount: 6, readings: { on: ['アン'], kun: ['やす.い'] }, meanings: ['cheap', 'peaceful'], components: ['宀', '女'], jlptLevel: 'N5', frequency: 144 },
  { id: '新', character: '新', radical: '斤', radicalName: '도끼 근', strokeCount: 13, readings: { on: ['シン'], kun: ['あたら.しい'] }, meanings: ['new'], components: ['立', '木', '斤'], jlptLevel: 'N5', frequency: 51 },
  { id: '古', character: '古', radical: '口', radicalName: '입 구', strokeCount: 5, readings: { on: ['コ'], kun: ['ふる.い'] }, meanings: ['old'], components: ['古'], jlptLevel: 'N5', frequency: 509 },
  { id: '長', character: '長', radical: '長', radicalName: '길 장', strokeCount: 8, readings: { on: ['チョウ'], kun: ['なが.い'] }, meanings: ['long', 'chief'], components: ['長'], jlptLevel: 'N5', frequency: 12 },
  { id: '白', character: '白', radical: '白', radicalName: '흰 백', strokeCount: 5, readings: { on: ['ハク', 'ビャク'], kun: ['しろ.い'] }, meanings: ['white'], components: ['白'], jlptLevel: 'N5', frequency: 483 },
  { id: '多', character: '多', radical: '夕', radicalName: '저녁 석', strokeCount: 6, readings: { on: ['タ'], kun: ['おお.い'] }, meanings: ['many', 'much'], components: ['夕', '夕'], jlptLevel: 'N5', frequency: 139 },
  { id: '少', character: '少', radical: '小', radicalName: '작을 소', strokeCount: 4, readings: { on: ['ショウ'], kun: ['すく.ない', 'すこ.し'] }, meanings: ['few', 'little'], components: ['小'], jlptLevel: 'N5', frequency: 287 },
  { id: '何', character: '何', radical: '人', radicalName: '사람 인', strokeCount: 7, readings: { on: ['カ'], kun: ['なに', 'なん'] }, meanings: ['what'], components: ['亻', '可'], jlptLevel: 'N5', frequency: 340 },
  
  // 장소/건물
  { id: '国', character: '国', radical: '囗', radicalName: '에워쌀 위', strokeCount: 8, readings: { on: ['コク'], kun: ['くに'] }, meanings: ['country'], components: ['囗', '玉'], jlptLevel: 'N5', frequency: 3 },
  { id: '店', character: '店', radical: '广', radicalName: '집 엄', strokeCount: 8, readings: { on: ['テン'], kun: ['みせ'] }, meanings: ['shop', 'store'], components: ['广', '占'], jlptLevel: 'N5', frequency: 378 },
  { id: '駅', character: '駅', radical: '馬', radicalName: '말 마', strokeCount: 14, readings: { on: ['エキ'], kun: [] }, meanings: ['station'], components: ['馬', '尺'], jlptLevel: 'N5', frequency: 724 },
  { id: '道', character: '道', radical: '辶', radicalName: '쉬엄쉬엄 갈 착', strokeCount: 12, readings: { on: ['ドウ', 'トウ'], kun: ['みち'] }, meanings: ['road', 'way'], components: ['辶', '首'], jlptLevel: 'N5', frequency: 207 },
  { id: '会', character: '会', radical: '人', radicalName: '사람 인', strokeCount: 6, readings: { on: ['カイ', 'エ'], kun: ['あ.う'] }, meanings: ['meet', 'society'], components: ['会'], jlptLevel: 'N5', frequency: 4 },
  { id: '社', character: '社', radical: '示', radicalName: '보일 시', strokeCount: 7, readings: { on: ['シャ'], kun: ['やしろ'] }, meanings: ['company', 'shrine'], components: ['礻', '土'], jlptLevel: 'N5', frequency: 21 },
  { id: '車', character: '車', radical: '車', radicalName: '수레 거', strokeCount: 7, readings: { on: ['シャ'], kun: ['くるま'] }, meanings: ['car', 'vehicle'], components: ['車'], jlptLevel: 'N5', frequency: 333 },
  { id: '電', character: '電', radical: '雨', radicalName: '비 우', strokeCount: 13, readings: { on: ['デン'], kun: [] }, meanings: ['electricity'], components: ['雨', '電'], jlptLevel: 'N5', frequency: 268 },
  { id: '気', character: '気', radical: '气', radicalName: '기운 기', strokeCount: 6, readings: { on: ['キ', 'ケ'], kun: [] }, meanings: ['spirit', 'mind'], components: ['気'], jlptLevel: 'N5', frequency: 113 },
  { id: '手', character: '手', radical: '手', radicalName: '손 수', strokeCount: 4, readings: { on: ['シュ'], kun: ['て'] }, meanings: ['hand'], components: ['手'], jlptLevel: 'N5', frequency: 60 },
  { id: '足', character: '足', radical: '足', radicalName: '발 족', strokeCount: 7, readings: { on: ['ソク'], kun: ['あし', 'た.りる'] }, meanings: ['foot', 'leg'], components: ['足'], jlptLevel: 'N5', frequency: 343 },
  { id: '目', character: '目', radical: '目', radicalName: '눈 목', strokeCount: 5, readings: { on: ['モク', 'ボク'], kun: ['め'] }, meanings: ['eye'], components: ['目'], jlptLevel: 'N5', frequency: 76 },
  { id: '耳', character: '耳', radical: '耳', radicalName: '귀 이', strokeCount: 6, readings: { on: ['ジ'], kun: ['みみ'] }, meanings: ['ear'], components: ['耳'], jlptLevel: 'N5', frequency: 1328 },
  { id: '口', character: '口', radical: '口', radicalName: '입 구', strokeCount: 3, readings: { on: ['コウ', 'ク'], kun: ['くち'] }, meanings: ['mouth'], components: ['口'], jlptLevel: 'N5', frequency: 284 },
  { id: '名', character: '名', radical: '口', radicalName: '입 구', strokeCount: 6, readings: { on: ['メイ', 'ミョウ'], kun: ['な'] }, meanings: ['name'], components: ['夕', '口'], jlptLevel: 'N5', frequency: 177 },
  { id: '言', character: '言', radical: '言', radicalName: '말씀 언', strokeCount: 7, readings: { on: ['ゲン', 'ゴン'], kun: ['い.う', 'こと'] }, meanings: ['say', 'word'], components: ['言'], jlptLevel: 'N5', frequency: 83 },
  { id: '語', character: '語', radical: '言', radicalName: '말씀 언', strokeCount: 14, readings: { on: ['ゴ'], kun: ['かた.る'] }, meanings: ['language', 'word'], components: ['言', '吾'], jlptLevel: 'N5', frequency: 301 },
  { id: '円', character: '円', radical: '冂', radicalName: '멀 경', strokeCount: 4, readings: { on: ['エン'], kun: ['まる.い'] }, meanings: ['yen', 'circle'], components: ['円'], jlptLevel: 'N5', frequency: 69 },
  { id: '毎', character: '毎', radical: '母', radicalName: '어미 모', strokeCount: 6, readings: { on: ['マイ'], kun: ['ごと'] }, meanings: ['every'], components: ['毎'], jlptLevel: 'N5', frequency: 436 },

  // ===== JLPT N4 =====
  // 물 관련 (氵 부수)
  { id: '海', character: '海', radical: '氵', radicalName: '물 수변', strokeCount: 9, readings: { on: ['カイ'], kun: ['うみ'] }, meanings: ['sea', 'ocean'], components: ['氵', '毎'], jlptLevel: 'N4', frequency: 200 },
  { id: '池', character: '池', radical: '氵', radicalName: '물 수변', strokeCount: 6, readings: { on: ['チ'], kun: ['いけ'] }, meanings: ['pond', 'pool'], components: ['氵', '也'], jlptLevel: 'N4', frequency: 700 },
  { id: '洗', character: '洗', radical: '氵', radicalName: '물 수변', strokeCount: 9, readings: { on: ['セン'], kun: ['あら.う'] }, meanings: ['wash'], components: ['氵', '先'], jlptLevel: 'N4', frequency: 900 },
  { id: '泳', character: '泳', radical: '氵', radicalName: '물 수변', strokeCount: 8, readings: { on: ['エイ'], kun: ['およ.ぐ'] }, meanings: ['swim'], components: ['氵', '永'], jlptLevel: 'N4', frequency: 1000 },
  { id: '注', character: '注', radical: '氵', radicalName: '물 수변', strokeCount: 8, readings: { on: ['チュウ'], kun: ['そそ.ぐ'] }, meanings: ['pour', 'note'], components: ['氵', '主'], jlptLevel: 'N4', frequency: 400 },
  { id: '流', character: '流', radical: '氵', radicalName: '물 수변', strokeCount: 10, readings: { on: ['リュウ'], kun: ['なが.れる'] }, meanings: ['flow', 'stream'], components: ['氵', '㐬'], jlptLevel: 'N4', frequency: 300 },
  { id: '決', character: '決', radical: '氵', radicalName: '물 수변', strokeCount: 7, readings: { on: ['ケツ'], kun: ['き.める'] }, meanings: ['decide'], components: ['氵', '夬'], jlptLevel: 'N4', frequency: 71 },
  { id: '活', character: '活', radical: '氵', radicalName: '물 수변', strokeCount: 9, readings: { on: ['カツ'], kun: ['い.きる'] }, meanings: ['active', 'life'], components: ['氵', '舌'], jlptLevel: 'N4', frequency: 300 },
  { id: '消', character: '消', radical: '氵', radicalName: '물 수변', strokeCount: 10, readings: { on: ['ショウ'], kun: ['き.える', 'け.す'] }, meanings: ['extinguish', 'disappear'], components: ['氵', '肖'], jlptLevel: 'N4', frequency: 345 },
  { id: '深', character: '深', radical: '氵', radicalName: '물 수변', strokeCount: 11, readings: { on: ['シン'], kun: ['ふか.い'] }, meanings: ['deep'], components: ['氵', '罙'], jlptLevel: 'N4', frequency: 484 },
  { id: '港', character: '港', radical: '氵', radicalName: '물 수변', strokeCount: 12, readings: { on: ['コウ'], kun: ['みなと'] }, meanings: ['harbor', 'port'], components: ['氵', '巷'], jlptLevel: 'N4', frequency: 495 },
  { id: '湯', character: '湯', radical: '氵', radicalName: '물 수변', strokeCount: 12, readings: { on: ['トウ'], kun: ['ゆ'] }, meanings: ['hot water'], components: ['氵', '昜'], jlptLevel: 'N4', frequency: 1132 },
  { id: '漢', character: '漢', radical: '氵', radicalName: '물 수변', strokeCount: 13, readings: { on: ['カン'], kun: [] }, meanings: ['China', 'Han'], components: ['氵', '廿', '口', '夫'], jlptLevel: 'N4', frequency: 1487 },
  
  // 言 관련
  { id: '計', character: '計', radical: '言', radicalName: '말씀 언', strokeCount: 9, readings: { on: ['ケイ'], kun: ['はか.る'] }, meanings: ['measure', 'plan'], components: ['言', '十'], jlptLevel: 'N4', frequency: 228 },
  { id: '説', character: '説', radical: '言', radicalName: '말씀 언', strokeCount: 14, readings: { on: ['セツ'], kun: ['と.く'] }, meanings: ['explain', 'theory'], components: ['言', '兌'], jlptLevel: 'N4', frequency: 326 },
  { id: '試', character: '試', radical: '言', radicalName: '말씀 언', strokeCount: 13, readings: { on: ['シ'], kun: ['こころ.みる', 'ため.す'] }, meanings: ['test', 'try'], components: ['言', '式'], jlptLevel: 'N4', frequency: 392 },
  { id: '調', character: '調', radical: '言', radicalName: '말씀 언', strokeCount: 15, readings: { on: ['チョウ'], kun: ['しら.べる', 'ととの.える'] }, meanings: ['investigate', 'tune'], components: ['言', '周'], jlptLevel: 'N4', frequency: 87 },
  { id: '談', character: '談', radical: '言', radicalName: '말씀 언', strokeCount: 15, readings: { on: ['ダン'], kun: [] }, meanings: ['discuss', 'talk'], components: ['言', '炎'], jlptLevel: 'N4', frequency: 286 },
  { id: '記', character: '記', radical: '言', radicalName: '말씀 언', strokeCount: 10, readings: { on: ['キ'], kun: ['しる.す'] }, meanings: ['record', 'write'], components: ['言', '己'], jlptLevel: 'N4', frequency: 149 },
  
  // 青 관련
  { id: '青', character: '青', radical: '青', radicalName: '푸를 청', strokeCount: 8, readings: { on: ['セイ', 'ショウ'], kun: ['あお', 'あお.い'] }, meanings: ['blue', 'green'], components: ['青'], jlptLevel: 'N4', frequency: 400 },
  { id: '清', character: '清', radical: '氵', radicalName: '물 수변', strokeCount: 11, readings: { on: ['セイ', 'ショウ'], kun: ['きよ.い', 'きよ.める'] }, meanings: ['pure', 'clean'], components: ['氵', '青'], jlptLevel: 'N4', frequency: 500 },
  { id: '晴', character: '晴', radical: '日', radicalName: '날 일', strokeCount: 12, readings: { on: ['セイ'], kun: ['は.れる', 'は.らす'] }, meanings: ['clear', 'sunny'], components: ['日', '青'], jlptLevel: 'N4', frequency: 600 },
  { id: '静', character: '静', radical: '青', radicalName: '푸를 청', strokeCount: 14, readings: { on: ['セイ', 'ジョウ'], kun: ['しず.か', 'しず.める'] }, meanings: ['quiet', 'calm'], components: ['青', '争'], jlptLevel: 'N4', frequency: 500 },
  { id: '情', character: '情', radical: '心', radicalName: '마음 심', strokeCount: 11, readings: { on: ['ジョウ', 'セイ'], kun: ['なさ.け'] }, meanings: ['emotion', 'feeling'], components: ['忄', '青'], jlptLevel: 'N4', frequency: 300 },
  { id: '精', character: '精', radical: '米', radicalName: '쌀 미', strokeCount: 14, readings: { on: ['セイ', 'ショウ'], kun: [] }, meanings: ['refined', 'spirit'], components: ['米', '青'], jlptLevel: 'N4', frequency: 455 },
  
  // セイ 음독 관련
  { id: '正', character: '正', radical: '止', radicalName: '그칠 지', strokeCount: 5, readings: { on: ['セイ', 'ショウ'], kun: ['ただ.しい', 'まさ'] }, meanings: ['correct', 'right'], components: ['正'], jlptLevel: 'N4', frequency: 200 },
  { id: '成', character: '成', radical: '戈', radicalName: '창 과', strokeCount: 6, readings: { on: ['セイ', 'ジョウ'], kun: ['な.る', 'な.す'] }, meanings: ['become', 'accomplish'], components: ['成'], jlptLevel: 'N4', frequency: 300 },
  { id: '政', character: '政', radical: '攴', radicalName: '칠 복', strokeCount: 9, readings: { on: ['セイ', 'ショウ'], kun: ['まつりごと'] }, meanings: ['politics', 'government'], components: ['正', '攵'], jlptLevel: 'N4', frequency: 250 },
  { id: '性', character: '性', radical: '心', radicalName: '마음 심', strokeCount: 8, readings: { on: ['セイ', 'ショウ'], kun: ['さが'] }, meanings: ['nature', 'gender'], components: ['忄', '生'], jlptLevel: 'N4', frequency: 400 },
  { id: '制', character: '制', radical: '刀', radicalName: '칼 도', strokeCount: 8, readings: { on: ['セイ'], kun: [] }, meanings: ['system', 'control'], components: ['制'], jlptLevel: 'N4', frequency: 217 },
  { id: '声', character: '声', radical: '士', radicalName: '선비 사', strokeCount: 7, readings: { on: ['セイ', 'ショウ'], kun: ['こえ'] }, meanings: ['voice'], components: ['声'], jlptLevel: 'N4', frequency: 388 },
  
  // 心 관련
  { id: '心', character: '心', radical: '心', radicalName: '마음 심', strokeCount: 4, readings: { on: ['シン'], kun: ['こころ'] }, meanings: ['heart', 'mind'], components: ['心'], jlptLevel: 'N4', frequency: 157 },
  { id: '思', character: '思', radical: '心', radicalName: '마음 심', strokeCount: 9, readings: { on: ['シ'], kun: ['おも.う'] }, meanings: ['think'], components: ['田', '心'], jlptLevel: 'N4', frequency: 132 },
  { id: '意', character: '意', radical: '心', radicalName: '마음 심', strokeCount: 13, readings: { on: ['イ'], kun: [] }, meanings: ['intention', 'meaning'], components: ['音', '心'], jlptLevel: 'N4', frequency: 99 },
  { id: '感', character: '感', radical: '心', radicalName: '마음 심', strokeCount: 13, readings: { on: ['カン'], kun: [] }, meanings: ['feeling', 'emotion'], components: ['咸', '心'], jlptLevel: 'N4', frequency: 233 },
  { id: '急', character: '急', radical: '心', radicalName: '마음 심', strokeCount: 9, readings: { on: ['キュウ'], kun: ['いそ.ぐ'] }, meanings: ['hurry', 'urgent'], components: ['急'], jlptLevel: 'N4', frequency: 309 },
  { id: '悪', character: '悪', radical: '心', radicalName: '마음 심', strokeCount: 11, readings: { on: ['アク', 'オ'], kun: ['わる.い'] }, meanings: ['bad', 'evil'], components: ['亜', '心'], jlptLevel: 'N4', frequency: 530 },
  { id: '想', character: '想', radical: '心', radicalName: '마음 심', strokeCount: 13, readings: { on: ['ソウ'], kun: [] }, meanings: ['concept', 'think'], components: ['相', '心'], jlptLevel: 'N4', frequency: 381 },
  { id: '愛', character: '愛', radical: '心', radicalName: '마음 심', strokeCount: 13, readings: { on: ['アイ'], kun: [] }, meanings: ['love'], components: ['愛'], jlptLevel: 'N4', frequency: 640 },
  
  // 日 관련
  { id: '明', character: '明', radical: '日', radicalName: '날 일', strokeCount: 8, readings: { on: ['メイ', 'ミョウ'], kun: ['あか.るい', 'あ.ける'] }, meanings: ['bright', 'clear'], components: ['日', '月'], jlptLevel: 'N4', frequency: 67 },
  { id: '暗', character: '暗', radical: '日', radicalName: '날 일', strokeCount: 13, readings: { on: ['アン'], kun: ['くら.い'] }, meanings: ['dark'], components: ['日', '音'], jlptLevel: 'N4', frequency: 887 },
  { id: '春', character: '春', radical: '日', radicalName: '날 일', strokeCount: 9, readings: { on: ['シュン'], kun: ['はる'] }, meanings: ['spring'], components: ['春'], jlptLevel: 'N4', frequency: 579 },
  { id: '夏', character: '夏', radical: '夂', radicalName: '뒤처질 치', strokeCount: 10, readings: { on: ['カ', 'ゲ'], kun: ['なつ'] }, meanings: ['summer'], components: ['夏'], jlptLevel: 'N4', frequency: 659 },
  { id: '秋', character: '秋', radical: '禾', radicalName: '벼 화', strokeCount: 9, readings: { on: ['シュウ'], kun: ['あき'] }, meanings: ['autumn'], components: ['禾', '火'], jlptLevel: 'N4', frequency: 635 },
  { id: '冬', character: '冬', radical: '冫', radicalName: '얼음 빙', strokeCount: 5, readings: { on: ['トウ'], kun: ['ふゆ'] }, meanings: ['winter'], components: ['冬'], jlptLevel: 'N4', frequency: 849 },
  { id: '昔', character: '昔', radical: '日', radicalName: '날 일', strokeCount: 8, readings: { on: ['セキ', 'シャク'], kun: ['むかし'] }, meanings: ['past', 'old times'], components: ['日', '日'], jlptLevel: 'N4', frequency: 1148 },
  { id: '映', character: '映', radical: '日', radicalName: '날 일', strokeCount: 9, readings: { on: ['エイ'], kun: ['うつ.る'] }, meanings: ['reflect', 'project'], components: ['日', '央'], jlptLevel: 'N4', frequency: 404 },
  
  // 動作
  { id: '持', character: '持', radical: '手', radicalName: '손 수', strokeCount: 9, readings: { on: ['ジ'], kun: ['も.つ'] }, meanings: ['hold', 'have'], components: ['扌', '寺'], jlptLevel: 'N4', frequency: 119 },
  { id: '送', character: '送', radical: '辶', radicalName: '쉬엄쉬엄 갈 착', strokeCount: 9, readings: { on: ['ソウ'], kun: ['おく.る'] }, meanings: ['send'], components: ['辶', '关'], jlptLevel: 'N4', frequency: 335 },
  { id: '届', character: '届', radical: '尸', radicalName: '시체 시', strokeCount: 8, readings: { on: ['カイ'], kun: ['とど.く', 'とど.ける'] }, meanings: ['deliver', 'reach'], components: ['尸', '由'], jlptLevel: 'N4', frequency: 932 },
  { id: '届', character: '届', radical: '尸', radicalName: '시체 시', strokeCount: 8, readings: { on: ['カイ'], kun: ['とど.く', 'とど.ける'] }, meanings: ['deliver', 'reach'], components: ['尸', '由'], jlptLevel: 'N4', frequency: 932 },

  // ===== JLPT N3 =====
  { id: '温', character: '温', radical: '氵', radicalName: '물 수변', strokeCount: 12, readings: { on: ['オン'], kun: ['あたた.かい', 'あたた.める'] }, meanings: ['warm', 'temperature'], components: ['氵', '昷'], jlptLevel: 'N3', frequency: 500 },
  { id: '河', character: '河', radical: '氵', radicalName: '물 수변', strokeCount: 8, readings: { on: ['カ'], kun: ['かわ'] }, meanings: ['river'], components: ['氵', '可'], jlptLevel: 'N3', frequency: 600 },
  { id: '湖', character: '湖', radical: '氵', radicalName: '물 수변', strokeCount: 12, readings: { on: ['コ'], kun: ['みずうみ'] }, meanings: ['lake'], components: ['氵', '胡'], jlptLevel: 'N3', frequency: 800 },
  { id: '液', character: '液', radical: '氵', radicalName: '물 수변', strokeCount: 11, readings: { on: ['エキ'], kun: [] }, meanings: ['liquid'], components: ['氵', '夜'], jlptLevel: 'N3', frequency: 1000 },
  { id: '減', character: '減', radical: '氵', radicalName: '물 수변', strokeCount: 12, readings: { on: ['ゲン'], kun: ['へ.る', 'へ.らす'] }, meanings: ['decrease', 'reduce'], components: ['氵', '咸'], jlptLevel: 'N3', frequency: 324 },
  { id: '満', character: '満', radical: '氵', radicalName: '물 수변', strokeCount: 12, readings: { on: ['マン'], kun: ['み.ちる', 'み.たす'] }, meanings: ['full'], components: ['氵', '㒼'], jlptLevel: 'N3', frequency: 515 },
  { id: '演', character: '演', radical: '氵', radicalName: '물 수변', strokeCount: 14, readings: { on: ['エン'], kun: [] }, meanings: ['perform', 'act'], components: ['氵', '寅'], jlptLevel: 'N3', frequency: 267 },
  { id: '請', character: '請', radical: '言', radicalName: '말씀 언', strokeCount: 15, readings: { on: ['セイ', 'シン'], kun: ['う.ける', 'こ.う'] }, meanings: ['request', 'ask'], components: ['言', '青'], jlptLevel: 'N3', frequency: 700 },
  { id: '潔', character: '潔', radical: '氵', radicalName: '물 수변', strokeCount: 15, readings: { on: ['ケツ'], kun: ['いさぎよ.い'] }, meanings: ['clean', 'pure'], components: ['氵', '㓞'], jlptLevel: 'N3', frequency: 1200 },
  { id: '権', character: '権', radical: '木', radicalName: '나무 목', strokeCount: 15, readings: { on: ['ケン', 'ゴン'], kun: [] }, meanings: ['authority', 'right'], components: ['木', '雚'], jlptLevel: 'N3', frequency: 156 },
  { id: '確', character: '確', radical: '石', radicalName: '돌 석', strokeCount: 15, readings: { on: ['カク'], kun: ['たし.か', 'たし.かめる'] }, meanings: ['certain', 'confirm'], components: ['石', '隺'], jlptLevel: 'N3', frequency: 252 },
  { id: '認', character: '認', radical: '言', radicalName: '말씀 언', strokeCount: 14, readings: { on: ['ニン'], kun: ['みと.める'] }, meanings: ['recognize', 'admit'], components: ['言', '忍'], jlptLevel: 'N3', frequency: 194 },
  { id: '経', character: '経', radical: '糸', radicalName: '실 사', strokeCount: 11, readings: { on: ['ケイ', 'キョウ'], kun: ['へ.る', 'た.つ'] }, meanings: ['pass through', 'experience'], components: ['糸', '圣'], jlptLevel: 'N3', frequency: 79 },
  { id: '済', character: '済', radical: '氵', radicalName: '물 수변', strokeCount: 11, readings: { on: ['サイ', 'セイ'], kun: ['す.む', 'す.ます'] }, meanings: ['settle', 'finish'], components: ['氵', '斉'], jlptLevel: 'N3', frequency: 168 },
  { id: '報', character: '報', radical: '土', radicalName: '흙 토', strokeCount: 12, readings: { on: ['ホウ'], kun: ['むく.いる'] }, meanings: ['report', 'reward'], components: ['報'], jlptLevel: 'N3', frequency: 167 },
  { id: '際', character: '際', radical: '阝', radicalName: '언덕 부', strokeCount: 14, readings: { on: ['サイ'], kun: ['きわ'] }, meanings: ['occasion', 'edge'], components: ['阝', '祭'], jlptLevel: 'N3', frequency: 183 },
  { id: '関', character: '関', radical: '門', radicalName: '문 문', strokeCount: 14, readings: { on: ['カン'], kun: ['せき', 'かか.わる'] }, meanings: ['connection', 'barrier'], components: ['門', '关'], jlptLevel: 'N3', frequency: 70 },
  { id: '係', character: '係', radical: '人', radicalName: '사람 인', strokeCount: 9, readings: { on: ['ケイ'], kun: ['かか.る', 'かかり'] }, meanings: ['connection', 'person in charge'], components: ['亻', '系'], jlptLevel: 'N3', frequency: 232 },

  // ===== JLPT N2 =====
  { id: '影', character: '影', radical: '彡', radicalName: '터럭 삼', strokeCount: 15, readings: { on: ['エイ'], kun: ['かげ'] }, meanings: ['shadow', 'silhouette'], components: ['景', '彡'], jlptLevel: 'N2', frequency: 458 },
  { id: '響', character: '響', radical: '音', radicalName: '소리 음', strokeCount: 20, readings: { on: ['キョウ'], kun: ['ひび.く'] }, meanings: ['sound', 'echo'], components: ['響'], jlptLevel: 'N2', frequency: 674 },
  { id: '険', character: '険', radical: '阝', radicalName: '언덕 부', strokeCount: 11, readings: { on: ['ケン'], kun: ['けわ.しい'] }, meanings: ['steep', 'danger'], components: ['阝', '僉'], jlptLevel: 'N2', frequency: 628 },
  { id: '策', character: '策', radical: '竹', radicalName: '대나무 죽', strokeCount: 12, readings: { on: ['サク'], kun: [] }, meanings: ['plan', 'scheme'], components: ['⺮', '朿'], jlptLevel: 'N2', frequency: 220 },
  { id: '築', character: '築', radical: '竹', radicalName: '대나무 죽', strokeCount: 16, readings: { on: ['チク'], kun: ['きず.く'] }, meanings: ['build', 'construct'], components: ['⺮', '筑'], jlptLevel: 'N2', frequency: 473 },
  { id: '域', character: '域', radical: '土', radicalName: '흙 토', strokeCount: 11, readings: { on: ['イキ'], kun: [] }, meanings: ['region', 'area'], components: ['土', '或'], jlptLevel: 'N2', frequency: 318 },
  { id: '績', character: '績', radical: '糸', radicalName: '실 사', strokeCount: 17, readings: { on: ['セキ'], kun: [] }, meanings: ['achievements', 'results'], components: ['糸', '責'], jlptLevel: 'N2', frequency: 435 },
  { id: '織', character: '織', radical: '糸', radicalName: '실 사', strokeCount: 18, readings: { on: ['ショク', 'シキ'], kun: ['お.る'] }, meanings: ['weave', 'organization'], components: ['糸', '戠'], jlptLevel: 'N2', frequency: 248 },
  { id: '複', character: '複', radical: '衣', radicalName: '옷 의', strokeCount: 14, readings: { on: ['フク'], kun: [] }, meanings: ['duplicate', 'complex'], components: ['衤', '复'], jlptLevel: 'N2', frequency: 581 },
  { id: '般', character: '般', radical: '舟', radicalName: '배 주', strokeCount: 10, readings: { on: ['ハン'], kun: [] }, meanings: ['general', 'sort'], components: ['舟', '殳'], jlptLevel: 'N2', frequency: 357 },
  { id: '販', character: '販', radical: '貝', radicalName: '조개 패', strokeCount: 11, readings: { on: ['ハン'], kun: [] }, meanings: ['sell'], components: ['貝', '反'], jlptLevel: 'N2', frequency: 568 },
  { id: '貿', character: '貿', radical: '貝', radicalName: '조개 패', strokeCount: 12, readings: { on: ['ボウ'], kun: [] }, meanings: ['trade'], components: ['貝', '卯'], jlptLevel: 'N2', frequency: 652 },
  { id: '障', character: '障', radical: '阝', radicalName: '언덕 부', strokeCount: 14, readings: { on: ['ショウ'], kun: ['さわ.る'] }, meanings: ['obstacle', 'hinder'], components: ['阝', '章'], jlptLevel: 'N2', frequency: 583 },
  { id: '隠', character: '隠', radical: '阝', radicalName: '언덕 부', strokeCount: 14, readings: { on: ['イン', 'オン'], kun: ['かく.す', 'かく.れる'] }, meanings: ['hide', 'conceal'], components: ['阝', '㥯'], jlptLevel: 'N2', frequency: 818 },
  { id: '預', character: '預', radical: '頁', radicalName: '머리 혈', strokeCount: 13, readings: { on: ['ヨ'], kun: ['あず.ける', 'あず.かる'] }, meanings: ['deposit', 'entrust'], components: ['予', '頁'], jlptLevel: 'N2', frequency: 769 },
  { id: '頼', character: '頼', radical: '頁', radicalName: '머리 혈', strokeCount: 16, readings: { on: ['ライ'], kun: ['たの.む', 'たよ.る'] }, meanings: ['rely', 'request'], components: ['束', '頁'], jlptLevel: 'N2', frequency: 686 },
  { id: '順', character: '順', radical: '頁', radicalName: '머리 혈', strokeCount: 12, readings: { on: ['ジュン'], kun: [] }, meanings: ['order', 'obey'], components: ['川', '頁'], jlptLevel: 'N2', frequency: 527 },
  { id: '領', character: '領', radical: '頁', radicalName: '머리 혈', strokeCount: 14, readings: { on: ['リョウ'], kun: [] }, meanings: ['territory', 'rule'], components: ['令', '頁'], jlptLevel: 'N2', frequency: 343 },
  { id: '類', character: '類', radical: '頁', radicalName: '머리 혈', strokeCount: 18, readings: { on: ['ルイ'], kun: ['たぐ.い'] }, meanings: ['kind', 'type'], components: ['米', '大', '頁'], jlptLevel: 'N2', frequency: 323 },
  { id: '額', character: '額', radical: '頁', radicalName: '머리 혈', strokeCount: 18, readings: { on: ['ガク'], kun: ['ひたい'] }, meanings: ['amount', 'forehead'], components: ['客', '頁'], jlptLevel: 'N2', frequency: 502 },

  // ===== JLPT N1 =====
  { id: '壊', character: '壊', radical: '土', radicalName: '흙 토', strokeCount: 16, readings: { on: ['カイ', 'エ'], kun: ['こわ.す', 'こわ.れる'] }, meanings: ['break', 'destroy'], components: ['土', '懐'], jlptLevel: 'N1', frequency: 732 },
  { id: '懐', character: '懐', radical: '心', radicalName: '마음 심', strokeCount: 16, readings: { on: ['カイ'], kun: ['ふところ', 'なつ.かしい'] }, meanings: ['pocket', 'nostalgia'], components: ['忄', '褱'], jlptLevel: 'N1', frequency: 1028 },
  { id: '拡', character: '拡', radical: '手', radicalName: '손 수', strokeCount: 8, readings: { on: ['カク'], kun: ['ひろ.がる', 'ひろ.げる'] }, meanings: ['expand', 'extend'], components: ['扌', '広'], jlptLevel: 'N1', frequency: 612 },
  { id: '摘', character: '摘', radical: '手', radicalName: '손 수', strokeCount: 14, readings: { on: ['テキ'], kun: ['つ.む'] }, meanings: ['pick', 'point out'], components: ['扌', '啇'], jlptLevel: 'N1', frequency: 1066 },
  { id: '撮', character: '撮', radical: '手', radicalName: '손 수', strokeCount: 15, readings: { on: ['サツ'], kun: ['と.る'] }, meanings: ['photograph'], components: ['扌', '最'], jlptLevel: 'N1', frequency: 963 },
  { id: '操', character: '操', radical: '手', radicalName: '손 수', strokeCount: 16, readings: { on: ['ソウ'], kun: ['みさお', 'あやつ.る'] }, meanings: ['operate', 'manipulate'], components: ['扌', '喿'], jlptLevel: 'N1', frequency: 671 },
  { id: '擁', character: '擁', radical: '手', radicalName: '손 수', strokeCount: 16, readings: { on: ['ヨウ'], kun: [] }, meanings: ['embrace', 'support'], components: ['扌', '雍'], jlptLevel: 'N1', frequency: 1124 },
  { id: '旗', character: '旗', radical: '方', radicalName: '모 방', strokeCount: 14, readings: { on: ['キ'], kun: ['はた'] }, meanings: ['flag'], components: ['方', '其'], jlptLevel: 'N1', frequency: 1027 },
  { id: '朗', character: '朗', radical: '月', radicalName: '달 월', strokeCount: 10, readings: { on: ['ロウ'], kun: ['ほが.らか'] }, meanings: ['bright', 'cheerful'], components: ['良', '月'], jlptLevel: 'N1', frequency: 1171 },
  { id: '枠', character: '枠', radical: '木', radicalName: '나무 목', strokeCount: 8, readings: { on: [], kun: ['わく'] }, meanings: ['frame', 'framework'], components: ['木', '卆'], jlptLevel: 'N1', frequency: 899 },
  { id: '核', character: '核', radical: '木', radicalName: '나무 목', strokeCount: 10, readings: { on: ['カク'], kun: [] }, meanings: ['nucleus', 'core'], components: ['木', '亥'], jlptLevel: 'N1', frequency: 600 },
  { id: '欄', character: '欄', radical: '木', radicalName: '나무 목', strokeCount: 20, readings: { on: ['ラン'], kun: [] }, meanings: ['column', 'railing'], components: ['木', '闘'], jlptLevel: 'N1', frequency: 1084 },
  { id: '殿', character: '殿', radical: '殳', radicalName: '창 수', strokeCount: 13, readings: { on: ['デン', 'テン'], kun: ['との', 'どの'] }, meanings: ['palace', 'lord'], components: ['尸', '共', '殳'], jlptLevel: 'N1', frequency: 1020 },
  { id: '渡', character: '渡', radical: '氵', radicalName: '물 수변', strokeCount: 12, readings: { on: ['ト'], kun: ['わた.る', 'わた.す'] }, meanings: ['cross', 'transit'], components: ['氵', '度'], jlptLevel: 'N1', frequency: 540 },
  { id: '滞', character: '滞', radical: '氵', radicalName: '물 수변', strokeCount: 13, readings: { on: ['タイ'], kun: ['とどこお.る'] }, meanings: ['stagnate', 'delay'], components: ['氵', '帯'], jlptLevel: 'N1', frequency: 1019 },
  { id: '漏', character: '漏', radical: '氵', radicalName: '물 수변', strokeCount: 14, readings: { on: ['ロウ'], kun: ['も.る', 'も.れる'] }, meanings: ['leak'], components: ['氵', '屚'], jlptLevel: 'N1', frequency: 1229 },
  { id: '潜', character: '潜', radical: '氵', radicalName: '물 수변', strokeCount: 15, readings: { on: ['セン'], kun: ['ひそ.む', 'もぐ.る'] }, meanings: ['lurk', 'dive'], components: ['氵', '替'], jlptLevel: 'N1', frequency: 1069 },
  { id: '澄', character: '澄', radical: '氵', radicalName: '물 수변', strokeCount: 15, readings: { on: ['チョウ'], kun: ['す.む', 'す.ます'] }, meanings: ['clear', 'serene'], components: ['氵', '登'], jlptLevel: 'N1', frequency: 1339 },
  { id: '濁', character: '濁', radical: '氵', radicalName: '물 수변', strokeCount: 16, readings: { on: ['ダク', 'ジョク'], kun: ['にご.る', 'にご.す'] }, meanings: ['muddy', 'turbid'], components: ['氵', '蜀'], jlptLevel: 'N1', frequency: 1499 },
  { id: '濃', character: '濃', radical: '氵', radicalName: '물 수변', strokeCount: 16, readings: { on: ['ノウ'], kun: ['こ.い'] }, meanings: ['thick', 'dense'], components: ['氵', '農'], jlptLevel: 'N1', frequency: 1005 },
  { id: '瀬', character: '瀬', radical: '氵', radicalName: '물 수변', strokeCount: 19, readings: { on: ['ライ'], kun: ['せ'] }, meanings: ['rapids', 'shallows'], components: ['氵', '頼'], jlptLevel: 'N1', frequency: 931 },
  { id: '炎', character: '炎', radical: '火', radicalName: '불 화', strokeCount: 8, readings: { on: ['エン'], kun: ['ほのお'] }, meanings: ['flame', 'inflammation'], components: ['火', '火'], jlptLevel: 'N1', frequency: 1051 },
  { id: '焦', character: '焦', radical: '火', radicalName: '불 화', strokeCount: 12, readings: { on: ['ショウ'], kun: ['こ.げる', 'こ.がす', 'あせ.る'] }, meanings: ['scorch', 'burn'], components: ['隹', '灬'], jlptLevel: 'N1', frequency: 1091 },
  { id: '煙', character: '煙', radical: '火', radicalName: '불 화', strokeCount: 13, readings: { on: ['エン'], kun: ['けむ.る', 'けむり'] }, meanings: ['smoke'], components: ['火', '垔'], jlptLevel: 'N1', frequency: 1029 },
  { id: '熟', character: '熟', radical: '火', radicalName: '불 화', strokeCount: 15, readings: { on: ['ジュク'], kun: ['う.れる'] }, meanings: ['ripe', 'mature'], components: ['享', '丸', '灬'], jlptLevel: 'N1', frequency: 1025 },
  { id: '燥', character: '燥', radical: '火', radicalName: '불 화', strokeCount: 17, readings: { on: ['ソウ'], kun: ['かわ.く'] }, meanings: ['dry'], components: ['火', '喿'], jlptLevel: 'N1', frequency: 1649 },
  { id: '爆', character: '爆', radical: '火', radicalName: '불 화', strokeCount: 19, readings: { on: ['バク'], kun: [] }, meanings: ['bomb', 'explode'], components: ['火', '暴'], jlptLevel: 'N1', frequency: 826 },
];

// 한자 정보 조회 함수
export function getKanjiFromDictionary(character: string): KanjiInfo | undefined {
  return KANJI_DICTIONARY.find((k) => k.character === character);
}

// 여러 한자 정보 조회 (중복 제거)
export function getMultipleKanjiFromDictionary(characters: string[]): KanjiInfo[] {
  const uniqueCharacters = [...new Set(characters)];
  return uniqueCharacters
    .map((char) => getKanjiFromDictionary(char))
    .filter((info): info is KanjiInfo => info !== undefined);
}

// 부수별 한자 조회
export function getKanjiByRadicalFromDictionary(radical: string): KanjiInfo[] {
  return KANJI_DICTIONARY.filter((k) => k.radical === radical);
}

// 구성요소 포함 한자 조회
export function getKanjiByComponentFromDictionary(component: string): KanjiInfo[] {
  return KANJI_DICTIONARY.filter((k) => k.components.includes(component));
}

// 음독으로 한자 조회
export function getKanjiByReadingFromDictionary(reading: string): KanjiInfo[] {
  return KANJI_DICTIONARY.filter((k) => k.readings.on.includes(reading));
}

// 전체 한자 사전 반환 (중복 제거)
export function getAllKanjiFromDictionary(): KanjiInfo[] {
  const seen = new Set<string>();
  return KANJI_DICTIONARY.filter((k) => {
    if (seen.has(k.character)) return false;
    seen.add(k.character);
    return true;
  });
}
