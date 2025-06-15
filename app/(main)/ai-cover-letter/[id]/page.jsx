import React from 'react'

const CoverLetter = async ({ params }) => {
    const id = params.id;
    console.log("CoverLetter ID:", id);

    return (
        <div>
            CoverLetter{id}
        </div>
    )
}

export default CoverLetter
