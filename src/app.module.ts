import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService, TestService, AuthService } from './app.service';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/anomymous-forum', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, TestService, AuthService],
})
export class AppModule { }
