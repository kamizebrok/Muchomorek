// Dane dotyczące popularnych gatunków grzybów
const popularneGrzyby = ['Prawdziwek', 'Kania', 'Kurka'];

const kordyGrzyby = ['123', '456', '678'];

// Funkcja generująca listę popularnych grzybów
function generujListeGrzybow() {
  const grzybyList = document.getElementById('grzybyList');

  popularneGrzyby.forEach(grzyb => {
    const listItem = document.createElement('li');
    listItem.textContent = grzyb;
    grzybyList.appendChild(listItem);
  });
}

//Funkcja wyswietlajaca koordynaty w okolica.html
function pobieszKoordy() {
  const kordyList = document.getElementById('kordyList');

  kordyGrzyby.forEach(kord => {
    const listItem = document.createElement('li');
    listItem.textContent = kord;
    kordyList.appendChild(listItem);
  });
}

// Obsługa przycisku "Znajdź grzyby"
document.getElementById('znajdzGrzybyBtn').addEventListener('click', () => {
  // Tu można dodać funkcjonalność związana z wyszukiwaniem grzybów w okolicy
  const znalezioneGrzyby = document.getElementById('znalezioneGrzyby');
  znalezioneGrzyby.textContent = 'Przygotowjemy dane dla Ciebie.';
  window.location.href = 'okolica.html';
});

// Wywołanie funkcji generującej listę grzybów przy ładowaniu strony
window.addEventListener('load', generujListeGrzybow);
// Wywołanie funkcji generującej listę grzybów przy ładowaniu strony
window.addEventListener('load', pobieszKoordy);
// Obsługa przycisku "Dodaj informacje o zbiorach"
document.getElementById('dodajFormularzBtn').addEventListener('click', () => {
  wyswietlFormularz();
});

// Przejście do podstrony z formularzem
document.getElementById('przejdzDoFormularzaBtn').addEventListener('click', () => {
  window.location.href = 'form.html';
});

// Funkcja do wyświetlenia formularza zbierania grzybów
function wyswietlFormularz() {
  // Ukrycie innych elementów strony
  document.getElementById('znalezioneGrzyby').style.display = 'none';
  document.getElementById('dodajFormularzBtn').style.display = 'none';
  document.getElementById('formularzZbieraniaGrzybow').style.display = 'block';
}


