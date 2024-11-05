import React, {
    createContext,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
} from "react";
import confetti from "canvas-confetti";

const ConfettiContext = createContext({});

const Confetti = forwardRef((props, ref) => {
    const {
        options,
        globalOptions = { resize: true, useWorker: true },
        manualstart = false,
        children,
        ...rest
    } = props;
    const instanceRef = useRef(null); // confetti instance

    const canvasRef = useCallback(
        (node) => {
            if (node !== null) {
                if (instanceRef.current) return; // if not already created
                instanceRef.current = confetti.create(node, {
                    ...globalOptions,
                    resize: true,
                });
            } else {
                if (instanceRef.current) {
                    instanceRef.current.reset();
                    instanceRef.current = null;
                }
            }
        },
        [globalOptions]
    );

    const fire = useCallback(
        (opts = {}) => instanceRef.current?.({ ...options, ...opts }),
        [options]
    );

    const api = useMemo(
        () => ({
            fire,
        }),
        [fire]
    );

    useImperativeHandle(ref, () => api, [api]);

    useEffect(() => {
        if (!manualstart) {
            fire();
        }
    }, [manualstart, fire]);

    return (
        <ConfettiContext.Provider value={api}>
            <canvas ref={canvasRef} {...rest} />
            {children}
        </ConfettiContext.Provider>
    );
});

const ConfettiButton = ({ options, children, ...props }) => {
    const handleClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        confetti({
            ...options,
            origin: {
                x: x / window.innerWidth,
                y: y / window.innerHeight,
            },
        });
    };

    return (
        <button onClick={handleClick} {...props}>
            {children}
        </button>
    );
};

Confetti.displayName = "Confetti";

export { Confetti, ConfettiButton };
