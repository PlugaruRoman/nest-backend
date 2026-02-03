import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RedisStore } from 'connect-redis'
import * as cookieParser from 'cookie-parser'
import 'dotenv/config'
import * as session from 'express-session'
import { createClient } from 'redis'

import { AppModule } from './app.module.js'
import { ms, StringValue } from './libs/common/utils/ms.utils'
import { parseBoolean } from './libs/common/utils/parse-boolean.utils'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService)
	const redis = createClient({
		url: configService.getOrThrow<string>('REDIS_URI')
	})
	await redis.connect()

	app.use(
		cookieParser.default(configService.getOrThrow<string>('COOKIES_SECRET'))
	)

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	app.use(
		session.default({
			secret: configService.getOrThrow<string>('SESSION_SECRET'),
			name: configService.getOrThrow<string>('SESSION_NAME'),
			resave: true,
			saveUninitialized: true,
			cookie: {
				domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
				maxAge: ms(
					configService.getOrThrow<StringValue>('SESSION_MAX_AGE')
				),
				httpOnly: parseBoolean(
					configService.getOrThrow<string>('SESSION_HTTP_ONLY')
				),
				secure: parseBoolean(
					configService.getOrThrow<string>('SESSION_SECURE')
				),
				sameSite: 'lax'
			},
			store: new RedisStore({
				client: redis,
				prefix: configService.getOrThrow<string>('SESSION_FOLDER')
			})
		})
	)

	app.enableCors({
		origin: configService.getOrThrow<string>('ALLOWED_ORIGINS'),
		credentials: true,
		exposedHeaders: ['Set-Cookie']
	})

	await app.listen(configService.getOrThrow<number>('APPLICATION_PORT'))
}
bootstrap()
