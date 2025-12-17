type CardTitleProps = {
    children: React.ReactNode;
    className?: string;
}

const CardTitle = ({children, className}: CardTitleProps) => {
    return ( <div className={`leading-none ${className || ''}`}>{children}</div> );
}
 
export default CardTitle;