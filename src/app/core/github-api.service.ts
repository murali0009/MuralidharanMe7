import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GitHubApiService {
  private readonly baseUrl = 'https://api.github.com';
  private readonly username = 'murali0009'; // GitHub username

  constructor(private http: HttpClient) {}

  getRepositories(limit: number = 6): Observable<GitHubRepository[]> {
    const url = `${this.baseUrl}/users/${this.username}/repos`;
    
    return this.http.get<GitHubRepository[]>(url, {
      params: {
        sort: 'updated',
        per_page: limit.toString()
      }
    }).pipe(
      map(repos => repos.filter(repo => !repo.name.startsWith('.'))), // Filter out dotfiles repos
      catchError(error => {
        console.error('Error fetching GitHub repositories:', error);
        // Return mock data if API fails
        return of(this.getMockRepositories());
      })
    );
  }

  private getMockRepositories(): GitHubRepository[] {
    return [
      {
        id: 1,
        name: 'angular-portfolio',
        full_name: 'murali0009/angular-portfolio',
        description: 'Personal portfolio website built with Angular 20 and Material Design',
        html_url: 'https://github.com/murali0009/angular-portfolio',
        language: 'TypeScript',
        stargazers_count: 15,
        forks_count: 3,
        updated_at: '2025-01-15T10:30:00Z',
        topics: ['angular', 'typescript', 'portfolio', 'material-design']
      },
      {
        id: 2,
        name: 'iot-sensor-dashboard',
        full_name: 'murali0009/iot-sensor-dashboard',
        description: 'Real-time IoT sensor data dashboard built with .NET Core and SignalR',
        html_url: 'https://github.com/murali0009/iot-sensor-dashboard',
        language: 'C#',
        stargazers_count: 28,
        forks_count: 7,
        updated_at: '2024-12-20T14:45:00Z',
        topics: ['iot', 'dotnet-core', 'signalr', 'dashboard']
      },
      {
        id: 3,
        name: 'cloud-deployment-scripts',
        full_name: 'murali0009/cloud-deployment-scripts',
        description: 'Automated deployment scripts for Azure and AWS cloud platforms',
        html_url: 'https://github.com/murali0009/cloud-deployment-scripts',
        language: 'Shell',
        stargazers_count: 12,
        forks_count: 4,
        updated_at: '2024-11-10T09:15:00Z',
        topics: ['azure', 'aws', 'deployment', 'devops']
      },
      {
        id: 4,
        name: 'xamarin-mobile-app',
        full_name: 'murali0009/xamarin-mobile-app',
        description: 'Cross-platform mobile application built with Xamarin.Forms',
        html_url: 'https://github.com/murali0009/xamarin-mobile-app',
        language: 'C#',
        stargazers_count: 22,
        forks_count: 8,
        updated_at: '2024-10-25T16:20:00Z',
        topics: ['xamarin', 'mobile', 'cross-platform', 'csharp']
      },
      {
        id: 5,
        name: 'python-data-analysis',
        full_name: 'murali0009/python-data-analysis',
        description: 'Data analysis and visualization tools using Python and Pandas',
        html_url: 'https://github.com/murali0009/python-data-analysis',
        language: 'Python',
        stargazers_count: 18,
        forks_count: 5,
        updated_at: '2024-09-30T11:40:00Z',
        topics: ['python', 'data-analysis', 'pandas', 'visualization']
      },
      {
        id: 6,
        name: 'flutter-weather-app',
        full_name: 'murali0009/flutter-weather-app',
        description: 'Beautiful weather application built with Flutter',
        html_url: 'https://github.com/murali0009/flutter-weather-app',
        language: 'Dart',
        stargazers_count: 31,
        forks_count: 9,
        updated_at: '2024-08-15T13:25:00Z',
        topics: ['flutter', 'dart', 'weather', 'mobile']
      }
    ];
  }
}