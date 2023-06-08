import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get("MAIL_HOST"),
          port: 465,
          logger: true,
          debug: true,
          secure: true,
          auth: {
            user: config.get("MAIL_USER"),
            pass: config.get("MAIL_PASS")
          }
        },
        defaults: {
          from: `"Dansfabrika" <${config.get("MAIL_NOREPLY")}>`
        },
        template: {
          dir: join(__dirname, '../../../src/common/mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
