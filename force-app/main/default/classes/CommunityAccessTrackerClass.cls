public with sharing class CommunityAccessTrackerClass {
@AuraEnabled
public static void createRecordInCAT( String currentUserName, Datetime currentDateTime, String linkName) {
    try{
    Community_Access_Tracker__c newRecord = new Community_Access_Tracker__c();

    newRecord.User_Name__c = currentUserName;
    newRecord.Date_and_Time_of_Accessing__c = currentDateTime;
    newRecord.Link_Name__c= linkName;

    //for limit logs
    newRecord.Apex_Class__c= 'CommunityAccessTrackerClass';
    newRecord.Apex_Method__c='createRecordInCAT';
    newRecord.Apex_Class_API_Version__c= 'v57.0';

    Decimal getAggregateQueries = Limits.getAggregateQueries();
    Decimal getLimitAggregateQueries = Limits.getLimitAggregateQueries();
    Decimal aggregatePercentage = (getAggregateQueries/getLimitAggregateQueries*100).setScale(2);
    String aggregate=String.valueOf(aggregatePercentage) +'% ';
    newRecord.Aggregate_Queries__c= aggregate + ' ' +'(' +Limits.getAggregateQueries()+ '/' +Limits.getLimitAggregateQueries()+')';


    Decimal getQueries= Limits.getQueries();
    Decimal getLimitQueries = Limits.getLimitQueries();
    Decimal queryPercentage = (getQueries/getLimitQueries*100).setScale(2);
    String soqlQuery=String.valueOf(queryPercentage) +'% ';
    newRecord.SOQL_Queries__c= soqlQuery + ' ' +'(' +Limits.getQueries()+ '/' +Limits.getLimitQueries()+')';

    Decimal getAsyncCalls = Limits.getAsyncCalls();
    Decimal getLimitAsyncCalls= Limits.getLimitAsyncCalls();
    Decimal asyncCallPercentage = (getAsyncCalls/getLimitAsyncCalls*100).setScale(2);
    String asyncCalls=String.valueOf(asyncCallPercentage) +'% ';
    newRecord.Async_Calls__c= asyncCalls + ' ' +'(' +Limits.getAsyncCalls()+ '/' +Limits.getLimitAsyncCalls()+')';

    Decimal getCallouts = Limits.getCallouts();
    Decimal getLimitCallouts= Limits.getLimitCallouts();
    Decimal calloutPercentage = (getCallouts/getLimitCallouts*100).setScale(2);
    String callout=String.valueOf(calloutPercentage) +'% ';
    newRecord.Callouts__c= callout + '  ' +'(' +Limits.getCallouts()+ '/' +Limits.getLimitCallouts()+')';

    Decimal getCpuTime= Limits.getCpuTime();
    Decimal getLimitCpuTime= Limits.getLimitCpuTime();
    Decimal cpuTimePercentage=(getCpuTime/getLimitCpuTime*100).setScale(2);
    String cpuTime=String.valueOf(cpuTimePercentage) +'% ';
    newRecord.CPU_Time__c= cpuTime + '  ' +'(' +Limits.getCpuTime()+ '/' +Limits.getLimitCpuTime()+')';

    Decimal getDMLRows= Limits.getDMLRows();
    Decimal getLimitDMLRows= Limits.getLimitDMLRows();
    Decimal dmlRowsPercentage= (getDMLRows/getLimitDMLRows*100).setScale(2);
    String dmlRows=String.valueOf(dmlRowsPercentage) +'% ';
    newRecord.DML_Rows__c= dmlRows + '  ' +'(' +Limits.getDMLRows()+ '/' +Limits.getLimitDMLRows()+')';

    Decimal getDMLStatements= Limits.getDMLStatements();
    Decimal getLimitDMLStatements= Limits.getLimitDMLStatements();
    Decimal dmlStatementPercentage= (getDMLStatements/getLimitDMLStatements*100).setScale(2);
    String dmlStatements=String.valueOf(dmlStatementPercentage) +'% ';
    newRecord.DML_Statements__c= dmlStatements + '  ' +'(' +Limits.getDMLStatements()+ '/' +Limits.getLimitDMLStatements()+')';

    Decimal getEmailInvocations= Limits.getEmailInvocations();
    Decimal getLimitEmailInvocations= Limits.getLimitEmailInvocations();
    Decimal emailInvocationsPercentage = (getEmailInvocations/getLimitEmailInvocations*100).setScale(2);
    String emailInvocations=String.valueOf(emailInvocationsPercentage) +'% ';
    newRecord.Email_Invocations__c= emailInvocations + '  ' +'(' +Limits.getEmailInvocations()+ '/' +Limits.getLimitEmailInvocations()+')';

    
    Decimal getHeapSize = Limits.getHeapSize();
    Decimal getLimitHeapSize = Limits.getLimitHeapSize();
    Decimal heapPercentage = (getHeapSize/getLimitHeapSize *100).setScale(2);
    String heapSize=String.valueOf(heapPercentage)+'% ';
    newRecord.Heap_Size__c= heapSize + '  ' +'(' +Limits.getHeapSize()+ '/' +Limits.getLimitHeapSize()+')';

    Decimal getMobilePushApexCalls= Limits.getMobilePushApexCalls();
    Decimal getLimitMobilePushApexCalls= Limits.getLimitMobilePushApexCalls();
    Decimal mobilePushApexCallPercentage = (getMobilePushApexCalls/getLimitMobilePushApexCalls*100).setScale(2);
    String mobilePushApexCalls=String.valueOf(mobilePushApexCallPercentage) +'% ';
    newRecord.Mobile_Push_Apex_Calls__c= mobilePushApexCalls + '  ' +'(' +Limits.getMobilePushApexCalls()+ '/' +Limits.getLimitMobilePushApexCalls()+')';

    Decimal getPublishImmediateDML = Limits.getPublishImmediateDML();
    Decimal getLimitPublishImmediateDML = Limits.getLimitPublishImmediateDML();
    Decimal publishImmediateDMLPercentage = (getPublishImmediateDML/getLimitPublishImmediateDML*100).setScale(2);
    String publishImmediateDMLStatements=String.valueOf(publishImmediateDMLPercentage) +'% ';
    newRecord.Publish_Immediate_DML_Statements__c= publishImmediateDMLStatements + '  ' +'(' +Limits.getPublishImmediateDML()+ '/' +Limits.getLimitPublishImmediateDML()+')';
    
    Decimal getQueueableJobs= Limits.getQueueableJobs();
    Decimal getLimitQueueableJobs = Limits.getLimitQueueableJobs();
    Decimal queueableJobsPercentage =(getQueueableJobs/getLimitQueueableJobs*100).setScale(2);
    String queueableJobs=String.valueOf(queueableJobsPercentage) +'% ';
    newRecord.Queueable_Jobs__c= queueableJobs + '  ' +'(' +Limits.getQueueableJobs()+ '/' +Limits.getLimitQueueableJobs()+')';
    
    Decimal getQueryLocatorRows= Limits.getQueryLocatorRows();
    Decimal getLimitQueryLocatorRows = Limits.getLimitQueryLocatorRows();
    Decimal soqlQueryLocatorRowsPercentage = (getQueryLocatorRows/getLimitQueryLocatorRows*100).setScale(2);
    String soqlQueryLocatorRows=String.valueOf(soqlQueryLocatorRowsPercentage) +'% ';
    newRecord.SOQL_Query_Locator_Rows__c= soqlQueryLocatorRows + ' ' +'(' +Limits.getQueryLocatorRows()+ '/' +Limits.getLimitQueryLocatorRows()+')';
    
    Decimal getQueryRows= Limits.getQueryRows();
    Decimal getLimitQueryRows= Limits.getLimitQueryRows();
    Decimal soqlQueryRowsPercentage = (getQueryRows/getLimitQueryRows *100).setScale(2);
    String soqlQueryRows=String.valueOf(soqlQueryRowsPercentage) +'% ';
    newRecord.SOQL_Query_Rows__c= soqlQueryRows + '  ' +'(' +Limits.getQueryRows()+ '/' +Limits.getLimitQueryRows()+')';
    
    
        insert newRecord;
        system.debug('aggrQuery----->>' +heapPercentage);
    } catch (Exception e) {
        throw new AuraHandledException('Error creating record: ' + e.getMessage());
    }
}
}