import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptionDecryptionComponent } from './encryption-decryption.component';

describe('EncryptionDecryptionComponent', () => {
  let component: EncryptionDecryptionComponent;
  let fixture: ComponentFixture<EncryptionDecryptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncryptionDecryptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionDecryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
