export interface allUsersDetail{
    code:number;
    message:string;
    data : {
        totalCount: number,
        user:[
            {
                _id : string;
                name : string;
                email : string;
                city : string;
            }
        ]
    }
}

export interface deleteUSer{
    code: number;
    message: string;
    data: {
        _id : string;
        name: string;
        email: string;
        city: string;
    }
}

export interface updateUser{
    code: number;
    message: string;
    data: {
        _id : string;
        name: string;
        email: string;
        city: string;
    }
}

export interface getOneById{
    code: number;
    message: string;
    data: {
        _id : string;
        name: string;
        email: string;
        city: string;
    }
}

export interface addUser{
    code: number;
    message: string;
    data: {
        _id : string;
        name: string;
        email: string;
        city: string;
    }
}