import React, {useEffect} from "react"
//import "aframe"

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

const initializeScene = (props) => {    
    checkMedia()

    AFRAME.registerComponent('markerhandler', {
        init: function () {
          this.el.sceneEl.addEventListener('markerFound', () => {
            // redirect to custom URL
            //window.location = 'https://github.com/AR-js-org/AR.js';
            console.log("IMAGE TRACKED!")
          })
        }
    })

    var sceneEl = document.querySelector("a-scene")
    sceneEl.flushToDOM(true)

    // set scene attributes
    // AFRAME.registerComponent('arcardscene', {
    //     init: function () {   
    //         registerClick()
    //         // get scene element
    //         var sceneEl = this.el; 
    //         // set header text attributes
    //         sceneEl.querySelector('#headerText').setAttribute('rotation', {x: -90, y: -90, z: 90});
    //         sceneEl.querySelector('#headerText').setAttribute('position', {x: -40, y: 0, z: -620});
    //         sceneEl.querySelector('#headerText').setAttribute('text-geometry', {value: "AR Business Card", size: 15});
    //         // set name text attributes
    //         sceneEl.querySelector('#nameText').setAttribute('rotation', {x: -90, y: -90, z: 90});
    //         sceneEl.querySelector('#nameText').setAttribute('position', {x: -100, y: 0, z: -450});
    //         sceneEl.querySelector('#nameText').setAttribute('text-geometry', {value: props.user.name, font: `#optimerBoldFont`, size: 20});
    //         // set logo plane attributes
    //         sceneEl.querySelector('#avevaLogoPlane').setAttribute('rotation', {x: -90, y: -90, z: 90});
    //         sceneEl.querySelector('#avevaLogoPlane').setAttribute('position', {x: 50, y: 0, z: -570});
    //         sceneEl.querySelector('#avevaLogoPlane').setAttribute('height', 200);
    //         sceneEl.querySelector('#avevaLogoPlane').setAttribute('width', 476);
    //         // set portfolio block attributes
    //         sceneEl.querySelector('#portfolioBlock').setAttribute('rotation', {x: -90, y: -90, z: 90});
    //         sceneEl.querySelector('#portfolioBlock').setAttribute('position', {x: 180, y: 0, z: -400});
    //         sceneEl.querySelector('#portfolioBlock').setAttribute('material', {src: `#headshotTexture`});
    //         // set linkedin block attributes
    //         sceneEl.querySelector('#linkedinBlock').setAttribute('rotation', {x: -90, y: -90, z: 90});
    //         sceneEl.querySelector('#linkedinBlock').setAttribute('position', {x: -80, y: 0, z: -400});
    //         sceneEl.querySelector('#linkedinBlock').setAttribute('material', {src: `#linkedinTexture`});
    //         // set github block attributes
    //         sceneEl.querySelector('#githubBlock').setAttribute('rotation', {x: -90, y: -90, z: 90});
    //         sceneEl.querySelector('#githubBlock').setAttribute('position', {x: -80, y: 0, z: -145});
    //         sceneEl.querySelector('#githubBlock').setAttribute('material', {src: `#githubTexture`});
    //         // set email block attributes
    //         sceneEl.querySelector('#emailBlock').setAttribute('rotation', {x: -90, y: -90, z: 90});
    //         sceneEl.querySelector('#emailBlock').setAttribute('position', {x: 180, y: 0, z: -145});
    //         sceneEl.querySelector('#emailBlock').setAttribute('material', {src: `#emailTexture`});
    //         // set camera entity attributes   
    //         sceneEl.querySelector('#cameraEntity').setAttribute('cursor', {rayOrigin: `mouse`});
    //         // set cursor entity attributes           
    //         sceneEl.querySelector('#cursorEntity').setAttribute('raycaster', {objects: `.clickable`});      
    //         sceneEl.querySelector('#cursorEntity').setAttribute('cursor', {fuse: true, fuseTimeout: 2000});      
    //         sceneEl.querySelector('#cursorEntity').setAttribute('position', {x: 0, y: 0, z: -2});
    //         sceneEl.querySelector('#cursorEntity').setAttribute('scale', {x: 0.1, y: 0.1, z: 0.1});
    //         sceneEl.querySelector('#cursorEntity').setAttribute('geometry', {primitive: `ring`});      
    //         sceneEl.querySelector('#cursorEntity').setAttribute('material', {color: `white`, shader: `flat`}); 

    //         // need to set manually since attributes were not updating in DOM
    //         sceneEl.flushToDOM(true);  // Flush every entity.
    //     }
    // })
}

const ARCard = (props) => {
    console.log(props)

    useEffect(() => {
        initializeScene(props)
        return(() => {
            initializeScene(props)
        })
    }) 

    return(
        <>
            <div className="arjs-loader">
                <div>Loading, please wait...</div>
            </div>
            <a-scene 
                arcardscene
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

                    <a-mixin id="cube" geometry={"primitive: box"} radius="5" scale="40 40 40" rotation="0 0 0"></a-mixin>
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
              
                <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" />

                <a-nft
                    markerhandler
                    type="nft"
                    url="/ReactARBusinessCard/assets/AVEVA_ID_CARD_markerData/AVEVA_ID_CARD"
                    smooth="true"
                    smoothCount="10"
                    smoothTolerance=".01"
                    smoothThreshold="5"
                    >   

                    {
                    /*
                    <a-entity id="headerText"></a-entity>
                    <a-entity id="nameText"></a-entity>

                    <a-plane src="#avevaLogo" id="avevaLogoPlane"></a-plane>

                    <a-entity id="portfolioBlock" mixin="cube mouseEnterAnimation mouseLeaveAnimation" class="clickable" navigate-on-click={`url: ${props.user.portfolio}`}></a-entity>

                    <a-entity id="linkedinBlock" mixin="cube mouseEnterAnimation mouseLeaveAnimation" class="clickable" navigate-on-click={`url: ${props.user.linkedin}`}></a-entity>

                    <a-entity id="githubBlock" mixin="cube mouseEnterAnimation mouseLeaveAnimation" class="clickable" navigate-on-click={`url: ${props.user.github}`}></a-entity>

                    <a-entity id="emailBlock" mixin="cube mouseEnterAnimation mouseLeaveAnimation" class="clickable" navigate-on-click={`url: mailto:${props.user.email}`}></a-entity>
                    */
                    }
                    
                    <a-box position='45 45 27.5' scale='90 90 90' material='opacity: 0.5;'></a-box>
                    
                </a-nft>

                <a-entity id="cameraEntity" camera></a-entity>
                
                <a-entity id="cursorEntity" rotation="" visible="" 
                    animation="property: scale; startEvents: fusing; easing: easeInQuad; dir: alternate; from: 0.1 0.1 0.1; to: 0.2 0.2 0.2; dur: 2000" 
                    animation__color="property: components.material.material.color; isRawProperty: true; type: color; startEvents: fusing; easing: easeInQuad; from: white; to: orange; dur: 2000"
                    animation__scalemouseleave="property: scale; startEvents: mouseleave; easing: easeInQuad; dur: 2000; to: 0.1 0.1 0.1;"
                    animation__colormouseleave="property: components.material.material.color; isRawProperty: true; type: color; startEvents: mouseleave; easing: easeInQuad; dur: 2000; to: white;">
                </a-entity>
                
            </a-scene>
        </>
    )
}

export default ARCard