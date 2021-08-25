import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.scss']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any=[];
  constructor(
              private questionService:QuestionService, 
              private activeRoute : ActivatedRoute,
              private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.qId = this.activeRoute.snapshot.params.qid;
    this.qTitle = this.activeRoute.snapshot.params.title;
    this.questionService.getQuestionQuiz(this.qId).subscribe(
      (data:any) => {
        console.log(data);
        this.questions = data;
      }, (error) => {
        
      }
    )
  }

  //delete question
  deleteQuestion(qid:any) {
    // alert('Question deleted')

    Swal.fire({
      icon: 'info',
      showCancelButton:true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, want to delete this question?',
    }).then((result) => {
      // alert('one')
      if(result.isConfirmed) {

        this.questionService.deleteQuestion(qid).subscribe(
          (data:any) => {
              this.snack.open('Question deleted successfully','',{
                duration:3000,
                horizontalPosition : 'right',
                verticalPosition: "top",
              });
              // lay lai danh sach question
              this.questions = this.questions.filter((q:any) => q.qid != qid)
          } , (error) => {
            this.snack.open('Error in deleting questions','',{
              duration:3000,
              horizontalPosition : 'right',
              verticalPosition: "top",
            });
          }
        )
      }
    })

  
  }

}
