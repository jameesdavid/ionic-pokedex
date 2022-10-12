import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  favorites = [];

  pokemons = [];

  constructor(private restService: RestService, private storage: StorageService) {
  }

  ionViewWillEnter() {
    this.getFavorites();
  }

  getFavorites() {
    this.storage.get('favorites')
      .then((favorites) => {
        this.favorites = favorites;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async checkFavorite(pokemonID) {
    const alreadyFavorite = this.favorites.indexOf(pokemonID);
    if (alreadyFavorite > -1) {
      this.favorites.splice(alreadyFavorite, 1);
    } else {
      this.favorites.push(pokemonID);
    }
    return true;
  }

  async saveFavorite(pokemonID) {
    await this.checkFavorite(pokemonID);
    await this.storage.set('favorites', this.favorites)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
