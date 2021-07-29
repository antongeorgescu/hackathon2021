import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finesgwelcome',
  templateUrl: './finesgwelcome.component.html',
  styleUrls: ['./finesgwelcome.component.scss'],
})
export class FinesgwelcomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  public backclick():void{
    this.router.navigate(['/']);
  }

  public LaunchEsgScore():void{
    this.router.navigate(['esgscore']);
  }
}
