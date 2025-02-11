@isTest
private class FlowTriggerBypassTest {

    @isTest 
    static void testConstructor() {
        FlowTriggerBypass flowTriggerBypassClass = new FlowTriggerBypass();
        System.assert(flowTriggerBypassClass != null);
    }

    @isTest
    static void testShouldBypass() {
        String testFlow1 = 'Flow1';
        String testFlow2 = 'Flow2';
        
        FlowTriggerBypass.addFlowToBypass(testFlow1);
        FlowTriggerBypass.addFlowToBypass(testFlow2);
        Boolean[] test1 = FlowTriggerBypass.shouldBypass(new String[]{testFlow1});
        Boolean[] test2 = FlowTriggerBypass.shouldBypass(new String[]{testFlow2});
        FlowTriggerBypass.removeFlowFromBypass(testFlow1);
        Boolean[] test3 = FlowTriggerBypass.shouldBypass(new String[]{testFlow1});
        Boolean[] test4 = FlowTriggerBypass.shouldBypass(new String[]{testFlow2});
        FlowTriggerBypass.clearFlowsFromBypass();
        Boolean[] test5 = FlowTriggerBypass.shouldBypass(new String[]{testFlow2});

        System.assert(test1[0] == true  , 'Flow1 bypass should be = true'   );
        System.assert(test2[0] == true  , 'Flow2 bypass should be = true'   );
        System.assert(test3[0] == false , 'Flow1 bypass should be = false'  );
        System.assert(test4[0] == true  , 'Flow2 bypass should be = true'   );
        System.assert(test5[0] == false , 'Flow2 bypass should be = false'  );
    }
}