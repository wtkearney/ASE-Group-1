import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    backgroundContainer: {
        flex: 1,
        backgroundColor: '#F4EBD0',
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 20
    },
    subtitle: {
        color: "#122620",
        fontSize: 15,
        textAlign: 'left'
    },
    title : {
        color: "#122620",
        fontSize: 45,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: -400
    },
    status : {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#122620",
        borderRadius: 40,
        paddingVertical: 15,
        paddingHorizontal: 20,
      },
    appButtonText: {
        fontSize: 18,
        color: "#F4EBD0",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

    alreadyHaveAccountContainer: {
        elevation: 8,
        // backgroundColor: "#F4EBD0",
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
      },
    
      alreadyHaveAccountText: {
        fontSize: 15,
        elevation: 8,
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
      },

      alreadyHaveAccountHighlightText: {
        elevation: 8,
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
      },


    space: {
        width: 40,
        height: 40,
      },
      input: {
        borderRadius: 10,
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      }
});

export default styles;