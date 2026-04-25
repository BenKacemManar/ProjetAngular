import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Suggestion } from '../../../models/suggestion';
import { SuggestionsService } from '../suggestions.service';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrl: './suggestion-detail.component.css'
})
export class SuggestionDetailComponent implements OnInit {
  suggestion?: Suggestion;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly suggestionsService: SuggestionsService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(id)) {
      this.suggestion = undefined;
      return;
    }

    try {
      this.suggestion = await this.suggestionsService.getSuggestionById(id);
    } catch (error) {
      console.error(error);
      this.suggestion = undefined;
    }
  }
}
