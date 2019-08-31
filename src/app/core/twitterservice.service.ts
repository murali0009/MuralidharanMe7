import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  api_url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTimeline() {
    return this.http.get<any[]>(this.api_url + '/home_timeline').pipe(map(data => data));
  }

  getMentions() {
    return this.http.get<any[]>(this.api_url + '/mentions_timeline').pipe(map(data => data));
  }
}
