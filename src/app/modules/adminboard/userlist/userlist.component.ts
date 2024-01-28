import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Filter, PaginationResult } from 'src/app/models/FilterModel';
import { User, UsersByCategories } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';
import { PermissionName } from 'src/app/models/UserModel';
import { Subscription } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit, OnDestroy {
  canModifyUserRoles = false
  canModifyUserPunishment = false
  currentUserUserName = ""

  userSearchForm = new FormGroup({
    search: new FormControl<string>("")
  })

  sortByValues = [
    { label: 'Defaut', value: 'default' },
    { label: 'Pseudo', value: 'username' },
    { label: 'UUID', value: 'uuid' },
  ]
  sortByForm = new FormGroup({
    sortBy: new FormControl(this.sortByValues[0])
  })
  filter = new Filter("default", "asc")

  usersResult = new PaginationResult<UsersByCategories>()

  loading = false

  dialogModifyUserInformationsVisible = false
  dialogModifyUserPunishmentVisible = false

  modifyUserInformationsForm = new FormGroup({
    username: new FormControl(''),
    uuid : new FormControl(''),
    roles: new FormControl<string[]>([]),
  })
  modifyUserPunishmentForm = new FormGroup({
    username: new FormControl(),
    banishmentEnd: new FormControl<Date | null>(null),
    lockoutEnd: new FormControl<Date | null>(null),
  })

  userSelectedBanishmentEnd : Date | null = null
  userSelectedLockoutEnd : Date | null = null

  existingRoles: string[] = []

  subs: Subscription[] = []

  constructor(private userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService : NotifierService){
      registerLocaleData(localeFr);
    }

  ngOnInit(): void {
    this.subs.push(...[
      this.sortByForm.valueChanges.subscribe({
        next: () => {
          this.filter.name = this.sortByForm.controls.sortBy.value?.value!
          this.Filter()
        }
      }),

      this.roleService.getRoles().subscribe({
        next: (roles) => {
          this.existingRoles = roles
        }
      }),

      this.userService.getCurrentUserObservable().subscribe({
        next: (user) => {
          if (user) {
            this.currentUserUserName = user.userName
          }
        }
      }),

      this.route.queryParams.subscribe(params => {
        var searchParams = params['search'];
        this.userSearchForm.controls.search.setValue(searchParams ? searchParams : "")
        this.Filter()
      }),
      
      this.modifyUserPunishmentForm.valueChanges.subscribe({
        next: () => {
          this.userSelectedBanishmentEnd = this.modifyUserPunishmentForm.controls.banishmentEnd.value
          this.userSelectedLockoutEnd = this.modifyUserPunishmentForm.controls.lockoutEnd.value
        }
      })
    ])
    this.canModifyUserRoles = this.userService.hasPermission(PermissionName.UpdateUserRole)
    this.canModifyUserPunishment = this.userService.hasPermission(PermissionName.UpdateUserPunishment)

  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }

  Filter() {
    this.loading = true
    this.userService.getAllUsersPaged(this.usersResult.pageSize, this.usersResult.pageNumber, this.filter, this.userSearchForm.controls.search.value!).subscribe({
      next: (result) => {
        this.loading = false
        this.usersResult = result
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { search: this.userSearchForm.controls.search.value },
          queryParamsHandling: 'merge',
        });
      },
      error : () => this.loading = false
    })
  }

  OpenModifyUserInformationsDialog(user: User) {
    this.modifyUserInformationsForm.setValue({
      username: user.userName,
      uuid: user.uuid,
      roles: user.roles
    })
    this.dialogModifyUserInformationsVisible = true
  }

  OpenModifyUserPunishmentDialog(user: User) {
    console.log(user)

    this.modifyUserPunishmentForm.setValue({
      username : user.userName,
      banishmentEnd : user.banishmentEnd,
      lockoutEnd : user.lockoutEnd
    })
    this.dialogModifyUserPunishmentVisible = true
  }

  ModifyUserInformations() {
    this.loading = true
    this.userService.updateUserInformations(this.modifyUserInformationsForm.controls.username.value, this.modifyUserInformationsForm.controls.uuid.value!, this.modifyUserInformationsForm.controls.roles.value!).subscribe({
      next: (result) => {
        this.loading = false

        if(result.success){
          this.Filter()
          this.dialogModifyUserInformationsVisible = false
          this.notifyService.notify("success", "Utilisateur modifié")
        }
        else{
          this.notifyService.notify("error", "Erreur dans la modification de l'utilisateur")

        }
      },
      error : () => {
        this.notifyService.notify("error", "Erreur dans la modification de l'utilisateur")
        this.loading = false
      }
    })
  }

  ModifyUserPunishment(){
    console.log(this.modifyUserPunishmentForm.controls.username.value,this.userSelectedBanishmentEnd, this.userSelectedLockoutEnd)
    this.loading = true
    this.userService.updateUserPunishments(this.modifyUserPunishmentForm.controls.username.value,this.userSelectedBanishmentEnd, this.userSelectedLockoutEnd).subscribe({
      next: (result) => {
        console.log(result)
        this.loading = false
        if(result.success){
          this.Filter()
          this.dialogModifyUserPunishmentVisible = false
          this.notifyService.notify("success", "Sanctions modifiés")
        }
        else{
          this.notifyService.notify("error", "Erreur dans la modification des sanctions")

        }
      },
      error : () => {
        this.notifyService.notify("error", "Erreur dans la modification des sanctions")
        this.loading = false
      }
    })
  }

  DeletePunishment(type : 'banishment' | 'lockout'){
    if(type == 'banishment'){
      this.modifyUserPunishmentForm.controls.banishmentEnd.setValue(null)
    }
    else{
      this.modifyUserPunishmentForm.controls.lockoutEnd.setValue(null)
    }
  }

  AddDurationToPunishment(type : 'banishment' | 'lockout', durationInHour : number){
    const control = type === 'banishment' ? this.modifyUserPunishmentForm.controls.banishmentEnd : this.modifyUserPunishmentForm.controls.lockoutEnd;
  
    var actualValue = new Date()
    if(durationInHour == -1){
      actualValue = new Date(9999, 11, 31, 23, 59, 59, 999)
    }
    else{
      actualValue = control.value == null ? new Date() : new Date(control.value)
      actualValue.setHours(actualValue.getHours() + durationInHour)
      if(actualValue > new Date(9999, 11, 31, 23, 59, 59, 999)){
        actualValue = new Date(9999, 11, 31, 23, 59, 59, 999)
      }
    }
  
    console.log(actualValue);
    control.patchValue(actualValue);
    control.updateValueAndValidity();

  }


  onPageChange(event: { pageNumber: number, pageSize: number }) {
    this.usersResult.pageSize = event.pageSize;
    this.usersResult.pageNumber = event.pageNumber
    this.Filter()
  }

  changeFilterDirection() {
    this.filter.direction == 'asc' ? this.filter.direction = 'desc' : this.filter.direction = 'asc'
    this.Filter()
  }


}
