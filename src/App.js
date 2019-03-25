import React, { Component } from "react";
import { Table, Tag,Input, Button, Icon, } from "antd";
import dataJson from "./data.json";
const { Column} = Table;

class App extends Component {
	state = {
		firstName: "",
		lastName:  "",
		profession: "",
		dataSource: []
	};
	componentDidMount() {
		this.setState({dataSource: dataJson})
	}
	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
							 setSelectedKeys, selectedKeys, confirm, clearFilters,
						 }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => { this.searchInput = node; }}
					placeholder={`Search ${dataIndex}`.toLowerCase()}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys,dataIndex, confirm)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, dataIndex,confirm)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button
					onClick={() => this.handleReset(clearFilters, dataIndex)}
					size="small"
					style={{ width: 90 }}
				>
					Reset
				</Button>
			</div>
		),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) => {
		    switch (dataIndex) {
                case 'firstName':
                    return record[dataIndex].toString().toLowerCase().includes(this.state.firstName);
                case 'lastName':
                    return record[dataIndex].toString().toLowerCase().includes(this.state.lastName);
                case 'profession':
                    return record[dataIndex].toString().toLowerCase().includes(this.state.profession);
                default:
                    break;
            }
		 /*   if(dataIndex === "firstName") return record[dataIndex].toString().toLowerCase().includes(this.state.firstName)
		else
		    if(dataIndex === "lastName")  return record[dataIndex].toString().toLowerCase().includes(this.state.lastName)
		else
		    if(dataIndex === "profession") return record[dataIndex].toString().toLowerCase().includes(this.state.profession)*/
		},
	})
	handleSearch = (selectedKeys,dataIndex, confirm) => {
		confirm();
		switch (dataIndex) {
            case 'firstName':
                this.setState({firstName: selectedKeys[0].toLowerCase()});
                break;
            case 'lastName':
                this.setState({lastName: selectedKeys[0].toLowerCase()});
                break;
            case 'profession':
                this.setState({profession: selectedKeys[0].split(" ").join().toLowerCase()})
                break;
            default:
                break;
        }
		/*if(dataIndex === 'firstName') this.setState({firstName: selectedKeys[0].toLowerCase()});
		else if(dataIndex === 'lastName') this.setState({lastName: selectedKeys[0].toLowerCase()});
		else if(dataIndex === 'profession') this.setState({profession: selectedKeys[0].split(" ").join().toLowerCase()})*/
	}
    handleReset = (clearFilters, dataIndex) => {
		clearFilters();
		switch (dataIndex) {
            case 'firstName':
                this.setState({firstName: ''});
                break;
            case 'lastName':
                this.setState({lasttName: ''});
                break;
            case 'profession':
                this.setState({profession: ''})
                break;
            default:
                break;
        }
		/*if(dataIndex === 'firstName'){ this.setState({firstName: ''});}
		else if(dataIndex === 'lastName'){ this.setState({lastName: ''});}
		else if(dataIndex === 'profession'){ this.setState({profession:''})}*/
	}

	render() {

		const a =(profession) => (typeof profession === "object")?
			profession.map(prof => <Tag color="blue" key={prof}>{prof}</Tag>):
			<Tag color="blue" key={profession}>{profession}</Tag>
		return (
         <div>
			<Table dataSource={this.state.dataSource} rowKey="id">
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
					render={profession => <span key={profession} >{a(profession)}</span>}
                    sorter = {(a,b) => {
                    if(typeof a.profession === "object" && typeof b.profession === "string")
                        return a.profession.join('').length - b.profession.length
                    else if(typeof b.profession === "object" && typeof a.profession === "string")
                        return a.profession.length - b.profession.join('').length
                    else if(typeof b.profession === "object" && typeof a.profession === "object")
                        return a.profession.join('').length - b.profession.join('').length
                    else if(typeof b.profession === "string" && typeof a.profession === "string")
                        return a.profession.length - b.profession.length
                    }}
					{...this.getColumnSearchProps('profession')}
				/>
			</Table>
		 </div>
		);
	}
}
export default App;