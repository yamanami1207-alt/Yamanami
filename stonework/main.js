import '../src/index.css';

const worksList = document.getElementById('works-list');
const worksToggle = document.getElementById('works-toggle');
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;
const initialCount = 3;
let allWorks = [];
let showAll = window.location.hash === '#works';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.');
};

const imageMarkup = (image, label, stoneType) => {
  if (!image?.url) return '';
  const alt = `${stoneType || '天然石'}の${label}写真｜STONEWORK`;
  return `<figure class="flex flex-col gap-3">
    <figcaption class="text-[10px] tracking-[0.16em] text-stone-400 bg-white self-start px-2 py-1 rounded-sm">${label}</figcaption>
    <img src="${escapeHtml(image.url)}?w=1200" class="w-full h-auto rounded-sm object-cover bg-white" loading="lazy" alt="${escapeHtml(alt)}">
  </figure>`;
};

const renderWork = (work, index) => {
  const dateValue = work.date || work.publishedAt || work.createdAt;
  const date = formatDate(dateValue);
  const stoneType = escapeHtml(work.stone_type || work.title || '天然石加工事例');
  const processingType = escapeHtml(work.processing_type || '天然石加工');
  const images = work.image_before || work.image_after
    ? `<div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-8">${imageMarkup(work.image_before, 'BEFORE 加工前', stoneType)}${imageMarkup(work.image_after, 'AFTER 加工後', stoneType)}</div>`
    : '';
  const content = work.content
    ? `<div class="blog-content text-[13px] md:text-sm font-light leading-[2.4] text-stone-600 mt-8">${work.content}</div>`
    : '';

  return `<article class="border-t border-stone-200 pt-10 md:pt-12 ${index === 0 ? '' : 'mt-2'}">
    <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
      <time class="text-[10px] tracking-[0.16em] text-stone-400" datetime="${escapeHtml(dateValue || '')}">${date}</time>
      <span class="text-[10px] tracking-[0.16em] text-[#1B2A47] bg-white px-2 py-1 border border-stone-200">${processingType}</span>
    </div>
    <h3 class="text-xl md:text-2xl font-serif tracking-[0.1em] text-[#1B2A47] mt-5">${stoneType}</h3>
    ${images}
    ${content}
  </article>`;
};

const updateToggle = () => {
  if (!worksToggle) return;
  if (allWorks.length <= initialCount) {
    worksToggle.classList.add('hidden');
    return;
  }

  worksToggle.classList.remove('hidden');
  worksToggle.setAttribute('aria-expanded', String(showAll));
  worksToggle.innerHTML = showAll
    ? '代表事例のみ表示 <span aria-hidden="true">↑</span>'
    : 'すべての加工事例を見る <span aria-hidden="true">↓</span>';
};

const renderWorks = () => {
  if (!worksList) return;
  const visibleWorks = showAll ? allWorks : allWorks.slice(0, initialCount);
  worksList.innerHTML = visibleWorks.map(renderWork).join('');
  updateToggle();
};

const scrollToWorks = () => {
  const worksSection = document.getElementById('works');
  if (worksSection) {
    setTimeout(() => worksSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }
};

const loadWorks = async () => {
  if (!worksList) return;

  if (!apiKey) {
    worksList.innerHTML = '<p class="text-center text-sm text-stone-400 py-12">加工事例を表示する準備中です。</p>';
    return;
  }

  try {
    const response = await fetch('https://yamanami.microcms.io/api/v1/works?limit=50', {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
    });

    if (!response.ok) throw new Error('Failed to fetch works');
    const data = await response.json();
    allWorks = Array.isArray(data.contents) ? data.contents : [];

    if (!allWorks.length) {
      worksList.innerHTML = '<p class="text-center text-sm text-stone-400 py-12">現在、公開中の加工事例はありません。</p>';
      return;
    }

    renderWorks();
    if (window.location.hash === '#works') scrollToWorks();
  } catch (error) {
    console.error('Error fetching works:', error);
    worksList.innerHTML = '<p class="text-center text-sm text-stone-400 py-12">加工事例の読み込みに失敗しました。</p>';
  }
};

if (worksToggle) {
  worksToggle.addEventListener('click', () => {
    showAll = !showAll;
    renderWorks();
    if (!showAll) scrollToWorks();
  });
}

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#works' && !showAll && allWorks.length) {
    showAll = true;
    renderWorks();
    scrollToWorks();
  }
});

loadWorks();
