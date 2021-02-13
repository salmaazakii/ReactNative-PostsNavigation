import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { color } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  const getPostsFromAPI = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        navigation.navigate('Posts',{data:json})
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style={styles.mainBtn} onPress={()=> {
        getPostsFromAPI()
      }}>
        <Text style={{margin: 'auto',fontSize:16}} >Get Posts</Text>
      </TouchableOpacity>
    </View>
  );
}
function PostsScreen({route,navigation}) {
  const { data } = route.params;
  return (
    <FlatList data={data} keyExtractor={(ele,index) => index.toString()}
      renderItem={ ({item,index}) =>
        <View>
          <TouchableOpacity style={styles.postDec} onPress={()=> navigation.navigate('PostDetails',{data:item})} >
            <View style={styles.asRow}>
              <Image source={{uri : 'https://source.unsplash.com/random'}}
                style={styles.imgStyle} />
              <Text style={{margin:'auto'}}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        </View>    
    } />
  )
}
function ProfileScreen() {
  return (
    <View style={styles.profile}>
      <Text style={{margin: 'auto',fontSize:32,color:'darkblue',padding:20}} >My Profile</Text>
      <Image source={{uri : 'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png'}}
        style={styles.imgStyle} />
      <Text>Name : Salma Mohamed</Text>
      <Text>Posts : 12</Text>
      <Text>Last Activity at Feb 13 23:57 PM</Text>
    </View>
  );
}
function PostDetailsScreen({route}) {
  const { data } = route.params;
  return (
    <View style={styles.singlePost}>
        <Image source={{uri : 'https://source.unsplash.com/random'}}
                style={{width:100,height:150,resizeMode:'contain',marginBottom:10}} />
        <Text>{data.title}</Text>
        <Text >User: {data.userId}</Text>
        <Text >Post: {data.id}</Text>
        <Text> {data.body}</Text>
    </View>
  );
}
function Header() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerStyle : styles.header,
          headerTitle : 'BLOGPOST',
        }}/>
        <Stack.Screen name="Posts" component={PostsScreen} />
        <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      </Stack.Navigator>
  )
}
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{
      tabStyle:{backgroundColor : 'lightblue'},
      activeTintColor: 'black',
    }}>
      <Tab.Screen name="HomeStack" component={Header} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
        />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <AntDesign name="profile" size={24} color={color} />
          ),
        }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    backgroundColor : 'lightblue',
  },
  mainBtn : {
    width: 120,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'lightblue',
    color: 'black',
    textAlign : 'center',
  },
  postDec:{
    fontSize : 30,
    color: 'black'
  },
  imgStyle:{
    width:70,
    height:100,
    margin:10,
    resizeMode: 'contain'
  },
  asRow : {
    flexDirection: 'row',
    backgroundColor:'lightgrey',
    borderRadius: 30,
    margin : 20,
    padding : 20
  },
  singlePost :{
    flex: 1,
    alignItems: 'left',
    margin:'auto',
    justifyContent: 'center' 
  },
  profile : {
    margin : 'auto',
    color : 'darkblue'
  }
});
