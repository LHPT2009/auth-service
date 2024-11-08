import { Module } from '@nestjs/common';
import { RefreshtokenController } from './refreshtoken.controller';
import { RefreshtokenService } from './refreshtoken.service';
import { RefreshtokenEntity } from './entity/refreshtoken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshtokenRepository } from './refreshtoken.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshtokenEntity]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE_GRPC',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: './protos/auth.proto',
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [RefreshtokenController],
  providers: [RefreshtokenService, RefreshtokenRepository],
  exports: [RefreshtokenService, RefreshtokenRepository]
})
export class RefreshtokenModule { }
