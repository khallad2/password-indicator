import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {StrengthBarService} from '../../services/strength-bar.service';
import {Password} from '../../models/Password';

@Component({
  selector: 'app-strength-bar',
  templateUrl: './strength-bar.component.html',
  styleUrls: ['./strength-bar.component.css']
})
/**
 * This Class Should be used as a generic component for bar-strength-calculator
 * Should be controlled using @Input Attributes
 * If there is no provided @InputAttributes so get the value from environment.prod.ts properties file
 */
export class StrengthBarComponent implements OnInit, OnChanges {
  @Input() public steps: number;
  @Input() public passMinLength: number;
  @Input() public passMaxLength: number;
  @Input() public defaultClass: string;
  @Input() public weakClass: string;
  @Input() public normalClass: string;
  @Input() public strongClass: string;
  @Input() public lengthValidationMsg: string;
  @Input() public passwordInputLabel: string;
  @Input() public toolTipText: string;
  @Input() public strengthBarTypes: {};
  @Input() public initStrength: number;

  public validationMessage: string;
  // Define Styles Array
  public strengthStyles: string[];
  public passwordModel = new Password('');
  public showMaxLengthValidation: boolean;
  public maxLengthValidationMsg: string;
  public showPassword: boolean;
  public textInputType: string;


  constructor(private strengthBarService: StrengthBarService) {
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
    this.strengthStyles = [];
    this.validationMessage = '';
    this.showMaxLengthValidation = false;
    this.maxLengthValidationMsg = '';
    this.textInputType = environment.textInputType;
    this.showPassword = false;
  }

  ngOnInit() {
    this.buildStrengthStyles(this.initStrength);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Can validate each input and compare between currentValue and previouseValue
    // if (changes.defaultClass) {
    //   this.defaultClass = changes['defaultClass'].currentValue;
    // }
  }

  /**
   * Build array of styles to be assigned to the template
   */
  public buildStrengthStyles(strength: number): void {
    // clear the styles array to fill it with the new calculated classes based on the strength
    this.strengthStyles = [];
    // if the strength less than or equal 0 don't enter the loop
    if (!(strength <= 0) && !(strength > 12) ) {
      // loop to set default values according to strength
      for (let i = 0; i < this.steps; i++) {
        // set every element to the default class
        this.strengthStyles.push(this.defaultClass);

        // check if the strength < 4 set to weak
        if (i < strength && i < 4) {
          this.strengthStyles[i] = this.weakClass;
          this.validationMessage = 'Weak';
        }

        // check if the strength >= 4 set to normal
        if (i < strength && i >= 4 && i < 8) {
          this.strengthStyles[i] = this.normalClass;
          this.validationMessage = 'Normal';
        }

        // check if the strength >= 8 set to strong
        if (i < strength && i >= 8 && i <= 12) {
          this.strengthStyles[i] = this.strongClass;
          this.validationMessage = 'Strong';
        }
      }
      // console.log('xxx', this.strengthStyles);
    } else {
      for (let i = 0; i < this.steps; i++) {
        this.strengthStyles.push(this.defaultClass);
      }
      this.validationMessage = 'notValid';
      // console.log('Not valid strength');
    }
  }

  /**
   * Change the styles based on the returned response
   * @param value
   */
  public onPasswordChange(value: string): void {
    if (value.length === 8) {
      this.showMaxLengthValidation = true;
      this.maxLengthValidationMsg = environment.maxLengthValidationMsg;
    } else {
      this.showMaxLengthValidation = false;
    }
      this.strengthBarService.getCalculatedStrength(value).subscribe(
        res => {
          console.log(res);
          this.buildStrengthStyles(res.data);
        }, error2 => {
          console.log(error2);
        },
        () => {}
      );
  }

  public onShowPassword(value: boolean): void {
      this.showPassword = value;

      if (this.showPassword) {
        this.textInputType = 'text';
      } else {
        this.textInputType = 'password';
      }
      // this.showPassword =  true ? this.textInputType = 'text' ? this.textInputType = 'password';
  }
}
