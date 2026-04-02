import { Variants } from "framer-motion";

// basic fade
export const pageTransitionInOut: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

export const zoomEffect: Variants = {
    initial:{ 
        opacity: 0, 
        scale: 0.996
    },
    animate:{ 
        opacity: 1, 
        scale: 1
    },
    exit:{ 
        opacity: 0, 
        scale: 0.996
    }
}
export const slideFromTop: Variants = {
    initial:{ 
        opacity: 0, 
        y: -20
    },
    animate:{ 
        opacity: 1, 
        y: 0
    },
    exit:{ 
        opacity: 0, 
        y: -20
    }
}
export const slideFromRight: Variants = {
    initial:{ 
        opacity: 0, 
        x: 50
    },
    animate:{ 
        opacity: 1, 
        x: 0
    },
    exit:{ 
        opacity: 0, 
        x: 50
    }
}

export const bounce: Variants = {
    initial:{ 
        // backdropFilter:'blur(0rem)',
        // opacity: 0, 
        scale: 0.97,
    },
    animate:{ 
        // backdropFilter:'blur(5rem)',
        // opacity: 1, 
        scale: [.97,1.02,1],
    },
    exit:{ 
        // backdropFilter:'blur(0rem)',
        scale: 0.97,
        opacity:0,
    }
}

export const progressiveShowUp: Variants = {
    initial:{
        backdropFilter:'blur(0rem)',
        opacity: 0,
    },
    animate:{ 
        backdropFilter:'blur(2.5rem)',
        opacity: 1,
    },
    exit:{ 
        backdropFilter:'blur(0rem)',
        opacity: 0, 
        transition:{
            opacity:{ delay: .15, duration: .2, ease:'easeInOut' }
        }
    }
}
export const progressiveShowUpWithZoom: Variants = {
    initial:{
        scale:.99,
        opacity: 0,
    },
    animate:{
        scale:1,
        opacity: 1,
    },
    exit:{ 
        scale:.99,
        opacity: 0,
    }
}

// used for the closing button
export const zoomEffect2: Variants = {
    initial:{
        opacity: 0, 
        scale: 0.5,
    },
    animate:{
        opacity: 1, 
        scale: [.97,1.2,1],
    },
    exit:{
        scale: 0.5,
        opacity: 0,
        transition:{
            opacity:{ delay: 0, duration: 0.2, ease:'easeInOut' }
        }
    }
}

// menuBar dot
export const zoomEffect3: Variants = {
    initial:{
        opacity: 0, 
        scale: 0.3,
    },
    animate:{
        opacity: 1, 
        scale: 1,
    },
    exit:{
        scale: 0.3,
        opacity: 0,
        transition:{
            opacity:{ delay: 0.2, duration: 0.2, ease:'easeInOut' }
        }
    }
}
export const zoomEffect4: Variants = {
    initial:{
        opacity: 0, 
        transform: 'translate(-50%,2.2rem)'
    },
    animate:{
        opacity: 1, 
        transform: 'translate(-50%,2.5rem)'
    },
    exit:{
        opacity: 0,
        transform: 'translate(-50%,2.2rem)'
    }
}

// ----- testing out -----

export const slideInOut: Variants = {
    initial: { opacity: 0, x: '-100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
}

export const slideWithStagger: Variants = {
    initial: {
        x: '-100vw',
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.3,
        },
    },
    exit: {
        x: '100vw',
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: "easeIn",
        },
    },
}

export const headerAppearance: Variants = {
    initial:{ 
        opacity: 0,
        // scale:.1,
        // y: -20
    },
    animate:{ 
        opacity: [0,1],
        // scale:[.98,1.04,1],
        margin:['0 4rem','0 -1rem','0rem']
        // y: 0
    },
    exit:{ 
        opacity: 0,
        // scale:[1,1.04,.98],
        margin:['0','0 4rem']
        // y: -20
    }
}
// like progressiveShowUp but exit is delayed so the image disappears before the background
export const imageViewerShowUp: Variants = {
    initial:{
        backdropFilter:'blur(0rem)',
    },
    animate:{
        backdropFilter:'blur(2.5rem)',
    },
    exit:{
        backdropFilter:'blur(0rem)',
        transition:{
            backdropFilter:{ duration: .5, ease:'easeInOut' },
            // opacity:{ delay: .2, duration: .5, ease:'easeInOut' }
        }
    }
}

// staggered enter/exit for filtered post lists
export const postItem: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: Math.min(i, 5) * 0.05, duration: 0.3, ease: 'easeOut' }
    }),
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.18, ease: 'easeIn' } },
}

// direction-aware slide for image navigation: pass custom={1} for forward, custom={-1} for back
export const slideNav: Variants = {
    initial: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    animate: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
}

export const imageWrapper: Variants = {
    initial:{ 
        opacity: 0,
        // scale:.1,
        // y: -20
    },
    animate:{ 
        opacity: [0,1],
        // scale:[.98,1.04,1],
        margin:['0 4rem','0 -1rem','0rem'],
        // y: 0

    },
    exit:{ 
        opacity: 0,
        // scale:[1,1.04,.98],
        margin:['0','0 4rem']
        // y: -20
    }
}