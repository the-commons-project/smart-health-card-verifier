export declare const JwsValidationOptions: {
    skipJwksDownload: boolean;
    jwksDownloadTimeOut: number;
};
export declare function validate(jws: string): Promise<any>;
