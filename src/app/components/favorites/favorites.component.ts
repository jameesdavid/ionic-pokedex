import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {

  @Input() favorites = [];

  @Input() pokemons = [];

  @Output() saveFavoriteEvent = new EventEmitter<any>();

  constructor() {
  }

  saveFavorite(id) {
    this.saveFavoriteEvent.emit(id);
  }

  formatID(id) {
    return '#'+(`${id}`).padStart(3, '0');
  }

}
