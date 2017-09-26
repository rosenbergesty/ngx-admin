import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Driver } from './driver';

@Injectable()
export class DriversService {
  private driversUrl = "http://estyrosenberg.com/guma/fetch-all-drivers.php";
  private stopsUrl = "http://estyrosenberg.com/guma/fetch-stops-by-driverId2.php";
  data: Driver[];

  constructor(private http: Http) {
  }

  getDrivers() {
    return this.http.get(this.driversUrl).map((res: Response) => res.json())
  }

  getStops(driverId){
    var data = {driverId: driverId};
    return this.http.post(this.stopsUrl, JSON.stringify(data)).map((res: Response) => res.json())
  }

  getData(): Array< Driver >{

    this.getDrivers().subscribe(data=>{
      console.log(data);
      for(var i = 0; i < data.length; i++){
        this.getStops(data[i].ID).subscribe(data=>{
          console.log(data);
          this.data.push(data);
        });
      }
    });
    return this.data;
  }
}
