public class FlowTriggerBypass {
    public FlowTriggerBypass() {}

    private static Set<String> setFlowsToBypass;

    static {
        setFlowsToBypass = new Set<String>{};
    }

    public static void addFlowToBypass(String flowName)        { setFlowsToBypass.add(flowName); }

    public static void removeFlowFromBypass(String flowName)   { setFlowsToBypass.remove(flowName); }
    
    public static void clearFlowsFromBypass()                  { setFlowsToBypass.clear(); }


    @InvocableMethod(label='Bypass Flow from Apex' description='Bypass a Flow (Trigger) during an Apex Transaction')
    public static Boolean[] shouldBypass(String[] lstFlowNames) {
        String flowName = lstFlowNames[0];
        return new Boolean[]{ setFlowsToBypass.contains(flowName) };
    }
}