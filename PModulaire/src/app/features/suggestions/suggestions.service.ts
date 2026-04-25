import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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

  async getSuggestions(): Promise<Suggestion[]> {
    const data = await firstValueFrom(
      this.http.get<SuggestionApiModel[]>(this.apiUrl)
    );
    return data.map((item) => this.mapFromApi(item));
  }

  async getSuggestionById(id: number): Promise<Suggestion | undefined> {
    try {
      const data = await firstValueFrom(
        this.http.get<{
          success: boolean;
          suggestion: SuggestionApiModel;
        }>(`${this.apiUrl}/${id}`)
      );

      if (!data?.suggestion) {
        return undefined;
      }

      return this.mapFromApi(data.suggestion);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return undefined;
      }
      throw new Error('Impossible de recuperer la suggestion.');
    }
  }

  async addSuggestion(payload: CreateSuggestionPayload): Promise<number> {
    const data = await firstValueFrom(
      this.http.post<{
        success: boolean;
        id: number;
      }>(this.apiUrl, {
        title: payload.title,
        description: payload.description,
        category: payload.category,
        status: this.normalizeStatusToApi(payload.status)
      })
    );

    return data.id;
  }

  async likeSuggestion(id: number): Promise<void> {
    await firstValueFrom(this.http.post(`${this.apiUrl}/${id}/like`, {}));
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
