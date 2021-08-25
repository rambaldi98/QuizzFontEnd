import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes:any = [
    // {
    //   qid : 23,
    //   title : 'basic java',
    //   description : 'this is a basic java',
    //   maxMarks: '50',
    //   numberOfQuestions :'20',
    //   active:'',
    //   category: {
    //     title: 'Programing'
    //   }
    // }
  ];
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {

    this.quizService.quizzes().subscribe(
      (data:any) => {
        this.quizzes = data;
        console.log(this.quizzes);

      }, (error) => {
        Swal.fire('Error !!',"Errorr in loading data !",'error');
      }
    )
  }

  // deleteQuiz(qId:any){
  //   // alert(qId)
    // this.quizService.deleteQuiz(qId).subscribe(
    //   (data:any) => {
    //    this.quizzes =  this.quizzes.filter((quiz:any) => quiz.qId != qId)
    //     Swal.fire('Success','Quiz delete ','success');
    //   }, (error) =>{
    //     Swal.fire('Error !!','Error in deleting quiz','error');
    //   }
    // )
  // }

  deleteQuiz(qId:any){
    Swal.fire({
      icon : 'info',
      title : 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton : true
    }).then((result) => {
      if(result.isConfirmed){
        this.quizService.deleteQuiz(qId).subscribe(
          (data:any) => {
           this.quizzes =  this.quizzes.filter((quiz:any) => quiz.qid !== qId)
            Swal.fire('Success','Quiz delete ','success');
          }, (error) =>{
            Swal.fire('Error !!','Error in deleting quiz','error');
          }
        )
      }
    })
  }

}
