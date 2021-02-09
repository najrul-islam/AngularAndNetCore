import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StsCapitalAppContainerComponent } from './sts-capital-app-container.component';

describe('StsCapitalAppContainerComponent', () => {
  let component: StsCapitalAppContainerComponent;
  let fixture: ComponentFixture<StsCapitalAppContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StsCapitalAppContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StsCapitalAppContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
