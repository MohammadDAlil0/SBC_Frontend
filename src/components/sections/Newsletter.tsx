import React from 'react'
import { Button } from '../ui/button'

function Newsletter() {
  return (
    <section
      id="contact"
      className="flex justify-between md:items-center md:flex-row flex-col py-16 px-6 container-padding bg-white"
    >
      <div className="md:text-[40px] text-[28px]">
        <h2 className="font-[800] mb-4">اشترك بالنشرة البريدية الان</h2>
        <p className="text-gray-600 font-[400] mb-6">وابـقَ على اطلاع</p>
      </div>

      <Button className="primary-theme-btn text-white rounded-full px-6 py-2 font-[900] md:text-[24px] text-[20px] h-[54px] w-[192px] cursor-pointer">
        اشترك الان
      </Button>
    </section>
  )
}

export default Newsletter
