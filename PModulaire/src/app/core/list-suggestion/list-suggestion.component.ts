import { Component, OnInit } from '@angular/core';

import { Suggestion } from '../../models/suggestion';
import { SuggestionsService } from '../../features/suggestions/suggestions.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  searchText: string = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(private readonly suggestionsService: SuggestionsService) {}

  ngOnInit(): void {
    this.suggestionsService.getSuggestions(
      (suggestions) => {
        this.suggestions = suggestions;
      },
      (error) => {
        console.error(error);
        this.suggestions = [];
      }
    );
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchText.trim()) {
      return this.suggestions;
    }

    const filter = this.searchText.toLowerCase();
    return this.suggestions.filter(
      (suggestion) =>
        suggestion.title.toLowerCase().includes(filter) ||
        suggestion.category.toLowerCase().includes(filter)
    );
  }

  incrementLikes(suggestion: Suggestion): void {
    this.suggestionsService.likeSuggestion(
      suggestion.id,
      () => {
        suggestion.nbLikes++;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find((favorite) => favorite.id === suggestion.id)) {
      this.favorites.push(suggestion);
    }
  }
}
