import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel";
  disabled?: boolean;
  className?: string;
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  className,
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-slate-900 mb-1.5">{label}</FormLabel>
          <FormControl>
            <Input
              className={cn(
                "h-10 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
                "transition-colors",
                disabled ? "opacity-50 cursor-not-allowed" : "",
                className
              )}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-sm text-red-500 mt-1" />
        </FormItem>
      )}
    />
  );
};

export default FormField;
