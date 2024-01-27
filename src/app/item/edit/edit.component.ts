import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
    item: Item = { _id: 0, title: '', description: '' };
    isSubmitting: boolean = false;

    constructor(public itemService: ItemService, private route: ActivatedRoute){
      this.item = {
        _id: this.route.snapshot.params['id'],
        title: '',
        description: ''
      }
    }
    ngOnInit(): void{
      this.itemService.getItemDetail(this.route.snapshot.params['id'])
      .then((response)=>{
        //console.log(response);
        this.item = response.data;
        //console.log(this.item);
      })
      .catch(error=>{return error});
    }
    editItem(){
      this.isSubmitting = true;
      this.itemService.updateItem(this.item)
      .then(response=>{
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Item updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
        return response.data;
      })
      .catch(error=>{
        this.isSubmitting = false;
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred',
          showConfirmButton: false,
          timer: 1500
        })
        return error;
      });
    }
}
