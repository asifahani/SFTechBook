public with sharing class EmpJobSalaryController {
    @AuraEnabled(Cacheable = true)
    public static List<Job_Details__c> getJobdetails(String empId)
    {
        List<Job_Details__c> jobList=[SELECT Id,Name,Employee_Details__c
        FROM Job_Details__c WHERE Employee_Details__c=:empId];
        return jobList;
    }
    @AuraEnabled(Cacheable = true)
    public static List<Salary_or_Bonus__c> getSalarydetails(String empId)
    {
        List<Salary_or_Bonus__c> SalaryList=[SELECT Id,Name,Employee_Details__c	
        FROM Salary_or_Bonus__c WHERE Employee_Details__c=:empId];
        return SalaryList;
    }
    @AuraEnabled(Cacheable = true)
    public static List<Leave__c> getLeaveDetails(String empId)
    {
        List<Leave__c> LeaveList=[SELECT Id,Name,Employee_Details__c	
        FROM Leave__c WHERE Employee_Details__c=:empId];
        return LeaveList;
    }





}