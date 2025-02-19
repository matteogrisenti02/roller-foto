// GLOBAL VARIABLE
let currentIndex = 0;
const delay = 3000; // 3 secondi
let isScrolling = true;
let intervalId;

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM Content Loaded. Inizializzo lo slider...");
  // console.log("DOM Content Loaded. Inizializzo lo slider...", document.body.innerHTML);
  
  const track = document.querySelector(".image-track");
  console.log(track)

  const images = Array.from(track.children).filter(el => el.tagName === "IMG");
  const totalImages = images.length;
  
  // Inizializza subito il carosello
  console.log("Inizializzazione slider con", totalImages, "immagini");
  updateSlider(images, totalImages);
  
  // Activate the auto scrolling evry 3 seconds
  intervalId = setInterval(function() {
    nextImage(images, totalImages);
  }, delay);
  console.log("Auto-scrolling avviato con delay:", delay, "ms");


  // CLICK EVENT MENAGMENT
  // Clic sulla track per fermare/riavviare lo scrolling
  track.addEventListener("click", function() {
    console.log("Track cliccata");
    if (isScrolling) {
      stopScrolling(track);
    } else {
      startScrolling(track, images, totalImages);
    }
  });

  // Clic sulle frecce per navigare tra le immagini
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  // Gestione del click sulla freccia next
  if (nextArrow) {
    nextArrow.addEventListener("click", function() {
      console.log("Freccia next cliccata");
      stopScrolling(track);
      nextImage(images, totalImages);
    });
  } else {
    console.log("Elemento nextArrow non trovato nel DOM");
  }

  // Gestione del click sulla freccia prev
  if (prevArrow) {
    prevArrow.addEventListener("click", function() {
      console.log("Freccia prev cliccata");
      stopScrolling(track);
      prevImage(images, totalImages);
    });
  } else {
    console.log("Elemento prevArrow non trovato nel DOM");
  }

});


// Funzione per aggiornare lo slider e assegnare le classi corrette
function updateSlider(images, totalImages) {
  console.log("updateSlider chiamata");
  console.log(images)
  console.log("Current index:", currentIndex, "su", totalImages, "immagini");

  const isMobile = window.innerWidth < 768; // Se true, siamo su mobile
  console.log("isMobile:", isMobile);

  // Rimuove tutte le classi da ogni immagine
  images.forEach((img, i) => {
      img.classList.remove("active", "prev", "next", "hidden", "mobile-active");
      console.log(`Image ${i}: classi rimosse`);
  });
  
  if(isMobile) {  
    images[currentIndex].classList.add("mobile-active");
    images[currentIndex].style.width = "50%"; // Occupa metà spazio
    images[currentIndex].style.margin = "0 auto"; // Centrata
    return
  }

  if (totalImages === 1 ) {
      // Se c'è solo 1 immagine, la centriamo
      images[currentIndex].classList.add("active");
      images[currentIndex].style.width = "50%"; // Occupa metà spazio
      images[currentIndex].style.margin = "0 auto"; // Centrata
      return;
  }

  if (totalImages === 2) {
      // Se ci sono 2 immagini, entrambe visibili, ognuna con il 48% di spazio + margine
      images[0].classList.add("two-images");
      images[1].classList.add("two-images");

      images[0].style.width = "48%";
      images[1].style.width = "48%";
      images[0].style.marginRight = "4%"; // Margine tra le due immagini
      images[1].style.marginLeft = "0";   // Evita doppio margine

      return;
  }


  // Calcola gli indici per prev e next (in maniera circolare)
  const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
  const nextIndex = (currentIndex + 1) % totalImages;
  console.log("Indici calcolati:", { prevIndex, currentIndex, nextIndex });

  // Assegna le classi alle immagini rilevanti
  images[currentIndex].classList.add("active");
  console.log(`Image ${currentIndex} impostata come active`);
  images[prevIndex].classList.add("prev");
  console.log(`Image ${prevIndex} impostata come prev`);
  images[nextIndex].classList.add("next");
  console.log(`Image ${nextIndex} impostata come next`);

  // Nasconde tutte le altre immagini (se presenti)
  images.forEach((img, i) => {
      if (i !== currentIndex && i !== prevIndex && i !== nextIndex) {
      img.classList.add("hidden");
      console.log(`Image ${i} impostata come hidden`);
      }
  });
}


// FUNZIONI PER GESTIRE LE IMMAGINI
// Funzione per passare all'immagine successiva
function nextImage(images, totalImages) {
  console.log("nextImage chiamata. currentIndex prima:", currentIndex);
  currentIndex = (currentIndex + 1) % totalImages;
  console.log("Nuovo currentIndex:", currentIndex);
  updateSlider(images, totalImages);
}
// Funzione per passare all'immagine precedente
function prevImage(images, totalImages) {
  console.log("prevImage chiamata. currentIndex prima:", currentIndex);
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  console.log("Nuovo currentIndex:", currentIndex);
  updateSlider(images, totalImages);
}



// FUNZIONI PER GESTIRE LO SCOLLINR AUTOMATICO
// Ferma lo scrolling automatico
function stopScrolling(track) {
  console.log("stopScrolling chiamata");
  clearInterval(intervalId);
  track.classList.add("paused");
  isScrolling = false;
}
// Avvia lo scrolling automatico
function startScrolling(track, images, totalImages) {
  console.log("startScrolling chiamata");
  if (!isScrolling) {
    intervalId = setInterval(function() {
      nextImage(images, totalImages);
    }, delay);

    track.classList.remove("paused");
    console.log("Scrolling riavviato");
    isScrolling = true;
  }
}