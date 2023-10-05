public with sharing class GetProductAndContractInfo {
 
    @AuraEnabled( cacheable = true )
    public static List< ProductWrapper > fetchProduct(Id userId) {
        List< ProductWrapper > listWrap = new List< ProductWrapper >();
        
        for ( My_Product__c objProduct : [ 
            SELECT Id,My_Product_Id__c,Name,Status__c, 
           (SELECT Id, 	Purchase_Date__c, Deductible__c, Options__c, Starting_Expiration_Mileage__c, Expiration_Date__c, Expiration_Mileage__c, Selling_Dealership__c, Remaining_Date__c, Remaining_Mileage__c, Current_Mileage__c, Remaining_Current_Mileage__c,Available_Mileage__c, Available_Years__c From Contracts__r WHERE User__c = :userId) 
            FROM My_Product__c WHERE Id IN (SELECT My_Product__c
            FROM Contract
            WHERE User__c = :userId)
        ] ) {
            
            ProductWrapper objWrap = new ProductWrapper( true, objProduct, objProduct.Contracts__r.size() > 0 ? true : false );
            listWrap.add( objWrap );
        }
 System.debug('---------->'+listWrap);
        return listWrap;
       
    }

    public class ProductWrapper {

        @AuraEnabled
        public Boolean hideBool;
        @AuraEnabled
        public Boolean contractBool;
        @AuraEnabled
        public My_Product__c objProduct;

        public ProductWrapper( Boolean hideBool, My_Product__c objProduct, Boolean contractBool ) {

            this.hideBool = hideBool;
            this.objProduct = objProduct;
            this.contractBool = contractBool;

        }

    }
     
}