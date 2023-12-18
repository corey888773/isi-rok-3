import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'posts', component: PostsComponent},
    {path: 'photos', component: PhotosComponent},
    {path: 'photos/:id', component: PhotoDetailsComponent },
];
