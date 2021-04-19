import { DashboardComponent } from './../dashboard/dashboard.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-and-color-management',
  templateUrl: './data-and-color-management.component.html',
  styleUrls: ['./data-and-color-management.component.css'],
})
export class DataAndColorManagementComponent implements OnInit {
  settingsForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private dashboard: DashboardComponent
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      card: [''],
      chartId: [''],
      playTitle: [''],
      playSpent: [''],
      playBalance: [''],
      playSpentColor: [''],
      playBalanceColor: [''],
    });
  }

  onSubmit(formAllData: any) {
    this.submitted = true;
    // stop the process here if form is invalid
    if (this.settingsForm.invalid) {
      return;
    }
    console.log(formAllData);

    const obj = {
      id: formAllData.chartId,
      title: formAllData.playTitle,
      value1: formAllData.playSpent,
      value2: formAllData.playBalance,
      color1: formAllData.playSpentColor,
      color2: formAllData.playBalanceColor,
    };
    this.dashboard.getChart(
      obj.value1,
      obj.value2,
      obj.color1,
      obj.color2,
      obj.id,
      obj.title
    );
  }
}
