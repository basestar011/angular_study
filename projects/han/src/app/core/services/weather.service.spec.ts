import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherCondition } from '../enums';
import { Weather } from '../models';
import { ApiService } from './api.service';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
    let weatherService: WeatherService;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;

    beforeEach(() => {
        const spyApiService = jasmine.createSpyObj('ApiService', ['get']);

        TestBed.configureTestingModule({
            providers: [
                WeatherService,
                { provide: ApiService, useValue: spyApiService }
            ]
        });

        weatherService = TestBed.inject(WeatherService);
        apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    });

    it('#fetchWeather should return stub weather', () => {
        const stubJson = {
            id: 1132599,
            consolidated_weather: [
                {
                    id: 5967800922275840,
                    weather_state_name: 'Clear',
                    weather_state_abbr: 'c',
                    wind_direction_compass: 'WNW',
                    created: '2021-01-16T09:30:38.077081Z',
                    applicable_date: '2021-01-16',
                    min_temp: -8.11,
                    max_temp: -1.465,
                    the_temp: -2.4549999999999996,
                    wind_speed: 5.2968422894032186,
                    wind_direction: 292.83272289145475,
                    air_pressure: 1026.0,
                    humidity: 63,
                    visibility: 14.417054402290622,
                    predictability: 68
                }
            ],
            title: 'Seoul',
            location_type: 'City',
            woeid: 1132599,
            latt_long: '37.557121,126.977379',
            timezone: 'Asia/Seoul'
        };

        const stubWeather = {
            condition: WeatherCondition.clear,
            formattedCondition: 'Clear',
            abbreviationCondition: 'c',
            temp: -2.4549999999999996,
            minTemp: -8.11,
            maxTemp: -1.465,
            locationId: 1132599,
            lastUpdated: new Date(),
            location: 'Seoul'
        } as Weather;

        apiServiceSpy.get.and.returnValue(of(stubJson));

        const privateFromJsonToWeatherSpy = spyOn<any>(weatherService, 'fromJsonToWeather');

        weatherService.fetchWeather(1132599).subscribe(
            weather => expect(weather).toEqual(stubWeather, 'expected weather')
        );

        expect(privateFromJsonToWeatherSpy.calls.count()).toBe(1, 'fromJsonToWeather called once');
    });
});
