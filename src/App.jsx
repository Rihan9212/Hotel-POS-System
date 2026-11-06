import React, { useEffect, useState } from 'react'
import CardSidebar from './components/CardSidebar.jsx'
import { Clock, Hotel, Menu, Pizza, Receipt, Search } from 'lucide-react'
import menuData from './data/menu.json'
import MenuTitle from './components/MenuTitle.jsx'
import OrderHistory from './components/OrderHistory.jsx'
import Receipts from './components/Receipts.jsx'



const App = () => {

  const [showHistory, setShowHistory] = useState(false);
  const [printOrder,setPrintOrder]= useState(null);

  //Load previous cart items from Local storage
  const [cart, setCart] = useState(() =>{
    const savedCard = localStorage.getItem("hotel-os-cart");
    return savedCard ? JSON.parse(savedCard) : [];
  });

   //Load previous order details from Local storage
  const [orders, setOrders] = useState(() =>{
    const savedOrders = localStorage.getItem("hotel-os-orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

useEffect(()=> {
  localStorage.setItem("hotel-os-cart",JSON.stringify(cart))
}, [cart]);


useEffect(()=> {
  localStorage.setItem("hotel-os-orders",JSON.stringify(orders))
}, [orders]);


  //Update card items
  const updateCard = (item, quantity) => {
      setCart((prev) =>{
        const existing = prev.find((i) => i.id === item.id);
        if(existing){
          const newQty=existing.quantity + quantity;
          if(newQty<=0)
            return prev.filter((i) => i.id !== item.id);
          return prev.map((i)=> (i.id===item.id ? {...i, quantity: newQty}:i));
        }


        if(quantity>0) return [...prev, {...item, quantity:1}];
        return prev;

      })
      
    };




const categories=["All",...new Set(menuData.map((item) => item.category))];
const [selectedCategory, setSelectedCategory]=useState("All");
const [searchTerms, setSearchTerms]=useState("");

const filteredMenu = menuData.filter((item) =>{
  const matchesCategory = selectedCategory === "All"  || item.
  category === selectedCategory;
  const matchesSearch = item.name.toLowerCase().includes
  (searchTerms.toLowerCase());
  return matchesCategory && matchesSearch;
});


// clear card
  const handleClear =() => {
    if(window.confirm("Clear all times from card?")) {
      setCart([]);
    }
  };

  //print Receipt
  const handlePrint=()=>{
    const newOrder={
      id:"POS-"+Date.now().toString(),
      date:new Date().toDateString("dd-MM-YYYY"),
      items: cart,
      total:cart.reduce((sum, item)=> sum + item.price * item.quantity, 0) * 1.05,
    };
    setOrders((prev)=> [...prev, newOrder]);
    setPrintOrder(newOrder);
    setTimeout(() => {
      window.print();
      setCart([]);
          setPrintOrder(null);
    });
  };


  const handleHistoryPrint= (order)=>{
    setPrintOrder(order);
    setTimeout(() => {
    window.print();
    setPrintOrder(null);
    });
  }

  return (
          <div className="flex h-screen bg-slate-50 overflow-hidden">
              {/* main component */}
              <main className='flex-1 flex flex-col min-w-0'>
                <header className='bg-white border-b border-slate-200 p-6 flex items-center justify-between' >
              {/* Brand Name */}
                    <div className='flex items-center'>
                          <div>
                            <h1 className='text-2xl font-black   tracking-tight flex items-center
                                            gap-2 text-orange-500 mb-2'  >
                            <Pizza size={32} /> BiteDesk
                            </h1>
                            <p className='text-slate-400 text-sm font-medium'>Table #04 - Cashier: Admin </p>
                         </div>
            </div>

  {/* History + Search */}
  <div className='flex items-center space-x-4'>
          <button className='flex items-center gap-2 px-4 py-4 bg-slate-100 
                             text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-bold' 

          onClick={()=> setShowHistory(true)}>
          <Clock />
           History 
          </button>
              <div className='relative'>
              <Search className='absolute top-2.5 left-2 w-4 h-4'/>
                <input type="text"
                       value={searchTerms}
                       onChange={(e) => setSearchTerms(e.target.value)}
                       placeholder='search food...' 
                       className='pl-10 pr-4 py-2 bg-slate-100 border-none
                                  rounded-xl text-sm focus:ring-slate-900 w-64' />
    
              </div>
    </div>

</header>


    {/* Categories */}
    <div className='p-6 overflow-x-auto bg-white border-b border-slate-100 no-scrollbar'>
      <div className='flex space-x-2'>
        {categories.map((cat,index) =>(
        <button 
        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all 
          ${selectedCategory===cat?
          "bg-slate-900 text-white shadow-slate-200 scale-105":"bg-slate-50 text-slate-500 hover:bg-slate-100"}`} 
          key={index}
          onClick={(e) => setSelectedCategory(cat)}
           >
            {cat}
            
            </button>))}
      </div>
    </div>


    {/* Menus Tile*/}
    <div className='flex-1 overflow-y-auto p-6 custom-scrollbar'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredMenu.map((item)=>
            <MenuTitle key={item.id} item={item} onUpdate={updateCard}/>)}
            </div>
    </div>
      </main>


      {/* card sidebar */}
      <aside className='w-100 shrink-0'>
        <CardSidebar cart={cart} onClear={handleClear} onUpdate={updateCard} onPrint={handlePrint}/>
      </aside>


      {/* Print Area */}
        <div id='printable-area' className='hidden'>
          
          <Receipts orderDetails={printOrder} cart={printOrder?printOrder.items : cart}/>
          
           
          </div>      
          
    {showHistory && <OrderHistory orders={orders}
    onclose={()=> setShowHistory(false)} onPrint={handleHistoryPrint}/>}
    </div>
  );
}

export default App
