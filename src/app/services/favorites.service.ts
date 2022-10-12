import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  public favoritesIDs = [];

  public pokemonsFavorites = [];

  constructor(private restService: RestService, private storage: StorageService) { }

  getFavorites() {
    this.storage.get('favorites')
      .then((favorites) => {
        this.favoritesIDs = favorites;
        this.pokemonsFavorites = [];
        favorites.forEach((id) => {
          this.restService.getPokemonById(id).then((res) => {
            this.pokemonsFavorites.push(res);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async checkFavorite(pokemonID) {
    const alreadyFavorite = this.favoritesIDs.indexOf(pokemonID);
    if (alreadyFavorite > -1) {
      this.favoritesIDs.splice(alreadyFavorite, 1);
    } else {
      this.favoritesIDs.push(pokemonID);
    }
    return true;
  }

  async saveFavorite(pokemonID) {
    await this.checkFavorite(pokemonID);
    await this.storage.set('favorites', this.favoritesIDs)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
