
const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];
function zad1(letter){
    let zad1 = document.getElementById('zad1')
    let ul = document.createElement('ul')
    ul.id = 'zad1ul'

    zad1Ul = document.getElementById('zad1ul')
    if(zad1Ul){
        zad1Ul.remove()
    }

    zad1.appendChild(ul)
    

    names.forEach(name => {
        if(name.includes(letter)){
            let li = document.createElement('li')
            li.innerHTML = name
            ul.appendChild(li)
        }
    })
}


let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];
function zad2(){
    let zad2 = document.getElementById('zad2')
    let ul = document.createElement('ul')
    ul.id = 'zad2ul'

    zad2Ul = document.getElementById('zad2ul')
    if(zad2Ul){
        zad2Ul.remove()
    }

    zad2.appendChild(ul)

    let li = document.createElement('li')
    li.innerHTML = numbers.every(number => number < 9)
    ul.appendChild(li)

    let li2 = document.createElement('li')
    li2.innerHTML = numbers.some(number => number < 6)
    ul.appendChild(li2)

    let li3 = document.createElement('li')
    numbers = numbers.map(number => number + 1)
    li3.innerHTML = numbers.filter(number => number % 2 == 1)
    ul.appendChild(li3)

    let li4 = document.createElement('li')
    li4.innerHTML = numbers.reduce((a, b) => a + b, 0)
    ul.appendChild(li4)
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
function zad3(continent){
    let zad3 = document.getElementById('zad3')
    let ul = document.createElement('ul')
    ul.id = 'zad3ul'

    zad3Ul = document.getElementById('zad3ul')
    if(zad3Ul){
        zad3Ul.remove()
    }

    zad3.appendChild(ul)

    countries.forEach(country => {
        if(country.continent === continent){
            let li = document.createElement('li')
            li.innerHTML = country.name
            ul.appendChild(li)
        }
    })
}


let people = [
    {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
    {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
    {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
    {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

function zad4(){
    let zad4 = document.getElementById('zad4')
    let ul = document.createElement('ul')
    ul.id = 'zad4ul'

    zad4Ul = document.getElementById('zad4ul')
    if(zad4Ul){
        zad4Ul.remove()
    }

    zad4.appendChild(ul)

    people.forEach(person => {
        if(person.email.includes('replicant.io')){
            let li = document.createElement('li')
            li.innerHTML = person.name
            ul.appendChild(li)
        }
    })
}

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];
function zad5(){
    let zad5 = document.getElementById('zad5')
    let ul = document.createElement('ul')
    ul.id = 'zad5ul'

    zad5Ul = document.getElementById('zad5ul')
    if(zad5Ul){
        zad5Ul.remove()
    }

    zad5.appendChild(ul)
    uniqueName = [...new Set(duplicateName)]

    uniqueName.forEach(name => {
        let li = document.createElement('li')
        li.innerHTML = name
        ul.appendChild(li)
    })


    ul.appendChild(li)
}

// 1. Na stronach internetowych wyświetlają się nazwy zawierające znak "r".  ( tablica names)

// 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronei w sekcji 2
    //   sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
    //   inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
    //   Nesteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2

// 3. Na stronach internetowych wyświetlają się kraje z Europy

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. wyświetlanie wyników na stronach internetowych.

// 5. usuwanie zduplikowanych wartości z tablicy nazwaduplikatu