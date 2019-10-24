import posed from 'react-native-pose';

const FadeIn = posed.View({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
});

export default ({ isVisible }) => (
    <FadeIn pose={isVisible ? 'visible' : 'hidden'} />
);