import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
	Validate
} from 'class-validator'

export class LoginDto {
	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail({}, { message: 'Invalid email' })
	email: string

	@IsNotEmpty({ message: 'Password is required' })
	@IsString({ message: 'Password must be a string' })
	@MinLength(6, { message: 'Password must be at least 6 characters' })
	@MaxLength(32, { message: 'Password must be less than 32 characters' })
	password: string
}
