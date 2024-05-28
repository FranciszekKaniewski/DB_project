import {config} from "../config";

type methods = 'GET'|'POST'|'PATCH'|'DELETE'

export const Fetch = async (url:string,method?:methods,body?:any):Promise<any> => {
    const res = await fetch(`${config.backendURL}${url}`,{
        method: method ? method : 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    const resBody = await res.json()

    return resBody
}