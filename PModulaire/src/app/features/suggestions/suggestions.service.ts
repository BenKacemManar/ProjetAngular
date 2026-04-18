import { Injectable } from '@angular/core';

import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private readonly suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journee team building',
      description:
        "Suggestion pour organiser une journee de team building afin de renforcer les liens entre les membres de l'equipe.",
      category: 'Evenements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Ameliorer le systeme de reservation',
      description:
        'Proposition pour ameliorer la gestion des reservations en ligne avec un systeme de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Creer un systeme de recompenses',
      description:
        "Mise en place d'un programme de recompenses pour motiver les employes et reconnaitre leurs efforts.",
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: "Moderniser l'interface utilisateur",
      description:
        "Refonte complete de l'interface utilisateur pour une meilleure experience utilisateur.",
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  getSuggestions(): Suggestion[] {
    return this.suggestions;
  }

  getSuggestionById(id: number): Suggestion | undefined {
    return this.suggestions.find((suggestion) => suggestion.id === id);
  }
}

