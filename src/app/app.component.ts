import { AotSummaryResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as AOS from "aos";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'portfolio';

  ngOnInit(): void {
       // AOS.init();
  }

}
