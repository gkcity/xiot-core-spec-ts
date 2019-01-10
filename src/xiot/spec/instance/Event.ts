import {EventType} from '../definition/urn/EventType';

export class Event {
  public iid: number = 0;
  public type: EventType | null = null;
  public description: string = '';
  public arguments: Number[] = [];
}
