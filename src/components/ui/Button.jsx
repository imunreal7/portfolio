import Magnetic from "./Magnetic";

const base =
    "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300";

const variants = {
    primary: "bg-acc text-bg hover:bg-white",
    ghost: "border border-line text-ink hover:border-acc/60 hover:text-acc",
    quiet: "text-muted hover:text-ink",
};

const Button = ({ href, onClick, children, variant = "ghost", icon: Icon, external = true }) => {
    const cls = `${base} ${variants[variant]}`;
    const content = (
        <>
            {Icon && <Icon className="h-4 w-4 transition-transform group-hover:-translate-y-px" />}
            <span>{children}</span>
        </>
    );
    return (
        <Magnetic strength={0.25}>
            {href ? (
                <a
                    href={href}
                    className={cls}
                    onClick={onClick}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                    {content}
                </a>
            ) : (
                <button type="button" onClick={onClick} className={cls}>
                    {content}
                </button>
            )}
        </Magnetic>
    );
};

export default Button;
