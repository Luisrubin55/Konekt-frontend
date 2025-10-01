import React from 'react'

function UserPerfilImg({profilePictureUrl}) {
  return (
    <>
      <img
        src={
          profilePictureUrl
            ? profilePictureUrl
            : "/perfil.jpg"
        }
        alt="image profile"
        className="w-9 h-9 overflow-hidden object-cover rounded-full"
      />
    </>
  )
}

export default UserPerfilImg