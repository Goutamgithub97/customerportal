import { LightningElement, api } from 'lwc';

export default class CircularProgressBar extends LightningElement {
    @api remainingDate = 0; 
    @api purchasedDate
    @api expirationDate
    availableDays
    consumedDays
    strokeDashOffset = 0;
    circleStyle = '';
    connectedCallback() {
        this.updateProgress();
    }
    updateProgress() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const purchasedDate = parseInt(this.purchasedDate, 10 || 0); 
        const expirationDate = parseInt(this.expirationDate, 10 ||0); 
        const totalDuration = parseInt(this.remainingDate, 10 || 0); 
        this.availableDays= expirationDate-currentYear
        this.consumedDays= currentYear - purchasedDate
    
        // const remainingDays = this.remainingDate ? parseInt(this.remainingDate, 10) : 0;
    
        const percentage = (this.consumedDays / totalDuration) * 100;
        this.strokeDashOffset = (100 - percentage) * 2.96; 
        this.circleStyle = `stroke-dashoffset: ${this.strokeDashOffset};`;

        console.log('currYear==>', currentYear)
        console.log('purchased year==>', purchasedDate)
        console.log('expiration year==>', expirationDate)
        console.log('totalDuration==>', totalDuration)
        console.log('available years==>', this.availableDays)
        console.log('consumed year==>', this.consumedDays)
        console.log('percentage==>', percentage)
    }
   
}
