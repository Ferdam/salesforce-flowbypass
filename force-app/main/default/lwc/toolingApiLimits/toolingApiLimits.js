import getOrgLimits from '@salesforce/apex/ToolingAPILimits.getOrgLimitsNamedCred';
import { LightningElement, api } from "lwc";

export default class ToolingApiLimits extends LightningElement {
	async connectedCallback() {
        try {
            let result = await getOrgLimits();
            console.log(result);
        }
        catch (ex) {
            console.error(ex);
        }
    }
}