import { LightningElement, api } from 'lwc';

export default class CalcPjCltBenefits extends LightningElement {
    @api id;
    @api beneficioId;
    @api title = 'Titulo Beneficio';
    @api selectedPeriodOption = '1';
    @api beneficioValue = 0.00;
    
    get periodOptions() {
        return [
            { label: 'Mensal', value: '1' },
            { label: 'Anual', value: '2' }
        ];
    }

    handlePeriodSelectorChange(event) {
        this.value = event.detail.value;
        this.handleInputChange(event);
    }

    handleRemoveBeneficioClick(event) {
        this.dispatchEvent(new CustomEvent('removedbeneficio', { detail: this.id }));
    }

    handleInputChange(event) {
        if (event.target.name == 'input-beneficio-value')   { this.beneficioValue = event.detail.value; }
        if (event.target.name == 'input-beneficio-title')   { this.title = event.detail.value; }
        if (event.target.name == 'periodSelector')          { this.selectedPeriodOption = event.detail.value; }
        let eventDetailObject = { 
            id: this.beneficioId, 
            title: this.title,
            value: this.beneficioValue,
            option: this.selectedPeriodOption
        };        
        this.dispatchEvent( new CustomEvent('beneficiochanged', { detail: eventDetailObject }));
    }
}