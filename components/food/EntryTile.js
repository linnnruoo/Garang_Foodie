import React from 'react';
import { Image } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base'
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
    if (this.state.loading) {
      return <AppLoading />
    } else {
      return (
        <Card>
          <CardItem>
            <Left>
              <Thumbnail small source={{ uri: 'https://static1.squarespace.com/static/54f74f23e4b0952b4e0011c0/t/5ad5431e88251baeaac75f49/1523925845937/chris+hanna+bb.jpg' }} />
              <Text style={{ fontWeight: 'bold' }}>John Doe</Text>
            </Left>
            <Right>
              <Text note><Icon type="FontAwesome" name="map-marker" style={{ fontSize: 16, color: "gray" }} /> Tampines</Text>
            </Right>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: 'https://media.karousell.com/media/photos/products/2015/03/18/limited_edition_white_fudge_covered_oreo_1426653062_a61da08a.jpg' }} style={{ height: 200, width: null, flex: 1 }} />
          </CardItem>
          <CardItem>
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

            {/* <Right>
            <Text note>Offer ends in 12 hours</Text>
            </Right> */}
          </CardItem>
        </Card>
      );
    }

  }
}
