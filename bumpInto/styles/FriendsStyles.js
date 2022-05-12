import styled from 'styled-components';

export const FriendsBox = styled.View`
  background-color: #fff;
  padding: 7px;
  margin-bottom: 10px;
  flex: 2;
  align-content: center;
  padding-top: 15px;
`;

export const FriendRow = styled.View`
  flex-direction: row;
`;

export const FriendTile = styled.View`
  background-color: #f3f3f3;
  padding: 10px;
  margin: 3px 15px 3px 15px;
  border-radius: 10px;
`;

export const TileTxtMain = styled.Text`
  font-size: 24px;
  padding-left: 60px;
  padding-bottom: 20px;
  top: 10px;
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
  bottom: 5px;
  left: 10px;
`;

export const PfpImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 40px;
`;

export const MessageIcon = styled.TouchableOpacity`
  left: 300px;
  bottom: 20px;
  position: absolute;
`;

export const FriendRequestBox = styled.TouchableOpacity`
  padding: 15px;
`;
