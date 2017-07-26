import * as React from 'react';

const IncidentListItem = ({incident,onIncidentSelect}) => {  // ES6 equivalent to const VideoListItem = (props) => { const video = props.video

  //const imageUrl = video.snippet.thumbnails.default.url;

  return (
 //   <li onClick={()=> onVideoSelect(video)} className="list-group-item">
    <li>
      <div className="">
        Incident Goes Here
      </div>
    </li>
  )
};

export default IncidentListItem;