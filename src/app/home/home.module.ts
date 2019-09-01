import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
// Import ngx-twitter-timeline
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { TwitterWidgetComponent } from '@app/twitter-widget/twitter-widget.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CoreModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSlideToggleModule,
    OverlayModule,
    NgxTwitterTimelineModule
  ],
  declarations: [HomeComponent, TwitterWidgetComponent],
  providers: []
})
export class HomeModule {}
