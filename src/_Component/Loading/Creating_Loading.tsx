

export default function Creating_Loading() {
    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex items-center gap-3">
                <span className="text-black text-lg">Creating Room</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}