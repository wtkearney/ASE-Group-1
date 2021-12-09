import { StyleSheet } from "react-native";

const colors = {
  highlightColor: "#FBC740",
  lightestColor: "#f0ebd8",
  midLightColor: "#748cab",
  midColor: "#3e5c76",
  midDarkColor: "#1d2d44",
  darkestColor: "#0d1321",
  danger: "#FF0000"
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: colors.darkestColor
  },
  calloutTitle : {
    // ...
  },
  calloutDescription : {
    // ...
  },

  fadingContainer: {
    backgroundColor: colors.darkestColor
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  splashScreenTitle : {
    color: colors.lightestColor,
    fontSize: 20
  },
  title : {
    fontFamily: 'Roboto-Bold',
    color: colors.lightestColor,
    fontSize: 20,
    paddingHorizontal: 40,
    paddingTop: 40
  },
    subtitle: {
      fontFamily: 'Roboto-Regular',
      color: colors.midLightColor,
      fontSize: 15,
      paddingHorizontal: 40,
      paddingVertical: 20
  },
  headerTouchableContainer: {
    paddingHorizontal: 5,
    flexDirection: 'row'
  },
  signOutText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    color: colors.midLightColor,
    flexShrink: 1
  },
  headerQuietText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.lightestColor,
    flexShrink: 1
  },
  headerLoudText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.highlightColor
  },
  listFooterComponentStyle: {
    marginTop: 25,
    paddingVertical: 25,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: colors.midDarkColor,
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 40
  },
  appButtonContainerDanger: {
    elevation: 8,
    backgroundColor: colors.danger,
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 40
  },
  appButtonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: colors.lightestColor,
    fontWeight: "bold",
    alignSelf: "center"
  },
  space: {
      width: 40,
      height: 40,
    },
  headerStyle: {
    fontFamily: 'Roboto-Bold',
    color: colors.lightestColor,
  },
  textInput: {
    fontFamily: 'Roboto-Regular',
    color: colors.lightestColor,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
    borderColor: "#4a4e69", // misty blue
    height: 50,
    marginHorizontal: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10
  },
  copyrightNotice : {
    color: colors.midColor,
    textAlign: "center",
    fontSize: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListTitle: {
    fontFamily: 'Roboto-Bold',
    color: colors.lightestColor,
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 20,
  },
  flatListValue: {
    fontFamily: 'Roboto-Regular',
    color: colors.lightestColor,
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 15,
  },
  flatListView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: colors.midColor,
    borderBottomWidth: 1
  },
  heatmapControlText: {
    fontFamily: 'Roboto-Bold',
    color: colors.darkestColor
  },
  heatmapControlIcons: {
    color: colors.darkestColor
  },
  heatmapControlView: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 150,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(13, 19, 33, 0.2)',
    borderRadius: 20
  }
});

export {styles, colors};