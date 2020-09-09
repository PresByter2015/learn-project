declare module '*.json' {
    const value: string;
    export default value;
}
declare interface Tokens {
    accessToken: string
    refreshToken: string
}
export const version: string;

export interface HttpError {
    '400': string
    '401': string
    '403': string
    '404': string
    '406': string
    '410': string
    '422': string
    '500': string
    '502': string
    '503': string
    '504': string
}