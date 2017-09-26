import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let counter = 0;

@Injectable()
export class UserService {

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png', initial: 'N' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png', initial: 'E' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png', initial: 'J' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png', initial: 'L' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png', initial: 'A' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png', initial: 'K' },
  };

  private userArray: any[];

  constructor() {
    // this.userArray = Object.values(this.users);
  }

  getUsers(): Observable<any> {
    return Observable.of(this.users);
  }

  getUserArray(): Observable<any[]> {
    return Observable.of(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return Observable.of(this.userArray[counter]);
  }
}
