export interface VigenereRequest {
    password: string;
    message: string;
    inputMessage?: string;
}

export interface VigenereResponse {
    encoded?: string;
    decoded?: string;
}
