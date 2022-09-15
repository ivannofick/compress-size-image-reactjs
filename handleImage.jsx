const getImage = async (event) => {
    const image = document.createElement('img')
    image.id = 'image'
    image.src = URL.createObjectURL(event.target.files[0])
    var widthAndHeigthImage = await getWidthAndHeigthImage(image);
    image.width = widthAndHeigthImage.width
    image.height = widthAndHeigthImage.height
    console.log();
    compressImage(image)
}

const getWidthAndHeigthImage = (image) => {
    return new Promise((resolve, reject) => {
        image.onload = function () {
            var height = this.height;
            var width = this.width;
            resolve({'width': width, 'height': height})
        };
    })
}






const compressImage = (loadedData) => {
    const outputFormat = 'png'
    const quality = parseInt(30)
    const mimeType = typeof outputFormat !== 'undefined' && outputFormat === 'png' ? 'image/png' : 'image/jpeg'

    const canvas = document.createElement('canvas')
    canvas.width = loadedData.width;
    canvas.height = loadedData.height;
    const ctx = canvas.getContext('2d').drawImage(loadedData, 0, 0)
    const newImageData = canvas.toDataURL(mimeType, quality / 100)
    const img = new Image()
    img.src = newImageData
    return img;
}




export { getImage }
