// import 'aframe';
// import {Entity, Scene} from 'aframe-react';
import React, {useEffect} from "react";
// import * as ZapparAFrame from "@zappar/zappar-aframe";

const hasGetUserMedia = () => {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

const checkMedia = () => {
    if (hasGetUserMedia()) {
        // $('#splashScreen').css('display', 'block');
        //$('.arjs-loader').css('display', 'block');
        document.getElementsByClassName("arjs-loader")[0].style.display = "block";
    } else {
        /* 
        let template = '<p>This feature is not supported in your browser. Please try again using a different device and/or browser.</p>';
        $('#noMedia').append(template);
        $('#noMedia').css('display', 'block');
        */
        alert("This feature is not supported in your browser. Please try again using a different device and/or browser.");
    }
}

const registerClick = () => {
    AFRAME.registerComponent('navigate-on-click', {
        schema: {
          url: {default: ''}
        },
    
        init: function () {
          var data = this.data;
          var el = this.el;
    
          el.addEventListener('click', function () {
              // window.location.href = data.url;
              window.open(data.url, '_blank');
          });
        }
      });
}

const ARCard = (props) => {
    console.log(props)

    // useEffect(() => {
    //     // initializeScene(props)
    //     // return(() => {
    //     //     initializeScene(props)
    //     // })
    //     let myImageGroup = document.getElementById("image-group");
    //     let imageVisible = false;
    //     myImageGroup.addEventListener("zappar-visible", () => {
    //         // The image has appeared so show the group
    //         myImageGroup.setAttribute("visible", "true");
    //         imageVisible = true;
    //     });
    //     myImageGroup.addEventListener("zappar-notvisible", () => {
    //         // The image has disappeared so hide the group after a short delay
    //         imageVisible = false;
    //         setTimeout(() => {
    //             if (imageVisible === false) myImageGroup.setAttribute("visible", "false");
    //         }, 500)
    //     });
    // }, [])    

    return(
        <a-scene>
            <a-entity zappar-permissions-ui id="permissions"></a-entity>
            <a-entity zappar-compatibility-ui id="compatibility"></a-entity>

            <a-entity camera zappar-camera cursor="rayOrigin: mouse; fuse: false;" raycaster="objects: .collidable"></a-entity>

            {/* <a-assets>
                <a-asset-item id="target-file" src="assets/headshotMarkerData/headshot.zpt"/>
            </a-assets> */}

            <a-entity zappar-image="target: assets/headshotMarkerData/headshot.zpt" id="image-group">  
                <a-entity visibility-changer>
                    <a-box position="0 0 0.5"></a-box>    
                </a-entity>                
            </a-entity>
        </a-scene>
    )
}

export default ARCard