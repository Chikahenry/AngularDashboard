import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAndColorManagementComponent } from './data-and-color-management.component';

describe('DataAndColorManagementComponent', () => {
  let component: DataAndColorManagementComponent;
  let fixture: ComponentFixture<DataAndColorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAndColorManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAndColorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
