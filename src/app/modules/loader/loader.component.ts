// loading.component.ts
import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit{
  @Input() size = "100"
  @Input() radius = "0"
  @Input() margin = "0"

  constructor(private elem: ElementRef){
    this.elem.nativeElement.style.setProperty('--size', `${this.size}px`);
    this.elem.nativeElement.style.setProperty('--radius', `${this.radius}px`);
    this.elem.nativeElement.style.setProperty('--margin', `-${this.margin}px`);
}   

  ngOnInit(): void {
    
  }
}
