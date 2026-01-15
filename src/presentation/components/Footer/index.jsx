import '../../../styles/index.css'
import '../../../styles/font.css'

function Footer() {
    return (
        <div className="w-full h-80 bg-gray-800 text-gray-200 py-6 flex justify-center items-cente">
            <div className="flex flex-col gap-10 justify-center items-center">
                <div>
                    <div className="text-green-200">Contact for work, copyright and more:</div>
                    <div className="text-gray-400 hover:text-gray-300 transition text-center">dammetruyen@gmail.com</div>
                </div>
                <div className="flex flex-col">
                    <a href="" className=" text-gray-400 hover:text-gray-300 transition text-center">Điều khoản dịch vụ</a>
                    <a href="" className=" text-gray-400 hover:text-gray-300 transition text-center">Chính sách bảo mật</a>
                </div>
                <div className="text-gray-300">
                    © 2025 - dammetruyen.net
                </div>
            </div>
        </div>
    )
}

export default Footer;