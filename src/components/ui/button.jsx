import * as React from "react";

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center py-4 px-4 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
