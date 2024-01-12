import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Filter, PaginationResult } from 'src/app/models/FilterModel';
import { User } from 'src/app/models/UserModel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit{

  userSearchForm = new FormGroup({
    search : new FormControl('')
  })

  sortByValues = [
    {label: 'Defaut', value: 'default'},
    {label: 'Pseudo', value: 'username'},
    {label: 'UUID', value: 'uuid'},
    {label: 'Role', value: "role"},
  ]

  sortByForm = new FormGroup({
    sortBy : new FormControl(this.sortByValues[0])
  })

  filter = new Filter("default", "asc")

  usersResult = new PaginationResult<User>()



  constructor(private apiService : ApiService){}

  ngOnInit(): void {
    console.log()
    this.Filter()
  }

  Filter(){
    this.apiService.getPaged('user',this.usersResult.pageSize, this.usersResult.pageNumber, this.filter).subscribe({
      next: (users : User[]) => {
        this.usersResult.items = users
      }
    })

    this.sortByForm.controls.sortBy.valueChanges.subscribe({
      next : () => {
        this.filter.name = this.sortByForm.controls.sortBy.value?.value!
      }
    })
  }

  onPageChange(event : any){
    console.log(event)
  }
}
