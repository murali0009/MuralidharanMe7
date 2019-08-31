import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterWidgetComponent } from './twitter-widget.component';

describe('TwitterWidgetComponent', () => {
  let component: TwitterWidgetComponent;
  let fixture: ComponentFixture<TwitterWidgetComponent>;

  beforeEach(async(() => {
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
