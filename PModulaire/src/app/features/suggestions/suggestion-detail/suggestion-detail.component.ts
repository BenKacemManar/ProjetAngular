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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.suggestion = this.suggestionsService.getSuggestionById(id);
    });
  }
}

