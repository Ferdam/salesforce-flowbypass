import { LightningElement, api, track } from 'lwc';

export default class CalcPjClt extends LightningElement {
    @track listBeneficios = [];

    @track input_pj_val_mensal = 0.0;
    @track input_pj_imposto = 0.100;
    @track input_pj_meses = 11;
    @track input_clt_val_mensal = 0.0;
    @track input_clt_imposto = 0.150;


    get formData() {
        let pj_mensal_liquido = this.input_pj_val_mensal * (1-this.input_pj_imposto);
        let clt_mensal_liquido =  this.input_clt_val_mensal * (1-this.input_clt_imposto);
        return {
            pj: {
                val_mensal_liquido: pj_mensal_liquido,
                pj_meses: this.input_pj_meses,
            },
            clt: {
                val_mensal_liquido: clt_mensal_liquido,
                listBeneficios: this.listBeneficios
            }
        };
    }

    getBeneficioFGTS() {
        return {
            id: 'FGTS',
            title: 'FGTS',
            selectedPeriodOption: '1',
            beneficioValue: this.input_clt_val_mensal * 0.08
        };
    }

    connectedCallback() {
        this.refreshFixedBeneficios();
    }

    refreshFixedBeneficios() { 
        let itemFGTS = this.listBeneficios.find(x => x.id == 'FGTS');
        if (itemFGTS == null) {
            itemFGTS = this.getBeneficioFGTS(); 
            this.listBeneficios.push(itemFGTS);
        }
        this.listBeneficios[this.listBeneficios.indexOf(itemFGTS)] = this.getBeneficioFGTS();
    }

    handleAddBeneficioClick(event) {
        let newIndex = Date.now();
        this.listBeneficios.push(
            {
                id: newIndex,
                title: 'Novo Beneficio',
                selectedPeriodOption: '1',
                beneficioValue: 0.00
            }
        );
    }
    
    handleRemovedBeneficio(event) {
        let beneficioToRemove = this.listBeneficios.find(x => x.id == event.detail);
        this.listBeneficios.splice(this.listBeneficios.indexOf(beneficioToRemove), 1);
    }

    handleChangedBeneficio(event) {
        let changedBeneficio = this.listBeneficios.find(x => x.id == event.detail.id);
        changedBeneficio.id = event.detail.id;
        changedBeneficio.title = event.detail.title;
        changedBeneficio.beneficioValue = event.detail.value;
        changedBeneficio.selectedPeriodOption = event.detail.option;
    }

    handleInputChange(event) {
        if (event.target.name == 'input-clt-val-mensal') {
            this.input_clt_val_mensal = event.detail.value;
            this.listBeneficios.find(x => x.id == 'FGTS').beneficioValue = event.target.value * 0.08;
            this.listBeneficios = [...this.listBeneficios];
        }
        if (event.target.name == 'input-clt-imposto') {
            this.input_clt_imposto = event.detail.value;
        }
        if (event.target.name == 'input-pj-val-mensal') {
            this.input_pj_val_mensal = event.detail.value;
        }
        if (event.target.name == 'input-pj-imposto') {
            this.input_pj_imposto = event.detail.value;
        }
        if (event.target.name == 'input-pj-meses') {
            this.input_pj_meses = event.detail.value;
        }
    }

}