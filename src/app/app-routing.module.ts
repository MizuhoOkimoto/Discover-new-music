import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { NewReleasesComponent } from './new-releases/new-releases.component';

import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';

const routes: Routes = [
  { path: 'newReleases', component: NewReleasesComponent },
  { path: 'artist', component: ArtistDiscographyComponent },
  { path: 'album', component: AlbumComponent },
  { path: 'about', component: AboutComponent },
  { path: 'notFound', component: NotFoundComponent },
  { path: '', component: NewReleasesComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
