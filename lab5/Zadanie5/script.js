
const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];
function printNamesWithLetter(letter){
    let namesWithLetter = names.filter(name => name.includes(letter));
    zad1 = document.getElementById('zad1')
    
    for (let name in namesWithLetter){
        li = document.createElement('li')
        li.innerHTML = namesWithLetter[name]
        zad1.appendChild(li)
    }
}


let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];
function numbers(){
    let zad2 = document.getElementById('zad2')
    let zad2a =document.createElement('li')
    zad2a.innerHTML = numbers.every(number => number < 9)
    zad2.appendChild(zad2a)

    let zad2b =document.createElement('li')
    zad2b.innerHTML = numbers.some(number => number < 6)
    zad2.appendChild(zad2b)

    let zad2c =document.createElement('li')
    zad2c.innerHTML = numbers.map(number => number + 1)
    zad2.appendChild(zad2c)

    let zad2d =document.createElement('li')
    zad2d.innerHTML = numbers.filter(number => number % 2 !== 0)
    zad2.appendChild(zad2d)

    let zad2e =document.createElement('li')
    zad2e.innerHTML = numbers.reduce((a, b) => a + b)
    zad2.appendChild(zad2e)
}

const countries = [
    { name: 'Nigeria', continent: 'Africa'},
    { name: 'Nepal', continent: 'Asia'},
    { name: 'Angola', continent: 'Africa'},
    { name: 'Poland', continent: 'Europe'},
    { name: 'Kenya', continent: 'Africa'},
    { name: 'Greece', continent: 'Europe'},
	{ name: 'France', continent: 'Europe'},
	{ name: 'China', continent: 'Asia'}
]

let people = [
    {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
    {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
    {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
    {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];


// 1. Na stronach internetowych wyświetlają się nazwy zawierające znak "r".  ( tablica names)

// 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronei w sekcji 2
    //   sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
    //   inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
    //   Nesteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2

// 3. Na stronach internetowych wyświetlają się kraje z Europy

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. wyświetlanie wyników na stronach internetowych.

// 5. usuwanie zduplikowanych wartości z tablicy nazwaduplikatu