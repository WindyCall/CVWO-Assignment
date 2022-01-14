import React, { Component } from 'react';
import Word from './word';
import Taglist from './taglist';

// can not have the same word

class Mainpage extends React.Component {

    state = {
        Updateselectedtypenow: ""
    };

    handleUpdateChange = (Updateselectedtypenow) => {
        //console.log(this.state.Updateselectedtypenow);
        this.setState({ Updateselectedtypenow });
        //console.log(this.state.Updateselectedtypenow);
    }

    constructor() {
        super();
        //console.log("mainpage contructed")
    }
    render() { 
        return (
        <div className="container col-md-9">
            <div className="row justify-content-center">
            <h2 className="text-center"> My-words list </h2>
            </div>
            <div className="input-group mb-3">
                <button
                    onClick = {() => this.props.onAddword(this.refs.addWord.value, this.props.Addtagselectednow)}
                    className='btn btn-warning btn btn-secondary btn'
                >
                    Add
                </button>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                       placeholder="Add Word..." ref="addWord"    
                />
                <Taglist
                    onChangetype = '3'
                    onAddchange = {this.props.onAddchange}
                    taglist = {this.props.taglist}
                    tagidnow = {this.props.tagidnow}
                />
            </div>
            <ul className="">
            {this.props.words.map( word => {
                if ((this.props.letters === "" || word.attributes.name.toLowerCase().includes(this.props.letters.toLowerCase()))
                    && (word.attributes.tag === this.props.Filtertagselectednow || this.props.Filtertagselectednow === "")) {
                    return (
                        <Word
                        key = {word.attributes.name + word.attributes.id}
                        name = {word.attributes.name}
                        id = {word.id} 
                        onDelete = {this.props.onDelete}
                        onUpdate = {this.props.onUpdate}
                        onUpdatechange = {this.handleUpdateChange}
                        Updateselectedtypenow = {this.state.Updateselectedtypenow}
                        word = {word}
                        taglist = {this.props.taglist}
                        tagidnow = {this.props.tagidnow}
                    />
                    )
                }   
            }
            )}
            </ul>
        </div>
        );
    }
}
 
export default Mainpage;