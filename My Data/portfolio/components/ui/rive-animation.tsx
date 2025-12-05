"use client"

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

interface RiveAnimationProps {
    src: string; // URL to the .riv file
    className?: string;
    artboard?: string;
    animations?: string[];
    autoplay?: boolean;
}

export const RiveAnimation = ({ src, className, artboard, animations, autoplay = true }: RiveAnimationProps) => {
    const { RiveComponent } = useRive({
        src: src,
        artboard: artboard,
        animations: animations,
        autoplay: autoplay,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
        }),
    });

    return (
        <div className={className}>
            <RiveComponent />
        </div>
    );
};
