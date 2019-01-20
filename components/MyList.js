import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Container } from 'native-base'
import { AppLoading } from 'expo'
import fire from '../services/FireService';

export default class MyList extends React.Component {
  constructor() {
    super()
    this.state = { 
      loading: true 
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

    const storeRef = fire.storage().ref().child('images/');
    const dbRef = fire.database().ref('/posts');

    dbRef.once('value').then((snapshot) => {
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
    }, () => {
      this.setState({ loading: false })
    })
    
  }

  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      return <AppLoading />
    } else {
      return (
        <Container>
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
    backgroundColor: '#e91e62',
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  icon: {
    color: '#fff',
  }
});
