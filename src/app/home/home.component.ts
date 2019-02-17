import { Component, OnInit, HostBinding } from '@angular/core';
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
export class HomeComponent implements OnInit {
  quote: string;
  isLoading: boolean;
  isDarkTheme: Observable<boolean>;

  constructor(
    private quoteService: QuoteService,
    public overlayContainer: OverlayContainer,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    //Theme
    this.isDarkTheme = this.themeService.isDarkTheme;

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
  }
}
