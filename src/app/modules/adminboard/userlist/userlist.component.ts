import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Filter, PaginationResult } from 'src/app/models/FilterModel';
import { User, UsersByCategories } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit{

  userSearchForm = new FormGroup({
    search : new FormControl<string>("")
  })

  sortByValues = [
    {label: 'Defaut', value: 'default'},
    {label: 'Pseudo', value: 'username'},
    {label: 'UUID', value: 'uuid'},
    {label: 'Role', value: "role"},
  ]
  sortByForm = new FormGroup({
    sortBy : new FormControl(this.sortByValues[1])
  })
  filter = new Filter("username", "asc")

  usersResult = new PaginationResult<UsersByCategories>()

  loading = false

  dialogUserModifyVisible = false

  modifyUserRolePermissionForm = new FormGroup({
    roles : new FormControl(''),
    permissions : new FormControl('')
  })

  constructor(private userService : UserService){}

  ngOnInit(): void {
    this.Filter()

    this.sortByForm.valueChanges.subscribe({
      next: () => {
        this.Filter()
      }
    })
  }

  Filter(){
    console.log("start filtering")
    this.userService.getAllUsersPaged(this.usersResult.pageSize, this.usersResult.pageNumber, this.filter, this.userSearchForm.controls.search.value!).subscribe({
      next: (result) => {
        this.usersResult = result
        console.log(this.usersResult.items)
      }
    })

    this.sortByForm.controls.sortBy.valueChanges.subscribe({
      next : () => {
        this.filter.name = this.sortByForm.controls.sortBy.value?.value!
      }
    })
  }

  changeFilterDirection(){
    this.filter.direction == 'asc' ? this.filter.direction = 'desc' : this.filter.direction = 'asc' 
    this.Filter()
  }
}
