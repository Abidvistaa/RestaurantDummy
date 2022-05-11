import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurentData } from './restaurent.model';
import { ApiService } from '../shared/api.service';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})

export class RestaurentDashComponent implements OnInit {

  formValue!:FormGroup
  resaurentModelObj:RestaurentData=new RestaurentData
  getList:any
  showAdd:any
  showUpdate:any

  constructor(private formbuider:FormBuilder,private api:ApiService) {}

  ngOnInit(): void {
    this.formValue=this.formbuider.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })
    this.getAllData();
  }

  showAddOrUpdateBtn(){
    this.showAdd =true
    this.showUpdate =false
  }

  //Add
  addRestau(){
    this.resaurentModelObj.name=this.formValue.value.name
    this.resaurentModelObj.email=this.formValue.value.email
    this.resaurentModelObj.mobile=this.formValue.value.mobile
    this.resaurentModelObj.address=this.formValue.value.address
    this.resaurentModelObj.services=this.formValue.value.services

    this.api.postRestau(this.resaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("Successfully will be Addded");
      this.formValue.reset();
      this.getAllData();
    },
    err=>{
      alert("Not Addded");
    }
    )
  }

  //Get All
  getAllData(){
    this.api.getRestau().subscribe(data=>{
      this.getList=data;
    })
  }

  //Delete
  deleteData(obj:any){
    this.api.deleteRestau(obj.id).subscribe(res=>{
      alert("Record will be deleted")
      this.getAllData();

    })
  }

  //Edit
  OnEdit(obj:any){
    this.showAdd =false
    this.showUpdate =true

    this.resaurentModelObj.id=obj.id

    this.formValue.controls['name'].setValue(obj.name)
    this.formValue.controls['email'].setValue(obj.email)
    this.formValue.controls['mobile'].setValue(obj.mobile)
    this.formValue.controls['address'].setValue(obj.address)
    this.formValue.controls['services'].setValue(obj.services)
  }
  updateRestau(){
    this.resaurentModelObj.name=this.formValue.value.name
    this.resaurentModelObj.email=this.formValue.value.email
    this.resaurentModelObj.mobile=this.formValue.value.mobile
    this.resaurentModelObj.address=this.formValue.value.address
    this.resaurentModelObj.services=this.formValue.value.services

    this.api.updateRestau(this.resaurentModelObj,this.resaurentModelObj.id).subscribe(res=>{
      alert("Record will be Updated ")
      this.getAllData();
    })
  }

}
