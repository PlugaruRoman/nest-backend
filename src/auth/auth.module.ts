import { Module } from '@nestjs/common'

import { PrismaModule } from '../prisma/prisma.module'
import { UserService } from '../user/user.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [PrismaModule],
	controllers: [AuthController],
	providers: [AuthService, UserService]
})
export class AuthModule {}
