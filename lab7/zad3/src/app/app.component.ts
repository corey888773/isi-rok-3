import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FavouriteActorComponent } from './favourite-actor/favourite-actor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FavouriteActorComponent],
  template: `
  <h1>Hello World</h1>
  <app-favourite-actor></app-favourite-actor>
  `
  ,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zad3';
}
