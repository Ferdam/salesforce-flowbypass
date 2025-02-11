import { LightningElement, api } from "lwc";

export default class CalcPjCltSummary extends LightningElement {
	@api formData = {};

    clt_meses = 13.3333;

    connectedCallback() { }

    get PJ_yearlyTotalCash() {
        let pjData = this.formData.pj;
        return pjData.val_mensal_liquido * pjData.pj_meses
    }
    
    get PJ_yearlyTotal() {
        return this.PJ_yearlyTotalCash;
    }

    get CLT_yearlyTotalCash() {
        let cltData = this.formData.clt;
        return cltData.val_mensal_liquido * this.clt_meses;
    }

    get CLT_yearlyTotalFGTS() {
        let cltData = this.formData.clt;
        let cltBeneficios = cltData.listBeneficios;
        let cltFGTSmensal = cltBeneficios.find(x => x.id == 'FGTS');
        return cltFGTSmensal * this.clt_meses;
    }

    get CLT_yearlyEachBeneficio() {
        let cltData = this.formData.clt;
        let cltBeneficios = cltData.listBeneficios;
        let cltListYearlyCalcItems = [];
        for (let item of cltBeneficios)  {
            let multiplier = 1;
            if (item.selectedPeriodOption == '1') { multiplier = 12; }
            if (item.id == 'FGTS') { multiplier = this.clt_meses; }
            let calculatedBeneficioItem = {
                id: item.id,
                title: item.title,
                totalValue: item.beneficioValue * multiplier
            };
            cltListYearlyCalcItems.push(calculatedBeneficioItem);
        }
        return cltListYearlyCalcItems;
    }

    get CLT_yearlyTotalBeneficios() {
        let totalBeneficios = 0;
        for (let item of this.CLT_yearlyEachBeneficio) {
            totalBeneficios += item.totalValue;
        }
        return totalBeneficios;
    }

    get CLT_yearlyTotal() {
        return this.CLT_yearlyTotalBeneficios + this.CLT_yearlyTotalCash;
    }

}