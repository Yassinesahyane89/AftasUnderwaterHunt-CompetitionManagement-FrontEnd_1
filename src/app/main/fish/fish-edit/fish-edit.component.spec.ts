import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishEditComponent } from './fish-edit.component';

describe('FishEditComponent', () => {
  let component: FishEditComponent;
  let fixture: ComponentFixture<FishEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
