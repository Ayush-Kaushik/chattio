import React, {useEffect, useState} from 'react';

const useProgressiveImg = (lowQualityImg, highQualityImg) => {
    const [image, setImage] = useState(lowQualityImg);

    useEffect(() => {
        setImage(lowQualityImg);

        const img = new Image();
        img.src = highQualityImg;

        img.onload = () => {
            setImage(highQualityImg);
        }

    }, [lowQualityImg, highQualityImg]);

    return [image, { blur: image === lowQualityImg }];
};

export default useProgressiveImg;