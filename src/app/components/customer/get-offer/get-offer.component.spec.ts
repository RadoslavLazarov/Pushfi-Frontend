import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOfferComponent } from './get-offer.component';

describe('GetOfferComponent', () => {
  let component: GetOfferComponent;
  let fixture: ComponentFixture<GetOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
