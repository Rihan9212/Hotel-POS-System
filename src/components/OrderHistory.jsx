import React from 'react'
import { ChefHat, Pizza, Printer, X } from "lucide-react"

const OrderHistory = ({ orders, onclose, onPrint }) => {
  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex
    items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl
      w-full max-w-4xl max-h-[80vh] flex-col
      overflow-hidden animate-in fade-in zoom-in
      duration-200'>
        <div className='p-6  border-b border-slate-100 flex 
        justify-between items-center bg-slate-50'>
          <h2 className='text-2xl font-bold text-slate-800'>
            Order History
          </h2>
          <button className='w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center
          justify-center hover:bg-rose-50
          hover:text-rose-500 transition-colors'
          onClick={onclose}>
            <X  className='w-5 h-5'/>
          </button>
        </div>
        <div className='flex-1 overflow-y-auto p-6
        custom-scrollbar'>
          {orders.length === 0 ? (
          <>
          <div className='flex flex-col items-center justify-center h-64 text-slate-400'>
            <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4'>
              <ChefHat />
              </div>
              <p className='font-medium'>No history found</p>
              </div>
              </>
              ):(
              <div className='grid gap-4'>
                {orders.reverse().map((order) =>(
                  <div key={order.id} className='bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <div className='flex items-center gap-2'>
                          <span className='font-bold text-slate-900'>#{order.id}</span>
                          <span className='text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium'>Completed</span>
                        </div>
                        <p className='text-sm text-slate-500 mt-1'>{order.date}</p>
                      </div>
                      <div className='text-right'>
                        <p className='text-lg font-bold text-slate-900'>${order.total.toFixed(2)}</p>
                        <div className='flex items-center gap-2 justify-end mt-1'>
                          <p className='text-xs text-slate-500'>
                            {order.items.length} items
                          </p>
                          <button className='p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-60 transition-colors' title='Print Receipt'
                          onClick={()=>
                            onPrint(order)
                          }>
                           <Printer className='w-4 h-4' />
                        </button>
                        </div>
                      </div>
                    </div> 
                    <div className='bg-slate-50 rounded-lg p-3'>
                      <div className='flex flex-wrap gap-2'>{order.items.map((item,index)=>(
                        <span key={index}
                         className='text-xs text-slate-600 border border-slate-200 bg-white px-2 py-1 rounded'>
                          {item.quantity} x {item.name}
                         </span>
                      ))}</div>
                    </div>
                  </div>
                ))}
              </div>
              )}
        </div>

        <div className='p-4 bg-slate-50 border-t 
        border-slate-100 text-center text-xs 
        text-slate-400'></div>
           Showing last {orders.length} orders </div>
    </div>
  )
}

export default OrderHistory
