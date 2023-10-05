public class GetZipCode {
    @AuraEnabled(cacheable=true)
    public static List<Selling_Dealership__c> getAddress(String zip){
        List<Selling_Dealership__c> addList = new List<Selling_Dealership__c>();
        addList =[SELECT City__c,Name,State__c,Zip_Code__c FROM Selling_Dealership__c where Zip_Code__c LIKE:zip];
         system.debug('Zip====>>'+zip);
        system.debug('address====>>'+addList);
        return addList;
    }
}
