import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: 
          `<header></header>
            <div class="container mainContent">
              <router-outlet></router-outlet>
            </div>
          <footer></footer>
        `,
  styles: []
})
export class AppComponent {
  title = 'E2E-Testing';
}
