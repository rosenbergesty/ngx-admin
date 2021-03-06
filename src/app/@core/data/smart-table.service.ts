import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SmartTableService {
  private driversUrl = "http://estyrosenberg.com/guma/fetch-all-drivers.php";
  private stopsUrl = "http://estyrosenberg.com/guma/fetch-stops-by-driverId2.php";
  private addDriverUrl = "http://estyrosenberg.com/guma/add-driver2.php";

  constructor(private http: Http) {
  }

  // Fetch Drivers
  getDrivers() {
    return this.http.get(this.driversUrl).map((res: Response) => res.json())
  }

  // Get Stops for driver
  getStops(driverId){
    var data = {driverId: driverId};
    return this.http.post(this.stopsUrl, JSON.stringify(data)).map((res: Response) => res.json())
  }

  // Add Driver
  addDriver(name, email){
    var data = {name: name, email: email};
    return this.http.post(this.addDriverUrl, JSON.stringify(data)).map((res: Response) => res.json())
  }

}
