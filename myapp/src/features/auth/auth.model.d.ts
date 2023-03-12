export interface claim {
    name: string;
    value: string;
}


export interface userCredentials {
    username: string;
    email: string;
    password: string;
}


export interface authenticationResponse {
    token: string;
    expiration: Date;
}