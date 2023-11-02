import { UseControllerProps, useController } from "react-hook-form"

export const Input = (props: UseControllerProps<SignUpForm>) => {

    const { field, fieldState } = useController(props)

    return (
        <div className="my-3">
            <input
                {...field}
                value={''}
                placeholder={props.name}
                className={`border ${fieldState.invalid ? 'border-red-700' : 'border-white'} p-3 text-black`}
            />
            {fieldState.error?.type === 'required' && <p className="text-red-700">Campo obrigatório</p>  }
        </div>
    )
}