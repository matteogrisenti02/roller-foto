<style>
.image-slider-wrapper {
  position: relative;
}
/* Contenitore principale: qui puoi impostare max-width o width per far sì che il carosello abbia le dimensioni desiderate */
.image-slider {
  position: relative;
  max-width: 100%; /* Ad esempio, un contenitore più largo per ospitare 3 immagini */
  margin: 0 auto;
  /* Assicurati che l'overflow sia visibile, se necessario */
  overflow: hidden;
}

/* La track usa flex per disporre le immagini in orizzontale */
.image-track {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Spazio tra le immagini */
}

/* Stile base per le immagini */
.image-track img {
  max-width: 400px;       /* Imposta una larghezza fissa per immagini più piccole */
  transition: transform 1s ease, 
  opacity: 0;
  display: block;
}

/* Ordina e stila l'immagine precedente */
.image-track img.prev {
  order: 1;
  transform: scale(0.8);
  opacity: 1;
  filter: grayscale(80%);
  z-index: 1;
}

/* Ordina e stila l'immagine attiva */
.image-track img.active {
  order: 2;
  transform: scale(1);
  opacity: 1;
  z-index: 2;
}

/* Ordina e stila l'immagine successiva */
.image-track img.next {
  order: 3;
  transform: scale(0.8);
  opacity: 1;
  filter: grayscale(80%);
  z-index: 1;
}

/* Nasconde le immagini non interessate (non precedenti, attive o successive) */
.image-track img.hidden {
  display: none;
}

/* Frecce di navigazione */
.prev-arrow,
.next-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(248, 148, 29, 1);
  border: 10;
  padding: 15px;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  z-index: 10;
}

/* Posizioniamo le frecce agli estremi del carosello */
.prev-arrow { left: 10px; }
.next-arrow { right: 10px; }

/* Aggiungiamo un'ombra per una migliore visibilità */
.prev-arrow:hover,
.next-arrow:hover {
  background-color: rgba(248, 148, 29, 0.8);
}

.image-track img.two-images {
    display: inline-block;
    vertical-align: middle;
}

@media (max-width: 768px) {
  .image-track img {
    display: none; /* Nasconde tutte le immagini di default */
  }

  .image-track img.mobile-active {
    display: block; /* Mostra solo l'immagine attuale */
    width: 100%;
    /*max-width: 400px;  Adatta la dimensione */
    margin: 0 auto;
  }
}


</style>

<?php
// Separiamo le immagini in un array
$images = array_filter(explode(',', $attributes['images'])); // Rimuoviamo eventuali valori vuoti

$output = '<div class="image-slider-wrapper" data-images="' . esc_attr(json_encode($images)) . '">';
$output .= '<div class="image-slider">';
$output .= '<div class="image-track">';

// Itera sulle immagini...
foreach($images as $image) {
    $output .= '<img src="' . esc_url(trim($image)) . '" alt="Slider Image">';
}

$output .= '</div>';

// Inserisci le frecce all'interno di .image-slider
if (count($images) > 2) {
    $output .= '<button class="prev-arrow">&lt;</button>'; // Freccia sinistra
    $output .= '<button class="next-arrow">&gt;</button>'; // Freccia destra
}

$output .= '</div>'; // chiude .image-slider
$output .= '</div>'; // chiude .image-slider-wrapper

echo $output;
?>


