import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ContentfulService } from '../../services/contentful.service';

import { AboutUsComponent } from '../../about/about-us/about-us.component';
import { OurStoriesComponent } from '../../about/our-stories/our-stories.component';
import { OurIdeaComponent } from '../../about/our-idea/our-idea.component';
import { EuFashionComponent } from '../../about/eu-fashion/eu-fashion.component';
import { FairPriceComponent } from '../../about/fair-price/fair-price.component';
import { FutureComponent } from '../../about/future/future.component';
import { AboutMenuComponent } from '../../about/about-menu/about-menu.component';
import { LeagueComponent } from '../../about/leather/league/league.component';
import { TechIntroComponent } from '../../about/leather/tech-intro/tech-intro.component';
import { CertifComponent } from '../../about/leather/certif/certif.component';



const routes: Routes = [
  {
    path: 'aboutus',
    component: AboutUsComponent
  },
  {
    path: 'ourstories',
    component: OurStoriesComponent
  },
  {
    path: 'ouridea',
    component: OurIdeaComponent
  },
  {
    path: 'eufashion',
    component: EuFashionComponent
  },
  {
    path: 'fairprice',
    component: FairPriceComponent
  },
  {
    path: 'future',
    component: FutureComponent
  },
  {
    path: 'league',
    component: LeagueComponent
  },
];

@NgModule({
  declarations: [
    AboutUsComponent,
    OurStoriesComponent,
    OurIdeaComponent,
    OurIdeaComponent,
    EuFashionComponent,
    FairPriceComponent,
    FutureComponent,
    AboutMenuComponent,
    LeagueComponent,
    TechIntroComponent,
    CertifComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [ContentfulService],
})
export class LazyAboutModule { }