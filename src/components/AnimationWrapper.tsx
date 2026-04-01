import { motion, Spring, Tween, Variants } from "framer-motion"
import { zoomEffect } from "../style/animations/animations"
import { FC } from "react"

interface AnimationWrapperProps {
    children?:React.ReactNode
    animationType?:Variants
    transitionDuration?:number
    className?:string
    layout?:boolean
    layoutTransition?:Tween | Spring
}

const AnimationWrapper: FC<AnimationWrapperProps> = ({transitionDuration, animationType, children, className, layout, layoutTransition}) => {

    return (
        <motion.div
            variants={animationType ? animationType : zoomEffect}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
                duration:transitionDuration ? transitionDuration : .3,
                ease:'easeInOut',
                layout:layout ? (layoutTransition ?? {type:'tween', duration:0.5,ease:'easeInOut'}) : undefined
            }}
            className={`animationWrapper ${className}`}
            layout={layout}
        >
            {children && children}
        </motion.div>
    )
}

export default AnimationWrapper