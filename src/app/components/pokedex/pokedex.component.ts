import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { RestService } from './../../services/rest.service';
import { StorageService } from '../../services/storage.service';
import { Pokemons } from '../../classes/pokemons';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {

  @Input() favorites = [];

  @Output() saveFavoriteEvent = new EventEmitter<any>();

  pokemons: Pokemons;

  pokemonsDetailed;

  page = 0;

  pageMax = 38;

  limit = 30;

  offset = 0;

  pokemonsSubscribe: Subscription;

  constructor(private restService: RestService, private storage: StorageService) { }

  ngOnInit() {
    this.getPokemons();
  }

  pageBack() {
    if (this.page > 0) {
      this.page -= 1;
    };
    this.offset = this.page * this.limit;
    this.getPokemons();
  }

  pageForward() {
    if (this.page < this.pageMax) {
      this.page += 1;
    }
    this.offset = this.page * this.limit;
    this.getPokemons();
  }

  getPokemons() {
    this.restService.pokemonGetAll(this.offset, this.limit).subscribe((pokemons: Pokemons) => {
      this.pokemons = pokemons;
      this.detailPokemons();
    });
  }

  async detailPokemons() {
    const pokemonsPromise = this.pokemons.results.map(async (pokemon) => {
      let poke;
      await this.restService.getPokemon(pokemon.url).then((res) => poke = res);
      return poke;
    });
    this.pokemonsDetailed = await Promise.all(pokemonsPromise);
    console.log(this.pokemonsDetailed);
  }

  saveFavorite(id) {
    this.saveFavoriteEvent.emit(id);
  }

  formatID(id) {
    return '#'+(`${id}`).padStart(3, '0');
  }

  verifyIfIsFavorite(id) {
    return this.favorites.includes(id) ? 'heart' : 'heart-outline';
  }

}
