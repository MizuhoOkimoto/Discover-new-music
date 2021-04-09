import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  //favouritesList: Array<any> = []; delete for A6
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id: String): Observable<SpotifyApi.SingleArtistResponse> {
    const url = `https://api.spotify.com/v1/artists/${id}`;
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(
    id: String
  ): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    const url = `https://api.spotify.com/v1/artists/${id}/albums`;
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(url, {
          params: { include_groups: `album,single`, limit: `50` },
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumById(id: String): Observable<SpotifyApi.SingleAlbumResponse> {
    const url = `https://api.spotify.com/v1/albums/${id}`;
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(searchString): Observable<SpotifyApi.ArtistSearchResponse> {
    const params = new HttpParams()
      .set('q', searchString)
      .set('type', 'artist')
      .set('limit', '50');
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          // `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
          `https://api.spotify.com/v1/search`,
          { params, headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  //changed
  addToFavourites(id): Observable<[String]> {
    return this.http.put<any>(
      `${environment.userAPIBase}/favourites/${id}`,
      id
    );
  }

  //changed -- use pipe!
  removeFromFavourites(id): Observable<any> {
    return this.http
      .delete<[String]>(`${environment.userAPIBase}/favourites/${id}`)
      .pipe(
        mergeMap((favouritesArray) => {
          if (favouritesArray.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>(
                  `https://api.spotify.com/v1/tracks?ids=${favouritesArray}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
              })
            );
          }
          return new Observable((o) => {
            o.next({ tracks: [] });
          });
        })
      );
  }

  //changed
  getFavourites(): Observable<any> {
    return this.http
      .get<[String]>(`${environment.userAPIBase}/favourites`)
      .pipe(
        mergeMap((favouritesArray) => {
          if (favouritesArray.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>(
                  `https://api.spotify.com/v1/tracks?ids=${favouritesArray}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
              })
            );
          }
          return new Observable((o) => {
            o.next({ tracks: [] });
          });
        })
      );
  }
}
