import { Component, OnInit } from '@angular/core';
import { TwitterService } from '@app/core/twitterservice.service';

@Component({
    selector: 'app-x-widget',
    templateUrl: './twitter-widget.component.html',
    styleUrls: ['./twitter-widget.component.scss'],
    standalone: false
})
export class TwitterWidgetComponent implements OnInit {
  myTimeline: any;
  isLoading: boolean = true;
  error: string | null = null;
  
  constructor(private api: TwitterService) {}

  ngOnInit() {
    this.getXTimeline();
  }
  
  getXTimeline(): void {
    this.isLoading = true;
    this.error = null;
    
    this.api.getTimeline().subscribe({
      next: (timeline) => {
        this.myTimeline = timeline;
        this.isLoading = false;
        console.log('X Timeline loaded:', this.myTimeline);
      },
      error: (error) => {
        this.error = 'Failed to load X timeline';
        this.isLoading = false;
        console.error('Error loading X timeline:', error);
      }
    });
  }

  trackByPostId(_index: number, post: any): string {
    return post.id;
  }
}
