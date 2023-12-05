import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendComponent } from '../friend/friend.component';
import { Friend } from '../friend';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FriendComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  friendsList: Friend[] = [
    {
      imie: 'Katrzyna',
      nazwisko: 'Butor',
      numer: '534052847',
      email: 'katrzyna.butor@student.pk.edu.pl'
    },
    {
      imie: 'Tomasz',
      nazwisko: 'Makowski',
      numer: '123456789',
      email: 'makowskit@student.agh.edu.pl'
    },
    {
      imie: 'Maciej',
      nazwisko: 'Pieniążek',
      numer: '987654321',
      email: 'pieniazekm@student.agh.edu.pl'
    },
];
}

