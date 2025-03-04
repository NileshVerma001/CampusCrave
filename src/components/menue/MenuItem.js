export default function MenuItem(){
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all" >
                    <div className="text-center">
                        <img src="/pizza.png" className="max-h-auto max-h-24 block mx-auto" alt="pizza"/>
                    </div>
                    <h4 className="font-semibold my-2 text-xl">Choole Bhature</h4>
                    <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vivamus vitae magna sit amet quam fringilla commodo.
                    </p>
                    <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">Add To Cart $24</button>
                </div>
    );
}