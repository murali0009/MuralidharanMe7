import { Component, OnInit, HostBinding, Input, Output, AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { ThemeService } from '@app/core/theme.sevice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  quote: string;
  isLoading: boolean;
  isDarkTheme: Observable<boolean>;
  themeString: string;
  optionString: [
    {
      /**
       * Render a timeline statically, displaying only n number of Tweets.
       * Range: 1-20
       */
      tweetLimit?: number;
      /**
       * Set a fixed height of the embedded widget
       * Positive integer
       */
      height?: number;
      /**
       * Adjust the color of borders inside the widget.
       * Hexadecimal color
       */
      borderColor?: string;
      /**
       * Sets the theme of the widget. Default = 'light'.
       * 'light' or 'dark'
       */
      theme?: string;
      /**
       * Toggle the display of design elements in the widget. This parameter is a space-separated list of values
       * Values: noheader, nofooter, noborders, transparent, noscrollbar
       */
      chrome?: string[];
      /**
       * Apply the specified aria-polite behavior to the rendered timeline.
       * New Tweets may be added to the top of a timeline, affecting screen readers
       * Values: polite, assertive, rude
       */
      ariaPolite?: string[];
    }
  ];

  constructor(
    private quoteService: QuoteService,
    public overlayContainer: OverlayContainer,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    //Theme
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.themeString = 'dark';
    this.optionString = [{ tweetLimit: 5, theme: 'dark' }];
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    if (checked == false) {
      this.themeString = 'dark';
      this.optionString = [{ tweetLimit: 5, theme: 'dark' }];
    } else {
      this.themeString = 'light';
      this.optionString = [{ tweetLimit: 5, theme: 'light' }];
    }
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    twttr.widgets.load();
  }
}
