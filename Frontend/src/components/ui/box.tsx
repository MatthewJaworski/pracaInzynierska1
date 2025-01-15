import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const boxClass = cva('container rounded-xl p-4', {
  variants: {
    variant: {
      default: '',
      card: 'shadow-sm border shadow '
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxClass> {}

export const Box = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={boxClass({ variant, className })}>
        {children}
      </div>
    );
  }
);
Box.displayName = 'Box';
