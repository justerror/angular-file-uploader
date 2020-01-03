import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export interface ReplaceTexts {
    selectFileBtn: string;
    resetBtn: string;
    uploadBtn: string;
    dragNDropBox: string;
    attachPinBtn: string;
    afterUploadMsg_success: string;
    afterUploadMsg_error: string;
}
export interface AngularFileUploaderConfig {
    uploadAPI: {
        url: string;
        method?: string;
        headers?: {
            [id: string]: string;
        };
    };
    theme?: string;
    id?: number;
    hideProgressBar?: boolean;
    hideResetBtn?: boolean;
    hideSelectBtn?: boolean;
    maxSize?: number;
    formatsAllowed?: string;
    multiple?: boolean;
    oneFilePerRequest?: boolean;
    key?: string;
    replaceTexts?: ReplaceTexts;
}
export interface UploadInfo {
    xhr: XMLHttpRequest;
    formData: FormData;
    inxs: number[];
}
export declare class AngularFileUploaderComponent implements OnInit, OnChanges {
    config: AngularFileUploaderConfig;
    resetUpload: boolean;
    ApiResponse: EventEmitter<{}>;
    everythingDone: EventEmitter<UploadInfo[]>;
    theme: string;
    id: number;
    hideProgressBar: boolean;
    maxSize: number;
    uploadAPI: string;
    method: string;
    formatsAllowed: string;
    formatsAllowedList: string[];
    multiple: boolean;
    headers: {
        [id: string]: string;
    };
    hideResetBtn: boolean;
    hideSelectBtn: boolean;
    oneFilePerRequest: boolean;
    key: string;
    reg: RegExp;
    selectedFiles: File[];
    notAllowedList: {
        fileName: string;
        fileSize: string;
        errorMsg: string;
    }[];
    Caption: string[];
    singleFile: boolean;
    progressBarShow: boolean;
    uploadBtn: boolean;
    uploadMsg: boolean;
    afterUpload: boolean;
    uploadClick: boolean;
    uploadMsgText: string;
    uploadMsgClass: string;
    percentComplete: number;
    replaceTexts: any;
    currentUploads: UploadInfo[];
    private idDate;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    resetFileUpload(): void;
    onChange(event: any): void;
    uploadFiles(): void;
    removeFile(i: any, sf_na: any): void;
    convertSize(fileSize: number): string;
    attachpinOnclick(): void;
    drop(event: any): void;
    allowDrop(event: any): void;
}
