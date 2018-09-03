import React, { Component } from 'react';
import { Consumer } from '../../Context';
import Spinner from '../layout/Spinner'
import Track from '../tracks/Track'

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {
            value=>{
                const { track_lists, heading } = value;
                if(track_lists === undefined || track_lists.length === 0 ){
                   
                   return <Spinner/>
                }
                else{ 
                    
                    return(
                        
                        <React.Fragment>

                            <h3 className="text-center mb-4">{heading}</h3>

                         <div className="row">
                            { track_lists.map(item=>(
                                <Track key={item.track.track_id} track={item.track}/>
                            )) }
                         </div>
                       
                        </React.Fragment> 
                    )
                }
            }
        }
      </Consumer>
    )
  }
}
export default Tracks;
