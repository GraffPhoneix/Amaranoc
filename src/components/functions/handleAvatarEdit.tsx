import { useState } from "react";
import localConfigs from '@.../configs/local.configs';
import { checkUrl } from "./checkUrl";

type Props = {
    visible: boolean;
    onClose: () => void;
};

export default function AvatarEditMenu({ visible, onClose }: Props) {
    const [avatarUrl, setAvatarUrl] = useState('');

    if (!visible) return null;

    const handleSave = async () => {
        const isValid = await checkUrl(avatarUrl);
        localStorage.setItem("userAvatar", isValid ? avatarUrl : localConfigs.userDefaultAvatar);
        onClose();
    };

    return (
        <div className="w-full h-full flex flex-col">
            <p className="text-gray-900 text-[15px] font-semibold mt-2">Укажите URL на аватар.</p>
            <p className="text-gray-900 text-[13px]">Для сброса введите что угодно.</p>

            <input
                type="text"
                placeholder=""
                className="w-full border px-3 mt-1 h-10"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
            />

            <button
                className="h-10 px-8 cursor-pointer border-l border-r border-b text-gray-900 hover:bg-gray-50 transition-colors text-[15px] whitespace-nowrap"
                onClick={handleSave}
            >
                Сохранить
            </button>
        </div>
    );
}