public with sharing class retrieveEmployeeDetails {
  
  public Employee_Details__c empList{get;set;}
    public retrieveEmployeeDetails(ApexPages.standardController stdctrl) {
         empList = [select id,Name,First_Name__c,Last_Name__c,
                    Date_Of_Birth__c,Age__c,Gender__c,
                    Start_Date__c,End_Date__c,Work_Location__c,Email__c,No_Of_Leaves__c,  
                    Password__c,toLabel(Address__CountryCode__s) FROM Employee_Details__c WHERE Id =: stdctrl.getId()];
    }
     
 
 }