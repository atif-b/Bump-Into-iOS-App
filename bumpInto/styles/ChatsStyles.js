import styled from 'styled-components';

export const ChatBox = styled.View`
  background-color: #fff;
  padding: 7px;
  margin-bottom: 10px;
  flex: 2;
  align-content: center;
  padding-top: 30px;
`;

export const ChatTileUnread = styled.View`
  background-color: #afafff;
  padding: 10px;
  margin: 3px 15px 3px 15px;
  font-size: 20px;
  border-radius: 10px;
`;

export const ChatTileRead = styled.View`
  background-color: #f3f3f3;
  padding: 10px;
  margin: 3px 15px 3px 15px;
  font-size: 20px;
  border-radius: 10px;
`;

export const TileTxtMain = styled.Text`
  font-size: 26px;
`;

export const TileTxtSub = styled.Text`
  font-size: 18px;
  padding-left: 1px;
`;

export const PfpView = styled.View`
  flex: 1;
  width: 56px;
  height: 56px;
  border-radius: 50px;
  position: absolute;
  top: 8px;
  left: 280px;
`;

export const PfpImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 40px;
`;
