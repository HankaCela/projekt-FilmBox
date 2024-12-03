// Funkce pro načtení navigace na všech stránkách
function nactiNavigaci() {
    const navigace = document.querySelector('#navigace');
    if (navigace) {
      navigace.innerHTML = `
        <nav>
          <ul>
            <li><a href="index.html">Úvodní stránka</a></li>
            <li><a href="seznam.html">Seznam filmů</a></li>
            <li><a href="detail.html">Detail filmu</a></li>
            <li><a href="o-webu.html">O webu</a></li>
          </ul>
        </nav>
      `;
    }
  }
  
  // Funkce pro formátování data (např. pro datum vydání filmu)
  function formatujDatum(datum) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(datum).toLocaleDateString('cs-CZ', options);
  }
  
  // Funkce pro zobrazení hlavičky na všech stránkách
  function nactiHlavicku() {
    const hlavicka = document.querySelector('#hlavicka');
    if (hlavicka) {
      hlavicka.innerHTML = `
        <header>
          <h1>FilmBox</h1>
        </header>
      `;
    }
  }
  
  // Funkce pro načtení patičky na všech stránkách
  function nactiPaticku() {
    const paticka = document.querySelector('#paticka');
    if (paticka) {
      paticka.innerHTML = `
        <footer>
          <p>&copy; 2024 FilmBox. Všechna práva vyhrazena.</p>
        </footer>
      `;
    }
  }
  
  // Spuštění společných funkcí při načtení stránky
  document.addEventListener('DOMContentLoaded', () => {
    nactiHlavicku();
    nactiNavigaci();
    nactiPaticku();
  });