function nactiNavigaci() {
    const navigace = document.querySelector('#navigace');
    if (navigace) {
      navigace.innerHTML = `
        <nav>
          <ul id="menu-polozky">
            <li><a href="index.html">Úvodní stránka</a></li>
            <li><a href="seznam.html">Seznam filmů</a></li>
            <li><a href="detail.html">Detail filmu</a></li>
            <li><a href="o-webu.html">O webu</a></li>
          </ul>
          <button id="menu-tlacitko">
            <i class="fas fa-bars"></i> <!-- Výchozí hamburger ikona -->
          </button>
        </nav>
      `;
    }
  }
  
  
  function formatujDatum(datum) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(datum).toLocaleDateString('cs-CZ', options);
  }
  
  
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
  
  
  document.addEventListener('DOMContentLoaded', () => {
    nactiHlavicku();
    nactiNavigaci();
    nactiPaticku();
  
    
    const menuTlacitko = document.querySelector('#menu-tlacitko');
    const menuPolozky = document.querySelector('#menu-polozky');
  
    if (menuTlacitko && menuPolozky) {
      menuTlacitko.addEventListener('click', () => {
        
        menuPolozky.classList.toggle('show');
  
        
        const ikona = menuTlacitko.querySelector('i');
        if (menuPolozky.classList.contains('show')) {
          ikona.classList.remove('fa-bars'); 
          ikona.classList.add('fa-xmark');  
        } else {
          ikona.classList.remove('fa-xmark'); 
          ikona.classList.add('fa-bars');    
        }
      });
    }
  });
  