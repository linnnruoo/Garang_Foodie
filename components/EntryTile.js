import React from 'react';
import { Image } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, Badge } from 'native-base'
import { AppLoading } from 'expo'

export default class EntryTile extends React.Component {
  constructor() {
    super()
    this.state = { 
      loading: true 
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ loading: false })
  }


  render() {
    const { post } = this.props;

    if (this.state.loading) {
      return <AppLoading />
    } else {

      const formatTags = (
        <>
        {
          post.tags.map((tag, index) => {
            if (parseFloat(tag.confidence) > 0.5) {
              return (
                <Badge key={tag.name} primary style={{margin: 3, overflowX: 'auto'}}>
                  <Text key={tag.name}>{tag.name}</Text>
                </Badge>
              );
            }
          })
        }
        </>
      )

      return (
        <Card>
          <CardItem>
            <Left>
              <Thumbnail small source={{ uri: 'https://static1.squarespace.com/static/54f74f23e4b0952b4e0011c0/t/5ad5431e88251baeaac75f49/1523925845937/chris+hanna+bb.jpg' }} />
              <Text style={{ fontWeight: 'bold' }}>{post.owner}</Text>
            </Left>
            <Right>
              <Text note><Icon type="FontAwesome" name="map-marker" style={{ fontSize: 16, color: "gray" }} /> Tampines</Text>
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: post.image }} style={{ height: 200, width: null, flex: 1 }} />
          </CardItem>
          <CardItem>
          {
            (post) ? formatTags : null
          }
          </CardItem>
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
