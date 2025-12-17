type CardContentProps = {
    children: React.ReactNode;
    className?: string;
}

const CardContent = ({ children, className }: CardContentProps) => {
    return (
        <div className={`px-6 last:pb-6 ${className || ''}`}>{children}</div>
    );
}
 
export default CardContent;