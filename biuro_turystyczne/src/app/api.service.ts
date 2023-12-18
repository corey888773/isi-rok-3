import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from './trip';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient : HttpClient) { }

  public getTrips(): Observable<Trip[]> {
    // load trips from assets/trips.json
    return this.httpClient.get<Trip[]>('assets/trips.json');
  }

  public removeTrip(trip: Trip) {
    return this.getTrips().pipe(
      // filter out the trip to be removed
      map((trips: Trip[]) => trips.filter(t => t.name !== trip.name)),
      // save the new array of trips
      tap((trips: Trip[]) => this.saveTrips(trips))
    );
  }

  public addTrip(trip: Trip) {
    return this.getTrips().pipe(
      // add the new trip to the array
      map((trips: Trip[]) => trips.concat(trip)),
      // save the new array of trips
      tap((trips: Trip[]) => this.saveTrips(trips))
    );
  }

  public saveTrips(trips: Trip[]) {
    // save the trips to local storage
    localStorage.setItem('trips', JSON.stringify(trips));
  }
}
