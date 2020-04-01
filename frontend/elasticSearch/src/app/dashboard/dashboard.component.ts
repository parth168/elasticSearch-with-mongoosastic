import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { allUsersDetail,deleteUSer,updateUser,getOneById,addUser } from '../response';
import { FormBuilder,FormGroup,Validators } from '@angular/forms'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userSearvice : UserService,
    private toastr : ToastrService,
    private formBuilder: FormBuilder
  ) { }

  form: FormGroup;
  loading:boolean = false;
  submitButton:boolean = false;
  submitted:boolean = false;
  showForm:boolean = false;

  data = [];
  totalPage: any;
  totalUser: number;
  totalPageArray: any;
  search : string ='';
  currentPage: number = 1;
  perPageData: number = 10;
  sortBy:string = '';
  sortorder:number = 0;
  ngOnInit(): void {
    this.userSearvice.getAll(this.search,this.currentPage,this.perPageData,this.sortBy,this.sortorder)
          .subscribe(
            (data: allUsersDetail)=>{
              if(data.code == 200){
                this.totalUser = data.data.totalCount;
                this.totalPage = this.totalUser/10;
                if(this.totalPage > parseInt(this.totalPage))
                {
                  this.totalPage = parseInt(this.totalPage)+1;
                }
                this.totalPageArray = new Array(this.totalPage);
                this.data = data.data.user;
              }
              else{
                this.toastr.error(data.message);
              }
            },
            (error: HttpErrorResponse)=>{
              this.toastr.error(error.error.message);
            }
          );
          this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            city: ['', Validators.required]
          });
  }


  get f() { return this.form.controls; }

  searchByInput(){
    this.currentPage = 1;
    this.userSearvice.getAll(this.search,1,this.perPageData,this.sortBy,this.sortorder)
    .subscribe(
      (data: allUsersDetail)=>{
        if(data.code == 200){
          this.totalUser = data.data.totalCount;
          this.totalPage = this.totalUser/10;
          if(this.totalPage > parseInt(this.totalPage))
          {
            this.totalPage = parseInt(this.totalPage)+1;
          }
          this.totalPageArray = new Array(this.totalPage);
          this.data = data.data.user;
        }
        else{
          this.toastr.error(data.message);
        }
      },
      (error: HttpErrorResponse)=>{
        this.toastr.error(error.error.message);
      }
    );
  }

  sortOrderName:number = -1;
  sortByName(){
    this.sortBy = 'name';
    if(this.sortOrderName == 1){
      this.sortOrderName = -1;
      this.sortorder = -1;
    }
    else{
      this.sortOrderName = 1;
      this.sortorder = 1;
    }
    this.sort();
  }
  
  sortOrderEmail:number = -1;
  sortByEmail(){
    this.sortBy = 'email';
    if(this.sortOrderEmail == 1){
      this.sortOrderEmail = -1;
      this.sortorder = -1;
    }
    else{
      this.sortOrderEmail = 1;
      this.sortorder = 1;
    }
    this.sort();
  }

  sortOrderCity:number = -1;
  sortByCity(){
    this.sortBy = 'city';
    if(this.sortOrderCity == 1){
      this.sortOrderCity = -1;
      this.sortorder = -1;
    }
    else{
      this.sortOrderCity = 1;
      this.sortorder = 1;
    }
    this.sort();
  }

  sort(){
    this.userSearvice.getAll(this.search,this.currentPage,this.perPageData,this.sortBy,this.sortorder)
          .subscribe(
            (data:allUsersDetail)=>{
              if(data.code == 200){
                this.data = data.data.user;
              }
              else{
                this.toastr.error(data.message);
              }
            },
            (error:HttpErrorResponse)=>{
              this.toastr.error(error.error.message);
            }
          );
  }

  addNewUser(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.showForm = true;
  }

  updateForm:boolean = false;
  id:string;
  updateUser(id:string){
    this.userSearvice.getOneById(id)
          .subscribe(
            (user:getOneById)=>{
              if(user.code == 200){
                this.form = this.formBuilder.group({
                  name: [user.data.name, Validators.required],
                  email: [user.data.email, Validators.required],
                  city: [user.data.city, Validators.required]
                });
                this.showForm = true;
                this.updateForm = true;
                this.id = id;
              }
              else{
                this.toastr.error(user.message);
              }
            },
            (error:HttpErrorResponse)=>{
              this.toastr.error(error.error.message);
            }
          );
  }

  deleteUser(id:string){
    this.userSearvice.deleteUser(id)
          .subscribe(
            (data:deleteUSer)=>{
              if(data.code == 200){
                this.data = this.data.filter((user)=>{
                  return user._id != id;
                });
                this.toastr.success(data.message);
                this.totalUser =  this.totalUser-1;
                this.totalPage = this.totalUser/10;
                if(this.totalPage > parseInt(this.totalPage))
                {
                  this.totalPage = parseInt(this.totalPage)+1;
                }
                this.totalPageArray = new Array(this.totalPage);
              }
              else{
                this.toastr.error(data.message);
              }
            },
            (error: HttpErrorResponse)=>{
              this.toastr.error(error.error.message);
            }
          );
  }

  changepage(page: number){
    this.currentPage = page;
    this.userSearvice.getAll(this.search,page,this.perPageData,this.sortBy,this.sortorder)
    .subscribe(
      (data: allUsersDetail)=>{
        if(data.code == 200){
          this.data = data.data.user;
        }
        else{
          this.toastr.error(data.message);
        }
      },
      (error: HttpErrorResponse)=>{
        this.toastr.error(error.error.message);
      }
    );
  }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    let formValue = this.form.value;
    if(this.updateForm){
      this.userSearvice.updateUSer(this.id,formValue)
            .subscribe(
              (newData:updateUser)=>{
                if(newData.code == 200){
                  for(let i in this.data){
                    if(this.data[i]._id == newData.data._id){
                      this.data[i].name  = newData.data.name;
                      this.data[i].email = newData.data.email;
                      this.data[i].city = newData.data.city;
                    }
                  }
                  this.showForm = false;
                  this.submitted = false;
                  this.loading = false;
                }
                else{
                  this.toastr.error(newData.message);
                }
              },
              (error: HttpErrorResponse)=>{
                this.toastr.error(error.error.message);
              }
            );
    }
    else{
      this.userSearvice.addUser(formValue)
            .subscribe(
              (newUser:addUser)=>{
                if(newUser.code == 200){
                  this.data.push(newUser.data);
                  this.showForm = false;
                  this.submitted = false;
                  this.loading = false;
                }
              },
              (error: HttpErrorResponse)=>{
                this.toastr.error(error.error.message);
              }
            );
    }
  }

  cancel(){
    this.showForm = false;
  }
}
