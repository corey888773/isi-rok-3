async function getJSON(url) {
    const response = await fetch(url);
    return response.json();
}

let data = await getJSON('city.json');

// a - miasta w woj małopolskim
const malopolskie = data.filter(city => city.province === "małopolskie");
const malopolskieCities = malopolskie.map(city => city.name);
const malopolskieD = document.getElementById("malopolskie");
const malopolskieP = document.createElement("p");

malopolskieP.innerText = malopolskieCities.join(', ');
malopolskieD.appendChild(malopolskieP);

//b - miasta z 2 a
const twoAs = data.filter(city => city.name.toLowerCase().split('a').length - 1 === 2);
const twoAsNames = twoAs.map(city => city.name);
const twoAsD = document.getElementById("twoAs");
const twoAsP = document.createElement("p");

twoAsP.innerText = twoAsNames.join(', ');
twoAsD.appendChild(twoAsP);

//c - miasto o 5 najwiekszej gestosci zaludnienia
const sortedByDensity = [...data].sort((a, b) => b.density - a.density);
const fifthDensity = sortedByDensity[4];
const fifthDensityD = document.getElementById("fifthDensity");
const fifthDensityP = document.createElement("p");

fifthDensityP.innerText = fifthDensity.name;
fifthDensityD.appendChild(fifthDensityP);

//d - miasta powyzej 100000


let cities = [];
let noCities = [];
data.forEach(city => {
    if (city.people > 100000) {
        city.name += " City";
        cities.push(city);
    }
    else {
        noCities.push(city);
    }
});
const cityName = document.getElementById("cityName");
const cityNameCities = document.createElement("p");
const cityNameNoCities = document.createElement("p");

cityNameCities.innerText = cities.map(city => city.name);
cityNameNoCities.innerText = noCities.map(city => city.name);
cityName.appendChild(cityNameCities);
cityName.appendChild(cityNameNoCities);


//e - miasta powyzej 80000 i ponizej 80000
const above = data.filter(city => city.people > 80000).length;
const below = data.filter(city => city.people <= 80000).length;
const aboveBelow = document.getElementById("aboveBelow");
const aboveBelowP = document.createElement("p");

aboveBelowP.innerText = `Ponad 80000: ${above}, Ponizej 80000: ${below}`;
aboveBelow.appendChild(aboveBelowP);

//f - srednia powierzchnia miast na p
const pCities = data.filter(city => city.township.toLowerCase().startsWith('p'));
const averageArea = pCities.reduce((sum, city) => sum + city.area, 0) / pCities.length;
const averageAreaD = document.getElementById("averageArea");
const averageAreaP = document.createElement("p");

averageAreaP.innerText = `Średnia powierzchnia miast na p: ${averageArea}`;
averageAreaD.appendChild(averageAreaP);

//g - miasta z najwieksza i najmniejsza powierzchnia
const pomorskie = data.filter(city => city.province === "pomorskie");
const pomorskieAbove5000 = data.filter(city => city.province === "pomorskie" && city.people > 5000);
const pomorskieD = document.getElementById("pomorskie");
const pomorskieP = document.createElement("p");
const pomorskieC = document.createElement("p");
pomorskieP.innerText = `Miasta na pomorzu z iloscia mieszkańców powyzej 5000: ${pomorskieAbove5000.length}`;
pomorskieC.innerText += `Czy wszystkie miasta na pomorzu mają powyzej 5000?: wszystkie miasta:${pomorskie.length} miasta powyzej 5000:${pomorskieAbove5000.length}`;

pomorskieD.appendChild(pomorskieP);
pomorskieD.appendChild(pomorskieC);