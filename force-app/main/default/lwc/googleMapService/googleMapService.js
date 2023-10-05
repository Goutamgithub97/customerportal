import { LightningElement, track } from 'lwc';
import fetchAddress from '@salesforce/apex/GetZipCode.getAddress';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class GoogleMapService extends LightningElement {
    @track searchQuery = '';
    name;
    city;
    state;
    zip;
    mapMarker = [];
    zoomLevel = 15;

    handleChange(event) {
        this.searchQuery = event.target.value;
        if(this.searchQuery.length===6){
            this.fetchAddressData();
        }else if(this.searchQuery.length>6  )
        {
            this.clearData();
            this.showInfoToast('Error', ' Wrong Zip Code', 'error');
        }
        
    }

    fetchAddressData() {
        if (this.searchQuery) {
            fetchAddress({ zip: this.searchQuery })
                .then((data) => {
                    console.log('Fetched Data ' + JSON.stringify(data));
                    if (data && data.length > 0) {
                        this.name = data[0].Name;
                        this.city = data[0].City__c;
                        this.state = data[0].State__c;
                        this.zip = data[0].Zip_Code__c;

                        this.mapMarker = [
                            {
                                location: {
                                    PostalCode: this.zip,
                                    City: this.city,
                                    State: this.state
                                },
                                title: this.name
                            }
                        ];
                    } else {
                        this.clearData();
                       this.showInfoToast('Error', 'Delearship Not Found', 'error');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            this.clearData();
          
        }
    }

    clearData() {
        this.name = null;
        this.city = null;
        this.state = null;
        this.zip = null;
        this.mapMarker = [];
    }

    showInfoToast(title, message, variant) {
        const evt = new ShowToastEvent({
             title,
             message,
             variant,
            mode: 'pester'
        });
        this.dispatchEvent(evt);
    }
}
