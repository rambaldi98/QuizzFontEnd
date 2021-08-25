import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {

  qId: number = 0;
  quizData : any;
  categories:any = [];
  constructor(private activeRoute: ActivatedRoute,
              private quizService : QuizService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
   this.qId =  this.activeRoute.snapshot.params.qid;
  this.categoryService.categories().subscribe(
    (data:any) => {
      this.categories = data;
    },
     (err) => {

    }
  )
   this.quizService.getQuiz(this.qId).subscribe(
     (data:any) => {
      this.quizData = data;
     },(err) => {

     }
   )
  }
  // update-quiz

  public updateQuiz(){
    // validate
    this.quizService.updateQuiz(this.quizData).subscribe(
      (data:any) => {
        Swal.fire('Update Success','Quiz update','success').then(
          (e) =>{
            this.router.navigate(['/admin/quizzes'])
          }
        );
        
      }, (error:any) => {
        Swal.fire('Error !!','Update is error','error');
      }
    )
  }
}
