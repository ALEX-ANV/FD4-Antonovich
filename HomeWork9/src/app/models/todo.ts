import {isNumber} from 'util';

export class Todo {
  public id: number;
  public complete: boolean;
  public title: string;
  public date: Date;

  constructor(values: object = {}) {
    Object.assign(this, values);
    if (!values.hasOwnProperty('id') && !isNumber(this.id)) {
      this.id = new Date().getTime();
    }
    if (values.hasOwnProperty('date')) {
      // @ts-ignore
      this.date = new Date(values.date);
    }
  }
}
