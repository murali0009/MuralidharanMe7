import { Component, OnInit, HostBinding, Input, Output, AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { ThemeService } from '@app/core/theme.sevice';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit {
  quote: string;
  isLoading: boolean;
  isDarkTheme: Observable<boolean>;
  themeString: string;
  checked: boolean;
  myTimeline: any;

  constructor(public overlayContainer: OverlayContainer, private themeService: ThemeService) {}

  ngOnInit() {
    this.isLoading = true;
    this.checked = false;
    //Theme
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  ngAfterViewInit(): void {
    // @ts-ignore
  }
}
