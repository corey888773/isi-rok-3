import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite-actor',
  standalone: true,
  imports: [],
  template: `
  <h1>Favourite Actor</h1>
  <p>First name: {{name}}</p>
  <p>Last name: {{lastName}}</p>
  <p>Favourite film: {{favouriteFilm}}</p>
  <p>{{2+2}}</p>
  <p>{{name + ' ' + lastName}}</p>
  <p>{{name.length}}</p>
  <p>{{name.toUpperCase()}}</p>
  <p>{{currentUrl}}</p>
  `,
  styleUrl: './favourite-actor.component.css'
})

export class FavouriteActorComponent {
  @Input() name: string = 'John';
  @Input() lastName: string = 'Wick' ;
  @Input() favouriteFilm: string = 'John Wick';
  currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }
}
