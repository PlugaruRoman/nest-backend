import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
	Validate
} from 'class-validator'

import { IsPasswordsMatchingConstraint } from '../../libs/common/decorators/is-passwords-matching-constraint.decorator'

export class RegisterDto {
	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	@MinLength(3, { message: 'Name must be at least 3 characters' })
	@MaxLength(32, { message: 'Name must be less than 32 characters' })
	name: string

	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail({}, { message: 'Invalid email' })
	email: string

	@IsNotEmpty({ message: 'Password is required' })
	@IsString({ message: 'Password must be a string' })
	@MinLength(6, { message: 'Password must be at least 6 characters' })
	@MaxLength(32, { message: 'Password must be less than 32 characters' })
	password: string

	@IsNotEmpty({ message: 'Password confirmation is required' })
	@IsString({ message: 'Password confirmation must be a string' })
	@MinLength(6, {
		message: 'Password confirmation must be at least 6 characters'
	})
	@MaxLength(32, {
		message: 'Password confirmation must be less than 32 characters'
	})
	@Validate(IsPasswordsMatchingConstraint, {
		message: 'Passwords do not match'
	})
	passwordRepeat: string
}
