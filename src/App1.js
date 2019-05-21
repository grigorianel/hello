import React, { Component } from "react";
import { Table, Tag,Input, Button, Icon, } from "antd";
import dataJson from "./data.json";

class App1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            sortedInfo: null,
            pagination: null,
            searchedText: {
                firstName: [],
                lastName: [],
                profession: []
            },
            originalSource: [],
            filteredSource: [],
        }
    }
    componentDidMount() {
        this.setState({ originalSource: dataJson,filteredSource: dataJson })
    }
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: () => (
            <div style={{ padding: 8 }}>
                    <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`.toLowerCase()}
                    value={this.state.searchedText[dataIndex]}
                    onChange={e => {console.log(e.target.value,"targetvalue");
                        this.setState({
                        searchedText: {
                            ...this.state.searchedText,
                            [dataIndex]: e.target.value ? e.target.value : [],
                        }} ,() => console.log(this.state.searchedText[dataIndex],dataIndex,"value"))}}
                    onPressEnter={() => this.handleSearch(this.state.searchedText[dataIndex],dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}/>
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(this.state.searchedText[dataIndex],dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(dataIndex)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: () => <Icon type="search" />,
    })
  handleSearch = (value,dataIndex) => {
        console.log("handleSearch", typeof value, 3636);
        if(dataIndex === 'firstName'){
                this.setState({filteredSource: this.state.originalSource.filter(temp =>temp.firstName.toLowerCase().startsWith(value.toString().toLowerCase()))},
                    ()=> console.log(this.state.filteredSource,"booo"))
        }
        else if(dataIndex === "lastName"){
                this.setState({filteredSource: this.state.originalSource.filter(temp =>temp.lastName.toLowerCase().startsWith(value.toString().toLowerCase()))},
                ()=> console.log(this.state.filteredSource,"booo"))
        }
        else if(dataIndex === 'profession'){
            let a = [];
            for(let i = 0; i < this.state.originalSource.length; ++i){
                console.log( this.state.originalSource[i].profession.toString().split(" ").join().toLowerCase(), "gfdfdfd");
                if(this.state.originalSource[i].profession.toString().toLowerCase().includes(value.toString().split(" ").join().toLowerCase())){
                    a.push(this.state.originalSource[i]);
                }
            }
            console.log(a, "fdfdfd")
            this.setState({filteredSource: a}, () => console.log(this.state.filteredSource, "boooo"))
        }

    }
 /*   handleSearch = (firstName, lastName, profession) => {
        function prof() {
            let a = [];
            for(let i = 0; i < this.state.originalSource.length; ++i){
                console.log( this.state.originalSource[i].profession.toString().split(" ").join().toLowerCase(), "gfdfdfd");
                if(this.state.originalSource[i].profession.toString().toLowerCase().includes(value.toString().split(" ").join().toLowerCase())){
                    a.push(this.state.originalSource[i]);
                }
            }
            console.log(a, "fdfdfd")
            this.setState({filteredSource: a}, () => console.log(this.state.filteredSource, "boooo"))
        }

        console.log("mta stex", 520)
        this.setState({
            filteredSource: this.state.originalSource.filter(temp =>temp.firstName.toLowerCase().startsWith(value.toString().toLowerCase()))
                .filter(temp =>temp.lastName.toLowerCase().startsWith(value.toString().toLowerCase())).filter(prof)
        })


}*/
   handleChange = (pagination, filter, sorter) => {
        console.log("hasa stex", pagination, 5555, filter,9999,sorter,45888);
        this.setState({
            sortedInfo: sorter,
            pagination: pagination
        }, () => console.log(this.state.pagination, 444, this.state.sortedInfo,2222))
    }
    handleReset = (dataIndex) => {
        console.log(this.state.searchedText, dataIndex,"frerer");
        this.setState({filteredSource: this.state.originalSource,
            searchedText: {
                ...this.state.searchedText,
                [dataIndex]: '',
        }});
    }
        clearFilters = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
            pagination: null,
            filteredSource: this.state.originalSource,
            searchedText: ''
        })
    }
    render(){
        const a =(profession) => (typeof profession === "object")?
            profession.map(prof => <Tag color="blue" key={prof}>{prof}</Tag>):
            <Tag color="blue" key={profession}>{profession}</Tag>
        let  sortedInfo = this.state.sortedInfo;
        sortedInfo = sortedInfo || {};
        const columns = [
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName',
                ...this.getColumnSearchProps("firstName"),
                sorter: (a, b) => a.firstName.length - b.firstName.length,
                sortOrder: sortedInfo.columnKey === 'firstName' && sortedInfo.order,
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName',
                ...this.getColumnSearchProps("lastName"),
                sorter: (a, b) => a.lastName.length - b.lastName.length,
                sortOrder: sortedInfo.columnKey === 'lastName' && sortedInfo.order,
            },
            {
                title: 'Profession',
                dataIndex: 'profession',
                key: 'profession',
                render: profession => <span key={profession} >{a(profession)}</span>,
                ...this.getColumnSearchProps("profession"),
                sorter: (a,b) => {
                if(typeof a.profession === "object" && typeof b.profession === "string")
                    return a.profession.join('').length - b.profession.length
                else if(typeof b.profession === "object" && typeof a.profession === "string")
                    return a.profession.length - b.profession.join('').length
                else if(typeof b.profession === "object" && typeof a.profession === "object")
                    return a.profession.join('').length - b.profession.join('').length
                else if(typeof b.profession === "string" && typeof a.profession === "string")
                    return a.profession.length - b.profession.length
                },
                sortOrder: sortedInfo.columnKey === 'profession' && sortedInfo.order,
            }
        ]
        return (
            <div>
                <Button onClick={this.clearFilters}>Clear filters</Button>
                <Table columns={columns} dataSource={this.state.filteredSource} onChange={this.handleChange} rowKey="id" />
            </div>

        )
    }
}
export default App1;