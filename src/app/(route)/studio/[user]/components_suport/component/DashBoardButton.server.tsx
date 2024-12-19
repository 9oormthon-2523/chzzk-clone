import React from 'react';

interface DashBoardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    customStyle?: string; 
    theme?:"white"|"blue"
}

const DashBoardButton = (props: DashBoardButtonProps) => {
    const { customStyle, children, theme ,...rest } = props;
    const style = theme === 'white' ? " bg-[#4e41db26] text-[#4e41db]":" bg-[#4e41db] text-[#fff]" ;
    const basicStyle = " box-border w-[130px] min-w-[0px] p-0 h-[40px] font-gothic font-black inline-flex items-center justify-center text-[13px] leading-[18px] relative align-top rounded-[5px] filter hover:brightness-90"
    return (
        <button className={customStyle + style + basicStyle} {...rest}>
            <span className='pt-[3px]'>
            {children}
            </span>
        </button>
    );
};

export default DashBoardButton;
