import EmojiPicker from "emoji-picker-react"

function EmojisInput({ showPicker, handleEmojiClick }) {

    return (
        <div>
            {showPicker && (
                <div className="absolute bottom-1 z-30 -translate-16 shadow-lg">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    )
}

export default EmojisInput