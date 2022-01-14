import React, { Component } from 'react';
import Mainpage from './mainpage';
import Taglist from './taglist';

// can not add the same tag(add a check algorithm to achieve this)
// can not delete a tag that already has words in it

class Sidebar extends React.Component {

    componentDidMount() {
        //this.props.onSearch(this.refs.searchWord.value);
    }

    getDisabledvalue = () => {
        return this.props.Filtertagselectednow === "";
    }

    render() { 
        //this.props.onSearch(this.refs.searchWord.value);
        return (
        <div className="col-md-3 bg-light">
            <h3>Search for your words</h3>
            <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                       placeholder = "Search Word..." 
                       onChange = {(e) => {
                           const word = e.target.value;
                           this.props.onSearchword(word);
                       }}
                />
            </div>
            <br /><br /><br />
            <h3>Filter</h3>
            <Taglist
                onFilterchange = {this.props.onFilterchange}
                onChangetype = '1'
                taglist = {this.props.taglist}
                tagidnow = {this.props.tagidnow}
            />
            <button
                onClick={() => this.props.onDeletetag(this.props.Filtertagselectednow)}
                className="btn btn-secondary btn"
                disabled = {this.getDisabledvalue()}
            >
                Delete this tag
            </button>
            <br /><br /><br />
            <h3>Add tag</h3>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                       placeholder="Add new tag..."
                       onChange = {(e) => {
                        const word = e.target.value;
                        this.props.onAddtaginputchange(word);
                    }}
                />
            <button
                onClick={() => this.props.onAddtag(this.props.Addtaginputnow)}
                className="btn btn-success btn"
            >
                Add tag
            </button>
        </div>
        );
    }
}
 
export default Sidebar;