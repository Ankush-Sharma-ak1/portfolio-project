import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements AfterViewInit{


  @ViewChild('about') aboutElement: ElementRef;
  @ViewChild('experience') expElement: ElementRef;
  @ViewChild('technology') techElement: ElementRef;
  @ViewChild('education') eduElement: ElementRef;
  @ViewChild('recommendation') recommendationElement: ElementRef;
  @ViewChild('contact') contactElement: ElementRef;
  @ViewChild('drawer') drawerElement: MatSidenav;

  public currentActive = null;
  public aboutOffset: number = null;
  public techOffset: number = null;
  public expOffset: number = null;
  public educOffset: number = null;
  public recommOffset: number = null;
  public contactOffset: number = null;

   menuList: string [] = ['About', 'Technologies', 'Experience', 'Education', 'Recommendations', 'Contact'];
  scrollingItem = '';
  isSelected: boolean = false;
   
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  scrollView(item) {
    if(window.matchMedia("(max-width: 992px)").matches)
    {
      this.drawerElement.close();
    }
    document.getElementById(item + 'Div').scrollIntoView({behavior:"smooth"});
  }

  ngAfterViewInit() {
    this.aboutOffset = this.aboutElement.nativeElement.offsetTop;
    this.expOffset = this.expElement.nativeElement.offsetTop;
    this.techOffset = this.techElement.nativeElement.offsetTop;
    this.educOffset = this.eduElement.nativeElement.offsetTop;
    this.recommOffset = this.recommendationElement.nativeElement.offsetTop;
    this.contactOffset = this.contactElement.nativeElement.offsetTop;

  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    var elementId = '';
    var elementArray = [];

  if(window.pageYOffset >= this.aboutOffset && window.pageYOffset < this.techOffset)
  {
    elementId = 'About';
   this.router.navigate(['About']);
   elementArray.push('Technologies');
  
  }
  else if( window.pageYOffset >= this.techOffset && window.pageYOffset < this.expOffset) {
    elementId = 'Technologies';
    this.router.navigate(['Technologies']);
    elementArray.push('About', 'Experience');
  } 
  else if (window.pageYOffset >= this.expOffset && window.pageYOffset < this.educOffset) {
    elementId = 'Experience';
    this.router.navigate(['Experience']);
    elementArray.push('Technologies', 'Education');
  }
  else if(window.pageYOffset >= this.educOffset && window.pageYOffset < this.recommOffset) {
    elementId = 'Education';
    this.router.navigate(['Education']);
    elementArray.push('Experience', 'Recommendations');
  }
  else if(window.pageYOffset >= this.recommOffset && window.pageYOffset < this.contactOffset) {
    elementId = 'Recommendations';
    this.router.navigate(['Recommendations']);
    elementArray.push('Education','Contact');
  }
  else if (window.pageYOffset >= this.contactOffset) {
    elementId= 'Contact';
    this.router.navigate(['Contact']);
    elementArray.push('Recommendations');
  }
  this.removeActiveClass(elementArray);
  if(elementId != '')
    document.getElementById(elementId).classList.add('is-Active');

  }

  removeActiveClass(eleArray) {
    for(let i=0; i< eleArray.length; i++) {
      document.getElementById(eleArray[i]).classList.remove('is-Active');
    }
   
  }
 
}
