let groupedBySubregion = []

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        groupedBySubregion = groupBySubregion(data);
        createTable(groupedBySubregion);
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

document.querySelector('#population').addEventListener('click', () => {
  populationSortingState = (populationSortingState + 1) % 3;
  createTable(groupedBySubregion, { name: nameSortingState, area: areaSortingState, population: populationSortingState });
});

document.querySelector('#area').addEventListener('click', () => {
  areaSortingState = (areaSortingState + 1) % 3;
  createTable(groupedBySubregion, { name: nameSortingState, area: areaSortingState, population: populationSortingState });
});

document.querySelector('#name').addEventListener('click', () => {
  nameSortingState = (nameSortingState + 1) % 3;
  createTable(groupedBySubregion, { name: nameSortingState, area: areaSortingState, population: populationSortingState });
});

const sortData = (data, sortOptions) => {
  const { name, area, population } = sortOptions;

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
function createTable(groupedBySubregion, sortOptions = { name: 0, population: 0, area: 0 }) {
    const tableBody = document.querySelector('#countryTable tbody');
    const pagination = document.querySelector('#pagination');
    
    const sortedData = sortData(groupedBySubregion, sortOptions);

    const itemsPerPage = 10;
    let currentPage = 1;

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
        tr.innerHTML = `
            <th>Name</th>
            <th>Capital</th>
            <th>Population</th>
            <th>Area</th>`;


        const tbody = document.createElement('tbody');

        countries.forEach(country => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${country.name.common}</td>
            <td>${country.capital !== undefined ? country.capital : 'Not defined'}</td>
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
        const totalPages = Math.ceil(groupedBySubregion.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            
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
