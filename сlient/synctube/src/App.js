import React, {Component} from "react";
import Axios from 'axios'

import './App.css';
import Player from './componets/Player';
import PlayList from "./componets/PlayList";


class App extends Component {
    constructor(props) {
        super(props);
        this.zap = '';
    }

    state = {
        list: '',
        lists: [],
        showPlaylist: true,
        searchs: []
    }

    handleSearch = async (value) => {
        if (this.zap == '') {
            window.location.reload();
        }
        try {
            const {data: {items}} = await Axios.get(
                `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCwOgkMFEH2mtMp8djb_RS4mmRnip-6fzk&part=snippet&q=${this.zap}&type=video`
            )
            this.setState({
                showPlaylist: false,
                searchs: items
            })
        } catch (err) {
            console.log(err)
        }
    }

    handleAdd = (id, title, img) => {
        const list = {id, title, img}
        this.setState({
            showPlaylist: true,
            lists: [...this.state.lists, list]
        })
    }

    handleRemove = index => {
        const lists = this.state.lists
        lists.splice(index, 1)
        this.setState({lists})
    }

    endVideo = () => {
        const lists = this.state.lists
        lists.shift()
        this.setState({lists})
    }

    getValue = async (e) => {
        this.zap = e.target.value;
        console.log(this.zap)
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSearch(this.zap);
        }
    }

    render() {
        const {lists, showPlaylist, searchs} = this.state

        return (
            <div className="App-header">
                <div className="youtube-box">
                    <Player video={lists[0]} endVideo={this.endVideo}/>
                </div>
                <input id="zap" className="url-input" name="search" autocomplete="off" onChange={this.getValue}
                       onKeyPress={this.handleKeyPress} placeholder="Enter video name or URL"/>
                <button className="add-button" onClick={this.handleSearch.bind(this, this.zap)}>Search
                </button>
                <PlayList
                    lists={lists}
                    searchs={searchs}
                    showPlaylist={showPlaylist}
                    onAdd={this.handleAdd}
                    onRemove={this.handleRemove}
                />

            </div>
        )
    }
}

export default App;
