type CardDescriptionProps = {
    children: React.ReactNode;
    className?: string;
}

const CardDescription = ({children, className}: CardDescriptionProps) => {
    return ( <div className={`text-sm text-muted-foreground ${className || ''}`}>{children}</div> );
}
 
export default CardDescription;