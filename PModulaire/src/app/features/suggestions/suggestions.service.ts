import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Suggestion } from '../../models/suggestion';

export interface CreateSuggestionPayload {
  title: string;
  description: string;
  category: string;
  status: string;
}

interface SuggestionApiModel {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
  nbLikes: number;
}

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private readonly apiUrl = 'http://localhost:3000/suggestions';

  constructor(private readonly http: HttpClient) {}

  getSuggestions(
    onSuccess: (suggestions: Suggestion[]) => void,
    onError?: (error: unknown) => void
  ): void {
    this.http.get<SuggestionApiModel[]>(this.apiUrl).subscribe({
      next: (data) => onSuccess(data.map((item) => this.mapFromApi(item))),
      error: (error) => onError?.(error)
    });
  }

  getSuggestionById(
    id: number,
    onSuccess: (suggestion: Suggestion | undefined) => void,
    onError?: (error: unknown) => void
  ): void {
    this.http
      .get<{
        success: boolean;
        suggestion: SuggestionApiModel;
      }>(`${this.apiUrl}/${id}`)
      .subscribe({
        next: (data) => {
          if (!data?.suggestion) {
            onSuccess(undefined);
            return;
          }

          onSuccess(this.mapFromApi(data.suggestion));
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            onSuccess(undefined);
            return;
          }

          onError?.(new Error('Impossible de recuperer la suggestion.'));
        }
      });
  }

  addSuggestion(
    payload: CreateSuggestionPayload,
    onSuccess: (id: number) => void,
    onError?: (error: unknown) => void
  ): void {
    this.http
      .post<{
        success: boolean;
        id: number;
      }>(this.apiUrl, {
        title: payload.title,
        description: payload.description,
        category: payload.category,
        status: this.normalizeStatusToApi(payload.status)
      })
      .subscribe({
        next: (data) => onSuccess(data.id),
        error: (error) => onError?.(error)
      });
  }

  likeSuggestion(
    id: number,
    onSuccess?: () => void,
    onError?: (error: unknown) => void
  ): void {
    this.http.post(`${this.apiUrl}/${id}/like`, {}).subscribe({
      next: () => onSuccess?.(),
      error: (error) => onError?.(error)
    });
  }

  private mapFromApi(item: SuggestionApiModel): Suggestion {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      date: new Date(item.date),
      status: this.normalizeStatusFromApi(item.status),
      nbLikes: item.nbLikes ?? 0
    };
  }

  private normalizeStatusFromApi(status: string): string {
    const trimmedStatus = (status || '').trim().toLowerCase();
    return trimmedStatus === 'en attente' ? 'en_attente' : trimmedStatus;
  }

  private normalizeStatusToApi(status: string): string {
    return status === 'en_attente' ? 'en attente' : status;
  }
}
