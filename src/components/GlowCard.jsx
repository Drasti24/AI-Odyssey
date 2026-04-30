import React, { useEffect, useRef } from 'react';

// Maps hex to roughly equivalent HSL values (Hue, Saturation, Lightness)
// We will use these for the dynamic spotlight effects.
function hexToHSL(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    r /= 255; g /= 255; b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0, s = 0, l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

export default function GlowCard({
    children,
    className = '',
    color = '#22d3ee', // default cyan
    isHighlighted = false,
}) {
    const cardRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {
        const syncPointer = (e) => {
            if (!cardRef.current) return;
            // Calculate mouse position relative to the viewport
            const x = e.clientX;
            const y = e.clientY;

            cardRef.current.style.setProperty('--x', x.toFixed(2));
            cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
            cardRef.current.style.setProperty('--y', y.toFixed(2));
            cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
        };

        // We bind to the document so the glow follows the mouse even when not directly hovering
        document.addEventListener('pointermove', syncPointer);
        return () => document.removeEventListener('pointermove', syncPointer);
    }, []);

    const hsl = hexToHSL(color);
    // Base hue, we use spread to shift hue slightly based on mouse x position (xp)
    const baseHue = hsl.h;
    const spread = 40; // amount to shift hue

    const getInlineStyles = () => {
        return {
            '--base': baseHue,
            '--spread': spread,
            '--saturation': hsl.s,
            '--lightness': hsl.l,
            '--radius': '16',
            '--border': '1',
            '--backdrop': isHighlighted ? `hsl(${baseHue} ${hsl.s}% ${hsl.l}% / 0.15)` : 'rgba(15, 15, 25, 0.85)',
            '--backup-border': isHighlighted ? `hsl(${baseHue} ${hsl.s}% ${hsl.l}% / 0.6)` : 'rgba(255, 255, 255, 0.1)',
            '--size': '250', // size of the spotlight
            '--outer': '1',
            '--border-size': 'calc(var(--border, 2) * 1px)',
            '--spotlight-size': 'calc(var(--size, 150) * 1px)',
            '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
            backgroundImage: `radial-gradient(
                var(--spotlight-size) var(--spotlight-size) at
                calc(var(--x, 0) * 1px)
                calc(var(--y, 0) * 1px),
                hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / 0.25), transparent
            )`,
            backgroundColor: 'var(--backdrop, transparent)',
            backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
            backgroundPosition: '50% 50%',
            backgroundAttachment: 'fixed',
            border: 'var(--border-size) solid var(--backup-border)',
            boxShadow: isHighlighted ? `0 0 20px hsl(${baseHue} ${hsl.s}% ${hsl.l}% / 0.3)` : '0 1rem 2rem -1rem black',
            position: 'relative',
            touchAction: 'none',
        };
    };

    const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / 1), transparent 100%
      );
      filter: brightness(2);
    }
    
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / 0.8), transparent 100%
      );
    }
    
    [data-glow] > [data-glow-inner] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 10);
      filter: blur(calc(var(--border-size) * 8));
      background: none;
      pointer-events: none;
      border: none;
    }
    
    [data-glow] > [data-glow-inner]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
            <div
                ref={cardRef}
                data-glow
                style={getInlineStyles()}
                className={`
          rounded-2xl 
          relative 
          shadow-[0_2rem_3rem_-1rem_rgba(0,0,0,0.5)] 
          backdrop-blur-[12px]
          transition-all duration-500
          hover:-translate-y-2
          ${className}
        `}
            >
                <div ref={innerRef} data-glow-inner></div>
                <div className="relative z-10 h-full w-full">
                    {children}
                </div>
            </div>
        </>
    );
}
