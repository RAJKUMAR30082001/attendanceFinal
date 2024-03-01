import { Injectable } from '@angular/core';
declare const faceapi: any;

@Injectable({
  providedIn: 'root'
})
export class FaceapiService {
  public video: HTMLVideoElement | undefined;
  public displaySize: { width: number; height: number } = { width: 0, height: 0 }; // Provide initial values
  public descriptions: any[] = [];
  public flag: boolean = false;
  public results: any;
  public count: number = 0;
  public resize: any;
  public canva: any;
  public timeInterval: any;

  constructor() { }

  async FaceDetection(video: HTMLVideoElement, registerNumber: string): Promise<any> {
    console.log("coming");

    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('./assets/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./assets/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./assets/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('./assets/models')
      ]);
      console.log("loaded");
    } catch (error) {
      console.log("error of the model", error);
    }
    if (!this.canva) {
      this.canva = await faceapi.createCanvasFromMedia(video);
      const div = document.getElementById("canvacontainer");
      if (div) {
        div.append(this.canva);
      }
    }

    if (video) {
      this.displaySize = { width: video.width, height: video.height };
    }

    faceapi.matchDimensions(this.canva, this.displaySize);

    this.results = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
    console.log("results:", this.results);
    const labeledDescriptors = this.results.map((result: { descriptor: any; }) => {
      return new faceapi.LabeledFaceDescriptors(registerNumber, [result.descriptor]);
    });
    console.log(labeledDescriptors);

    this.resize = faceapi.resizeResults(this.results, this.displaySize);

    this.canva.getContext('2d').clearRect(0, 0, this.canva.width, this.canva.height);
    faceapi.draw.drawDetections(this.canva, this.resize);

    if (labeledDescriptors.length > 0) {
      this.clearIntervalTimer();
    }
    return labeledDescriptors;
  }

  startInterval(video: HTMLVideoElement, registerNumber: string): Promise<any> {
    return new Promise((resolve) => {
      this.timeInterval = setInterval(async () => {
        const labeledDescriptors = await this.FaceDetection(video, registerNumber);
        resolve(labeledDescriptors);
      }, 1000); // Adjust the interval duration as needed
    });
  }

  clearIntervalTimer() {
    clearInterval(this.timeInterval);
  }
}
