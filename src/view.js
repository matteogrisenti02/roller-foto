document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Content Loaded. Inizializzo lo slider...");
  
    const roller = document.querySelector(".image-slider");
    console.log(roller)
    const track = document.querySelector(".image-track");

    const images = Array.from(track.children).filter(el => el.tagName === "IMG");
    
    const totalImages = images.length;
    let currentIndex = 0;
    const delay = 3000; // 3 secondi
    let isScrolling = true;
    let intervalId;
  
    const prevArrow = document.querySelector(".prev-arrow");
    const nextArrow = document.querySelector(".next-arrow");
  
    // Funzione per aggiornare lo slider e assegnare le classi corrette
    function updateSlider() {
        console.log("updateSlider chiamata");
        console.log(images)
        console.log("Current index:", currentIndex, "su", totalImages, "immagini");
    
        // Rimuove tutte le classi da ogni immagine
        images.forEach((img, i) => {
            img.classList.remove("active", "prev", "next", "hidden");
            console.log(`Image ${i}: classi rimosse`);
        });

        if (totalImages === 1) {
            // Se c'è solo 1 immagine, la centriamo
            images[0].classList.add("active");
            images[0].style.width = "50%"; // Occupa tutto lo spazio
            images[0].style.margin = "0 auto"; // Centrata
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
  
    // Funzione per passare all'immagine successiva
    function nextImage() {
      console.log("nextImage chiamata. currentIndex prima:", currentIndex);
      currentIndex = (currentIndex + 1) % totalImages;
      console.log("Nuovo currentIndex:", currentIndex);
      updateSlider();
    }
  
    // Funzione per passare all'immagine precedente
    function prevImage() {
      console.log("prevImage chiamata. currentIndex prima:", currentIndex);
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      console.log("Nuovo currentIndex:", currentIndex);
      updateSlider();
    }
  
    // Ferma lo scrolling automatico
    function stopScrolling() {
      console.log("stopScrolling chiamata");
      clearInterval(intervalId);
      isScrolling = false;
      roller.classList.add("paused");
    }
  
    // Avvia lo scrolling automatico
    function startScrolling() {
      console.log("startScrolling chiamata");
      if (!isScrolling) {
        intervalId = setInterval(nextImage, delay);
        isScrolling = true;
        roller.classList.remove("paused");
        console.log("Scrolling riavviato");
      }
    }
  
    // Inizializza subito il carosello
    console.log("Inizializzazione slider con", totalImages, "immagini");
    updateSlider();
    intervalId = setInterval(nextImage, delay);
    console.log("Auto-scrolling avviato con delay:", delay, "ms");
  
    // Clic sulla track per fermare/riavviare lo scrolling
    track.addEventListener("click", function() {
      console.log("Track cliccata");
      if (isScrolling) {
        stopScrolling();
      } else {
        startScrolling();
      }
    });
  
    // Gestione del click sulla freccia next
    if (nextArrow) {
      nextArrow.addEventListener("click", function() {
        console.log("Freccia next cliccata");
        stopScrolling();
        nextImage();
      });
    } else {
      console.log("Elemento nextArrow non trovato nel DOM");
    }
  
    // Gestione del click sulla freccia prev
    if (prevArrow) {
      prevArrow.addEventListener("click", function() {
        console.log("Freccia prev cliccata");
        stopScrolling();
        prevImage();
      });
    } else {
      console.log("Elemento prevArrow non trovato nel DOM");
    }

});
  