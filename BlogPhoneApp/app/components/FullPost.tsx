import React from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from './Card'; 

interface FullPostRouteProp extends RouteProp<HomeStackParamList, 'FullPost'> {}

interface IFullPostProps {
  route: FullPostRouteProp;
}

export default function FullPost({ route }: IFullPostProps) {
  const { postId } = route.params;

  return (
    <Text>Hello, this is the full post for post ID: {postId}</Text>
  );
}
