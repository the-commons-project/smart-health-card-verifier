export declare const schema: {
    $schema: string;
    $id: string;
    title: string;
    type: string;
    required: string[];
    properties: {
        iss: {
            $id: string;
            title: string;
            type: string;
        };
        nbf: {
            $id: string;
            title: string;
            type: string;
        };
        vc: {
            $id: string;
            title: string;
            type: string;
            required: string[];
            properties: {
                type: {
                    $id: string;
                    title: string;
                    type: string;
                    default: never[];
                    items: {
                        $id: string;
                        title: string;
                        type: string;
                        default: string;
                        examples: string[];
                        pattern: string;
                    };
                };
                credentialSubject: {
                    $id: string;
                    title: string;
                    type: string;
                    required: string[];
                    properties: {
                        fhirVersion: {
                            $id: string;
                            title: string;
                            type: string;
                            default: string;
                            examples: string[];
                            pattern: string;
                        };
                        fhirBundle: {
                            $id: string;
                            title: string;
                            $comment: string;
                            type: string;
                            default: string;
                        };
                    };
                };
            };
        };
    };
};
export declare function validate(jwsPayloadText: string): Promise<boolean>;
