import React, { Component } from 'react';


class Taglist extends React.Component {
    //type 1: from filter change
    //type 2: from update change
    //type 3: from add change
    //type 4: Add a tag
    //type 5: Delete a tag

    render() {
            return (
            <div>
                <select className="custom-select" aria-label="Default select example" 
                    onChange = {(e) => {
                        const selectedtype = e.target.value;
                        if (this.props.onChangetype === '1') this.props.onFilterchange(selectedtype);
                        if (this.props.onChangetype === '2') this.props.onUpdatechange(selectedtype);
                        if (this.props.onChangetype === '3') this.props.onAddchange(selectedtype);
                    }}>
                    <option value = "">None</option>
                    {this.props.taglist.map(type => {
                        return (
                        <option value = {type.attributes.tag} key = {type.attributes.tag}>
                            {type.attributes.tag}
                        </option>);
                    })}
                </select>
            </div>
            );
    }
}
 
export default Taglist;