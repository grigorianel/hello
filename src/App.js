import React, { Component } from "react";
import { Table, Tag,Input, Button, Icon, } from "antd";
import Highlighter from 'react-highlight-words';
import dataJson from "./data.json";
const { Column} = Table;

class App extends Component {
	state = {
		searchText: null,
	};
	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
							 setSelectedKeys, selectedKeys, confirm, clearFilters,
						 }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => { this.searchInput = node; }}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button
					onClick={() => this.handleReset(clearFilters)}
					size="small"
					style={{ width: 90 }}
				>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: (text) => (
			<Highlighter
				highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		),
	})

	handleSearch = (selectedKeys, confirm) => {
		confirm();
		this.setState({ searchText: selectedKeys[0]});
	}

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: '' });
	}

	render() {
		const a =(profession) => (typeof profession === "object")?
			profession.map(prof => <Tag color="blue" key={prof}>{prof}</Tag>):
			<Tag color="blue" key={profession}>{profession}</Tag>;
		function getarray(a, b){
			console.log(a.profession,88888, b.profession, 5555)
			let x = [];
			let y = [];
			let z = [];
			for(let i =0; i < a.profession.length; ++i)
			{   console.log(typeof a.profession[i],"blaaaa")
				typeof a.profession[i] === "object" ? a.profession[i].map(it => x.push(it))
					: y.push(a.profession[i]);

			}
			z = y.join("");
			console.log(z,33333)
			console.log(x,1111);
			console.log(y,2222);
			console.log(x.concat(z).sort(),"sorted");
			return x.concat(z).sort();

		}
		return (
         <div>
			<Table dataSource={dataJson}>
				<Column
					title="First Name"
					dataIndex="firstName"
					key="firstName"
					sorter ={(a, b) =>(a.firstName.length - b.firstName.length)}
					{...this.getColumnSearchProps('firstName')}
				/>
				<Column
					title="Last Name"
					dataIndex="lastName"
					key="lastName"
					sorter ={(a, b) => a.lastName.length - b.lastName.length}
					{...this.getColumnSearchProps('lastName')}
				/>
				<Column
					title="Profession"
					dataIndex="profession"
					key="profession"
					render={profession => <span>{a(profession)}</span>}
					sorter ={(a, b)=> getarray(a,b)}
					{...this.getColumnSearchProps('profession')}
				/>
			</Table>
		 </div>
		);
	}
}


export default App;