public with sharing class DummyTriggerHandler {

    public static Boolean isBypassed = false;

    public DummyTriggerHandler() { }

    public void run() {
        if (isBypassed) return;
        if (Trigger.isBefore) {
            if (Trigger.isInsert) { onBeforeInsert(); }
            if (Trigger.isUpdate) { onBeforeUpdate(); }
        }
        if (Trigger.isAfter) {
            if (Trigger.isInsert) { onAfterInsert(); }
            if (Trigger.isUpdate) { onAfterUpdate(); }
        }
    }

    public void onBeforeInsert() {
        System.debug('onBeforeInsert');
    }

    public void onBeforeUpdate() {
        System.debug('onBeforeUpdate');
        blockDueCustomPermission(Trigger.new);
        fillOutFieldsBefore(Trigger.new);
    }

    public void onAfterInsert() {
        System.debug('onAfterInsert');
    }

    public void onAfterUpdate() {
        System.debug('onAfterUpdate');
        fillOutFieldsAfter(Trigger.new);
    }

    /********************************************
    ** Regras de negócio
    *********************************************/

    public void blockDueCustomPermission(Dummy__c[] lstNewDummies) {
        Boolean hasCustPerm = FeatureManagement.checkPermission('Dummy_customperm');
        if (hasCustPerm) { return; }
        for (Dummy__c tempDummy : lstNewDummies) {
            if (tempDummy.Name == 'Dummy bypass test') {
                tempDummy.Text_255_Field__c.addError('Error on Text_255_Field__c field');
            }
        }
    }

    public void fillOutFieldsBefore(Dummy__c[] lstNewDummies) {
        for (Dummy__c tempDummy : lstNewDummies) {
            tempDummy.Number_Integer_Field__c = 12345;
        }
    }

    public void fillOutFieldsAfter(Dummy__c[] lstNewDummies) {
        Dummy__c[] lstToUpdate = new Dummy__c[]{};
        for (Dummy__c tempDummy : lstNewDummies) {
            lstToUpdate.add( new Dummy__c( Id = tempDummy.Id, Number_Decimal_Field__c = 12345.6789 ) );
        }
        DummyTriggerHandler.isBypassed = true;
        update lstToUpdate;
        DummyTriggerHandler.isBypassed = false;
    }
}