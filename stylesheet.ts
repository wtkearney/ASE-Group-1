import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 20
    },
    title : {
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
        backgroundColor: "#009688",
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
      },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    space: {
        width: 20,
        height: 20,
      },
});

export default styles;