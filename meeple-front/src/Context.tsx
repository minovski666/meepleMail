import React, {createContext, useContext, PropsWithChildren, useEffect, useState} from 'react'
import axios from 'axios';
import {AxiosResponse} from 'axios';

export const myContext = createContext({});
export default function Context(props: PropsWithChildren<any>) {

    const [userObject, setUserObject] = useState<any>(()=>{
        const localData = sessionStorage.getItem("user");
        return localData !== null ? JSON.parse(localData) : undefined
    });

    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';
    useEffect(() => {
        axios.get(url + "users/current-user",
            {withCredentials: true})
            .then((res: AxiosResponse) => {
                if (res.data) {
                    if (!res.data.isActive || !res.data.isVerified) {
                        sessionStorage.setItem('user', JSON.stringify(''));
                        setUserObject('')
                    } else {
                        sessionStorage.setItem('user', JSON.stringify(res.data));
                        setUserObject(res.data);
                    }
                }
            })
    }, [])
    return (
        <myContext.Provider value={userObject!}>{props.children}</myContext.Provider>
    )
}
