import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiApplyComponent } from './api-apply.component';

describe('ApiApplyComponent', () => {
  let component: ApiApplyComponent;
  let fixture: ComponentFixture<ApiApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
