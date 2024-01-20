import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent  implements OnInit, OnDestroy{


  @Input() pageNumber: number = 1;
  @Input() pageSize: number = 10
  @Input() itemsCount: number = 0
  @Input() pageSizeOptions : number[] = [5,10,25,50,100]
  @Output() onChange: EventEmitter<{ pageNumber: number, pageSize: number }> = new EventEmitter<{ pageNumber: number, pageSize: number }>();

  pagerForm = new FormGroup({
    pageSize : new FormControl(10),
    pageNumber : new FormControl(1)
  })

  subs : Subscription[] = []

  ngOnInit(): void {
    this.pagerForm.setValue({
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
    })

    this.subs.push(...[
      this.pagerForm.valueChanges.subscribe({
        next: (pageFormData) => {
          this.onChange.emit({
            pageNumber : pageFormData.pageNumber!,
            pageSize : pageFormData.pageSize!
          })
        }
      })
    ])
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }
}
