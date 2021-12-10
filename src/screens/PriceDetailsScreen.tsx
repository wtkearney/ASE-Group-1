import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from "react-native";
import { styles } from "../../stylesheet";
import { useAuth } from '../contexts/Auth';
import { markerData } from '../services/authService';

const PriceDetailsScreen = () => {
  const auth = useAuth();

  const [currentPostcodeData, setCurrentPostcodeData] = useState<markerData>();

  useEffect(() => {
    if (auth.currentPostCodeDetail && auth.markerData) {
      // get the object that matches the postcode; it *should* always be there.....
      var postcodeData = auth.markerData.find(x => x.areaCode === auth.currentPostCodeDetail);
      setCurrentPostcodeData(postcodeData);
    }
  }, [auth.currentPostCodeDetail]);

  if (currentPostcodeData && currentPostcodeData.data.length > 0) {
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.flatListHeader}>
          <Text style={styles.title}>Price Paid Data for {auth.currentPostCodeDetail}</Text>
          <Text style={styles.subtitle}>Sorted by year from latest to oldest.</Text>
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
        <Text style={styles.title}>Sorry, there is no available data.</Text>
      </View>
    );
  }
};

export default PriceDetailsScreen;