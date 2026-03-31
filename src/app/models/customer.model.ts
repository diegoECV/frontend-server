export interface Customer {
  id?: number;           // opcional porque al crear no lo tenemos
  dni: string;
  cellphone: string;
  firstName: string;
  lastName: string;
  email?: string;
  rol?: string;
  state: string;
}
