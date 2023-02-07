import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchtroumpfItemComponent } from './schtroumpf-item.component';

describe('SchtroumpfItemComponent', () => {
  let component: SchtroumpfItemComponent;
  let fixture: ComponentFixture<SchtroumpfItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchtroumpfItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchtroumpfItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
