import { LightningElement,api,track,wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class PDF_Generation extends NavigationMixin(LightningElement)  {
 
    
  navigateToVFPage() {
    console.log('test'+this.idEmployee_Details)
    this[NavigationMixin.GenerateUrl]({
        type: 'standard__webPage',
        attributes: {
            url: '/apex/Employee_Details_PDF'
        }
    }).then(generatedUrl => {
        window.open(generatedUrl);
    });
}
}