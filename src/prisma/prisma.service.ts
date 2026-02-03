import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../../prisma/__generated__/client'

const connectionString = String(
	process.env.DATABASE_URL ?? process.env.POSTGRES_URI ?? ''
)
if (!connectionString || connectionString === 'undefined') {
	throw new Error(
		'DATABASE_URL or POSTGRES_URI must be set in the environment (ensure .env is loaded before PrismaModule)'
	)
}
const adapter = new PrismaPg({ connectionString })

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor() {
		super({ adapter })
	}

	public async onModuleInit() {
		await this.$connect()
	}

	public async onModuleDestroy() {
		await this.$disconnect()
	}
}
