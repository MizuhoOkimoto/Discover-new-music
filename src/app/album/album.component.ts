import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  sub: any;
  param: any;

  //double check!
  addToFavourites(trackID) {
    this.sub = this.data.addToFavourites(trackID).subscribe(
      (success) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (error) => {
        this.snackBar.open('Unable to add song to Favourites', 'Close', {
          duration: 1500,
        });
      }
    );
  }

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private data: MusicDataService
  ) {
    //this.album = (data as any).default;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.data
        .getAlbumById(params.id)
        .subscribe((data) => (this.album = data));
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
