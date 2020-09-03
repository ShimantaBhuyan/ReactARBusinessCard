import React, {useEffect} from "react"
import "aframe"

const hasGetUserMedia = () => {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

const initializeScene = () => {
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

const ARCard = (props) => {
    console.log(props)

    useEffect(() => {
        initializeScene()
        return(() => {
            initializeScene()
        })
    })
    

    return(
        <div id="ARCardWrapper">
            <div className="arjs-loader">
                <div>Loading, please wait...</div>
            </div>
            <a-scene 
                embedded 
                keyboard-shortcuts="" 
                screenshot="" 
                aframe-inspector-removed-embedded="undefined"            
                vr-mode-ui="enabled: false;"
                renderer="logarithmicDepthBuffer: true;"
                arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;">
            
                <canvas className="a-canvas" data-aframe-canvas="true" width="300" height="150"></canvas>

                <a-assets>
                    <img crossOrigin="anonymous" id="skypeTexture" src="https://cdn.glitch.com/6f8b5a13-fd4d-445d-b9eb-57c735d720ea%2FPostSkype.png?1528821334003" />
                    <img crossOrigin="anonymous" id="emailTexture" src="https://cdn.glitch.com/6f8b5a13-fd4d-445d-b9eb-57c735d720ea%2FPostEmail.png?1528821333360" />
                    <img crossOrigin="anonymous" id="linkedinTexture" src="https://cdn.glitch.com/6f8b5a13-fd4d-445d-b9eb-57c735d720ea%2FPostLinkedin.png?1528821333139" />
                    <img crossOrigin="anonymous" id="githubTexture" src="https://cdn.glitch.com/6f8b5a13-fd4d-445d-b9eb-57c735d720ea%2FPostGithub.png?1528821333564" />   
                    <img crossOrigin="anonymous" id="headshotTexture" src="/ReactARBusinessCard/assets/headshot.jpg" />               
                    <img crossOrigin="anonymous" id="avevaLogo" src="/ReactARBusinessCard/assets/AVEVA_Logo_color_RGB.png"/>

                    <a-mixin id="cube" geometry="primitive: box" radius="5" scale="40 40 40" rotation="0 0 0"></a-mixin>
                    <a-mixin id="mouseEnterAnimation" 
                        animation__mouseenter="property: rotation; 
                            startEvents: mouseenter; 
                            pauseEvents: mouseleave; 
                            from: 0 0 0; 
                            to: 0 0 360; 
                            loop: true; 
                            dur: 2000; 
                            dir: alternate; 
                            easing: linear;">
                    </a-mixin>
                    <a-mixin id="mouseLeaveAnimation"
                        animation__mouseleave="property: rotation; 
                            startEvents: mouseleave; 
                            loop: false; 
                            dur: 1500; 
                            to: 0 0 0;">
                    </a-mixin>

                    <a-asset-item id="optimerBoldFont" src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"></a-asset-item>
                </a-assets>

                <a-nft
                    type="nft"
                    url="/ReactARBusinessCard/assets/AVEVA_ID_CARD_markerData/AVEVA_ID_CARD"
                    smooth="true"
                    smoothCount="10"
                    smoothTolerance=".01"
                    smoothThreshold="5"
                    >   

                    <a-entity text-geometry="value: AR Business Card; size: 15" rotation="-90 -90 90" position="-40 0 -620"></a-entity>
                    <a-entity text-geometry={`value: ${props.user.name}; font: #optimerBoldFont; size: 20`} rotation="-90 -90 90" position="-100 0 -450"></a-entity>

                    <a-plane src="#avevaLogo" height="200" width="476" rotation="-90 -90 90" position="50 0 -570"></a-plane>

                    <a-entity mixin="cube mouseEnterAnimation mouseLeaveAnimation" className="clickable" material="src: #headshotTexture" rotation="-90 -90 90" position="180 0 -400" navigate-on-click={`url: ${props.user.portfolio}`}></a-entity>

                    <a-entity mixin="cube mouseEnterAnimation mouseLeaveAnimation" className="clickable" material="src: #linkedinTexture" rotation="-90 -90 90" position="-80 0 -400" navigate-on-click={`url: ${props.user.linkedin}`}></a-entity>

                    <a-entity mixin="cube mouseEnterAnimation mouseLeaveAnimation" className="clickable" material="src: #githubTexture" rotation="-90 -90 90" position="-80 0 -145" navigate-on-click={`url: ${props.user.github}`}></a-entity>

                    <a-entity mixin="cube mouseEnterAnimation mouseLeaveAnimation" className="clickable" material="src: #emailTexture" rotation="-90 -90 90" position="180 0 -145" navigate-on-click={`url: mailto:${props.user.email}`}></a-entity>
                    
                </a-nft>

                <a-entity camera cursor="rayOrigin: mouse"></a-entity>
                
                <a-entity cursor="fuse: true; fuseTimeout: 2000;" raycaster="objects: .clickable" position="0 0 -1" scale="0.01 0.01 0.01" 
                    geometry="primitive: ring;" 
                    material="color: white; shader: flat" rotation="" visible="" 
                    animation="property: scale; startEvents: fusing; easing: easeInQuad; dir: alternate; from: 0.01 0.01 0.01; to: 0.02 0.02 0.02; dur: 2000" 
                    animation__color="property: components.material.material.color; isRawProperty: true; type: color; startEvents: fusing; easing: easeInQuad; from: white; to: orange; dur: 2000"
                    animation__scalemouseleave="property: scale; startEvents: mouseleave; easing: easeInQuad; dur: 2000; to: 0.01 0.01 0.01;"
                    animation__colormouseleave="property: components.material.material.color; isRawProperty: true; type: color; startEvents: mouseleave; easing: easeInQuad; dur: 2000; to: white;">
                </a-entity>
                
            </a-scene>
        </div>
    )
}

export default ARCard