import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  // X API v2 endpoints
  private xApiBaseUrl = 'https://api.twitter.com/2';
  
  // For now, using mock data since X API requires authentication
  // In a real implementation, you'd need to set up a backend with proper X API credentials
  constructor(private http: HttpClient) {}

  getTimeline(): Observable<any> {
    // Since direct calls to X API require authentication, we'll use mock data
    // In production, this should go through your backend API that handles X authentication
    const mockData = {
      data: [
        {
          id: '1',
          text: 'Excited to share my latest project using Angular 20 and Material Design! 🚀 #Angular #WebDevelopment',
          created_at: '2025-01-15T10:30:00.000Z',
          author_id: '12345',
          user: {
            name: 'Muralidharan Nandakumar',
            username: 'muralidharan10',
            profile_image_url: 'https://via.placeholder.com/48x48/1DA1F2/ffffff?text=M',
            created_at: '2025-01-15T10:30:00.000Z',
            location: 'India'
          }
        },
        {
          id: '2',
          text: 'Just updated my portfolio with dark theme support! The CSS custom properties approach works beautifully. 🌙 #CSS #DarkMode',
          created_at: '2025-01-14T15:45:00.000Z',
          author_id: '12345',
          user: {
            name: 'Muralidharan Nandakumar',
            username: 'muralidharan10',
            profile_image_url: 'https://via.placeholder.com/48x48/1DA1F2/ffffff?text=M',
            created_at: '2025-01-14T15:45:00.000Z',
            location: 'India'
          }
        },
        {
          id: '3',
          text: 'Working with the latest ng-bootstrap and Angular Material updates. The migration process was smoother than expected! 💪 #Angular #Bootstrap',
          created_at: '2025-01-13T09:20:00.000Z',
          author_id: '12345',
          user: {
            name: 'Muralidharan Nandakumar',
            username: 'muralidharan10',
            profile_image_url: 'https://via.placeholder.com/48x48/1DA1F2/ffffff?text=M',
            created_at: '2025-01-13T09:20:00.000Z',
            location: 'India'
          }
        }
      ],
      meta: {
        result_count: 3
      }
    };

    return of(mockData);
  }

  getMentions(): Observable<any> {
    // Mock mentions data
    const mockMentions = {
      data: [
        {
          id: '4',
          text: '@muralidharan10 Great work on the Angular project! Really impressive implementation.',
          created_at: '2025-01-15T12:00:00.000Z',
          author_id: '67890',
          user: {
            name: 'Fellow Developer',
            username: 'devfriend',
            profile_image_url: 'https://via.placeholder.com/48x48/1DA1F2/ffffff?text=D',
            created_at: '2025-01-15T12:00:00.000Z'
          }
        }
      ],
      meta: {
        result_count: 1
      }
    };

    return of(mockMentions);
  }

  // Method to get real X data when backend is available
  private getRealXTimeline(): Observable<any> {
    // This would be used when you have a backend that handles X API authentication
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_BEARER_TOKEN',
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.xApiBaseUrl}/users/by/username/muralidharan10/tweets`, {
      headers,
      params: {
        'tweet.fields': 'created_at,author_id,public_metrics',
        'user.fields': 'name,username,profile_image_url,location',
        'expansions': 'author_id'
      }
    }).pipe(
      map(data => data),
      catchError(error => {
        console.error('Error fetching X timeline:', error);
        return of(null);
      })
    );
  }
}
