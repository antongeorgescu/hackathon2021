import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successcampaign',
  templateUrl: './successcampaign.component.html',
  styleUrls: ['./successcampaign.component.scss'],
})
export class SuccesscampaignComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  public closeclick():void{
    this.router.navigate(['home']);
  }
}
