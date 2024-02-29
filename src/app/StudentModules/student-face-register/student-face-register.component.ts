import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaceapiService } from 'src/app/faceapi.service';
import { StudentCouchService } from 'src/app/student-couch.service';

@Component({
  selector: 'app-student-face-register',
  templateUrl: './student-face-register.component.html',
  styleUrls: ['./student-face-register.component.scss']
})
export class StudentFaceRegisterComponent implements OnInit {
  video!:HTMLVideoElement
  errorDiv!:HTMLDivElement
  flag:string='notScanned'
  RegisterNumber!:string
  currentYear= new Date().getFullYear();
  index:number=0

  constructor(private render:Renderer2,private faceApi:FaceapiService,private route:ActivatedRoute,private Couch:StudentCouchService){}

  ngOnInit(): void {
    this.RegisterNumber=this.route.snapshot.params['registerNumber']
    this.video=this.render.selectRootElement('#myVideo') as HTMLVideoElement
    this.errorDiv=this.render.selectRootElement(".errorMessage")
    this.startVideo()
  }
  async startVideo(){
    // this.errorDiv.innerHTML=""
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (this.video) {
        this.video.srcObject = stream;
        this.video.addEventListener('play', async()=>{
          try{
            const results:[]=await this.faceApi.FaceDetection(this.video,this.RegisterNumber)
            if(results.length>0 && this.index===0){
              this.Couch.faceUpdate(results,this.RegisterNumber,this.currentYear)
              this.flag="scanned"
              this.errorDiv.innerHTML="<strong>Successfully scanned</strong>"
              this.index++
            }
            else{
              this.errorDiv.innerHTML=`<strong>Do not move until image is scanned</strong>`
              this.startVideo()
            }
         
        }catch(error){
          console.log(error)
        }
        })
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  }
  
}

