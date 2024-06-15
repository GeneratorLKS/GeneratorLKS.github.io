function generateBarcode() {
    const input = document.getElementById('barcodeInput').value;
    if (input.trim() === '') {
        alert('Please enter text or numbers to generate a barcode.');
        return;
    }
    
    JsBarcode("#barcode", input, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true
    });
}

function downloadBarcode() {
    const svg = document.querySelector('#barcode');
    if (!svg.hasChildNodes()) {
        alert('No barcode generated to download.');
        return;
    }
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        
        const downloadLink = document.createElement('a');
        downloadLink.href = pngFile;
        downloadLink.download = 'barcode.png';
        downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
}

function regenerateBarcode() {
    document.getElementById('barcodeInput').value = '';
    const svg = document.querySelector('#barcode');
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

function generateQRCode() {
    const input = document.getElementById('qrInput').value;
    if (input.trim() === '') {
        alert('Please enter text or numbers to generate a QR code.');
        return;
    }

    const qrCodeCanvas = document.getElementById('qrcodeCanvas');
    qrCodeCanvas.innerHTML = '';

    QRCode.toCanvas(qrCodeCanvas, input, function (error) {
        if (error) console.error(error);
    });
}

function downloadQRCode() {
    const canvas = document.getElementById('qrcodeCanvas');
    if (canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data.every((value) => value === 0)) {
        alert('No QR code generated to download.');
        return;
    }
    
    const pngFile = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngFile;
    downloadLink.download = 'qrcode.png';
    downloadLink.click();
}

function regenerateQRCode() {
    document.getElementById('qrInput').value = '';
    const qrCodeCanvas = document.getElementById('qrcodeCanvas');
    const context = qrCodeCanvas.getContext('2d');
    context.clearRect(0, 0, qrCodeCanvas.width, qrCodeCanvas.height);
}
