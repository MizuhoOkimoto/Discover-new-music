import { Component, OnInit } from '@angular/core';

import * as albumData from '../data/SearchResultsAlbums.json';
import * as artistData from '../data/SearchResultsArtist.json';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  albums;
  artist;
  constructor() {
    this.albums = albumData.albums.items;
    this.artist = (artistData as any).default;
  }

  ngOnInit(): void {}
}
