import React from "react"
//import "aframe"

const AScene = () => {
    return(
        <a-scene>
            <a-box 
            position="-1 0.5 -3" 
            rotation="0 45 0" 
            color="#4CC3D9" />
            <a-sphere 
            position="0 1.25 -5" 
            radius="1.25" 
            color="#EF2D5E" />
            <a-cylinder 
            position="1 0.75 -3" 
            radius="0.5" 
            height="1.5" 
            color="#FFC65D" />
            <a-plane 
            position="0 0 -4" 
            rotation="-90 0 0" 
            width="4" 
            height="4" 
            color="#7BC8A4" />
            <a-dodecahedron 
            color="#FF926B" 
            radius="5" 
            position="0 -1 -30"></a-dodecahedron>
            <a-sky src={require('./img.jpg')} />

            <a-entity camera cursor="rayOrigin: mouse"></a-entity>
            
            <a-entity cursor="fuse: true; fuseTimeout: 2000;" raycaster="objects: .clickable" position="0 0 -6" scale="0.1 0.1 0.1" 
                geometry="primitive: ring;" 
                material="color: white; shader: flat" rotation="" visible="" 
                animation="property: scale; startEvents: fusing; easing: easeInQuad; dir: alternate; from: 0.01 0.01 0.01; to: 0.02 0.02 0.02; dur: 2000" 
                animation__color="property: components.material.material.color; isRawProperty: true; type: color; startEvents: fusing; easing: easeInQuad; from: white; to: orange; dur: 2000"
                animation__scalemouseleave="property: scale; startEvents: mouseleave; easing: easeInQuad; dur: 2000; to: 0.01 0.01 0.01;"
                animation__colormouseleave="property: components.material.material.color; isRawProperty: true; type: color; startEvents: mouseleave; easing: easeInQuad; dur: 2000; to: white;">
            </a-entity>
        </a-scene>
    )
}

export default AScene