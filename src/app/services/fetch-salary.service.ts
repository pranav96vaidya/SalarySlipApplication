import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FetchSalaryService {
  employee: {
    name: string; designation: string; basic: number; professionalTax: number; hra: number;  tds: number;
    lta: number; esic: number; advanceBonus: number; pf: number; advanceGratuity: number; 
    professionalAllowance: number; grossSalary: number; totalDeductions: number; 
    netSalaryPayableRs: number; bank: string; accountNo: number; ifsc: string; 
    esicNo: string; pfUan: string;
  };
  name ="Pranav Vaidya";
  designation="trainee software Engineer";
  basic=16000;
  hra=6400;
  lta=2000;
  advanceBonus=1333;
  advanceGratuity=770; 
  professionalAllowance=3497;
  grossSalary= this.basic+this.hra+this.lta+this.advanceBonus+ this.advanceGratuity+this.professionalAllowance;
  professionalTax=208;
  tds=null;
  pf=null; 
  esicNo= "Not Applicable";
  esic=null;
  totalDeductions=this.professionalTax + this.tds + this.esic + this.pf;
  netSalaryPayableRs=this.grossSalary - this.totalDeductions;
  accountNo=1234567890;
  bank="ABC bank";
  ifsc="XYZ";
  pfUan="Not Applicable";
  constructor(private http: HttpClient) { }

  fetchSalary() {
    var employee = {
        name: this.name, designation: this.designation, basic: this.basic, 
        professionalTax: this.professionalTax,
        hra: this.hra, tds: this.tds, lta: this.lta, esic: this.esic, 
        advanceBonus: this.advanceBonus, pf: this.pf, advanceGratuity: this.advanceGratuity, 
        professionalAllowance: this.professionalAllowance, 
        grossSalary: this.grossSalary, 
        totalDeductions: this.totalDeductions,
        netSalaryPayableRs: this.netSalaryPayableRs, bank: this.bank,
        accountNo: this.accountNo, ifsc: this.ifsc, 
        esicNo: this.esicNo, 
        pfUan: this.pfUan
    }
    return employee;
  }

}