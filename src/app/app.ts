import { Component } from '@angular/core';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [CustomerFormComponent, CustomerListComponent]
})
export class App {
  title = 'frontend';
}
