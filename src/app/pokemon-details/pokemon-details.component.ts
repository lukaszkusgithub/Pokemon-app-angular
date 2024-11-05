import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="pokemon">
      <h2>{{ pokemon.name | titlecase }}</h2>
      <img [src]="pokemon.sprites.front_default" alt="{{ pokemon.name }}" />
      <p>Height: {{ pokemon.height }}</p>
      <p>Weight: {{ pokemon.weight }}</p>
      <p>
        Type:
        <span *ngFor="let type of pokemon.types; let last = last">
          {{ type.type.name }}<span *ngIf="!last">, </span>
        </span>
      </p>
      <button (click)="closeDetails()">Zamknij</button>
    </div>
  `,
})
export class PokemonDetailsComponent implements OnInit, OnChanges {
  @Input() pokemonName!: string;
  pokemon: any;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemonDetails();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonName'] && this.pokemonName) {
      this.loadPokemonDetails();
    }
  }

  loadPokemonDetails() {
    if (this.pokemonName) {
      this.pokemonService.getPokemonDetails(this.pokemonName).subscribe({
        next: (data) => {
          this.pokemon = data;
        },
        error: (error) => {
          console.error('Error loading Pokémon details:', error);
        },
      });
    }
  }

  closeDetails() {
    this.pokemon = null;
  }
}
