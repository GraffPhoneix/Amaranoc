export default function SendHotel() {
    return (
        <div className="relative bg-[url('https://amaranoc.am/images/footer/home-add-application.png')] bg-cover bg-center h-145 mt-20 w-full">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg m-33 mx-44 rounded-2xl border border-gray-400">
                <div className="relative z-10 text-white p-8">
                    <div className="text-[35px] text-center mt-4.5 font-bold font-sans">────────────────── РАЗМЕСТИТЬ ОБЪЯВЛЕНИЕ ──────────────────</div>
                    <div className="text-center mt-8">Введите свои данные в указанные поля и мы свяжемся с вами</div>
                    <div className="flex justify-center mt-6 gap-3">
                        <input type="text" placeholder="Имя фамилия" className="border border-gray-400 p-2.5 rounded-lg w-80" />
                        <input type="tel" placeholder="Номер телефона" className="border border-gray-400 p-2.5 rounded-lg w-80" />
                        <input type="email" placeholder="Эл. почта" className="border border-gray-400 p-2.5 rounded-lg w-80" />
                        <button className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4.5 rounded-3xl hover:cursor-pointer duration-300">Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
