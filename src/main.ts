import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Aquí debes apuntar a tu componente standalone

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
