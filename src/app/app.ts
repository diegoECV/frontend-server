import { Component, ViewChild, ElementRef } from '@angular/core';
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
  activeTab: 'form' | 'list' = 'form';

  // Ir a la pestaña de lista
  goToListTab(): void {
    this.activeTab = 'list';
  }

  // Ir a la pestaña de formulario
  goToFormTab(): void {
    this.activeTab = 'form';
  }
}
