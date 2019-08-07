import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {environment} from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string;
  public companyName: string;
  public date: any;
  public steps: number;
  public passMinLength: number;
  public passMaxLength: number;


  // Define Styles Array
  public defaultClass: string;
  public weakClass: string;
  public normalClass: string;
  public strongClass: string;
  public lengthValidationMsg: string;
  public passwordInputLabel: string;
  public toolTipText: string;
  public strengthBarTypes: {};
  public initStrength: number;

  constructor() {
    this.title = environment.appTitle;
    this.steps = environment.barSteps;
    this.passMinLength = environment.passMinLength;
    this.passMaxLength = environment.passMaxLength;
    this.defaultClass = environment.strengthBarDefaultClass;
    this.weakClass = environment.strengthBarWeakClass;
    this.normalClass = environment.strengthBarNormalClass;
    this.strongClass = environment.strengthBarStrongClass;
    this.toolTipText = environment.strengthBarToolTipText;
    this.lengthValidationMsg = environment.lengthValidationMsg;
    this.passwordInputLabel = environment.passwordInputLabel;
    this.strengthBarTypes = environment.strengthBarTypes;
    this.initStrength = environment.initStrength;
    this.companyName = environment.companyName;
    this.date = new Date().getFullYear();
  }
}
