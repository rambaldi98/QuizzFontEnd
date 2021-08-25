import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  category = {
    title: '',
    description:''
  }
  constructor(private categoryService: CategoryService,
              private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmitAdd(){
    if(this.category.title.trim() == ''|| this.category.title == null){
      this.snack.open('Title required !!','',{
        duration:3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }); 
      
      return;
    }
    // all done
    this.categoryService.addNewCategory(this.category).subscribe(
      (data:any) =>{
        this.category.title = '';
        this.category.description ='';
        Swal.fire('Success !!','Category is added successfully','success');
      },
      (err:any) =>{
        Swal.fire('Error !!','Server error !!','error')
      }
    )
  }

}
