import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../country';
import { CountryComponent } from '../country/country.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CountryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchInput = '';


  countriesList : Country[] = [
    {
      name : "Poland",
      wikiLink : "https://en.wikipedia.org/wiki/Poland"
    },
    {
      name : "United Stetes",
      wikiLink : "https://en.wikipedia.org/wiki/United_States"
      
    },
    {
      name : "Germany",
      wikiLink : "https://en.wikipedia.org/wiki/Germany"
    },
    {
      name : "France",
      wikiLink : "https://en.wikipedia.org/wiki/France"
    }
  ]

  addCountry(): void {
    let inputField = <HTMLInputElement>document.getElementById('search-input');
    this.countriesList.push({
      name: inputField.value,
      wikiLink: "https://en.wikipedia.org/wiki/" + inputField.value
    });
    inputField.value = '';

  }

  removeCountry(country : Country): void {
    const index = this.countriesList.indexOf(country);
    if (index !== -1) {
      this.countriesList.splice(index, 1);
    }
  }

  getIndex(country : Country): number {
    return this.countriesList.indexOf(country);
  }
}
