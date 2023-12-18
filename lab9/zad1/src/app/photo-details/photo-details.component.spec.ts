import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  imports: [ActivatedRoute, ApiService, CommonModule],
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  photo: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const photoId = this.route.snapshot.paramMap.get('id');
    if (!photoId) {
      return;
    }

    this.apiService.getPhoto(photoId).subscribe(photo => {
      this.photo = photo;
    });
  }
}