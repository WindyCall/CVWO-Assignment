import React, { useState, useEffect, Component} from 'react';
import Mainpage from './mainpage';
import Sidebar from './sidebar';
import axios from 'axios';
class App extends React.Component { 

  constructor() {
    super();
  }

  //in this project, I'll only store words and taglist
  //those individual variables will be refreshed after the refreshment of the website
  state = {
    letters: "",// store letters in search textbox
    Filtertagselectednow: "",
    Addtagselectednow: "",
    Addtaginputnow: "",
    words: [],
    taglist: [],
  }

  // hard to use axios to do post and put operation
  // choose to use fetch method
  getWords = () => {
    /*axios.get('/api/v1/wordslists.json')
    .then(resp => {
      this.setState({words: resp.data.data})
    })
    .catch(resp => console.log(resp))*/
    fetch('/api/v1/wordslists')
    .then(response => response.json())
    .then(response => {
      this.setState({words: response.data})
    })
  }

  getTags = () => {
    /*axios.get('/api/v1/taglists.json')
    .then(resp => {
      this.setState({taglist: resp.data.data})
    })
    .catch(resp => console.log(resp))*/
    fetch('/api/v1/taglists')
    .then(response => response.json())
    .then(response => {
      // console.log(resp)
      this.setState({taglist: response.data})
    })
  }

  componentDidMount() {
    this.getWords();
    this.getTags();
  }

  // can not add the same tag(add a check algorithm to achieve this)
  // can not delete a tag that already has words in it
  // can not add the word with the same name and tag
  // the same word can be in different tags
  
  // the old version is done without database
  handleDelete = (wordId) => {
    if (confirm("Are you sure to delete this word?")) {     
        /*const words = this.state.words.filter(word => word.id != wordId);
        this.setState({ words });
        alert('This word has been successfully deleted');*/
        fetch('/api/v1/wordslists/' + wordId, {
          method: 'delete'
      }).then((response) => {
          if (response.status === 204){
              this.getWords();
              alert('The word has been successfully deleted');
          }
          else{
              alert("Failed to delete this word")
          }
      });
    }
};

  handleAddword = (word, t) => {
    if (this.state.words.filter(w => w.attributes.name === word && w.attributes.tag === t).length > 0) {
      alert("The word with this tag has already existed\n\nplease add another one");
      return ;
    }// to avoid duiplicate word
    if (word === "") {
        alert('Can not add an empty word');
        return ;
    }//to avoid enmpty word
    /*const words = [...this.state.words];
    const idnow = this.state.words.length + 1;
    words.push( {id: idnow, name: word, tag: t} );
    this.setState({ words });
    alert("The word " + word + "has been added successfully");*/
    const new_word = {name: word, tag: t}
    fetch('/api/v1/wordslists', {
    method: 'post',
    body: JSON.stringify(new_word),
    headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      if (response.status === 200){
          this.getWords()
          alert('The word ' + word + ' has been created successfully ');
        }
          else {
          alert("Failed to add this word")
        }
    });
}

  handleUpdate = (wordId, word, t) => {
    if (word === "") {
        alert('Can not update an empty word');
        return ;
    }
    /*const words = [...this.state.words];
    const index = words.indexOf(word);
    const oldword = words[index].name;
    words[index].name = name;
    words[index].tag = tag;
    this.setState({ words: words });
    alert("The word has been updated successfully");*/
    const up_word = {name: word, tag: t}
    fetch('/api/v1/wordslists/' + wordId, {
      method: 'put',
      body: JSON.stringify(up_word),
      headers: { 'Content-Type': 'application/json' }
  }).then((response) => {
      if (response.status === 200){
          this.getWords()
          alert('Word has been successfully updated');
      }
      else{
          alert("Failed to update this word")
      }
  });
}

  // can not add the same tag(add a check algorithm to achieve this)
  // can not delete a tag that already has words in it
  handleAddtag = (tagname) => {
    if (this.state.taglist.filter(t => t.attributes.tag === tagname).length > 0) {
      alert("this tag has already existed\n\nplease add another one");
      return ;
    }
    if (tagname === "") {
      alert("can not add an empty tag");
      return ;
    }
    /*const taglist = [...this.state.taglist];
    const tagidnow = this.state.taglist.length + 1;
    const t = {id: tagidnow, tag: tagname};
    taglist.push(t);
    this.setState({ taglist });
    alert("the tag " + tagname + " has been added successfully!\n\nyou can now seen it in taglist");*/

    const new_tag = {tag: tagname};
            fetch('/api/v1/taglists', {
                method: 'post',
                body: JSON.stringify(new_tag),
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                if (response.status === 200){
                    this.getTags()
                    alert('Tag has been created successfully');
                }
                else{
                    alert("Failed to add this tag")
                }
            });
  }

  handleDeletetag = (tagname) => {
    const num = this.state.words.filter(word => word.attributes.tag === tagname).length;
    if (num > 0) {
      alert("this tag already has some words in it\n\ncan not delete this tag");
      return ;
    }
    /*const taglist = this.state.taglist.filter(t => t.tag !== tagname);
    this.setState({ taglist });
    this.setState({Addtaginputnow: ""})
    this.setState({Filtertagselectednow: ""})
    alert("the tag '" + tagname + "' has been successfully removed");*/
    if (confirm("Are you sure you want to delete this tag?")) {     
      /*const words = this.state.words.filter(word => word.id != wordId);
      this.setState({ words });
      alert('This word has been successfully deleted');*/
      fetch('/api/v1/taglists/' + tagname, {
        method: 'delete'
    }).then((response) => {
        if (response.status === 204){
            this.getTags();
            this.setState({Filtertagselectednow: ""})
            if (this.state.Addtagselectednow === tagname) {
              this.setState({ Addtagselectednow: "" })
            }
            alert('The tag has been successfully deleted');
        }
        else{
            alert("Failed to delete this tag")
        }
    });
  }
  }

  handleAddtaginputchange = (Addtaginputnow) => {
    this.setState({ Addtaginputnow });
  }

  handleSearchword = (letters) => {
    this.setState({ letters });
  }

  handleFilterchange = (Filtertagselectednow) => {
    this.setState({ Filtertagselectednow });
  }

  handelAddchange = (Addtagselectednow) => {
    this.setState({ Addtagselectednow });
  }

  render() { 
    return (
    <div className="row m-1">
      <Sidebar
       onSearchword = {this.handleSearchword}
       onFilterchange = {this.handleFilterchange}
       taglist = {this.state.taglist}
       tagidnow = {this.state.tagidnow}
       onAddtag = {this.handleAddtag}
       Filtertagselectednow = {this.state.Filtertagselectednow}
       onDeletetag = {this.handleDeletetag}
       Addtaginputnow = {this.state.Addtaginputnow}
       onAddtaginputchange = {this.handleAddtaginputchange}
      />
      <Mainpage 
        letters = {this.state.letters}
        Filtertagselectednow = {this.state.Filtertagselectednow}
        onAddchange = {this.handelAddchange}
        onDelete = {this.handleDelete}
        onUpdate = {this.handleUpdate}
        Addtagselectednow = {this.state.Addtagselectednow}
        taglist = {this.state.taglist}
        tagidnow = {this.statetagidnow}
        words = {this.state.words}
        onAddword = {this.handleAddword}
      />
    </div>
    );
  }
}
 
export default App;