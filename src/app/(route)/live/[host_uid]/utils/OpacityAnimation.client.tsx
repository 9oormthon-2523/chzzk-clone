/**
 * is Hover 기반 투명도 애니메이션을 사용하는 HOC
 *
 * @example
 * // HOC로 감싸기
 * const Frame = () => {return {...</div>}}
 * const AnimatedFrame = OpacityAnimation(Frame);
 * export default AnimatedFrame 
 * */

type OpacityAnimationProps = {
    isHover: boolean;
};

const OpacityAnimation = <P extends object>( WrappedComponent: React.ComponentType<P>) => {
  return (props: P & OpacityAnimationProps) => {
    const { isHover, ...rest } = props;

    return (
      //hover animation
      <div style={{ opacity: isHover ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <WrappedComponent {...(rest as P)} />
      </div>
    );
  };
};
  
export default OpacityAnimation;