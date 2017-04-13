import React, {
  Component,
} from 'react';

import EnhancedFlatView from './EnhancedFlatView';
import { dataSource } from './data';

export default class App extends Component {

  render() {
    return (
      <EnhancedFlatView dataSource={dataSource} />
    );
  }

}
