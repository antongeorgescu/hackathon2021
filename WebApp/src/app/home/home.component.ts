import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  scoredetails:any;
  energylist:any;
  ngOnInit(): void {
    this.scoredetails = [
      {"avatar":"assets/avatar1.png", "name": "Alex Manda", "active": "Active since 3 months", "points":"26823pt"},
      {"avatar":"assets/avatar2.png", "name": "Laura Santos", "active": "Active since 6 months", "points":"20823pt"},
      {"avatar":"assets/avatar3.png", "name": "Jadon S.", "active": "Active since 1 month", "points":"16823pt"}
    ];
    this.energylist = [
      {"image":"assets/energy1.png","name":"Home", "value":"3.434", "percent":"20%"},
      {"image":"assets/energy2.png","name":"Energy", "value":"3.434", "percent":"30%"},
      {"image":"assets/energy3.png","name":"Agriculture", "value":"3.434", "percent":"50%"},
    ]
  }

}
