import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterNavComponent } from './center-nav.component';

describe('CenterNavComponent', () => {
  let component: CenterNavComponent;
  let fixture: ComponentFixture<CenterNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
