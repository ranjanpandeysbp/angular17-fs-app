import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {

  items: Item[] = [];

  constructor(public itemService: ItemService){}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(){
    this.itemService.getAllItems()
    .then((response)=>{
      //console.log(response);
      this.items = response.data;
      //debugger;
      //console.log(this.items);
    })
    .catch((error)=>{
      return error;
    })
  }

  deleteItem(id: number){
    Swal.fire({
      title: 'Are you sure to delete?',
      text: 'Item deleted cannot be recovered',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Go ahead with Deletion'
    })
    .then(result=>{
      if(result.isConfirmed){
        this.itemService.deleteItem(id)
        .then(response=>{
          Swal.fire({
            icon: 'success',
            title: 'Item deleted successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.getAllItems();
          return response;
        })
        .catch(error=>{
          Swal.fire({
            icon: 'error',
            title: 'Some error occurred',
            showConfirmButton: false,
            timer: 1500
          })
          return error;
        });
      }
    });
  }
}
