import React from 'react'

const MenuTitle = ({item, onUpdate}) => {
  return (
    <div className='bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all
    cursor-pointer group active:scale-95'
    onClick={()=>onUpdate(item,1)}>
      <div className='relative overflow-hidden rounded-xl mb-3 h-56 '>
        <img src={item.image} alt={item.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
      
      <div className='absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm'>
        ${item.price}
      </div>
        
      </div>
      <h3 className='font-semibold text-slate-700 truncate'>
          {item.name}
        </h3>
        <p className='text-xs text-slate-400 mt-1'>
          {item.category}
          </p>
     
    </div>
  )
}

export default MenuTitle
