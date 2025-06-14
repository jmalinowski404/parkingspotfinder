export default function LoginBtns() {
    return (
        <>
            <div className="flex flex-row gap-6">
                <button id='login' className='bg-secondaryBtn px-6 py-2 rounded-[14px] font-medium text-black'>Log In</button>
                <button id='signup' className='bg-primaryBtn px-6 py-2 rounded-[14px] font-medium text-white'>Sign Up</button>
            </div>
        </>
    )
}