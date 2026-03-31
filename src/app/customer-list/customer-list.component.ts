import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  selectedCustomer: Customer | null = null;

  constructor(private readonly customerService: CustomerService) { }

  ngOnInit(): void {
    console.log('🔄 Inicializando CustomerListComponent');
    this.loadCustomers();
  }

  // READ - Cargar lista de clientes
  loadCustomers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.customerService.getAllCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
        this.loading = false;
        console.log('✅ Clientes cargados:', data);
      },
      error: (err: any) => {
        console.error('❌ Error al cargar clientes:', err);
        this.errorMessage = 'Error al cargar los clientes. Verifica que el backend esté corriendo: http://50.16.194.104:8080';
        this.loading = false;
      }
    });
  }

  // DELETE - Eliminar cliente
  deleteCustomer(id: number | undefined, firstName: string, lastName: string): void {
    if (!id) return;
    
    if (confirm(`¿Estás seguro de que deseas eliminar a ${firstName} ${lastName}?`)) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.successMessage = `Cliente ${firstName} ${lastName} eliminado correctamente.`;
          this.loadCustomers(); // Recargar la lista
        },
        error: (err: any) => {
          console.error(err);
          this.errorMessage = 'Error al eliminar el cliente.';
        }
      });
    }
  }

  // Seleccionar cliente para editar
  selectCustomer(customer: Customer): void {
    this.selectedCustomer = { ...customer };
  }

  // UPDATE - Actualizar cliente
  updateCustomer(): void {
    if (!this.selectedCustomer?.id) return;

    this.customerService.updateCustomer(this.selectedCustomer.id, this.selectedCustomer).subscribe({
      next: (updated: Customer) => {
        this.successMessage = `Cliente ${updated.firstName} ${updated.lastName} actualizado correctamente.`;
        this.selectedCustomer = null;
        this.loadCustomers(); // Recargar la lista
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'Error al actualizar el cliente.';
      }
    });
  }

  // Cancelar edición
  cancelEdit(): void {
    this.selectedCustomer = null;
  }
}
