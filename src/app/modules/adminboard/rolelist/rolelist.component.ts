import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { Filter, PaginationResult } from 'src/app/models/FilterModel';
import { RoleService } from 'src/app/services/role.service';
import localeFr from '@angular/common/locales/fr';
import { Role } from 'src/app/models/RoleModel';
import { Permission, PermissionName } from 'src/app/models/UserModel';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.scss']
})
export class RolelistComponent {
  canModifyRoleRoles = false

  roleSearchForm = new FormGroup({
    search: new FormControl<string>("")
  })

  filter = new Filter("", "asc")

  rolesResult = new PaginationResult<Role>()

  loading = false

  dialogRoleVisible = false
  actionType : 'edit' | 'create' = "create";

  roleForm = new FormGroup({
    rolename: new FormControl(''),
    description : new FormControl(''),
    permissions : new FormControl<{name:string,description:string}[]>([]),
    color : new FormControl('#FF0000')
  })

  permissionsDescription : { name : string, description : string }[] = []

  subs: Subscription[] = []


  constructor(private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService : NotifierService){
      registerLocaleData(localeFr);
    }

  ngOnInit(): void {
    for (const key in PermissionName.permissionDescriptions) {
        this.permissionsDescription.push({ name : key, description : PermissionName.getDescription(key)});
    }

    this.subs.push(...[
      this.route.queryParams.subscribe(params => {
        var searchParams = params['search'];
        this.roleSearchForm.controls.search.setValue(searchParams ? searchParams : "")
        this.Filter()
      }),
    ])

  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe())
  }

  Filter() {
    this.loading = true
    this.roleService.getRolesPaged(this.rolesResult.pageSize, this.rolesResult.pageNumber,this.filter, this.roleSearchForm.controls.search.value!).subscribe({
      next: (result) => {
        console.log(result)
        this.loading = false
        this.rolesResult = result
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { search: this.roleSearchForm.controls.search.value },
          queryParamsHandling: 'merge',
        });
      },
      error : () => this.loading = false
    })
  }

  onPageChange(event: { pageNumber: number, pageSize: number }) {
    this.rolesResult.pageSize = event.pageSize;
    this.rolesResult.pageNumber = event.pageNumber
    this.Filter()
  }

  ChangeFilterDirection() {
    this.filter.direction == 'asc' ? this.filter.direction = 'desc' : this.filter.direction = 'asc'
    this.Filter()
  }

  CreateRole(){
    if(this.roleForm.controls.rolename.value == null ||
      this.roleForm.controls.description.value == null ||
      this.roleForm.controls.color.value == null){
        this.notifyService.notify("error", "Tout les champs ne sont pas remplis")
    }
    else{
      this.loading = true
      var permissions : Permission[] = []
      this.permissionsDescription.forEach(permission => {
        var hasPermission = this.roleForm.controls.permissions.value?.filter(x => x.name == permission.name).length! > 0
        if(hasPermission){
          permissions.push({
            name : permission.name,
            hasPermission : hasPermission
          })
        }
      })
  
      var role = new Role(this.roleForm.controls.rolename.value!,
        this.roleForm.controls.description.value!,
        this.roleForm.controls.color.value!,
        permissions)
  
       this.roleService.createRole(role).subscribe({
         next: (result) => {
           this.loading = false
           if(result.success){
            this.notifyService.notify("success", "Role créer")
            this.Filter()
            this.dialogRoleVisible = false
           }
             
           else
             this.notifyService.notify("error", "Impossible de créer le role")
         },
         error: () => this.loading = false
       })
    }
  }

  UpdateRole(){
    if(this.roleForm.controls.rolename.value == null ||
      this.roleForm.controls.description.value == null ||
      this.roleForm.controls.color.value == null){
        this.notifyService.notify("error", "Tout les champs ne sont pas remplis")
    }
    else{
      this.loading = true
      var permissions : Permission[] = []
      this.permissionsDescription.forEach(permission => {
        var hasPermission = this.roleForm.controls.permissions.value?.filter(x => x.name == permission.name).length! > 0
        permissions.push({
          name : permission.name,
          hasPermission : hasPermission
        })
      })
      console.log(permissions)
  
  
      var role = new Role(this.roleForm.controls.rolename.value!,
        this.roleForm.controls.description.value!,
        this.roleForm.controls.color.value!,
        permissions)
  
      this.roleService.updateRole(role).subscribe({
        next: (result) => {
          this.loading = false
          if(result.success)
            this.notifyService.notify("success", "Role modifié")
          else
            this.notifyService.notify("error", "Impossible de modifier le role")
        },
        error: () => this.loading = false
      })
    }
  }

  DeleteRole(roleName : string, isDefault : boolean){
    if(!isDefault){
      this.loading = true
      this.roleService.deleteRole(roleName).subscribe({
        next: (result) => {
          this.loading = false
          if(result.success){
            this.Filter()
            this.notifyService.notify("success", "Role supprimé")
          }
  
          else
            this.notifyService.notify("error", "Impossible de supprimer le role")
        },
        error: () => this.loading = false
      })
    }
    else{
      this.notifyService.notify("error", "Impossible de supprimer un rôle de base")

    }
  }

  OpenEditDialog(role : Role, isDefault : boolean){
    if(!isDefault){
      this.dialogRoleVisible = true
      this.roleForm.controls.rolename.setValue(role.name)
      this.roleForm.controls.color.setValue(role.color);
      this.roleForm.controls.description.setValue(role.description)
      this.roleForm.controls.permissions.setValue(role.permissions.map(permission => {
        return {
            name: permission.name,
            description: this.permissionsDescription.find(x => x.name == permission.name)!.description
        };
     }))
     console.log(this.roleForm.controls.permissions.value)
    }

    else
      this.notifyService.notify("error", "Impossible de modifier un rôle de base")

  }

  OpenCreateDialog(){
    this.roleForm.reset()
    this.dialogRoleVisible = true
  }

  getPermissionDescription(permission : string){
    return PermissionName.getDescription(permission)
  }

}
