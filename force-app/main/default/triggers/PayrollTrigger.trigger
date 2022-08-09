trigger PayrollTrigger on Payroll__c(before insert, before update) {
    Set<string> EmpId = new Set<string>();
    for (Payroll__c payobj:Trigger.new){
        EmpId.add(payobj.Employee_ID__c	);
}
List<Job_Details__c> Jobdetailobj =  [Select ID, Name from Job_Details__c where Name in :EmpId];
List<Salary_or_Bonus__c> SalaryDetailobj =  [Select ID, Name from Salary_or_Bonus__c where Name in :EmpId];
Map<Id,Job_Details__c> JobdetailMap = new Map<Id,Job_Details__c>();
Map<Id,Salary_or_Bonus__c> SalarydetailMaap = new Map<Id,Salary_or_Bonus__c>();



}