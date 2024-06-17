import Image from "next/image";
import Right from "../icons/Right";
export default function Hero(){
    return (
        <section className="hero mt-4">
            <div className="py-12">
                <h1 className="text-4xl font-semibold">Everything<br/> is better<br/> with a&nbsp;<span className="text-primary">Pizza</span></h1>
                <p className="my-4 text-grey-500">The aroma of freshly baked pizza wafts through the air, promising a tantalizing blend of gooey cheese, savory toppings, and perfectly crisp crust.</p>
                <div className="flex gap-4">
                    <button className="bg-primary flex justify-center items-center gap-2 text-white px-4 py-2 rounded-full">
                        Order now
                        <Right/>
                    </button>
                    <button className="flex border-0 gap-2 py-2 text-grey-600 font-semibold">
                        Learn more
                        <Right/>
                    </button>
                </div>
            
            </div>
            <div className="relative">
                <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
            </div>
  </section>
    );
}