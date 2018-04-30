import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  template: `
    <nav class="navbar fixed-bottom navbar-expand navbar-light bg-light">
      <div class="navbar-text m-auto">
        <i class="fa fa-copyright"></i> 2018 Angular 5 Examples, all rights reserved
      </div>
    </nav>
  `,
  styles: []
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
