import Image from "next/image";

const iconRender = (val) => {
  switch (val) {
case "culture":
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7"
    >
      {/* Center dot */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />

      {/* Firework lines */}
      <line x1="12" y1="3" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="3" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="21" y2="12" />
      <line x1="5" y1="5" x2="8" y2="8" />
      <line x1="16" y1="16" x2="19" y2="19" />
      <line x1="5" y1="19" x2="8" y2="16" />
      <line x1="16" y1="8" x2="19" y2="5" />

      {/* Outer sparks (small dots) */}
      <circle cx="12" cy="2" r="0.8" fill="currentColor" />
      <circle cx="12" cy="22" r="0.8" fill="currentColor" />
      <circle cx="2" cy="12" r="0.8" fill="currentColor" />
      <circle cx="22" cy="12" r="0.8" fill="currentColor" />
      <circle cx="4" cy="4" r="0.8" fill="currentColor" />
      <circle cx="20" cy="20" r="0.8" fill="currentColor" />
      <circle cx="4" cy="20" r="0.8" fill="currentColor" />
      <circle cx="20" cy="4" r="0.8" fill="currentColor" />
    </svg>
  );

case "environment":
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="w-7 h-7"
    >
      <g transform="scale(1.4) translate(-4 -3)">
        {/* Soil mound */}
        <path d="M6 14c.8-1.1 2-1.7 3.3-1.7.9 0 1.8.3 2.4.9.6-.6 1.5-.9 2.4-.9 1.3 0 2.5.6 3.3 1.7-1.1 1.2-2.6 2-4.4 2H10c-1.8 0-3.3-.8-4.4-2z" />

        {/* Stem */}
        <path d="M12 12c-.2-2-.9-3.6-2.2-5S6.9 4.6 5 4.3M12 12c.2-2 .9-3.6 2.2-5s2.9-2.4 4.8-2.7" />

        {/* Left leaf */}
        <path d="M7 4c2 .2 3.6 1.3 4.5 3-1.7.5-3.5.2-5-1C6 5 6.2 4 7 4z" />

        {/* Right leaf */}
        <path d="M17 4c-2 .2-3.6 1.3-4.5 3 1.7.5 3.5.2 5-1 .5-1-.2-1.9-.5-2z" />
      </g>
    </svg>
  );



    case "social":
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-7 h-7"
    >
      {/* Center person (big) */}
      <circle cx="12" cy="7" r="3" />
      <path d="M12 12c-2.7 0-6 1.3-6 4v2h12v-2c0-2.7-3.3-4-6-4z" />

      {/* Left person (smaller) */}
      <circle cx="6" cy="9" r="2" />
      <path d="M6 12c-2 0-4 1-4 3v2h4" />

      {/* Right person (smaller) */}
      <circle cx="18" cy="9" r="2" />
      <path d="M18 12c2 0 4 1 4 3v2h-4" />
    </svg>
  );

    default:
      return <>No Icon</>;
  }
};


const FeatureItem = ({ id, title, description, advantages, icon, image }) => {
  return (
    <div className={`flex flex-col md:items-center gap-10 lg:gap-14 ${id % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
      
      {/* Left Content */}
      <div className="md:w-[48%] xl:w-[45%] md:py-6 xl:py-12 space-y-8 relative">
        
        {/* Gradient Blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-32 h-32 bg-purple-500/30 blur-3xl rounded-full top-0 left-0" />
          <div className="absolute w-32 h-32 bg-pink-400/30 blur-3xl rounded-full bottom-0 right-0" />
          
        </div>

        <div className="space-y-6">
          <span className="p-3 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 text-white w-max flex">
            {iconRender(icon)}
          </span>
          <h2 className="text-2xl font-semibold text-gray-900">
            {title}
          </h2>
          <p className="text-gray-700">
            {description}
          </p>
        </div>

        <ul role="list" className="space-y-5">
          {advantages.map(advantage => (
            <li key={advantage.id} className="flex items-start gap-3 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 20 20" 
                   fill="currentColor" 
                   className="w-5 h-5 text-purple-600">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              {advantage.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Image with Gradient Frame */}
      {/* <div className="flex-1 relative p-6 rounded-lg overflow-hidden bg-gradient-to-tr from-purple-200 via-pink-100 to-indigo-200">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-pink-400/10 to-indigo-400/10 blur-2xl" />
        <Image src="/vercel.svg" alt="illustration" width={1800} height={1200} className="w-full h-auto relative rounded-lg" />
      </div> */}
      <div className="flex-1 relative p-6 rounded-lg overflow-hidden 
                bg-gradient-to-tr from-purple-200 via-pink-100 to-indigo-200 
                group transition-all duration-500 ease-out hover:shadow-md hover:-translate-y-2">

  {/* Gradient background that animates on hover */}
  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-300 via-purple-200 to-pink-200 
                  opacity-70 blur-2xl gradient-hover" />

  {/* Image */}
<Image
  src={image}   // ✅ dynamically use the feature's image
  alt={title}
  width={1800}
  height={1200}
  className="w-full h-auto relative rounded-lg 
             transition-transform duration-700 ease-out group-hover:-translate-y-1"
/>

</div>


    </div>
  )
}

const features = [
  {
    id: 1,
    title: "Cultural Events",
    icon: "culture",
    description: "Celebrating India’s traditions through festivals, art, and community programs keeping culture alive for future generations.",
    advantages: [
      { id: 1, text: "Organizing vibrant cultural festivals and community gatherings" },
      { id: 2, text: "Promoting traditional music, dance, and arts" },
      { id: 3, text: "Engaging youth to connect with heritage and values" },
    ],
    image: "/s4-min.jpg"
  },
  {
    id: 2,
    title: "Environmental Campaigns",
    icon: "environment",
    description: "Working for a cleaner and greener tomorrow through awareness, action, and community participation.",
    advantages: [
      { id: 1, text: "Tree plantation drives and cleanliness campaigns" },
      { id: 2, text: "Awareness programs on waste management & recycling" },
      { id: 3, text: "Promoting eco-friendly habits in local communities" },
    ],
    image: "/e1.png"
  },
  {
    id: 3,
    title: "Social Welfare & Community Service",
    icon: "social",
    description: "Supporting people through initiatives that uplift communities and spread compassion.",
    advantages: [
      { id: 1, text: "Health and wellness camps for families" },
      { id: 2, text: "Educational support and skill-building for women & youth" },
      { id: 3, text: "Relief activities and aid during community needs" },
    ],
    image: "/t1.jpg"
  },
]

const Features = ({ id }) => {
  return (
    <section id={id} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="flex flex-col space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col justify-center text-center mx-auto md:max-w-2xl space-y-5">
            <span className="rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 px-3 py-3 text-md w-max mx-auto font-semibold tracking-wide text-white">
              Our Initiatives
            </span>
            <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl xl:text-5xl leading-tight">
              Celebrating Culture {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500">
                 Protecting Nature {" "}
              </span>
              Empowering Society
            </h1>
            {/* <p className="text-gray-700 max-w-lg mx-auto">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae odio consequatur aliquam ratione quod iusto aspernatur laudantium aut omnis,
            </p> */}
          </div>

          {/* Features List */}
          <div className="grid divide-y divide-gray-300/30 gap-12 children:py-5 first:pt-0 last:pb-0">
            {features.map(feature => (
              <FeatureItem key={feature.id} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features;
