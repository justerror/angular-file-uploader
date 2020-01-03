(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-file-uploader', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['angular-file-uploader'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,i0,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AngularFileUploaderService = (function () {
        function AngularFileUploaderService() {
        }
        AngularFileUploaderService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        AngularFileUploaderService.ctorParameters = function () { return []; };
        /** @nocollapse */ AngularFileUploaderService.ngInjectableDef = i0.defineInjectable({ factory: function AngularFileUploaderService_Factory() { return new AngularFileUploaderService(); }, token: AngularFileUploaderService, providedIn: "root" });
        return AngularFileUploaderService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AngularFileUploaderComponent = (function () {
        function AngularFileUploaderComponent() {
            this.resetUpload = false;
            this.ApiResponse = new i0.EventEmitter();
            this.everythingDone = new i0.EventEmitter();
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
            { type: i0.Component, args: [{
                        selector: 'angular-file-uploader',
                        template: "<div class=\"container\" *ngIf=\"(theme !== 'attachPin')\" id=\"default\">\n\n    <!-- Drag n Drop theme Starts -->\n    <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\" [ngClass]=\"(hideSelectBtn && hideResetBtn) ? null : 'dragNDropBtmPad'\" class=\"dragNDrop\">\n        <div style=\"position:relative;\">\n            <div id=\"div1\" class=\"div1 afu-dragndrop-box\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\n                <p class=\"afu-dragndrop-text\">{{replaceTexts?.dragNDropBox}}</p>\n            </div>\n            <!-- <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span> -->\n        </div>\n    </div>\n    <!-- Drag n Drop theme Ends -->\n\n    <label for=\"sel{{id}}\" class=\"btn btn-primary btn-sm afu-select-btn\" *ngIf=\"!hideSelectBtn\">{{replaceTexts?.selectFileBtn}}</label>\n    <input type=\"file\" id=\"sel{{id}}\" style=\"display: none\" *ngIf=\"!hideSelectBtn\" (change)=\"onChange($event)\" title=\"Select file\"\n        name=\"files[]\" [accept]=formatsAllowed [attr.multiple]=\"multiple ? '' : null\" />\n    <button class=\"btn btn-info btn-sm resetBtn afu-reset-btn\" (click)=\"resetFileUpload()\" *ngIf=\"!hideResetBtn\">{{replaceTexts?.resetBtn}}</button>\n    <br *ngIf=\"!hideSelectBtn\">\n    <p class=\"constraints-info afu-constraints-info\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize *1024000))}}</p>\n    <!--Selected file list-->\n    <div class=\"row afu-valid-file\" *ngFor=\"let sf of selectedFiles;let i=index\" >\n        <p class=\"col-xs-3 textOverflow\"><span class=\"text-primary\">{{sf.name}}</span></p>\n        <p class=\"col-xs-3 padMarg sizeC\"><strong>({{convertSize(sf.size)}})</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n        <!--  <input class=\"col-xs-3 progress caption\"  type=\"text\"  placeholder=\"Caption..\"  [(ngModel)]=\"Caption[i]\"  *ngIf=\"uploadClick\"/> -->\n        <div class=\"progress col-xs-3 padMarg afu-progress-bar\" *ngIf=\"singleFile && progressBarShow && !hideProgressBar\">\n            <span class=\"progress-bar progress-bar-success\" role=\"progressbar\" [ngStyle]=\"{'width':percentComplete+'%'}\">{{percentComplete}}%</span>\n        </div>\n        <a class=\"col-xs-1\" role=\"button\" (click)=\"removeFile(i,'sf')\" *ngIf=\"uploadClick\"><i class=\"fa fa-times\"></i></a>\n    </div>\n    <!--Invalid file list-->\n    <div class=\"row text-danger afu-invalid-file\" *ngFor=\"let na of notAllowedList;let j=index\">\n        <p class=\"col-xs-3 textOverflow\"><span>{{na['fileName']}}</span></p>\n        <p class=\"col-xs-3 padMarg sizeC\"><strong>({{na['fileSize']}})</strong></p>\n        <p class=\"col-xs-3 \">{{na['errorMsg']}}</p>\n        <a class=\"col-xs-1 delFileIcon\" role=\"button\" (click)=\"removeFile(j,'na')\" *ngIf=\"uploadClick\">&nbsp;<i class=\"fa fa-times\"></i></a>\n    </div>\n\n    <p *ngIf=\"uploadMsg\" class=\"{{uploadMsgClass}} + afu-upload-status\">{{uploadMsgText}}<p>\n    <div *ngIf=\"!singleFile && progressBarShow && !hideProgressBar\">\n        <div class=\"progress col-xs-4 padMarg afu-progress-bar\">\n            <span class=\"progress-bar progress-bar-success\" role=\"progressbar\" [ngStyle]=\"{'width':percentComplete+'%'}\">{{percentComplete}}%</span>\n        </div>\n        <br>\n        <br>\n    </div>\n    <button class=\"btn btn-success afu-upload-btn\" type=\"button\" (click)=\"uploadFiles()\" [disabled]=!uploadBtn>{{replaceTexts?.uploadBtn}}</button>\n    <br>\n</div>\n\n<!--/////////////////////////// ATTACH PIN THEME  //////////////////////////////////////////////////////////-->\n<div *ngIf=\"theme == 'attachPin'\" id=\"attachPin\">\n    <div style=\"position:relative;padding-left:6px\">\n        <a class='btn up_btn afu-attach-pin' (click)=\"attachpinOnclick()\">\n          {{replaceTexts?.attachPinBtn}}\n            <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            <!-- <p style=\"margin-top:10px\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize * 1024000))}}</p> -->\n            <input type=\"file\" id=\"sel{{id}}\" (change)=\"onChange($event)\" style=\"display: none\" title=\"Select file\" name=\"files[]\" [accept]=formatsAllowed\n                [attr.multiple]=\"multiple ? '' : null\" />\n            <br>\n        </a>\n        &nbsp;\n        <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span>\n    </div>\n</div>\n\n<!--/////////////////////////// DRAG N DROP THEME  //////////////////////////////////////////////////////////-->\n<!-- <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\">\n  <div style=\"position:relative;padding-left:6px\">\n    <div id=\"div1\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\n      <p>Drag N Drop</p>\n    </div>\n    <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span>\n  </div>\n</div> -->\n",
                        styles: [".constraints-info{margin-top:10px;font-style:italic}.padMarg{padding:0;margin-bottom:0}.caption{margin-right:5px}.textOverflow{white-space:nowrap;padding-right:0;overflow:hidden;text-overflow:ellipsis}.up_btn{color:#000;background-color:transparent;border:2px solid #5c5b5b;border-radius:22px}.delFileIcon{text-decoration:none;color:#ce0909}.dragNDrop .div1{display:border-box;border:2px dashed #5c5b5b;height:6rem;width:20rem}.dragNDrop .div1>p{text-align:center;font-weight:700;color:#5c5b5b;margin-top:1.4em}.dragNDropBtmPad{padding-bottom:2rem}@media screen and (max-width:620px){.caption{padding:0}}@media screen and (max-width:510px){.sizeC{width:25%}}@media screen and (max-width:260px){.caption,.sizeC{font-size:10px}}.resetBtn{margin-left:3px}"],
                    },] },
        ];
        AngularFileUploaderComponent.ctorParameters = function () { return []; };
        AngularFileUploaderComponent.propDecorators = {
            config: [{ type: i0.Input }],
            resetUpload: [{ type: i0.Input }],
            ApiResponse: [{ type: i0.Output }],
            everythingDone: [{ type: i0.Output }]
        };
        return AngularFileUploaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AngularFileUploaderModule = (function () {
        function AngularFileUploaderModule() {
        }
        AngularFileUploaderModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.AngularFileUploaderService = AngularFileUploaderService;
    exports.AngularFileUploaderComponent = AngularFileUploaderComponent;
    exports.AngularFileUploaderModule = AngularFileUploaderModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1maWxlLXVwbG9hZGVyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci1maWxlLXVwbG9hZGVyL2xpYi9hbmd1bGFyLWZpbGUtdXBsb2FkZXIuc2VydmljZS50cyIsbnVsbCwibmc6Ly9hbmd1bGFyLWZpbGUtdXBsb2FkZXIvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItZmlsZS11cGxvYWRlci9saWIvYW5ndWxhci1maWxlLXVwbG9hZGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaWxlVXBsb2FkZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBSZXBsYWNlVGV4dHMge1xuICBzZWxlY3RGaWxlQnRuOiBzdHJpbmc7XG4gIHJlc2V0QnRuOiBzdHJpbmc7XG4gIHVwbG9hZEJ0bjogc3RyaW5nO1xuICBkcmFnTkRyb3BCb3g6IHN0cmluZztcbiAgYXR0YWNoUGluQnRuOiBzdHJpbmc7XG4gIGFmdGVyVXBsb2FkTXNnX3N1Y2Nlc3M6IHN0cmluZztcbiAgYWZ0ZXJVcGxvYWRNc2dfZXJyb3I6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlsZVVwbG9hZGVyQ29uZmlnIHtcbiAgdXBsb2FkQVBJOiB7IHVybDogc3RyaW5nOyBtZXRob2Q/OiBzdHJpbmc7IGhlYWRlcnM/OiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH07IH07XG5cbiAgdGhlbWU/OiBzdHJpbmc7XG4gIGlkPzogbnVtYmVyO1xuICBoaWRlUHJvZ3Jlc3NCYXI/OiBib29sZWFuO1xuICBoaWRlUmVzZXRCdG4/OiBib29sZWFuO1xuICBoaWRlU2VsZWN0QnRuPzogYm9vbGVhbjtcbiAgbWF4U2l6ZT86IG51bWJlcjtcbiAgZm9ybWF0c0FsbG93ZWQ/OiBzdHJpbmc7XG4gIG11bHRpcGxlPzogYm9vbGVhbjtcbiAgb25lRmlsZVBlclJlcXVlc3Q/OiBib29sZWFuO1xuICBrZXk/OiBzdHJpbmc7XG4gIHJlcGxhY2VUZXh0cz86IFJlcGxhY2VUZXh0cztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGxvYWRJbmZvIHtcbiAgeGhyOiBYTUxIdHRwUmVxdWVzdDtcbiAgZm9ybURhdGE6IEZvcm1EYXRhO1xuICBpbnhzOiBudW1iZXJbXTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5ndWxhci1maWxlLXVwbG9hZGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCIgKm5nSWY9XCIodGhlbWUgIT09ICdhdHRhY2hQaW4nKVwiIGlkPVwiZGVmYXVsdFwiPlxuXG4gICAgPCEtLSBEcmFnIG4gRHJvcCB0aGVtZSBTdGFydHMgLS0+XG4gICAgPGRpdiAqbmdJZj1cInRoZW1lID09ICdkcmFnTkRyb3AnXCIgaWQ9XCJkcmFnTkRyb3BcIiBbbmdDbGFzc109XCIoaGlkZVNlbGVjdEJ0biAmJiBoaWRlUmVzZXRCdG4pID8gbnVsbCA6ICdkcmFnTkRyb3BCdG1QYWQnXCIgY2xhc3M9XCJkcmFnTkRyb3BcIj5cbiAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO1wiPlxuICAgICAgICAgICAgPGRpdiBpZD1cImRpdjFcIiBjbGFzcz1cImRpdjEgYWZ1LWRyYWduZHJvcC1ib3hcIiAoZHJvcCk9XCJkcm9wKCRldmVudClcIiAoZHJhZ292ZXIpPVwiYWxsb3dEcm9wKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImFmdS1kcmFnbmRyb3AtdGV4dFwiPnt7cmVwbGFjZVRleHRzPy5kcmFnTkRyb3BCb3h9fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSA8c3BhbiBjbGFzcz0nbGFiZWwgbGFiZWwtaW5mbycgaWQ9XCJ1cGxvYWQtZmlsZS1pbmZve3tpZH19XCI+e3tzZWxlY3RlZEZpbGVzWzBdPy5uYW1lfX08L3NwYW4+IC0tPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIERyYWcgbiBEcm9wIHRoZW1lIEVuZHMgLS0+XG5cbiAgICA8bGFiZWwgZm9yPVwic2Vse3tpZH19XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtIGFmdS1zZWxlY3QtYnRuXCIgKm5nSWY9XCIhaGlkZVNlbGVjdEJ0blwiPnt7cmVwbGFjZVRleHRzPy5zZWxlY3RGaWxlQnRufX08L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwic2Vse3tpZH19XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgKm5nSWY9XCIhaGlkZVNlbGVjdEJ0blwiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIHRpdGxlPVwiU2VsZWN0IGZpbGVcIlxuICAgICAgICBuYW1lPVwiZmlsZXNbXVwiIFthY2NlcHRdPWZvcm1hdHNBbGxvd2VkIFthdHRyLm11bHRpcGxlXT1cIm11bHRpcGxlID8gJycgOiBudWxsXCIgLz5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIGJ0bi1zbSByZXNldEJ0biBhZnUtcmVzZXQtYnRuXCIgKGNsaWNrKT1cInJlc2V0RmlsZVVwbG9hZCgpXCIgKm5nSWY9XCIhaGlkZVJlc2V0QnRuXCI+e3tyZXBsYWNlVGV4dHM/LnJlc2V0QnRufX08L2J1dHRvbj5cbiAgICA8YnIgKm5nSWY9XCIhaGlkZVNlbGVjdEJ0blwiPlxuICAgIDxwIGNsYXNzPVwiY29uc3RyYWludHMtaW5mbyBhZnUtY29uc3RyYWludHMtaW5mb1wiPih7e2Zvcm1hdHNBbGxvd2VkfX0pIFNpemUgbGltaXQtIHt7KGNvbnZlcnRTaXplKG1heFNpemUgKjEwMjQwMDApKX19PC9wPlxuICAgIDwhLS1TZWxlY3RlZCBmaWxlIGxpc3QtLT5cbiAgICA8ZGl2IGNsYXNzPVwicm93IGFmdS12YWxpZC1maWxlXCIgKm5nRm9yPVwibGV0IHNmIG9mIHNlbGVjdGVkRmlsZXM7bGV0IGk9aW5kZXhcIiA+XG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgdGV4dE92ZXJmbG93XCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIj57e3NmLm5hbWV9fTwvc3Bhbj48L3A+XG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgcGFkTWFyZyBzaXplQ1wiPjxzdHJvbmc+KHt7Y29udmVydFNpemUoc2Yuc2l6ZSl9fSk8L3N0cm9uZz4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L3A+XG4gICAgICAgIDwhLS0gIDxpbnB1dCBjbGFzcz1cImNvbC14cy0zIHByb2dyZXNzIGNhcHRpb25cIiAgdHlwZT1cInRleHRcIiAgcGxhY2Vob2xkZXI9XCJDYXB0aW9uLi5cIiAgWyhuZ01vZGVsKV09XCJDYXB0aW9uW2ldXCIgICpuZ0lmPVwidXBsb2FkQ2xpY2tcIi8+IC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MgY29sLXhzLTMgcGFkTWFyZyBhZnUtcHJvZ3Jlc3MtYmFyXCIgKm5nSWY9XCJzaW5nbGVGaWxlICYmIHByb2dyZXNzQmFyU2hvdyAmJiAhaGlkZVByb2dyZXNzQmFyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3VjY2Vzc1wiIHJvbGU9XCJwcm9ncmVzc2JhclwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOnBlcmNlbnRDb21wbGV0ZSsnJSd9XCI+e3twZXJjZW50Q29tcGxldGV9fSU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YSBjbGFzcz1cImNvbC14cy0xXCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJyZW1vdmVGaWxlKGksJ3NmJylcIiAqbmdJZj1cInVwbG9hZENsaWNrXCI+PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT48L2E+XG4gICAgPC9kaXY+XG4gICAgPCEtLUludmFsaWQgZmlsZSBsaXN0LS0+XG4gICAgPGRpdiBjbGFzcz1cInJvdyB0ZXh0LWRhbmdlciBhZnUtaW52YWxpZC1maWxlXCIgKm5nRm9yPVwibGV0IG5hIG9mIG5vdEFsbG93ZWRMaXN0O2xldCBqPWluZGV4XCI+XG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgdGV4dE92ZXJmbG93XCI+PHNwYW4+e3tuYVsnZmlsZU5hbWUnXX19PC9zcGFuPjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyBwYWRNYXJnIHNpemVDXCI+PHN0cm9uZz4oe3tuYVsnZmlsZVNpemUnXX19KTwvc3Ryb25nPjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyBcIj57e25hWydlcnJvck1zZyddfX08L3A+XG4gICAgICAgIDxhIGNsYXNzPVwiY29sLXhzLTEgZGVsRmlsZUljb25cIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInJlbW92ZUZpbGUoaiwnbmEnKVwiICpuZ0lmPVwidXBsb2FkQ2xpY2tcIj4mbmJzcDs8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvYT5cbiAgICA8L2Rpdj5cblxuICAgIDxwICpuZ0lmPVwidXBsb2FkTXNnXCIgY2xhc3M9XCJ7e3VwbG9hZE1zZ0NsYXNzfX0gKyBhZnUtdXBsb2FkLXN0YXR1c1wiPnt7dXBsb2FkTXNnVGV4dH19PHA+XG4gICAgPGRpdiAqbmdJZj1cIiFzaW5nbGVGaWxlICYmIHByb2dyZXNzQmFyU2hvdyAmJiAhaGlkZVByb2dyZXNzQmFyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcyBjb2wteHMtNCBwYWRNYXJnIGFmdS1wcm9ncmVzcy1iYXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci1zdWNjZXNzXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6cGVyY2VudENvbXBsZXRlKyclJ31cIj57e3BlcmNlbnRDb21wbGV0ZX19JTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGJyPlxuICAgIDwvZGl2PlxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYWZ1LXVwbG9hZC1idG5cIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZEZpbGVzKClcIiBbZGlzYWJsZWRdPSF1cGxvYWRCdG4+e3tyZXBsYWNlVGV4dHM/LnVwbG9hZEJ0bn19PC9idXR0b24+XG4gICAgPGJyPlxuPC9kaXY+XG5cbjwhLS0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gQVRUQUNIIFBJTiBUSEVNRSAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy0tPlxuPGRpdiAqbmdJZj1cInRoZW1lID09ICdhdHRhY2hQaW4nXCIgaWQ9XCJhdHRhY2hQaW5cIj5cbiAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjZweFwiPlxuICAgICAgICA8YSBjbGFzcz0nYnRuIHVwX2J0biBhZnUtYXR0YWNoLXBpbicgKGNsaWNrKT1cImF0dGFjaHBpbk9uY2xpY2soKVwiPlxuICAgICAgICAgIHt7cmVwbGFjZVRleHRzPy5hdHRhY2hQaW5CdG59fVxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wYXBlcmNsaXBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8IS0tIDxwIHN0eWxlPVwibWFyZ2luLXRvcDoxMHB4XCI+KHt7Zm9ybWF0c0FsbG93ZWR9fSkgU2l6ZSBsaW1pdC0ge3soY29udmVydFNpemUobWF4U2l6ZSAqIDEwMjQwMDApKX19PC9wPiAtLT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwic2Vse3tpZH19XCIgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgdGl0bGU9XCJTZWxlY3QgZmlsZVwiIG5hbWU9XCJmaWxlc1tdXCIgW2FjY2VwdF09Zm9ybWF0c0FsbG93ZWRcbiAgICAgICAgICAgICAgICBbYXR0ci5tdWx0aXBsZV09XCJtdWx0aXBsZSA/ICcnIDogbnVsbFwiIC8+XG4gICAgICAgICAgICA8YnI+XG4gICAgICAgIDwvYT5cbiAgICAgICAgJm5ic3A7XG4gICAgICAgIDxzcGFuIGNsYXNzPSdsYWJlbCBsYWJlbC1pbmZvJyBpZD1cInVwbG9hZC1maWxlLWluZm97e2lkfX1cIj57e3NlbGVjdGVkRmlsZXNbMF0/Lm5hbWV9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIERSQUcgTiBEUk9QIFRIRU1FICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLS0+XG48IS0tIDxkaXYgKm5nSWY9XCJ0aGVtZSA9PSAnZHJhZ05Ecm9wJ1wiIGlkPVwiZHJhZ05Ecm9wXCI+XG4gIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6NnB4XCI+XG4gICAgPGRpdiBpZD1cImRpdjFcIiAoZHJvcCk9XCJkcm9wKCRldmVudClcIiAoZHJhZ292ZXIpPVwiYWxsb3dEcm9wKCRldmVudClcIj5cbiAgICAgIDxwPkRyYWcgTiBEcm9wPC9wPlxuICAgIDwvZGl2PlxuICAgIDxzcGFuIGNsYXNzPSdsYWJlbCBsYWJlbC1pbmZvJyBpZD1cInVwbG9hZC1maWxlLWluZm97e2lkfX1cIj57e3NlbGVjdGVkRmlsZXNbMF0/Lm5hbWV9fTwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj4gLS0+XG5gLFxuICBzdHlsZXM6IFtgLmNvbnN0cmFpbnRzLWluZm97bWFyZ2luLXRvcDoxMHB4O2ZvbnQtc3R5bGU6aXRhbGljfS5wYWRNYXJne3BhZGRpbmc6MDttYXJnaW4tYm90dG9tOjB9LmNhcHRpb257bWFyZ2luLXJpZ2h0OjVweH0udGV4dE92ZXJmbG93e3doaXRlLXNwYWNlOm5vd3JhcDtwYWRkaW5nLXJpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LnVwX2J0bntjb2xvcjojMDAwO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjJweCBzb2xpZCAjNWM1YjViO2JvcmRlci1yYWRpdXM6MjJweH0uZGVsRmlsZUljb257dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6I2NlMDkwOX0uZHJhZ05Ecm9wIC5kaXYxe2Rpc3BsYXk6Ym9yZGVyLWJveDtib3JkZXI6MnB4IGRhc2hlZCAjNWM1YjViO2hlaWdodDo2cmVtO3dpZHRoOjIwcmVtfS5kcmFnTkRyb3AgLmRpdjE+cHt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXdlaWdodDo3MDA7Y29sb3I6IzVjNWI1YjttYXJnaW4tdG9wOjEuNGVtfS5kcmFnTkRyb3BCdG1QYWR7cGFkZGluZy1ib3R0b206MnJlbX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjYyMHB4KXsuY2FwdGlvbntwYWRkaW5nOjB9fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTEwcHgpey5zaXplQ3t3aWR0aDoyNSV9fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MjYwcHgpey5jYXB0aW9uLC5zaXplQ3tmb250LXNpemU6MTBweH19LnJlc2V0QnRue21hcmdpbi1sZWZ0OjNweH1gXSxcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KClcbiAgY29uZmlnOiBBbmd1bGFyRmlsZVVwbG9hZGVyQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIHJlc2V0VXBsb2FkID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIEFwaVJlc3BvbnNlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKVxuICBldmVyeXRoaW5nRG9uZTogRXZlbnRFbWl0dGVyPFVwbG9hZEluZm9bXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFVwbG9hZEluZm9bXT4oKTtcblxuICB0aGVtZTogc3RyaW5nO1xuICBpZDogbnVtYmVyO1xuICBoaWRlUHJvZ3Jlc3NCYXI6IGJvb2xlYW47XG4gIG1heFNpemU6IG51bWJlcjtcbiAgdXBsb2FkQVBJOiBzdHJpbmc7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBmb3JtYXRzQWxsb3dlZDogc3RyaW5nO1xuICBmb3JtYXRzQWxsb3dlZExpc3Q6IHN0cmluZ1tdID0gbnVsbDtcbiAgbXVsdGlwbGU6IGJvb2xlYW47XG4gIGhlYWRlcnM6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgaGlkZVJlc2V0QnRuOiBib29sZWFuO1xuICBoaWRlU2VsZWN0QnRuOiBib29sZWFuO1xuICBvbmVGaWxlUGVyUmVxdWVzdDogYm9vbGVhbjtcbiAga2V5OiBzdHJpbmc7XG4gIHJlZzogUmVnRXhwID0gLyg/OlxcLihbXi5dKykpPyQvO1xuICBzZWxlY3RlZEZpbGVzOiBGaWxlW10gPSBbXTtcbiAgbm90QWxsb3dlZExpc3Q6IHsgZmlsZU5hbWU6IHN0cmluZzsgZmlsZVNpemU6IHN0cmluZzsgZXJyb3JNc2c6IHN0cmluZzsgfVtdID0gW107XG4gIENhcHRpb246IHN0cmluZ1tdID0gW107XG4gIHNpbmdsZUZpbGUgPSB0cnVlO1xuICBwcm9ncmVzc0JhclNob3cgPSBmYWxzZTtcbiAgdXBsb2FkQnRuID0gZmFsc2U7XG4gIHVwbG9hZE1zZyA9IGZhbHNlO1xuICBhZnRlclVwbG9hZCA9IGZhbHNlO1xuICB1cGxvYWRDbGljayA9IHRydWU7XG4gIHVwbG9hZE1zZ1RleHQ6IHN0cmluZztcbiAgdXBsb2FkTXNnQ2xhc3M6IHN0cmluZztcbiAgcGVyY2VudENvbXBsZXRlOiBudW1iZXI7XG4gIHJlcGxhY2VUZXh0cztcbiAgY3VycmVudFVwbG9hZHM6IFVwbG9hZEluZm9bXSA9IFtdO1xuXG4gIHByaXZhdGUgaWREYXRlOiBudW1iZXIgPSArbmV3IERhdGUoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5jb25maWcgJiYgdGhpcy5jb25maWcpIHtcbiAgICAgIHRoaXMudGhlbWUgPSB0aGlzLmNvbmZpZy50aGVtZSB8fCAnJztcbiAgICAgIHRoaXMuaWQgPVxuICAgICAgICB0aGlzLmNvbmZpZy5pZCB8fFxuICAgICAgICBwYXJzZUludCgodGhpcy5pZERhdGUgLyAxMDAwMCkudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdLCAxMCkgK1xuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCkgKiAxMDAwMDtcbiAgICAgIHRoaXMuaGlkZVByb2dyZXNzQmFyID0gdGhpcy5jb25maWcuaGlkZVByb2dyZXNzQmFyIHx8IGZhbHNlO1xuICAgICAgdGhpcy5oaWRlUmVzZXRCdG4gPSB0aGlzLmNvbmZpZy5oaWRlUmVzZXRCdG4gfHwgZmFsc2U7XG4gICAgICB0aGlzLmhpZGVTZWxlY3RCdG4gPSB0aGlzLmNvbmZpZy5oaWRlU2VsZWN0QnRuIHx8IGZhbHNlO1xuICAgICAgdGhpcy5tYXhTaXplID0gdGhpcy5jb25maWcubWF4U2l6ZSB8fCAyMDtcbiAgICAgIHRoaXMudXBsb2FkQVBJID0gdGhpcy5jb25maWcudXBsb2FkQVBJLnVybDtcbiAgICAgIHRoaXMubWV0aG9kID0gdGhpcy5jb25maWcudXBsb2FkQVBJLm1ldGhvZCB8fCAnUE9TVCc7XG4gICAgICB0aGlzLmZvcm1hdHNBbGxvd2VkID1cbiAgICAgICAgdGhpcy5jb25maWcuZm9ybWF0c0FsbG93ZWQgfHwgJy5qcGcsLnBuZywucGRmLC5kb2N4LC50eHQsLmdpZiwuanBlZyc7XG4gICAgICB0aGlzLmZvcm1hdHNBbGxvd2VkTGlzdCA9IG51bGw7XG4gICAgICB0aGlzLm11bHRpcGxlID0gdGhpcy5jb25maWcubXVsdGlwbGUgfHwgZmFsc2U7XG4gICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmNvbmZpZy51cGxvYWRBUEkuaGVhZGVycyB8fCB7fTtcbiAgICAgIHRoaXMub25lRmlsZVBlclJlcXVlc3QgPSAhIXRoaXMuY29uZmlnLm9uZUZpbGVQZXJSZXF1ZXN0O1xuICAgICAgdGhpcy5rZXkgPSB0aGlzLmNvbmZpZy5rZXkgfHwgJ2ZpbGUnO1xuICAgICAgY29uc3QgZGVmYXVsdFJlcGxhY2VUZXh0c1ZhbHVlczogUmVwbGFjZVRleHRzID0ge1xuICAgICAgICBzZWxlY3RGaWxlQnRuOiB0aGlzLm11bHRpcGxlID8gJ1NlbGVjdCBGaWxlcycgOiAnU2VsZWN0IEZpbGUnLFxuICAgICAgICByZXNldEJ0bjogJ1Jlc2V0JyxcbiAgICAgICAgdXBsb2FkQnRuOiAnVXBsb2FkJyxcbiAgICAgICAgZHJhZ05Ecm9wQm94OiAnRHJhZyBOIERyb3AnLFxuICAgICAgICBhdHRhY2hQaW5CdG46IHRoaXMubXVsdGlwbGUgPyAnQXR0YWNoIEZpbGVzLi4uJyA6ICdBdHRhY2ggRmlsZS4uLicsXG4gICAgICAgIGFmdGVyVXBsb2FkTXNnX3N1Y2Nlc3M6ICdTdWNjZXNzZnVsbHkgVXBsb2FkZWQgIScsXG4gICAgICAgIGFmdGVyVXBsb2FkTXNnX2Vycm9yOiAnVXBsb2FkIEZhaWxlZCAhJyxcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5jb25maWcucmVwbGFjZVRleHRzKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRzID0ge1xuICAgICAgICAgIC4uLmRlZmF1bHRSZXBsYWNlVGV4dHNWYWx1ZXMsXG4gICAgICAgICAgLi4udGhpcy5jb25maWcucmVwbGFjZVRleHRzLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlVGV4dHMgPSB7Li4uZGVmYXVsdFJlcGxhY2VUZXh0c1ZhbHVlc307XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMucmVzZXRVcGxvYWQpIHtcbiAgICAgIGlmIChjaGFuZ2VzLnJlc2V0VXBsb2FkLmN1cnJlbnRWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnJlc2V0RmlsZVVwbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gIH1cblxuICByZXNldEZpbGVVcGxvYWQoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gW107XG4gICAgdGhpcy5DYXB0aW9uID0gW107XG4gICAgdGhpcy5ub3RBbGxvd2VkTGlzdCA9IFtdO1xuICAgIHRoaXMudXBsb2FkTXNnID0gZmFsc2U7XG4gICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcbiAgfVxuXG4gIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLm5vdEFsbG93ZWRMaXN0ID0gW107XG4gICAgaWYgKHRoaXMuYWZ0ZXJVcGxvYWQgfHwgIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcyA9IFtdO1xuICAgICAgdGhpcy5DYXB0aW9uID0gW107XG4gICAgICB0aGlzLmFmdGVyVXBsb2FkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9ybWF0c0FsbG93ZWRMaXN0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmZvcm1hdHNBbGxvd2VkTGlzdCA9IHRoaXMuZm9ybWF0c0FsbG93ZWQuc3BsaXQoJy4nKS5tYXAoeCA9PiB4LnNwbGl0KCcsJylbMF0udHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIGxldCBmaWxlTGlzdDogRmlsZUxpc3Q7XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkcm9wJykge1xuICAgICAgZmlsZUxpc3QgPSBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVMaXN0ID0gZXZlbnQudGFyZ2V0LmZpbGVzIHx8IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRGaWxlRXh0ID0gdGhpcy5yZWcuZXhlYyhmaWxlTGlzdFtpXS5uYW1lKVsxXTtcbiAgICAgIGNvbnN0IGN1cnJlbnRGaWxlRXh0TG93ZXIgPSBjdXJyZW50RmlsZUV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgZnJtdEFsbG93ZWQgPSB0aGlzLmZvcm1hdHNBbGxvd2VkTGlzdC5zb21lKHggPT4geCA9PT0gY3VycmVudEZpbGVFeHRMb3dlcik7XG5cbiAgICAgIGlmIChmcm10QWxsb3dlZCkge1xuICAgICAgICBpZiAoZmlsZUxpc3RbaV0uc2l6ZSA+IHRoaXMubWF4U2l6ZSAqIDEwMjQwMDApIHtcbiAgICAgICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnB1c2goe1xuICAgICAgICAgICAgZmlsZU5hbWU6IGZpbGVMaXN0W2ldLm5hbWUsXG4gICAgICAgICAgICBmaWxlU2l6ZTogdGhpcy5jb252ZXJ0U2l6ZShmaWxlTGlzdFtpXS5zaXplKSxcbiAgICAgICAgICAgIGVycm9yTXNnOiAnSW52YWxpZCBzaXplJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkRmlsZXMucHVzaChmaWxlTGlzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubm90QWxsb3dlZExpc3QucHVzaCh7XG4gICAgICAgICAgZmlsZU5hbWU6IGZpbGVMaXN0W2ldLm5hbWUsXG4gICAgICAgICAgZmlsZVNpemU6IHRoaXMuY29udmVydFNpemUoZmlsZUxpc3RbaV0uc2l6ZSksXG4gICAgICAgICAgZXJyb3JNc2c6ICdJbnZhbGlkIGZvcm1hdCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IHRydWU7XG4gICAgICBpZiAodGhpcy50aGVtZSA9PT0gJ2F0dGFjaFBpbicpIHtcbiAgICAgICAgdGhpcy51cGxvYWRGaWxlcygpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnVwbG9hZE1zZyA9IGZhbHNlO1xuICAgIHRoaXMudXBsb2FkQ2xpY2sgPSB0cnVlO1xuICAgIHRoaXMucGVyY2VudENvbXBsZXRlID0gMDtcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSBudWxsO1xuICB9XG5cbiAgdXBsb2FkRmlsZXMoKSB7XG4gICAgdGhpcy5wcm9ncmVzc0JhclNob3cgPSB0cnVlO1xuICAgIHRoaXMudXBsb2FkQ2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLm5vdEFsbG93ZWRMaXN0ID0gW107XG4gICAgbGV0IGlzRXJyb3IgPSBmYWxzZTtcblxuICAgIHRoaXMuc2luZ2xlRmlsZSA9IHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGggPD0gMTtcblxuICAgIHRoaXMuY3VycmVudFVwbG9hZHMgPSBbXTtcblxuICAgIGlmICh0aGlzLm9uZUZpbGVQZXJSZXF1ZXN0ICYmICF0aGlzLnNpbmdsZUZpbGUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5mb3JFYWNoKChzZWxlY3RlZEZpbGUsIGlueCkgPT4ge1xuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgICAvLyBBZGQgZGF0YSB0byBiZSBzZW50IGluIHRoaXMgcmVxdWVzdFxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAgdGhpcy5DYXB0aW9uW2lueF0gfHwgdGhpcy5rZXksXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzW2lueF0sXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VXBsb2Fkcy5wdXNoKHt4aHI6IHhociwgZm9ybURhdGE6IGZvcm1EYXRhLCBpbnhzOiBbaW54XX0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgLy8gQWRkIGRhdGEgdG8gYmUgc2VudCBpbiB0aGlzIHJlcXVlc3RcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5mb3JFYWNoKChzZWxlY3RlZEZpbGUsIGlueCkgPT4ge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAgdGhpcy5DYXB0aW9uW2lueF0gfHwgdGhpcy5rZXkgKyAodGhpcy5zaW5nbGVGaWxlID8gJycgOiBpbngpLFxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlc1tpbnhdLFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY3VycmVudFVwbG9hZHMucHVzaCh7eGhyOiB4aHIsIGZvcm1EYXRhOiBmb3JtRGF0YSwgaW54czogdGhpcy5zZWxlY3RlZEZpbGVzLm1hcCgoc2VsZWN0ZWRGaWxlLCBpbngpID0+IGlueCl9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0b3RhbFVwbG9hZHMgPSB0aGlzLmN1cnJlbnRVcGxvYWRzLmxlbmd0aDtcblxuICAgIHRoaXMuY3VycmVudFVwbG9hZHMuZm9yRWFjaCgodXBsb2FkOiBVcGxvYWRJbmZvLCB1cGxvYWRJbngpID0+IHtcbiAgICAgIGNvbnN0IHhociA9IHVwbG9hZC54aHI7XG5cbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBldm50ID0+IHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCAmJiB4aHIuc3RhdHVzICE9PSAyMDEpIHtcbiAgICAgICAgICAgIGlzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0JhclNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZE1zZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFmdGVyVXBsb2FkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTXNnVGV4dCA9IHRoaXMucmVwbGFjZVRleHRzLmFmdGVyVXBsb2FkTXNnX2Vycm9yO1xuICAgICAgICAgICAgdGhpcy51cGxvYWRNc2dDbGFzcyA9ICd0ZXh0LWRhbmdlciBsZWFkJztcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5BcGlSZXNwb25zZS5lbWl0KHhocik7XG4gICAgICAgICAgaWYgKHVwbG9hZElueCArIDEgPT09IHRvdGFsVXBsb2Fkcykge1xuICAgICAgICAgICAgdGhpcy5ldmVyeXRoaW5nRG9uZS5lbWl0KHRoaXMuY3VycmVudFVwbG9hZHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gZXZudCA9PiB7XG4gICAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7IC8vIGJ1dHRvbiBzaG91bGQgYmUgZGlzYWJsZWQgYnkgcHJvY2VzcyB1cGxvYWRpbmdcbiAgICAgICAgaWYgKGV2bnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnREb25lID0gKGV2bnQubG9hZGVkIC8gZXZudC50b3RhbCk7XG4gICAgICAgICAgdGhpcy5wZXJjZW50Q29tcGxldGUgPSBNYXRoLnJvdW5kKCh1cGxvYWRJbnggKyBjdXJyZW50RG9uZSkgKiAxMDAgLyB0b3RhbFVwbG9hZHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB4aHIub25sb2FkID0gZXZudCA9PiB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBsb2FkTXNnID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IHRydWU7XG4gICAgICAgIGlmICghaXNFcnJvcikge1xuICAgICAgICAgIGlmICh1cGxvYWRJbnggKyAxID09PSB0b3RhbFVwbG9hZHMpIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkTXNnVGV4dCA9IHRoaXMucmVwbGFjZVRleHRzLmFmdGVyVXBsb2FkTXNnX3N1Y2Nlc3M7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZE1zZ0NsYXNzID0gJ3RleHQtc3VjY2VzcyBsZWFkJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dFVwbG9hZCA9IHRoaXMuY3VycmVudFVwbG9hZHNbdXBsb2FkSW54ICsgMV07XG4gICAgICAgICAgICBuZXh0VXBsb2FkLnhoci5zZW5kKG5leHRVcGxvYWQuZm9ybURhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnBlcmNlbnRDb21wbGV0ZSA9IE1hdGgucm91bmQoKHVwbG9hZElueCArIDEpICogMTAwIC8gdG90YWxVcGxvYWRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXBsb2FkQVBJLCB0cnVlKTtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuaGVhZGVycykpIHtcbiAgICAgICAgLy8gT2JqZWN0LmtleXMgd2lsbCBnaXZlIGFuIEFycmF5IG9mIGtleXNcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCB0aGlzLmhlYWRlcnNba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIGNvbnN0IGZpcnN0VXBsb2FkID0gdGhpcy5jdXJyZW50VXBsb2Fkc1swXTtcbiAgICBmaXJzdFVwbG9hZC54aHIuc2VuZChmaXJzdFVwbG9hZC5mb3JtRGF0YSk7XG4gIH1cblxuICByZW1vdmVGaWxlKGk6IGFueSwgc2ZfbmE6IGFueSkge1xuICAgIGlmIChzZl9uYSA9PT0gJ3NmJykge1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzLnNwbGljZShpLCAxKTtcbiAgICAgIHRoaXMuQ2FwdGlvbi5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm90QWxsb3dlZExpc3Quc3BsaWNlKGksIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnRTaXplKGZpbGVTaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlU2l6ZSA8IDEwMjQwMDBcbiAgICAgID8gKGZpbGVTaXplIC8gMTAyNCkudG9GaXhlZCgyKSArICcgS0InXG4gICAgICA6IChmaWxlU2l6ZSAvIDEwMjQwMDApLnRvRml4ZWQoMikgKyAnIE1CJztcbiAgfVxuXG4gIGF0dGFjaHBpbk9uY2xpY2soKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWwnICsgdGhpcy5pZCk7XG4gICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgIGVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG4gIH1cblxuICBkcm9wKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMub25DaGFuZ2UoZXZlbnQpO1xuICB9XG5cbiAgYWxsb3dEcm9wKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2FuZ3VsYXItZmlsZS11cGxvYWRlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0FuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQW5ndWxhckZpbGVVcGxvYWRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpbGVVcGxvYWRlck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRXZlbnRFbWl0dGVyIiwidHNsaWJfMS5fX3ZhbHVlcyIsIkNvbXBvbmVudCIsIklucHV0IiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7eUNBSkQ7S0FRQzs7SUNSRDs7Ozs7Ozs7Ozs7Ozs7QUFjQSxJQWVPLElBQUksUUFBUSxHQUFHO1FBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLGtCQUFrQixDQUFDO1lBQzNDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hGO1lBQ0QsT0FBTyxDQUFDLENBQUM7U0FDWixDQUFBO1FBQ0QsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUE7QUFFRCxzQkFrRXlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFD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