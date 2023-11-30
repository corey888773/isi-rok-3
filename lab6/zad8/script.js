let groupedData = []

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        groupedData = groupBySubregion(data);
        createTable(groupedData);
    });



// GROUPING DATA
const groupBySubregion = (countries) => {
    const subregions = [...new Set(countries.map(country => country.subregion))];

    const groupedCountries = subregions.map(subregion => {
        return {
            subregion: subregion !== undefined ? subregion : 'Not defined',
            countries: countries.filter(country => country.subregion === subregion),
            population: countries.filter(country => country.subregion === subregion).reduce((acc, country) => acc + country.population, 0),
            area: countries.filter(country => country.subregion === subregion).reduce((acc, country) => acc + country.area, 0)
        }
    });

    return groupedCountries;
}

// SORTING TABLE
let nameSortingState = 0;
let populationSortingState = 0;
let areaSortingState = 0;

const updateSortingButtons = () => {
  const nameButton = document.querySelector('#name');
  const areaButton = document.querySelector('#area');
  const populationButton = document.querySelector('#population');

  // Reset sorting icons
  nameButton.innerHTML = 'Name';
  areaButton.innerHTML = 'Area';
  populationButton.innerHTML = 'Population';

  // Add sorting icons based on sorting state
  if (nameSortingState === 1) {
    nameButton.innerHTML += ' &#9650;'; // Upward arrow
  } else if (nameSortingState === 2) {
    nameButton.innerHTML += ' &#9660;'; // Downward arrow
  }

  if (areaSortingState === 1) {
    areaButton.innerHTML += ' &#9650;'; // Upward arrow
  } else if (areaSortingState === 2) {
    areaButton.innerHTML += ' &#9660;'; // Downward arrow
  }

  if (populationSortingState === 1) {
    populationButton.innerHTML += ' &#9650;'; // Upward arrow
  } else if (populationSortingState === 2) {
    populationButton.innerHTML += ' &#9660;'; // Downward arrow
  }
};

document.querySelector('#population').addEventListener('click', () => {
  populationSortingState = (populationSortingState + 1) % 3;
  createTable(groupedData, { name: nameSortingState, area: areaSortingState, population: populationSortingState });
});

document.querySelector('#area').addEventListener('click', () => {
  areaSortingState = (areaSortingState + 1) % 3;
  createTable(groupedData, { name: nameSortingState, area: areaSortingState, population: populationSortingState });
});

document.querySelector('#name').addEventListener('click', () => {
  nameSortingState = (nameSortingState + 1) % 3;
  createTable(groupedData, { name: nameSortingState, area: areaSortingState, population: populationSortingState });
});

document.querySelector('#resetSorting').addEventListener('click', () => {
  nameSortingState = 0;
  areaSortingState = 0;
  populationSortingState = 0;
  createTable(groupedData, { name: nameSortingState, area: areaSortingState, population: populationSortingState });
});


const sortSubregions = (data, sortOptions) => {
  const { name, area, population } = sortOptions;

  updateSortingButtons();

  data.sort((a, b) => {
    if (name === 1) {
      if (a.subregion.toLowerCase() > b.subregion.toLowerCase()) return 1;
      if (a.subregion.toLowerCase() < b.subregion.toLowerCase()) return -1;
    } else if (name === 2) {
      if (a.subregion.toLowerCase() < b.subregion.toLowerCase()) return 1;
      if (a.subregion.toLowerCase() > b.subregion.toLowerCase()) return -1;
    }

    if (population === 1) {
      return a.population - b.population;
    } else if (population === 2) {
      return b.population - a.population;
    }

    if (area === 1) {
      return a.area - b.area;
    } else if (area === 2) {
      return b.area - a.area;
    }

    return 0;
  });

  return data;
};



// RENDERING TABLE
let currentPage = 1;

function createTable(groupedData, sortOptions = { name: 0, population: 0, area: 0 }) {
    const tableBody = document.querySelector('#countryTable tbody');
    const pagination = document.querySelector('#pagination');
    
    const dataCopy = [...groupedData];
    const sortedData = sortSubregions(dataCopy, sortOptions);
    const itemsPerPage = 10;

    const renderTable = (page) => {
        tableBody.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageSubregions = sortedData.slice(startIndex, endIndex);

        pageSubregions.forEach(subregion => {
            const row = document.createElement('tr');
            row.className = 'subregion-row'
            row.innerHTML = `
            <td>${subregion.subregion}</td>
            <td>${subregion.population}</td>
            <td>${subregion.area}</td>`;

            row.style.cursor = 'pointer';

            let countryTable;
            row.addEventListener('click', () => {
                row.classList.toggle('bg-primary');
                row.classList.toggle('text-light');
                if (countryTable) {
                    countryTable.style.display = countryTable.style.display === 'none' ? '' : 'none';
                } else {
                    countryTable = renderCountryTable(subregion.countries);
                    row.parentNode.insertBefore(countryTable, row.nextSibling);
                }
            });
            tableBody.appendChild(row);
        });
    }

    const renderCountryTable = (countries) => {
      const table = document.createElement('table');
      table.id = 'countryTable';
      table.classList.add('table');
      table.classList.add('table-striped');
      table.classList.add('table-hover');
      const thead = document.createElement('thead');
      const tr = document.createElement('tr');
      
      const innerName = document.createElement('th');
      innerName.id = 'inner-name';
      innerName.innerHTML = 'Name';

      const innerCapital = document.createElement('th');
      innerCapital.id = 'inner-capital';
      innerCapital.innerHTML = 'Capital';
      
      const innerPopulation = document.createElement('th');
      innerPopulation.id = 'inner-population';
      innerPopulation.innerHTML = 'Population';
      
      const innerArea = document.createElement('th');
      innerArea.id = 'inner-area';
      innerArea.innerHTML = 'Area';
      

      tr.appendChild(innerName);
      tr.appendChild(innerCapital);
      tr.appendChild(innerPopulation);
      tr.appendChild(innerArea);
      const tbody = document.createElement('tbody');

      countries.forEach(country => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${country.name.common}</td>
          <td>${country.capital}</td>
          <td>${country.population}</td>
          <td>${country.area}</td>
          `;
          tbody.appendChild(row);
      })
      thead.appendChild(tr);
      table.appendChild(thead);
      table.appendChild(tbody);

      return table;
    }

    const renderPagination = () => {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(groupedData.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            if (i === currentPage) {
                li.classList.add('active');
            }
            li.innerHTML = `<a class="m-1 button btn-primary p-2 pl-3 pr-3 rounded" href="#">${i}</a>`;
            
            li.addEventListener('click', () => {
                currentPage = i;
                renderTable(currentPage);
                renderPagination();
            });
            pagination.appendChild(li);
        }
    }

    renderTable(currentPage);
    renderPagination();
}
