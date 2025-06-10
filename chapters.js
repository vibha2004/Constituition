const chapters = [
  { id: 1, name: 'Chapter 1', subtitle: 'Child Labour', path: 'indexmain.html', logo: 'chap1.jpeg' },
  { id: 2, name: 'Chapter 2', subtitle: 'Workplace Rights', path: 'indexmain2.html', logo: 'chap2.jpg' },
  { id: 3, name: 'Chapter 3', subtitle: 'Consumer Rights', path: 'indexmain3.html', logo: 'chap3.jpeg' },
  { id: 4, name: 'Chapter 4', subtitle: 'Health Care', path: 'indexmain4.html', logo: 'chap5.jpeg' },
  { id: 5, name: 'Chapter 5', subtitle: 'Sexual Harrassment', path: './games/five/game5.html', logo: 'chap4.jpeg' },
  { id: 6, name: 'Chapter 6', subtitle: 'Privacy Rights', path: './games/six/game6.html', logo: 'chap6.jpeg' }
];

// Dynamically add chapters to the page
const chaptersGrid = document.getElementById('chapters-grid');

chapters.forEach(chapter => {
  const chapterLink = document.createElement('a');
  chapterLink.href = chapter.path;
  chapterLink.classList.add('chapter-link');

  const chapterCard = document.createElement('div');
  chapterCard.classList.add('chapter-card');

  const chapterLogo = document.createElement('div');
  chapterLogo.classList.add('chapter-logo');

  const logoImg = document.createElement('img');
  logoImg.src = chapter.logo;
  logoImg.alt = `${chapter.name} logo`;  // Use template literals with backticks here
  logoImg.classList.add('chapter-logo-img');

  const chapterName = document.createElement('h2');
  chapterName.textContent = chapter.name;

  const chapterSubtitle = document.createElement('div');
  chapterSubtitle.classList.add('chapter-subtitle');
  chapterSubtitle.textContent = chapter.subtitle;

  chapterLogo.appendChild(logoImg);
  chapterCard.appendChild(chapterLogo);
  chapterCard.appendChild(chapterName);
  chapterCard.appendChild(chapterSubtitle);
  chapterLink.appendChild(chapterCard);

  chaptersGrid.appendChild(chapterLink);
});
