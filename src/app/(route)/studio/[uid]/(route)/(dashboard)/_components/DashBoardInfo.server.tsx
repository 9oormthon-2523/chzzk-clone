export interface DashBoardBoxInfoProps {
    title:string
    info?:string

}

const DashBoardBoxInfo = (props: DashBoardBoxInfoProps) =>{
    const { info, title } = props
    return (
        <div className="font-gothic font-black ml-[4px] w-full text-[13px]">
            <span className="block leading-[18px]">
                {title}
            </span>
            { info && 
                <p className="opacity-[80%] font-extralight tracking-tight leading-5 mt-[0.5px] m-0 p-0 text-[13px]">
                    {info}
                </p>
            }
            

        </div>
    )
}

export default DashBoardBoxInfo