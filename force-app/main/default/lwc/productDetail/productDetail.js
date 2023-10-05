import { LightningElement, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import user_id from '@salesforce/user/Id';
import user_name from '@salesforce/schema/User.Name';


// import My_Resource from '@salesforce/resourceUrl/Thar';
export default class productDetail extends LightningElement {
    // bgImageStyle

    @wire(getRecord,{recordId:user_id, fields:[user_name]})records 
     
   get currentUserName(){
    return this.records.data ? getFieldValue(this.records.data, user_name ) : '';
   }


//    get bgImageStyle() {
//     return `background-image: url(${My_Resource})`;
// }
  
}