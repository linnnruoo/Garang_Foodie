import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Icon, Container, Content, Text } from 'native-base'
import { AppLoading } from 'expo'
import fire from '../services/FireService';
import _ from 'lodash';
import MyEntryTile from './MyEntryTile';

export default class MyList extends React.Component {
  constructor() {
    super()
    this.state = { 
      loading: true,
      posts: []
    }
  }
  
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon type="FontAwesome" name="spoon" style={{ color: tintColor }} />
    )
  }

  componentDidMount = () => {
    let temp = [];
    let childPromises = [];

    
    const user = fire.auth().currentUser;
    const storeRef = fire.storage().ref().child('images/');
    const dbRef = fire.database().ref('/posts');

    dbRef
      .orderByChild('user_id')
      .equalTo(user.uid)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          childPromises.push(storeRef.child(child.val().image).getDownloadURL());
          temp.push(child.val());
        });

        Promise.all(childPromises).then((response) => {
          for (let i = 0; i< response.length; i++){
            temp[i].image = response[i];
          }
          this.setState(() => ({
            posts: temp,
          }));
        });
      })
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    
    this.setState({ loading: false })
    
  }

  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      return <AppLoading />
    } else {
      return (
        <Container>
          <Content>
          {
            (this.state.posts).map((post, index) => {
              return (<MyEntryTile key={index} post={post} />)
            })
          }
          {
            (_.isEmpty(this.state.posts)) ? (
              <View style={styles.container}>
                <Text style={{fontSize: 20, color: '#ffb238'}}>You have not created any food item!</Text>
              </View>
            ) : null
          }
          </Content>
          <TouchableOpacity onPress={() => navigation.navigate('CVTest') } style={styles.addButton}>
            <Icon name="add" style={styles.icon} />
          </TouchableOpacity>
        </Container>
      );
    }
  }
}



const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 20,
    backgroundColor: '#FFB238',
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  icon: {
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
