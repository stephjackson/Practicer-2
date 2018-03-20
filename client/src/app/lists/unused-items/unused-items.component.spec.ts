import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusedItemsComponent } from './unused-items.component';

describe('UnusedItemsComponent', () => {
  let component: UnusedItemsComponent;
  let fixture: ComponentFixture<UnusedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnusedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnusedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
