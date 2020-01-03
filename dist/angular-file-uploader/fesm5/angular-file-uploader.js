import { Injectable, NgModule, defineInjectable, EventEmitter, Component, Input, Output } from '@angular/core';
import { __assign, __values } from 'tslib';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AngularFileUploaderService = /** @class */ (function () {
    function AngularFileUploaderService() {
    }
    AngularFileUploaderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    AngularFileUploaderService.ctorParameters = function () { return []; };
    /** @nocollapse */ AngularFileUploaderService.ngInjectableDef = defineInjectable({ factory: function AngularFileUploaderService_Factory() { return new AngularFileUploaderService(); }, token: AngularFileUploaderService, providedIn: "root" });
    return AngularFileUploaderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
                this.replaceTexts = __assign({}, defaultReplaceTextsValues, this.config.replaceTexts);
            }
            else {
                this.replaceTexts = __assign({}, defaultReplaceTextsValues);
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
                for (var _a = __values(Object.keys(_this.headers)), _b = _a.next(); !_b.done; _b = _a.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AngularFileUploaderModule = /** @class */ (function () {
    function AngularFileUploaderModule() {
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
    return AngularFileUploaderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { AngularFileUploaderService, AngularFileUploaderComponent, AngularFileUploaderModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1maWxlLXVwbG9hZGVyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWZpbGUtdXBsb2FkZXIvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLWZpbGUtdXBsb2FkZXIvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItZmlsZS11cGxvYWRlci9saWIvYW5ndWxhci1maWxlLXVwbG9hZGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaWxlVXBsb2FkZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVwbGFjZVRleHRzIHtcbiAgc2VsZWN0RmlsZUJ0bjogc3RyaW5nO1xuICByZXNldEJ0bjogc3RyaW5nO1xuICB1cGxvYWRCdG46IHN0cmluZztcbiAgZHJhZ05Ecm9wQm94OiBzdHJpbmc7XG4gIGF0dGFjaFBpbkJ0bjogc3RyaW5nO1xuICBhZnRlclVwbG9hZE1zZ19zdWNjZXNzOiBzdHJpbmc7XG4gIGFmdGVyVXBsb2FkTXNnX2Vycm9yOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhckZpbGVVcGxvYWRlckNvbmZpZyB7XG4gIHVwbG9hZEFQSTogeyB1cmw6IHN0cmluZzsgbWV0aG9kPzogc3RyaW5nOyBoZWFkZXJzPzogeyBbaWQ6IHN0cmluZ106IHN0cmluZyB9OyB9O1xuXG4gIHRoZW1lPzogc3RyaW5nO1xuICBpZD86IG51bWJlcjtcbiAgaGlkZVByb2dyZXNzQmFyPzogYm9vbGVhbjtcbiAgaGlkZVJlc2V0QnRuPzogYm9vbGVhbjtcbiAgaGlkZVNlbGVjdEJ0bj86IGJvb2xlYW47XG4gIG1heFNpemU/OiBudW1iZXI7XG4gIGZvcm1hdHNBbGxvd2VkPzogc3RyaW5nO1xuICBtdWx0aXBsZT86IGJvb2xlYW47XG4gIG9uZUZpbGVQZXJSZXF1ZXN0PzogYm9vbGVhbjtcbiAga2V5Pzogc3RyaW5nO1xuICByZXBsYWNlVGV4dHM/OiBSZXBsYWNlVGV4dHM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBsb2FkSW5mbyB7XG4gIHhocjogWE1MSHR0cFJlcXVlc3Q7XG4gIGZvcm1EYXRhOiBGb3JtRGF0YTtcbiAgaW54czogbnVtYmVyW107XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FuZ3VsYXItZmlsZS11cGxvYWRlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiICpuZ0lmPVwiKHRoZW1lICE9PSAnYXR0YWNoUGluJylcIiBpZD1cImRlZmF1bHRcIj5cblxuICAgIDwhLS0gRHJhZyBuIERyb3AgdGhlbWUgU3RhcnRzIC0tPlxuICAgIDxkaXYgKm5nSWY9XCJ0aGVtZSA9PSAnZHJhZ05Ecm9wJ1wiIGlkPVwiZHJhZ05Ecm9wXCIgW25nQ2xhc3NdPVwiKGhpZGVTZWxlY3RCdG4gJiYgaGlkZVJlc2V0QnRuKSA/IG51bGwgOiAnZHJhZ05Ecm9wQnRtUGFkJ1wiIGNsYXNzPVwiZHJhZ05Ecm9wXCI+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTtcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkaXYxXCIgY2xhc3M9XCJkaXYxIGFmdS1kcmFnbmRyb3AtYm94XCIgKGRyb3ApPVwiZHJvcCgkZXZlbnQpXCIgKGRyYWdvdmVyKT1cImFsbG93RHJvcCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhZnUtZHJhZ25kcm9wLXRleHRcIj57e3JlcGxhY2VUZXh0cz8uZHJhZ05Ecm9wQm94fX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gPHNwYW4gY2xhc3M9J2xhYmVsIGxhYmVsLWluZm8nIGlkPVwidXBsb2FkLWZpbGUtaW5mb3t7aWR9fVwiPnt7c2VsZWN0ZWRGaWxlc1swXT8ubmFtZX19PC9zcGFuPiAtLT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBEcmFnIG4gRHJvcCB0aGVtZSBFbmRzIC0tPlxuXG4gICAgPGxhYmVsIGZvcj1cInNlbHt7aWR9fVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSBhZnUtc2VsZWN0LWJ0blwiICpuZ0lmPVwiIWhpZGVTZWxlY3RCdG5cIj57e3JlcGxhY2VUZXh0cz8uc2VsZWN0RmlsZUJ0bn19PC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBpZD1cInNlbHt7aWR9fVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiICpuZ0lmPVwiIWhpZGVTZWxlY3RCdG5cIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiB0aXRsZT1cIlNlbGVjdCBmaWxlXCJcbiAgICAgICAgbmFtZT1cImZpbGVzW11cIiBbYWNjZXB0XT1mb3JtYXRzQWxsb3dlZCBbYXR0ci5tdWx0aXBsZV09XCJtdWx0aXBsZSA/ICcnIDogbnVsbFwiIC8+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4taW5mbyBidG4tc20gcmVzZXRCdG4gYWZ1LXJlc2V0LWJ0blwiIChjbGljayk9XCJyZXNldEZpbGVVcGxvYWQoKVwiICpuZ0lmPVwiIWhpZGVSZXNldEJ0blwiPnt7cmVwbGFjZVRleHRzPy5yZXNldEJ0bn19PC9idXR0b24+XG4gICAgPGJyICpuZ0lmPVwiIWhpZGVTZWxlY3RCdG5cIj5cbiAgICA8cCBjbGFzcz1cImNvbnN0cmFpbnRzLWluZm8gYWZ1LWNvbnN0cmFpbnRzLWluZm9cIj4oe3tmb3JtYXRzQWxsb3dlZH19KSBTaXplIGxpbWl0LSB7eyhjb252ZXJ0U2l6ZShtYXhTaXplICoxMDI0MDAwKSl9fTwvcD5cbiAgICA8IS0tU2VsZWN0ZWQgZmlsZSBsaXN0LS0+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBhZnUtdmFsaWQtZmlsZVwiICpuZ0Zvcj1cImxldCBzZiBvZiBzZWxlY3RlZEZpbGVzO2xldCBpPWluZGV4XCIgPlxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHRleHRPdmVyZmxvd1wiPjxzcGFuIGNsYXNzPVwidGV4dC1wcmltYXJ5XCI+e3tzZi5uYW1lfX08L3NwYW4+PC9wPlxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHBhZE1hcmcgc2l6ZUNcIj48c3Ryb25nPih7e2NvbnZlcnRTaXplKHNmLnNpemUpfX0pPC9zdHJvbmc+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9wPlxuICAgICAgICA8IS0tICA8aW5wdXQgY2xhc3M9XCJjb2wteHMtMyBwcm9ncmVzcyBjYXB0aW9uXCIgIHR5cGU9XCJ0ZXh0XCIgIHBsYWNlaG9sZGVyPVwiQ2FwdGlvbi4uXCIgIFsobmdNb2RlbCldPVwiQ2FwdGlvbltpXVwiICAqbmdJZj1cInVwbG9hZENsaWNrXCIvPiAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzIGNvbC14cy0zIHBhZE1hcmcgYWZ1LXByb2dyZXNzLWJhclwiICpuZ0lmPVwic2luZ2xlRmlsZSAmJiBwcm9ncmVzc0JhclNob3cgJiYgIWhpZGVQcm9ncmVzc0JhclwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXN1Y2Nlc3NcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzpwZXJjZW50Q29tcGxldGUrJyUnfVwiPnt7cGVyY2VudENvbXBsZXRlfX0lPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGEgY2xhc3M9XCJjb2wteHMtMVwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicmVtb3ZlRmlsZShpLCdzZicpXCIgKm5nSWY9XCJ1cGxvYWRDbGlja1wiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9hPlxuICAgIDwvZGl2PlxuICAgIDwhLS1JbnZhbGlkIGZpbGUgbGlzdC0tPlxuICAgIDxkaXYgY2xhc3M9XCJyb3cgdGV4dC1kYW5nZXIgYWZ1LWludmFsaWQtZmlsZVwiICpuZ0Zvcj1cImxldCBuYSBvZiBub3RBbGxvd2VkTGlzdDtsZXQgaj1pbmRleFwiPlxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHRleHRPdmVyZmxvd1wiPjxzcGFuPnt7bmFbJ2ZpbGVOYW1lJ119fTwvc3Bhbj48L3A+XG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgcGFkTWFyZyBzaXplQ1wiPjxzdHJvbmc+KHt7bmFbJ2ZpbGVTaXplJ119fSk8L3N0cm9uZz48L3A+XG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgXCI+e3tuYVsnZXJyb3JNc2cnXX19PC9wPlxuICAgICAgICA8YSBjbGFzcz1cImNvbC14cy0xIGRlbEZpbGVJY29uXCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJyZW1vdmVGaWxlKGosJ25hJylcIiAqbmdJZj1cInVwbG9hZENsaWNrXCI+Jm5ic3A7PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT48L2E+XG4gICAgPC9kaXY+XG5cbiAgICA8cCAqbmdJZj1cInVwbG9hZE1zZ1wiIGNsYXNzPVwie3t1cGxvYWRNc2dDbGFzc319ICsgYWZ1LXVwbG9hZC1zdGF0dXNcIj57e3VwbG9hZE1zZ1RleHR9fTxwPlxuICAgIDxkaXYgKm5nSWY9XCIhc2luZ2xlRmlsZSAmJiBwcm9ncmVzc0JhclNob3cgJiYgIWhpZGVQcm9ncmVzc0JhclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MgY29sLXhzLTQgcGFkTWFyZyBhZnUtcHJvZ3Jlc3MtYmFyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3VjY2Vzc1wiIHJvbGU9XCJwcm9ncmVzc2JhclwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOnBlcmNlbnRDb21wbGV0ZSsnJSd9XCI+e3twZXJjZW50Q29tcGxldGV9fSU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnI+XG4gICAgICAgIDxicj5cbiAgICA8L2Rpdj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGFmdS11cGxvYWQtYnRuXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWRGaWxlcygpXCIgW2Rpc2FibGVkXT0hdXBsb2FkQnRuPnt7cmVwbGFjZVRleHRzPy51cGxvYWRCdG59fTwvYnV0dG9uPlxuICAgIDxicj5cbjwvZGl2PlxuXG48IS0tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEFUVEFDSCBQSU4gVEhFTUUgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8tLT5cbjxkaXYgKm5nSWY9XCJ0aGVtZSA9PSAnYXR0YWNoUGluJ1wiIGlkPVwiYXR0YWNoUGluXCI+XG4gICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctbGVmdDo2cHhcIj5cbiAgICAgICAgPGEgY2xhc3M9J2J0biB1cF9idG4gYWZ1LWF0dGFjaC1waW4nIChjbGljayk9XCJhdHRhY2hwaW5PbmNsaWNrKClcIj5cbiAgICAgICAgICB7e3JlcGxhY2VUZXh0cz8uYXR0YWNoUGluQnRufX1cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGFwZXJjbGlwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPCEtLSA8cCBzdHlsZT1cIm1hcmdpbi10b3A6MTBweFwiPih7e2Zvcm1hdHNBbGxvd2VkfX0pIFNpemUgbGltaXQtIHt7KGNvbnZlcnRTaXplKG1heFNpemUgKiAxMDI0MDAwKSl9fTwvcD4gLS0+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBpZD1cInNlbHt7aWR9fVwiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiIHRpdGxlPVwiU2VsZWN0IGZpbGVcIiBuYW1lPVwiZmlsZXNbXVwiIFthY2NlcHRdPWZvcm1hdHNBbGxvd2VkXG4gICAgICAgICAgICAgICAgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGUgPyAnJyA6IG51bGxcIiAvPlxuICAgICAgICAgICAgPGJyPlxuICAgICAgICA8L2E+XG4gICAgICAgICZuYnNwO1xuICAgICAgICA8c3BhbiBjbGFzcz0nbGFiZWwgbGFiZWwtaW5mbycgaWQ9XCJ1cGxvYWQtZmlsZS1pbmZve3tpZH19XCI+e3tzZWxlY3RlZEZpbGVzWzBdPy5uYW1lfX08L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBEUkFHIE4gRFJPUCBUSEVNRSAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy0tPlxuPCEtLSA8ZGl2ICpuZ0lmPVwidGhlbWUgPT0gJ2RyYWdORHJvcCdcIiBpZD1cImRyYWdORHJvcFwiPlxuICA8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjZweFwiPlxuICAgIDxkaXYgaWQ9XCJkaXYxXCIgKGRyb3ApPVwiZHJvcCgkZXZlbnQpXCIgKGRyYWdvdmVyKT1cImFsbG93RHJvcCgkZXZlbnQpXCI+XG4gICAgICA8cD5EcmFnIE4gRHJvcDwvcD5cbiAgICA8L2Rpdj5cbiAgICA8c3BhbiBjbGFzcz0nbGFiZWwgbGFiZWwtaW5mbycgaWQ9XCJ1cGxvYWQtZmlsZS1pbmZve3tpZH19XCI+e3tzZWxlY3RlZEZpbGVzWzBdPy5uYW1lfX08L3NwYW4+XG4gIDwvZGl2PlxuPC9kaXY+IC0tPlxuYCxcbiAgc3R5bGVzOiBbYC5jb25zdHJhaW50cy1pbmZve21hcmdpbi10b3A6MTBweDtmb250LXN0eWxlOml0YWxpY30ucGFkTWFyZ3twYWRkaW5nOjA7bWFyZ2luLWJvdHRvbTowfS5jYXB0aW9ue21hcmdpbi1yaWdodDo1cHh9LnRleHRPdmVyZmxvd3t3aGl0ZS1zcGFjZTpub3dyYXA7cGFkZGluZy1yaWdodDowO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzfS51cF9idG57Y29sb3I6IzAwMDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjoycHggc29saWQgIzVjNWI1Yjtib3JkZXItcmFkaXVzOjIycHh9LmRlbEZpbGVJY29ue3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOiNjZTA5MDl9LmRyYWdORHJvcCAuZGl2MXtkaXNwbGF5OmJvcmRlci1ib3g7Ym9yZGVyOjJweCBkYXNoZWQgIzVjNWI1YjtoZWlnaHQ6NnJlbTt3aWR0aDoyMHJlbX0uZHJhZ05Ecm9wIC5kaXYxPnB7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOiM1YzViNWI7bWFyZ2luLXRvcDoxLjRlbX0uZHJhZ05Ecm9wQnRtUGFke3BhZGRpbmctYm90dG9tOjJyZW19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo2MjBweCl7LmNhcHRpb257cGFkZGluZzowfX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjUxMHB4KXsuc2l6ZUN7d2lkdGg6MjUlfX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjI2MHB4KXsuY2FwdGlvbiwuc2l6ZUN7Zm9udC1zaXplOjEwcHh9fS5yZXNldEJ0bnttYXJnaW4tbGVmdDozcHh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogQW5ndWxhckZpbGVVcGxvYWRlckNvbmZpZztcblxuICBASW5wdXQoKVxuICByZXNldFVwbG9hZCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKVxuICBBcGlSZXNwb25zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KClcbiAgZXZlcnl0aGluZ0RvbmU6IEV2ZW50RW1pdHRlcjxVcGxvYWRJbmZvW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxVcGxvYWRJbmZvW10+KCk7XG5cbiAgdGhlbWU6IHN0cmluZztcbiAgaWQ6IG51bWJlcjtcbiAgaGlkZVByb2dyZXNzQmFyOiBib29sZWFuO1xuICBtYXhTaXplOiBudW1iZXI7XG4gIHVwbG9hZEFQSTogc3RyaW5nO1xuICBtZXRob2Q6IHN0cmluZztcbiAgZm9ybWF0c0FsbG93ZWQ6IHN0cmluZztcbiAgZm9ybWF0c0FsbG93ZWRMaXN0OiBzdHJpbmdbXSA9IG51bGw7XG4gIG11bHRpcGxlOiBib29sZWFuO1xuICBoZWFkZXJzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH07XG4gIGhpZGVSZXNldEJ0bjogYm9vbGVhbjtcbiAgaGlkZVNlbGVjdEJ0bjogYm9vbGVhbjtcbiAgb25lRmlsZVBlclJlcXVlc3Q6IGJvb2xlYW47XG4gIGtleTogc3RyaW5nO1xuICByZWc6IFJlZ0V4cCA9IC8oPzpcXC4oW14uXSspKT8kLztcbiAgc2VsZWN0ZWRGaWxlczogRmlsZVtdID0gW107XG4gIG5vdEFsbG93ZWRMaXN0OiB7IGZpbGVOYW1lOiBzdHJpbmc7IGZpbGVTaXplOiBzdHJpbmc7IGVycm9yTXNnOiBzdHJpbmc7IH1bXSA9IFtdO1xuICBDYXB0aW9uOiBzdHJpbmdbXSA9IFtdO1xuICBzaW5nbGVGaWxlID0gdHJ1ZTtcbiAgcHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XG4gIHVwbG9hZEJ0biA9IGZhbHNlO1xuICB1cGxvYWRNc2cgPSBmYWxzZTtcbiAgYWZ0ZXJVcGxvYWQgPSBmYWxzZTtcbiAgdXBsb2FkQ2xpY2sgPSB0cnVlO1xuICB1cGxvYWRNc2dUZXh0OiBzdHJpbmc7XG4gIHVwbG9hZE1zZ0NsYXNzOiBzdHJpbmc7XG4gIHBlcmNlbnRDb21wbGV0ZTogbnVtYmVyO1xuICByZXBsYWNlVGV4dHM7XG4gIGN1cnJlbnRVcGxvYWRzOiBVcGxvYWRJbmZvW10gPSBbXTtcblxuICBwcml2YXRlIGlkRGF0ZTogbnVtYmVyID0gK25ldyBEYXRlKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuY29uZmlnICYmIHRoaXMuY29uZmlnKSB7XG4gICAgICB0aGlzLnRoZW1lID0gdGhpcy5jb25maWcudGhlbWUgfHwgJyc7XG4gICAgICB0aGlzLmlkID1cbiAgICAgICAgdGhpcy5jb25maWcuaWQgfHxcbiAgICAgICAgcGFyc2VJbnQoKHRoaXMuaWREYXRlIC8gMTAwMDApLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXSwgMTApICtcbiAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjApICogMTAwMDA7XG4gICAgICB0aGlzLmhpZGVQcm9ncmVzc0JhciA9IHRoaXMuY29uZmlnLmhpZGVQcm9ncmVzc0JhciB8fCBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZVJlc2V0QnRuID0gdGhpcy5jb25maWcuaGlkZVJlc2V0QnRuIHx8IGZhbHNlO1xuICAgICAgdGhpcy5oaWRlU2VsZWN0QnRuID0gdGhpcy5jb25maWcuaGlkZVNlbGVjdEJ0biB8fCBmYWxzZTtcbiAgICAgIHRoaXMubWF4U2l6ZSA9IHRoaXMuY29uZmlnLm1heFNpemUgfHwgMjA7XG4gICAgICB0aGlzLnVwbG9hZEFQSSA9IHRoaXMuY29uZmlnLnVwbG9hZEFQSS51cmw7XG4gICAgICB0aGlzLm1ldGhvZCA9IHRoaXMuY29uZmlnLnVwbG9hZEFQSS5tZXRob2QgfHwgJ1BPU1QnO1xuICAgICAgdGhpcy5mb3JtYXRzQWxsb3dlZCA9XG4gICAgICAgIHRoaXMuY29uZmlnLmZvcm1hdHNBbGxvd2VkIHx8ICcuanBnLC5wbmcsLnBkZiwuZG9jeCwudHh0LC5naWYsLmpwZWcnO1xuICAgICAgdGhpcy5mb3JtYXRzQWxsb3dlZExpc3QgPSBudWxsO1xuICAgICAgdGhpcy5tdWx0aXBsZSA9IHRoaXMuY29uZmlnLm11bHRpcGxlIHx8IGZhbHNlO1xuICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5jb25maWcudXBsb2FkQVBJLmhlYWRlcnMgfHwge307XG4gICAgICB0aGlzLm9uZUZpbGVQZXJSZXF1ZXN0ID0gISF0aGlzLmNvbmZpZy5vbmVGaWxlUGVyUmVxdWVzdDtcbiAgICAgIHRoaXMua2V5ID0gdGhpcy5jb25maWcua2V5IHx8ICdmaWxlJztcbiAgICAgIGNvbnN0IGRlZmF1bHRSZXBsYWNlVGV4dHNWYWx1ZXM6IFJlcGxhY2VUZXh0cyA9IHtcbiAgICAgICAgc2VsZWN0RmlsZUJ0bjogdGhpcy5tdWx0aXBsZSA/ICdTZWxlY3QgRmlsZXMnIDogJ1NlbGVjdCBGaWxlJyxcbiAgICAgICAgcmVzZXRCdG46ICdSZXNldCcsXG4gICAgICAgIHVwbG9hZEJ0bjogJ1VwbG9hZCcsXG4gICAgICAgIGRyYWdORHJvcEJveDogJ0RyYWcgTiBEcm9wJyxcbiAgICAgICAgYXR0YWNoUGluQnRuOiB0aGlzLm11bHRpcGxlID8gJ0F0dGFjaCBGaWxlcy4uLicgOiAnQXR0YWNoIEZpbGUuLi4nLFxuICAgICAgICBhZnRlclVwbG9hZE1zZ19zdWNjZXNzOiAnU3VjY2Vzc2Z1bGx5IFVwbG9hZGVkICEnLFxuICAgICAgICBhZnRlclVwbG9hZE1zZ19lcnJvcjogJ1VwbG9hZCBGYWlsZWQgIScsXG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnJlcGxhY2VUZXh0cykge1xuICAgICAgICB0aGlzLnJlcGxhY2VUZXh0cyA9IHtcbiAgICAgICAgICAuLi5kZWZhdWx0UmVwbGFjZVRleHRzVmFsdWVzLFxuICAgICAgICAgIC4uLnRoaXMuY29uZmlnLnJlcGxhY2VUZXh0cyxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRzID0gey4uLmRlZmF1bHRSZXBsYWNlVGV4dHNWYWx1ZXN9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLnJlc2V0VXBsb2FkKSB7XG4gICAgICBpZiAoY2hhbmdlcy5yZXNldFVwbG9hZC5jdXJyZW50VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5yZXNldEZpbGVVcGxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcblxuICB9XG5cbiAgcmVzZXRGaWxlVXBsb2FkKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRGaWxlcyA9IFtdO1xuICAgIHRoaXMuQ2FwdGlvbiA9IFtdO1xuICAgIHRoaXMubm90QWxsb3dlZExpc3QgPSBbXTtcbiAgICB0aGlzLnVwbG9hZE1zZyA9IGZhbHNlO1xuICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XG4gIH1cblxuICBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgdGhpcy5ub3RBbGxvd2VkTGlzdCA9IFtdO1xuICAgIGlmICh0aGlzLmFmdGVyVXBsb2FkIHx8ICF0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBbXTtcbiAgICAgIHRoaXMuQ2FwdGlvbiA9IFtdO1xuICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvcm1hdHNBbGxvd2VkTGlzdCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5mb3JtYXRzQWxsb3dlZExpc3QgPSB0aGlzLmZvcm1hdHNBbGxvd2VkLnNwbGl0KCcuJykubWFwKHggPT4geC5zcGxpdCgnLCcpWzBdLnRyaW0oKS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICBsZXQgZmlsZUxpc3Q6IEZpbGVMaXN0O1xuICAgIGlmIChldmVudC50eXBlID09PSAnZHJvcCcpIHtcbiAgICAgIGZpbGVMaXN0ID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlTGlzdCA9IGV2ZW50LnRhcmdldC5maWxlcyB8fCBldmVudC5zcmNFbGVtZW50LmZpbGVzO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50RmlsZUV4dCA9IHRoaXMucmVnLmV4ZWMoZmlsZUxpc3RbaV0ubmFtZSlbMV07XG4gICAgICBjb25zdCBjdXJyZW50RmlsZUV4dExvd2VyID0gY3VycmVudEZpbGVFeHQudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGZybXRBbGxvd2VkID0gdGhpcy5mb3JtYXRzQWxsb3dlZExpc3Quc29tZSh4ID0+IHggPT09IGN1cnJlbnRGaWxlRXh0TG93ZXIpO1xuXG4gICAgICBpZiAoZnJtdEFsbG93ZWQpIHtcbiAgICAgICAgaWYgKGZpbGVMaXN0W2ldLnNpemUgPiB0aGlzLm1heFNpemUgKiAxMDI0MDAwKSB7XG4gICAgICAgICAgdGhpcy5ub3RBbGxvd2VkTGlzdC5wdXNoKHtcbiAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlTGlzdFtpXS5uYW1lLFxuICAgICAgICAgICAgZmlsZVNpemU6IHRoaXMuY29udmVydFNpemUoZmlsZUxpc3RbaV0uc2l6ZSksXG4gICAgICAgICAgICBlcnJvck1zZzogJ0ludmFsaWQgc2l6ZScsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzLnB1c2goZmlsZUxpc3RbaV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnB1c2goe1xuICAgICAgICAgIGZpbGVOYW1lOiBmaWxlTGlzdFtpXS5uYW1lLFxuICAgICAgICAgIGZpbGVTaXplOiB0aGlzLmNvbnZlcnRTaXplKGZpbGVMaXN0W2ldLnNpemUpLFxuICAgICAgICAgIGVycm9yTXNnOiAnSW52YWxpZCBmb3JtYXQnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy51cGxvYWRCdG4gPSB0cnVlO1xuICAgICAgaWYgKHRoaXMudGhlbWUgPT09ICdhdHRhY2hQaW4nKSB7XG4gICAgICAgIHRoaXMudXBsb2FkRmlsZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy51cGxvYWRNc2cgPSBmYWxzZTtcbiAgICB0aGlzLnVwbG9hZENsaWNrID0gdHJ1ZTtcbiAgICB0aGlzLnBlcmNlbnRDb21wbGV0ZSA9IDA7XG4gICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gbnVsbDtcbiAgfVxuXG4gIHVwbG9hZEZpbGVzKCkge1xuICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gdHJ1ZTtcbiAgICB0aGlzLnVwbG9hZENsaWNrID0gZmFsc2U7XG4gICAgdGhpcy5ub3RBbGxvd2VkTGlzdCA9IFtdO1xuICAgIGxldCBpc0Vycm9yID0gZmFsc2U7XG5cbiAgICB0aGlzLnNpbmdsZUZpbGUgPSB0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoIDw9IDE7XG5cbiAgICB0aGlzLmN1cnJlbnRVcGxvYWRzID0gW107XG5cbiAgICBpZiAodGhpcy5vbmVGaWxlUGVyUmVxdWVzdCAmJiAhdGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMuZm9yRWFjaCgoc2VsZWN0ZWRGaWxlLCBpbngpID0+IHtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICAgICAgLy8gQWRkIGRhdGEgdG8gYmUgc2VudCBpbiB0aGlzIHJlcXVlc3RcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgIHRoaXMuQ2FwdGlvbltpbnhdIHx8IHRoaXMua2V5LFxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlc1tpbnhdLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFVwbG9hZHMucHVzaCh7eGhyOiB4aHIsIGZvcm1EYXRhOiBmb3JtRGF0YSwgaW54czogW2lueF19KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICAgIC8vIEFkZCBkYXRhIHRvIGJlIHNlbnQgaW4gdGhpcyByZXF1ZXN0XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMuZm9yRWFjaCgoc2VsZWN0ZWRGaWxlLCBpbngpID0+IHtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgIHRoaXMuQ2FwdGlvbltpbnhdIHx8IHRoaXMua2V5ICsgKHRoaXMuc2luZ2xlRmlsZSA/ICcnIDogaW54KSxcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkRmlsZXNbaW54XSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmN1cnJlbnRVcGxvYWRzLnB1c2goe3hocjogeGhyLCBmb3JtRGF0YTogZm9ybURhdGEsIGlueHM6IHRoaXMuc2VsZWN0ZWRGaWxlcy5tYXAoKHNlbGVjdGVkRmlsZSwgaW54KSA9PiBpbngpfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG90YWxVcGxvYWRzID0gdGhpcy5jdXJyZW50VXBsb2Fkcy5sZW5ndGg7XG5cbiAgICB0aGlzLmN1cnJlbnRVcGxvYWRzLmZvckVhY2goKHVwbG9hZDogVXBsb2FkSW5mbywgdXBsb2FkSW54KSA9PiB7XG4gICAgICBjb25zdCB4aHIgPSB1cGxvYWQueGhyO1xuXG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZXZudCA9PiB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDAgJiYgeGhyLnN0YXR1cyAhPT0gMjAxKSB7XG4gICAgICAgICAgICBpc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRNc2cgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZE1zZ1RleHQgPSB0aGlzLnJlcGxhY2VUZXh0cy5hZnRlclVwbG9hZE1zZ19lcnJvcjtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTXNnQ2xhc3MgPSAndGV4dC1kYW5nZXIgbGVhZCc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuQXBpUmVzcG9uc2UuZW1pdCh4aHIpO1xuICAgICAgICAgIGlmICh1cGxvYWRJbnggKyAxID09PSB0b3RhbFVwbG9hZHMpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlcnl0aGluZ0RvbmUuZW1pdCh0aGlzLmN1cnJlbnRVcGxvYWRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGV2bnQgPT4ge1xuICAgICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlOyAvLyBidXR0b24gc2hvdWxkIGJlIGRpc2FibGVkIGJ5IHByb2Nlc3MgdXBsb2FkaW5nXG4gICAgICAgIGlmIChldm50Lmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50RG9uZSA9IChldm50LmxvYWRlZCAvIGV2bnQudG90YWwpO1xuICAgICAgICAgIHRoaXMucGVyY2VudENvbXBsZXRlID0gTWF0aC5yb3VuZCgodXBsb2FkSW54ICsgY3VycmVudERvbmUpICogMTAwIC8gdG90YWxVcGxvYWRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLm9ubG9hZCA9IGV2bnQgPT4ge1xuICAgICAgICB0aGlzLnByb2dyZXNzQmFyU2hvdyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwbG9hZE1zZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYWZ0ZXJVcGxvYWQgPSB0cnVlO1xuICAgICAgICBpZiAoIWlzRXJyb3IpIHtcbiAgICAgICAgICBpZiAodXBsb2FkSW54ICsgMSA9PT0gdG90YWxVcGxvYWRzKSB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZE1zZ1RleHQgPSB0aGlzLnJlcGxhY2VUZXh0cy5hZnRlclVwbG9hZE1zZ19zdWNjZXNzO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRNc2dDbGFzcyA9ICd0ZXh0LXN1Y2Nlc3MgbGVhZCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRVcGxvYWQgPSB0aGlzLmN1cnJlbnRVcGxvYWRzW3VwbG9hZElueCArIDFdO1xuICAgICAgICAgICAgbmV4dFVwbG9hZC54aHIuc2VuZChuZXh0VXBsb2FkLmZvcm1EYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5wZXJjZW50Q29tcGxldGUgPSBNYXRoLnJvdW5kKCh1cGxvYWRJbnggKyAxKSAqIDEwMCAvIHRvdGFsVXBsb2Fkcyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVwbG9hZEFQSSwgdHJ1ZSk7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpKSB7XG4gICAgICAgIC8vIE9iamVjdC5rZXlzIHdpbGwgZ2l2ZSBhbiBBcnJheSBvZiBrZXlzXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdGhpcy5oZWFkZXJzW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBjb25zdCBmaXJzdFVwbG9hZCA9IHRoaXMuY3VycmVudFVwbG9hZHNbMF07XG4gICAgZmlyc3RVcGxvYWQueGhyLnNlbmQoZmlyc3RVcGxvYWQuZm9ybURhdGEpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZShpOiBhbnksIHNmX25hOiBhbnkpIHtcbiAgICBpZiAoc2ZfbmEgPT09ICdzZicpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICB0aGlzLkNhcHRpb24uc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnNwbGljZShpLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0U2l6ZShmaWxlU2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZmlsZVNpemUgPCAxMDI0MDAwXG4gICAgICA/IChmaWxlU2l6ZSAvIDEwMjQpLnRvRml4ZWQoMikgKyAnIEtCJ1xuICAgICAgOiAoZmlsZVNpemUgLyAxMDI0MDAwKS50b0ZpeGVkKDIpICsgJyBNQic7XG4gIH1cblxuICBhdHRhY2hwaW5PbmNsaWNrKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsJyArIHRoaXMuaWQpO1xuICAgIGlmIChlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZHJvcChldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgfVxuXG4gIGFsbG93RHJvcChldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9hbmd1bGFyLWZpbGUtdXBsb2FkZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0FuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaWxlVXBsb2FkZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX3ZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztxQ0FKRDtDQVFDOzs7Ozs7O0lDc0pDO1FBeENBLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBR3BCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdqQyxtQkFBYyxHQUErQixJQUFJLFlBQVksRUFBZ0IsQ0FBQztRQVM5RSx1QkFBa0IsR0FBYSxJQUFJLENBQUM7UUFPcEMsUUFBRyxHQUFXLGlCQUFpQixDQUFDO1FBQ2hDLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLG1CQUFjLEdBQWdFLEVBQUUsQ0FBQztRQUNqRixZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBS25CLG1CQUFjLEdBQWlCLEVBQUUsQ0FBQztRQUUxQixXQUFNLEdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0tBR3BDOzs7OztJQUVELGtEQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsRUFBRTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2QsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDO1lBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDO1lBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDO1lBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztZQUNyRCxJQUFJLENBQUMsY0FBYztnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksc0NBQXNDLENBQUM7WUFDdkUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQztZQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDbkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQ3pELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDOztnQkFDL0IseUJBQXlCLEdBQWlCO2dCQUM5QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLEdBQUcsYUFBYTtnQkFDN0QsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFNBQVMsRUFBRSxRQUFRO2dCQUNuQixZQUFZLEVBQUUsYUFBYTtnQkFDM0IsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLEdBQUcsZ0JBQWdCO2dCQUNsRSxzQkFBc0IsRUFBRSx5QkFBeUI7Z0JBQ2pELG9CQUFvQixFQUFFLGlCQUFpQjthQUN4QztZQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxZQUFZLGdCQUNaLHlCQUF5QixFQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FDNUIsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLGdCQUFPLHlCQUF5QixDQUFDLENBQUM7YUFDcEQ7U0FDRjtRQUVELElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUN2QixJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtnQkFDN0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hCO1NBQ0Y7S0FDRjs7OztJQUVELCtDQUFROzs7SUFBUjtLQUVDOzs7O0lBRUQsc0RBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7S0FDeEI7Ozs7O0lBRUQsK0NBQVE7Ozs7SUFBUixVQUFTLEtBQVU7UUFDakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksRUFBRTtZQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBQSxDQUFDLENBQUM7U0FDekc7O1lBRUcsUUFBa0I7UUFDdEIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN6QixRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7U0FDckM7YUFBTTtZQUNMLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztTQUN6RDtnQ0FDUSxDQUFDOztnQkFDRixjQUFjLEdBQUcsT0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUNuRCxtQkFBbUIsR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFOztnQkFDbEQsV0FBVyxHQUFHLE9BQUssa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLG1CQUFtQixHQUFBLENBQUM7WUFFaEYsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQUssT0FBTyxHQUFHLE9BQU8sRUFBRTtvQkFDN0MsT0FBSyxjQUFjLENBQUMsSUFBSSxDQUFDO3dCQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7d0JBQzFCLFFBQVEsRUFBRSxPQUFLLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUM1QyxRQUFRLEVBQUUsY0FBYztxQkFDekIsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLE9BQUssYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdEM7YUFDRjtpQkFBTTtnQkFDTCxPQUFLLGNBQWMsQ0FBQyxJQUFJLENBQUM7b0JBQ3ZCLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtvQkFDMUIsUUFBUSxFQUFFLE9BQUssV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzVDLFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7O1FBdEJELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtvQkFBL0IsQ0FBQztTQXNCVDtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxXQUFXLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNwQjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztLQUMzQjs7OztJQUVELGtEQUFXOzs7SUFBWDtRQUFBLGlCQWdHQztRQS9GQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQzs7WUFDckIsT0FBTyxHQUFHLEtBQUs7UUFFbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWSxFQUFFLEdBQUc7O29CQUNyQyxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUU7O29CQUMxQixRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUU7O2dCQUcvQixRQUFRLENBQUMsTUFBTSxDQUNiLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSSxDQUFDLEdBQUcsRUFDN0IsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FDeEIsQ0FBQztnQkFFRixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7YUFDdkUsQ0FBQyxDQUFDO1NBQ0o7YUFBTTs7Z0JBQ0MsR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFOztnQkFDMUIsVUFBUSxHQUFHLElBQUksUUFBUSxFQUFFOztZQUcvQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQVksRUFBRSxHQUFHO2dCQUMzQyxVQUFRLENBQUMsTUFBTSxDQUNiLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSSxDQUFDLEdBQUcsSUFBSSxLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFDNUQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FDeEIsQ0FBQzthQUNILENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsVUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFlBQVksRUFBRSxHQUFHLElBQUssT0FBQSxHQUFHLEdBQUEsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUNwSDs7WUFFSyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO1FBRS9DLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBa0IsRUFBRSxTQUFTOztnQkFDbEQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHO1lBRXRCLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxVQUFBLElBQUk7Z0JBQzNCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7b0JBQ3hCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7d0JBQzVDLE9BQU8sR0FBRyxJQUFJLENBQUM7d0JBQ2YsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7d0JBQzdCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO3dCQUN2QixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzt3QkFDdEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7d0JBQ3hCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDNUQsS0FBSSxDQUFDLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQztxQkFDMUM7b0JBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzNCLElBQUksU0FBUyxHQUFHLENBQUMsS0FBSyxZQUFZLEVBQUU7d0JBQ2xDLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztxQkFDL0M7aUJBQ0Y7YUFDRixDQUFDO1lBRUYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsVUFBQSxJQUFJO2dCQUMxQixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7O3dCQUNuQixXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUM5QyxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEdBQUcsV0FBVyxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQztpQkFDbkY7YUFDRixDQUFDO1lBRUYsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFBLElBQUk7Z0JBQ2YsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ1osSUFBSSxTQUFTLEdBQUcsQ0FBQyxLQUFLLFlBQVksRUFBRTt3QkFDbEMsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDO3dCQUM5RCxLQUFJLENBQUMsY0FBYyxHQUFHLG1CQUFtQixDQUFDO3FCQUMzQzt5QkFBTTs7NEJBQ0MsVUFBVSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUMxQztvQkFDRCxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQztpQkFDekU7YUFDRixDQUFDO1lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7O2dCQUM1QyxLQUFrQixJQUFBLEtBQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsZ0JBQUE7b0JBQXRDLElBQU0sR0FBRyxXQUFBOztvQkFFWixHQUFHLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDOUM7Ozs7Ozs7Ozs7U0FDRixDQUFDLENBQUM7O1lBR0csV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM1Qzs7Ozs7O0lBRUQsaURBQVU7Ozs7O0lBQVYsVUFBVyxDQUFNLEVBQUUsS0FBVTtRQUMzQixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDeEI7S0FDRjs7Ozs7SUFFRCxrREFBVzs7OztJQUFYLFVBQVksUUFBZ0I7UUFDMUIsT0FBTyxRQUFRLEdBQUcsT0FBTztjQUNyQixDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUs7Y0FDcEMsQ0FBQyxRQUFRLEdBQUcsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDN0M7Ozs7SUFFRCx1REFBZ0I7OztJQUFoQjs7WUFDUSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN4RCxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO0tBQ0Y7Ozs7O0lBRUQsMkNBQUk7Ozs7SUFBSixVQUFLLEtBQVU7UUFDYixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEI7Ozs7O0lBRUQsZ0RBQVM7Ozs7SUFBVCxVQUFVLEtBQVU7UUFDbEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7S0FDeEM7O2dCQXZYRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLHV6SkEwRVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsa3ZCQUFrdkIsQ0FBQztpQkFDN3ZCOzs7O3lCQUVFLEtBQUs7OEJBR0wsS0FBSzs4QkFHTCxNQUFNO2lDQUdOLE1BQU07O0lBK1JULG1DQUFDO0NBQUE7Ozs7OztBQzFaRDtJQUlBO0tBTzBDOztnQkFQekMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3FCQUNiO29CQUNELFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO29CQUM1QyxPQUFPLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztpQkFDeEM7O0lBQ3dDLGdDQUFDO0NBQUE7Ozs7Ozs7Ozs7Ozs7OyJ9