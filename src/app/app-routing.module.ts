import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { TechnologiesComponent } from './technologies/technologies.component';

const routes: Routes = [
  {path: '', redirectTo: '/app', pathMatch: 'full'},
  {path: 'app', component: AppComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Education', component: EducationComponent},
  {path: 'Experience', component: ExperienceComponent},
  {path: 'Technologies', component: TechnologiesComponent},
  {path: 'Recommendations', component: RecommendationComponent},
  {path: 'Contact', component: ContactComponent},
  //{path: '404', component: AppComponent},
  {path: '**', redirectTo: '/app'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
