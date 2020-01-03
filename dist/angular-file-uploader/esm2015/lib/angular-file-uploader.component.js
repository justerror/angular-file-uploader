/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * @record
 */
export function ReplaceTexts() { }
if (false) {
    /** @type {?} */
    ReplaceTexts.prototype.selectFileBtn;
    /** @type {?} */
    ReplaceTexts.prototype.resetBtn;
    /** @type {?} */
    ReplaceTexts.prototype.uploadBtn;
    /** @type {?} */
    ReplaceTexts.prototype.dragNDropBox;
    /** @type {?} */
    ReplaceTexts.prototype.attachPinBtn;
    /** @type {?} */
    ReplaceTexts.prototype.afterUploadMsg_success;
    /** @type {?} */
    ReplaceTexts.prototype.afterUploadMsg_error;
}
/**
 * @record
 */
export function AngularFileUploaderConfig() { }
if (false) {
    /** @type {?} */
    AngularFileUploaderConfig.prototype.uploadAPI;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.theme;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.id;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.hideProgressBar;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.hideResetBtn;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.hideSelectBtn;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.maxSize;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.formatsAllowed;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.multiple;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.oneFilePerRequest;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.key;
    /** @type {?|undefined} */
    AngularFileUploaderConfig.prototype.replaceTexts;
}
/**
 * @record
 */
export function UploadInfo() { }
if (false) {
    /** @type {?} */
    UploadInfo.prototype.xhr;
    /** @type {?} */
    UploadInfo.prototype.formData;
    /** @type {?} */
    UploadInfo.prototype.inxs;
}
export class AngularFileUploaderComponent {
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
if (false) {
    /** @type {?} */
    AngularFileUploaderComponent.prototype.config;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.resetUpload;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.ApiResponse;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.everythingDone;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.theme;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.id;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.hideProgressBar;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.maxSize;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadAPI;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.method;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.formatsAllowed;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.formatsAllowedList;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.multiple;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.headers;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.hideResetBtn;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.hideSelectBtn;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.oneFilePerRequest;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.key;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.reg;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.selectedFiles;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.notAllowedList;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.Caption;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.singleFile;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.progressBarShow;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadBtn;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadMsg;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.afterUpload;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadClick;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadMsgText;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadMsgClass;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.percentComplete;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.replaceTexts;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.currentUploads;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.idDate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS11cGxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9hbmd1bGFyLWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7QUFFekcsa0NBUUM7OztJQVBDLHFDQUFzQjs7SUFDdEIsZ0NBQWlCOztJQUNqQixpQ0FBa0I7O0lBQ2xCLG9DQUFxQjs7SUFDckIsb0NBQXFCOztJQUNyQiw4Q0FBK0I7O0lBQy9CLDRDQUE2Qjs7Ozs7QUFHL0IsK0NBY0M7OztJQWJDLDhDQUFpRjs7SUFFakYsMENBQWU7O0lBQ2YsdUNBQVk7O0lBQ1osb0RBQTBCOztJQUMxQixpREFBdUI7O0lBQ3ZCLGtEQUF3Qjs7SUFDeEIsNENBQWlCOztJQUNqQixtREFBd0I7O0lBQ3hCLDZDQUFtQjs7SUFDbkIsc0RBQTRCOztJQUM1Qix3Q0FBYTs7SUFDYixpREFBNEI7Ozs7O0FBRzlCLGdDQUlDOzs7SUFIQyx5QkFBb0I7O0lBQ3BCLDhCQUFtQjs7SUFDbkIsMEJBQWU7O0FBa0ZqQixNQUFNO0lBNkNKO1FBeENBLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBR3BCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdqQyxtQkFBYyxHQUErQixJQUFJLFlBQVksRUFBZ0IsQ0FBQztRQVM5RSx1QkFBa0IsR0FBYSxJQUFJLENBQUM7UUFPcEMsUUFBRyxHQUFXLGlCQUFpQixDQUFDO1FBQ2hDLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLG1CQUFjLEdBQWdFLEVBQUUsQ0FBQztRQUNqRixZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBS25CLG1CQUFjLEdBQWlCLEVBQUUsQ0FBQztRQUUxQixXQUFNLEdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBR3JDLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLEVBQUU7Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNkLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDO1lBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDO1lBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDO1lBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztZQUNyRCxJQUFJLENBQUMsY0FBYztnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksc0NBQXNDLENBQUM7WUFDdkUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQztZQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDbkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQ3pELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDOztrQkFDL0IseUJBQXlCLEdBQWlCO2dCQUM5QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxhQUFhO2dCQUM3RCxRQUFRLEVBQUUsT0FBTztnQkFDakIsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFlBQVksRUFBRSxhQUFhO2dCQUMzQixZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtnQkFDbEUsc0JBQXNCLEVBQUUseUJBQXlCO2dCQUNqRCxvQkFBb0IsRUFBRSxpQkFBaUI7YUFDeEM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxZQUFZLHFCQUNaLHlCQUF5QixFQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FDNUIsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsWUFBWSxxQkFBTyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3JELENBQUM7UUFDSCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3pCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVE7SUFFUixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzFHLENBQUM7O1lBRUcsUUFBa0I7UUFDdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDMUQsQ0FBQztRQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOztrQkFDbkMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O2tCQUNuRCxtQkFBbUIsR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFOztrQkFDbEQsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssbUJBQW1CLENBQUM7WUFFaEYsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO3dCQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7d0JBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQzVDLFFBQVEsRUFBRSxjQUFjO3FCQUN6QixDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztvQkFDdkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUM1QyxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQixDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckIsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQzs7WUFDckIsT0FBTyxHQUFHLEtBQUs7UUFFbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFFekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEVBQUU7O3NCQUN6QyxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUU7O3NCQUMxQixRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUU7Z0JBRS9CLHNDQUFzQztnQkFDdEMsUUFBUSxDQUFDLE1BQU0sQ0FDYixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQ3hCLENBQUM7Z0JBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ3hFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDOztrQkFDQSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUU7O2tCQUMxQixRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFFL0Isc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUMvQyxRQUFRLENBQUMsTUFBTSxDQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQ3hCLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNySCxDQUFDOztjQUVLLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07UUFFL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFrQixFQUFFLFNBQVMsRUFBRSxFQUFFOztrQkFDdEQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHO1lBRXRCLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzdDLE9BQU8sR0FBRyxJQUFJLENBQUM7d0JBQ2YsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7d0JBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO3dCQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDNUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQztvQkFDM0MsQ0FBQztvQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDM0IsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ2hELENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUMsQ0FBQztZQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLGlEQUFpRDtnQkFDekUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7MEJBQ3BCLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDOUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQztnQkFDcEYsQ0FBQztZQUNILENBQUMsQ0FBQztZQUVGLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2IsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUM7d0JBQzlELElBQUksQ0FBQyxjQUFjLEdBQUcsbUJBQW1CLENBQUM7b0JBQzVDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7OzhCQUNBLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7d0JBQ3JELFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDM0MsQ0FBQztvQkFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQyxDQUFDO2dCQUMxRSxDQUFDO1lBQ0gsQ0FBQyxDQUFDO1lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1Qyx5Q0FBeUM7Z0JBQ3pDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQzs7Y0FHRyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7OztJQUVELFVBQVUsQ0FBQyxDQUFNLEVBQUUsS0FBVTtRQUMzQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsUUFBZ0I7UUFDMUIsTUFBTSxDQUFDLFFBQVEsR0FBRyxPQUFPO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSztZQUN0QyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM5QyxDQUFDOzs7O0lBRUQsZ0JBQWdCOztjQUNSLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixDQUFDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsS0FBVTtRQUNiLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFVO1FBQ2xCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0lBQ3pDLENBQUM7OztZQXZYRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBFWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxrdkJBQWt2QixDQUFDO2FBQzd2Qjs7OztxQkFFRSxLQUFLOzBCQUdMLEtBQUs7MEJBR0wsTUFBTTs2QkFHTixNQUFNOzs7O0lBVFAsOENBQ2tDOztJQUVsQyxtREFDb0I7O0lBRXBCLG1EQUNpQzs7SUFFakMsc0RBQzhFOztJQUU5RSw2Q0FBYzs7SUFDZCwwQ0FBVzs7SUFDWCx1REFBeUI7O0lBQ3pCLCtDQUFnQjs7SUFDaEIsaURBQWtCOztJQUNsQiw4Q0FBZTs7SUFDZixzREFBdUI7O0lBQ3ZCLDBEQUFvQzs7SUFDcEMsZ0RBQWtCOztJQUNsQiwrQ0FBa0M7O0lBQ2xDLG9EQUFzQjs7SUFDdEIscURBQXVCOztJQUN2Qix5REFBMkI7O0lBQzNCLDJDQUFZOztJQUNaLDJDQUFnQzs7SUFDaEMscURBQTJCOztJQUMzQixzREFBaUY7O0lBQ2pGLCtDQUF1Qjs7SUFDdkIsa0RBQWtCOztJQUNsQix1REFBd0I7O0lBQ3hCLGlEQUFrQjs7SUFDbEIsaURBQWtCOztJQUNsQixtREFBb0I7O0lBQ3BCLG1EQUFtQjs7SUFDbkIscURBQXNCOztJQUN0QixzREFBdUI7O0lBQ3ZCLHVEQUF3Qjs7SUFDeEIsb0RBQWE7O0lBQ2Isc0RBQWtDOztJQUVsQyw4Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBSZXBsYWNlVGV4dHMge1xuICBzZWxlY3RGaWxlQnRuOiBzdHJpbmc7XG4gIHJlc2V0QnRuOiBzdHJpbmc7XG4gIHVwbG9hZEJ0bjogc3RyaW5nO1xuICBkcmFnTkRyb3BCb3g6IHN0cmluZztcbiAgYXR0YWNoUGluQnRuOiBzdHJpbmc7XG4gIGFmdGVyVXBsb2FkTXNnX3N1Y2Nlc3M6IHN0cmluZztcbiAgYWZ0ZXJVcGxvYWRNc2dfZXJyb3I6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlsZVVwbG9hZGVyQ29uZmlnIHtcbiAgdXBsb2FkQVBJOiB7IHVybDogc3RyaW5nOyBtZXRob2Q/OiBzdHJpbmc7IGhlYWRlcnM/OiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH07IH07XG5cbiAgdGhlbWU/OiBzdHJpbmc7XG4gIGlkPzogbnVtYmVyO1xuICBoaWRlUHJvZ3Jlc3NCYXI/OiBib29sZWFuO1xuICBoaWRlUmVzZXRCdG4/OiBib29sZWFuO1xuICBoaWRlU2VsZWN0QnRuPzogYm9vbGVhbjtcbiAgbWF4U2l6ZT86IG51bWJlcjtcbiAgZm9ybWF0c0FsbG93ZWQ/OiBzdHJpbmc7XG4gIG11bHRpcGxlPzogYm9vbGVhbjtcbiAgb25lRmlsZVBlclJlcXVlc3Q/OiBib29sZWFuO1xuICBrZXk/OiBzdHJpbmc7XG4gIHJlcGxhY2VUZXh0cz86IFJlcGxhY2VUZXh0cztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGxvYWRJbmZvIHtcbiAgeGhyOiBYTUxIdHRwUmVxdWVzdDtcbiAgZm9ybURhdGE6IEZvcm1EYXRhO1xuICBpbnhzOiBudW1iZXJbXTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5ndWxhci1maWxlLXVwbG9hZGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCIgKm5nSWY9XCIodGhlbWUgIT09ICdhdHRhY2hQaW4nKVwiIGlkPVwiZGVmYXVsdFwiPlxuXG4gICAgPCEtLSBEcmFnIG4gRHJvcCB0aGVtZSBTdGFydHMgLS0+XG4gICAgPGRpdiAqbmdJZj1cInRoZW1lID09ICdkcmFnTkRyb3AnXCIgaWQ9XCJkcmFnTkRyb3BcIiBbbmdDbGFzc109XCIoaGlkZVNlbGVjdEJ0biAmJiBoaWRlUmVzZXRCdG4pID8gbnVsbCA6ICdkcmFnTkRyb3BCdG1QYWQnXCIgY2xhc3M9XCJkcmFnTkRyb3BcIj5cbiAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO1wiPlxuICAgICAgICAgICAgPGRpdiBpZD1cImRpdjFcIiBjbGFzcz1cImRpdjEgYWZ1LWRyYWduZHJvcC1ib3hcIiAoZHJvcCk9XCJkcm9wKCRldmVudClcIiAoZHJhZ292ZXIpPVwiYWxsb3dEcm9wKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImFmdS1kcmFnbmRyb3AtdGV4dFwiPnt7cmVwbGFjZVRleHRzPy5kcmFnTkRyb3BCb3h9fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSA8c3BhbiBjbGFzcz0nbGFiZWwgbGFiZWwtaW5mbycgaWQ9XCJ1cGxvYWQtZmlsZS1pbmZve3tpZH19XCI+e3tzZWxlY3RlZEZpbGVzWzBdPy5uYW1lfX08L3NwYW4+IC0tPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIERyYWcgbiBEcm9wIHRoZW1lIEVuZHMgLS0+XG5cbiAgICA8bGFiZWwgZm9yPVwic2Vse3tpZH19XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtIGFmdS1zZWxlY3QtYnRuXCIgKm5nSWY9XCIhaGlkZVNlbGVjdEJ0blwiPnt7cmVwbGFjZVRleHRzPy5zZWxlY3RGaWxlQnRufX08L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwic2Vse3tpZH19XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgKm5nSWY9XCIhaGlkZVNlbGVjdEJ0blwiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIHRpdGxlPVwiU2VsZWN0IGZpbGVcIlxuICAgICAgICBuYW1lPVwiZmlsZXNbXVwiIFthY2NlcHRdPWZvcm1hdHNBbGxvd2VkIFthdHRyLm11bHRpcGxlXT1cIm11bHRpcGxlID8gJycgOiBudWxsXCIgLz5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIGJ0bi1zbSByZXNldEJ0biBhZnUtcmVzZXQtYnRuXCIgKGNsaWNrKT1cInJlc2V0RmlsZVVwbG9hZCgpXCIgKm5nSWY9XCIhaGlkZVJlc2V0QnRuXCI+e3tyZXBsYWNlVGV4dHM/LnJlc2V0QnRufX08L2J1dHRvbj5cbiAgICA8YnIgKm5nSWY9XCIhaGlkZVNlbGVjdEJ0blwiPlxuICAgIDxwIGNsYXNzPVwiY29uc3RyYWludHMtaW5mbyBhZnUtY29uc3RyYWludHMtaW5mb1wiPih7e2Zvcm1hdHNBbGxvd2VkfX0pIFNpemUgbGltaXQtIHt7KGNvbnZlcnRTaXplKG1heFNpemUgKjEwMjQwMDApKX19PC9wPlxuICAgIDwhLS1TZWxlY3RlZCBmaWxlIGxpc3QtLT5cbiAgICA8ZGl2IGNsYXNzPVwicm93IGFmdS12YWxpZC1maWxlXCIgKm5nRm9yPVwibGV0IHNmIG9mIHNlbGVjdGVkRmlsZXM7bGV0IGk9aW5kZXhcIiA+XG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgdGV4dE92ZXJmbG93XCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIj57e3NmLm5hbWV9fTwvc3Bhbj48L3A+XG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgcGFkTWFyZyBzaXplQ1wiPjxzdHJvbmc+KHt7Y29udmVydFNpemUoc2Yuc2l6ZSl9fSk8L3N0cm9uZz4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L3A+XG4gICAgICAgIDwhLS0gIDxpbnB1dCBjbGFzcz1cImNvbC14cy0zIHByb2dyZXNzIGNhcHRpb25cIiAgdHlwZT1cInRleHRcIiAgcGxhY2Vob2xkZXI9XCJDYXB0aW9uLi5cIiAgWyhuZ01vZGVsKV09XCJDYXB0aW9uW2ldXCIgICpuZ0lmPVwidXBsb2FkQ2xpY2tcIi8+IC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MgY29sLXhzLTMgcGFkTWFyZyBhZnUtcHJvZ3Jlc3MtYmFyXCIgKm5nSWY9XCJzaW5nbGVGaWxlICYmIHByb2dyZXNzQmFyU2hvdyAmJiAhaGlkZVByb2dyZXNzQmFyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3VjY2Vzc1wiIHJvbGU9XCJwcm9ncmVzc2JhclwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOnBlcmNlbnRDb21wbGV0ZSsnJSd9XCI+e3twZXJjZW50Q29tcGxldGV9fSU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YSBjbGFzcz1cImNvbC14cy0xXCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJyZW1vdmVGaWxlKGksJ3NmJylcIiAqbmdJZj1cInVwbG9hZENsaWNrXCI+PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT48L2E+XG4gICAgPC9kaXY+XG4gICAgPCEtLUludmFsaWQgZmlsZSBsaXN0LS0+XG4gICAgPGRpdiBjbGFzcz1cInJvdyB0ZXh0LWRhbmdlciBhZnUtaW52YWxpZC1maWxlXCIgKm5nRm9yPVwibGV0IG5hIG9mIG5vdEFsbG93ZWRMaXN0O2xldCBqPWluZGV4XCI+XG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgdGV4dE92ZXJmbG93XCI+PHNwYW4+e3tuYVsnZmlsZU5hbWUnXX19PC9zcGFuPjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyBwYWRNYXJnIHNpemVDXCI+PHN0cm9uZz4oe3tuYVsnZmlsZVNpemUnXX19KTwvc3Ryb25nPjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyBcIj57e25hWydlcnJvck1zZyddfX08L3A+XG4gICAgICAgIDxhIGNsYXNzPVwiY29sLXhzLTEgZGVsRmlsZUljb25cIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInJlbW92ZUZpbGUoaiwnbmEnKVwiICpuZ0lmPVwidXBsb2FkQ2xpY2tcIj4mbmJzcDs8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvYT5cbiAgICA8L2Rpdj5cblxuICAgIDxwICpuZ0lmPVwidXBsb2FkTXNnXCIgY2xhc3M9XCJ7e3VwbG9hZE1zZ0NsYXNzfX0gKyBhZnUtdXBsb2FkLXN0YXR1c1wiPnt7dXBsb2FkTXNnVGV4dH19PHA+XG4gICAgPGRpdiAqbmdJZj1cIiFzaW5nbGVGaWxlICYmIHByb2dyZXNzQmFyU2hvdyAmJiAhaGlkZVByb2dyZXNzQmFyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcyBjb2wteHMtNCBwYWRNYXJnIGFmdS1wcm9ncmVzcy1iYXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci1zdWNjZXNzXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6cGVyY2VudENvbXBsZXRlKyclJ31cIj57e3BlcmNlbnRDb21wbGV0ZX19JTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGJyPlxuICAgIDwvZGl2PlxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYWZ1LXVwbG9hZC1idG5cIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZEZpbGVzKClcIiBbZGlzYWJsZWRdPSF1cGxvYWRCdG4+e3tyZXBsYWNlVGV4dHM/LnVwbG9hZEJ0bn19PC9idXR0b24+XG4gICAgPGJyPlxuPC9kaXY+XG5cbjwhLS0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gQVRUQUNIIFBJTiBUSEVNRSAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy0tPlxuPGRpdiAqbmdJZj1cInRoZW1lID09ICdhdHRhY2hQaW4nXCIgaWQ9XCJhdHRhY2hQaW5cIj5cbiAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjZweFwiPlxuICAgICAgICA8YSBjbGFzcz0nYnRuIHVwX2J0biBhZnUtYXR0YWNoLXBpbicgKGNsaWNrKT1cImF0dGFjaHBpbk9uY2xpY2soKVwiPlxuICAgICAgICAgIHt7cmVwbGFjZVRleHRzPy5hdHRhY2hQaW5CdG59fVxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wYXBlcmNsaXBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8IS0tIDxwIHN0eWxlPVwibWFyZ2luLXRvcDoxMHB4XCI+KHt7Zm9ybWF0c0FsbG93ZWR9fSkgU2l6ZSBsaW1pdC0ge3soY29udmVydFNpemUobWF4U2l6ZSAqIDEwMjQwMDApKX19PC9wPiAtLT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwic2Vse3tpZH19XCIgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgdGl0bGU9XCJTZWxlY3QgZmlsZVwiIG5hbWU9XCJmaWxlc1tdXCIgW2FjY2VwdF09Zm9ybWF0c0FsbG93ZWRcbiAgICAgICAgICAgICAgICBbYXR0ci5tdWx0aXBsZV09XCJtdWx0aXBsZSA/ICcnIDogbnVsbFwiIC8+XG4gICAgICAgICAgICA8YnI+XG4gICAgICAgIDwvYT5cbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxzcGFuIGNsYXNzPSdsYWJlbCBsYWJlbC1pbmZvJyBpZD1cInVwbG9hZC1maWxlLWluZm97e2lkfX1cIj57e3NlbGVjdGVkRmlsZXNbMF0/Lm5hbWV9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIERSQUcgTiBEUk9QIFRIRU1FICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLS0+XG48IS0tIDxkaXYgKm5nSWY9XCJ0aGVtZSA9PSAnZHJhZ05Ecm9wJ1wiIGlkPVwiZHJhZ05Ecm9wXCI+XG4gIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6NnB4XCI+XG4gICAgPGRpdiBpZD1cImRpdjFcIiAoZHJvcCk9XCJkcm9wKCRldmVudClcIiAoZHJhZ292ZXIpPVwiYWxsb3dEcm9wKCRldmVudClcIj5cbiAgICAgIDxwPkRyYWcgTiBEcm9wPC9wPlxuICAgIDwvZGl2PlxuICAgIDxzcGFuIGNsYXNzPSdsYWJlbCBsYWJlbC1pbmZvJyBpZD1cInVwbG9hZC1maWxlLWluZm97e2lkfX1cIj57e3NlbGVjdGVkRmlsZXNbMF0/Lm5hbWV9fTwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj4gLS0+XG5gLFxuICBzdHlsZXM6IFtgLmNvbnN0cmFpbnRzLWluZm97bWFyZ2luLXRvcDoxMHB4O2ZvbnQtc3R5bGU6aXRhbGljfS5wYWRNYXJne3BhZGRpbmc6MDttYXJnaW4tYm90dG9tOjB9LmNhcHRpb257bWFyZ2luLXJpZ2h0OjVweH0udGV4dE92ZXJmbG93e3doaXRlLXNwYWNlOm5vd3JhcDtwYWRkaW5nLXJpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LnVwX2J0bntjb2xvcjojMDAwO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjJweCBzb2xpZCAjNWM1YjViO2JvcmRlci1yYWRpdXM6MjJweH0uZGVsRmlsZUljb257dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6I2NlMDkwOX0uZHJhZ05Ecm9wIC5kaXYxe2Rpc3BsYXk6Ym9yZGVyLWJveDtib3JkZXI6MnB4IGRhc2hlZCAjNWM1YjViO2hlaWdodDo2cmVtO3dpZHRoOjIwcmVtfS5kcmFnTkRyb3AgLmRpdjE+cHt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXdlaWdodDo3MDA7Y29sb3I6IzVjNWI1YjttYXJnaW4tdG9wOjEuNGVtfS5kcmFnTkRyb3BCdG1QYWR7cGFkZGluZy1ib3R0b206MnJlbX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjYyMHB4KXsuY2FwdGlvbntwYWRkaW5nOjB9fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTEwcHgpey5zaXplQ3t3aWR0aDoyNSV9fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MjYwcHgpey5jYXB0aW9uLC5zaXplQ3tmb250LXNpemU6MTBweH19LnJlc2V0QnRue21hcmdpbi1sZWZ0OjNweH1gXSxcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgY29uZmlnOiBBbmd1bGFyRmlsZVVwbG9hZGVyQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIHJlc2V0VXBsb2FkID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIEFwaVJlc3BvbnNlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKVxuICBldmVyeXRoaW5nRG9uZTogRXZlbnRFbWl0dGVyPFVwbG9hZEluZm9bXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFVwbG9hZEluZm9bXT4oKTtcblxuICB0aGVtZTogc3RyaW5nO1xuICBpZDogbnVtYmVyO1xuICBoaWRlUHJvZ3Jlc3NCYXI6IGJvb2xlYW47XG4gIG1heFNpemU6IG51bWJlcjtcbiAgdXBsb2FkQVBJOiBzdHJpbmc7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBmb3JtYXRzQWxsb3dlZDogc3RyaW5nO1xuICBmb3JtYXRzQWxsb3dlZExpc3Q6IHN0cmluZ1tdID0gbnVsbDtcbiAgbXVsdGlwbGU6IGJvb2xlYW47XG4gIGhlYWRlcnM6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgaGlkZVJlc2V0QnRuOiBib29sZWFuO1xuICBoaWRlU2VsZWN0QnRuOiBib29sZWFuO1xuICBvbmVGaWxlUGVyUmVxdWVzdDogYm9vbGVhbjtcbiAga2V5OiBzdHJpbmc7XG4gIHJlZzogUmVnRXhwID0gLyg/OlxcLihbXi5dKykpPyQvO1xuICBzZWxlY3RlZEZpbGVzOiBGaWxlW10gPSBbXTtcbiAgbm90QWxsb3dlZExpc3Q6IHsgZmlsZU5hbWU6IHN0cmluZzsgZmlsZVNpemU6IHN0cmluZzsgZXJyb3JNc2c6IHN0cmluZzsgfVtdID0gW107XG4gIENhcHRpb246IHN0cmluZ1tdID0gW107XG4gIHNpbmdsZUZpbGUgPSB0cnVlO1xuICBwcm9ncmVzc0JhclNob3cgPSBmYWxzZTtcbiAgdXBsb2FkQnRuID0gZmFsc2U7XG4gIHVwbG9hZE1zZyA9IGZhbHNlO1xuICBhZnRlclVwbG9hZCA9IGZhbHNlO1xuICB1cGxvYWRDbGljayA9IHRydWU7XG4gIHVwbG9hZE1zZ1RleHQ6IHN0cmluZztcbiAgdXBsb2FkTXNnQ2xhc3M6IHN0cmluZztcbiAgcGVyY2VudENvbXBsZXRlOiBudW1iZXI7XG4gIHJlcGxhY2VUZXh0cztcbiAgY3VycmVudFVwbG9hZHM6IFVwbG9hZEluZm9bXSA9IFtdO1xuXG4gIHByaXZhdGUgaWREYXRlOiBudW1iZXIgPSArbmV3IERhdGUoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5jb25maWcgJiYgdGhpcy5jb25maWcpIHtcbiAgICAgIHRoaXMudGhlbWUgPSB0aGlzLmNvbmZpZy50aGVtZSB8fCAnJztcbiAgICAgIHRoaXMuaWQgPVxuICAgICAgICB0aGlzLmNvbmZpZy5pZCB8fFxuICAgICAgICBwYXJzZUludCgodGhpcy5pZERhdGUgLyAxMDAwMCkudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdLCAxMCkgK1xuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCkgKiAxMDAwMDtcbiAgICAgIHRoaXMuaGlkZVByb2dyZXNzQmFyID0gdGhpcy5jb25maWcuaGlkZVByb2dyZXNzQmFyIHx8IGZhbHNlO1xuICAgICAgdGhpcy5oaWRlUmVzZXRCdG4gPSB0aGlzLmNvbmZpZy5oaWRlUmVzZXRCdG4gfHwgZmFsc2U7XG4gICAgICB0aGlzLmhpZGVTZWxlY3RCdG4gPSB0aGlzLmNvbmZpZy5oaWRlU2VsZWN0QnRuIHx8IGZhbHNlO1xuICAgICAgdGhpcy5tYXhTaXplID0gdGhpcy5jb25maWcubWF4U2l6ZSB8fCAyMDtcbiAgICAgIHRoaXMudXBsb2FkQVBJID0gdGhpcy5jb25maWcudXBsb2FkQVBJLnVybDtcbiAgICAgIHRoaXMubWV0aG9kID0gdGhpcy5jb25maWcudXBsb2FkQVBJLm1ldGhvZCB8fCAnUE9TVCc7XG4gICAgICB0aGlzLmZvcm1hdHNBbGxvd2VkID1cbiAgICAgICAgdGhpcy5jb25maWcuZm9ybWF0c0FsbG93ZWQgfHwgJy5qcGcsLnBuZywucGRmLC5kb2N4LC50eHQsLmdpZiwuanBlZyc7XG4gICAgICB0aGlzLmZvcm1hdHNBbGxvd2VkTGlzdCA9IG51bGw7XG4gICAgICB0aGlzLm11bHRpcGxlID0gdGhpcy5jb25maWcubXVsdGlwbGUgfHwgZmFsc2U7XG4gICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmNvbmZpZy51cGxvYWRBUEkuaGVhZGVycyB8fCB7fTtcbiAgICAgIHRoaXMub25lRmlsZVBlclJlcXVlc3QgPSAhIXRoaXMuY29uZmlnLm9uZUZpbGVQZXJSZXF1ZXN0O1xuICAgICAgdGhpcy5rZXkgPSB0aGlzLmNvbmZpZy5rZXkgfHwgJ2ZpbGUnO1xuICAgICAgY29uc3QgZGVmYXVsdFJlcGxhY2VUZXh0c1ZhbHVlczogUmVwbGFjZVRleHRzID0ge1xuICAgICAgICBzZWxlY3RGaWxlQnRuOiB0aGlzLm11bHRpcGxlID8gJ1NlbGVjdCBGaWxlcycgOiAnU2VsZWN0IEZpbGUnLFxuICAgICAgICByZXNldEJ0bjogJ1Jlc2V0JyxcbiAgICAgICAgdXBsb2FkQnRuOiAnVXBsb2FkJyxcbiAgICAgICAgZHJhZ05Ecm9wQm94OiAnRHJhZyBOIERyb3AnLFxuICAgICAgICBhdHRhY2hQaW5CdG46IHRoaXMubXVsdGlwbGUgPyAnQXR0YWNoIEZpbGVzLi4uJyA6ICdBdHRhY2ggRmlsZS4uLicsXG4gICAgICAgIGFmdGVyVXBsb2FkTXNnX3N1Y2Nlc3M6ICdTdWNjZXNzZnVsbHkgVXBsb2FkZWQgIScsXG4gICAgICAgIGFmdGVyVXBsb2FkTXNnX2Vycm9yOiAnVXBsb2FkIEZhaWxlZCAhJyxcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5jb25maWcucmVwbGFjZVRleHRzKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRzID0ge1xuICAgICAgICAgIC4uLmRlZmF1bHRSZXBsYWNlVGV4dHNWYWx1ZXMsXG4gICAgICAgICAgLi4udGhpcy5jb25maWcucmVwbGFjZVRleHRzLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlVGV4dHMgPSB7Li4uZGVmYXVsdFJlcGxhY2VUZXh0c1ZhbHVlc307XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMucmVzZXRVcGxvYWQpIHtcbiAgICAgIGlmIChjaGFuZ2VzLnJlc2V0VXBsb2FkLmN1cnJlbnRWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnJlc2V0RmlsZVVwbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gIH1cblxuICByZXNldEZpbGVVcGxvYWQoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gW107XG4gICAgdGhpcy5DYXB0aW9uID0gW107XG4gICAgdGhpcy5ub3RBbGxvd2VkTGlzdCA9IFtdO1xuICAgIHRoaXMudXBsb2FkTXNnID0gZmFsc2U7XG4gICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcbiAgfVxuXG4gIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLm5vdEFsbG93ZWRMaXN0ID0gW107XG4gICAgaWYgKHRoaXMuYWZ0ZXJVcGxvYWQgfHwgIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcyA9IFtdO1xuICAgICAgdGhpcy5DYXB0aW9uID0gW107XG4gICAgICB0aGlzLmFmdGVyVXBsb2FkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9ybWF0c0FsbG93ZWRMaXN0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmZvcm1hdHNBbGxvd2VkTGlzdCA9IHRoaXMuZm9ybWF0c0FsbG93ZWQuc3BsaXQoJy4nKS5tYXAoeCA9PiB4LnNwbGl0KCcsJylbMF0udHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIGxldCBmaWxlTGlzdDogRmlsZUxpc3Q7XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkcm9wJykge1xuICAgICAgZmlsZUxpc3QgPSBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVMaXN0ID0gZXZlbnQudGFyZ2V0LmZpbGVzIHx8IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRGaWxlRXh0ID0gdGhpcy5yZWcuZXhlYyhmaWxlTGlzdFtpXS5uYW1lKVsxXTtcbiAgICAgIGNvbnN0IGN1cnJlbnRGaWxlRXh0TG93ZXIgPSBjdXJyZW50RmlsZUV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgZnJtdEFsbG93ZWQgPSB0aGlzLmZvcm1hdHNBbGxvd2VkTGlzdC5zb21lKHggPT4geCA9PT0gY3VycmVudEZpbGVFeHRMb3dlcik7XG5cbiAgICAgIGlmIChmcm10QWxsb3dlZCkge1xuICAgICAgICBpZiAoZmlsZUxpc3RbaV0uc2l6ZSA+IHRoaXMubWF4U2l6ZSAqIDEwMjQwMDApIHtcbiAgICAgICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnB1c2goe1xuICAgICAgICAgICAgZmlsZU5hbWU6IGZpbGVMaXN0W2ldLm5hbWUsXG4gICAgICAgICAgICBmaWxlU2l6ZTogdGhpcy5jb252ZXJ0U2l6ZShmaWxlTGlzdFtpXS5zaXplKSxcbiAgICAgICAgICAgIGVycm9yTXNnOiAnSW52YWxpZCBzaXplJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkRmlsZXMucHVzaChmaWxlTGlzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm90QWxsb3dlZExpc3QucHVzaCh7XG4gICAgICAgICAgZmlsZU5hbWU6IGZpbGVMaXN0W2ldLm5hbWUsXG4gICAgICAgICAgZmlsZVNpemU6IHRoaXMuY29udmVydFNpemUoZmlsZUxpc3RbaV0uc2l6ZSksXG4gICAgICAgICAgZXJyb3JNc2c6ICdJbnZhbGlkIGZvcm1hdCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IHRydWU7XG4gICAgICBpZiAodGhpcy50aGVtZSA9PT0gJ2F0dGFjaFBpbicpIHtcbiAgICAgICAgdGhpcy51cGxvYWRGaWxlcygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnVwbG9hZE1zZyA9IGZhbHNlO1xuICAgIHRoaXMudXBsb2FkQ2xpY2sgPSB0cnVlO1xuICAgIHRoaXMucGVyY2VudENvbXBsZXRlID0gMDtcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSBudWxsO1xuICB9XG5cbiAgdXBsb2FkRmlsZXMoKSB7XG4gICAgdGhpcy5wcm9ncmVzc0JhclNob3cgPSB0cnVlO1xuICAgIHRoaXMudXBsb2FkQ2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLm5vdEFsbG93ZWRMaXN0ID0gW107XG4gICAgbGV0IGlzRXJyb3IgPSBmYWxzZTtcblxuICAgIHRoaXMuc2luZ2xlRmlsZSA9IHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGggPD0gMTtcblxuICAgIHRoaXMuY3VycmVudFVwbG9hZHMgPSBbXTtcblxuICAgIGlmICh0aGlzLm9uZUZpbGVQZXJSZXF1ZXN0ICYmICF0aGlzLnNpbmdsZUZpbGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5mb3JFYWNoKChzZWxlY3RlZEZpbGUsIGlueCkgPT4ge1xuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgICAvLyBBZGQgZGF0YSB0byBiZSBzZW50IGluIHRoaXMgcmVxdWVzdFxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAgdGhpcy5DYXB0aW9uW2lueF0gfHwgdGhpcy5rZXksXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzW2lueF0sXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VXBsb2Fkcy5wdXNoKHt4aHI6IHhociwgZm9ybURhdGE6IGZvcm1EYXRhLCBpbnhzOiBbaW54XX0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgLy8gQWRkIGRhdGEgdG8gYmUgc2VudCBpbiB0aGlzIHJlcXVlc3RcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5mb3JFYWNoKChzZWxlY3RlZEZpbGUsIGlueCkgPT4ge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAgdGhpcy5DYXB0aW9uW2lueF0gfHwgdGhpcy5rZXkgKyAodGhpcy5zaW5nbGVGaWxlID8gJycgOiBpbngpLFxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlc1tpbnhdLFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY3VycmVudFVwbG9hZHMucHVzaCh7eGhyOiB4aHIsIGZvcm1EYXRhOiBmb3JtRGF0YSwgaW54czogdGhpcy5zZWxlY3RlZEZpbGVzLm1hcCgoc2VsZWN0ZWRGaWxlLCBpbngpID0+IGlueCl9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0b3RhbFVwbG9hZHMgPSB0aGlzLmN1cnJlbnRVcGxvYWRzLmxlbmd0aDtcblxuICAgIHRoaXMuY3VycmVudFVwbG9hZHMuZm9yRWFjaCgodXBsb2FkOiBVcGxvYWRJbmZvLCB1cGxvYWRJbngpID0+IHtcbiAgICAgIGNvbnN0IHhociA9IHVwbG9hZC54aHI7XG5cbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBldm50ID0+IHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCAmJiB4aHIuc3RhdHVzICE9PSAyMDEpIHtcbiAgICAgICAgICAgIGlzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0JhclNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZE1zZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFmdGVyVXBsb2FkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTXNnVGV4dCA9IHRoaXMucmVwbGFjZVRleHRzLmFmdGVyVXBsb2FkTXNnX2Vycm9yO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRNc2dDbGFzcyA9ICd0ZXh0LWRhbmdlciBsZWFkJztcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5BcGlSZXNwb25zZS5lbWl0KHhocik7XG4gICAgICAgICAgaWYgKHVwbG9hZElueCArIDEgPT09IHRvdGFsVXBsb2Fkcykge1xuICAgICAgICAgICAgdGhpcy5ldmVyeXRoaW5nRG9uZS5lbWl0KHRoaXMuY3VycmVudFVwbG9hZHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gZXZudCA9PiB7XG4gICAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7IC8vIGJ1dHRvbiBzaG91bGQgYmUgZGlzYWJsZWQgYnkgcHJvY2VzcyB1cGxvYWRpbmdcbiAgICAgICAgaWYgKGV2bnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnREb25lID0gKGV2bnQubG9hZGVkIC8gZXZudC50b3RhbCk7XG4gICAgICAgICAgdGhpcy5wZXJjZW50Q29tcGxldGUgPSBNYXRoLnJvdW5kKCh1cGxvYWRJbnggKyBjdXJyZW50RG9uZSkgKiAxMDAgLyB0b3RhbFVwbG9hZHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB4aHIub25sb2FkID0gZXZudCA9PiB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBsb2FkTXNnID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IHRydWU7XG4gICAgICAgIGlmICghaXNFcnJvcikge1xuICAgICAgICAgIGlmICh1cGxvYWRJbnggKyAxID09PSB0b3RhbFVwbG9hZHMpIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTXNnVGV4dCA9IHRoaXMucmVwbGFjZVRleHRzLmFmdGVyVXBsb2FkTXNnX3N1Y2Nlc3M7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZE1zZ0NsYXNzID0gJ3RleHQtc3VjY2VzcyBsZWFkJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dFVwbG9hZCA9IHRoaXMuY3VycmVudFVwbG9hZHNbdXBsb2FkSW54ICsgMV07XG4gICAgICAgICAgICBuZXh0VXBsb2FkLnhoci5zZW5kKG5leHRVcGxvYWQuZm9ybURhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBlcmNlbnRDb21wbGV0ZSA9IE1hdGgucm91bmQoKHVwbG9hZElueCArIDEpICogMTAwIC8gdG90YWxVcGxvYWRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXBsb2FkQVBJLCB0cnVlKTtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuaGVhZGVycykpIHtcbiAgICAgICAgLy8gT2JqZWN0LmtleXMgd2lsbCBnaXZlIGFuIEFycmF5IG9mIGtleXNcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCB0aGlzLmhlYWRlcnNba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIGNvbnN0IGZpcnN0VXBsb2FkID0gdGhpcy5jdXJyZW50VXBsb2Fkc1swXTtcbiAgICBmaXJzdFVwbG9hZC54aHIuc2VuZChmaXJzdFVwbG9hZC5mb3JtRGF0YSk7XG4gIH1cblxuICByZW1vdmVGaWxlKGk6IGFueSwgc2ZfbmE6IGFueSkge1xuICAgIGlmIChzZl9uYSA9PT0gJ3NmJykge1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzLnNwbGljZShpLCAxKTtcbiAgICAgIHRoaXMuQ2FwdGlvbi5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm90QWxsb3dlZExpc3Quc3BsaWNlKGksIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnRTaXplKGZpbGVTaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlU2l6ZSA8IDEwMjQwMDBcbiAgICAgID8gKGZpbGVTaXplIC8gMTAyNCkudG9GaXhlZCgyKSArICcgS0InXG4gICAgICA6IChmaWxlU2l6ZSAvIDEwMjQwMDApLnRvRml4ZWQoMikgKyAnIE1CJztcbiAgfVxuXG4gIGF0dGFjaHBpbk9uY2xpY2soKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWwnICsgdGhpcy5pZCk7XG4gICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgIGVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG4gIH1cblxuICBkcm9wKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMub25DaGFuZ2UoZXZlbnQpO1xuICB9XG5cbiAgYWxsb3dEcm9wKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICB9XG59XG4iXX0=