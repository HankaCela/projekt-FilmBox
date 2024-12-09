document.addEventListener("DOMContentLoaded", function () {
	const stars = document.querySelectorAll('.button-star');
	let currentRating = 0;
  
	const noteForm = document.querySelector("#note-form");
	const messageInput = document.querySelector("#message-input");
	const termsCheckbox = document.querySelector("#terms-checkbox");
  
	noteForm.addEventListener("submit", function (event) {
	  event.preventDefault();
  
	  messageInput.classList.remove("is-invalid");
	  termsCheckbox.classList.remove("is-invalid");
  
	  if (messageInput.value.trim() === "") {
		messageInput.classList.add("is-invalid");
		messageInput.focus();
		return;
	  }
  
	  if (!termsCheckbox.checked) {
		termsCheckbox.classList.add("is-invalid");
		termsCheckbox.focus();
		return;
	  }
  
	  const noteParagraph = document.createElement("p");
	  noteParagraph.classList.add("card-text");
	  noteParagraph.textContent = messageInput.value;
  
	  const noteSection = document.querySelector("#detail-filmu");
	  const existingNote = noteSection.querySelector(".card-text");
	  if (existingNote) {
		existingNote.remove();
	  }
	  noteSection.appendChild(noteParagraph);
  
	  noteForm.reset();
	});
  
	function updateStars(rating) {
	  stars.forEach(star => {
		const starRating = parseInt(star.getAttribute('data-rating'));
		if (starRating <= rating) {
		  star.classList.remove('far');
		  star.classList.add('fas');
		} else {
		  star.classList.remove('fas');
		  star.classList.add('far');
		}
	  });
	}
  
	stars.forEach(star => {
	  star.addEventListener('mouseenter', function () {
		const rating = parseInt(star.getAttribute('data-rating'));
		updateStars(rating);
	  });
  
	  star.addEventListener('mouseleave', function () {
		updateStars(currentRating);
	  });
  
	  star.addEventListener('click', function () {
		currentRating = parseInt(star.getAttribute('data-rating'));
		updateStars(currentRating);
	  });
	});
  
	const filmId = window.location.hash.substring(1); const hash = window.location.hash.substring(1);
  
	if (hash) {
	  const film = filmy.find(f => f.id === hash);
  
	  if (film) {
		document.querySelector('#detail-filmu .card-title').textContent = film.nazev;
		document.querySelector('#detail-filmu .card-text').textContent = film.popis;
		document.querySelector('#film-plakat').src = film.plakat.url;
		document.querySelector('#film-plakat').alt = `Plakát k filmu ${film.nazev}`;
  
		const premiera = dayjs(film.premiera).format('D. M. YYYY');
		const premieryElement = document.querySelector('#premiera');
  
		// Výpočet rozdílu v počtu dní
		const dnes = dayjs();
		const premieraDatum = dayjs(film.premiera);
		const rozdil = premieraDatum.diff(dnes, 'days');
  
		// Zobrazení správného textu
		let rozdilText = "";
		if (rozdil === 0) {
		  rozdilText = "Premiéra je dnes.";
		} else if (rozdil > 0) {
		  rozdilText = `Premiéra bude za ${rozdil} ${spravnyTvarDnu(rozdil)}.`;
		} else {
		  rozdilText = `Premiéra byla před ${Math.abs(rozdil)} ${spravnyTvarDnu(Math.abs(rozdil), true)}.`;
		}
  
		premieryElement.innerHTML = `Premiéra <strong>${premiera}</strong><br>${rozdilText}`;
  
		let posledniHodnoceni = 0;
  
		function zvyrazniHvezdicky(pocetHvezdicek) {
		  const hvezdicky = document.querySelectorAll('.button-star i');
		  hvezdicky.forEach((hvezdicka, index) => {
			if (index < pocetHvezdicek) {
			  hvezdicka.classList.remove('far');
			  hvezdicka.classList.add('fas');
			} else {
			  hvezdicka.classList.remove('fas');
			  hvezdicka.classList.add('far');
			}
		  });
		}
  
		function kliknutaHvezdicka(event) {
		  const pocetHvezdicek = parseInt(event.target.dataset.value);
		  zvyrazniHvezdicky(pocetHvezdicek);
		  posledniHodnoceni = pocetHvezdicek;
		}
  
		function hoverHvezdicky(event) {
		  const pocetHvezdicek = parseInt(event.target.dataset.value);
		  zvyrazniHvezdicky(pocetHvezdicek);
		}
  
		function opusteniHvezdicky() {
		  zvyrazniHvezdicky(posledniHodnoceni);
		}
  
		const hvezdicky = document.querySelectorAll('.button-star');
		hvezdicky.forEach(hvezdicka => {
		  hvezdicka.addEventListener('click', kliknutaHvezdicka);
		  hvezdicka.addEventListener('mouseenter', hoverHvezdicky);
		  hvezdicka.addEventListener('mouseleave', opusteniHvezdicky);
		});
  
		if (film.hodnoceni) {
		  zvyrazniHvezdicky(film.hodnoceni);
		  posledniHodnoceni = film.hodnoceni;
		}
	  } else {
		document.querySelector('#detail-filmu .card-title').textContent = "Film nebyl nalezen";
	  }
	}
  
	function spravnyTvarDnu(dny, minuly = false) {
	  if (dny === 1) {
		return "den";
	  } else if (dny >= 2 && dny <= 4) {
		return "dny";
	  } else if (minuly) {
		return "dny"; // Pro minulý čas: "před X dny"
	  } else {
		return "dní"; // Pro budoucí čas: "za X dní"
	  }
	}
  });
  

const filmy = [
	{
		id: 'pelisky',
		nazev: 'Pelíšky',
		plakat: {
			url: 'https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/165/059/165059101_56d52a.jpg',
			sirka: 420,
			vyska: 595,
		},
		ochutnavka: 'České drama z období 1968.',
		popis:
			'A je tu zpět jedna z nejúspěšnějších českých filmových komedií od renomovaných tvůrců - režiséra J. Hřebejka a scenáristy P. Jarchovského s řadou skvělých herců. Vraťme se tedy s oblíbenými postavami k rodinným rituálům, láskám a trapasům odehrávajícím se na sklonku šedesátých let minulého století v jedné pražské čtvrti. Jemná poetika a humorná nadsázka jsou charakteristické pro vyprávění životních osudů tří generací mužů a žen ve zvláštním období našich dějin v roce 1968… V jedné dvoupatrové vile tu žijí dvě rodiny - Šebkovi a Krausovi. Otec Šebek (M. Donutil), prostoduchý, ale dobrácký důstojník z povolání, je zastáncem panujícího režimu a stejně vehementně obhajuje i vlastní neomylnost v roli hlavy rodiny. Elegantní otec Kraus (J. Kodet), bývalý odbojář s trpkou válečnou zkušeností, je naopak zarytým opozičníkem. Také on je přesvědčený o tom, že má za všech okolností pravdu - není proto divu, že se tihle dva nemají zrovna v lásce. Jejich děti - gymnazista Michal (M. Beran) a jeho spolužačka Jindřiška (K. Nováková) - spolu vycházejí docela dobře. I když Michal by byl rád, kdyby ho jeho sousedka brala trochu víc na vědomí. Ta má ale oči pro jiného. Nezbývá mu tedy nic jiného, než aby smutně přihlížel, jak mu jeho první milostné body krade spolužák Elien (O. Brousek). U Šebků a Krausů se zatím střídají rodinné návštěvy, ve vší obřadnosti se tu slaví Vánoce, svatba i nečekaný, bolestný pohřeb. Do zabydlených domácností vtrhnou i některé novodobé vymoženosti v podobě umělohmotných lžiček, nerozbitných sklenic i podivných her pro statečné pionýry. Mládež zatím pokukuje po lákadlech světa kapitalismu a snaží se žít svůj vlastní, na rodičovských autoritách a "velké" historii nezávislý život. V soukromí rodinných pelíšků se tak čas od času odehrají malá dramata názorů a vztahů, která se v paměti jejich účastníků otisknou už nejspíš navždy… (csfd.cz, Česká televize)',
		premiera: '2019-04-08',
	},
	{
		id: 'promlceno',
		nazev: 'Promlčeno',
		plakat: {
			url: 'https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/164/987/164987945_c36f6f.jpg',
			sirka: 420,
			vyska: 595,
		},
		ochutnavka: 'Český krimi thriller s Karlem Rodenem.',
		popis:
			'Šokující živé vysílaní, které během chvíle změní životy několika nevinných lidí. Radek (Karel Roden) se po téměř dvaceti letech nečekaně vrací do svého rodného města, aby zde nalezl jistou mladou ženu a jednou provždy se vyrovnal se svou minulostí. V pátrání po neznámé ženě mu pomáhá Eva, ambiciózní rozhlasová moderátorka, která jeho příběh dostane do své živě vysílané noční show. Chtěla mít ve vysílání senzační událost, ale k jejímu zděšení a ke zděšení všech posluchačů začne na povrch vyplouvat něco, s čím nikdo nepočítal. Svůj plán připravoval Radek několik let a během jeho vyprávění je do pochmurného příběhu vtažena nejen ona sama, ale i pražská kriminálka a další aktéři dlouho zapomenutých událostí. Začíná napínavý boj o čas a o spravedlnost. Opravdu už je vše nenávratně promlčeno? (csfd.cz, Bontonfilm)',
		premiera: '2022-04-28',
	},
	{
		id: 'ona',
		nazev: 'Ona',
		plakat: {
			url: 'https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/158/280/158280506_017bab.jpg',
			sirka: 420,
			vyska: 595,
		},
		ochutnavka: 'Romantické Sci-Fi z blízké budoucnosti',
		popis:
			'Děj snímku Her se odehrává v Los Angeles v nedaleké budoucnosti. Theodore (Joaquin Phoenix) je komplikovaný a citlivý muž, který se živí psaním dojemných a osobních dopisů pro druhé. Se zlomeným srdcem po ukončení dlouhého vztahu se začne zajímat o nový, pokročilý operační systém, o kterém jeho výrobce tvrdí, že představuje zcela unikátní a intuitivní bytost. Po jeho instalaci se seznamuje se „Samanthou", umělou inteligencí s milým ženským hlasem (Scarlett Johansson), která má zajímavé postřehy, je citlivá a překvapivě vtipná. Jak její potřeby a požadavky rostou společně s těmi jeho, mění se jejich přátelství ve skutečnou vzájemnou lásku. (csfd.cz, Falcon)',
		premiera: '2013-12-18',
	},
	{
		id: 'rrrrrrr',
		nazev: 'RRRrrrr!!!',
		plakat: {
			url: 'https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/162/393/162393560_2aca32.jpg',
			sirka: 420,
			vyska: 595,
		},
		ochutnavka: 'Francouzská komedie.',
		popis:
			'Pred 35 000 rokmi v časoch, kedy bol boj o oheň už dávno vybojovaný, prišiel na rad šampón, kvôli ktorému bol spáchaný prvý zločin v histórii ľudstva. Dva praveké kmene, Špinavovlasých a Čistovlasých žijú v harmónii a mieri až do chvíle, keď si Špinavovlasí uvedomia, že sa od susedného kmeňa líšia... Čistotou vlasov. Ale tajnú receptúru na peniacu zmes majú iba Čistovlasí a tí sa o ňu nechcú podeliť... Čistovlasí až doteraz žili pokojný, šťastný a čistý život. Nikoho z nich nenapadlo, že by im mohol niekto závidieť ich krásne čisté vlasy. Dokonca ani špinavý a smradľavý susedný kmeň Špinavovlasých. Ale v jednu noc sa to stalo. Po prvý raz v histórii ľudstva bol spáchaný zločin. Človek zabil človeka... Čo bolo vlastne jeho motívom? Kto vyrieši tento záhadný rébus? Čo ak je táto vrrrrražda iba začiatkom hrôzostrašnej série? Všetky tieto otázky začínajú riešiť prrrrehistorickí vyšetrovatelia. Začína sa prrrraveká špionáž a s ňou prichádza aj prvý vyšetrovaný zločin v dejinách ľudskej spoločnosti. Zažijete prvé vypočúvania, sledovania a podozrievania. V bláznivej komédii režiséra Chabata vstúpite do prrrrehistorickej doby, kedy bola platená starostlivosť o deti nutnosťou, profesionálny volejbal zábavou a sledovanie nástenných malieb ako predchodcov televízie samozrejmosťou. Nezľaknite sa hrôzostrašných zvukov vychádzajúcich z jaskýň. Podmienky základných ľudských potrieb, boli pred 35 000 rokmi nedokonalé. (csfd.cz, oficiální text distributora)',
		premiera: '2004-09-23',
	},
	{
		id: 'vlastnici',
		nazev: 'Vlastníci',
		plakat: {
			url: 'https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/163/781/163781903_f1e217.png',
			sirka: 420,
			vyska: 595,
		},
		ochutnavka: 'Česká komedie.',
		popis:
			'Paní Zahrádková (Tereza Voříšková) s manželem (Vojta Kotek) idealisticky chtějí, aby společnými silami dům zachránili. Novomanželé Bernáškovi (Jiří Černý, Maria Sawa) se s nadšením připojují. Paní Roubíčková (Klára Melíšková) pedantsky kontroluje řádný průběh schůze. Paní Horvátová (Dagmar Havlová) všechno iniciativně komentuje. Naivní pan Švec (David Novotný) zastupuje svojí maminku. Paní Procházková (Pavla Tomicová) s panem Novákem (Ondřej Malý) hledá způsoby jak zhodnotit svůj majetek. Pan Nitranský (Andrej Polák) touží po půdě v domě a pan Kubát (Jiří Lábus) důsledně sabotuje jakékoliv rozhodnutí. A v pozadí číhají bratři Čermákovi (Kryštof Hádek, Stanislav Majer), jen starý pan profesor Sokol (Ladislav Trojan) zatím nic nekomentuje… (csfd.cz, CinemArt)',
		premiera: '2019-11-19',
	},
	{
		id: 'kimi',
		nazev: 'KIMI',
		plakat: {
			url: 'https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/166/002/166002844_2e67c1.jpg',
			sirka: 420,
			vyska: 595,
		},
		ochutnavka: 'Americký thriller o IT pracovnici s agorafobií.',
		popis:
			'Pracovnice IT oddělení trpící agorafobií najde nahrávku násilného trestného činu a nahlásí ji svým nadřízeným. Uvědomuje si však, že bude muset opustit svůj byt, aby mohl být zločin vyšetřen. (csfd.cz, HBO Max)',
		premiera: '2022-02-10',
	},
	{
		id: 'petrolejove-lampy',
		nazev: 'Petrolejové lampy',
		plakat: {
			url: 'https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/163/486/163486952_22889f.jpg',
			sirka: 420,
			vyska: 595,
		},
		ochutnavka: 'Sugestivní filmové drama podle románu Jaroslava Havlíčka.',
		popis:
			'Sugestivní filmové drama Petrolejové lampy natočil Juraj Herz podle stejnojmenného románu Jaroslava Havlíčka. Vypráví v něm tragický příběh stárnoucí dívky Štěpy, žijící na přelomu století v dusném prostředí českého maloměsta, v ovzduší nepochopení a předstíraných citů, přetvářky a falše. Štěpě jsou neustále matkou vnucováni adepti na ženění, kteří ovšem musejí pocházet z téhož okruhu jako ona. Štěpa je však jiná než ostatní dívky. Jakoby zasažena duchem emancipace vyslouží si pověst dívky volných mravů a ta přirozeně nápadníky z řad městské honorace odrazuje. Než by se stala starou pannou, provdá se za bratrance, zkrachovalého důstojníka. V den svatby ale ještě netuší, jaká strašlivá nemoc pronásleduje jejího ženicha... Pečlivě rekonstruované období secese v sobě tají osudové lidské trápení: stárnoucí dívka z rodiny maloměstské honorace se dočká svého štěstí, když se provdá na pohledného důstojníka. Netuší ovšem, že muž trpí zhoubnou pohlavní chorobu - s marnou obětavostí pak o něho pečuje, vystavena zlomyslnému posměchu svého okolí. Vynikající, stále sugestivní snímek Juraje Herze se opírá o procítěné, jemně odstíněné herecké výkony Ivy Janžurové a Petra Čepka. (csfd.cz, oficiální text distributora)',
		premiera: '1971-10-01',
	},
	{
		id: 'krakonosovo-tajemstvi',
		nazev: 'Krakonošovo tajemství',
		plakat: {
			url: 'https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/166/933/166933672_58ebbc.jpg',
			sirka: 420,
			vyska: 595,
		},
		ochutnavka: 'Česká vánoční pohádka z Krkonoš.',
		popis:
			'Na zámek v podhůří Krkonoš přijíždí jeho nový majitel Štěpán se svojí snoubenkou, krásnou komtesou Blankou, a mladším bratrem Adamem. Cestou kočár nešťastně srazí kolemjdoucí dívku, Adam jí pomůže a ona se do něj zamiluje. Na zámku Adam objeví starou vlašskou knihu, která by měla obsahovat cestu k pokladům. Tajemné značky vlašské knihy však nedokáže vyluštit ani národopisec Jiráček, který v kraji sbírá pověsti a nevychází z údivu nad tím, že zdejší lidé stále věří v Krakonoše. Na zámku se objeví záhadný cizinec a nabídne Štěpánovi, že jej k pokladu za určitých podmínek dovede. Výprava do hor může začít. Naplní se Liduščina láska k Adamovi? Jakou záhadu skrývá starý obraz na zámku Hůrka a co strašlivého se v horách kdysi odehrálo? A kdo je vlastně Krakonoš a jaké je jeho největší tajemství? (csfd.cz, Česká televize)',
		premiera: '2022-12-24',
	},
	{
		id: 'pocatek',
		nazev: 'Počátek',
		plakat: {
			url: 'https://image.pmgstatic.com/cache/resized/w360/files/images/film/posters/160/620/160620903_69696f.jpg',
			sirka: 420,
			vyska: 595,
		},
		ochutnavka: 'Akční / Sci-Fi / Thriller / Mysteriózní / Dobrodružný',
		popis:
			'Dom Cobb (Leonardo DiCaprio) je velmi zkušený zloděj a jeho největší mistrovství je v krádeži nejcennějších tajemství. Ovšem není to jen tak obyčejný zloděj. Dom krade myšlenky z lidského podvědomí v době, kdy lidská mysl je nejzranitelnější – když člověk spí. Cobbova nevšední dovednost z něj dělá nejen velmi vyhledávaného experta, ale také ohroženého uprchlíka. Musel obětovat vše, co kdy miloval. Nyní se mu však nabízí šance na vykoupení. Může získat zpět svůj život. Tato poslední zakázka je nejen velmi riskantní, ale zdá se, že i nemožná. Tentokrát nemá za úkol myšlenku ukrást, ale naopak ji zasadit do něčí mysli. Pokud uspěje, bude to dokonalý zločin.',
		premiera: '2010-07-8',
	},
	{
		id: 'krotitele-duchu',
		nazev: 'Krotitelé duchů',
		plakat: {
			url: 'https://image.pmgstatic.com/cache/resized/w360/files/images/film/posters/159/468/159468507_567c76.jpg',
			sirka: 420,
			vyska: 595,
		},
		ochutnavka: 'Sci-Fi / Fantasy / Komedie / Dobrodružný',
		popis:
			'Nachystejte se na komediální klasiku! Když se doktoři Venkman (Bill Murray), Stantz (Dan Aykroyd) a Spengler (Harold Ramis) z katedry parapsychologie nenadále ocitnou na dlažbě, rozhodnou se vydat na cestu lovců duchů - nevábných a občas poněkud drzých potvor. Sotva otevřou dveře, už se jim hrnou první zakázky. Největší výzva ale čeká na stopaře všeho nevysvětlitelného ve chvíli, kdy krásná Dana Barret (Sigourney Weaver) za dveřmi své chladničky objevuje bránu do pekel. Teď mají krotitelé duchů za zády celý svět a je jen na nich, jestli v této nekonečně zábavné akční komedii uchrání Manhattan před totálním šílenstvím! ',
		premiera: '1984-06-16',
	},
]

