import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any>;
  sub: any;

  removeFavOnClick(id) {
    this.sub = this.data
      .removeFromFavourites(id)
      .subscribe((data) => (this.favourites = data.tracks));
  }

  constructor(private data: MusicDataService) {}

  ngOnInit(): void {
    this.sub = this.data.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });

    // this.sub = this.sub.params.subscribe((params) => {
    //   this.data
    //     .removeFromFavourites(params.id)
    //     .subscribe((data) => (this.favourites = data.tracks));
    // });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
