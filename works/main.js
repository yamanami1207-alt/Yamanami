import '../src/index.css';

const worksList = document.getElementById('works-list');
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const formatDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('ja-JP', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).replace(/\//g, '.');
};

const imageMarkup = (image, label, stoneType) => {
  if (!image?.url) return '<div></div>';
  const alt = `${stoneType || '天然石'}の${label}写真｜天然石加工事例`;
  return `<div class="flex flex-col gap-3">
    <span class="text-[10px] tracking-widest text-stone-400 bg-stone-100 self-start px-2 py-1 rounded-sm">${label}</span>
    <img src="${escapeHtml(image.url)}?w=1000" class="w-full h-auto rounded-sm object-cover bg-stone-100" loading="lazy" alt="${escapeHtml(alt)}">
  </div>`;
};

const renderWork = (work) => {
  const date = formatDate(work.date || work.publishedAt || work.createdAt);
  const stoneType = escapeHtml(work.stone_type || '天然石加工実績');
  const images = work.image_before || work.image_after
    ? `<div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-8">${imageMarkup(work.image_before, 'BEFORE 加工前', stoneType)}${imageMarkup(work.image_after, 'AFTER 加工後', stoneType)}</div>`
    : '';
  const content = work.content ? `<div class="prose prose-stone max-w-none text-[14px] leading-loose text-stone-600 mt-8">${work.content}</div>` : '';
  return `<article class="border-b border-stone-200 pb-14 mb-14 last:border-0 last:pb-0 last:mb-0">
    <time class="text-[11px] font-sans text-stone-400 tracking-wider" datetime="${escapeHtml(work.date || work.publishedAt || work.createdAt || '')}">${date}</time>
    <h2 class="text-xl md:text-2xl font-serif tracking-widest text-[#1B2A47] mt-3 pb-4 border-b border-stone-100">${stoneType}</h2>
    ${images}
    ${content}
  </article>`;
};

const loadWorks = async () => {
  if (!apiKey) {
    worksList.innerHTML = '<p class="text-center text-sm text-stone-400 py-12">加工事例を表示する準備中です。</p>';
    return;
  }
  try {
    const response = await fetch('https://yamanami.microcms.io/api/v1/works?limit=50', {
      headers: { 'X-MICROCMS-API-KEY': apiKey }
    });
    if (!response.ok) throw new Error('Failed to fetch works');
    const data = await response.json();
    if (!data.contents?.length) {
      worksList.innerHTML = '<p class="text-center text-sm text-stone-400 py-12">現在、公開中の加工事例はありません。</p>';
      return;
    }
    worksList.innerHTML = data.contents.map(renderWork).join('');
  } catch (error) {
    console.error('Error fetching works:', error);
    worksList.innerHTML = '<p class="text-center text-sm text-stone-400 py-12">加工事例の読み込みに失敗しました。</p>';
  }
};

loadWorks();
