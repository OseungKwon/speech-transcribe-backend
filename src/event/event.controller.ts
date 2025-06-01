import { Controller, Sse, MessageEvent, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Sse('stream')
  streamEvents(): Observable<MessageEvent> {
    return this.eventService.getEvents().pipe(
      map(data => ({
        data,
        type: 'message',
        id: Date.now().toString(),
      })),
    );
  }
}