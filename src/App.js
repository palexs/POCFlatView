import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Column from './Column';
import { firstColumnData, listData } from './data';

import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  showHideButton: {
    margin: 5,
    width: 100,
    borderColor: 'red',
    borderWidth: 1,
    alignSelf: 'center',
  },
  showHideButtonTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = { showRow: false, firstColumnData, listData };
  }

  renderItem = ({ item, index }) => {
    return (
      <Column key={index} data={item} />
    );
  }

  onShowHide = () => {
    if (!this.state.showRow) {
      const filteredFirstColumnData = [...firstColumnData];
      filteredFirstColumnData.splice(1, 1);
      const filteredListData = [];
      for (const arr of listData) {
        const filteredArr = [...arr];
        filteredArr.splice(1, 1);
        filteredListData.push(filteredArr);
      }
      this.setState({
        firstColumnData: filteredFirstColumnData,
        listData: filteredListData,
      });
    } else {
      this.setState({
        firstColumnData,
        listData,
      });
    }

    this.setState({ showRow: !this.state.showRow });
  }

  render() {
    return (
      <View style={styles.container}>
         <ScrollView
          bounces={false}
         >
            <TouchableOpacity
              style={styles.showHideButton}
              onPress={this.onShowHide}
            >
              <Text style={styles.showHideButtonTitle}>Show/Hide</Text>
            </TouchableOpacity>
           <View style={styles.innerContainer}>
             <Column data={this.state.firstColumnData} />
             <FlatList
               data={this.state.listData}
               horizontal
               bounces={false}
               showsVerticalScrollIndicator={false}
               showsHorizontalScrollIndicator={false}
               renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

}
