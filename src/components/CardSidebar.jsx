import { Minus, Plus, Printer, ShoppingBasket, Trash2 } from 'lucide-react';
import React from 'react'

const CardSidebar = ({cart, onClear, onUpdate, onPrint}) => {
 

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity,
  0);

  const tax =subtotal * 0.05; //5% tax
  const total = subtotal + tax;



  return (

    <div className='h-full flex flex-col bg-white border-l border-slate-20
    shadow-xl'>
      <div className='p-6 border-b border-slate-100 flex justify-between'>
        <h2 className='text-xl font-bold text-slate-800'>
            New order
        </h2>
        <button onClick={()=> onClear()} className='text-xs text-rose-500 font-medium hover:bg-rose-50 px-3 py-1 rounded-full transition-colors flex items-center gap-2'>
          <Trash2 className='w-4 h-4' />Clear All</button>
      </div>
      <div className='flex-1 overflow-y-auto p-6 custom-scrollbar'>
          {cart.length===0 ? (
          <div className='h-full flex flex-col items-center justify-center text-slate-300 space-y-4'>
            <div className='w-16 h-16 bg-slate-50 rounded-full flex items-center
          justify-center'>
              <ShoppingBasket />
            </div>
            <p className='font-medium'>your Cart is empty...!</p>
            </div>
            ):(
               <div className='space-y-4'>
                {cart.map((item)=> (
                  <div key={item.id} className='flex items-center justify-between 
                  group'>
                  <div className='flex-1'>
                    <h4 className='font-medium text-slate-700 text-sm'>{item.name}</h4>
                    <p className='text-xs text-slate-400'>
                      ${item.price} - {item.quantity}
                    </p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <button className='cursor-pointer w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-red-200 text-slate-600'
                    onClick={() => onUpdate(item,-1)}>
                      <Minus className='w-3 h-3' />
                    </button>
                    <span className='w-6 text-center text-sm font-bold'>
                      {item.quantity}
                    </span>
                    <button className='cursor-pointer w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-green-100 text-slate-600'
                    onClick={() => onUpdate(item,+1)}>
                      <Plus className='w-3 h-3' />
                    </button>
                  </div>
                </div>
              ))}
               </div>
                )}
      </div>
      <div className='p-6 bg-slate-50 border-slate-100 space-y-3'>
        <div className='flex justify-between text-sm text-slate-500'>
          <span>subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className='flex justify-between text-sm text-slate-500'>
          <span>Discount (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className='flex justify-between text-sm text-slate-900
        pt-2 border-t border-slate-200'>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button onClick={onPrint} 
                disabled={cart.length == 0}
                className='w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-md transition-all shadow-emerald-200 mt-4 active:scale-[0.98] flex items-center justify-center gap-2'>
          <Printer />
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default CardSidebar
