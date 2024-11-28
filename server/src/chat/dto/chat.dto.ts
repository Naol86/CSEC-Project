import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ChatDto {
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsOptional()
  chatId: number;
}

export enum Role {
  SYSTEM = 'system',
  USER = 'user',
}

export class MessageDto {
  @IsNotEmpty()
  @IsEnum(Role, { message: 'Role must be either system or user' })
  role: Role;

  @IsNotEmpty()
  content: string;
}
