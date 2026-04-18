import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListSuggestionComponent } from '../../core/list-suggestion/list-suggestion.component';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';
import { SuggestionsComponent } from './suggestions.component';

const routes: Routes = [
  {
    path: '',
    component: SuggestionsComponent,
    children: [
      { path: '', component: ListSuggestionComponent },
      { path: ':id', component: SuggestionDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule {}
