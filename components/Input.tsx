import { clsx } from 'clsx';

interface InputProps {
    type?: string,
    placeholder?: string,
    value?: any,
    className?: string,
    name?: string,
    id?: string,
    onChange?: (e: any) => void
}

const Input = ({
    type,
    placeholder,
    className,
    value,
    name,
    id,
    onChange
}:InputProps) => {
    return <input name={name} id={id} type={type ?? "text"}value={value} placeholder={placeholder ?? ""} className={clsx('px-5 py-3 rounded-md w-full shadow-md border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-5', 
    className)} onChange={onChange}/>
}

export default Input