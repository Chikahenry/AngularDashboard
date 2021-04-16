import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chart } from '../../assets/js/plugins/chartjs.min.js';

declare var Guage: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  apiUrl: string;
  apidata: any;
  playLabel: any;
  workLabel: any;
  cardLabel: any;
  playSpent: number;
  workSpent: number;
  cardInuse: any;
  playBalance: number;
  workBalance: number;
  cardInactive: number;
  play: HTMLElement;
  card: HTMLElement;
  work: HTMLElement;
  notification: any;
  user: any;
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getDashboardData();
    // this.getGuage();
    this.play = document.getElementById('playBudget');
    this.work = document.getElementById('workBudget');
    this.card = document.getElementById('cardCount');
  }

  getDashboardData() {
    this.apiUrl =
      'https://607040c685c3f0001746fbc1.mockapi.io/api/v2/dashboard';

    this.httpClient.get<any>(this.apiUrl).subscribe((data) => {
      console.log('dashboard ' + data);
      this.apidata = data[0].chart_stat;
      this.playLabel = this.apidata[0].label;
      this.workLabel = this.apidata[1].label;
      this.cardLabel = this.apidata[2].label;
      this.playSpent = this.apidata[0].spent;
      this.workSpent = this.apidata[1].spent;
      this.cardInuse = this.apidata[2]['in-use'];
      this.playBalance = this.apidata[0].balance;
      this.workBalance = this.apidata[1].balance;
      this.cardInactive = this.apidata[2].active;
      this.notification = data[0].notification_count;
      this.user = data[0].logged_user;
      this.getChart(
        this.playSpent,
        this.playBalance,
        '#1B5BAC',
        '#78C2ED',
        this.play
      );

      this.getChart(
        this.workSpent,
        this.workBalance,
        '#ff6542',
        '#eedfd8',
        this.work
      );

      this.getChart(
        this.cardInuse,
        this.cardInactive,
        '#f6ae2d',
        '#eeeae4',
        this.card
      );
    });
  }

  getChart(
    value1: number,
    value2: number,
    color1: string,
    color2: string,
    element: HTMLElement
  ) {
    var myChart = new Chart(element, {
      type: 'doughnut',
      data: {
        // labels: ['Red', 'Blue'],
        datasets: [
          {
            label: 'Guage',
            data: [value1, value2],
            backgroundColor: [color1, color2],
            borderColor: [color1, color2],
            borderWidth: 1,
            borderRadius: 10,
          },
        ],
      },
      options: {
        circumference: 117 * Math.PI,
        rotation: 172 * Math.PI,
        cutout: 150,
        radius: 100,
        elements: {
          arc: 34,
        },
        plugins: {},
      },
    });
  }
}
