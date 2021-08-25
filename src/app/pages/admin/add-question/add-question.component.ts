import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/de';





@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  
  qId : any;
  qTitle: any;
  question:any = {
    quiz: {

    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    image:''
  };
  constructor(
              private activeRoute : ActivatedRoute,
              private questionService: QuestionService,
              private quizService: QuizService,
              

  ) { }

  ngOnInit(): void {
    this.qId = this.activeRoute.snapshot.params.qid;
    this.qTitle = this.activeRoute.snapshot.params.qtitle;
    this.question.quiz['qid'] = this.qId;
  }
  formSubmit(){
    // alert('save')

    if(this.question.content.trim() === ''||this.question.content == null){

      return;
    }

    if(this.question.option1.trim() === ''||this.question.option1 == null){
      
      return;
    }

    if(this.question.option2.trim() === ''||this.question.option2 == null){
      
      return;
    }
    if(this.question.option3.trim() === ''||this.question.option3 == null){
      
      return;
    }
    if(this.question.option4.trim() === ''||this.question.option4 == null){
      
      return;
    }

    if(this.question.answer.trim() === ''||this.question.answer == null){
      
      return;
    }



    this.questionService.addQuestion(this.question).subscribe(
      (data:any) => {
        Swal.fire('Success ','Question Added', 'success');
        this.question = {
          quiz: {
      
          },
          content:'',
          option1:'',
          option2:'',
          option3:'',
          option4:'',
          answer:'',
          image:''
        };
      }, (error: any) => {
        Swal.fire('Error ','Error in adding question','error');
      }
    )
  }
}
