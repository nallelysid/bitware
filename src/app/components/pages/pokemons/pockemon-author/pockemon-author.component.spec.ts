import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PockemonAuthorComponent } from './pockemon-author.component';

describe('PockemonAuthorComponent', () => {
  let component: PockemonAuthorComponent;
  let fixture: ComponentFixture<PockemonAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PockemonAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PockemonAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
