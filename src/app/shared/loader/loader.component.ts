// loading.component.ts
import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit{
  @Input() size: any
  @Input() radius : any
  @Input() margin : any

  constructor(private elem: ElementRef){

}   

  ngOnInit(): void {
    console.log(this.size)
    if(this.size == undefined || this.size == null){
      this.size = "100"
    }
    if(this.radius == undefined || this.radius == null){
      this.radius = "0"
    }
    if(this.margin == undefined || this.margin == null){
      this.margin = "0"
    }
    this.elem.nativeElement.style.setProperty('--size', `${this.size}px`);
    this.elem.nativeElement.style.setProperty('--radius', `${this.radius}px`);
    this.elem.nativeElement.style.setProperty('--margin', `-${this.margin}px`);
  }
}
