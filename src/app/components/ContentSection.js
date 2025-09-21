import Image from "next/image"

const ContentSection = ({ id }) => {
    return (
        <section id={id}  className="py-24">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
                
                {/* Left Image */}
                <div className="flex md:flex-1 rounded-2xl bg-gradient-to-tr from-purple-600/10 via-purple-200/30 to-purple-100">
                
                    <Image 
  src="/Logo SMG2.png"
  alt="working on housing"
  width={1300}
  height={900}
  className="w-full md:h-full object-cover rounded-2xl animate-float"
/>

                </div>

                {/* Right Content Box */}
                <div className="relative md:w-1/2 lg:w-[54%]">
                    
                    {/* Gradient Background Box */}
                    <div className="w-full relative py-10 px-8 rounded-2xl bg-gradient-to-tr from-purple-600/10 via-purple-200/30 to-purple-100">

                        {/* Top Right Gradient Blobs */}
                        <div className="absolute right-0 top-0 h-full w-full flex justify-end pointer-events-none">
                            <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
                                <span className="absolute w-16 h-16 -top-1 -right-1 bg-purple-600 rounded-md rotate-45" />
                                <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-pink-400 rounded-md rotate-45" />
                                <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-400 rounded-md rotate-45" />
                            </div>
                        </div>

                        {/* Bottom Left Gradient Blobs */}
                        <div className="absolute left-0 bottom-0 h-full w-full flex items-end pointer-events-none">
                            <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
                                <span className="absolute w-16 h-16 -top-1 -right-1 bg-purple-600 rounded-md rotate-45" />
                                <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-pink-400 rounded-md rotate-45" />
                                <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-400 rounded-md rotate-45" />
                            </div>
                        </div>

                        {/* Actual Content */}
                        <div className="relative space-y-12 text-gray-700">
                            <h1 className="text-gray-900 font-semibold text-2xl sm:text-3xl md:text-4xl">
                               Our Commitment towards {" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500">
                                    Culture & Environment
                                </span>{" "}
                                for Future Genrations
                            </h1>
                            <p>
✨ “Sanskriti Mahila Group celebrates India’s culture and festivals, while working for the environment and community. Our mission is to preserve traditions, protect nature, and empower society with care and unity.” 🌿                            </p>

                            {/* Feature Grid */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-6 p-4 rounded-xl bg-white/80 border border-purple-100 backdrop-blur-sm">
                                    <span className="rounded-full bg-purple-600 text-white w-max p-3 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                        </svg>
                                    </span>
                                    <h2 className="font-semibold text-xl text-gray-900">Our mission</h2>
                                    <p>To bring people together by celebrating culture, caring for nature, and serving society.</p>
                                </div>

                                <div className="space-y-6 p-4 rounded-xl bg-white/80 border border-purple-100 backdrop-blur-sm">
                                    <span className="rounded-full bg-purple-600 text-white w-max p-3 flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </span>
                                    <h2 className="font-semibold text-xl text-gray-900">Our vision</h2>
                                    <p>A future where tradition inspire, nature thrives and people live in harmony.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ContentSection
