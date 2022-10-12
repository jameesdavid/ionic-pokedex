import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  favorites = [];

  pokemons = [];

  constructor(private restService: RestService, private storage: StorageService, private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.getFavorites();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      id: 'loading'
    });
    return loading.present();
  }

  async dismissLoading() {
    const overlayTop = await this.loadingCtrl.getTop();
    if (overlayTop) {
      this.loadingCtrl.dismiss({}, '', 'loading');
    }
  }

  async getFavorites() {
    await this.showLoading();
    await this.storage.get('favorites')
      .then(async (favorites) => {
        this.favorites = favorites;
        this.pokemons = [];
        await favorites.forEach((id) => {
          this.restService.getPokemonById(id).then((res) => {
            this.pokemons.push(res);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.dismissLoading();
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
        this.getFavorites();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  formatID(id) {
    return '#'+(`${id}`).padStart(3, '0');
  }

}
