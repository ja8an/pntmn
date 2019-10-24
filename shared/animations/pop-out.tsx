import posed from 'react-native-pose';

const PopOut = posed.View({
    visible: {
        scale: 1
    },
    hidden: {
        scale: 0
    }
});

export default ({ isVisible }) => (
    <PopOut pose={isVisible} />
);