import React from 'react';
import { Image } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, Badge, Switch, View } from 'native-base'
import { AppLoading } from 'expo'
import fire from '../services/FireService';

export default class EntryTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      loading: true,
      isListed: (props.post) ? props.post.isListed : false
    }
    this._toggleGiveAway = this._toggleGiveAway.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ loading: false })
  }

  _toggleGiveAway = () => {
    this.setState(prevState => ({
      isListed: !prevState.isListed
    }), () => {
      console.log("ID", this.props.post.post_id);
      const {post_id} = this.props.post;

      const dbRef = fire.database().ref('/posts');

      dbRef
        .orderByChild('post_id')
        .equalTo(post_id)
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((child) => {
            child.key('isListed').update(this.state.isListed);
          });
        })
    })
  }


  render() {
    const { post } = this.props;

    if (this.state.loading) {
      return <AppLoading />
    } else {

      const formatTags = (
        <CardItem style={{flex: 1, flexWrap: 'wrap'}}>
        {
          post.tags.map((tag, index) => {
            if (parseFloat(tag.confidence) > 0.5) {
              return (
                <Badge key={tag.name} primary style={{margin: 3}}>
                  <Text key={tag.name}>{tag.name}</Text>
                </Badge>
              );
            }
          })
        }
        </CardItem>
      )

      return (
        <Card>
          <CardItem>
            <Left>
              <Thumbnail small source={{ uri: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' }} />
              <Text style={{ fontWeight: 'bold' }}>{post.owner}</Text>
            </Left>
            <Right>
              <Switch
                value={this.state.isListed}
                onValueChange={this._toggleGiveAway}
              />
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: post.image }} style={{ height: 200, width: null, flex: 1 }} />
          </CardItem>
          {
            (post) ? formatTags : null
          }
          {/* <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12</Text>
              </Button>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4</Text>
              </Button>
            </Left>

            <Right>
            <Text note>Offer ends in 12 hours</Text>
            </Right>
          </CardItem> */}
        </Card>
      );
    }

  }
}
