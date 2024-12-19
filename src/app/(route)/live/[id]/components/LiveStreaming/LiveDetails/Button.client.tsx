import SvgIcon, { SvgComponentNames } from "@/app/_components/SVGIcon.server"

interface LiveButtonProps {
    onClick?: ()=> void
    svgIcon: SvgComponentNames
    svgWight?:number
    svgHeight?:number
    title?:string
    style?:string
}

function LiveButton({
    title,
    style,
    svgIcon,
    svgWight,
    svgHeight,
}:LiveButtonProps) {
    return (
        <button className={`${style} className="bg-[#1bb373] text-[#fff] rounded-[17px] pr-[16px] pl-[12px] h-[34px] inline-flex items-center justify-center gap-x-[4px] text-sm leading-none font-sans cursor-pointer transition-all duration-200 ease-in-out relative align-top focus:outline-none hover:brightness-90`}>
            <SvgIcon name={svgIcon} width={svgWight} height={svgHeight}/>
            <span>{title}</span>
        </button>
    )
  }
  
export default LiveButton