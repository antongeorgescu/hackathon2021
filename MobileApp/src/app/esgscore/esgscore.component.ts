import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinesgapiService } from '../finesgapi.service';

@Component({
  selector: 'app-esgscore',
  templateUrl: './esgscore.component.html',
  styleUrls: ['./esgscore.component.scss'],
})
export class EsgscoreComponent implements OnInit {

  constructor(private router: Router, private esgservice:FinesgapiService) { }
  score:any;
  ngOnInit() {
    this.esgservice.getGreenScore().subscribe(res=>{
      this.score = res.GreenPoints;
      localStorage.setItem('greenscore', this.score);
    });
    localStorage.setItem("finesgadopted", "1");
  }

  public backwardclick():void{
    this.router.navigate(['esgwelcome']);
  }

  public forwardclick():void{
      this.router.navigate(['esgscoredetails']);
  }
}
