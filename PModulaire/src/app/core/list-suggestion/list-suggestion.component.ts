import { Component } from '@angular/core';

import { Suggestion } from '../../models/suggestion';
import { SuggestionsService } from '../../features/suggestions/suggestions.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {
  searchText: string = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(private readonly suggestionsService: SuggestionsService) {
    this.suggestions = this.suggestionsService.getSuggestions();
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
    suggestion.nbLikes++;
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find((favorite) => favorite.id === suggestion.id)) {
      this.favorites.push(suggestion);
    }
  }
}
