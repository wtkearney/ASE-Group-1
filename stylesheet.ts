import { StyleSheet } from "react-native";



const colors = {
  highlightColor: "#FBC740", // gold
  lightestColor: "#f0ebd8",
  midLightColor: "#748cab",
  midColor: "#3e5c76",
  midDarkColor: "#1d2d44",
  darkestColor: "#0d1321"
}

const styles = StyleSheet.create({

    backgroundContainer: {
        flex: 1,
        backgroundColor: colors.darkestColor,
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    fadingContainer: {
      backgroundColor: colors.darkestColor,
    },

    map: {
      ...StyleSheet.absoluteFillObject,
    },
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    splashScreenTitle : {
      color: colors.lightestColor,
      fontSize: 20,
      // paddingHorizontal: 40,
      // paddingTop: 40,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    
    title : {
      fontFamily: 'Roboto-Bold',
      color: colors.lightestColor,
      fontSize: 20,
      paddingHorizontal: 40,
      paddingTop: 40,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    subtitle: {
      fontFamily: 'Roboto-Regular',
      color: colors.midLightColor,
      fontSize: 15,
      paddingHorizontal: 40,
      paddingVertical: 20
      // textAlign: 'left'
  },

    headerTouchableContainer: {
      paddingHorizontal: 5,
      flexDirection: 'row',
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

    appButtonContainer: {
        elevation: 8,
        backgroundColor: colors.midDarkColor,
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
        alignSelf: "center",
        // textTransform: "uppercase"
    },

    space: {
        width: 40,
        height: 40,
      },
      headerStyle: {

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
      }
});

export {styles, colors};