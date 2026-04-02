import { motion, Spring, Tween, Variants } from "framer-motion"
// import { zoomEffect } from "../style/animations/animations"
import { FC } from "react"

interface AnimationWrapperProps {
    children?:React.ReactNode
    animationType?:Variants
    transitionDuration?:number
    className?:string
    layout?:boolean
    layoutTransition?:Tween | Spring
    // when true, omits initial/animate/exit so a parent motion element
    // can orchestrate this child via variant propagation
    propagate?:boolean
}

const AnimationWrapper: FC<AnimationWrapperProps> = ({transitionDuration, animationType, children, className, layout, layoutTransition, propagate}) => {

    return (
        <motion.div
            variants={animationType}
            {...(!propagate && { initial:'initial', animate:'animate', exit:'exit' })}
            transition={{
                duration:transitionDuration,
                ease:'easeInOut',
                layout:layout ? (layoutTransition ?? {type:'tween',ease:'easeInOut'}) : undefined
            }}
            className={`animationWrapper ${className ? ` ${className}` : ''}`}
            layout={layout}
        >
            {children}
        </motion.div>
    )
}

export default AnimationWrapper