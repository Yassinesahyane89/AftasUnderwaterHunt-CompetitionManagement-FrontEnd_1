import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishAddComponent } from './fish-add.component';

describe('FishAddComponent', () => {
  let component: FishAddComponent;
  let fixture: ComponentFixture<FishAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
