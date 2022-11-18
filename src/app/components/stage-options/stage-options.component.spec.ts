import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageOptionsComponent } from './stage-options.component';

describe('StageOptionsComponent', () => {
  let component: StageOptionsComponent;
  let fixture: ComponentFixture<StageOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
