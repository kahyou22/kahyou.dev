import { ButtonHTMLAttributes, forwardRef } from "react";

export type Variant = "primary" | "secondary" | "outline" | "ghost";
export type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconOnly?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      iconOnly = false,
      className,
      children,
      type = "button",
      disabled,
      ...rest
    },
    ref
  ) => {
    const classes = [
      "btn",
      variant,
      size,
      iconOnly ? "icon-only" : "",
      className || "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
