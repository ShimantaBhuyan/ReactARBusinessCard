// https://rawcdn.githack.com/kalwalt/kalwalt-interactivity-AR/97baee315e2c67c2db1e31a6caa163a0e4c0fc03/resources/three.min.js
// https://rawcdn.githack.com/kalwalt/kalwalt-interactivity-AR/97baee315e2c67c2db1e31a6caa163a0e4c0fc03/resources/js/libs/stats.min.js
// https://rawcdn.githack.com/kalwalt/kalwalt-interactivity-AR/97baee315e2c67c2db1e31a6caa163a0e4c0fc03/resources/build/nftLoader/nftLoader.min.js

import React, {useEffect} from "react"

/*
<a-entity id="headerText"></a-entity>
<a-entity id="nameText"></a-entity>

<a-plane src="#avevaLogo" id="avevaLogoPlane"></a-plane>

<a-entity id="portfolioBlock" mixin="cube mouseEnterAnimation mouseLeaveAnimation" class="clickable" navigate-on-click={`url: ${props.user.portfolio}`}></a-entity>

<a-entity id="linkedinBlock" mixin="cube mouseEnterAnimation mouseLeaveAnimation" class="clickable" navigate-on-click={`url: ${props.user.linkedin}`}></a-entity>

<a-entity id="githubBlock" mixin="cube mouseEnterAnimation mouseLeaveAnimation" class="clickable" navigate-on-click={`url: ${props.user.github}`}></a-entity>

<a-entity id="emailBlock" mixin="cube mouseEnterAnimation mouseLeaveAnimation" class="clickable" navigate-on-click={`url: mailto:${props.user.email}`}></a-entity>
*/

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

const initializeAR = () => {
    //////////////////////////////////////////////////////////////////////////////////
    //		Init
    //////////////////////////////////////////////////////////////////////////////////

    var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        precision: 'mediump',
    });

    var clock = new THREE.Clock();

    var mixers = [];

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    document.body.appendChild( renderer.domElement );

    // init scene and camera
    var scene = new THREE.Scene();

    //////////////////////////////////////////////////////////////////////////////////
    //		Initialize a basic camera
    //////////////////////////////////////////////////////////////////////////////////

    // Create a camera
    var camera = new THREE.Camera();
    scene.add(camera);

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    ////////////////////////////////////////////////////////////////////////////////
    //          handle arToolkitSource
    ////////////////////////////////////////////////////////////////////////////////

    var arToolkitSource = new THREEx.ArToolkitSource({
        sourceType : 'webcam',
        sourceWidth: 480,
        sourceHeight: 640,
    })

    arToolkitSource.init(function onReady(){
        // use a resize to fullscreen mobile devices
        setTimeout(function() {
            onResize()
        }, 1000);
    })

    // handle resize
    window.addEventListener('resize', function(){
        onResize()
    })

    // listener for end loading of NFT marker
    window.addEventListener('arjs-nft-loaded', function(ev){
        console.log(ev);
    })

    function onResize(){
        arToolkitSource.onResizeElement()
        arToolkitSource.copyElementSizeTo(renderer.domElement)
        if( arToolkitContext.arController !== null ){
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //          initialize arToolkitContext
    ////////////////////////////////////////////////////////////////////////////////

    // create atToolkitContext
    var arToolkitContext = new THREEx.ArToolkitContext({
        detectionMode: 'mono',
        canvasWidth: 480,
        canvasHeight: 640,
    }, {
        sourceWidth: 480,
        sourceHeight: 640,
    })

    // initialize it
    arToolkitContext.init(function onCompleted(){
        // copy projection matrix to camera
        camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
    })

    ////////////////////////////////////////////////////////////////////////////////
    //          Create a ArMarkerControls
    ////////////////////////////////////////////////////////////////////////////////

    // init controls for camera
    var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
        type : 'nft',
        descriptorsUrl : '/ReactARBusinessCard/assets/AVEVA_ID_CARD_markerData/AVEVA_ID_CARD',
        changeMatrixMode: 'cameraTransformMatrix'
    })

    scene.visible = false

    var root = new THREE.Object3D();
    scene.add(root);

    //////////////////////////////////////////////////////////////////////////////////
    //		add an object in the scene
    //////////////////////////////////////////////////////////////////////////////////

    /* 
    var threeGLTFLoader = new THREE.GLTFLoader();
    var model;

    threeGLTFLoader.load("/assets/Duck.glb", function (gltf) {
        model = gltf.scene.children[0];
        model.name = 'Duck';

        var animation = gltf.animations[0];
        var mixer = new THREE.AnimationMixer(model);
        mixers.push(mixer);
        var action = mixer.clipAction(animation);
        action.play();

        root.matrixAutoUpdate = false;
        root.add(model);

        model.position.z = -200;
        model.position.x = 100;
        model.position.y = 100;


        //////////////////////////////////////////////////////////////////////////////////
        //		render the whole thing on the page
        //////////////////////////////////////////////////////////////////////////////////

        var animate = function() {
            requestAnimationFrame(animate);

            if (mixers.length > 0) {
                for (var i = 0; i < mixers.length; i++) {
                    mixers[i].update(clock.getDelta());
                }
            }

            if (!arToolkitSource.ready) {
                return;
            }

            arToolkitContext.update( arToolkitSource.domElement )

            // update scene.visible if the marker is seen
            scene.visible = camera.visible;

            renderer.render(scene, camera);
        };

        requestAnimationFrame(animate);
    }); 
    */

    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        new THREE.MeshNormalMaterial()
    )

    root.matrixAutoUpdate = false;
    root.add(sphere);

    sphere.material.flatShading
    sphere.position.z = 40
    sphere.position.x = 80
    sphere.position.y = 80
    sphere.scale.set(80,80,80)

    var animate = function() {
        requestAnimationFrame(animate);

        if (mixers.length > 0) {
            for (var i = 0; i < mixers.length; i++) {
                mixers[i].update(clock.getDelta());
            }
        }

        if (!arToolkitSource.ready) {
            return;
        }

        arToolkitContext.update( arToolkitSource.domElement )

        // update scene.visible if the marker is seen
        scene.visible = camera.visible;

        renderer.render(scene, camera);
    };

    requestAnimationFrame(animate);
 
}

const NFT = () => {
    useEffect(() => {
        initializeAR()
        return(() => {
            initializeAR()
        })
    })

    return(
        <div className="arjs-loader">
            <div className="arjs-loader-spinner"></div>
        </div>
    )
}

export default NFT