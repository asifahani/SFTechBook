import { LightningElement, api, track } from 'lwc';
import JobIdField from '@salesforce/apex/EmpJobSalaryController.getJobdetails'
import SalaryField from '@salesforce/apex/EmpJobSalaryController.getSalarydetails'
import LeaveField from '@salesforce/apex/EmpJobSalaryController.getLeaveDetails'
import { createRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Payroll_OBJECT from '@salesforce/schema/Payroll__c';
import EMPID_FIELD from '@salesforce/schema/Payroll__c.Employee_ID__c';
import JOBID_FIELD from '@salesforce/schema/Payroll__c.Job_ID__c';
import SALARY_FIELD from '@salesforce/schema/Payroll__c.Salary_ID__c';
import Leave_FIELD from '@salesforce/schema/Payroll__c.Leave_ID__c';
import Date_FIELD from '@salesforce/schema/Payroll__c.Date__c';
import Report_FIELD from '@salesforce/schema/Payroll__c.Report__c';
import TotalAmount_FIELD from '@salesforce/schema/Payroll__c.Total_Amount__c';
import Owner_FIELD from '@salesforce/schema/Payroll__c.OwnerId';



export default class PayrollComponentlwc extends NavigationMixin(LightningElement) {
  @track payrollShowModal = false;

  empidfield = EMPID_FIELD;
  jobid = JOBID_FIELD;
  salaryId = SALARY_FIELD;
  LeaveId = Leave_FIELD;
  DateField = Date_FIELD;
  ReportField = Report_FIELD;
  TotalAmountField = TotalAmount_FIELD;
  OwnerField = Owner_FIELD;

  // Flexipage provides recordId and objectApiName
  @api recordId;
  @api objectApiName;
  @track JobId = [];
  @track SalaryID = [];
  @track LeaveID = [];

  selectedJobNameObj = null;
  selectedJobId;
  showJobList = false;
  selectedSalNameObj = null;
  selectedSalId;
  selectedEmpId;
  showSalList = false;
  selectedLeaveNameObj = null;
  selectedLeaveId;
  selectedSalId;
  selectedEmpId;
showLeaveList = false;
  @api iconName;
  salSelected = false;
  jobSelected = false;
  LeaveSelected = false;


  searchjobsalaryhandler(event) {
    if (event.target.value) {
      this.selectedEmpId = event.target.value;
    } else {
      this.selectedEmpId = null;
      this.selectedSalNameObj = '';
      this.selectedSalId = '';
      this.selectedJobNameObj = '';
      this.selectedJobId = '';
      this.selectedLeaveNameObj = '';
      this.selectedLeaveId = '';
    }
    JobIdField({ empId: this.selectedEmpId })
      .then(result => {
        this.JobId = result;
        this.selectedJobId = this.JobId[0].Id;
        this.selectedJobNameObj = this.JobId[0].Name;
        this.jobSelected = true;
console.log("selected Row73 " + JSON.stringify(this.JobId));

      }).catch(error => {
        console.error(error)
      })
    SalaryField({ empId: this.selectedEmpId })
      .then(result => {
        this.SalaryID = result;
        this.selectedSalId = this.SalaryID[0].Id;
        this.selectedSalNameObj = this.SalaryID[0].Name;
        this.salSelected  = true;


        console.log("selected Row86" + JSON.stringify(this.SalaryID));

      }).catch(error => {
        console.error(error)
      })
      LeaveField({ empId: this.selectedEmpId })
      .then(result => {
        this.LeaveID = result;
        this.selectedLeaveId = this.LeaveID[0].Id;
        this.selectedLeaveNameObj = this.LeaveID[0].Name;
        this.LeaveSelected = true;
        console.log("selected Row99" + JSON.stringify(this.LeaveID));

      }).catch(error => {
        console.error(error)
      })




  }
  handleSave() {
    this.saveAndNew = false;
    // this.handleSubmit();
  }

  handleSaveAndNew() {
    this.saveAndNew = true;
    this.handleSubmit();
  }
  handleCancel(event) {
    var url = window.location.href;
    var value = url.substr(0, url.lastIndexOf('/') + 1);
    window.history.back();
    return false;
  }

  handleReset(event) {
    const inputFields = this.template.querySelectorAll(
      'lightning-input-field'
    );
    if (inputFields) {
      inputFields.forEach(field => {
        field.reset();
      });
    }
    this.selectedEmpId = null;
      this.selectedSalNameObj = '';
      this.selectedSalId = '';
      this.selectedJobNameObj = '';
      this.selectedJobId = '';
      this.selectedLeaveNameObj = '';
      this.selectedLeaveId = '';
  }

  handleSuccess( event) {
    if (this.saveAndNew) {
      this.handleReset();
    } else {
      console.log('+++payload'+JSON.stringify(event.detail.id));
      if(event.detail.id){
      this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
          recordId: event.detail.id,
          objectApiName: 'Payroll__c',
          actionName: 'view'
        },
      });
    }
    }
  }
  handleSubmit(event) {
    
    event.preventDefault();       // stop the form from submitting
    const fields = event.detail.fields;
    fields.Salary_ID__c = this.selectedSalId;
    fields.Job_ID__c = this.selectedJobId;
    fields.Leave_ID__c = this.selectedLeaveId;
    console.log('++inSybmit'+JSON.stringify(fields));
    //do changes to Address field as below
    this.template.querySelector('lightning-record-edit-form').submit(fields);

  }

  handleJobSelection(event) {
    this.selectedJobNameObj = event.target.getAttribute('data-selectedjobname');
    this.selectedJobId = event.target.getAttribute('data-selectedjob');
    this.jobSelected = true;
    this.showJobList = false;
  }
  handleLeaveSelection(event) {
    this.selectedLeaveNameObj = event.target.getAttribute('data-selectedleavename');
    this.selectedLeaveId= event.target.getAttribute('data-selectedleave');
    this.LeaveSelected = true;
    this.showLeaveList = false;
    this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';

  }
  handLeaveChange(event) {
    this.selectedLeaveNameObj = '';
    this.selectedLeaveId = '';
    this.showLeaveList = true;
    this.LeaveSelected = false;
  }


  handleJobChange(event) {
    this.selectedJobNameObj = '';
    this.selectedJobId = '';
    this.showJobList = true;
    this.jobSelected = false;
  }

  handleListVisibiity(event) {
    if (this.selectedEmpId) {
      JobIdField({ empId: this.selectedEmpId })
        .then(result => {
          this.JobId = result;
          console.log("selected Row41 " + JSON.stringify(this.JobId));

        }).catch(error => {
          console.error(error)
        })
    }
    this.showJobList = true;
  }

  handleSalSelection(event) {
    this.selectedSalNameObj = event.target.getAttribute('data-selectedsalname');
    this.selectedSalId = event.target.getAttribute('data-selectedsal');
    this.showSalList = false;
    this.salSelected = true;
    this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
  }

  handleSalChange(event) {
    this.selectedSalNameObj = '';
    this.selectedSalId = '';
    this.showSalList = true;
    this.salSelected = false;
    console.log('+++InSalChanges');
  }

  handleSalListVisibiity(event) {
    if (this.selectedEmpId) {
      SalaryField({ empId: this.selectedEmpId })
        .then(result => {
          this.SalaryID = result;
          console.log("selected Row233" + JSON.stringify(this.SalaryID));

        }).catch(error => {
          console.error(error)
        })
    }
    this.showSalList = true;
  }
  handleLeaveVisibiity(event) {
    if (this.selectedEmpId) {
      LeaveField({ empId: this.selectedEmpId })
        .then(result => {
          this.LeaveID = result;
          console.log("selected Row246" + JSON.stringify(this.LeaveID));

        }).catch(error => {
          console.error(error)
        })
    }
    this.showLeaveList = true;
  }

  hideSalaryRecs(event) {
    this.showSalList = false;
  }

  hideJobRecs(event) {
    this.showJobList = false;
  }
  hideLeaveRecs(event) {
    this.showLeaveList = false;
  }
}