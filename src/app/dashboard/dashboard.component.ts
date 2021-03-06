import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
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
  modalOptions: NgbModalOptions;
  closeResult: string;
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
  date: Date;
  playColor1: any;
  workColor1: any;
  workColor2: any;
  countColor1: any;
  countColor2: any;
  playColor2: any;
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getDashboardData();
    // this.getGuage();
    this.date = new Date();
    this.modalOptions = {
      backdrop: true,
      centered: true,
      backdropClass: 'customBackdrop',
      size: 'xl',
    };
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
        1,
        'CAPEX'
      );

      this.getChart(
        this.workSpent,
        this.workBalance,
        '#ff6542',
        '#eedfd8',
        2,
        'OPEX'
      );

      this.getChart(
        this.cardInuse,
        this.cardInactive,
        '#f6ae2d',
        '#eeeae4',
        3,
        'ASSETS'
      );
    });
  }

  viewSettings(modal) {
    this.showModal(modal);
  }

  public getChart(
    value1: any,
    value2: any,
    color1: any,
    color2: any,
    id,
    label: any
  ) {
    if (id == 1) {
      this.playLabel = label;
      this.playSpent = value1;
      this.playBalance = value2;
      this.playColor1 = color1;
      this.playColor2 = color2;
      this.cd.detectChanges();
      var myChart = new Chart(document.getElementById('playBudget'), {
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
          cutout: 115,
          radius: 85,
          elements: {
            arc: 34,
          },
          plugins: {},
        },
      });
    } else if (id == 2) {
      this.workLabel = label;
      this.workSpent = value1;
      this.workBalance = value2;
      this.workColor1 = color1;
      this.workColor2 = color2;
      var myChart = new Chart(this.work, {
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
          cutout: 115,
          radius: 85,
          elements: {
            arc: 34,
          },
          plugins: {},
        },
      });
    } else {
      this.cardLabel = label;
      this.cardInuse = value1;
      this.cardInactive = value2;
      this.countColor1 = color1;
      this.countColor2 = color2;
      var myChart = new Chart(this.card, {
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
          cutout: 115,
          radius: 85,
          elements: {
            arc: 34,
          },
          plugins: {},
        },
      });
    }
  }

  showModal(modal) {
    this.modalService.open(modal, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
