import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourlistsComponent } from './yourlists.component';

describe('YourlistsComponent', () => {
  let component: YourlistsComponent;
  let fixture: ComponentFixture<YourlistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourlistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
