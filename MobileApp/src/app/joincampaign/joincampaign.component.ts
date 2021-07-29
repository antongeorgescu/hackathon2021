import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joincampaign',
  templateUrl: './joincampaign.component.html',
  styleUrls: ['./joincampaign.component.scss'],
})
export class JoincampaignComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  public backclick():void{
    this.router.navigate(['esgscoredetails']);
  }

  public donateclick():void{
    this.router.navigate(['successcampaign']);
  }
}
