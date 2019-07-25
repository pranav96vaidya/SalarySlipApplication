import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SalaryDetailService {
  list= [
    { name: "pranav vaidya", designation: "trainee System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Rahul Singh Solanki", designation: "System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Sagar Mishra", designation: "System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Gaurav Agrawal", designation: "trainee System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Abhijeet Bhowmik", designation: "System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Piyush Chandak", designation: "System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Mohit Jain", designation: "trainee System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Sagar Gupta", designation: "System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Nitesh Thakur", designation: "System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Aditya Paliwal", designation: "trainee System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Deepak Patidar", designation: "System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },
    { name: "Siya", designation: "System engineer", basic: 16000, 
      grossSalary: 30000, totalDeductions: 2000, netSalaryPayableRs: 28000, bank: "adadas",
      accountNo: 12313123, ifsc: "asdasd", esicNo: 123123, pfUan: "asda"
    },

  ]
  getSalaryDetails() {
    return this.list;
  }

}