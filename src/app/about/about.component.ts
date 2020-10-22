import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  // @HostListener('window:wheel', ['$event'])
  // onWheelScroll(evento: WheelEvent) {
  //   // Scroll up
  //   if (evento.deltaY > 0) {
  //     this.router.navigate(['Experience']);
  //   }
  //   else { // Scroll up
  //     this.router.navigate(['About']);
  //   }
  // }

//   @HostListener('window:scroll', ['$event'])
// checkOffsetTop() {
//   console.log(window.pageYOffset); // this will console log our scroll position
// }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
