import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonDetailsComponent],
  template: `
    <div *ngIf="pokemons">
      <h2>Pokemon List</h2>
      <ul>
        <li *ngFor="let pokemon of pokemons">
          {{ pokemon.name | titlecase }}
          <button (click)="selectPokemon(pokemon.name)">Details</button>
        </li>
      </ul>
      <app-pokemon-details
        *ngIf="selectedPokemon"
        [pokemonName]="selectedPokemon"
      ></app-pokemon-details>
    </div>
  `,
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  selectedPokemon: string | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe({
      next: (data) => {
        this.pokemons = data.results;
      },
      error: (error) => {
        console.error('Error loading Pokémon:', error);
      },
      complete: () => {
        console.log('Pokémon loading complete');
      },
    });
  }

  selectPokemon(name: string) {
    this.selectedPokemon = name;
  }
}
