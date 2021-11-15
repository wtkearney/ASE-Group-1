import {apiService} from "./apiService";

export type AuthData = {
    token: string;
    email: string;
    name: string;
  };

const mockToken =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';

const signUp = (firstName: string, lastName: string, email: string, _password: string): Promise<AuthData> => {

    console.log("Calling signUp from authService...")
    console.log(firstName, lastName, email, _password);

    let data = apiService.createUser(firstName, lastName, email, _password);

    console.log("Data from user verification");
    console.log(data);

    return new Promise((resolve) => {
        resolve({
            token: mockToken,
            email: email,
            name: 'Will Kearney',
        });
    });

};

const signIn = (email: string, _password: string): Promise<AuthData> => {

    console.log("Calling signIn from authService...")
    console.log(email, _password);

    let data = apiService.verifyUser(email, _password)

    console.log("Data from user verification");
    console.log(data);

    // this is a mock of an API call, in a real app
    // will be need connect with some real API,
    // send email and password, and if credential is corret
    //the API will resolve with some token and another datas as the below
    return new Promise((resolve) => {
        resolve({
            token: mockToken,
            email: email,
            name: 'Will Kearney',
        });
    });
};
  
export const authService = {
    signIn,
    signUp
};
  
