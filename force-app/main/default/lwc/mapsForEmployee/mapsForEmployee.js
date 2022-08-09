import { api, LightningElement, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const feildsList =[
    'Employee_Details__c.First_Name__c',
    'Employee_Details__c.Address__Street__s', 
    'Employee_Details__c.Address__City__s',
    'Employee_Details__c.Address__StateCode__s',
    'Employee_Details__c.Address__PostalCode__s',
    'Employee_Details__c.Address__CountryCode__s' 
    ];
export default class MapsForEmployee extends LightningElement {
    @api recordId;
    @track mapMarkers = [];

    empname;
    Street;
    City;
    State;
    PostalCode;
    Country;

    @wire(getRecord ,{recordId:'$recordId', fields:feildsList})
    wiredrecord({error,data}){
        if(data){
            JSON.stringify("data from emp by wire::",data);
             this.Street=data.fields.Address__Street__s.value;
             this.City=data.fields.Address__City__s.value;
             this.State=data.fields.Address__StateCode__s.value;
             this.Country=data.fields.Address__CountryCode__s.value;
             this.PostalCode=data.fields.Address__PostalCode__s.value;
             this.empname=data.fields.First_Name__c.value;

             const marker={
                location:{
                    Street:this.Street ? this.Street :"",
                    City:this.City ? this.City: "",
                    State:this.State ? this.State:"",
                    PostalCode:this.PostalCode ? this.PostalCode:"",
                    Country:this.Country ? this.Country:"",

                },
                title:this.empname ? this.empname:"",
             };
             this.mapMarkers=[marker];
             this.error=undefined;
           }else if(error){
            this.mapMarkers=undefined;
            this.error=error;
           }
    }
}