import Image from "next/image";
import MenuItem from "../menue/MenuItem";
import SectionHeaders from "./SectionHeaders";
export default function HomeMenu(){
    return(
        <section >
            <div className="absolute left-0 right-0 w-full justiify-start">
                <div className="h-48 absolute -top-12 left-0 -z-10">
                    <Image src={'/salad11.png'} width={109} height={189} alt="sallad"/>
                </div>
                <div className="h-48 absolute -top-24 right-0 -z-10">
                    <Image src={'/salad12.png'} width={107} height={195} alt="sallad"/>
                </div>
            </div>
            <div className="text-center mb-4">
                <SectionHeaders subHeader={'Check Out'} mainHeader={'Menu'}/>
            </div>    
            <div className="grid grid-cols-3 gap-4">
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
            </div>
        </section>
    );
}