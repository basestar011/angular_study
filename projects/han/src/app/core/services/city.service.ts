import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { City, MOCK_CITY } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citySubject: BehaviorSubject<City> = new BehaviorSubject<City>({ title: '', woeid: 0 });
  private city$: Observable<City> = this.citySubject.asObservable();

  constructor(private apiService: ApiService) { }

  public fetchCity(cityName: string): Observable<City> {
    /*
    this.apiService
      .get(`/api/location/search/?query=${cityName}`)
      .subscribe(data => {
        this.citySubject.next({title: data.title, woeid: data.woeid});
      });
    */
    this.citySubject.next(this.fromJsonToCity(MOCK_CITY));

    return this.city$;
  }

  public getCurrentCity(): Observable<City> {
    return this.city$;
  }

  private fromJsonToCity(json: any): City {
    return {
      title: json.title,
      woeid: json.woeid
    } as City;
  }
}
