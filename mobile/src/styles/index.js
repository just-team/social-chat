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
    },
    input: {
        width: width - 64,
        height: 64
    },
    inputGroup: {
        position: 'absolute',
        bottom: 0,
        width: width,
        flexDirection: 'row',
        flexShrink: 1
    },
    message: {
        backgroundColor: 'aqua',
        borderRadius: 20,
        padding: 10
    }
});

export default Styles;