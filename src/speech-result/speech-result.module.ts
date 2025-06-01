import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeechResultController } from './speech-result.controller';
import { SpeechResultService } from './speech-result.service';
import { SpeechResult } from './speech-result.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([SpeechResult]), EventModule],
  controllers: [SpeechResultController],
  providers: [SpeechResultService],
})
export class SpeechResultModule {} 