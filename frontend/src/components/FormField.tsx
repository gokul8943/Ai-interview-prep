import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: "text" | "email" | "password";
}

const FormField = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type,
}: FormFieldProps<T>) => {
    return (
        <Controller name={name} control={control} render={({ field }) => (
            <FormItem>
                <FormLabel className='label'>{label}</FormLabel>
                <FormControl>
                    <Input
                        className="input text-white"
                        type={type}
                        placeholder={placeholder}
                        {...field}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
    )
}

export default FormField
