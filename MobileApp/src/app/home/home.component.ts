import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, ViewDidEnter {

  data:any;
  accountdata:any;
  finesgadopted:any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.accountdata =[{
      acctname:'Main account',
      amount:'7,406.42'
    },
    {
      acctname:'Loan account',
      amount:'3,206.42'
    }];
    fetch('./assets/data/transactions.json').then(res => res.json())
    .then(json => {
      this.data = json;
    });
   
  }

  public launchesgscore():void{
    this.router.navigate(['esgscoredetails']);
  }
  ionViewDidEnter(){
    this.finesgadopted = localStorage.getItem("finesgadopted");
    console.log(this.finesgadopted);
  }

  public launchesgwelcome():void{
    this.router.navigate(['esgwelcome']);
  }
}
