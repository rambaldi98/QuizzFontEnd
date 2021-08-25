import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  categories:any = [
    // {
    //   cid : 2,
    //   title : 'Programing'
    // },
    // {
    //   cid : 3,
    //   title : 'Programingss'
    // }
  ];

  quizData:any = {
    title : '',
    description : '',
    maxMarks:'',
    numberOfQuestions : '',
    active : true,
    category: {
      cid:''
    }
  };

  constructor(private quizService: QuizService,
              private categoryService: CategoryService,
              private snack: MatSnackBar) { }

  ngOnInit(): void {

    this.categoryService.categories().subscribe(
      (data:any) => {
        // category loading
        this.categories = data;
      },
      (err) => {
        Swal.fire('Error !!','Error in loading data from server','error');
      }
    )
  }
  formSubmit() {
    // console.log(this.quizData);

    if(this.quizData.title.trim() === ''|| this.quizData.title == null){
      this.snack.open("Title Required !! ", '',{
        duration:3000,
        horizontalPosition: 'right',
        verticalPosition: "top",
      })
      return;
    }

    //valication ... 

    // call server
    this.quizService.addQuiz(this.quizData).subscribe(
      (day:any) => {
        Swal.fire('Success','quiz is added','success');
        
        this.quizData = {
          title : '',
          description : '',
          maxMarks:'',
          numberOfQuestions : '',
          active : true,
          category: {
            cid:''
          }
        };
      }, (error) => {
        Swal.fire('Error !!','Error while adding quiz','error');
      }
    )
  }

}
