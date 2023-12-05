import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Friend } from '../friend';

@Component({
  selector: 'app-friend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})

export class FriendComponent {

  @Input() friend!: Friend;
  detailsVisible = true;
  buttonLabel = 'Hide details';

  toggleDetails(): void {
    this.detailsVisible = !this.detailsVisible;
    this.buttonLabel = this.detailsVisible ? 'Hide details' : 'Show details';
  }
}

