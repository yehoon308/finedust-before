import {Background, LoadingText} from '../Styles';
import Spinner from './spinner.gif';

const Loading = () => {
    return (
        <Background>
            <LoadingText>로딩중입니다...</LoadingText>
            <img src={Spinner} alt="로딩중.." width='5%' />
        </Background>
    )};
  
export default Loading;