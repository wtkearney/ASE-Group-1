import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, FlatList, Alert} from "react-native";
import {styles, colors} from "../../stylesheet";
import {useAuth} from '../contexts/Auth';
import {Ionicons} from '@expo/vector-icons';
import {AuthData, PostcodeData, priceData, heatmapData} from '../services/authService';


const PriceDetailsScreen = () => {
  const auth = useAuth();

  const [someVar, setSomeVar] = useState();

  const [currentPostcodeData, setCurrentPostcodeData] = useState<heatmapData>();

  useEffect(() => {
    // if (auth.currentPostCodeDetail) {
    //     updateSaleData(auth.currentPostCodeDetail);
    // }

    if (auth.currentPostCodeDetail && auth.heatmapData) {
        // get the object that matches the postcode; it *should* always be there.....
        var postcodeData = auth.heatmapData.find(x => x.areaCode === auth.currentPostCodeDetail);
        setCurrentPostcodeData(postcodeData);
        // console.log(postcodeData);
    }
  }, [auth.currentPostCodeDetail]);

          // priceData = {
        //     year: string;
        //     price: number;
        //     address: string;
        // }

        // export type heatmapData = {
        //     areaCode: string;
        //     average: number;
        //     latitude: number;
        //     longitude: number;
        //     data: Array<priceData>;
        //   }


//   const updateSaleData = async (postcode: string ) => {
//     // get postcode data entry from the heatmap data array
    
//   };
  if (currentPostcodeData && currentPostcodeData.data.length > 0) {

    return (
        <View style={styles.backgroundContainer}>
            <View style={styles.flatListHeader}>
                <Text style={styles.title}>Price Data for {auth.currentPostCodeDetail}</Text>
                <Text style={styles.subtitle}>Data is sorted by year</Text>
            </View>
    
          <FlatList
            scrollEnabled={true}
            data={currentPostcodeData?.data.sort((a, b) => b.year.localeCompare(a.year))}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.flatListView}>
                    <Text style={styles.flatListTitle}>Price: <Text style={styles.flatListValue}>{'\u00A3'}{item.price.toLocaleString()}</Text></Text>
                    <Text style={styles.flatListTitle}>Sale Year: <Text style={styles.flatListValue}>{item.year}</Text></Text>
                    <Text style={styles.flatListTitle}>Address: <Text style={styles.flatListValue}>{item.address}</Text></Text>
                </View>
            )}

          />
        </View>
    
    );
  } else {
      return (
        <View style={styles.backgroundContainer}>
            <Text style={styles.title}>There is no data available.</Text>

        </View>
      )
  }
  
};

export default PriceDetailsScreen;