import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditListComponent } from './add-edit-list.component';

describe('ListFormComponent', () => {
  let component: AddEditListComponent;
  let fixture: ComponentFixture<AddEditListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
