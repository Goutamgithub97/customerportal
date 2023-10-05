public with sharing class GetContractFromProduct {
    @AuraEnabled(cacheable=true)
    public static  list<Contract> getContractProduct(){
       list<Contract> myContractProductList = [select Id, My_Product__r.Name, 	Deductible__c, Options__c, Starting_Expiration_Mileage__c From Contract];
       return myContractProductList;
    }
}