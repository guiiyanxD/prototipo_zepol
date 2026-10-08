export class Client {
  constructor(
    public readonly id: string,
    public email: string,
    public contactName: string,
    public companyName: string | null
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.email || !this.email.includes('@')) {
      throw new Error('El correo electrónico proporcionado es inválido.');
    }
    if (!this.contactName || this.contactName.trim() === '') {
      throw new Error('El nombre de contacto es obligatorio.');
    }
  }
}
