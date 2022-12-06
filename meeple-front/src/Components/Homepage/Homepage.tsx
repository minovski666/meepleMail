import React, {useContext} from 'react'
import {myContext} from '../../Context';
import {IUser} from '../../types/maintypes';
import LandingHomePage from "./LandingHomePage";
import UserHomePage from "./UserHomePage";

export default function Homepage() {

    const userObject = useContext(myContext);
    if (!userObject){
        return '';
    }
    if(userObject){
        return   <UserHomePage />
    }else{
      return  <LandingHomePage/>
    }
}
