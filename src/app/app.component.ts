import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from './services/weather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
  isDaytime: boolean = true;

  city: string = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getTimeData();
  }
  getTimeData():void {
    this.weatherService.getWeather(this.city)
      .subscribe(data => {
        const localtime = data.location.localtime;
        const hour = new Date(localtime).getHours();
        this.isDaytime = hour >= 6 && hour < 18;
      });
  }

  getWeather(): void {
    this.weatherService.getWeather(this.city)
      .subscribe(data => {
        this.weatherData = data;
      });
  }
}
