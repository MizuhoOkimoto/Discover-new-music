import { Component, OnInit } from '@angular/core';
import * as data from '../data/SearchResultsAlbum.json';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album;
  constructor() {
    this.album = (data as any).default;
  }

  ngOnInit(): void {}
}
