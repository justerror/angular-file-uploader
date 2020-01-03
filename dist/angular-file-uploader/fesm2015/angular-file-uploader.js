import { Injectable, NgModule, Component, EventEmitter, Input, Output, defineInjectable } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AngularFileUploaderService {
    constructor() { }
}
AngularFileUploaderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
AngularFileUploaderService.ctorParameters = () => [];
/** @nocollapse */ AngularFileUploaderService.ngInjectableDef = defineInjectable({ factory: function AngularFileUploaderService_Factory() { return new AngularFileUploaderService(); }, token: AngularFileUploaderService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AngularFileUploaderComponent {
    constructor() {
        this.resetUpload = false;
        this.ApiResponse = new EventEmitter();
        this.everythingDone = new EventEmitter();
        this.formatsAllowedList = null;
        this.reg = /(?:\.([^.]+))?$/;
        this.selectedFiles = [];
        this.notAllowedList = [];
        this.Caption = [];
        this.singleFile = true;
        this.progressBarShow = false;
        this.uploadBtn = false;
        this.uploadMsg = false;
        this.afterUpload = false;
        this.uploadClick = true;
        this.currentUploads = [];
        this.idDate = +new Date();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.config && this.config) {
            this.theme = this.config.theme || '';
            this.id =
                this.config.id ||
                    parseInt((this.idDate / 10000).toString().split('.')[1], 10) +
                        Math.floor(Math.random() * 20) * 10000;
            this.hideProgressBar = this.config.hideProgressBar || false;
            this.hideResetBtn = this.config.hideResetBtn || false;
            this.hideSelectBtn = this.config.hideSelectBtn || false;
            this.maxSize = this.config.maxSize || 20;
            this.uploadAPI = this.config.uploadAPI.url;
            this.method = this.config.uploadAPI.method || 'POST';
            this.formatsAllowed =
                this.config.formatsAllowed || '.jpg,.png,.pdf,.docx,.txt,.gif,.jpeg';
            this.formatsAllowedList = null;
            this.multiple = this.config.multiple || false;
            this.headers = this.config.uploadAPI.headers || {};
            this.oneFilePerRequest = !!this.config.oneFilePerRequest;
            this.key = this.config.key || 'file';
            /** @type {?} */
            const defaultReplaceTextsValues = {
                selectFileBtn: this.multiple ? 'Select Files' : 'Select File',
                resetBtn: 'Reset',
                uploadBtn: 'Upload',
                dragNDropBox: 'Drag N Drop',
                attachPinBtn: this.multiple ? 'Attach Files...' : 'Attach File...',
                afterUploadMsg_success: 'Successfully Uploaded !',
                afterUploadMsg_error: 'Upload Failed !',
            };
            if (this.config.replaceTexts) {
                this.replaceTexts = Object.assign({}, defaultReplaceTextsValues, this.config.replaceTexts);
            }
            else {
                this.replaceTexts = Object.assign({}, defaultReplaceTextsValues);
            }
        }
        if (changes.resetUpload) {
            if (changes.resetUpload.currentValue === true) {
                this.resetFileUpload();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    resetFileUpload() {
        this.selectedFiles = [];
        this.Caption = [];
        this.notAllowedList = [];
        this.uploadMsg = false;
        this.uploadBtn = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        this.notAllowedList = [];
        if (this.afterUpload || !this.multiple) {
            this.selectedFiles = [];
            this.Caption = [];
            this.afterUpload = false;
        }
        if (this.formatsAllowedList === null) {
            this.formatsAllowedList = this.formatsAllowed.split('.').map(x => x.split(',')[0].trim().toLowerCase());
        }
        /** @type {?} */
        let fileList;
        if (event.type === 'drop') {
            fileList = event.dataTransfer.files;
        }
        else {
            fileList = event.target.files || event.srcElement.files;
        }
        for (let i = 0; i < fileList.length; i++) {
            /** @type {?} */
            const currentFileExt = this.reg.exec(fileList[i].name)[1];
            /** @type {?} */
            const currentFileExtLower = currentFileExt.toLowerCase();
            /** @type {?} */
            const frmtAllowed = this.formatsAllowedList.some(x => x === currentFileExtLower);
            if (frmtAllowed) {
                if (fileList[i].size > this.maxSize * 1024000) {
                    this.notAllowedList.push({
                        fileName: fileList[i].name,
                        fileSize: this.convertSize(fileList[i].size),
                        errorMsg: 'Invalid size',
                    });
                }
                else {
                    this.selectedFiles.push(fileList[i]);
                }
            }
            else {
                this.notAllowedList.push({
                    fileName: fileList[i].name,
                    fileSize: this.convertSize(fileList[i].size),
                    errorMsg: 'Invalid format',
                });
            }
        }
        if (this.selectedFiles.length !== 0) {
            this.uploadBtn = true;
            if (this.theme === 'attachPin') {
                this.uploadFiles();
            }
        }
        else {
            this.uploadBtn = false;
        }
        this.uploadMsg = false;
        this.uploadClick = true;
        this.percentComplete = 0;
        event.target.value = null;
    }
    /**
     * @return {?}
     */
    uploadFiles() {
        this.progressBarShow = true;
        this.uploadClick = false;
        this.notAllowedList = [];
        /** @type {?} */
        let isError = false;
        this.singleFile = this.selectedFiles.length <= 1;
        this.currentUploads = [];
        if (this.oneFilePerRequest && !this.singleFile) {
            this.selectedFiles.forEach((selectedFile, inx) => {
                /** @type {?} */
                const xhr = new XMLHttpRequest();
                /** @type {?} */
                const formData = new FormData();
                // Add data to be sent in this request
                formData.append(this.Caption[inx] || this.key, this.selectedFiles[inx]);
                this.currentUploads.push({ xhr: xhr, formData: formData, inxs: [inx] });
            });
        }
        else {
            /** @type {?} */
            const xhr = new XMLHttpRequest();
            /** @type {?} */
            const formData = new FormData();
            // Add data to be sent in this request
            this.selectedFiles.forEach((selectedFile, inx) => {
                formData.append(this.Caption[inx] || this.key + (this.singleFile ? '' : inx), this.selectedFiles[inx]);
            });
            this.currentUploads.push({ xhr: xhr, formData: formData, inxs: this.selectedFiles.map((selectedFile, inx) => inx) });
        }
        /** @type {?} */
        const totalUploads = this.currentUploads.length;
        this.currentUploads.forEach((upload, uploadInx) => {
            /** @type {?} */
            const xhr = upload.xhr;
            xhr.onreadystatechange = evnt => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200 && xhr.status !== 201) {
                        isError = true;
                        this.progressBarShow = false;
                        this.uploadBtn = false;
                        this.uploadMsg = true;
                        this.afterUpload = true;
                        this.uploadMsgText = this.replaceTexts.afterUploadMsg_error;
                        this.uploadMsgClass = 'text-danger lead';
                    }
                    this.ApiResponse.emit(xhr);
                    if (uploadInx + 1 === totalUploads) {
                        this.everythingDone.emit(this.currentUploads);
                    }
                }
            };
            xhr.upload.onprogress = evnt => {
                this.uploadBtn = false; // button should be disabled by process uploading
                if (evnt.lengthComputable) {
                    /** @type {?} */
                    const currentDone = (evnt.loaded / evnt.total);
                    this.percentComplete = Math.round((uploadInx + currentDone) * 100 / totalUploads);
                }
            };
            xhr.onload = evnt => {
                this.progressBarShow = false;
                this.uploadBtn = false;
                this.uploadMsg = true;
                this.afterUpload = true;
                if (!isError) {
                    if (uploadInx + 1 === totalUploads) {
                        this.uploadMsgText = this.replaceTexts.afterUploadMsg_success;
                        this.uploadMsgClass = 'text-success lead';
                    }
                    else {
                        /** @type {?} */
                        const nextUpload = this.currentUploads[uploadInx + 1];
                        nextUpload.xhr.send(nextUpload.formData);
                    }
                    this.percentComplete = Math.round((uploadInx + 1) * 100 / totalUploads);
                }
            };
            xhr.open(this.method, this.uploadAPI, true);
            for (const key of Object.keys(this.headers)) {
                // Object.keys will give an Array of keys
                xhr.setRequestHeader(key, this.headers[key]);
            }
        });
        /** @type {?} */
        const firstUpload = this.currentUploads[0];
        firstUpload.xhr.send(firstUpload.formData);
    }
    /**
     * @param {?} i
     * @param {?} sf_na
     * @return {?}
     */
    removeFile(i, sf_na) {
        if (sf_na === 'sf') {
            this.selectedFiles.splice(i, 1);
            this.Caption.splice(i, 1);
        }
        else {
            this.notAllowedList.splice(i, 1);
        }
        if (this.selectedFiles.length === 0) {
            this.uploadBtn = false;
        }
    }
    /**
     * @param {?} fileSize
     * @return {?}
     */
    convertSize(fileSize) {
        return fileSize < 1024000
            ? (fileSize / 1024).toFixed(2) + ' KB'
            : (fileSize / 1024000).toFixed(2) + ' MB';
    }
    /**
     * @return {?}
     */
    attachpinOnclick() {
        /** @type {?} */
        const element = document.getElementById('sel' + this.id);
        if (element !== null) {
            element.click();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        event.stopPropagation();
        event.preventDefault();
        this.onChange(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    allowDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }
}
AngularFileUploaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'angular-file-uploader',
                template: `<div class="container" *ngIf="(theme !== 'attachPin')" id="default">

    <!-- Drag n Drop theme Starts -->
    <div *ngIf="theme == 'dragNDrop'" id="dragNDrop" [ngClass]="(hideSelectBtn && hideResetBtn) ? null : 'dragNDropBtmPad'" class="dragNDrop">
        <div style="position:relative;">
            <div id="div1" class="div1 afu-dragndrop-box" (drop)="drop($event)" (dragover)="allowDrop($event)">
                <p class="afu-dragndrop-text">{{replaceTexts?.dragNDropBox}}</p>
            </div>
            <!-- <span class='label label-info' id="upload-file-info{{id}}">{{selectedFiles[0]?.name}}</span> -->
        </div>
    </div>
    <!-- Drag n Drop theme Ends -->

    <label for="sel{{id}}" class="btn btn-primary btn-sm afu-select-btn" *ngIf="!hideSelectBtn">{{replaceTexts?.selectFileBtn}}</label>
    <input type="file" id="sel{{id}}" style="display: none" *ngIf="!hideSelectBtn" (change)="onChange($event)" title="Select file"
        name="files[]" [accept]=formatsAllowed [attr.multiple]="multiple ? '' : null" />
    <button class="btn btn-info btn-sm resetBtn afu-reset-btn" (click)="resetFileUpload()" *ngIf="!hideResetBtn">{{replaceTexts?.resetBtn}}</button>
    <br *ngIf="!hideSelectBtn">
    <p class="constraints-info afu-constraints-info">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize *1024000))}}</p>
    <!--Selected file list-->
    <div class="row afu-valid-file" *ngFor="let sf of selectedFiles;let i=index" >
        <p class="col-xs-3 textOverflow"><span class="text-primary">{{sf.name}}</span></p>
        <p class="col-xs-3 padMarg sizeC"><strong>({{convertSize(sf.size)}})</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <!--  <input class="col-xs-3 progress caption"  type="text"  placeholder="Caption.."  [(ngModel)]="Caption[i]"  *ngIf="uploadClick"/> -->
        <div class="progress col-xs-3 padMarg afu-progress-bar" *ngIf="singleFile && progressBarShow && !hideProgressBar">
            <span class="progress-bar progress-bar-success" role="progressbar" [ngStyle]="{'width':percentComplete+'%'}">{{percentComplete}}%</span>
        </div>
        <a class="col-xs-1" role="button" (click)="removeFile(i,'sf')" *ngIf="uploadClick"><i class="fa fa-times"></i></a>
    </div>
    <!--Invalid file list-->
    <div class="row text-danger afu-invalid-file" *ngFor="let na of notAllowedList;let j=index">
        <p class="col-xs-3 textOverflow"><span>{{na['fileName']}}</span></p>
        <p class="col-xs-3 padMarg sizeC"><strong>({{na['fileSize']}})</strong></p>
        <p class="col-xs-3 ">{{na['errorMsg']}}</p>
        <a class="col-xs-1 delFileIcon" role="button" (click)="removeFile(j,'na')" *ngIf="uploadClick">&nbsp;<i class="fa fa-times"></i></a>
    </div>

    <p *ngIf="uploadMsg" class="{{uploadMsgClass}} + afu-upload-status">{{uploadMsgText}}<p>
    <div *ngIf="!singleFile && progressBarShow && !hideProgressBar">
        <div class="progress col-xs-4 padMarg afu-progress-bar">
            <span class="progress-bar progress-bar-success" role="progressbar" [ngStyle]="{'width':percentComplete+'%'}">{{percentComplete}}%</span>
        </div>
        <br>
        <br>
    </div>
    <button class="btn btn-success afu-upload-btn" type="button" (click)="uploadFiles()" [disabled]=!uploadBtn>{{replaceTexts?.uploadBtn}}</button>
    <br>
</div>

<!--/////////////////////////// ATTACH PIN THEME  //////////////////////////////////////////////////////////-->
<div *ngIf="theme == 'attachPin'" id="attachPin">
    <div style="position:relative;padding-left:6px">
        <a class='btn up_btn afu-attach-pin' (click)="attachpinOnclick()">
          {{replaceTexts?.attachPinBtn}}
            <i class="fa fa-paperclip" aria-hidden="true"></i>
            <!-- <p style="margin-top:10px">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize * 1024000))}}</p> -->
            <input type="file" id="sel{{id}}" (change)="onChange($event)" style="display: none" title="Select file" name="files[]" [accept]=formatsAllowed
                [attr.multiple]="multiple ? '' : null" />
            <br>
        </a>
        &nbsp;
        <span class='label label-info' id="upload-file-info{{id}}">{{selectedFiles[0]?.name}}</span>
    </div>
</div>

<!--/////////////////////////// DRAG N DROP THEME  //////////////////////////////////////////////////////////-->
<!-- <div *ngIf="theme == 'dragNDrop'" id="dragNDrop">
  <div style="position:relative;padding-left:6px">
    <div id="div1" (drop)="drop($event)" (dragover)="allowDrop($event)">
      <p>Drag N Drop</p>
    </div>
    <span class='label label-info' id="upload-file-info{{id}}">{{selectedFiles[0]?.name}}</span>
  </div>
</div> -->
`,
                styles: [`.constraints-info{margin-top:10px;font-style:italic}.padMarg{padding:0;margin-bottom:0}.caption{margin-right:5px}.textOverflow{white-space:nowrap;padding-right:0;overflow:hidden;text-overflow:ellipsis}.up_btn{color:#000;background-color:transparent;border:2px solid #5c5b5b;border-radius:22px}.delFileIcon{text-decoration:none;color:#ce0909}.dragNDrop .div1{display:border-box;border:2px dashed #5c5b5b;height:6rem;width:20rem}.dragNDrop .div1>p{text-align:center;font-weight:700;color:#5c5b5b;margin-top:1.4em}.dragNDropBtmPad{padding-bottom:2rem}@media screen and (max-width:620px){.caption{padding:0}}@media screen and (max-width:510px){.sizeC{width:25%}}@media screen and (max-width:260px){.caption,.sizeC{font-size:10px}}.resetBtn{margin-left:3px}`],
            },] },
];
AngularFileUploaderComponent.ctorParameters = () => [];
AngularFileUploaderComponent.propDecorators = {
    config: [{ type: Input }],
    resetUpload: [{ type: Input }],
    ApiResponse: [{ type: Output }],
    everythingDone: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AngularFileUploaderModule {
}
AngularFileUploaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [AngularFileUploaderComponent],
                exports: [AngularFileUploaderComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { AngularFileUploaderService, AngularFileUploaderComponent, AngularFileUploaderModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1maWxlLXVwbG9hZGVyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWZpbGUtdXBsb2FkZXIvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLWZpbGUtdXBsb2FkZXIvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItZmlsZS11cGxvYWRlci9saWIvYW5ndWxhci1maWxlLXVwbG9hZGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaWxlVXBsb2FkZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVwbGFjZVRleHRzIHtcbiAgc2VsZWN0RmlsZUJ0bjogc3RyaW5nO1xuICByZXNldEJ0bjogc3RyaW5nO1xuICB1cGxvYWRCdG46IHN0cmluZztcbiAgZHJhZ05Ecm9wQm94OiBzdHJpbmc7XG4gIGF0dGFjaFBpbkJ0bjogc3RyaW5nO1xuICBhZnRlclVwbG9hZE1zZ19zdWNjZXNzOiBzdHJpbmc7XG4gIGFmdGVyVXBsb2FkTXNnX2Vycm9yOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpbGVVcGxvYWRlckNvbmZpZyB7XG4gIHVwbG9hZEFQSTogeyB1cmw6IHN0cmluZzsgbWV0aG9kPzogc3RyaW5nOyBoZWFkZXJzPzogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9OyB9O1xuXG4gIHRoZW1lPzogc3RyaW5nO1xuICBpZD86IG51bWJlcjtcbiAgaGlkZVByb2dyZXNzQmFyPzogYm9vbGVhbjtcbiAgaGlkZVJlc2V0QnRuPzogYm9vbGVhbjtcbiAgaGlkZVNlbGVjdEJ0bj86IGJvb2xlYW47XG4gIG1heFNpemU/OiBudW1iZXI7XG4gIGZvcm1hdHNBbGxvd2VkPzogc3RyaW5nO1xuICBtdWx0aXBsZT86IGJvb2xlYW47XG4gIG9uZUZpbGVQZXJSZXF1ZXN0PzogYm9vbGVhbjtcbiAga2V5Pzogc3RyaW5nO1xuICByZXBsYWNlVGV4dHM/OiBSZXBsYWNlVGV4dHM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBsb2FkSW5mbyB7XG4gIHhocjogWE1MSHR0cFJlcXVlc3Q7XG4gIGZvcm1EYXRhOiBGb3JtRGF0YTtcbiAgaW54czogbnVtYmVyW107XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FuZ3VsYXItZmlsZS11cGxvYWRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiICpuZ0lmPVwiKHRoZW1lICE9PSAnYXR0YWNoUGluJylcIiBpZD1cImRlZmF1bHRcIj5cblxuICAgIDwhLS0gRHJhZyBuIERyb3AgdGhlbWUgU3RhcnRzIC0tPlxuICAgIDxkaXYgKm5nSWY9XCJ0aGVtZSA9PSAnZHJhZ05Ecm9wJ1wiIGlkPVwiZHJhZ05Ecm9wXCIgW25nQ2xhc3NdPVwiKGhpZGVTZWxlY3RCdG4gJiYgaGlkZVJlc2V0QnRuKSA/IG51bGwgOiAnZHJhZ05Ecm9wQnRtUGFkJ1wiIGNsYXNzPVwiZHJhZ05Ecm9wXCI+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTtcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkaXYxXCIgY2xhc3M9XCJkaXYxIGFmdS1kcmFnbmRyb3AtYm94XCIgKGRyb3ApPVwiZHJvcCgkZXZlbnQpXCIgKGRyYWdvdmVyKT1cImFsbG93RHJvcCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhZnUtZHJhZ25kcm9wLXRleHRcIj57e3JlcGxhY2VUZXh0cz8uZHJhZ05Ecm9wQm94fX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gPHNwYW4gY2xhc3M9J2xhYmVsIGxhYmVsLWluZm8nIGlkPVwidXBsb2FkLWZpbGUtaW5mb3t7aWR9fVwiPnt7c2VsZWN0ZWRGaWxlc1swXT8ubmFtZX19PC9zcGFuPiAtLT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBEcmFnIG4gRHJvcCB0aGVtZSBFbmRzIC0tPlxuXG4gICAgPGxhYmVsIGZvcj1cInNlbHt7aWR9fVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSBhZnUtc2VsZWN0LWJ0blwiICpuZ0lmPVwiIWhpZGVTZWxlY3RCdG5cIj57e3JlcGxhY2VUZXh0cz8uc2VsZWN0RmlsZUJ0bn19PC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBpZD1cInNlbHt7aWR9fVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiICpuZ0lmPVwiIWhpZGVTZWxlY3RCdG5cIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiB0aXRsZT1cIlNlbGVjdCBmaWxlXCJcbiAgICAgICAgbmFtZT1cImZpbGVzW11cIiBbYWNjZXB0XT1mb3JtYXRzQWxsb3dlZCBbYXR0ci5tdWx0aXBsZV09XCJtdWx0aXBsZSA/ICcnIDogbnVsbFwiIC8+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4taW5mbyBidG4tc20gcmVzZXRCdG4gYWZ1LXJlc2V0LWJ0blwiIChjbGljayk9XCJyZXNldEZpbGVVcGxvYWQoKVwiICpuZ0lmPVwiIWhpZGVSZXNldEJ0blwiPnt7cmVwbGFjZVRleHRzPy5yZXNldEJ0bn19PC9idXR0b24+XG4gICAgPGJyICpuZ0lmPVwiIWhpZGVTZWxlY3RCdG5cIj5cbiAgICA8cCBjbGFzcz1cImNvbnN0cmFpbnRzLWluZm8gYWZ1LWNvbnN0cmFpbnRzLWluZm9cIj4oe3tmb3JtYXRzQWxsb3dlZH19KSBTaXplIGxpbWl0LSB7eyhjb252ZXJ0U2l6ZShtYXhTaXplICoxMDI0MDAwKSl9fTwvcD5cbiAgICA8IS0tU2VsZWN0ZWQgZmlsZSBsaXN0LS0+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBhZnUtdmFsaWQtZmlsZVwiICpuZ0Zvcj1cImxldCBzZiBvZiBzZWxlY3RlZEZpbGVzO2xldCBpPWluZGV4XCIgPlxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHRleHRPdmVyZmxvd1wiPjxzcGFuIGNsYXNzPVwidGV4dC1wcmltYXJ5XCI+e3tzZi5uYW1lfX08L3NwYW4+PC9wPlxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHBhZE1hcmcgc2l6ZUNcIj48c3Ryb25nPih7e2NvbnZlcnRTaXplKHNmLnNpemUpfX0pPC9zdHJvbmc+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9wPlxuICAgICAgICA8IS0tICA8aW5wdXQgY2xhc3M9XCJjb2wteHMtMyBwcm9ncmVzcyBjYXB0aW9uXCIgIHR5cGU9XCJ0ZXh0XCIgIHBsYWNlaG9sZGVyPVwiQ2FwdGlvbi4uXCIgIFsobmdNb2RlbCldPVwiQ2FwdGlvbltpXVwiICAqbmdJZj1cInVwbG9hZENsaWNrXCIvPiAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzIGNvbC14cy0zIHBhZE1hcmcgYWZ1LXByb2dyZXNzLWJhclwiICpuZ0lmPVwic2luZ2xlRmlsZSAmJiBwcm9ncmVzc0JhclNob3cgJiYgIWhpZGVQcm9ncmVzc0JhclwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXN1Y2Nlc3NcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzpwZXJjZW50Q29tcGxldGUrJyUnfVwiPnt7cGVyY2VudENvbXBsZXRlfX0lPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGEgY2xhc3M9XCJjb2wteHMtMVwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicmVtb3ZlRmlsZShpLCdzZicpXCIgKm5nSWY9XCJ1cGxvYWRDbGlja1wiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9hPlxuICAgIDwvZGl2PlxuICAgIDwhLS1JbnZhbGlkIGZpbGUgbGlzdC0tPlxuICAgIDxkaXYgY2xhc3M9XCJyb3cgdGV4dC1kYW5nZXIgYWZ1LWludmFsaWQtZmlsZVwiICpuZ0Zvcj1cImxldCBuYSBvZiBub3RBbGxvd2VkTGlzdDtsZXQgaj1pbmRleFwiPlxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHRleHRPdmVyZmxvd1wiPjxzcGFuPnt7bmFbJ2ZpbGVOYW1lJ119fTwvc3Bhbj48L3A+XG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgcGFkTWFyZyBzaXplQ1wiPjxzdHJvbmc+KHt7bmFbJ2ZpbGVTaXplJ119fSk8L3N0cm9uZz48L3A+XG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgXCI+e3tuYVsnZXJyb3JNc2cnXX19PC9wPlxuICAgICAgICA8YSBjbGFzcz1cImNvbC14cy0xIGRlbEZpbGVJY29uXCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJyZW1vdmVGaWxlKGosJ25hJylcIiAqbmdJZj1cInVwbG9hZENsaWNrXCI+Jm5ic3A7PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT48L2E+XG4gICAgPC9kaXY+XG5cbiAgICA8cCAqbmdJZj1cInVwbG9hZE1zZ1wiIGNsYXNzPVwie3t1cGxvYWRNc2dDbGFzc319ICsgYWZ1LXVwbG9hZC1zdGF0dXNcIj57e3VwbG9hZE1zZ1RleHR9fTxwPlxuICAgIDxkaXYgKm5nSWY9XCIhc2luZ2xlRmlsZSAmJiBwcm9ncmVzc0JhclNob3cgJiYgIWhpZGVQcm9ncmVzc0JhclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MgY29sLXhzLTQgcGFkTWFyZyBhZnUtcHJvZ3Jlc3MtYmFyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3VjY2Vzc1wiIHJvbGU9XCJwcm9ncmVzc2JhclwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOnBlcmNlbnRDb21wbGV0ZSsnJSd9XCI+e3twZXJjZW50Q29tcGxldGV9fSU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnI+XG4gICAgICAgIDxicj5cbiAgICA8L2Rpdj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGFmdS11cGxvYWQtYnRuXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWRGaWxlcygpXCIgW2Rpc2FibGVkXT0hdXBsb2FkQnRuPnt7cmVwbGFjZVRleHRzPy51cGxvYWRCdG59fTwvYnV0dG9uPlxuICAgIDxicj5cbjwvZGl2PlxuXG48IS0tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEFUVEFDSCBQSU4gVEhFTUUgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8tLT5cbjxkaXYgKm5nSWY9XCJ0aGVtZSA9PSAnYXR0YWNoUGluJ1wiIGlkPVwiYXR0YWNoUGluXCI+XG4gICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctbGVmdDo2cHhcIj5cbiAgICAgICAgPGEgY2xhc3M9J2J0biB1cF9idG4gYWZ1LWF0dGFjaC1waW4nIChjbGljayk9XCJhdHRhY2hwaW5PbmNsaWNrKClcIj5cbiAgICAgICAgICB7e3JlcGxhY2VUZXh0cz8uYXR0YWNoUGluQnRufX1cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGFwZXJjbGlwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPCEtLSA8cCBzdHlsZT1cIm1hcmdpbi10b3A6MTBweFwiPih7e2Zvcm1hdHNBbGxvd2VkfX0pIFNpemUgbGltaXQtIHt7KGNvbnZlcnRTaXplKG1heFNpemUgKiAxMDI0MDAwKSl9fTwvcD4gLS0+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBpZD1cInNlbHt7aWR9fVwiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiIHRpdGxlPVwiU2VsZWN0IGZpbGVcIiBuYW1lPVwiZmlsZXNbXVwiIFthY2NlcHRdPWZvcm1hdHNBbGxvd2VkXG4gICAgICAgICAgICAgICAgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGUgPyAnJyA6IG51bGxcIiAvPlxuICAgICAgICAgICAgPGJyPlxuICAgICAgICA8L2E+XG4gICAgICAgICZuYnNwO1xuICAgICAgICA8c3BhbiBjbGFzcz0nbGFiZWwgbGFiZWwtaW5mbycgaWQ9XCJ1cGxvYWQtZmlsZS1pbmZve3tpZH19XCI+e3tzZWxlY3RlZEZpbGVzWzBdPy5uYW1lfX08L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBEUkFHIE4gRFJPUCBUSEVNRSAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy0tPlxuPCEtLSA8ZGl2ICpuZ0lmPVwidGhlbWUgPT0gJ2RyYWdORHJvcCdcIiBpZD1cImRyYWdORHJvcFwiPlxuICA8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjZweFwiPlxuICAgIDxkaXYgaWQ9XCJkaXYxXCIgKGRyb3ApPVwiZHJvcCgkZXZlbnQpXCIgKGRyYWdvdmVyKT1cImFsbG93RHJvcCgkZXZlbnQpXCI+XG4gICAgICA8cD5EcmFnIE4gRHJvcDwvcD5cbiAgICA8L2Rpdj5cbiAgICA8c3BhbiBjbGFzcz0nbGFiZWwgbGFiZWwtaW5mbycgaWQ9XCJ1cGxvYWQtZmlsZS1pbmZve3tpZH19XCI+e3tzZWxlY3RlZEZpbGVzWzBdPy5uYW1lfX08L3NwYW4+XG4gIDwvZGl2PlxuPC9kaXY+IC0tPlxuYCxcbiAgc3R5bGVzOiBbYC5jb25zdHJhaW50cy1pbmZve21hcmdpbi10b3A6MTBweDtmb250LXN0eWxlOml0YWxpY30ucGFkTWFyZ3twYWRkaW5nOjA7bWFyZ2luLWJvdHRvbTowfS5jYXB0aW9ue21hcmdpbi1yaWdodDo1cHh9LnRleHRPdmVyZmxvd3t3aGl0ZS1zcGFjZTpub3dyYXA7cGFkZGluZy1yaWdodDowO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzfS51cF9idG57Y29sb3I6IzAwMDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjoycHggc29saWQgIzVjNWI1Yjtib3JkZXItcmFkaXVzOjIycHh9LmRlbEZpbGVJY29ue3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOiNjZTA5MDl9LmRyYWdORHJvcCAuZGl2MXtkaXNwbGF5OmJvcmRlci1ib3g7Ym9yZGVyOjJweCBkYXNoZWQgIzVjNWI1YjtoZWlnaHQ6NnJlbTt3aWR0aDoyMHJlbX0uZHJhZ05Ecm9wIC5kaXYxPnB7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOiM1YzViNWI7bWFyZ2luLXRvcDoxLjRlbX0uZHJhZ05Ecm9wQnRtUGFke3BhZGRpbmctYm90dG9tOjJyZW19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo2MjBweCl7LmNhcHRpb257cGFkZGluZzowfX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjUxMHB4KXsuc2l6ZUN7d2lkdGg6MjUlfX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjI2MHB4KXsuY2FwdGlvbiwuc2l6ZUN7Zm9udC1zaXplOjEwcHh9fS5yZXNldEJ0bnttYXJnaW4tbGVmdDozcHh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogQW5ndWxhckZpbGVVcGxvYWRlckNvbmZpZztcblxuICBASW5wdXQoKVxuICByZXNldFVwbG9hZCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKVxuICBBcGlSZXNwb25zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KClcbiAgZXZlcnl0aGluZ0RvbmU6IEV2ZW50RW1pdHRlcjxVcGxvYWRJbmZvW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxVcGxvYWRJbmZvW10+KCk7XG5cbiAgdGhlbWU6IHN0cmluZztcbiAgaWQ6IG51bWJlcjtcbiAgaGlkZVByb2dyZXNzQmFyOiBib29sZWFuO1xuICBtYXhTaXplOiBudW1iZXI7XG4gIHVwbG9hZEFQSTogc3RyaW5nO1xuICBtZXRob2Q6IHN0cmluZztcbiAgZm9ybWF0c0FsbG93ZWQ6IHN0cmluZztcbiAgZm9ybWF0c0FsbG93ZWRMaXN0OiBzdHJpbmdbXSA9IG51bGw7XG4gIG11bHRpcGxlOiBib29sZWFuO1xuICBoZWFkZXJzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH07XG4gIGhpZGVSZXNldEJ0bjogYm9vbGVhbjtcbiAgaGlkZVNlbGVjdEJ0bjogYm9vbGVhbjtcbiAgb25lRmlsZVBlclJlcXVlc3Q6IGJvb2xlYW47XG4gIGtleTogc3RyaW5nO1xuICByZWc6IFJlZ0V4cCA9IC8oPzpcXC4oW14uXSspKT8kLztcbiAgc2VsZWN0ZWRGaWxlczogRmlsZVtdID0gW107XG4gIG5vdEFsbG93ZWRMaXN0OiB7IGZpbGVOYW1lOiBzdHJpbmc7IGZpbGVTaXplOiBzdHJpbmc7IGVycm9yTXNnOiBzdHJpbmc7IH1bXSA9IFtdO1xuICBDYXB0aW9uOiBzdHJpbmdbXSA9IFtdO1xuICBzaW5nbGVGaWxlID0gdHJ1ZTtcbiAgcHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XG4gIHVwbG9hZEJ0biA9IGZhbHNlO1xuICB1cGxvYWRNc2cgPSBmYWxzZTtcbiAgYWZ0ZXJVcGxvYWQgPSBmYWxzZTtcbiAgdXBsb2FkQ2xpY2sgPSB0cnVlO1xuICB1cGxvYWRNc2dUZXh0OiBzdHJpbmc7XG4gIHVwbG9hZE1zZ0NsYXNzOiBzdHJpbmc7XG4gIHBlcmNlbnRDb21wbGV0ZTogbnVtYmVyO1xuICByZXBsYWNlVGV4dHM7XG4gIGN1cnJlbnRVcGxvYWRzOiBVcGxvYWRJbmZvW10gPSBbXTtcblxuICBwcml2YXRlIGlkRGF0ZTogbnVtYmVyID0gK25ldyBEYXRlKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuY29uZmlnICYmIHRoaXMuY29uZmlnKSB7XG4gICAgICB0aGlzLnRoZW1lID0gdGhpcy5jb25maWcudGhlbWUgfHwgJyc7XG4gICAgICB0aGlzLmlkID1cbiAgICAgICAgdGhpcy5jb25maWcuaWQgfHxcbiAgICAgICAgcGFyc2VJbnQoKHRoaXMuaWREYXRlIC8gMTAwMDApLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXSwgMTApICtcbiAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjApICogMTAwMDA7XG4gICAgICB0aGlzLmhpZGVQcm9ncmVzc0JhciA9IHRoaXMuY29uZmlnLmhpZGVQcm9ncmVzc0JhciB8fCBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZVJlc2V0QnRuID0gdGhpcy5jb25maWcuaGlkZVJlc2V0QnRuIHx8IGZhbHNlO1xuICAgICAgdGhpcy5oaWRlU2VsZWN0QnRuID0gdGhpcy5jb25maWcuaGlkZVNlbGVjdEJ0biB8fCBmYWxzZTtcbiAgICAgIHRoaXMubWF4U2l6ZSA9IHRoaXMuY29uZmlnLm1heFNpemUgfHwgMjA7XG4gICAgICB0aGlzLnVwbG9hZEFQSSA9IHRoaXMuY29uZmlnLnVwbG9hZEFQSS51cmw7XG4gICAgICB0aGlzLm1ldGhvZCA9IHRoaXMuY29uZmlnLnVwbG9hZEFQSS5tZXRob2QgfHwgJ1BPU1QnO1xuICAgICAgdGhpcy5mb3JtYXRzQWxsb3dlZCA9XG4gICAgICAgIHRoaXMuY29uZmlnLmZvcm1hdHNBbGxvd2VkIHx8ICcuanBnLC5wbmcsLnBkZiwuZG9jeCwudHh0LC5naWYsLmpwZWcnO1xuICAgICAgdGhpcy5mb3JtYXRzQWxsb3dlZExpc3QgPSBudWxsO1xuICAgICAgdGhpcy5tdWx0aXBsZSA9IHRoaXMuY29uZmlnLm11bHRpcGxlIHx8IGZhbHNlO1xuICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5jb25maWcudXBsb2FkQVBJLmhlYWRlcnMgfHwge307XG4gICAgICB0aGlzLm9uZUZpbGVQZXJSZXF1ZXN0ID0gISF0aGlzLmNvbmZpZy5vbmVGaWxlUGVyUmVxdWVzdDtcbiAgICAgIHRoaXMua2V5ID0gdGhpcy5jb25maWcua2V5IHx8ICdmaWxlJztcbiAgICAgIGNvbnN0IGRlZmF1bHRSZXBsYWNlVGV4dHNWYWx1ZXM6IFJlcGxhY2VUZXh0cyA9IHtcbiAgICAgICAgc2VsZWN0RmlsZUJ0bjogdGhpcy5tdWx0aXBsZSA/ICdTZWxlY3QgRmlsZXMnIDogJ1NlbGVjdCBGaWxlJyxcbiAgICAgICAgcmVzZXRCdG46ICdSZXNldCcsXG4gICAgICAgIHVwbG9hZEJ0bjogJ1VwbG9hZCcsXG4gICAgICAgIGRyYWdORHJvcEJveDogJ0RyYWcgTiBEcm9wJyxcbiAgICAgICAgYXR0YWNoUGluQnRuOiB0aGlzLm11bHRpcGxlID8gJ0F0dGFjaCBGaWxlcy4uLicgOiAnQXR0YWNoIEZpbGUuLi4nLFxuICAgICAgICBhZnRlclVwbG9hZE1zZ19zdWNjZXNzOiAnU3VjY2Vzc2Z1bGx5IFVwbG9hZGVkICEnLFxuICAgICAgICBhZnRlclVwbG9hZE1zZ19lcnJvcjogJ1VwbG9hZCBGYWlsZWQgIScsXG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnJlcGxhY2VUZXh0cykge1xuICAgICAgICB0aGlzLnJlcGxhY2VUZXh0cyA9IHtcbiAgICAgICAgICAuLi5kZWZhdWx0UmVwbGFjZVRleHRzVmFsdWVzLFxuICAgICAgICAgIC4uLnRoaXMuY29uZmlnLnJlcGxhY2VUZXh0cyxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRzID0gey4uLmRlZmF1bHRSZXBsYWNlVGV4dHNWYWx1ZXN9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLnJlc2V0VXBsb2FkKSB7XG4gICAgICBpZiAoY2hhbmdlcy5yZXNldFVwbG9hZC5jdXJyZW50VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5yZXNldEZpbGVVcGxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcblxuICB9XG5cbiAgcmVzZXRGaWxlVXBsb2FkKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRGaWxlcyA9IFtdO1xuICAgIHRoaXMuQ2FwdGlvbiA9IFtdO1xuICAgIHRoaXMubm90QWxsb3dlZExpc3QgPSBbXTtcbiAgICB0aGlzLnVwbG9hZE1zZyA9IGZhbHNlO1xuICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XG4gIH1cblxuICBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgdGhpcy5ub3RBbGxvd2VkTGlzdCA9IFtdO1xuICAgIGlmICh0aGlzLmFmdGVyVXBsb2FkIHx8ICF0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBbXTtcbiAgICAgIHRoaXMuQ2FwdGlvbiA9IFtdO1xuICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvcm1hdHNBbGxvd2VkTGlzdCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5mb3JtYXRzQWxsb3dlZExpc3QgPSB0aGlzLmZvcm1hdHNBbGxvd2VkLnNwbGl0KCcuJykubWFwKHggPT4geC5zcGxpdCgnLCcpWzBdLnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICBsZXQgZmlsZUxpc3Q6IEZpbGVMaXN0O1xuICAgIGlmIChldmVudC50eXBlID09PSAnZHJvcCcpIHtcbiAgICAgIGZpbGVMaXN0ID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlTGlzdCA9IGV2ZW50LnRhcmdldC5maWxlcyB8fCBldmVudC5zcmNFbGVtZW50LmZpbGVzO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50RmlsZUV4dCA9IHRoaXMucmVnLmV4ZWMoZmlsZUxpc3RbaV0ubmFtZSlbMV07XG4gICAgICBjb25zdCBjdXJyZW50RmlsZUV4dExvd2VyID0gY3VycmVudEZpbGVFeHQudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGZybXRBbGxvd2VkID0gdGhpcy5mb3JtYXRzQWxsb3dlZExpc3Quc29tZSh4ID0+IHggPT09IGN1cnJlbnRGaWxlRXh0TG93ZXIpO1xuXG4gICAgICBpZiAoZnJtdEFsbG93ZWQpIHtcbiAgICAgICAgaWYgKGZpbGVMaXN0W2ldLnNpemUgPiB0aGlzLm1heFNpemUgKiAxMDI0MDAwKSB7XG4gICAgICAgICAgdGhpcy5ub3RBbGxvd2VkTGlzdC5wdXNoKHtcbiAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlTGlzdFtpXS5uYW1lLFxuICAgICAgICAgICAgZmlsZVNpemU6IHRoaXMuY29udmVydFNpemUoZmlsZUxpc3RbaV0uc2l6ZSksXG4gICAgICAgICAgICBlcnJvck1zZzogJ0ludmFsaWQgc2l6ZScsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzLnB1c2goZmlsZUxpc3RbaV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnB1c2goe1xuICAgICAgICAgIGZpbGVOYW1lOiBmaWxlTGlzdFtpXS5uYW1lLFxuICAgICAgICAgIGZpbGVTaXplOiB0aGlzLmNvbnZlcnRTaXplKGZpbGVMaXN0W2ldLnNpemUpLFxuICAgICAgICAgIGVycm9yTXNnOiAnSW52YWxpZCBmb3JtYXQnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy51cGxvYWRCdG4gPSB0cnVlO1xuICAgICAgaWYgKHRoaXMudGhlbWUgPT09ICdhdHRhY2hQaW4nKSB7XG4gICAgICAgIHRoaXMudXBsb2FkRmlsZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy51cGxvYWRNc2cgPSBmYWxzZTtcbiAgICB0aGlzLnVwbG9hZENsaWNrID0gdHJ1ZTtcbiAgICB0aGlzLnBlcmNlbnRDb21wbGV0ZSA9IDA7XG4gICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gbnVsbDtcbiAgfVxuXG4gIHVwbG9hZEZpbGVzKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gdHJ1ZTtcbiAgICB0aGlzLnVwbG9hZENsaWNrID0gZmFsc2U7XG4gICAgdGhpcy5ub3RBbGxvd2VkTGlzdCA9IFtdO1xuICAgIGxldCBpc0Vycm9yID0gZmFsc2U7XG5cbiAgICB0aGlzLnNpbmdsZUZpbGUgPSB0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoIDw9IDE7XG5cbiAgICB0aGlzLmN1cnJlbnRVcGxvYWRzID0gW107XG5cbiAgICBpZiAodGhpcy5vbmVGaWxlUGVyUmVxdWVzdCAmJiAhdGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMuZm9yRWFjaCgoc2VsZWN0ZWRGaWxlLCBpbngpID0+IHtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICAgICAgLy8gQWRkIGRhdGEgdG8gYmUgc2VudCBpbiB0aGlzIHJlcXVlc3RcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgIHRoaXMuQ2FwdGlvbltpbnhdIHx8IHRoaXMua2V5LFxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlc1tpbnhdLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFVwbG9hZHMucHVzaCh7eGhyOiB4aHIsIGZvcm1EYXRhOiBmb3JtRGF0YSwgaW54czogW2lueF19KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICAgIC8vIEFkZCBkYXRhIHRvIGJlIHNlbnQgaW4gdGhpcyByZXF1ZXN0XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMuZm9yRWFjaCgoc2VsZWN0ZWRGaWxlLCBpbngpID0+IHtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgIHRoaXMuQ2FwdGlvbltpbnhdIHx8IHRoaXMua2V5ICsgKHRoaXMuc2luZ2xlRmlsZSA/ICcnIDogaW54KSxcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkRmlsZXNbaW54XSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmN1cnJlbnRVcGxvYWRzLnB1c2goe3hocjogeGhyLCBmb3JtRGF0YTogZm9ybURhdGEsIGlueHM6IHRoaXMuc2VsZWN0ZWRGaWxlcy5tYXAoKHNlbGVjdGVkRmlsZSwgaW54KSA9PiBpbngpfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG90YWxVcGxvYWRzID0gdGhpcy5jdXJyZW50VXBsb2Fkcy5sZW5ndGg7XG5cbiAgICB0aGlzLmN1cnJlbnRVcGxvYWRzLmZvckVhY2goKHVwbG9hZDogVXBsb2FkSW5mbywgdXBsb2FkSW54KSA9PiB7XG4gICAgICBjb25zdCB4aHIgPSB1cGxvYWQueGhyO1xuXG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZXZudCA9PiB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDAgJiYgeGhyLnN0YXR1cyAhPT0gMjAxKSB7XG4gICAgICAgICAgICBpc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRNc2cgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZE1zZ1RleHQgPSB0aGlzLnJlcGxhY2VUZXh0cy5hZnRlclVwbG9hZE1zZ19lcnJvcjtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTXNnQ2xhc3MgPSAndGV4dC1kYW5nZXIgbGVhZCc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuQXBpUmVzcG9uc2UuZW1pdCh4aHIpO1xuICAgICAgICAgIGlmICh1cGxvYWRJbnggKyAxID09PSB0b3RhbFVwbG9hZHMpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlcnl0aGluZ0RvbmUuZW1pdCh0aGlzLmN1cnJlbnRVcGxvYWRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGV2bnQgPT4ge1xuICAgICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlOyAvLyBidXR0b24gc2hvdWxkIGJlIGRpc2FibGVkIGJ5IHByb2Nlc3MgdXBsb2FkaW5nXG4gICAgICAgIGlmIChldm50Lmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50RG9uZSA9IChldm50LmxvYWRlZCAvIGV2bnQudG90YWwpO1xuICAgICAgICAgIHRoaXMucGVyY2VudENvbXBsZXRlID0gTWF0aC5yb3VuZCgodXBsb2FkSW54ICsgY3VycmVudERvbmUpICogMTAwIC8gdG90YWxVcGxvYWRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLm9ubG9hZCA9IGV2bnQgPT4ge1xuICAgICAgICB0aGlzLnByb2dyZXNzQmFyU2hvdyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwbG9hZE1zZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYWZ0ZXJVcGxvYWQgPSB0cnVlO1xuICAgICAgICBpZiAoIWlzRXJyb3IpIHtcbiAgICAgICAgICBpZiAodXBsb2FkSW54ICsgMSA9PT0gdG90YWxVcGxvYWRzKSB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZE1zZ1RleHQgPSB0aGlzLnJlcGxhY2VUZXh0cy5hZnRlclVwbG9hZE1zZ19zdWNjZXNzO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRNc2dDbGFzcyA9ICd0ZXh0LXN1Y2Nlc3MgbGVhZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRVcGxvYWQgPSB0aGlzLmN1cnJlbnRVcGxvYWRzW3VwbG9hZElueCArIDFdO1xuICAgICAgICAgICAgbmV4dFVwbG9hZC54aHIuc2VuZChuZXh0VXBsb2FkLmZvcm1EYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wZXJjZW50Q29tcGxldGUgPSBNYXRoLnJvdW5kKCh1cGxvYWRJbnggKyAxKSAqIDEwMCAvIHRvdGFsVXBsb2Fkcyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVwbG9hZEFQSSwgdHJ1ZSk7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpKSB7XG4gICAgICAgIC8vIE9iamVjdC5rZXlzIHdpbGwgZ2l2ZSBhbiBBcnJheSBvZiBrZXlzXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdGhpcy5oZWFkZXJzW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBjb25zdCBmaXJzdFVwbG9hZCA9IHRoaXMuY3VycmVudFVwbG9hZHNbMF07XG4gICAgZmlyc3RVcGxvYWQueGhyLnNlbmQoZmlyc3RVcGxvYWQuZm9ybURhdGEpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZShpOiBhbnksIHNmX25hOiBhbnkpIHtcbiAgICBpZiAoc2ZfbmEgPT09ICdzZicpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB0aGlzLkNhcHRpb24uc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnNwbGljZShpLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0U2l6ZShmaWxlU2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZmlsZVNpemUgPCAxMDI0MDAwXG4gICAgICA/IChmaWxlU2l6ZSAvIDEwMjQpLnRvRml4ZWQoMikgKyAnIEtCJ1xuICAgICAgOiAoZmlsZVNpemUgLyAxMDI0MDAwKS50b0ZpeGVkKDIpICsgJyBNQic7XG4gIH1cblxuICBhdHRhY2hwaW5PbmNsaWNrKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsJyArIHRoaXMuaWQpO1xuICAgIGlmIChlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZHJvcChldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgfVxuXG4gIGFsbG93RHJvcChldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9hbmd1bGFyLWZpbGUtdXBsb2FkZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0FuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaWxlVXBsb2FkZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0lBT0UsaUJBQWlCOzs7WUFMbEIsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7QUNKRDtJQThKRTtRQXhDQSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUdwQixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFHakMsbUJBQWMsR0FBK0IsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFTOUUsdUJBQWtCLEdBQWEsSUFBSSxDQUFDO1FBT3BDLFFBQUcsR0FBVyxpQkFBaUIsQ0FBQztRQUNoQyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQixtQkFBYyxHQUFnRSxFQUFFLENBQUM7UUFDakYsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUtuQixtQkFBYyxHQUFpQixF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