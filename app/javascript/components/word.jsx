import React from 'react';
import Modal from 'react-modal';
import Taglist from './taglist';


class Word extends React.Component {

    state = {
        isModalOpen: false,
    }

    constructor() {
        super();
    }

    changeIsModalOpentotrue = () => {
        this.setState({ isModalOpen: true });
        this.props.onUpdatechange("");
    }

    changeIsModalOpentofalse = () => {
        this.setState({ isModalOpen: false });
    }

    getTagType = () => {
        if (this.props.word.attributes.tag !== "") {
            const type = "(Tag: " + this.props.word.attributes.tag + ")";
            return (
                <p>{type}</p>
            ); 
        }
    }

    getPrevioustag = () => {
        return this.props.word.attributes.tag === "" ? "None" : this.props.word.attributes.tag
    }

    render() { 
        return (
            <div className='custom-control bg-light'>
                <h4 onClick={this.checkclick} className='m-2'>
                    {this.props.name}
                </h4>
                {this.getTagType()}
                <div className='right_list'>
                <button
                    onClick={this.changeIsModalOpentotrue}
                    className="btn btn-primary btn-sm m-2"
                >
                    Update
                </button> 
                <button 
                    onClick={() => this.props.onDelete(this.props.id)}
                    className="btn btn-danger btn-sm m-2"
                >
                    Delete
                </button>
                </div>
                <Modal isOpen = {this.state.isModalOpen} onRequestClose = {this.changeIsModalOpentofalse} 
                    style={
                        {
                            overlay: {
                                backgroundColor: 'grey',
                            },
                            content : {
                                top: '100px',
                                left: '100px',
                                right: '100px',
                                bottom: '100px',
                                padding: '20px',
                                borderRadius: '20px',
                            }
                        }
                    }
                    >
                    <h2>Update Word</h2>
                    <br /><br />
                    <h3>Word</h3>
                    <p>(previous: {this.props.word.attributes.name}) </p>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                       placeholder={this.props.word.attributes.name} ref = "Updateword"
                    />
                    <br /><br />
                    <h4>Tag</h4>
                    <p>(previous: {this.getPrevioustag()}) </p>
                    <Taglist
                        onChangetype = '2'
                        onUpdatechange = {this.props.onUpdatechange}
                        taglist = {this.props.taglist}
                        tagidnow = {this.props.tagidnow}
                    />
                    <br /><br />

                    <button
                        onClick={() => this.props.onUpdate(this.props.word.id, this.refs.Updateword.value, this.props.Updateselectedtypenow)}
                        className='btn btn-success btn-sm'
                    >
                        Confirm
                    </button>
                    <button
                        onClick={this.changeIsModalOpentofalse}
                        className="btn btn-danger btn-sm m-2"
                    >
                        Close
                    </button>
                </Modal>
            </div>
        );
    }
}
 
export default Word;