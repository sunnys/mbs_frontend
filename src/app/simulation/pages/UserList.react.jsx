import React, { PureComponent } from "react";
import _ from "lodash";
import { Segment, Button, Image } from "semantic-ui-react";
import ReactTable from "react-table";
import { simulations } from "../components/seeds";
import "react-table/react-table.css";

export default class UserList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userList: _.map(this.props.userList, record => {
                let data = record.user_data;
                let userBasicData = {
                    id: record.id ,
                    name: record.user.name,
                    simulation_id: data.simulation_id,
                    email: record.email,
                }
                let userDetailedData = {
                    ownership:
                        data.simParams.competencyMap !== undefined
                            ? data.simParams.competencyMap.ownership
                            : "",
                    passionForExcellence:
                        data.simParams.competencyMap !== undefined
                            ? data.simParams.competencyMap.passionForExcellence
                            : "",
                    highPerformance:
                        data.simParams.competencyMap !== undefined
                            ? data.simParams.competencyMap.highPerformance
                            : "",
                    meritocracy:
                        data.simParams.competencyMap !== undefined
                            ? data.simParams.competencyMap.meritocracy
                            : "",
                    teamSpirit:
                        data.simParams.competencyMap !== undefined
                            ? data.simParams.competencyMap.teamSpirit
                            : ""
                }
                let result = _.merge(userBasicData, userDetailedData);
                return result;
            })
        };
    }

    downloadCSV = () => {
        let originalItems = _.map(
            this.reactTable.getResolvedState().sortedData,
            "_original"
        );
        let items = [];
        _.each(originalItems, oItem => {
            let basicItem = {
                id: oItem.id,
                name: oItem.name,
                email: oItem.email,
                score: oItem.score
            }
            let detailedItem = {};
            if(this.props.params.simulation_id !== undefined){
                let simulation = simulations[this.props.params.simulation_id]
                _.each(simulation.analytics.endpoints, function(endpoint, key){
                    detailedItem[endpoint.name] = oItem[endpoint.name]
                });
            } else {
                detailedItem['ownership'] = oItem.ownership
                detailedItem['passionForExcellence'] = oItem.passionForExcellence
                detailedItem['highPerformance'] = oItem.highPerformance
                detailedItem['meritocracy'] = oItem.meritocracy
                detailedItem['teamSpirit'] = oItem.teamSpirit
            }
            let fullItem = _.merge(basicItem, detailedItem);
            items.push(fullItem);
        });

        if (items.length > 0) {
            const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
            const header = Object.keys(items[0]);
            let csv = items.map(row =>
                header
                    .map(fieldName => JSON.stringify(row[fieldName], replacer))
                    .join(",")
            );
            csv.unshift(header.join(","));
            csv = csv.join("\r\n");
            var hiddenElement = document.createElement("a");
            hiddenElement.href =
                "data:text/csv;charset=utf-8," + encodeURI(csv);
            hiddenElement.target = "_blank";
            hiddenElement.download = "Player-data.csv";
            hiddenElement.click();
        }
    };

    render() {
        let basicColumns = [
            {
                Header: "Id",
                id: "id",
                accessor: d => d.id,
                Cell: ({ value }) => (
                    <Button
                        as="a"
                        primary
                        size="mini"
                        content="View"
                        href={`/simulator/#/analytics/${value}`}
                        target = "_blank"
                    />
                ),
                style: { textAlign: "center" }
            },
            {
                Header: "Name",
                id: "name",
                accessor: d => d.name,
                minWidth: 256
            },
            {
                Header: "Email",
                id: "email",
                accessor: d => d.email,
            },
            {
                Header: "Ownership",
                id: "ownership",
                accessor: d => d.ownership,
                filterMethod: (filter, row) => {
                    switch (filter.value) {
                        case "zero":
                            return row[filter.id] === 0;
                        case "low":
                            return row[filter.id] < 40 && row[filter.id] > 0;
                        case "medium":
                            return row[filter.id] < 80 && row[filter.id] > 40;
                        case "high":
                            return row[filter.id] < 100 && row[filter.id] > 80;
                        case "full":
                            return row[filter.id] === 100;
                        case "all":
                        default:
                            return true;
                    }
                },
                Filter: ({ filter, onChange }) => (
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                        <option value="all">Show All</option>
                        <option value="zero">0</option>
                        <option value="low">0-40</option>
                        <option value="medium">40-80</option>
                        <option value="high">80-99</option>
                        <option value="full">100</option>
                    </select>
                ),
                style: { textAlign: "center" }
            }
        ];
        let detailedColumns = [];
        if(this.props.params.simulation_id !== undefined){
            let simulation = simulations[this.props.params.simulation_id]
            detailedColumns = _.map(simulation.analytics.endpoints, function(endpoint, key){
                return {
                    Header: endpoint.name,
                    id: endpoint.name,
                    accessor: d => d[endpoint.name],
                    filterMethod: (filter, row) => {
                        switch (filter.value) {
                            case "zero":
                                return row[filter.id] === 0;
                            case "low":
                                return row[filter.id] < 40 && row[filter.id] > 0;
                            case "medium":
                                return row[filter.id] < 80 && row[filter.id] > 40;
                            case "high":
                                return row[filter.id] < 100 && row[filter.id] > 80;
                            case "full":
                                return row[filter.id] === 100;
                            case "all":
                            default:
                                return true;
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">Show All</option>
                            <option value="zero">0</option>
                            <option value="low">0-40</option>
                            <option value="medium">40-80</option>
                            <option value="high">80-99</option>
                            <option value="full">100</option>
                        </select>
                    ),
                    style: { textAlign: "center" }
                }
            });
        } else {
            detailedColumns = [
                {
                    Header: "Passion For Excellence",
                    id: "passionForExcellence",
                    accessor: d => d.passionForExcellence,
                    filterMethod: (filter, row) => {
                        switch (filter.value) {
                            case "zero":
                                return row[filter.id] === 0;
                            case "low":
                                return row[filter.id] < 40 && row[filter.id] > 0;
                            case "medium":
                                return row[filter.id] < 80 && row[filter.id] > 40;
                            case "high":
                                return row[filter.id] < 100 && row[filter.id] > 80;
                            case "full":
                                return row[filter.id] === 100;
                            case "all":
                            default:
                                return true;
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">Show All</option>
                            <option value="zero">0</option>
                            <option value="low">0-40</option>
                            <option value="medium">40-80</option>
                            <option value="high">80-99</option>
                            <option value="full">100</option>
                        </select>
                    ),
                    style: { textAlign: "center" }
                },
                {
                    Header: "High Performance",
                    id: "highPerformance",
                    accessor: d => d.highPerformance,
                    filterMethod: (filter, row) => {
                        switch (filter.value) {
                            case "zero":
                                return row[filter.id] === 0;
                            case "low":
                                return row[filter.id] < 40 && row[filter.id] > 0;
                            case "medium":
                                return row[filter.id] < 80 && row[filter.id] > 40;
                            case "high":
                                return row[filter.id] < 100 && row[filter.id] > 80;
                            case "full":
                                return row[filter.id] === 100;
                            case "all":
                            default:
                                return true;
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">Show All</option>
                            <option value="zero">0</option>
                            <option value="low">0-40</option>
                            <option value="medium">40-80</option>
                            <option value="high">80-99</option>
                            <option value="full">100</option>
                        </select>
                    ),
                    style: { textAlign: "center" }
                },
                {
                    Header: "Meritocracy",
                    id: "meritocracy",
                    accessor: d => d.meritocracy,
                    filterMethod: (filter, row) => {
                        switch (filter.value) {
                            case "zero":
                                return row[filter.id] === 0;
                            case "low":
                                return row[filter.id] < 40 && row[filter.id] > 0;
                            case "medium":
                                return row[filter.id] < 80 && row[filter.id] > 40;
                            case "high":
                                return row[filter.id] < 100 && row[filter.id] > 80;
                            case "full":
                                return row[filter.id] === 100;
                            case "all":
                            default:
                                return true;
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">Show All</option>
                            <option value="zero">0</option>
                            <option value="low">0-40</option>
                            <option value="medium">40-80</option>
                            <option value="high">80-99</option>
                            <option value="full">100</option>
                        </select>
                    ),
                    style: { textAlign: "center" }
                },
                {
                    Header: "Team Spirit",
                    id: "teamSpirit",
                    accessor: d => d.teamSpirit,
                    filterMethod: (filter, row) => {
                        switch (filter.value) {
                            case "zero":
                                return row[filter.id] === 0;
                            case "low":
                                return row[filter.id] < 40 && row[filter.id] > 0;
                            case "medium":
                                return row[filter.id] < 80 && row[filter.id] > 40;
                            case "high":
                                return row[filter.id] < 100 && row[filter.id] > 80;
                            case "full":
                                return row[filter.id] === 100;
                            case "all":
                            default:
                                return true;
                        }
                    },
                    Filter: ({ filter, onChange }) => (
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">Show All</option>
                            <option value="zero">0</option>
                            <option value="low">0-40</option>
                            <option value="medium">40-80</option>
                            <option value="high">80-99</option>
                            <option value="full">100</option>
                        </select>
                    ),
                    style: { textAlign: "center" }
                }
            ];
        }
        let fullColumns = basicColumns.concat(detailedColumns);
        return (
            <Segment>
                <h1>
                    <Image
                        src="assets/images/configurable/logo.png"
                        size="small"
                        style={{ display: "inline-block", marginRight: "15px" }}
                    />
                    Player List
                    <Button
                        primary
                        content="Download CSV"
                        onClick={this.downloadCSV}
                        floated="right"
                    />
                </h1>
                <ReactTable
                    data={this.state.userList}
                    ref={r => (this.reactTable = r)}
                    filterable
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id;
                        return row[id] !== undefined
                            ? String(row[id]).includes(filter.value)
                            : true;
                    }}
                    columns={fullColumns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </Segment>
        );
    }
}
