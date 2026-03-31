import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timeout } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly apiUrl = 'http://34.235.43.58:8080/api/customers';   // ← Cambia esto después por la IP del backend

  // Datos de prueba (mock data)
  private readonly mockCustomers: Customer[] = [
    {
      id: 1,
      dni: '12345678',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      cellphone: '987654321',
      rol: 'CUSTOMER',
      state: 'A'
    },
    {
      id: 2,
      dni: '87654321',
      firstName: 'María',
      lastName: 'García',
      email: 'maria.garcia@example.com',
      cellphone: '912345678',
      rol: 'ADMIN',
      state: 'A'
    },
    {
      id: 3,
      dni: '45678912',
      firstName: 'Carlos',
      lastName: 'López',
      email: 'carlos.lopez@example.com',
      cellphone: '923456789',
      rol: 'CUSTOMER',
      state: 'I'
    }
  ];

  constructor(private readonly http: HttpClient) { }

  // READ - Obtener todos los clientes
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl).pipe(
      timeout(5000), // Timeout de 5 segundos
      catchError(() => {
        console.warn('⚠️ Backend no disponible. Cargando datos de prueba...');
        return of(this.mockCustomers);
      })
    );
  }

  // READ - Obtener cliente por ID
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  // CREATE - Crear nuevo cliente
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  // UPDATE - Actualizar cliente existente
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  // DELETE - Eliminar cliente
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
