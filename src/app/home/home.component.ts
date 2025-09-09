import { Component, OnInit, HostBinding, Input, Output, AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { ThemeService } from '@app/core/theme.sevice';
import { GitHubApiService, GitHubRepository } from '@app/core';

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
  activeTab: string = 'home';
  repositories: GitHubRepository[] = [];
  repositoriesLoading: boolean = false;

  constructor(
    public overlayContainer: OverlayContainer, 
    private themeService: ThemeService,
    private githubService: GitHubApiService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.checked = false;
    //Theme
    this.isDarkTheme = this.themeService.isDarkTheme;
    // Load GitHub repositories
    this.loadGitHubRepositories();
  }

  loadGitHubRepositories() {
    this.repositoriesLoading = true;
    this.githubService.getRepositories(6).subscribe({
      next: (repos) => {
        this.repositories = repos;
        this.repositoriesLoading = false;
      },
      error: (error) => {
        console.error('Error loading GitHub repositories:', error);
        this.repositoriesLoading = false;
      }
    });
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  ngAfterViewInit(): void {
    // @ts-ignore
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
