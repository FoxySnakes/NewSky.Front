import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent  implements OnInit, OnDestroy, OnChanges{

  @Input() pageNumber: number = 1;
  @Input() pageSize: number = 10
  @Input() itemsCount: number = 0
  @Input() pageSizeOptions : number[] = [5,10,25,50,100]
  @Output() onPageChange: EventEmitter<{ pageNumber: number, pageSize: number }> = new EventEmitter<{ pageNumber: number, pageSize: number }>();

  lastPage = 1

  pagerForm = new FormGroup({
    pageSize : new FormControl(10),
    pageNumber : new FormControl(1)
  })

  subs : Subscription[] = []

  ngOnChanges(changes: SimpleChanges): void {
    this.lastPage = Math.ceil(this.itemsCount / this.pageSize) == 0 ? 1 : Math.ceil(this.itemsCount / this.pageSize)
  }

  ngOnInit(): void {
    this.lastPage = Math.ceil(this.itemsCount / this.pageSize) == 0 ? 1 : Math.ceil(this.itemsCount / this.pageSize)
    this.pagerForm.setValue({
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
    })

    this.subs.push(...[
      this.pagerForm.controls.pageNumber.valueChanges.subscribe({
        next: (newPageNumber) => {
          this.pageNumber = newPageNumber!
          this.lastPage = Math.ceil(this.itemsCount / this.pageSize) == 0 ? 1 : Math.ceil(this.itemsCount / this.pageSize)

          this.onPageChange.emit({
            pageNumber : this.pageNumber,
            pageSize : this.pageSize
          })
        }
      }),
      this.pagerForm.controls.pageSize.valueChanges.subscribe({
        next: (newPageSize) => {
          this.pageNumber = 1
          this.pageSize = newPageSize!
          this.lastPage = Math.ceil(this.itemsCount / this.pageSize) == 0 ? 1 : Math.ceil(this.itemsCount / this.pageSize)

          this.onPageChange.emit({
            pageNumber : this.pageNumber,
            pageSize : this.pageSize
          })
        }
      })
    ])
  }

  changePageNumber(newPageNumber : number){
    if(newPageNumber != this.pageNumber && newPageNumber > 0 && newPageNumber <= this.lastPage)
      this.pagerForm.controls.pageNumber.setValue(newPageNumber)
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }
}
