import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../country';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {
  @Input() country!: Country;
  @Input() index!: number;

  constructor(private homeComponent: HomeComponent) {}

  removeCountry(): void {
    this.homeComponent.removeCountry(this.country);
  }

  isOdd(): boolean {
    return this.index % 2 !== 0;
  }

  hasAorR(): boolean {
    return this.country.name.includes('a') || this.country.name.includes('r');
  }

  isLongerThan6(): boolean {
    return this.country.name.length > 6;
  }

  determineClass(): string {
    if(this.isOdd()) {
      if (this.isLongerThan6()) {
        return 'orange';
      } else {
        return 'grey';
      }
    }
    else {
      if (this.hasAorR()) {
        return 'blue';
      } else {
        return 'yellow';
      }
    }
  }

  getIndex(): number {
    return this.homeComponent.getIndex(this.country);
  }
}
