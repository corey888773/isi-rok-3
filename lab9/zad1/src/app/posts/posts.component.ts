import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
  constructor(private apiService: ApiService) { }
  posts!: any[];
  newPost: any = {};

  createPost() {
    this.apiService.createPost(this.newPost).subscribe((data: any) => {
      this.posts.unshift(data);
      this.newPost = {};
    });
  }

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((data: any[]) => {
      this.posts = data;
    });
  }
}
