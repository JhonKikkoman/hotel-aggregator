export class CreateUserDto {
  email: string;
  passwordHash: string;
  name: string;
  contactPhone?: string;
  role: 'client' | 'admin' | 'manager';
}
