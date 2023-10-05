import { LightningElement, wire } from 'lwc';
import fetchProduct from '@salesforce/apex/GetProductAndContractInfo.fetchProduct';
import user_id from '@salesforce/user/Id';
export default class NewProductComp extends LightningElement {
    records;
    error;
    @wire( fetchProduct , { userId: user_id } )  
    wiredProducts( { error, data } ) {

        if (data) {

            console.log( 'Fetched Data ' + JSON.stringify( data ) );
            this.records = data;
            this.records = data.map(record => ({ ...record, iconName: 'utility:chevrondown' }));

        } else if ( error ) {

            this.error = error;
            this.records = undefined;

        }

    }  

    hideAndShow( event ) {
        
        let indx = event.target.dataset.recordId;
        console.log( 'Index is ' + indx );

        if ( this.records ) {

            let recs =  JSON.parse( JSON.stringify( this.records ) );
            let currVal = recs[ indx ].hideBool;
            console.log( 'Current Val ' + currVal );
            recs[ indx ].hideBool = !currVal;
            recs[indx].iconName = currVal ? 'utility:chevronup':'utility:chevrondown';
            this.records = recs;
            console.log( 'After Change ' + this.records[ indx ].hideBool );

        }

    }
    calculateProgressPercentage(remainingDate) {
        const remainingYears = parseFloat(remainingDate);
        const totalYears = parseFloat(it.value.objProduct.Expiration_Date__c);
        if (!isNaN(remainingYears) && !isNaN(totalYears) && totalYears > 0) {
            return Math.round((remainingYears / totalYears) * 100);
        }
        return 0;
    }
    
}