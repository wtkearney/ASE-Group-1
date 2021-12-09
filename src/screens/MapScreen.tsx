import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParams';

import {ExportMap} from "../components/ExportMap";

// type mapScreenProp = StackNavigationProp<RootStackParamList, 'Map'>;

const MapScreen = () => {
  return (
    <ExportMap/>
  );
};

export default MapScreen;