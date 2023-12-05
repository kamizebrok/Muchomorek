// Dane dotyczące popularnych gatunków grzybów
const popularneGrzyby = ['Prawdziwek', 'Kania', 'Kurka'];

// Funkcja generująca listę popularnych grzybów
function generujListeGrzybow() {
  const grzybyList = document.getElementById('grzybyList');

  popularneGrzyby.forEach(grzyb => {
    const listItem = document.createElement('li');
    listItem.textContent = grzyb;
    grzybyList.appendChild(listItem);
  });
}

// Obsługa przycisku "Znajdź grzyby"
document.getElementById('znajdzGrzybyBtn').addEventListener('click', () => {
  // Tu można dodać funkcjonalność związana z wyszukiwaniem grzybów w okolicy
  const znalezioneGrzyby = document.getElementById('znalezioneGrzyby');
  znalezioneGrzyby.textContent = 'Nie znaleziono grzybów w Twojej okolicy.';
});

// Wywołanie funkcji generującej listę grzybów przy ładowaniu strony
window.addEventListener('load', generujListeGrzybow);

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

// Wywołanie funkcji generującej listę grzybów przy ładowaniu strony
window.addEventListener('load', generujListeGrzybow);
