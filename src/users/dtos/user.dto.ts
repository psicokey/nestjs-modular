import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'Email del usuario' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'Contraseña del usuario' })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Rol del usuario' })
  readonly role: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'ID del cliente asociado al usuario',
    required: false,
  })
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
