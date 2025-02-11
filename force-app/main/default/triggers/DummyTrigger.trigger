trigger DummyTrigger on Dummy__c (before insert, before update, after insert, after update) {
    new DummyTriggerHandler().run();
}