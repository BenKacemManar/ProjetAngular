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

  async ngOnInit(): Promise<void> {
    try {
      this.suggestions = await this.suggestionsService.getSuggestions();
    } catch (error) {
      console.error(error);
      this.suggestions = [];
    }
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

  async incrementLikes(suggestion: Suggestion): Promise<void> {
    try {
      await this.suggestionsService.likeSuggestion(suggestion.id);
      suggestion.nbLikes++;
    } catch (error) {
      console.error(error);
    }
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find((favorite) => favorite.id === suggestion.id)) {
      this.favorites.push(suggestion);
    }
  }
}
