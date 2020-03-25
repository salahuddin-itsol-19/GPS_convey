// @flow
import { StyleSheet } from "react-native";
import { Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
    container: {
        flex: 1,
        
    
        
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#FFF",
        marginTop:Metrics.ratio(20),
        
        
    },
    name: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "800",
        marginVertical: 8,
        fontFamily:Fonts.type.bold
    },
    mail: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 14,
        marginRight: 4,
        fontFamily: Fonts.type.regular
    },
   

    listView: {
        height: Metrics.screenHeight * 0.08,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#66DAFF',
        
        // marginVertical: Metrics.ratio(15),
        // shadowColor: Colors.ash_grey,
        // shadowOffset: {
        //   width: 0,
        //   height: 0
        // },
        // shadowOpacity: 0.6,
        // shadowRadius: 0,
        // elevation: 2
      },
      listTitle:{
          color:"white",
          fontSize:16,
          fontFamily:Fonts.type.bold
      }
});
