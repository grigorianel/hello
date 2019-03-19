import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import dataJson from './data.json';
const { Column} = Table;



class App extends Component {
  render() {
      const a = (profession) => console.log(typeof profession , profession) ||( profession || []).map(prof => <Tag color="blue" key={prof}>{prof}</Tag>);
    return (
        <Table dataSource={dataJson}>
            <Column
                title="First Name"
                dataIndex="firstName"
                key="firstName"
            />
            <Column
                title="Last Name"
                dataIndex="lastName"
                key="lastName"
            />
        <Column
              title="Profession"
              dataIndex="profession"
              key="profession"
              render={profession => <span>{a(profession)}</span>}
          />
        </Table>
    );
  }
}

export default App;
