import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TwitterWidgetComponent } from './twitter-widget/twitter-widget.component';
import { StoreModule, ReducerManager } from '@ngrx/store';
import { reducer } from './app.reducer';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        TranslateModule.forRoot(),
        NgbModule,
        CoreModule,
        ShellModule,
        HomeModule,
        AboutModule,
        MatButtonModule,
        MatCardModule,
        OverlayModule,
        MatSlideToggleModule,
        MatToolbarModule,
        AppRoutingModule, // must be imported as the last module as it contains the fallback route
        StoreModule.forRoot(reducer)], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
