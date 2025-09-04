import { Component, OnInit } from '@angular/core';
import { TwitterService } from '@app/core/twitterservice.service';
import { ThemeService } from '@app/core/theme.sevice';

@Component({
    selector: 'app-twitter-widget',
    templateUrl: './twitter-widget.component.html',
    styleUrls: ['./twitter-widget.component.scss'],
    standalone: false
})
export class TwitterWidgetComponent implements OnInit {
  myTimeline: any;
  pictureDarkUrl: string;
  pictureLightUrl: string;
  
  constructor(private api: TwitterService, private theme: ThemeService) {}

  ngOnInit() {
    // this.getTwitterTimeline(); // Commented out to avoid API errors during build
    this.pictureDarkUrl = '/assets/Twitter_Logo_Dark.png';
    this.pictureLightUrl = '/assets/Twitter_Logo_Light.png';
  }
  
  getTwitterTimeline(): void {
    this.api.getTimeline().subscribe({
      next: (myTimeline) => {
        this.myTimeline = myTimeline;
        console.log(this.myTimeline);
      },
      error: (error) => {
        console.error('Error fetching timeline:', error);
        this.myTimeline = { data: [] }; // Fallback to empty data
      }
    });
  }
}
