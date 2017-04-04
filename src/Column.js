import React, {
  PropTypes,
  Component,
} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  rowContainer: {
    height: 50,
    borderColor: 'blue',
    borderWidth: 1,
  },
  rowText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

renderItem = ({ item, index }) => {
  return (
    <View
      key={index}
      style={styles.rowContainer}
    >
      <Text style={styles.rowText}>
        {item}
      </Text>
    </View>
  );
}

export default Column = (props) => {
  const { data } = props;

  return (
    <FlatList
      style={styles.container}
      data={data}
      bounces={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
}

Column.propTypes = {
  data: PropTypes.array,
};

Column.defaultProps = {
  data: [],
};
