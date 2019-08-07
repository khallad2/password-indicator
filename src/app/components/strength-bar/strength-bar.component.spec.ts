import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { StrengthBarComponent } from './strength-bar.component';
import {AppModule} from '../../app.module';

describe('StrengthBarComponent', () => {
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
    fixture.detectChanges();
  }));

  it('should create', async (() => {
    expect(component).toBeTruthy();
  }));

  // TEST some of UI Elements
  it('should render password label in the label tag', async(() => {
    const labelFixture = TestBed.createComponent(StrengthBarComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').textContent).toBeDefined();
  }));

  it('at first render input is empty ', async(() => {
    const inputFixture = TestBed.createComponent(StrengthBarComponent);
    inputFixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').textContent.length).toEqual(0);
  }));
  // EOF TEST UI Elements

  it('check default style for bar strength items', async (() => {
    expect(component.defaultClass).toBeDefined();
    expect(component.defaultClass).toEqual('strength-checker-default col-sm col-lg col-xs col-xl rounded');
  }));

  it('check normal style for bar strength items', async (() => {
    expect(component.normalClass).toBeDefined();
    expect(component.normalClass).toEqual('strength-checker-normal col-sm col-lg col-xs col-xl rounded');
  }));

  it('check weak style for bar strength items', async (() => {
    expect(component.weakClass).toBeDefined();
    expect(component.weakClass).toEqual('strength-checker-weak col-sm col-lg col-xs col-xl rounded');
  }));

  it('check strong style for bar strength items', async (() => {
    expect(component.strongClass).toBeDefined();
    expect(component.strongClass).toEqual('strength-checker-strong col-sm col-lg col-xs col-xl rounded');
  }));

  it('check toolTipText value', async (() => {
    expect(component.toolTipText).toBeDefined();
    expect(component.toolTipText).toEqual('use specials characters [!@#$%^&*()_+], digits [0-9], Aa for healthy password');
  }));

  it('check buildStrengthStyles incase of weak strength', async (() => {
    component.buildStrengthStyles(3);
    expect(component.validationMessage).toEqual('Weak');
  }));

  it('check buildStrengthStyles incase of normal strength', async (() => {
    component.buildStrengthStyles(6);
    expect(component.validationMessage).toEqual('Normal');
  }));

  it('check buildStrengthStyles incase of strong strength', async (() => {
    component.buildStrengthStyles(9);
    expect(component.validationMessage).toEqual('Strong');
  }));

  it('check buildStrengthStyles incase of strong strength', async (() => {
    component.onPasswordChange('$#13As');
    expect(component.validationMessage).toEqual('Strong');
  }));

});
