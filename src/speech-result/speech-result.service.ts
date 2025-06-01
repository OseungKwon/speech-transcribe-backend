import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpeechResult } from './speech-result.entity';
import { EventService } from '../event/event.service';

@Injectable()
export class SpeechResultService {
  constructor(
    @InjectRepository(SpeechResult)
    private readonly speechResultRepository: Repository<SpeechResult>,
    private readonly eventService: EventService,
  ) {}

  async create(text: string): Promise<SpeechResult> {
    const result = this.speechResultRepository.create({ text });
    const saved = await this.speechResultRepository.save(result);
    this.eventService.emitEvent({ type: 'speech-result', data: saved });
    return saved;
  }

  async findAll(): Promise<SpeechResult[]> {
    return this.speechResultRepository.find({ order: { createdAt: 'DESC' } });
  }
} 