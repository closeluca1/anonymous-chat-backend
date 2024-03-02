import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class TestService {
  getTest(): string {
    return 'testando rota';
  }
}

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async registerPassword(password: string): Promise<string> {
    // Verificar se a senha já existe no banco de dados
    const existingUser = await this.userModel.findOne({ password }).exec();
    if (existingUser) {
      throw new Error('Senha já registrada');
    }

    // Criptografar a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Gerar um UUID (Universally Unique Identifier)
    const publicToken = uuidv4();

    // Salvar o usuário no banco de dados
    const newUser = new this.userModel({ password: hashedPassword, publicToken });
    await newUser.save();

    return publicToken;
  }

  
}