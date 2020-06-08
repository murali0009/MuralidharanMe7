import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  api_url = 'https://api.muralidharan.me/.netlify/functions/server';

  constructor(private http: HttpClient) {}

  getTimeline() {
    return this.http.get<any[]>(this.api_url + '/user_timeline').pipe(map(data => data));
  }

  getMentions() {
    return this.http.get<any[]>(this.api_url + '/mentions_timeline').pipe(map(data => data));
  }
}
