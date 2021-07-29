import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from "@angular/common";

import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { EsgscoredetailsComponent } from './esgscoredetails/esgscoredetails.component';
import { EsgactionsComponent } from './esgactions/esgactions.component';
import { EsgrewardsComponent } from './esgrewards/esgrewards.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, EsgscoredetailsComponent, EsgactionsComponent, EsgrewardsComponent],
  entryComponents: [],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
