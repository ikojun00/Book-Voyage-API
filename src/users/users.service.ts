import { Injectable } from '@nestjs/common';

interface User {
  userId: number;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'bla@gmail.com',
      password: '123',
    },
    {
      userId: 2,
      email: 'alb@gmail.com',
      password: '123',
    },
  ];
  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
