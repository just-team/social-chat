import {StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';

const {width, height} = Dimensions.get('window');
const Styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    flexCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexCol: {
        flexDirection: 'column'
    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    flexBetween: {
        justifyContent: 'space-between'
    },
    flexAround: {
        justifyContent: 'space-around'
    },
    flexStart: {
        justifyContent: 'flex-start'
    },
    fullWidth: {
        width: width
    },
    fullHeight: {
        height: height
    },
    selfCenter: {
        alignSelf: 'center'
    },
    selfBottom: {
        alignSelf: 'flex-end'
    },
    selfTop: {
        alignSelf: 'flex-start'
    },
    header: {
        height: 55,
        backgroundColor: 'gray',
        borderColor: 'black',
        borderBottomWidth: 1,
        width: width,
        padding: 10,
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 16
    },
    userMenu: {
        width: width,
        height: height,
        backgroundColor: 'gray'
    },
    bgWhite: {
        backgroundColor: 'white'
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
        height: 48
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    friendAvatar: {
        width: 32,
        height: 32,
        borderRadius: 24,
        marginRight: 10
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        borderColor: 'black',
        borderBottomWidth: 1,
        padding: 10,
    },
    userListName: {
        fontSize: 14
    },
    paddingLeft: {
        paddingLeft: 10
    },
    messageBox: {
        width: width,
        height: height - 70,
        backgroundColor: 'tan',
        borderColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 30
    },
    input: {
        width: width - 64,
        height: 64,
    },
    inputGroup: {
        position: 'absolute',
        bottom: 0,
        width: width,
        flexDirection: 'row',
        flexShrink: 1,
        backgroundColor: '#ffff',
        marginTop: 20
    },
    message: {
        backgroundColor: 'aqua',
        borderRadius: 20,
        padding: 10
    },
    bubble: {
        position: 'relative',
        padding: 10,
        backgroundColor: 'aqua',
        borderRadius: 10,
        paddingRight: 30,
        width: width/1.5,
        flex: 1,
        marginTop: 10

    },
    bubbleAfter: {
        position: 'absolute',
        borderWidth: 15,
        borderColor: 'black',
        zIndex: 1,
        left: -15,
        top: 45
    },
    bubbleRight: {
        alignSelf: 'flex-end'
    },
    bubbleImg: {
        position: 'absolute',
        bottom: 0,
        right: 1
    },
    bgDarkBlue: {
        backgroundColor: '#0077e5'
    }
});

export default Styles;