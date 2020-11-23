import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
       // height: '200px',
       //right: '-100%',
        opacity: 1,
        transform: 'translateX(0)',
        //backgroundColor: 'yellow'
      })),
      state('closed', style({
       // height: '100px',
        opacity: 0.3,
       // backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s ease-out')
      ]),
      transition('closed => open', [
        animate('1s ease-out')
      ]),
    ]),
  ]
})
export class MainNavComponent implements AfterViewInit{


  @ViewChild('about') aboutElement: ElementRef;
  @ViewChild('experience') expElement: ElementRef;
  @ViewChild('technology') techElement: ElementRef;
  @ViewChild('personalDetails') eduElement: ElementRef;
  @ViewChild('drawer') drawerElement: MatSidenav;

  public currentActive = null;
  public aboutOffset: number = null;
  public techOffset: number = null;
  public expOffset: number = null;
  public educOffset: number = null;
  isAboutOpen = false;
  isTechOpen = false;
  isExpOpen = false;
  isEduOpen = false;

   menuList: string [] = ['About', 'Technologies', 'Experience', 'Personal-Details'];
  
   
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  scrollView(item) {
    if(this.breakpointObserver.isMatched("(max-width: 992px)"))
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
  }
  

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    var elementId = '';
    var elementArray = [];
   this.isAboutOpen = false;
   this.isTechOpen = false;
   this.isExpOpen = false;
   this.isEduOpen = false;
  if(window.pageYOffset >= (this.aboutOffset-50)  && window.pageYOffset < (this.techOffset-50) )
  {
    elementId = 'About';
  // this.router.navigate(['About']);
   elementArray.push('Technologies');
  this.isAboutOpen = true;
  }
  else if( window.pageYOffset >= (this.techOffset-50) && window.pageYOffset < (this.expOffset-50) ) {
    elementId = 'Technologies';
  //  this.router.navigate(['Technologies']);
    elementArray.push('About', 'Experience');
    this.isTechOpen = true;
  
  }
  else if (window.pageYOffset >= (this.expOffset-50) && window.pageYOffset < (this.educOffset-300)) {
    elementId = 'Experience';
    //this.router.navigate(['Experience']);
    elementArray.push('Technologies', 'Personal-Details');
    this.isExpOpen = true;
  }
  else if(window.pageYOffset >= (this.educOffset-300)) {
    elementId = 'Personal-Details';
  //  this.router.navigate(['Education']);
    elementArray.push('Experience');
    this.isEduOpen = true;
  }

  this.removeActiveClass(elementArray);
  if(elementId != '')
  {  
    
    document.getElementById(elementId).classList.add('is-Active');
    document.getElementById(elementId + 'Div').classList.add('custom-background');
  }
  }

  removeActiveClass(eleArray) {
    for(let i=0; i< eleArray.length; i++) {
      document.getElementById(eleArray[i]).classList.remove('is-Active');
      document.getElementById(eleArray[i] + 'Div').classList.remove('custom-background');
    }
   
  }
 
}
