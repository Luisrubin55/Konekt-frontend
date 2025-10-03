import React from 'react'

function ModalReactionsPost({handleClickReaction}) {
    const reactions = ["LIKE", "LOVE", "HAHA", "SAD", "ANGRY"]
  return (
    <div className="flex gap-3 items-center justify-center">
      {reactions.map((reaction) => (
        <button key={reaction} onClick={() => handleClickReaction(reaction)} className="flex items-center justify-center w-10 h-10">
          <img
            src={`/reactions/${reaction}.svg`}
            alt={reaction}
            className="w-10 h-10 transition-transform duration-150 ease-in-out hover:scale-125 cursor-pointer"
          />
        </button>
      ))}
    </div>
  )
}

export default ModalReactionsPost