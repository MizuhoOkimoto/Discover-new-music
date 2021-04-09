import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: any;
  artist: any;
  sub: any;
  index;
  constructor(private route: ActivatedRoute, private data: MusicDataService) {
    //this.albums = albumData.albums.items;
    //this.artist = (artistData as any).default;
  }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.data
        .getArtistById(params.id)
        .subscribe((data) => (this.artist = data));

      this.sub = this.data.getAlbumsByArtistId(params.id).subscribe((data) => {
        this.albums = data.items.filter(
          (album, index, self) =>
            index === self.findIndex((c) => c.name === album.name)
        );
      });
    }); //need to change...??
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
