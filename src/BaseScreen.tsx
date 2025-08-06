/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigators from './navigators/TabNavigators';


const BaseScreen = () => {

    
    return (
        <NavigationContainer>

                  <TabNavigators /> 
        </NavigationContainer>
    );

};

export default BaseScreen;

