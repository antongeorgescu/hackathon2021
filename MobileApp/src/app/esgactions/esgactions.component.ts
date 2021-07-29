import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esgactions',
  templateUrl: './esgactions.component.html',
  styleUrls: ['./esgactions.component.scss'],
})
export class EsgactionsComponent implements OnInit {
  score:any;
  programlist:any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.programlist = ['assets/program1.png','assets/program2.png','assets/program3.png','assets/program4.png','assets/program5.png','assets/program6.png']
    this.score = localStorage.getItem('greenscore');
  }

  public overviewClick():void{
    this.router.navigate(['esgscoredetails']);
  }
  public rewardclick():void{
    this.router.navigate(['esgrewards']);
  }

  public closeclick():void{
    this.router.navigate(['esgscore']);
  }
}
