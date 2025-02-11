import { LightningElement, api, track } from 'lwc';

export default class CalcPjClt extends LightningElement {
    @track _mapBeneficios = {};
    @track listBeneficios = [];
    // @track mapBeneficios = {};

    @api input_pj_val_mensal = 0.0;
    @api input_pj_imposto = 0.100;
    @api input_pj_meses = 11;
    @api input_clt_val_mensal = 0.0;
    @api input_clt_imposto = 0.150;

    // get listBeneficios() {
    //     return Object.values(this.mapBeneficios);
    // }

    get mapBeneficios() {
        return this._mapBeneficios;
    }
    set mapBeneficios(value) {
        this._mapBeneficios = value;
        this.listBeneficios = Object.values(this._mapBeneficios);
    }

    getBeneficioFGTS() {
        console.log(this.input_clt_val_mensal);
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

    refreshFixedBeneficios() { this.mapBeneficios['FGTS'] = this.getBeneficioFGTS(); }

    handleAddBeneficioClick(event) {
        let newIndex = Date.now();
        newIndex++;
        // this.mapBeneficios = {};
        this.mapBeneficios = {
            ...this.mapBeneficios,
            [newIndex]: {
                id: newIndex,
                title: 'Novo Beneficio',
                selectedPeriodOption: '1',
                beneficioValue: 0.00
            }
        };
        // this.mapBeneficios[Date.now()] = {
        //     id: Date.now(),
        //     title: 'Novo Beneficio',
        //     selectedPeriodOption: '1',
        //     beneficioValue: 0.00
        // };
        console.log(this.mapBeneficios);
    }

    handleAddBeneficioClick2(event) {
        this.mapBeneficios = {
            '1' : {
                id: '1',
                title: 'Bonus',
                selectedPeriodOption: '2',
                beneficioValue: 12000.0
            },
            '2' : {
                id: '2',
                title: 'Internet',
                selectedPeriodOption: '1',
                beneficioValue: 120.0
            }
        };

    }
    
    handleRemovedBeneficio(event) {
        // let beneficioToRemove = this.listBeneficios.find(x => x.id == event.detail);
        delete this.mapBeneficios[event.detail];
    }

    handleInputChange(event) {
        try {
            console.log(event.target.getAttributeNames('name'));
            console.log(event.currentTarget.getAttributeNames('name'));
            this.refreshFixedBeneficios();
        }
        catch (ex) {
            console.log(ex);
        }
    }

}