import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterDashComponent } from './cluster-dash.component';

describe('ClusterDashComponent', () => {
  let component: ClusterDashComponent;
  let fixture: ComponentFixture<ClusterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
