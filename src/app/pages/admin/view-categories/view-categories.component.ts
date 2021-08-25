import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit {
  categories:any = [
    // {
    //   cid : 23,
    //   title : 'programing',
    //   description: 'this is testing'
    // },
    // {
    //   cid : 23,
    //   title : 'programing2',
    //   description: 'this is testing'
    // },
    // {
    //   cid : 23,
    //   title : 'programing3',
    //   description: 'this is testing'
    // },
  ];
  constructor(private categoryService: CategoryService,
              ) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe((data:any )=>{
        this.categories = data;
        console.log(this.categories)
    }, (error) => {
      console.log(error);
      Swal.fire("Error !!","Error in loading data",'error');
    })
  }

}
