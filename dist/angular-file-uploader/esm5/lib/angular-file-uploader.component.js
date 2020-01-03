/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var AngularFileUploaderComponent = /** @class */ (function () {
    function AngularFileUploaderComponent() {
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
    AngularFileUploaderComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
            var defaultReplaceTextsValues = {
                selectFileBtn: this.multiple ? 'Select Files' : 'Select File',
                resetBtn: 'Reset',
                uploadBtn: 'Upload',
                dragNDropBox: 'Drag N Drop',
                attachPinBtn: this.multiple ? 'Attach Files...' : 'Attach File...',
                afterUploadMsg_success: 'Successfully Uploaded !',
                afterUploadMsg_error: 'Upload Failed !',
            };
            if (this.config.replaceTexts) {
                this.replaceTexts = tslib_1.__assign({}, defaultReplaceTextsValues, this.config.replaceTexts);
            }
            else {
                this.replaceTexts = tslib_1.__assign({}, defaultReplaceTextsValues);
            }
        }
        if (changes.resetUpload) {
            if (changes.resetUpload.currentValue === true) {
                this.resetFileUpload();
            }
        }
    };
    /**
     * @return {?}
     */
    AngularFileUploaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    AngularFileUploaderComponent.prototype.resetFileUpload = /**
     * @return {?}
     */
    function () {
        this.selectedFiles = [];
        this.Caption = [];
        this.notAllowedList = [];
        this.uploadMsg = false;
        this.uploadBtn = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AngularFileUploaderComponent.prototype.onChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.notAllowedList = [];
        if (this.afterUpload || !this.multiple) {
            this.selectedFiles = [];
            this.Caption = [];
            this.afterUpload = false;
        }
        if (this.formatsAllowedList === null) {
            this.formatsAllowedList = this.formatsAllowed.split('.').map(function (x) { return x.split(',')[0].trim().toLowerCase(); });
        }
        /** @type {?} */
        var fileList;
        if (event.type === 'drop') {
            fileList = event.dataTransfer.files;
        }
        else {
            fileList = event.target.files || event.srcElement.files;
        }
        var _loop_1 = function (i) {
            /** @type {?} */
            var currentFileExt = this_1.reg.exec(fileList[i].name)[1];
            /** @type {?} */
            var currentFileExtLower = currentFileExt.toLowerCase();
            /** @type {?} */
            var frmtAllowed = this_1.formatsAllowedList.some(function (x) { return x === currentFileExtLower; });
            if (frmtAllowed) {
                if (fileList[i].size > this_1.maxSize * 1024000) {
                    this_1.notAllowedList.push({
                        fileName: fileList[i].name,
                        fileSize: this_1.convertSize(fileList[i].size),
                        errorMsg: 'Invalid size',
                    });
                }
                else {
                    this_1.selectedFiles.push(fileList[i]);
                }
            }
            else {
                this_1.notAllowedList.push({
                    fileName: fileList[i].name,
                    fileSize: this_1.convertSize(fileList[i].size),
                    errorMsg: 'Invalid format',
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < fileList.length; i++) {
            _loop_1(i);
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
    };
    /**
     * @return {?}
     */
    AngularFileUploaderComponent.prototype.uploadFiles = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.progressBarShow = true;
        this.uploadClick = false;
        this.notAllowedList = [];
        /** @type {?} */
        var isError = false;
        this.singleFile = this.selectedFiles.length <= 1;
        this.currentUploads = [];
        if (this.oneFilePerRequest && !this.singleFile) {
            this.selectedFiles.forEach(function (selectedFile, inx) {
                /** @type {?} */
                var xhr = new XMLHttpRequest();
                /** @type {?} */
                var formData = new FormData();
                // Add data to be sent in this request
                formData.append(_this.Caption[inx] || _this.key, _this.selectedFiles[inx]);
                _this.currentUploads.push({ xhr: xhr, formData: formData, inxs: [inx] });
            });
        }
        else {
            /** @type {?} */
            var xhr = new XMLHttpRequest();
            /** @type {?} */
            var formData_1 = new FormData();
            // Add data to be sent in this request
            this.selectedFiles.forEach(function (selectedFile, inx) {
                formData_1.append(_this.Caption[inx] || _this.key + (_this.singleFile ? '' : inx), _this.selectedFiles[inx]);
            });
            this.currentUploads.push({ xhr: xhr, formData: formData_1, inxs: this.selectedFiles.map(function (selectedFile, inx) { return inx; }) });
        }
        /** @type {?} */
        var totalUploads = this.currentUploads.length;
        this.currentUploads.forEach(function (upload, uploadInx) {
            /** @type {?} */
            var xhr = upload.xhr;
            xhr.onreadystatechange = function (evnt) {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200 && xhr.status !== 201) {
                        isError = true;
                        _this.progressBarShow = false;
                        _this.uploadBtn = false;
                        _this.uploadMsg = true;
                        _this.afterUpload = true;
                        _this.uploadMsgText = _this.replaceTexts.afterUploadMsg_error;
                        _this.uploadMsgClass = 'text-danger lead';
                    }
                    _this.ApiResponse.emit(xhr);
                    if (uploadInx + 1 === totalUploads) {
                        _this.everythingDone.emit(_this.currentUploads);
                    }
                }
            };
            xhr.upload.onprogress = function (evnt) {
                _this.uploadBtn = false; // button should be disabled by process uploading
                if (evnt.lengthComputable) {
                    /** @type {?} */
                    var currentDone = (evnt.loaded / evnt.total);
                    _this.percentComplete = Math.round((uploadInx + currentDone) * 100 / totalUploads);
                }
            };
            xhr.onload = function (evnt) {
                _this.progressBarShow = false;
                _this.uploadBtn = false;
                _this.uploadMsg = true;
                _this.afterUpload = true;
                if (!isError) {
                    if (uploadInx + 1 === totalUploads) {
                        _this.uploadMsgText = _this.replaceTexts.afterUploadMsg_success;
                        _this.uploadMsgClass = 'text-success lead';
                    }
                    else {
                        /** @type {?} */
                        var nextUpload = _this.currentUploads[uploadInx + 1];
                        nextUpload.xhr.send(nextUpload.formData);
                    }
                    _this.percentComplete = Math.round((uploadInx + 1) * 100 / totalUploads);
                }
            };
            xhr.open(_this.method, _this.uploadAPI, true);
            try {
                for (var _a = tslib_1.__values(Object.keys(_this.headers)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var key = _b.value;
                    // Object.keys will give an Array of keys
                    xhr.setRequestHeader(key, _this.headers[key]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _c;
        });
        /** @type {?} */
        var firstUpload = this.currentUploads[0];
        firstUpload.xhr.send(firstUpload.formData);
    };
    /**
     * @param {?} i
     * @param {?} sf_na
     * @return {?}
     */
    AngularFileUploaderComponent.prototype.removeFile = /**
     * @param {?} i
     * @param {?} sf_na
     * @return {?}
     */
    function (i, sf_na) {
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
    };
    /**
     * @param {?} fileSize
     * @return {?}
     */
    AngularFileUploaderComponent.prototype.convertSize = /**
     * @param {?} fileSize
     * @return {?}
     */
    function (fileSize) {
        return fileSize < 1024000
            ? (fileSize / 1024).toFixed(2) + ' KB'
            : (fileSize / 1024000).toFixed(2) + ' MB';
    };
    /**
     * @return {?}
     */
    AngularFileUploaderComponent.prototype.attachpinOnclick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = document.getElementById('sel' + this.id);
        if (element !== null) {
            element.click();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AngularFileUploaderComponent.prototype.drop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        event.preventDefault();
        this.onChange(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    AngularFileUploaderComponent.prototype.allowDrop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    };
    AngularFileUploaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'angular-file-uploader',
                    template: "<div class=\"container\" *ngIf=\"(theme !== 'attachPin')\" id=\"default\">\n\n    <!-- Drag n Drop theme Starts -->\n    <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\" [ngClass]=\"(hideSelectBtn && hideResetBtn) ? null : 'dragNDropBtmPad'\" class=\"dragNDrop\">\n        <div style=\"position:relative;\">\n            <div id=\"div1\" class=\"div1 afu-dragndrop-box\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\n                <p class=\"afu-dragndrop-text\">{{replaceTexts?.dragNDropBox}}</p>\n            </div>\n            <!-- <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span> -->\n        </div>\n    </div>\n    <!-- Drag n Drop theme Ends -->\n\n    <label for=\"sel{{id}}\" class=\"btn btn-primary btn-sm afu-select-btn\" *ngIf=\"!hideSelectBtn\">{{replaceTexts?.selectFileBtn}}</label>\n    <input type=\"file\" id=\"sel{{id}}\" style=\"display: none\" *ngIf=\"!hideSelectBtn\" (change)=\"onChange($event)\" title=\"Select file\"\n        name=\"files[]\" [accept]=formatsAllowed [attr.multiple]=\"multiple ? '' : null\" />\n    <button class=\"btn btn-info btn-sm resetBtn afu-reset-btn\" (click)=\"resetFileUpload()\" *ngIf=\"!hideResetBtn\">{{replaceTexts?.resetBtn}}</button>\n    <br *ngIf=\"!hideSelectBtn\">\n    <p class=\"constraints-info afu-constraints-info\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize *1024000))}}</p>\n    <!--Selected file list-->\n    <div class=\"row afu-valid-file\" *ngFor=\"let sf of selectedFiles;let i=index\" >\n        <p class=\"col-xs-3 textOverflow\"><span class=\"text-primary\">{{sf.name}}</span></p>\n        <p class=\"col-xs-3 padMarg sizeC\"><strong>({{convertSize(sf.size)}})</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n        <!--  <input class=\"col-xs-3 progress caption\"  type=\"text\"  placeholder=\"Caption..\"  [(ngModel)]=\"Caption[i]\"  *ngIf=\"uploadClick\"/> -->\n        <div class=\"progress col-xs-3 padMarg afu-progress-bar\" *ngIf=\"singleFile && progressBarShow && !hideProgressBar\">\n            <span class=\"progress-bar progress-bar-success\" role=\"progressbar\" [ngStyle]=\"{'width':percentComplete+'%'}\">{{percentComplete}}%</span>\n        </div>\n        <a class=\"col-xs-1\" role=\"button\" (click)=\"removeFile(i,'sf')\" *ngIf=\"uploadClick\"><i class=\"fa fa-times\"></i></a>\n    </div>\n    <!--Invalid file list-->\n    <div class=\"row text-danger afu-invalid-file\" *ngFor=\"let na of notAllowedList;let j=index\">\n        <p class=\"col-xs-3 textOverflow\"><span>{{na['fileName']}}</span></p>\n        <p class=\"col-xs-3 padMarg sizeC\"><strong>({{na['fileSize']}})</strong></p>\n        <p class=\"col-xs-3 \">{{na['errorMsg']}}</p>\n        <a class=\"col-xs-1 delFileIcon\" role=\"button\" (click)=\"removeFile(j,'na')\" *ngIf=\"uploadClick\">&nbsp;<i class=\"fa fa-times\"></i></a>\n    </div>\n\n    <p *ngIf=\"uploadMsg\" class=\"{{uploadMsgClass}} + afu-upload-status\">{{uploadMsgText}}<p>\n    <div *ngIf=\"!singleFile && progressBarShow && !hideProgressBar\">\n        <div class=\"progress col-xs-4 padMarg afu-progress-bar\">\n            <span class=\"progress-bar progress-bar-success\" role=\"progressbar\" [ngStyle]=\"{'width':percentComplete+'%'}\">{{percentComplete}}%</span>\n        </div>\n        <br>\n        <br>\n    </div>\n    <button class=\"btn btn-success afu-upload-btn\" type=\"button\" (click)=\"uploadFiles()\" [disabled]=!uploadBtn>{{replaceTexts?.uploadBtn}}</button>\n    <br>\n</div>\n\n<!--/////////////////////////// ATTACH PIN THEME  //////////////////////////////////////////////////////////-->\n<div *ngIf=\"theme == 'attachPin'\" id=\"attachPin\">\n    <div style=\"position:relative;padding-left:6px\">\n        <a class='btn up_btn afu-attach-pin' (click)=\"attachpinOnclick()\">\n          {{replaceTexts?.attachPinBtn}}\n            <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            <!-- <p style=\"margin-top:10px\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize * 1024000))}}</p> -->\n            <input type=\"file\" id=\"sel{{id}}\" (change)=\"onChange($event)\" style=\"display: none\" title=\"Select file\" name=\"files[]\" [accept]=formatsAllowed\n                [attr.multiple]=\"multiple ? '' : null\" />\n            <br>\n        </a>\n        &nbsp;\n        <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span>\n    </div>\n</div>\n\n<!--/////////////////////////// DRAG N DROP THEME  //////////////////////////////////////////////////////////-->\n<!-- <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\">\n  <div style=\"position:relative;padding-left:6px\">\n    <div id=\"div1\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\n      <p>Drag N Drop</p>\n    </div>\n    <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span>\n  </div>\n</div> -->\n",
                    styles: [".constraints-info{margin-top:10px;font-style:italic}.padMarg{padding:0;margin-bottom:0}.caption{margin-right:5px}.textOverflow{white-space:nowrap;padding-right:0;overflow:hidden;text-overflow:ellipsis}.up_btn{color:#000;background-color:transparent;border:2px solid #5c5b5b;border-radius:22px}.delFileIcon{text-decoration:none;color:#ce0909}.dragNDrop .div1{display:border-box;border:2px dashed #5c5b5b;height:6rem;width:20rem}.dragNDrop .div1>p{text-align:center;font-weight:700;color:#5c5b5b;margin-top:1.4em}.dragNDropBtmPad{padding-bottom:2rem}@media screen and (max-width:620px){.caption{padding:0}}@media screen and (max-width:510px){.sizeC{width:25%}}@media screen and (max-width:260px){.caption,.sizeC{font-size:10px}}.resetBtn{margin-left:3px}"],
                },] },
    ];
    AngularFileUploaderComponent.ctorParameters = function () { return []; };
    AngularFileUploaderComponent.propDecorators = {
        config: [{ type: Input }],
        resetUpload: [{ type: Input }],
        ApiResponse: [{ type: Output }],
        everythingDone: [{ type: Output }]
    };
    return AngularFileUploaderComponent;
}());
export { AngularFileUploaderComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS11cGxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9hbmd1bGFyLWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7O0FBRXpHLGtDQVFDOzs7SUFQQyxxQ0FBc0I7O0lBQ3RCLGdDQUFpQjs7SUFDakIsaUNBQWtCOztJQUNsQixvQ0FBcUI7O0lBQ3JCLG9DQUFxQjs7SUFDckIsOENBQStCOztJQUMvQiw0Q0FBNkI7Ozs7O0FBRy9CLCtDQWNDOzs7SUFiQyw4Q0FBaUY7O0lBRWpGLDBDQUFlOztJQUNmLHVDQUFZOztJQUNaLG9EQUEwQjs7SUFDMUIsaURBQXVCOztJQUN2QixrREFBd0I7O0lBQ3hCLDRDQUFpQjs7SUFDakIsbURBQXdCOztJQUN4Qiw2Q0FBbUI7O0lBQ25CLHNEQUE0Qjs7SUFDNUIsd0NBQWE7O0lBQ2IsaURBQTRCOzs7OztBQUc5QixnQ0FJQzs7O0lBSEMseUJBQW9COztJQUNwQiw4QkFBbUI7O0lBQ25CLDBCQUFlOztBQUdqQjtJQTRIRTtRQXhDQSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUdwQixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFHakMsbUJBQWMsR0FBK0IsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFTOUUsdUJBQWtCLEdBQWEsSUFBSSxDQUFDO1FBT3BDLFFBQUcsR0FBVyxpQkFBaUIsQ0FBQztRQUNoQyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQixtQkFBYyxHQUFnRSxFQUFFLENBQUM7UUFDakYsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLG9CQUFlLEdBQUcsS0FB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QixpREFBa0I7O0lBQ2xCLG1EQUFvQjs7SUFDcEIsbURBQW1COztJQUNuQixxREFBc0I7O0lBQ3RCLHNEQUF1Qjs7SUFDdkIsdURBQXdCOztJQUN4QixvREFBYTs7SUFDYixzREFBa0M7O0lBRWxDLDhDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcGxhY2VUZXh0cyB7XG4gIHNlbGVjdEZpbGVCdG46IHN0cmluZztcbiAgcmVzZXRCdG46IHN0cmluZztcbiAgdXBsb2FkQnRuOiBzdHJpbmc7XG4gIGRyYWdORHJvcEJveDogc3RyaW5nO1xuICBhdHRhY2hQaW5CdG46IHN0cmluZztcbiAgYWZ0ZXJVcGxvYWRNc2dfc3VjY2Vzczogc3RyaW5nO1xuICBhZnRlclVwbG9hZE1zZ19lcnJvcjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFuZ3VsYXJGaWxlVXBsb2FkZXJDb25maWcge1xuICB1cGxvYWRBUEk6IHsgdXJsOiBzdHJpbmc7IG1ldGhvZD86IHN0cmluZzsgaGVhZGVycz86IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfTsgfTtcblxuICB0aGVtZT86IHN0cmluZztcbiAgaWQ/OiBudW1iZXI7XG4gIGhpZGVQcm9ncmVzc0Jhcj86IGJvb2xlYW47XG4gIGhpZGVSZXNldEJ0bj86IGJvb2xlYW47XG4gIGhpZGVTZWxlY3RCdG4/OiBib29sZWFuO1xuICBtYXhTaXplPzogbnVtYmVyO1xuICBmb3JtYXRzQWxsb3dlZD86IHN0cmluZztcbiAgbXVsdGlwbGU/OiBib29sZWFuO1xuICBvbmVGaWxlUGVyUmVxdWVzdD86IGJvb2xlYW47XG4gIGtleT86IHN0cmluZztcbiAgcmVwbGFjZVRleHRzPzogUmVwbGFjZVRleHRzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwbG9hZEluZm8ge1xuICB4aHI6IFhNTEh0dHBSZXF1ZXN0O1xuICBmb3JtRGF0YTogRm9ybURhdGE7XG4gIGlueHM6IG51bWJlcltdO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbmd1bGFyLWZpbGUtdXBsb2FkZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXJcIiAqbmdJZj1cIih0aGVtZSAhPT0gJ2F0dGFjaFBpbicpXCIgaWQ9XCJkZWZhdWx0XCI+XG5cbiAgICA8IS0tIERyYWcgbiBEcm9wIHRoZW1lIFN0YXJ0cyAtLT5cbiAgICA8ZGl2ICpuZ0lmPVwidGhlbWUgPT0gJ2RyYWdORHJvcCdcIiBpZD1cImRyYWdORHJvcFwiIFtuZ0NsYXNzXT1cIihoaWRlU2VsZWN0QnRuICYmIGhpZGVSZXNldEJ0bikgPyBudWxsIDogJ2RyYWdORHJvcEJ0bVBhZCdcIiBjbGFzcz1cImRyYWdORHJvcFwiPlxuICAgICAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7XCI+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiZGl2MVwiIGNsYXNzPVwiZGl2MSBhZnUtZHJhZ25kcm9wLWJveFwiIChkcm9wKT1cImRyb3AoJGV2ZW50KVwiIChkcmFnb3Zlcik9XCJhbGxvd0Ryb3AoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiYWZ1LWRyYWduZHJvcC10ZXh0XCI+e3tyZXBsYWNlVGV4dHM/LmRyYWdORHJvcEJveH19PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8IS0tIDxzcGFuIGNsYXNzPSdsYWJlbCBsYWJlbC1pbmZvJyBpZD1cInVwbG9hZC1maWxlLWluZm97e2lkfX1cIj57e3NlbGVjdGVkRmlsZXNbMF0/Lm5hbWV9fTwvc3Bhbj4gLS0+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gRHJhZyBuIERyb3AgdGhlbWUgRW5kcyAtLT5cblxuICAgIDxsYWJlbCBmb3I9XCJzZWx7e2lkfX1cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tc20gYWZ1LXNlbGVjdC1idG5cIiAqbmdJZj1cIiFoaWRlU2VsZWN0QnRuXCI+e3tyZXBsYWNlVGV4dHM/LnNlbGVjdEZpbGVCdG59fTwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJzZWx7e2lkfX1cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiAqbmdJZj1cIiFoaWRlU2VsZWN0QnRuXCIgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgdGl0bGU9XCJTZWxlY3QgZmlsZVwiXG4gICAgICAgIG5hbWU9XCJmaWxlc1tdXCIgW2FjY2VwdF09Zm9ybWF0c0FsbG93ZWQgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGUgPyAnJyA6IG51bGxcIiAvPlxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWluZm8gYnRuLXNtIHJlc2V0QnRuIGFmdS1yZXNldC1idG5cIiAoY2xpY2spPVwicmVzZXRGaWxlVXBsb2FkKClcIiAqbmdJZj1cIiFoaWRlUmVzZXRCdG5cIj57e3JlcGxhY2VUZXh0cz8ucmVzZXRCdG59fTwvYnV0dG9uPlxuICAgIDxiciAqbmdJZj1cIiFoaWRlU2VsZWN0QnRuXCI+XG4gICAgPHAgY2xhc3M9XCJjb25zdHJhaW50cy1pbmZvIGFmdS1jb25zdHJhaW50cy1pbmZvXCI+KHt7Zm9ybWF0c0FsbG93ZWR9fSkgU2l6ZSBsaW1pdC0ge3soY29udmVydFNpemUobWF4U2l6ZSAqMTAyNDAwMCkpfX08L3A+XG4gICAgPCEtLVNlbGVjdGVkIGZpbGUgbGlzdC0tPlxuICAgIDxkaXYgY2xhc3M9XCJyb3cgYWZ1LXZhbGlkLWZpbGVcIiAqbmdGb3I9XCJsZXQgc2Ygb2Ygc2VsZWN0ZWRGaWxlcztsZXQgaT1pbmRleFwiID5cbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyB0ZXh0T3ZlcmZsb3dcIj48c3BhbiBjbGFzcz1cInRleHQtcHJpbWFyeVwiPnt7c2YubmFtZX19PC9zcGFuPjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyBwYWRNYXJnIHNpemVDXCI+PHN0cm9uZz4oe3tjb252ZXJ0U2l6ZShzZi5zaXplKX19KTwvc3Ryb25nPiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzwvcD5cbiAgICAgICAgPCEtLSAgPGlucHV0IGNsYXNzPVwiY29sLXhzLTMgcHJvZ3Jlc3MgY2FwdGlvblwiICB0eXBlPVwidGV4dFwiICBwbGFjZWhvbGRlcj1cIkNhcHRpb24uLlwiICBbKG5nTW9kZWwpXT1cIkNhcHRpb25baV1cIiAgKm5nSWY9XCJ1cGxvYWRDbGlja1wiLz4gLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcyBjb2wteHMtMyBwYWRNYXJnIGFmdS1wcm9ncmVzcy1iYXJcIiAqbmdJZj1cInNpbmdsZUZpbGUgJiYgcHJvZ3Jlc3NCYXJTaG93ICYmICFoaWRlUHJvZ3Jlc3NCYXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci1zdWNjZXNzXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6cGVyY2VudENvbXBsZXRlKyclJ31cIj57e3BlcmNlbnRDb21wbGV0ZX19JTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxhIGNsYXNzPVwiY29sLXhzLTFcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInJlbW92ZUZpbGUoaSwnc2YnKVwiICpuZ0lmPVwidXBsb2FkQ2xpY2tcIj48aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvYT5cbiAgICA8L2Rpdj5cbiAgICA8IS0tSW52YWxpZCBmaWxlIGxpc3QtLT5cbiAgICA8ZGl2IGNsYXNzPVwicm93IHRleHQtZGFuZ2VyIGFmdS1pbnZhbGlkLWZpbGVcIiAqbmdGb3I9XCJsZXQgbmEgb2Ygbm90QWxsb3dlZExpc3Q7bGV0IGo9aW5kZXhcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyB0ZXh0T3ZlcmZsb3dcIj48c3Bhbj57e25hWydmaWxlTmFtZSddfX08L3NwYW4+PC9wPlxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHBhZE1hcmcgc2l6ZUNcIj48c3Ryb25nPih7e25hWydmaWxlU2l6ZSddfX0pPC9zdHJvbmc+PC9wPlxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIFwiPnt7bmFbJ2Vycm9yTXNnJ119fTwvcD5cbiAgICAgICAgPGEgY2xhc3M9XCJjb2wteHMtMSBkZWxGaWxlSWNvblwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicmVtb3ZlRmlsZShqLCduYScpXCIgKm5nSWY9XCJ1cGxvYWRDbGlja1wiPiZuYnNwOzxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9hPlxuICAgIDwvZGl2PlxuXG4gICAgPHAgKm5nSWY9XCJ1cGxvYWRNc2dcIiBjbGFzcz1cInt7dXBsb2FkTXNnQ2xhc3N9fSArIGFmdS11cGxvYWQtc3RhdHVzXCI+e3t1cGxvYWRNc2dUZXh0fX08cD5cbiAgICA8ZGl2ICpuZ0lmPVwiIXNpbmdsZUZpbGUgJiYgcHJvZ3Jlc3NCYXJTaG93ICYmICFoaWRlUHJvZ3Jlc3NCYXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzIGNvbC14cy00IHBhZE1hcmcgYWZ1LXByb2dyZXNzLWJhclwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXN1Y2Nlc3NcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzpwZXJjZW50Q29tcGxldGUrJyUnfVwiPnt7cGVyY2VudENvbXBsZXRlfX0lPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8YnI+XG4gICAgPC9kaXY+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBhZnUtdXBsb2FkLWJ0blwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwidXBsb2FkRmlsZXMoKVwiIFtkaXNhYmxlZF09IXVwbG9hZEJ0bj57e3JlcGxhY2VUZXh0cz8udXBsb2FkQnRufX08L2J1dHRvbj5cbiAgICA8YnI+XG48L2Rpdj5cblxuPCEtLS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBBVFRBQ0ggUElOIFRIRU1FICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLS0+XG48ZGl2ICpuZ0lmPVwidGhlbWUgPT0gJ2F0dGFjaFBpbidcIiBpZD1cImF0dGFjaFBpblwiPlxuICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6NnB4XCI+XG4gICAgICAgIDxhIGNsYXNzPSdidG4gdXBfYnRuIGFmdS1hdHRhY2gtcGluJyAoY2xpY2spPVwiYXR0YWNocGluT25jbGljaygpXCI+XG4gICAgICAgICAge3tyZXBsYWNlVGV4dHM/LmF0dGFjaFBpbkJ0bn19XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBhcGVyY2xpcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDwhLS0gPHAgc3R5bGU9XCJtYXJnaW4tdG9wOjEwcHhcIj4oe3tmb3JtYXRzQWxsb3dlZH19KSBTaXplIGxpbWl0LSB7eyhjb252ZXJ0U2l6ZShtYXhTaXplICogMTAyNDAwMCkpfX08L3A+IC0tPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJzZWx7e2lkfX1cIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiB0aXRsZT1cIlNlbGVjdCBmaWxlXCIgbmFtZT1cImZpbGVzW11cIiBbYWNjZXB0XT1mb3JtYXRzQWxsb3dlZFxuICAgICAgICAgICAgICAgIFthdHRyLm11bHRpcGxlXT1cIm11bHRpcGxlID8gJycgOiBudWxsXCIgLz5cbiAgICAgICAgICAgIDxicj5cbiAgICAgICAgPC9hPlxuICAgICAgICAmbmJzcDtcbiAgICAgICAgPHNwYW4gY2xhc3M9J2xhYmVsIGxhYmVsLWluZm8nIGlkPVwidXBsb2FkLWZpbGUtaW5mb3t7aWR9fVwiPnt7c2VsZWN0ZWRGaWxlc1swXT8ubmFtZX19PC9zcGFuPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gRFJBRyBOIERST1AgVEhFTUUgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8tLT5cbjwhLS0gPGRpdiAqbmdJZj1cInRoZW1lID09ICdkcmFnTkRyb3AnXCIgaWQ9XCJkcmFnTkRyb3BcIj5cbiAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctbGVmdDo2cHhcIj5cbiAgICA8ZGl2IGlkPVwiZGl2MVwiIChkcm9wKT1cImRyb3AoJGV2ZW50KVwiIChkcmFnb3Zlcik9XCJhbGxvd0Ryb3AoJGV2ZW50KVwiPlxuICAgICAgPHA+RHJhZyBOIERyb3A8L3A+XG4gICAgPC9kaXY+XG4gICAgPHNwYW4gY2xhc3M9J2xhYmVsIGxhYmVsLWluZm8nIGlkPVwidXBsb2FkLWZpbGUtaW5mb3t7aWR9fVwiPnt7c2VsZWN0ZWRGaWxlc1swXT8ubmFtZX19PC9zcGFuPlxuICA8L2Rpdj5cbjwvZGl2PiAtLT5cbmAsXG4gIHN0eWxlczogW2AuY29uc3RyYWludHMtaW5mb3ttYXJnaW4tdG9wOjEwcHg7Zm9udC1zdHlsZTppdGFsaWN9LnBhZE1hcmd7cGFkZGluZzowO21hcmdpbi1ib3R0b206MH0uY2FwdGlvbnttYXJnaW4tcmlnaHQ6NXB4fS50ZXh0T3ZlcmZsb3d7d2hpdGUtc3BhY2U6bm93cmFwO3BhZGRpbmctcmlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpc30udXBfYnRue2NvbG9yOiMwMDA7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MnB4IHNvbGlkICM1YzViNWI7Ym9yZGVyLXJhZGl1czoyMnB4fS5kZWxGaWxlSWNvbnt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjojY2UwOTA5fS5kcmFnTkRyb3AgLmRpdjF7ZGlzcGxheTpib3JkZXItYm94O2JvcmRlcjoycHggZGFzaGVkICM1YzViNWI7aGVpZ2h0OjZyZW07d2lkdGg6MjByZW19LmRyYWdORHJvcCAuZGl2MT5we3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjojNWM1YjViO21hcmdpbi10b3A6MS40ZW19LmRyYWdORHJvcEJ0bVBhZHtwYWRkaW5nLWJvdHRvbToycmVtfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NjIwcHgpey5jYXB0aW9ue3BhZGRpbmc6MH19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo1MTBweCl7LnNpemVDe3dpZHRoOjI1JX19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDoyNjBweCl7LmNhcHRpb24sLnNpemVDe2ZvbnQtc2l6ZToxMHB4fX0ucmVzZXRCdG57bWFyZ2luLWxlZnQ6M3B4fWBdLFxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKVxuICBjb25maWc6IEFuZ3VsYXJGaWxlVXBsb2FkZXJDb25maWc7XG5cbiAgQElucHV0KClcbiAgcmVzZXRVcGxvYWQgPSBmYWxzZTtcblxuICBAT3V0cHV0KClcbiAgQXBpUmVzcG9uc2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIGV2ZXJ5dGhpbmdEb25lOiBFdmVudEVtaXR0ZXI8VXBsb2FkSW5mb1tdPiA9IG5ldyBFdmVudEVtaXR0ZXI8VXBsb2FkSW5mb1tdPigpO1xuXG4gIHRoZW1lOiBzdHJpbmc7XG4gIGlkOiBudW1iZXI7XG4gIGhpZGVQcm9ncmVzc0JhcjogYm9vbGVhbjtcbiAgbWF4U2l6ZTogbnVtYmVyO1xuICB1cGxvYWRBUEk6IHN0cmluZztcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIGZvcm1hdHNBbGxvd2VkOiBzdHJpbmc7XG4gIGZvcm1hdHNBbGxvd2VkTGlzdDogc3RyaW5nW10gPSBudWxsO1xuICBtdWx0aXBsZTogYm9vbGVhbjtcbiAgaGVhZGVyczogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9O1xuICBoaWRlUmVzZXRCdG46IGJvb2xlYW47XG4gIGhpZGVTZWxlY3RCdG46IGJvb2xlYW47XG4gIG9uZUZpbGVQZXJSZXF1ZXN0OiBib29sZWFuO1xuICBrZXk6IHN0cmluZztcbiAgcmVnOiBSZWdFeHAgPSAvKD86XFwuKFteLl0rKSk/JC87XG4gIHNlbGVjdGVkRmlsZXM6IEZpbGVbXSA9IFtdO1xuICBub3RBbGxvd2VkTGlzdDogeyBmaWxlTmFtZTogc3RyaW5nOyBmaWxlU2l6ZTogc3RyaW5nOyBlcnJvck1zZzogc3RyaW5nOyB9W10gPSBbXTtcbiAgQ2FwdGlvbjogc3RyaW5nW10gPSBbXTtcbiAgc2luZ2xlRmlsZSA9IHRydWU7XG4gIHByb2dyZXNzQmFyU2hvdyA9IGZhbHNlO1xuICB1cGxvYWRCdG4gPSBmYWxzZTtcbiAgdXBsb2FkTXNnID0gZmFsc2U7XG4gIGFmdGVyVXBsb2FkID0gZmFsc2U7XG4gIHVwbG9hZENsaWNrID0gdHJ1ZTtcbiAgdXBsb2FkTXNnVGV4dDogc3RyaW5nO1xuICB1cGxvYWRNc2dDbGFzczogc3RyaW5nO1xuICBwZXJjZW50Q29tcGxldGU6IG51bWJlcjtcbiAgcmVwbGFjZVRleHRzO1xuICBjdXJyZW50VXBsb2FkczogVXBsb2FkSW5mb1tdID0gW107XG5cbiAgcHJpdmF0ZSBpZERhdGU6IG51bWJlciA9ICtuZXcgRGF0ZSgpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZykge1xuICAgICAgdGhpcy50aGVtZSA9IHRoaXMuY29uZmlnLnRoZW1lIHx8ICcnO1xuICAgICAgdGhpcy5pZCA9XG4gICAgICAgIHRoaXMuY29uZmlnLmlkIHx8XG4gICAgICAgIHBhcnNlSW50KCh0aGlzLmlkRGF0ZSAvIDEwMDAwKS50b1N0cmluZygpLnNwbGl0KCcuJylbMV0sIDEwKSArXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwKSAqIDEwMDAwO1xuICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3NCYXIgPSB0aGlzLmNvbmZpZy5oaWRlUHJvZ3Jlc3NCYXIgfHwgZmFsc2U7XG4gICAgICB0aGlzLmhpZGVSZXNldEJ0biA9IHRoaXMuY29uZmlnLmhpZGVSZXNldEJ0biB8fCBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZVNlbGVjdEJ0biA9IHRoaXMuY29uZmlnLmhpZGVTZWxlY3RCdG4gfHwgZmFsc2U7XG4gICAgICB0aGlzLm1heFNpemUgPSB0aGlzLmNvbmZpZy5tYXhTaXplIHx8IDIwO1xuICAgICAgdGhpcy51cGxvYWRBUEkgPSB0aGlzLmNvbmZpZy51cGxvYWRBUEkudXJsO1xuICAgICAgdGhpcy5tZXRob2QgPSB0aGlzLmNvbmZpZy51cGxvYWRBUEkubWV0aG9kIHx8ICdQT1NUJztcbiAgICAgIHRoaXMuZm9ybWF0c0FsbG93ZWQgPVxuICAgICAgICB0aGlzLmNvbmZpZy5mb3JtYXRzQWxsb3dlZCB8fCAnLmpwZywucG5nLC5wZGYsLmRvY3gsLnR4dCwuZ2lmLC5qcGVnJztcbiAgICAgIHRoaXMuZm9ybWF0c0FsbG93ZWRMaXN0ID0gbnVsbDtcbiAgICAgIHRoaXMubXVsdGlwbGUgPSB0aGlzLmNvbmZpZy5tdWx0aXBsZSB8fCBmYWxzZTtcbiAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuY29uZmlnLnVwbG9hZEFQSS5oZWFkZXJzIHx8IHt9O1xuICAgICAgdGhpcy5vbmVGaWxlUGVyUmVxdWVzdCA9ICEhdGhpcy5jb25maWcub25lRmlsZVBlclJlcXVlc3Q7XG4gICAgICB0aGlzLmtleSA9IHRoaXMuY29uZmlnLmtleSB8fCAnZmlsZSc7XG4gICAgICBjb25zdCBkZWZhdWx0UmVwbGFjZVRleHRzVmFsdWVzOiBSZXBsYWNlVGV4dHMgPSB7XG4gICAgICAgIHNlbGVjdEZpbGVCdG46IHRoaXMubXVsdGlwbGUgPyAnU2VsZWN0IEZpbGVzJyA6ICdTZWxlY3QgRmlsZScsXG4gICAgICAgIHJlc2V0QnRuOiAnUmVzZXQnLFxuICAgICAgICB1cGxvYWRCdG46ICdVcGxvYWQnLFxuICAgICAgICBkcmFnTkRyb3BCb3g6ICdEcmFnIE4gRHJvcCcsXG4gICAgICAgIGF0dGFjaFBpbkJ0bjogdGhpcy5tdWx0aXBsZSA/ICdBdHRhY2ggRmlsZXMuLi4nIDogJ0F0dGFjaCBGaWxlLi4uJyxcbiAgICAgICAgYWZ0ZXJVcGxvYWRNc2dfc3VjY2VzczogJ1N1Y2Nlc3NmdWxseSBVcGxvYWRlZCAhJyxcbiAgICAgICAgYWZ0ZXJVcGxvYWRNc2dfZXJyb3I6ICdVcGxvYWQgRmFpbGVkICEnLFxuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5yZXBsYWNlVGV4dHMpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlVGV4dHMgPSB7XG4gICAgICAgICAgLi4uZGVmYXVsdFJlcGxhY2VUZXh0c1ZhbHVlcyxcbiAgICAgICAgICAuLi50aGlzLmNvbmZpZy5yZXBsYWNlVGV4dHMsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlcGxhY2VUZXh0cyA9IHsuLi5kZWZhdWx0UmVwbGFjZVRleHRzVmFsdWVzfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5yZXNldFVwbG9hZCkge1xuICAgICAgaWYgKGNoYW5nZXMucmVzZXRVcGxvYWQuY3VycmVudFZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMucmVzZXRGaWxlVXBsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgfVxuXG4gIHJlc2V0RmlsZVVwbG9hZCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBbXTtcbiAgICB0aGlzLkNhcHRpb24gPSBbXTtcbiAgICB0aGlzLm5vdEFsbG93ZWRMaXN0ID0gW107XG4gICAgdGhpcy51cGxvYWRNc2cgPSBmYWxzZTtcbiAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xuICB9XG5cbiAgb25DaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMubm90QWxsb3dlZExpc3QgPSBbXTtcbiAgICBpZiAodGhpcy5hZnRlclVwbG9hZCB8fCAhdGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gW107XG4gICAgICB0aGlzLkNhcHRpb24gPSBbXTtcbiAgICAgIHRoaXMuYWZ0ZXJVcGxvYWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mb3JtYXRzQWxsb3dlZExpc3QgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuZm9ybWF0c0FsbG93ZWRMaXN0ID0gdGhpcy5mb3JtYXRzQWxsb3dlZC5zcGxpdCgnLicpLm1hcCh4ID0+IHguc3BsaXQoJywnKVswXS50cmltKCkudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgbGV0IGZpbGVMaXN0OiBGaWxlTGlzdDtcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2Ryb3AnKSB7XG4gICAgICBmaWxlTGlzdCA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZUxpc3QgPSBldmVudC50YXJnZXQuZmlsZXMgfHwgZXZlbnQuc3JjRWxlbWVudC5maWxlcztcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudEZpbGVFeHQgPSB0aGlzLnJlZy5leGVjKGZpbGVMaXN0W2ldLm5hbWUpWzFdO1xuICAgICAgY29uc3QgY3VycmVudEZpbGVFeHRMb3dlciA9IGN1cnJlbnRGaWxlRXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBmcm10QWxsb3dlZCA9IHRoaXMuZm9ybWF0c0FsbG93ZWRMaXN0LnNvbWUoeCA9PiB4ID09PSBjdXJyZW50RmlsZUV4dExvd2VyKTtcblxuICAgICAgaWYgKGZybXRBbGxvd2VkKSB7XG4gICAgICAgIGlmIChmaWxlTGlzdFtpXS5zaXplID4gdGhpcy5tYXhTaXplICogMTAyNDAwMCkge1xuICAgICAgICAgIHRoaXMubm90QWxsb3dlZExpc3QucHVzaCh7XG4gICAgICAgICAgICBmaWxlTmFtZTogZmlsZUxpc3RbaV0ubmFtZSxcbiAgICAgICAgICAgIGZpbGVTaXplOiB0aGlzLmNvbnZlcnRTaXplKGZpbGVMaXN0W2ldLnNpemUpLFxuICAgICAgICAgICAgZXJyb3JNc2c6ICdJbnZhbGlkIHNpemUnLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5wdXNoKGZpbGVMaXN0W2ldKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ub3RBbGxvd2VkTGlzdC5wdXNoKHtcbiAgICAgICAgICBmaWxlTmFtZTogZmlsZUxpc3RbaV0ubmFtZSxcbiAgICAgICAgICBmaWxlU2l6ZTogdGhpcy5jb252ZXJ0U2l6ZShmaWxlTGlzdFtpXS5zaXplKSxcbiAgICAgICAgICBlcnJvck1zZzogJ0ludmFsaWQgZm9ybWF0JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGggIT09IDApIHtcbiAgICAgIHRoaXMudXBsb2FkQnRuID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnRoZW1lID09PSAnYXR0YWNoUGluJykge1xuICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMudXBsb2FkTXNnID0gZmFsc2U7XG4gICAgdGhpcy51cGxvYWRDbGljayA9IHRydWU7XG4gICAgdGhpcy5wZXJjZW50Q29tcGxldGUgPSAwO1xuICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IG51bGw7XG4gIH1cblxuICB1cGxvYWRGaWxlcygpIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyU2hvdyA9IHRydWU7XG4gICAgdGhpcy51cGxvYWRDbGljayA9IGZhbHNlO1xuICAgIHRoaXMubm90QWxsb3dlZExpc3QgPSBbXTtcbiAgICBsZXQgaXNFcnJvciA9IGZhbHNlO1xuXG4gICAgdGhpcy5zaW5nbGVGaWxlID0gdGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCA8PSAxO1xuXG4gICAgdGhpcy5jdXJyZW50VXBsb2FkcyA9IFtdO1xuXG4gICAgaWYgKHRoaXMub25lRmlsZVBlclJlcXVlc3QgJiYgIXRoaXMuc2luZ2xlRmlsZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzLmZvckVhY2goKHNlbGVjdGVkRmlsZSwgaW54KSA9PiB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgICAgIC8vIEFkZCBkYXRhIHRvIGJlIHNlbnQgaW4gdGhpcyByZXF1ZXN0XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICB0aGlzLkNhcHRpb25baW54XSB8fCB0aGlzLmtleSxcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkRmlsZXNbaW54XSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRVcGxvYWRzLnB1c2goe3hocjogeGhyLCBmb3JtRGF0YTogZm9ybURhdGEsIGlueHM6IFtpbnhdfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgICAvLyBBZGQgZGF0YSB0byBiZSBzZW50IGluIHRoaXMgcmVxdWVzdFxuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzLmZvckVhY2goKHNlbGVjdGVkRmlsZSwgaW54KSA9PiB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICB0aGlzLkNhcHRpb25baW54XSB8fCB0aGlzLmtleSArICh0aGlzLnNpbmdsZUZpbGUgPyAnJyA6IGlueCksXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzW2lueF0sXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jdXJyZW50VXBsb2Fkcy5wdXNoKHt4aHI6IHhociwgZm9ybURhdGE6IGZvcm1EYXRhLCBpbnhzOiB0aGlzLnNlbGVjdGVkRmlsZXMubWFwKChzZWxlY3RlZEZpbGUsIGlueCkgPT4gaW54KX0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRvdGFsVXBsb2FkcyA9IHRoaXMuY3VycmVudFVwbG9hZHMubGVuZ3RoO1xuXG4gICAgdGhpcy5jdXJyZW50VXBsb2Fkcy5mb3JFYWNoKCh1cGxvYWQ6IFVwbG9hZEluZm8sIHVwbG9hZElueCkgPT4ge1xuICAgICAgY29uc3QgeGhyID0gdXBsb2FkLnhocjtcblxuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGV2bnQgPT4ge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwICYmIHhoci5zdGF0dXMgIT09IDIwMSkge1xuICAgICAgICAgICAgaXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTXNnID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJVcGxvYWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRNc2dUZXh0ID0gdGhpcy5yZXBsYWNlVGV4dHMuYWZ0ZXJVcGxvYWRNc2dfZXJyb3I7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZE1zZ0NsYXNzID0gJ3RleHQtZGFuZ2VyIGxlYWQnO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLkFwaVJlc3BvbnNlLmVtaXQoeGhyKTtcbiAgICAgICAgICBpZiAodXBsb2FkSW54ICsgMSA9PT0gdG90YWxVcGxvYWRzKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZXJ5dGhpbmdEb25lLmVtaXQodGhpcy5jdXJyZW50VXBsb2Fkcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBldm50ID0+IHtcbiAgICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTsgLy8gYnV0dG9uIHNob3VsZCBiZSBkaXNhYmxlZCBieSBwcm9jZXNzIHVwbG9hZGluZ1xuICAgICAgICBpZiAoZXZudC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudERvbmUgPSAoZXZudC5sb2FkZWQgLyBldm50LnRvdGFsKTtcbiAgICAgICAgICB0aGlzLnBlcmNlbnRDb21wbGV0ZSA9IE1hdGgucm91bmQoKHVwbG9hZElueCArIGN1cnJlbnREb25lKSAqIDEwMCAvIHRvdGFsVXBsb2Fkcyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmxvYWQgPSBldm50ID0+IHtcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhclNob3cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGxvYWRNc2cgPSB0cnVlO1xuICAgICAgICB0aGlzLmFmdGVyVXBsb2FkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFpc0Vycm9yKSB7XG4gICAgICAgICAgaWYgKHVwbG9hZElueCArIDEgPT09IHRvdGFsVXBsb2Fkcykge1xuICAgICAgICAgICAgdGhpcy51cGxvYWRNc2dUZXh0ID0gdGhpcy5yZXBsYWNlVGV4dHMuYWZ0ZXJVcGxvYWRNc2dfc3VjY2VzcztcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTXNnQ2xhc3MgPSAndGV4dC1zdWNjZXNzIGxlYWQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0VXBsb2FkID0gdGhpcy5jdXJyZW50VXBsb2Fkc1t1cGxvYWRJbnggKyAxXTtcbiAgICAgICAgICAgIG5leHRVcGxvYWQueGhyLnNlbmQobmV4dFVwbG9hZC5mb3JtRGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucGVyY2VudENvbXBsZXRlID0gTWF0aC5yb3VuZCgodXBsb2FkSW54ICsgMSkgKiAxMDAgLyB0b3RhbFVwbG9hZHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cGxvYWRBUEksIHRydWUpO1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5oZWFkZXJzKSkge1xuICAgICAgICAvLyBPYmplY3Qua2V5cyB3aWxsIGdpdmUgYW4gQXJyYXkgb2Yga2V5c1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIHRoaXMuaGVhZGVyc1trZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgY29uc3QgZmlyc3RVcGxvYWQgPSB0aGlzLmN1cnJlbnRVcGxvYWRzWzBdO1xuICAgIGZpcnN0VXBsb2FkLnhoci5zZW5kKGZpcnN0VXBsb2FkLmZvcm1EYXRhKTtcbiAgfVxuXG4gIHJlbW92ZUZpbGUoaTogYW55LCBzZl9uYTogYW55KSB7XG4gICAgaWYgKHNmX25hID09PSAnc2YnKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgdGhpcy5DYXB0aW9uLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub3RBbGxvd2VkTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29udmVydFNpemUoZmlsZVNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZpbGVTaXplIDwgMTAyNDAwMFxuICAgICAgPyAoZmlsZVNpemUgLyAxMDI0KS50b0ZpeGVkKDIpICsgJyBLQidcbiAgICAgIDogKGZpbGVTaXplIC8gMTAyNDAwMCkudG9GaXhlZCgyKSArICcgTUInO1xuICB9XG5cbiAgYXR0YWNocGluT25jbGljaygpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbCcgKyB0aGlzLmlkKTtcbiAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIGRyb3AoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5vbkNoYW5nZShldmVudCk7XG4gIH1cblxuICBhbGxvd0Ryb3AoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gIH1cbn1cbiJdfQ==