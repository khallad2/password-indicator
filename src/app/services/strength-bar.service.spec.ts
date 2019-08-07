import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { StrengthBarService } from './strength-bar.service';
import {AppModule} from '../app.module';
import {StrengthBarComponent} from '../components/strength-bar/strength-bar.component';
import {Observable} from 'rxjs/Observable';


describe('StrengthBarService', () => {
  let component: StrengthBarComponent;
  let fixture: ComponentFixture<StrengthBarComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
    })
    .compileComponents();
  }));

  beforeEach(async( () => {
    fixture = TestBed.createComponent(StrengthBarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    component.ngOnInit();
  }));

  it('Should Inject StrengthBarService', async (() => {
    const dataService = fixture.debugElement.injector.get(StrengthBarService);
    expect(dataService).toBeTruthy();
  }));

  it('Test getCalculatedStrength when Bad Request', async (() => {
    const dataService = fixture.debugElement.injector.get(StrengthBarService);
    const badResponse = {'status': 404, 'data': 0, 'message': 'Not Found'};
    const response = dataService.getCalculatedStrength('');
    expect(response).toEqual(Observable.of(badResponse));
  }));

  it('Test getCalculatedStrength when Strong password', async (() => {
    const dataService = fixture.debugElement.injector.get(StrengthBarService);
    const okResponse = {'status': 200, 'data': 12, 'message': 'Successful'};
    const response = dataService.getCalculatedStrength('##22AAaa');
    expect(response).toEqual(Observable.of(okResponse));
  }));

  it('Test getCalculatedStrength when Normal password', async (() => {
    const dataService = fixture.debugElement.injector.get(StrengthBarService);
    const okResponse = {'status': 200, 'data': 5, 'message': 'Successful'};
    const response = dataService.getCalculatedStrength('a#aaaaa');
    expect(response).toEqual(Observable.of(okResponse));
  }));

  it('Test getCalculatedStrength when Weak password', async (() => {
    const dataService = fixture.debugElement.injector.get(StrengthBarService);
    const okResponse = {'status': 200, 'data': 1, 'message': 'Successful'};
    const response = dataService.getCalculatedStrength('aaaaaaaa');
    expect(response).toEqual(Observable.of(okResponse));
  }));

});
