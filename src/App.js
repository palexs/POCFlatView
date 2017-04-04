import React, {
  Component,
} from 'react';

import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Column from './Column';
import { firstColumnData, listData } from './data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default class App extends Component {

  renderItem({ item, index }) {
    return (
      <Column key={index} data={item} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
         <ScrollView
          bounces={false}
         >
           <View style={styles.innerContainer}>
             <Column data={firstColumnData} />
             <FlatList
               data={listData}
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
