import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';

const Route = () => {
    return (
        <NavigationContainer>
            <AuthStack/>
        </NavigationContainer>
    )
}