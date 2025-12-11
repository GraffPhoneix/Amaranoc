interface HotelsPseudoHeaderProps {
    status: 'best' | 'default';
}

interface PseudoHeaderProps {
    desc: 'Лучшие предложения' | 'Обычные предложения';
}

export function HotelsPseudoHeader({ status }: HotelsPseudoHeaderProps) {

    function PseudoHeader({ desc }: PseudoHeaderProps) {
        return (
            <div className="ml-18 mt-5 text-lg border-b border-gray-200 pb-4">
                {desc}
            </div>
        );
    }

    const desc = status === 'best' ? 'Лучшие предложения' : 'Обычные предложения';

    return <PseudoHeader desc={desc} />;
}
