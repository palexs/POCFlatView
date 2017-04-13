import React, {
  Component,
  PropTypes,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  showHideButton: {
    margin: 5,
    width: 150,
    borderColor: 'red',
    borderWidth: 1,
  },
  showHideButtonTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

const SHOW_ROWS = 'SHOW_ROWS';
const SHOW_COLUMNS = 'SHOW_COLUMNS';
const HIDE_ROWS = 'HIDE_ROWS';
const HIDE_COLUMNS = 'HIDE_COLUMNS';

export default class EnhancedFlatView extends Component {

  static propTypes = {
    dataSource: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.shouldShowRows = false;
    this.shouldShowColumns = false;

    const { dataSource } = props;

    this.state = {
      presentationDataSource: dataSource,
    };
  }

  retrieveColumnsDataFromDataSource = (dataSource) => {
    return {
      firstColumnData: dataSource[0],
      otherColumnsData: dataSource.slice(1, dataSource.length),
    };
  }

  constructPresentationDataSource = (dataSource, action) => {
    switch (action.type) {
      case SHOW_ROWS:
        return this.constructPresentationDataSourceForShowRows(action.indices, dataSource);
      case SHOW_COLUMNS:
        return this.constructPresentationDataSourceForShowColumns(action.indices, dataSource);
      case HIDE_ROWS:
        return this.constructPresentationDataSourceForHideRows(action.indices, dataSource);
      case HIDE_COLUMNS:
        return this.constructPresentationDataSourceForHideColumns(action.indices, dataSource);
      default:
        return dataSource;
    }
  }

  constructPresentationDataSourceForShowRows = (indices, presentationDataSource) => {
    const { dataSource } = this.props;
    const result = [...presentationDataSource];
    let j = 0;
    for (const row of presentationDataSource) {
      let copyRow = [...row];
      for (const index of indices) {
        const element = dataSource[j][index];
        copyRow = this.addElementAtIndex(copyRow, element, index);
      }
      result[j] = copyRow;
      j++;
    }
    return result;
  }

  addElementAtIndex = (row, element, index) => {
    const result = [...row];
    result.splice(index, 0, element);
    return result;
  }

  constructPresentationDataSourceForShowColumns = (indices, presentationDataSource) => {
    const { dataSource } = this.props;
    const result = [...presentationDataSource];
    for (const index of indices) {
      const element = dataSource[index];
      result.splice(index, 0, element);
    }
    return result;
  }

  constructPresentationDataSourceForHideRows = (indices, presentationDataSource) => {
    let i = 0;
    let result = [...presentationDataSource];
    for (const index of indices) {
      result = this.removeRowAtIndex(result, index - i);
      i++;
    }
    return result;
  }

  removeRowAtIndex = (dataSource, index) => {
    const result = [];
    for (const row of dataSource) {
      const copyRow = [...row];
      copyRow.splice(index, 1);
      result.push(copyRow);
    }
    return result;
  }

  constructPresentationDataSourceForHideColumns = (indices, presentationDataSource) => {
    const copyDataSource = [...presentationDataSource];
    let i = 0;
    for (const index of indices) {
      copyDataSource.splice(index - i, 1);
      i++;
    }
    return copyDataSource;
  }

  renderItem = ({ item, index }) => {
    return (
      <Column key={index} data={item} />
    );
  }

  updatePresentationDataSourceWithAction = (action) => {
    const presentationDataSource = this.constructPresentationDataSource(this.state.presentationDataSource, action);
    this.setState({ presentationDataSource });
  }

  onShowHideRows = () => {
    const indices = [1, 3, 5];
    if (!this.shouldShowRows) {
      this.hideRowsWithIndices(indices);
    } else {
      this.showRowsWithIndices(indices);
    }
    this.shouldShowRows = !this.shouldShowRows;
  }

  showRowsWithIndices = (indices) => {
    const action = { type: SHOW_ROWS, indices };
    this.updatePresentationDataSourceWithAction(action);
  }

  hideRowsWithIndices = (indices) => {
    const action = { type: HIDE_ROWS, indices };
    this.updatePresentationDataSourceWithAction(action);
  }

  onShowHideColumns = () => {
    const indices = [0, 2, 3, 5, 9];
    if (!this.shouldShowColumns) {
      this.hideColumnsWithIndices(indices);
    } else {
      this.showColumnsWithIndices(indices);
    }
    this.shouldShowColumns = !this.shouldShowColumns;
  }

  showColumnsWithIndices = (indices) => {
    const action = { type: SHOW_COLUMNS, indices };
    this.updatePresentationDataSourceWithAction(action);
  }

  hideColumnsWithIndices = (indices) => {
    const action = { type: HIDE_COLUMNS, indices };
    this.updatePresentationDataSourceWithAction(action);
  }

  renderControls = () => {
    return (
      <View style={styles.buttonsContainer}>
         <TouchableOpacity
           style={styles.showHideButton}
           onPress={this.onShowHideRows}
         >
           <Text style={styles.showHideButtonTitle}>Show/Hide Row</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.showHideButton}
           onPress={this.onShowHideColumns}
         >
           <Text style={styles.showHideButtonTitle}>Show/Hide Column</Text>
         </TouchableOpacity>
      </View>
    );
  }

  renderTableView = () => {
    const { firstColumnData, otherColumnsData } =
      this.retrieveColumnsDataFromDataSource(this.state.presentationDataSource);
    return (
      <ScrollView bounces={false}>
        <View style={styles.innerContainer}>
          <Column data={firstColumnData} />
          <FlatList
            data={otherColumnsData}
            horizontal
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderItem}
         />
       </View>
     </ScrollView>
    );
  }

  render = () => {
    const controls = this.renderControls();
    const table = this.renderTableView();
    return (
      <View style={styles.container}>
        {controls}
        {table}
      </View>
    );
  }

}
