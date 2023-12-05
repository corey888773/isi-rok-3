import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverComponent } from '../hover/hover.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HoverComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
