import { LightningElement, api } from 'lwc';

export default class HorizontalProgressBar extends LightningElement {
  value=0;
  per=0;
  @api remainingMileage;
  @api startingMileage;
  @api expiringMileage;
  @api remainingCurrentMileage
  @api currentMileage
  availableMileage


  connectedCallback() {
    this.calculateValue();
  }

  calculateValue() {
    const expMile=parseInt(this.expiringMileage, 10 || 0);
    const remMile=parseInt(this.remainingMileage, 10 || 0);
    const startMile= parseInt(this.startingMileage, 10 || 0);
    const currMile = parseInt(this.currentMileage, 10 || 0)
    const remCurrMile = parseInt(this.remainingCurrentMileage, 10 || 0)
    // this.value = expMile - startMile;
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(()=>{
        this.template.querySelector(".slds-progress-bar__value").style.width= this.per+"%";
    },0);
      // console.log('value====>>'+this.value);
      // this.per = (remMile/expMile)* 100 ;
      this.availableMileage = expMile-currMile;
      this.per = (remCurrMile/remMile)*100;
      console.log('startMile ====>>'+ startMile);
      console.log('remMile ====>>'+ remMile);
      console.log('expMile ====>>'+ expMile);
      console.log('per ====>>'+ this.per);
      console.log('currM ====>>'+ this.currentMileage);
      console.log('remCurrM ====>>'+ this.remainingCurrentMileage);
      
  }
}
