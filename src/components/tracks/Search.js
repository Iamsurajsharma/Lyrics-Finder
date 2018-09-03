import React, { Component } from 'react';
import { Consumer } from '../../Context';
import axios from 'axios';

class Search extends Component {
    state={
         trackTitle:""
    }
    onChange(e){
        this.setState({trackTitle: e.target.value})

    }
    onSubmit(dispatch,e){
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res=> {
          console.log(res.data)
         // this.setState({track_lists: res.data.message.body.track_list})
         dispatch({
             type: 'SEARCH_TRACKS',
             payload: res.data.message.body.track_list
         });
         this.setState({trackTitle: ''})
        })
        .catch(err=>console.log(err))
        
    }
  render() {
    return (
        <Consumer>
        {value=>{
            const { dispatch } = value;
            return(
                <div className="card card-body mb-4 p-4">
                    <h1 className="display-4 text-center">
                        <i className="fas fa-music"></i> Search for a SONG
                    </h1>
                    <p className="lead text-center">Get the Lyrics for any Song</p>
                    <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg" placeholder="Song title...."
                            name="trackTitle"
                            value={this.state.trackTitle}
                            onChange={this.onChange.bind(this)}
                            />
                        </div>
                        <button type='submit'className="btn btn-primary btn-lg btn-block mb-5">Get Lyrics</button>
                    </form>
                </div>
            )
        }}

        </Consumer>
    )
  }
}
export default Search;