import React from 'react'

const CreateAdSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="text-2xl font-semibold text-[#0f172a] mb-3">Créez votre première annonce.</h3>
                    <p className="text-gray-600 mb-6">Vous pouvez créer une annonce professionnelle et la publier rapidement.</p>

                    <div className="rounded-lg border p-6 bg-white shadow-sm max-w-sm">
                        <h4 className="font-semibold mb-2">Créez votre annonce pour 9.00 CHF</h4>
                        <p className="text-sm text-gray-600 mb-4">Publiez dès maintenant et atteignez des acheteurs.</p>
                        <button className="rounded-md bg-[#2D5A4E] px-4 py-2 text-white">Créez votre annonce</button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <img src="/img/login.png" alt="thumb" className="w-full h-40 object-cover rounded-lg" />
                    <img src="/img/login.png" alt="thumb" className="w-full h-40 object-cover rounded-lg" />
                    <img src="/img/login.png" alt="thumb" className="w-full h-40 object-cover rounded-lg col-span-2" />
                </div>
            </div>
        </section>
    )
}

export default CreateAdSection
