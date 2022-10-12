import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pokemons } from '../classes/pokemons';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  pokemons: Pokemons;

  constructor(private http: HttpClient) { }

  pokemonGetAll(offset: number, limit: number) {
    return this.http.get(`${environment.api}pokemon/?offset=${offset}&limit=${limit}`);
  }

  async getPokemon(url) {
    return await this.http.get(url).toPromise();
  }

  getPokemonById(id) {
    return this.http.get(`${environment.api}pokemon/${id}`).toPromise();
  }
}
