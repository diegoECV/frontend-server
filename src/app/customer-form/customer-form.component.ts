import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CustomerFormComponent implements OnInit {

  customerForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cellphone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      rol: ['CUSTOMER'],
      state: ['A']
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.customerForm.invalid) {
      return;
    }

    const customer: Customer = this.customerForm.value;

    this.customerService.createCustomer(customer).subscribe({
      next: (response: Customer) => {
        this.successMessage = `¡Cliente ${response.firstName} ${response.lastName} creado correctamente! ID: ${response.id}`;
        this.customerForm.reset();
        this.submitted = false;
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'Error al crear el cliente. Verifica que el backend esté corriendo.';
      }
    });
  }
}
