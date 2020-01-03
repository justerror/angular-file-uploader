import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFileUploaderModule } from 'projects/angular-file-uploader/src/lib/angular-file-uploader.module';
// To use angular-file-uploader from node-modules remove paths from tsconfig.json in root.
/*
"paths": {
      "angular-file-uploader": [
        "dist/angular-file-uploader"
      ],
      "angular-file-uploader/*": [
        "dist/angular-file-uploader/*"
      ]
    }
*/
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
