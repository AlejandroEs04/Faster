import { MutatingDots } from "react-loader-spinner"

const LoaderMain = () => {
    return (
        <div className='flex justify-center w-full'>
            <MutatingDots 
                visible={true}
                height={100}
                width={100}
                color='#0ea5e9'
                secondaryColor='#0284c7'
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default LoaderMain