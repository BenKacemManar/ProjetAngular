import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SuggestionsService } from '../suggestions.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent {
  readonly categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  private readonly systemDate = new Date();
  readonly statusLabel = 'en attente';
  readonly dateLabel = formatDate(this.systemDate, 'dd/MM/yyyy', 'en-US');

  readonly suggestionForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly suggestionsService: SuggestionsService,
    private readonly router: Router
  ) {
    this.suggestionForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^[A-Z][a-zA-Z]*$/)
        ]
      ],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: this.dateLabel, disabled: true }],
      status: [{ value: this.statusLabel, disabled: true }]
    });
  }

  get titleControl() {
    return this.suggestionForm.get('title');
  }

  get descriptionControl() {
    return this.suggestionForm.get('description');
  }

  get categoryControl() {
    return this.suggestionForm.get('category');
  }

  onSubmit(): void {
    if (this.suggestionForm.invalid) {
      this.suggestionForm.markAllAsTouched();
      return;
    }

    const formValue = this.suggestionForm.getRawValue();

    this.suggestionsService.addSuggestion({
      title: formValue.title,
      description: formValue.description,
      category: formValue.category,
      date: new Date(this.systemDate),
      status: 'en_attente'
    });

    this.router.navigate(['/suggestions']);
  }
}
