import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  photos!: any[];

  ngOnInit(): void {
    this.apiService.getPhotos().subscribe((data: any[]) => {
      this.photos = data;
    });
  }
}
