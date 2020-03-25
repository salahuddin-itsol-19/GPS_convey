// @flow
import { StyleSheet, Dimensions } from "react-native";
import { Metrics, Images, Colors, Fonts } from '../../theme';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    searchBarView: {
        borderTopColor: "#ccc",
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#fff',
        paddingHorizontal: Metrics.ratio(30),
        paddingVertical: Metrics.ratio(10),
        shadowColor: Colors.black,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
    },

    floatingBtn: {
        backgroundColor: '#84CDFF',
        borderRadius: Metrics.ratio(30),
        padding: Metrics.ratio(5),
        margin: Metrics.ratio(5),
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
    }

    // darkModeBtn: {
    //     backgroundColor: '#fff',
    //     position: 'absolute',
    //     top: Dimensions.get('window').height * 0.8,
    //     left: Dimensions.get('window').width * 0.85,
    //     // right: Dimensions.get('window').width *0.8,
    //     width: 40,
    //     height: 40,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     zIndex: 99,
    //     borderRadius: 50,
    //     shadowColor: "rgba(255, 22, 84, 0.24)",
    //     shadowOffset: { width: 0, height: 9 },
    //     shadowOpacity: 1,
    //     shadowRadius: 20,
    //     elevation: 5
    // },
    // actionButtonIcon: {
    //     fontSize: 20,
    //     height: 22,
    // },
});
