import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PockemonCardComponent } from './pockemon-card.component';

describe('PockemonCardComponent', () => {
  let component: PockemonCardComponent;
  let fixture: ComponentFixture<PockemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PockemonCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PockemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
