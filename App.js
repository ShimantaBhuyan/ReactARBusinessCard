import React, {useState, useEffect} from "react"

import randomColor from "random-color"

const App = () => {
    const [ count, setCount ] = useState(0)
    const [ colour, setColor ] = useState()

    useEffect( () => {
        setColor(() => randomColor().hexString())
        return () => {
            setColor(() => randomColor().hexString())
        }
    }, [])

    useEffect( () => {
        setColor(() => randomColor().hexString())
    }, [count])

    const increment = (event) => {
        setCount((prevCount) => {
            return prevCount + 1
        })
    }

    return (
        <div>
            <p style={{color: colour}}>{count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    )
}

export default App