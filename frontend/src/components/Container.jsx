const Container = ({children, bgColor}) => {
    return (
        <div 
            className={`px-4 py-8 md:p-8 ${bgColor === 'gray' && 'bg-neutral-700'} ${bgColor === 'white' && 'bg-neutral-200'} shadow-lg hover:shadow-xl transition-shadow rounded-none md:rounded-xl backdrop-blur-xl bg-opacity-80`}
        >
            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-20'>
                {children}
            </div>
        </div>
    )
}

export default Container