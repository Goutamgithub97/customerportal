import { LightningElement, wire} from 'lwc';
import createCATRecord from '@salesforce/apex/CommunityAccessTrackerClass.createRecordInCAT';
import user_id from '@salesforce/user/Id';
import user_name from '@salesforce/schema/User.Name';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

export default class ParentComponent extends LightningElement {
    title
    showProductTable = false
    showGoogleMap = false
    showMyService= false
    showMyClaims= false
    showHelpCenter = false
    // Creating parameter for CommunityAccesstracker Apex class currentUserName,  linkName, currentDateTime
    @wire(getRecord,{recordId:user_id, fields:[user_name]})records 
    get currentUserName() {
        return this.records ? getFieldValue(this.records.data, user_name) : '';
      }
    linkName
    currentDateTime
    handleClick(event){
        if(event.target.name ==='myProduct'){
            this.title = event.target.label;
            this.showProductTable= true;
            this.showGoogleMap = false
            this.showMyService= false
            this.showMyClaims= false
            this.showHelpCenter = false
           //this createCATRecord passes the data to CommunityAccesstracker Apex class to create community Access Tracker Record
           this.currentDateTime= new Date();
           this.linkName = 'My Products'
           createCATRecord({currentUserName:this.currentUserName,currentDateTime:this.currentDateTime,linkName:this.linkName}).then(()=>{
            })
            .catch(error => {
                console.error('Error creating record:', error.message);
              });
              console.log('user---->>>>' +this.currentUserName);
        }

        else if (event.target.name ==='myService'){
            this.title = event.target.label;
            this.showMyService= true;
            this.showProductTable = false
            this.showGoogleMap = false
            this.showMyClaims= false
            this.showHelpCenter = false
        }

        else if (event.target.name ==='myClaim'){
            this.title = event.target.label;
            this.showMyClaims= true;
            this.showMyService= false;
            this.showProductTable = false
            this.showGoogleMap = false
            this.showHelpCenter = false
        }

        else if (event.target.name ==='helpCenter'){
            this.title = event.target.label;
            this.showHelpCenter= true;
            this.showMyClaims= false;
            this.showMyService= false;
            this.showProductTable = false
            this.showGoogleMap = false
        }

        else if (event.target.name ==='findAService'){
            this.title = event.target.label;
            this.showGoogleMap= true;
            this.showHelpCenter= false;
            this.showMyClaims= false;
            this.showMyService= false;
            this.showProductTable = false
        }
    }
}