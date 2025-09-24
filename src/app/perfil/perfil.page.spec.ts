import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { IonicModule } from '@ionic/angular';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports: [IonicModule.forRoot()] // Import necessário pro Ionic
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
