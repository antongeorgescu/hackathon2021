import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esgrewards',
  templateUrl: './esgrewards.component.html',
  styleUrls: ['./esgrewards.component.scss'],
})
export class EsgrewardsComponent implements OnInit {
  score:any;
  badgelist:any;
  couponlist:any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.score = localStorage.getItem('greenscore');
    this.badgelist = [{"level":"Beginner", "image":"assets/badge1.png"},{"level":"Donator", "image":"assets/badge2.png"},{"level":"Beginner", "image":"assets/badge1.png"}]
    this.couponlist = [
      {"title":"A jar of Honey", "desc":"Alveole | expire in 1 week", "image":"assets/coupon1.png"},
      {"title":"5% ecological dry cleaning discount", "desc":"Eco Fresh | expire in 16 days", "image":"assets/coupon2.png"},
      {"title":"1 day bike rental", "desc":"Gears | expire in 24 days", "image":"assets/coupon3.png"}
    ]
  }
  
  public closeclick():void{
    this.router.navigate(['esgscore']);
  }

  public overviewClick():void{
    this.router.navigate(['esgscoredetails']);
  }
  public rewardclick():void{
    this.router.navigate(['esgrewards']);
  }

  public actionclick():void{
    this.router.navigate(['esgactions']);
  }
}
