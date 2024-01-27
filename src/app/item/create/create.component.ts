import { Component } from '@angular/core';
import { ItemService } from '../item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
    title: string = '';
    description: string = '';
    isSubmitting: boolean = false;

    constructor(public itemService: ItemService){}

    createItem(){
      this.isSubmitting = true;
      this.itemService.createItem({title: this.title, description:this.description})
      .then(response=>{
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Item created successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.title = '';
        this.description = '';
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
