import { Controller, Post, Body, Get } from '@nestjs/common';
import { SpeechResultService } from './speech-result.service';

@Controller('speech-result')
export class SpeechResultController {
  constructor(private readonly speechResultService: SpeechResultService) {}

  @Post()
  async receiveRecognizedText(@Body('text') text: string) {
    const saved = await this.speechResultService.create(text);
    return { success: true, id: saved.id };
  }

  @Get()
  async getAllResults() {
    return this.speechResultService.findAll();
  }
} 