trigger TriggerOnLeave on Leave__c (after insert, after update, after delete, after undelete) {
  if(trigger.IsAfter ){

    if(trigger.IsUpdate || trigger.IsInsert ){
      LeaveTriggerHandler.calculateLeavesOnInsert(Trigger.new);
      }
      
    }
  
}