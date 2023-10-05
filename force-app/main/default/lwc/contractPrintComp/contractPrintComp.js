import { LightningElement,  api} from 'lwc';
// import fetchProduct from '@salesforce/apex/GetProductAndContractInfo.fetchProduct';
export default class ContractPrintComp extends LightningElement {
    @api contractId;
    
handlePrintClick() {
     if (this.contractId.length > 0){
        console.log('Printing ContractId--->'+ this.contractId);

        // Get the contract ID
        const contractId = this.contractId;

        // Create the URL for the Visualforce page with the contract ID as a parameter
        const vfPageUrl = '/apex/ContractPreview?id=' + encodeURIComponent(contractId);

        // Open the Visualforce page in a new window or tab
        window.open(vfPageUrl, '_blank');
     }
}
}
