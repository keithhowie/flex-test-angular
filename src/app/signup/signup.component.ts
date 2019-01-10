import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { S3UploadService } from '../s3-upload.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    cv: new FormControl(null, Validators.required)
  });
  files: FileList;
  submitted = false;

  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private s3upload: S3UploadService) { }

  ngOnInit() {
    this.files = null;
  }

  getFile(event) {
    if (event.target.files.length == 1) {
      this.files = event.target.files;
    }
  }

  async onSignup() {
    this.submitted = true;
    if (this.signupForm.valid && this.files && this.files.length == 1) {
      this.snackBar.dismiss();
      const { cv, ...details } = this.signupForm.value;

      try {
        const docUrl = await this.s3upload.uploadDocument(this.files[0]);

        await this.db.collection('candidates').add({
          ...details,
          cvUrl: docUrl
        });

        this.snackBar.open('Thank you, your details have been submitted!', 'OK', { duration: 5000 });
        this.submitted = false;
        this.router.navigateByUrl('/');
      } catch (error) {
        this.snackBar.open('Sorry, something went wrong.', 'OK', { duration: 5000 });
      }
    }
  }

}
