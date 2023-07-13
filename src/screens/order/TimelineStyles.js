import { StyleSheet } from "react-native";
import { DarkTheme, LightTheme } from '../../constants/ColorTheme'


const styles = StyleSheet.create({
  dividedItem: {
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselectedInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgb(81 102 207)',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeline: {
    flexDirection: 'column',
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 5,
    height: '100%',

    position: 'absolute',
    top: '19%',
    bottom: 0,
    marginLeft: 0,
  },
  circle: {
    width: 140,
    height: 40,
    borderWidth: 4,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: 'white',
    top: 5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightItem: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: LightTheme.item,
    borderRadius: 10,
    width: '100%',
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,

  },
  lightItem1: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: LightTheme.item1,
    borderRadius: 10,
    width: '100%',
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,

  },
  lightItem2: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: LightTheme.item2,
    borderRadius: 10,
    width: '100%',
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,

  },
  darkItem: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: DarkTheme.item,
    borderRadius: 10,
    width: '100%',
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,

  },
  darkItem1: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: DarkTheme.item1,
    borderRadius: 10,
    width: '100%',
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,

  },
  darkItem2: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: DarkTheme.item2,
    borderRadius: 10,
    width: '100%',
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,

  },
  content: {
    marginLeft: 0,
    padding: 2,
  },
  title: {
    fontSize: 13,
    marginBottom: 2,
    fontFamily: 'Montserrat_700Bold'
  },
  infoDesc: {
    fontSize: 11,
    marginBottom: 2,
    color: 'black',
    fontFamily: 'Montserrat_500Medium_Italic'
  },
  dscBar: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: 'center',
    fontFamily: 'Montserrat_600SemiBold'
  },
  description: {
    fontSize: 12,
    marginBottom: 2,

    fontFamily: 'Montserrat_600SemiBold'
  },
  timestamp: {
    fontSize: 14,
  },
  itemLeft: {
    alignItems: 'flex-start',
    marginBottom: 10,
    borderRadius: 10,
    width: '46%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0,
    marginTop: 20,
    left: 0,
    marginRight: '52%',
  },

  itemRight: {
    alignItems: 'flex-start',
    marginBottom: 10,
    borderRadius: 10,
    width: '46%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0,
    marginTop: 20,
    right: -5,
    marginLeft: '48%',
  },
});

export default styles