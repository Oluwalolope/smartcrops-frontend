type CardProps = {
    children: React.ReactNode;
    className?: string;
}

const Card = ({ children, className }: CardProps) => {
    return (
        <div className={`bg-card text-card-foreground flex flex-col gap-6 rounded-xl border ${className || ''}`}>{children}</div>
    );
}
 
export default Card;