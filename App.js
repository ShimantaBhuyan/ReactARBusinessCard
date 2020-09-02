import React, {useState, useEffect} from "react"

import UserForm from "./UserForm"

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
        image: {loaded: false, src: {}}
    };    

    // user = {name, org, designation, email, phone, portfolio, linkedin, github}
    const [user, setUser] = useState(defaultUser)

    const handleSubmit = (event) => {

        event.preventDefault();
        
        alert(`
            Name: ${user.name}
            Organisation: ${user.org}
            Designation: ${user.designation}
            Email: ${user.email}
            Phone Number: ${user.phone}
            Portfolio Website: ${user.portfolio}
            LinkedIn profile: ${user.linkedin}
            Github Profile: ${user.github}
        `)
        // Image: ${user.image}
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
            console.log(backgroundImageStyle)
        }
        else
            setUser(prevUser => ({ ...prevUser, [name]: value }));
    }

    const backgroundImageStyle = {
        backgroundImage: `url("${user.image.src}")`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "300px"
    }

    return (
        <div>
            <UserForm onChange={handleChange} onSubmit={handleSubmit} user={user}/>
            <div style={backgroundImageStyle}></div>
        </div>
        // <div style={backgroundImageStyle}></div>
        // {user.image.loaded ? <img src={user.image.src}/> : "" }
    )
}

export default App