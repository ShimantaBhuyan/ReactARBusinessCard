import React, {useState, useEffect} from "react"

import UserForm from "./UserForm"
import ARCard from "./ARCard"

import AScene from "./AScene"

import NFT from "./loadingWithThree"

const App = () => {    
    const defaultUser = {        
        name: "",
        org: "",
        designation: "",
        email: "",
        phone: "",
        portfolio: "",
        linkedin: "",
        github: "",
        image: {loaded: false, src: ""}
    };    

    // user = {name, org, designation, email, phone, portfolio, linkedin, github}
    const [user, setUser] = useState(defaultUser)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        setUser(defaultUser)
        return (() => {
            setUser(defaultUser)
        })
    }, [])

    const handleSubmit = (event) => {
        const { name } = event.target
        
        event.preventDefault();
        
        // alert(`
        //     Name: ${user.name}
        //     Organisation: ${user.org}
        //     Designation: ${user.designation}
        //     Email: ${user.email}
        //     Phone Number: ${user.phone}
        //     Portfolio Website: ${user.portfolio}
        //     LinkedIn profile: ${user.linkedin}
        //     Github Profile: ${user.github}
        // `)   
        name === "toHome" ? setSubmitted(false) : setSubmitted(true)
    }

    const handleChange = (event) => {
        event.preventDefault()

        const {name, value, type} = event.target
        // setUser({
        //     [name]: value   
        // })

        if (type === "file" && event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setUser(prevUser => ({ ...prevUser, image: {loaded: true, src: URL.createObjectURL(file)}}));
        }
        else
            setUser(prevUser => ({ ...prevUser, [name]: value }));
    }

    const backgroundImageStyle =
        {
            backgroundImage: `url("${user.image.src}")`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "300px"
        }

    return (  
        submitted ? /*<NFT />*/ <ARCard user={user} /> /*<AScene />*/:
            <Home onChange={handleChange} onSubmit={handleSubmit} user={user} backgroundImageStyle={backgroundImageStyle}/>
            /*<Sample user={user} onSubmit={handleSubmit}/>*/
    )
}

const Home = (props) => { 
    return (
        <div className="mainContainer">
            <div>
                <UserForm onChange={props.onChange} onSubmit={props.onSubmit} user={props.user}/>
                <div style={props.backgroundImageStyle}></div>
            </div>
        </div>
    )
}

const Sample = (props) => {
    return (
        <div>
            <form name="toHome" onSubmit={props.onSubmit}>
                <button type="submit" >To Home</button>
                <h1>Routing Demo</h1>
                <p>Name: {props.user.name}</p>
                <p>Organisation: {props.user.org}</p>
                <p>Designation: {props.user.designation}</p>
                <p>Email: {props.user.email}</p>
                <p>Phone Number: {props.user.phone}</p>
                <p>Portfolio Website: {props.user.portfolio}</p>
                <p>LinkedIn profile: {props.user.linkedin}</p>
                <p>Github Profile: {props.user.github}</p>
                <img src={props.user.image.src}/>
            </form>
        </div>
    )
}

export default App