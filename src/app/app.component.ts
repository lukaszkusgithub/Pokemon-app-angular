import { Component } from '@angular/core';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Pokemon App</h1>
    <app-pokemon-list></app-pokemon-list>
  `,
  imports: [PokemonListComponent],
})
export class AppComponent {
  title = 'pokemon-app';
}
