import Image from "next/image";

export default function Home() {
   return (
      <section>
         <div className="relative h-[80vh]">
            <span
               className="absolute top-0 w-full h-full bg-zinc-950 opacity-80"
               style={{ zIndex: "-1" }}
            ></span>
            <div
               className="h-[80vh] w-full overflow-hidden absolute top-0 pointer-events-none bg-cover bg-center bg-[url('/images/HeroSlider/02.jpg')] "
               style={{ zIndex: "-2" }}
            >
            
            </div>
         </div>
         سلام دنیا
         <div className="h-[15000px]">

         </div>
      </section>
   );
}
