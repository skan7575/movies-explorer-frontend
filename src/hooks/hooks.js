import {useState} from "react";

const useFormValidtation = () => {
    const [values, setValues] = useState('')
    const [errors, setErrors] = useState('')
    const [isValid, setIsValid] = useState(false)

    const handleChange = (e) => {
        const target = e.target
    }
}