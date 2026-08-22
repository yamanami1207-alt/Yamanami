import '../src/index.css';

const worksSection = document.getElementById('past-works');
const worksList = document.getElementById('works-list');
const pastWorksLink = document.getElementById('past-works-link');
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;
let worksLoaded = false;

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
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).replace(/\//g, '.');
};

const imageMarkup = (image, label, stoneType) => {
  if (!image?.url) return '<div></div>';
  const alt = `${stoneType || '天然石'}の${label}写真｜過去の加工一覧`;
  return `<div class="flex flex-col gap-2">
    <span class="text-[10px] tracking-widest text-stone-400 bg-stone-100 self-start px-2 py-1 rounded-sm">${label}</span>
    <img src="${escapeHtml(image.url)}?w=1000" class="w-full h-auto rounded-sm object-cover aspect-video bg-stone-100" loading="lazy" alt="${escapeHtml(alt)}">
  </div>`;
};

const renderWork = (work) => {
  const dateValue = work.date || work.publishedAt || work.createdAt;
  const date = formatDate(dateValue);
  const stoneType = escapeHtml(work.stone_type || work.title || '加工実績');
  const images = work.image_before || work.image_after
    ? `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 mt-8">${imageMarkup(work.image_before, 'BEFORE', stoneType)}${imageMarkup(work.image_after, 'AFTER', stoneType)}</div>`
    : '';
  const content = work.content
    ? `<div class="blog-content text-[14px] leading-loose text-stone-600 max-w-none mt-6">${work.content}</div>`
    : '';

  return `<article class="border-b border-stone-200 pb-12 mb-12 last:border-0 last:pb-0 last:mb-0">
    <time class="text-[11px] font-sans text-stone-400 tracking-wider mb-2 block" datetime="${escapeHtml(dateValue || '')}">${date}</time>
    <h3 class="text-xl font-serif tracking-widest text-[#1B2A47] mb-6 pb-4 border-b border-stone-100 block w-full max-w-md">${stoneType}</h3>
    ${images}
    ${content}
  </article>`;
};

const showWorks = async () => {
  if (!worksSection || !worksList) return;
  worksSection.classList.remove('hidden');
  worksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (worksLoaded) return;
  if (!apiKey) {
    worksList.innerHTML = '<p class="text-center text-sm text-stone-400 py-8">加工事例を表示する準備中です。</p>';
    return;
  }

  try {
    const response = await fetch('https://yamanami.microcms.io/api/v1/works?limit=50', {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
    });
    if (!response.ok) throw new Error('Failed to fetch works');

    const data = await response.json();
    if (!data.contents?.length) {
      worksList.innerHTML = '<p class="text-center text-sm text-stone-400 py-8">過去の加工事例はまだありません。</p>';
      worksLoaded = true;
      return;
    }

    worksList.innerHTML = data.contents.map(renderWork).join('');
    worksLoaded = true;
  } catch (error) {
    console.error('Error fetching works:', error);
    worksList.innerHTML = '<p class="text-center text-sm text-stone-400 py-8">事例の読み込みに失敗しました。</p>';
  }
};

if (pastWorksLink) {
  pastWorksLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.history.replaceState(null, '', '#past-works');
    showWorks();
  });
}

if (window.location.hash === '#works' || window.location.hash === '#past-works') {
  window.addEventListener('load', showWorks, { once: true });
}

const setupSliders = () => {
  document.querySelectorAll('.slider-component').forEach((slider) => {
    const container = slider.querySelector('.slides-container');
    const dots = slider.querySelectorAll('.slider-dot');
    if (!container || dots.length === 0 || container.dataset.ready) return;
    container.dataset.ready = 'true';

    const originalCount = dots.length;
    const firstSlide = container.children[0];
    if (!firstSlide) return;
    container.appendChild(firstSlide.cloneNode(true));

    let currentIndex = 0;
    let timer;

    const update = (index, animate = true) => {
      container.style.transition = animate ? 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
      container.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('opacity-100', dotIndex === (index % originalCount));
        dot.classList.toggle('opacity-40', dotIndex !== (index % originalCount));
      });
    };

    const next = () => {
      currentIndex += 1;
      update(currentIndex);
      if (currentIndex >= originalCount) {
        window.setTimeout(() => {
          currentIndex = 0;
          update(currentIndex, false);
        }, 1200);
      }
    };

    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(next, 4000);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        update(currentIndex);
        start();
      });
    });

    slider.addEventListener('mouseenter', () => window.clearInterval(timer));
    slider.addEventListener('mouseleave', start);
    start();
  });
};

setupSliders();
