export default function 设置Option(props: {
    focused?: boolean;
    heading?: string;
    description?: any;
    children?: any;
    span?: number;
    collapsed?: boolean;
}) {
    if (!props.heading || props.collapsed) {
        return props.children;
    }

    return (
        <section class名称={props.focused ? 'focused' : ''}>
            {props.heading && <h3>{props.heading}</h3>}
            {props.description && <div style={{
                fontSize: "90%",
                opacity: 0.9,
                marginTop: '-0.5rem',
            }}>
                {props.description}
            </div>}
            {props.children}
        </section>
    );
}