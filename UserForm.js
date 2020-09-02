import React, { Component } from "react"
import { render } from "react-dom"

const UserForm = (props) => {
    return (
        <form onSubmit={props.onSubmit} className="formControl">
            <label>
                Enter name
                <input name="name" type="text" required value={props.name} onChange={props.onChange}/>
            </label> 
            <label>
                Enter organisation
                <input name="org" type="text" required value={props.org} onChange={props.onChange}/>
            </label>
            <label>
                Enter designation
                <input name="designation" type="text" required value={props.designation} onChange={props.onChange}/>
            </label>
            <label>
                Enter email address
                <input name="email" type="email" required value={props.email} onChange={props.onChange}/>
            </label>
            <label>
                Enter phone number
                <input name="phone" type="text" required value={props.phone} onChange={props.onChange}/>
            </label>
            <label>
                Enter portfolio URL
                <input name="portfolio" type="text" value={props.portfolio} onChange={props.onChange}/>
            </label>
            <label>
                Enter LinkedIn profile URL
                <input name="linkedin" type="text" required value={props.linkedin} onChange={props.onChange}/>
            </label>
            <label>
                Enter Github profile URL
                <input name="github" type="text" value={props.github} onChange={props.onChange}/>
            </label>
            <label>
                Upload your business card
                <input name="image" type="file" value={props.image} onChange={props.onChange} accept="image/*" required/>
            </label>
            <button type="submit">Submit Details</button>
        </form>
    )
}

export default UserForm