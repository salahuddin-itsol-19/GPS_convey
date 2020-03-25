// @flow
import { StyleSheet } from "react-native";
import { Images, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Metrics.ratio(5),
        width: Metrics.screenWidth * 0.35,
        paddingVertical: Metrics.ratio(10),
        paddingHorizontal: Metrics.ratio(8),
        borderRadius: Metrics.ratio(10),
        backgroundColor: '#D4513B',
    },
    socialButtonText: {
        color: '#fff',
        fontFamily: Fonts.type.regular,
        fontSize: Metrics.ratio(14),
        marginLeft: Metrics.ratio(10),
    }
});
