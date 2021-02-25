import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { skip } from 'rxjs/operators';
import { City } from '../models';
import { ApiService } from './api.service';
import { CityService } from './city.service';

describe('CityService', () => {
    let cityService: CityService;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;

    beforeEach(() => {
        const spyApiService = jasmine.createSpyObj('ApiService', ['get']);

        TestBed.configureTestingModule({
            providers: [
                CityService,
                { provide: ApiService, useValue: spyApiService },
            ]
        });

        apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
        cityService = TestBed.inject(CityService);
    });

    it('#fetchCityByName should return stub city', () => {
        const stubJson = {
            id: 'seoulB',
            title: 'Seoul',
            location_type: 'City',
            woeid: 1132599,
            latt_long: '37.557121,126.977379'
        };

        const stubCity = {
            title: 'Seoul',
            woeid: 1132599
        } as City;

        apiServiceSpy.get.and.returnValue(of(stubJson));

        const privateSpy = spyOn<any>(cityService, 'fromJsonToCity');
        cityService.fetchCityByName('Seoul')
            .pipe(skip(1))
            .subscribe(
                city => expect(city).toEqual(stubCity, 'expected stubCity')
            );

        expect(privateSpy.calls.count()).toBe(1, 'fromJsonToCity called once');
    });
});
