type TypographyProps<T> = {
  children: React.ReactNode;
} & React.HTMLAttributes<T>;

export function TypographyH1({
  children,
  ...props
}: TypographyProps<HTMLHeadElement>) {
  return (
    <h1
      {...props}
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${props.className}`}
    >
      {children}
    </h1>
  );
}

export const TypographyH2 = ({
  children,
  ...props
}: TypographyProps<HTMLHeadElement>) => {
  return (
    <h2
      {...props}
      className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${props.className}`}
    >
      {children}
    </h2>
  );
};

export const TypographyH3 = ({
  children,
  ...props
}: TypographyProps<HTMLHeadElement>) => {
  return (
    <h3
      {...props}
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${props.className}`}
    >
      {children}
    </h3>
  );
};

export const TypographyH4 = ({
  children,
  ...props
}: TypographyProps<HTMLHeadElement>) => {
  return (
    <h4
      {...props}
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${props.className}`}
    >
      {children}
    </h4>
  );
};

export const TypographyP = ({
  children,
  ...props
}: TypographyProps<HTMLParagraphElement>) => {
  return (
    <p {...props} className={`leading-7 ${props.className}`}>
      {children}
    </p>
  );
};

export const TypographyLead = ({
  children,
  ...props
}: TypographyProps<HTMLParagraphElement>) => {
  return (
    <p {...props} className={`text-xl ${props.className}`}>
      {children}
    </p>
  );
};
