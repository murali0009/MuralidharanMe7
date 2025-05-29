import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TwitterWidgetComponent } from './twitter-widget.component';

describe('TwitterWidgetComponent', () => {
  let component: TwitterWidgetComponent;
  let fixture: ComponentFixture<TwitterWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterWidgetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
