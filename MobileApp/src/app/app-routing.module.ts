import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EsgactionsComponent } from './esgactions/esgactions.component';
import { EsgrewardsComponent } from './esgrewards/esgrewards.component';
import { EsgscoreComponent } from './esgscore/esgscore.component';
import { EsgscoredetailsComponent } from './esgscoredetails/esgscoredetails.component';
import { FinesgwelcomeComponent } from './finesgwelcome/finesgwelcome.component';
import { HomeComponent } from './home/home.component';
import { JoincampaignComponent } from './joincampaign/joincampaign.component';
import { SuccesscampaignComponent } from './successcampaign/successcampaign.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'esgwelcome', component:FinesgwelcomeComponent},
  { path: 'esgscore', component:EsgscoreComponent},
  { path: 'esgscoredetails', component:EsgscoredetailsComponent},
  { path: 'joincampaign', component:JoincampaignComponent},
  { path: 'successcampaign', component:SuccesscampaignComponent},
  { path: 'esgactions', component:EsgactionsComponent},
  { path: 'esgrewards', component:EsgrewardsComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
