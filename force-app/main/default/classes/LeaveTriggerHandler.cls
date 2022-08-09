public class LeaveTriggerHandler {
 public static void calculateLeavesOnInsert(List<Leave__c> LeaveList){ 
    Set<Id> empIdSet = new Set<Id>();
    for(Leave__c leaObj:LeaveList){
      System.debug('Return Leave List: ' +LeaveList);
      if(leaObj.Employee_Details__c!= null){
        System.debug('Return List: ' +leaObj);
        empIdSet.add(leaObj.Employee_Details__c);  
      }
    }   
    List<Employee_Details__c> empRelatedleave= [SELECT Id,Name, No_Of_Leaves__c,(SELECT Id from Leaves__r) from Employee_Details__c where Id in:empIdSet]; 
    if(empRelatedleave!=null && empRelatedleave.size()>0){   

         for(Employee_Details__c emp:empRelatedleave){
          System.debug('Return Employee List: ' +emp);
           emp.No_Of_Leaves__c = emp.Leaves__r.size();
    }

    update empRelatedleave;
    }

   }
}