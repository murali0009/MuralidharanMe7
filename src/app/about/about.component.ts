import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: false
})
export class AboutComponent implements OnInit {
  version: string = environment.version;

  constructor() {}

  ngOnInit() {}
}
