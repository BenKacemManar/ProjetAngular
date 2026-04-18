import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListSuggestionComponent } from '../../core/list-suggestion/list-suggestion.component';
import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';

@NgModule({
  declarations: [
    SuggestionsComponent,
    ListSuggestionComponent,
    SuggestionDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SuggestionsRoutingModule
  ]
})
export class SuggestionsModule {}
