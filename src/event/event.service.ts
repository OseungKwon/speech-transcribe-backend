import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class EventService {
  private events = new Subject<any>();

  getEvents() {
    return this.events.asObservable();
  }

  // 이벤트 발생시키는 메서드
  emitEvent(data: any) {
    this.events.next(data);
  }
}