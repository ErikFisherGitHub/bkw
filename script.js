const input = document.getElementById('inputValue');
const modeSwitch = document.getElementById('modeSwitch');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');
const modeLabel = document.getElementById('modeLabel');
const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyBtn');
const copyFeedback = document.getElementById('copyFeedback');
const MAX_BITS = 64;

// 👉 Bináris formázás 8 bitenként
function formatBinaryString(binStr) {
  return binStr.replace(/(.{8})/g, '$1 ').trim();
}

// 👉 Mód váltás esemény
modeSwitch.addEventListener('change', () => {
  modeLabel.textContent = modeSwitch.checked ? 'Bináris → Szám' : 'Szám → Bináris';
  resultText.textContent = 'Eredmény ide kerül';
  input.value = '';
  copyFeedback.textContent = '';
});

// 👉 Átalakítás gomb esemény
convertBtn.addEventListener('click', () => {
  const val = input.value.trim();
  if (!val) {
    resultText.textContent = 'Írj be egy értéket!';
    return;
  }

  if (modeSwitch.checked) {
    // Binárisból számra
    if (!/^[01]+$/.test(val)) {
      resultText.textContent = 'Érvénytelen bináris szám!';
      return;
    }
    const number = parseInt(val, 2);
    resultText.textContent = `Szám: ${number}`;
  } else {
    // Számból binárisra
    const num = parseInt(val);
    if (isNaN(num)) {
      resultText.textContent = 'Érvénytelen szám!';
      return;
    }
    const binary = num.toString(2);
    const formatted = formatBinaryString(binary);
    if (binary.length > MAX_BITS) {
      resultText.textContent = `Figyelem: A bináris szám ${binary.length} bit hosszú!\n\nBináris: ${formatted}`;
    } else {
      resultText.textContent = `Bináris: ${formatted}`;
    }
  }

  copyFeedback.textContent = '';
});

// 📋 Másolás gomb – csak a számérték másolása
copyBtn.addEventListener('click', () => {
  const raw = resultText.textContent;
  let valueOnly = '';

  if (raw.includes('Bináris:')) {
    // levágjuk az elejét, szóközöket eltávolítjuk
    valueOnly = raw.split('Bináris:')[1].replace(/\s/g, '').trim();
  } else if (raw.includes('Szám:')) {
    valueOnly = raw.split('Szám:')[1].trim();
  } else {
    valueOnly = raw.trim(); // fallback
  }

  navigator.clipboard.writeText(valueOnly)
    .then(() => {
      copyFeedback.textContent = 'Számérték másolva!';
      setTimeout(() => copyFeedback.textContent = '', 2000);
    })
    .catch(() => {
      copyFeedback.textContent = 'Hiba történt másoláskor!';
    });
});

// 🌗 Téma beállítása és mentése
function setTheme(mode) {
  document.documentElement.className = mode;
  themeToggle.textContent = mode === 'dark' ? '🌞' : '🌙';
  localStorage.setItem('theme', mode);
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.className;
  setTheme(current === 'light' ? 'dark' : 'light');
});

// 📅 Automatikus évszám lábléchez
document.getElementById('year').textContent = new Date().getFullYear();
