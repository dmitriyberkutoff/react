import {useEffect, useRef, useState} from "react";
import Image from "next/image";

let listener = new WeakMap();

let observer: IntersectionObserver = new IntersectionObserver(handleIntersections, {
    threshold: 0.2,
});

function handleIntersections(entries: any[]) {
    entries.forEach(entry => {
        if (listener.has(entry.target)) {
            let target = listener.get(entry.target);

            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                listener.delete(entry.target);
                target();
            }
        }
    });
}

export function useIntersection(elem: any, callback: any) {
    useEffect(() => {
        let target = elem.current;
        listener.set(target, callback);
        observer.observe(target);

        return () => {
            listener.delete(target);
            observer.unobserve(target);
        };
    }, []);
}

export const SmartImage = ({
                               src,
                               className,
                               width,
                               height
                           }: { src: any, className: string, width: number, height: number }) => {
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);
    useIntersection(imgRef, () => {
        setIsInView(true);
    });

    return (
        <div className={className} ref={imgRef}>
            {isInView && <Image src={src} alt={"img"} width={width} height={height}/>}
        </div>
    );
};
