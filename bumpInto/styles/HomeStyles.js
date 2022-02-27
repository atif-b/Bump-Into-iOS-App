import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

export const HomeBox = styled.View`
  background-color: #f4f4f4;
  padding: 7px;
  margin-bottom: 10px;
  flex: 2;
  align-content: center;
  padding-top: 30px;
`;

export const HomeBtn = styled.View`
  background-color: transparent;
  padding: 3px;
  margin: 15px;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
`;

export const BtnTxt = styled.Text`
  font-size: 36px;
`;

export const LogoutBtn = styled.Text`
  background-color: #222;
  color: #fff;
  box-shadow: 2px 1px 2px #333;
  font-size: 17px;
  padding: 10px;
  margin: 10px;
  flex-direction: row;
  align-items: center;
  text-align: center;
`;
